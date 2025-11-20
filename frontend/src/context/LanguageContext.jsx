import { createContext, useContext, useEffect, useMemo, useState } from "react";

const LanguageContext = createContext({
  language: "en",
  setLanguage: () => {},
});

const STORAGE_KEY = "siteLanguage";
const FALLBACK_LANG = "en";
export const SUPPORTED_LANGS = [
  { key: "en", label: "EN", name: "English" },
  { key: "ru", label: "RU", name: "Русский" },
  { key: "tj", label: "TJ", name: "Тоҷикӣ" },
];

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState(() => {
    if (typeof window === "undefined") return FALLBACK_LANG;
    return localStorage.getItem(STORAGE_KEY) || FALLBACK_LANG;
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, language);
  }, [language]);

  const value = useMemo(
    () => ({
      language,
      setLanguage,
    }),
    [language]
  );

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);


