#!/bin/sh
# Runs the playback end-to-end checks against a throwaway stack on its own Docker network.
# Uses plain `docker run`, so the Compose plugin is not needed. Nothing is published on host
# ports. Every container and the network are named groove-e2e-* and are removed on exit.
# Screenshots go to e2e/artifacts/.
set -u
cd "$(dirname "$0")"
root=$(cd .. && pwd)
net=groove-e2e
label=groove-e2e=1
image=groove-e2e-app
pw_image=mcr.microsoft.com/playwright:v1.56.1-noble
db_url=postgresql://groove:groove@groove-e2e-db:5432/groove_tracker
# A fixed, test-only key. No real tokens are stored in this stack.
key=MDEyMzQ1Njc4OWFiY2RlZjAxMjM0NTY3ODlhYmNkZWY=

cleanup() {
  docker ps -aq --filter "label=$label" | xargs -r docker rm -f >/dev/null 2>&1
  docker network rm "$net" >/dev/null 2>&1
}
trap cleanup EXIT INT TERM
cleanup

fail() { echo "e2e: $1" >&2; for c in api web; do echo "--- $c logs"; docker logs --tail 30 "groove-e2e-$c" 2>&1; done; exit 1; }

wait_for() { # name, command...
  name=$1; shift
  i=0
  until "$@" >/dev/null 2>&1; do
    i=$((i + 1)); [ "$i" -gt 60 ] && fail "$name did not become ready"
    sleep 1
  done
}

echo "Building app image…"
docker build -q -t "$image" "$root" >/dev/null || fail "image build failed"
docker network create --label "$label" "$net" >/dev/null || fail "network create failed"

app() { # name, extra docker args..., image, command...
  name=$1; shift
  docker run -d --label "$label" --network "$net" --name "groove-e2e-$name" \
    -e DATABASE_URL="$db_url" -e DATABASE_SSL=false -e TOKEN_ENCRYPTION_KEY="$key" \
    -e APP_ORIGIN=http://localhost:5173 -e API_ORIGIN=http://localhost:3001 "$@"
}

echo "Starting Postgres…"
docker run -d --label "$label" --network "$net" --name groove-e2e-db --tmpfs /var/lib/postgresql/data \
  -e POSTGRES_DB=groove_tracker -e POSTGRES_USER=groove -e POSTGRES_PASSWORD=groove postgres:16-alpine >/dev/null
wait_for postgres docker exec groove-e2e-db pg_isready -U groove -d groove_tracker -h localhost
sleep 1

echo "Migrating (twice, to check migrations are safe to re-run) and seeding…"
for run in 1 2; do
  docker run --rm --label "$label" --network "$net" -e DATABASE_URL="$db_url" -e DATABASE_SSL=false \
    "$image" npm run --silent db:migrate || fail "migration run $run failed"
done
docker exec -i groove-e2e-db psql -q -v ON_ERROR_STOP=1 -U groove -d groove_tracker < seed.sql || fail "seed failed"

echo "Starting API and Vite…"
app api "$image" npm run api:start >/dev/null
wait_for api docker exec groove-e2e-api wget -qO- http://127.0.0.1:3001/api/health
app web -e VITE_API_PROXY_TARGET=http://groove-e2e-api:3001 "$image" npx vite --host 0.0.0.0 --port 5173 --strictPort >/dev/null
wait_for web docker exec groove-e2e-web wget -qO- http://127.0.0.1:5173/

echo "Running browser checks…"
mkdir -p artifacts
# Shares the web container's network namespace so the page is localhost:5173, which Vite's host check allows.
docker run --rm --label "$label" --network container:groove-e2e-web --name groove-e2e-browser \
  -v "$PWD:/e2e" -w /e2e -e NODE_PATH=/tmp/deps/node_modules --user "$(id -u):$(id -g)" -e HOME=/tmp \
  "$pw_image" sh -c "mkdir -p /tmp/deps && cd /tmp/deps && npm install --no-save --no-audit --no-fund --silent playwright-core@1.56.1 && cd /e2e && node playback.test.cjs"
status=$?

echo "Scrobble jobs by status after the run:"
docker exec groove-e2e-db psql -U groove -d groove_tracker -c \
  "SELECT status, count(*) FROM scrobble_jobs GROUP BY status ORDER BY status;"
echo "Listens by status:"
docker exec groove-e2e-db psql -U groove -d groove_tracker -c \
  "SELECT status, count(*) FROM listens GROUP BY status ORDER BY status;"

[ "$status" -eq 0 ] || fail "browser checks failed"
