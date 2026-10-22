import crypto from "node:crypto";
import "dotenv/config";

const DISCOGS_API = "https://api.discogs.com";
const DISCOGS_OAUTH_API = `${DISCOGS_API}/oauth`;
const DISCOGS_AUTHORIZE = "https://www.discogs.com/oauth/authorize";

function encode(value) {
  return encodeURIComponent(value).replace(/[!'()*]/g, character =>
    `%${character.charCodeAt(0).toString(16).toUpperCase()}`
  );
}

function requiredConfig(name) {
  if (!process.env[name]) throw new Error(`${name} is required for Discogs integration.`);
  return process.env[name];
}

function parseResponse(body) {
  return Object.fromEntries(new URLSearchParams(body));
}

function signature({ method, url, oauth, tokenSecret = "" }) {
  const target = new URL(url);
  const pairs = [...target.searchParams.entries(), ...Object.entries(oauth)]
    .sort(([leftKey, leftValue], [rightKey, rightValue]) => {
      const keyOrder = encode(leftKey).localeCompare(encode(rightKey));
      return keyOrder || encode(leftValue).localeCompare(encode(rightValue));
    });
  const normalized = pairs.map(([key, value]) => `${encode(key)}=${encode(value)}`).join("&");
  const baseUrl = `${target.protocol}//${target.host}${target.pathname}`;
  const signatureBase = [method.toUpperCase(), encode(baseUrl), encode(normalized)].join("&");
  const signingKey = `${encode(requiredConfig("DISCOGS_CONSUMER_SECRET"))}&${encode(tokenSecret)}`;

  return crypto.createHmac("sha1", signingKey).update(signatureBase).digest("base64");
}

function oauthHeader({ method, url, token, tokenSecret, callback, verifier }) {
  const oauth = {
    oauth_consumer_key: requiredConfig("DISCOGS_CONSUMER_KEY"),
    oauth_nonce: crypto.randomBytes(16).toString("hex"),
    oauth_signature_method: "HMAC-SHA1",
    oauth_timestamp: Math.floor(Date.now() / 1000).toString(),
    oauth_version: "1.0"
  };
  if (token) oauth.oauth_token = token;
  if (callback) oauth.oauth_callback = callback;
  if (verifier) oauth.oauth_verifier = verifier;
  oauth.oauth_signature = signature({ method, url, oauth, tokenSecret });

  return `OAuth ${Object.entries(oauth)
    .map(([key, value]) => `${encode(key)}="${encode(value)}"`)
    .join(", ")}`;
}

async function discogsFetch(url, { method = "GET", token, tokenSecret, callback, verifier } = {}) {
  const response = await fetch(url, {
    method,
    headers: {
      Authorization: oauthHeader({ method, url, token, tokenSecret, callback, verifier }),
      "Content-Type": "application/x-www-form-urlencoded",
      Accept: "application/json",
      "User-Agent": process.env.DISCOGS_USER_AGENT || "GrooveTracker/0.1"
    }
  });
  if (!response.ok) {
    throw new Error(`Discogs request failed (${response.status}): ${await response.text()}`);
  }
  return response;
}

export async function createRequestToken(callbackUrl) {
  const response = await discogsFetch(`${DISCOGS_OAUTH_API}/request_token`, {
    method: "GET",
    callback: callbackUrl
  });
  return parseResponse(await response.text());
}

export async function exchangeAccessToken({ requestToken, requestTokenSecret, verifier }) {
  const response = await discogsFetch(`${DISCOGS_OAUTH_API}/access_token`, {
    method: "POST",
    token: requestToken,
    tokenSecret: requestTokenSecret,
    verifier
  });
  return parseResponse(await response.text());
}

export function authorizationUrl(requestToken) {
  return `${DISCOGS_AUTHORIZE}?oauth_token=${encode(requestToken)}`;
}

export async function getIdentity(credentials) {
  const response = await discogsFetch(`${DISCOGS_API}/oauth/identity`, credentials);
  return response.json();
}

export async function getCollectionPage(credentials, username, page) {
  const url = new URL(`${DISCOGS_API}/users/${encode(username)}/collection/folders/0/releases`);
  url.searchParams.set("page", page);
  url.searchParams.set("per_page", "100");
  const response = await discogsFetch(url.toString(), credentials);
  return response.json();
}

export async function getRelease(credentials, releaseId) {
  const response = await discogsFetch(`${DISCOGS_API}/releases/${releaseId}`, credentials);
  return response.json();
}
