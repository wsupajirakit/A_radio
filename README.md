# A Radio

A Radio is a React Native app for a radio station. It plays the live stream and shows the
weekly top charts, the programme schedule, social links and contact details. All data comes
from the station backend through a signed `/api/v1` API.

## Features

- **Live stream player**: play/pause, volume slider, background audio, call and SMS shortcuts, launch promo popup
- **Top charts**: one chart per week, with a date picker that defaults to the latest week
- **Programme schedule**: one weekday at a time, with DJ photos and names
- **Social**: website, Facebook, Twitter, YouTube and Instagram links, plus a share sheet
- **Contact**: e-mail, phone, address (opens in maps) and the platform's privacy policy
- **Signed API calls**: every request is signed with HMAC-SHA256 and has a timeout and typed errors

## Architecture

```
screens  →  hooks  →  api client (signing)  →  backend /api/v1
   ↓
components / theme / constants
```

- **Screens** (`src/screens/*`) only lay out the page. They get their data from one hook,
  render shared components and handle no network details.
- **Hooks** (`src/hooks`) wrap the data access. `useAsync` provides the single
  loading/error/data/reload state. `usePlayerInfo`, `useTopCharts` and `useRadioPrograms` are
  built on top of it and shape the payloads for the screens.
- **API layer** (`src/api`) has one module per resource (`topCharts`, `radioPrograms`,
  `player`) on top of `client.js`. The client signs each request, applies a timeout, unwraps
  the `{ok, data}` envelope and throws `ApiError` for every failure.
- **Components** (`src/components`) are the shared UI, with PropTypes on each one. All screens
  use `StatusView` as the one pattern for loading, error (tap to retry) and empty states.
- **Theme and constants** (`src/theme`, `src/constants`) hold colors, spacing, radii,
  typography, user-facing labels and fixed sizes, so screens contain no magic values.

## Folder structure

| Path | Contents |
| --- | --- |
| `App.js`, `index.js` | App entry and registration |
| `src/api/` | `client.js` (signed GET), `signing.js`, `ApiError.js`, `topCharts.js`, `radioPrograms.js`, `player.js`, barrel |
| `src/config/` | `env.js` (API base URL, stream URL, share URL, timeout), `secrets.example.js` (template), `secrets.loader.js`; `secrets.js` is git-ignored |
| `src/constants/` | Labels, weekdays, icon sizes, player defaults |
| `src/navigation/` | Bottom-tab navigator |
| `src/screens/` | One folder per screen: `Home`, `TopCharts`, `Schedule`, `Social`, `Contact` |
| `src/components/` | `PickerListLayout`, `StatusView`, `PlayerControls`, `PromoModal`, `ShareModal`, `ChartRow`, `ProgramCard`, `ContactRow`, `SelectField`, `PageHeader`, `ScreenBackground`, `IconButton`, `CloseButton`, `TabIcon` |
| `src/hooks/` | `useAsync`, `usePlayerInfo`, `useTopCharts`, `useRadioPrograms` |
| `src/theme/` | Colors, spacing, radii, typography |
| `src/assets/images/` | Bundled images |
| `src/utils/` | SHA-256 / HMAC / base64 (`sha256.js`), dates, link helpers |
| `__tests__/` | Jest tests: signing test vector, API client, dates |
| `android/`, `ios/` | Native projects (`com.example.aradio`, iOS project `ARadio`) |
| `.github/workflows/ci.yml` | CI: `npm ci`, lint, tests |

## API and request signing

All endpoints use GET and return JSON:

- `/api/v1/top-charts`
- `/api/v1/top-charts/dates`
- `/api/v1/top-charts/{YYYY-MM-DD}`
- `/api/v1/radio-programs`
- `/api/v1/player`

Successful responses use the envelope `{"ok": true, "data": ...}`. Failed responses use
`{"ok": false, "error": {"code", "message"}}`, and the client throws them as `ApiError`
(`code`, `message`, `status`). Network failures and timeouts also become `ApiError`, with
the codes `network_error` and `timeout`.

Each request sends these headers:

- `X-App-Id`
- `X-Timestamp`: Unix time in seconds
- `X-Nonce`: random, `[A-Za-z0-9_-]`
- `X-Signature`, computed as follows:

```
canonical   = METHOD \n PATH \n SORTED_RFC3986_QUERY \n TIMESTAMP \n NONCE \n hex(SHA-256(body))
X-Signature = base64(HMAC-SHA256(secret, canonical))
```

SHA-256 and HMAC are written in plain JavaScript (`src/utils/sha256.js`), so the app needs
no native crypto module.

## Security

- **No secrets in git.** The app id and secret live in `src/config/secrets.js`, which is
  git-ignored; only a template is committed. The Android release keystore and its passwords
  come from Gradle properties or environment variables, and `*.keystore` and `*.jks` are
  ignored. No iOS signing team or provisioning profile is committed.
- **Signed requests.** The backend rejects unknown app ids, timestamps more than 5 minutes
  old, reused nonces and bad signatures, and it rate-limits each IP address.
- **Honest limits.** Anyone who unpacks a mobile app can extract a key shipped inside it.
  Signing does not make the API private. It stops casual scraping and the replay of captured
  requests, and it lets the backend rotate or revoke the key for each app id. Per-user
  authentication (accounts plus short-lived tokens) is the stronger next step.
- **Transport.** iOS App Transport Security does not allow arbitrary HTTP loads (only
  `localhost` for development), so configure HTTPS URLs in `env.js`.

## Setup

Requirements: Node 10 or 12 (supported by React Native 0.59), Xcode for iOS, and Android
Studio with the Android SDK for Android.

```sh
npm install
cp src/config/secrets.example.js src/config/secrets.js   # then fill in the app ids and secrets
```

In `src/config/env.js`, set `API_BASE_URL` for your environment, along with the fallback
`STREAM_URL` and `SHARE_URL`.

### iOS

```sh
npm run ios   # or open ios/ARadio.xcodeproj in Xcode
```

The project links native modules directly (React Native 0.59, no Podfile). If you add
CocoaPods later, run `cd ios && pod install`; `ios/Pods` is already git-ignored. Select
your own signing team in Xcode.

### Android

```sh
npm run android
```

#### Android release signing

The keystore and its passwords are never committed. Provide them in
`~/.gradle/gradle.properties` or as environment variables:

```properties
ARADIO_RELEASE_STORE_FILE=/absolute/path/to/release.keystore
ARADIO_RELEASE_STORE_PASSWORD=...
ARADIO_RELEASE_KEY_ALIAS=...
ARADIO_RELEASE_KEY_PASSWORD=...
```

If all four values are set, `./gradlew assembleRelease` signs the release build. Otherwise
the release build is left unsigned.

## Development

```sh
npm run lint          # ESLint (@react-native-community config + react-hooks rules)
npm run format        # Prettier
npm test              # Jest
```

`__tests__/signing.test.js` checks that the signing code reproduces the contract test vector
`yrtECS+NgkMz7KJneR/cxnjQZQynLbXtMbAadVcjm2k=`. `__tests__/client.test.js` checks the request
headers, envelope unwrapping and error mapping.
