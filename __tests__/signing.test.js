import { buildCanonical, canonicalQuery, createNonce, sign } from '../src/api/signing';
import { sha256, toHex } from '../src/utils/sha256';

// Contract test vector shared with the backend.
const VECTOR = {
  secret: 'test-secret-0123456789',
  input: {
    method: 'GET',
    path: '/api/v1/top-charts',
    query: {},
    timestamp: 1700000000,
    nonce: 'abcdefghijklmnop',
    body: '',
  },
  canonical:
    'GET\n/api/v1/top-charts\n\n1700000000\nabcdefghijklmnop\n' +
    'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855',
  signature: 'yrtECS+NgkMz7KJneR/cxnjQZQynLbXtMbAadVcjm2k=',
};

describe('request signing', () => {
  it('hashes the empty string', () => {
    expect(toHex(sha256(''))).toBe(
      'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855',
    );
  });

  it('builds the contract canonical string', () => {
    expect(buildCanonical(VECTOR.input)).toBe(VECTOR.canonical);
  });

  it('reproduces the contract signature', () => {
    expect(sign(VECTOR.secret, VECTOR.input)).toBe(VECTOR.signature);
  });

  it('sorts and RFC 3986-encodes the query', () => {
    expect(canonicalQuery({ b: "it's", a: 'x y' })).toBe('a=x%20y&b=it%27s');
  });

  it('creates nonces in the allowed alphabet', () => {
    expect(createNonce()).toMatch(/^[A-Za-z0-9_-]{16,64}$/);
  });
});
