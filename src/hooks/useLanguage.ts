'use client';
import { useEffect, useState } from 'react';

export function useLanguage() {
  const [language, setLanguage] = useState('FR');

  useEffect(() => {
    const savedLang = localStorage.getItem('language');
    if (savedLang === 'EN' || savedLang === 'FR') {
      setLanguage(savedLang);
    } else {
      setLanguage('FR');
    }
  }, []);

  const changeLanguage = (lang: string) => {
    setLanguage(lang);
    localStorage.setItem('language', lang);
    window.location.reload();
  };

  return { language, setLanguage: changeLanguage };
}