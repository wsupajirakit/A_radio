// Template: copy to secrets.js (git-ignored) and fill in the values issued by the backend.
// Each app id must match a key in the backend's MOBILE_APP_KEYS.
export default {
  ios: { appId: 'aradio-ios', secret: 'replace-with-ios-secret' },
  android: { appId: 'aradio-android', secret: 'replace-with-android-secret' },
};
