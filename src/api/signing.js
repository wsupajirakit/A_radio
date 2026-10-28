// Request signing per the mobile/backend contract (HMAC-SHA256 over a canonical string).
import { hmacSha256, sha256, toBase64, toHex } from '../utils/sha256';

const NONCE_ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789_-';

/** RFC 3986 encoding (encodeURIComponent leaves !'()* unescaped). */
export function rfc3986(value) {
  return encodeURIComponent(String(value)).replace(
    /[!'()*]/g,
    (c) => '%' + c.charCodeAt(0).toString(16).toUpperCase(),
  );
}

/**
 * Canonical query: keys sorted, RFC 3986-encoded, `k=v` joined by `&`.
 * @param {Object<string, string|number>} [query]
 */
export function canonicalQuery(query) {
  if (!query) return '';
  return Object.keys(query)
    .filter((k) => query[k] !== undefined && query[k] !== null)
    .sort()
    .map((k) => `${rfc3986(k)}=${rfc3986(query[k])}`)
    .join('&');
}

/**
 * @typedef {Object} SignInput
 * @property {string} method
 * @property {string} path      Path only, e.g. /api/v1/top-charts
 * @property {Object<string, string|number>} [query]
 * @property {number|string} timestamp Unix seconds
 * @property {string} nonce
 * @property {string} [body]    Raw body ("" for GET)
 */

/** @param {SignInput} input @returns {string} */
export function buildCanonical({ method, path, query, timestamp, nonce, body = '' }) {
  return [
    method.toUpperCase(),
    path,
    canonicalQuery(query),
    String(timestamp),
    nonce,
    toHex(sha256(body)),
  ].join('\n');
}

/** @param {string} secret @param {SignInput} input @returns {string} base64 signature */
export function sign(secret, input) {
  return toBase64(hmacSha256(secret, buildCanonical(input)));
}

/**
 * Random nonce of [A-Za-z0-9_-]. Uses crypto.getRandomValues when the runtime has it;
 * the nonce only has to be unique, not secret.
 * @param {number} [length]
 */
export function createNonce(length = 32) {
  const bytes = new Uint8Array(length);
  const cryptoObj = typeof global !== 'undefined' ? global.crypto : undefined;
  if (cryptoObj && typeof cryptoObj.getRandomValues === 'function') {
    cryptoObj.getRandomValues(bytes);
  } else {
    for (let i = 0; i < length; i++) bytes[i] = Math.floor(Math.random() * 256);
  }
  let out = '';
  for (let i = 0; i < length; i++) out += NONCE_ALPHABET[bytes[i] & 63];
  return out;
}
