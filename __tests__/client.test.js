import { get } from '../src/api/client';
import ApiError from '../src/api/ApiError';
import { sign } from '../src/api/signing';

jest.mock('../src/config/secrets.loader', () => ({
  getAppCredentials: () => ({ appId: 'aradio-ios', secret: 'test-secret-0123456789' }),
}));

const respond = (status, body) =>
  Promise.resolve({ ok: status >= 200 && status < 300, status, json: () => Promise.resolve(body) });

describe('api client', () => {
  afterEach(() => {
    delete global.fetch;
  });

  it('signs the request and returns envelope data', async () => {
    global.fetch = jest.fn(() => respond(200, { ok: true, data: [{ key: '20/10/2026' }] }));
    const data = await get('/top-charts/dates');

    expect(data).toEqual([{ key: '20/10/2026' }]);
    const [url, init] = global.fetch.mock.calls[0];
    expect(url).toBe('https://api.example.com/api/v1/top-charts/dates');
    const h = init.headers;
    expect(h['X-App-Id']).toBe('aradio-ios');
    expect(h['X-Nonce']).toMatch(/^[A-Za-z0-9_-]{16,64}$/);
    expect(h['X-Signature']).toBe(
      sign('test-secret-0123456789', {
        method: 'GET',
        path: '/api/v1/top-charts/dates',
        timestamp: h['X-Timestamp'],
        nonce: h['X-Nonce'],
      }),
    );
  });

  it('maps the error envelope to ApiError', async () => {
    global.fetch = jest.fn(() =>
      respond(401, { ok: false, error: { code: 'bad_signature', message: 'Invalid signature' } }),
    );
    await expect(get('/player')).rejects.toMatchObject({
      name: 'ApiError',
      code: 'bad_signature',
      status: 401,
    });
  });

  it('maps network failures to ApiError', async () => {
    global.fetch = jest.fn(() => Promise.reject(new TypeError('Network request failed')));
    await expect(get('/player')).rejects.toBeInstanceOf(ApiError);
  });
});
