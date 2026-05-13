import { useEffect, useState } from 'react';
import type { ObserverReturnValue, Options } from './types';

export function useDebounce<T>(value: T, delay: number = 200): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const timerId = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(timerId);
    };
  }, [value, delay]);

  return debouncedValue;
}

export function useIntersectionObserver({
  root = null,
  rootMargin = '0px',
  threshold = 0
}: Options): ObserverReturnValue {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const [element, setElement] = useState<HTMLElement | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entries]) => setIsIntersecting(entries.isIntersecting),
      { root, rootMargin, threshold }
    )

    if (element) {
      observer.observe(element);
    }

    return () => observer.disconnect()
  }, [element, root, rootMargin, threshold])

  return [isIntersecting, setElement]
}