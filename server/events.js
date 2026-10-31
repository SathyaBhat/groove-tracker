import { EventEmitter } from "node:events";

// In-process fan-out of playback changes to connected browsers.
// The API runs as one process; a separate worker will need Postgres LISTEN/NOTIFY instead.
const bus = new EventEmitter();
bus.setMaxListeners(0);

export function publishPlayback(userId) {
  bus.emit(`playback:${userId}`);
}

export function onPlayback(userId, handler) {
  const name = `playback:${userId}`;
  bus.on(name, handler);
  return () => bus.off(name, handler);
}
