import { useEffect, useState } from 'react';

/* Enrutado por «#/ruta»: funciona en GitHub Pages sin configuración de servidor. */

const read = (): string[] =>
  window.location.hash.replace(/^#\/?/, '').split('/').filter(Boolean).map(decodeURIComponent);

export function useRoute(): string[] {
  const [route, setRoute] = useState(read);
  useEffect(() => {
    const onChange = () => {
      setRoute(read());
      window.scrollTo(0, 0);
    };
    window.addEventListener('hashchange', onChange);
    return () => window.removeEventListener('hashchange', onChange);
  }, []);
  return route;
}

export const to = (path: string): string => `#${path}`;
export const go = (path: string): void => {
  window.location.hash = path;
};
