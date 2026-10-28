import { get } from './client';

/** @typedef {{num: string, name: string, artists: string, lastChartNum: string, onChartLong: string}} ChartSong */
/** @typedef {{key: string, label: string}} ChartDate */

/** All chart entries. */
export const getTopCharts = () => get('/top-charts');

/** @returns {Promise<ChartDate[]>} available chart dates */
export const getTopChartDates = () => get('/top-charts/dates');

/**
 * @param {string} isoDate YYYY-MM-DD
 * @returns {Promise<{songs: ChartSong[]}>}
 */
export const getTopChart = (isoDate) => get(`/top-charts/${encodeURIComponent(isoDate)}`);
