/**
 * Converts a chart date key (DD/MM/YYYY) to YYYY-MM-DD; ISO input passes through.
 * @param {string} key
 * @returns {string}
 */
export function toIsoDate(key) {
  const value = String(key || '');
  if (/^\d{4}-\d{2}-\d{2}$/.test(value)) {
    return value;
  }
  const [d, m, y] = value.split('/');
  return `${y}-${m}-${d}`;
}
