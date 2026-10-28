// Non-secret runtime configuration. Replace the placeholder hosts per environment.
export const APP_NAME = 'A Radio';

// Backend origin; endpoints live under /api/v1.
export const API_BASE_URL = 'https://api.example.com';

// Fallback live stream used until the player endpoint returns one.
export const STREAM_URL = 'https://stream.example.com/live';

// Public web page shared from the Social screen.
export const SHARE_URL = 'https://www.example.com';

export const REQUEST_TIMEOUT_MS = 15000;
