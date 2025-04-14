import { useState, useEffect } from 'react';

export const useLocalStorage = (key, initialValue) => {
  const [value, setValue] = useState(() => {
    if (typeof window === 'undefined') return initialValue;
    try {
      const storedValue = window.localStorage.getItem(key);
      return storedValue ? JSON.parse(storedValue) : initialValue;
    } catch (error) {
      console.error('Error al leer localStorage:', error);
      return initialValue;
    }
  });

  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        window.localStorage.setItem(key, JSON.stringify(value));
      } catch (error) {
        console.error('Error al guardar en localStorage:', error);
      }
    }
  }, [key, value]);

  return [value, setValue];
};