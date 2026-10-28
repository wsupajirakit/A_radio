import { get } from './client';

/** @typedef {{name: string, image: string}} Dj */
/** @typedef {{time: {start: string, end: string}, dj: Dj[]}} Program */

/** @returns {Promise<Program[][]>} programs per weekday, index 0 = Sunday */
export const getRadioPrograms = () => get('/radio-programs');
