// Loads src/config/secrets.js lazily so a missing file gives a clear error.
const MISSING =
  'Missing src/config/secrets.js. Copy src/config/secrets.example.js to ' +
  'src/config/secrets.js and fill in the app id and secret.';

let cached;

/**
 * @param {string} platform 'ios' | 'android'
 * @returns {{appId: string, secret: string}}
 */
export function getAppCredentials(platform) {
  if (!cached) {
    let mod;
    try {
      mod = require('./secrets');
    } catch (e) {
      throw new Error(MISSING);
    }
    cached = (mod && mod.default) || mod;
  }
  const creds = cached && cached[platform];
  if (!creds || !creds.appId || !creds.secret) {
    throw new Error(`secrets.js has no appId/secret for platform "${platform}".`);
  }
  return creds;
}
