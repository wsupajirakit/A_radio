import { useCallback, useEffect, useRef, useState } from 'react';

/**
 * Runs an async function and tracks loading/error/data. Re-runs when deps change.
 * @template T
 * @param {() => Promise<T>} fn
 * @param {Array} [deps]
 * @param {{immediate?: boolean}} [options]
 * @returns {{data: T|undefined, error: Error|null, loading: boolean, reload: () => void}}
 */
export default function useAsync(fn, deps = [], { immediate = true } = {}) {
  const [state, setState] = useState({ data: undefined, error: null, loading: immediate });
  const mounted = useRef(true);
  const callId = useRef(0);

  useEffect(() => () => {
    mounted.current = false;
  }, []);

  const run = useCallback(() => {
    const id = ++callId.current;
    setState((s) => ({ ...s, loading: true, error: null }));
    Promise.resolve()
      .then(fn)
      .then(
        (data) => mounted.current && id === callId.current && setState({ data, error: null, loading: false }),
        (error) => mounted.current && id === callId.current && setState((s) => ({ ...s, error, loading: false })),
      );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  useEffect(() => {
    if (immediate) run();
  }, [run, immediate]);

  return { ...state, reload: run };
}
