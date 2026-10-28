import { useEffect, useState } from 'react';
import { getTopChart, getTopChartDates } from '../api';
import { toIsoDate } from '../utils';
import useAsync from './useAsync';

/**
 * Chart dates plus the songs of the selected date (latest date by default).
 * @returns {{dates: Array, selected: string|null, select: (key: string) => void,
 *   songs: Array, loading: boolean, error: Error|null, reload: () => void}}
 */
export default function useTopCharts() {
  const dates = useAsync(getTopChartDates, []);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    if (!selected && dates.data && dates.data.length > 0) {
      setSelected(dates.data[dates.data.length - 1].key);
    }
  }, [dates.data, selected]);

  const chart = useAsync(
    () => (selected ? getTopChart(toIsoDate(selected)) : Promise.resolve(null)),
    [selected],
  );

  return {
    dates: dates.data || [],
    selected,
    select: setSelected,
    songs: (chart.data && chart.data.songs) || [],
    loading: dates.loading || chart.loading,
    error: dates.error || chart.error,
    reload: dates.error ? dates.reload : chart.reload,
  };
}
