import { getPlayerInfo, getStation } from '../api';
import useAsync from './useAsync';

const first = (list) => (Array.isArray(list) && list.length > 0 ? list[0] : '');

/**
 * Player/about/contact/social data, normalised for the screens.
 * @returns {{loading: boolean, error: Error|null, reload: () => void, info: Object}}
 */
export default function usePlayerInfo() {
  const { data, loading, error, reload } = useAsync(getPlayerInfo, []);
  const about = (data && data.about) || {};
  const contact = (data && data.contact) || {};
  const station = getStation(data);
  const policies = (data && data.acknowledgement && data.acknowledgement.privacy_policy) || {};

  return {
    loading,
    error,
    reload,
    info: {
      logo: about.logo || '',
      appTitle: about.app_title || '',
      webName: about.web_name || '',
      website: contact.website || '',
      email: first(contact.email),
      phone: first(contact.phone),
      address: contact.full_address || '',
      streamUrl: station.straming_url || '',
      smsNumber: station.sms_number || '',
      popup: (data && first(data.popup)) || null,
      social: (data && data.social) || {},
      privacyPolicy: { android: policies.android || '', ios: policies.ios || '' },
    },
  };
}
