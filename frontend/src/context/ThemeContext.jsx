import { createContext, useContext, useEffect, useState, useMemo } from 'react';
import { getT } from '../i18n';

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const [darkMode, setDarkMode] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('theme') === 'dark';
    }
    return false;
  });

  const [lang, setLang] = useState(() => localStorage.getItem('lang') || 'ENG');

  useEffect(() => {
    const root = document.documentElement;
    if (darkMode) {
      root.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      root.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [darkMode]);

  useEffect(() => {
    localStorage.setItem('lang', lang);
  }, [lang]);

  const toggleDarkMode = () => setDarkMode((prev) => !prev);
  const toggleLang = () => setLang((prev) => (prev === 'ENG' ? 'SW' : 'ENG'));

  // Clean translation function
  const t = useMemo(() => getT(lang), [lang]);

  return (
    <ThemeContext.Provider value={{ darkMode, toggleDarkMode, lang, toggleLang, t }}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => useContext(ThemeContext);