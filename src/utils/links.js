import { Linking } from 'react-native';

/** Opens a URL if present; failures are ignored (no handler installed, bad URL). */
export function openUrl(url) {
  if (!url) {
    return Promise.resolve(false);
  }
  return Linking.openURL(url).then(
    () => true,
    () => false,
  );
}

export const telUrl = (phone) => (phone ? `tel:${phone}` : '');
export const smsUrl = (number) => (number ? `sms:${number}` : '');
export const mailUrl = (email) => (email ? `mailto:${email}` : '');
export const mapUrl = (address) =>
  address ? `https://maps.google.com/?q=${encodeURIComponent(address)}` : '';
