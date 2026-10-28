import { STATION_KEY } from '../constants';
import { get } from './client';

/**
 * Station, about, contact, social and popup data.
 * @returns {Promise<Object>}
 */
export const getPlayerInfo = () => get('/player');

/**
 * The station entry inside `radio` (the app's own key, else the first one).
 * @param {Object} [info]
 * @returns {{straming_url?: string, sms_number?: string}}
 */
export function getStation(info) {
  const radio = (info && info.radio) || {};
  return radio[STATION_KEY] || Object.values(radio)[0] || {};
}
