import { useLayoutEffect, useRef } from 'react';

type AnyFunction = (...args: any[]) => any;

/**
 * Аналогичен `useCallback`, с небольшими отличиями:
 * - Возвращаемая функция является стабильной ссылкой и не изменится между ререндерами
 * - Отсутствует список зависимостей
 * - Всегда имеет доступ к текущим значениям переменных снаружи
 */
export function useEvent<T extends AnyFunction>(callback: T): T {
  const latestRef = useRef<T>(callback);
  useLayoutEffect(() => {
    latestRef.current = callback;
  }, [callback]);

  const stableRef = useRef<T | null>(null);
  if (!stableRef.current) {
    stableRef.current = function handler(this: any) {
      // eslint-disable-next-line prefer-rest-params
      return latestRef.current.apply(this, arguments as any);
    } as T;
  }

  return stableRef.current;
}
