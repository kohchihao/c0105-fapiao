import Fuse, { FuseOptionKey } from 'fuse.js';
import { useEffect, useRef, useState } from 'react';

export function useSearch<T>(
  data: T[] | undefined,
  keys: (keyof T)[],
  query: string,
  threshold: number = 0.3
): T[] {
  const [results, setResults] = useState<T[]>([]);
  const fuseRef = useRef<Fuse<T> | null>(null);

  useEffect(() => {
    if (data && data.length) {
      fuseRef.current = new Fuse(data, {
        keys: keys as FuseOptionKey<T>[],
        threshold,
      });
    } else {
      fuseRef.current = null;
    }
  }, [data, keys, threshold]);

  useEffect(() => {
    if (!fuseRef.current) {
      return;
    }

    if (query) {
      setResults(fuseRef.current.search(query).map((result) => result.item));
    } else {
      setResults(data || []);
    }
  }, [query, data]);

  return results;
}
