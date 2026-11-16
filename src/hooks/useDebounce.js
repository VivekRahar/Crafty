import { useState, useEffect } from 'react';

/**
 * Custom Hook: useDebounce
 *
 * Demonstrates Unit III:
 * - Delaying state updates for search/input optimization
 * - useEffect cleanup cancelling active setTimeout on quick typing
 */
export function useDebounce(value, delay = 300) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    // Cancel timer on every value or delay change
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}
