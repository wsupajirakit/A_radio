import { useState } from 'react';
import { getRadioPrograms } from '../api';
import useAsync from './useAsync';

/**
 * Weekly schedule with a selected weekday (0 = Sunday).
 * @returns {{day: number, setDay: (day: number) => void, programs: Array,
 *   loading: boolean, error: Error|null, reload: () => void}}
 */
export default function useRadioPrograms() {
  const { data, loading, error, reload } = useAsync(getRadioPrograms, []);
  const [day, setDay] = useState(0);
  return { day, setDay, programs: (data && data[day]) || [], loading, error, reload };
}
