// Signed HTTP client for the /api/v1 backend.
import { Platform } from 'react-native';
import { API_BASE_URL, REQUEST_TIMEOUT_MS } from '../config/env';
import { getAppCredentials } from '../config/secrets.loader';
import ApiError from './ApiError';
import { canonicalQuery, createNonce, sign } from './signing';

const API_PREFIX = '/api/v1';

function withTimeout(promise, ms, onTimeout) {
  let timer;
  const timeout = new Promise((_, reject) => {
    timer = setTimeout(() => {
      onTimeout();
      reject(new ApiError('timeout', `Request timed out after ${ms} ms`));
    }, ms);
  });
  return Promise.race([promise, timeout]).then(
    (value) => {
      clearTimeout(timer);
      return value;
    },
    (error) => {
      clearTimeout(timer);
      throw error;
    },
  );
}

/**
 * Signed GET returning the envelope's `data`.
 * @template T
 * @param {string} path  Path below /api/v1, e.g. '/top-charts'
 * @param {Object<string, string|number>} [query]
 * @param {{timeoutMs?: number}} [options]
 * @returns {Promise<T>}
 * @throws {ApiError}
 */
export async function get(path, query, options = {}) {
  const fullPath = API_PREFIX + path;
  const { appId, secret } = getAppCredentials(Platform.OS);
  const timestamp = Math.floor(Date.now() / 1000);
  const nonce = createNonce();
  const signature = sign(secret, {
    method: 'GET',
    path: fullPath,
    query,
    timestamp,
    nonce,
    body: '',
  });
  const qs = canonicalQuery(query);
  const url = API_BASE_URL + fullPath + (qs ? `?${qs}` : '');

  // AbortController is missing on older React Native runtimes: time out without it there.
  const Abort = typeof global.AbortController === 'function' ? global.AbortController : null;
  const controller = Abort ? new Abort() : null;
  let response;
  try {
    response = await withTimeout(
      fetch(url, {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'X-App-Id': appId,
          'X-Timestamp': String(timestamp),
          'X-Nonce': nonce,
          'X-Signature': signature,
        },
        signal: controller ? controller.signal : undefined,
      }),
      options.timeoutMs || REQUEST_TIMEOUT_MS,
      () => controller && controller.abort(),
    );
  } catch (e) {
    if (e instanceof ApiError) {
      throw e;
    }
    throw new ApiError('network_error', 'Network request failed');
  }

  let body;
  try {
    body = await response.json();
  } catch (e) {
    throw new ApiError('invalid_response', 'Response is not valid JSON', response.status);
  }

  if (!response.ok || !body || body.ok !== true) {
    const err = (body && body.error) || {};
    throw new ApiError(
      err.code || 'http_error',
      err.message || `Request failed with status ${response.status}`,
      response.status,
    );
  }
  return body.data;
}
