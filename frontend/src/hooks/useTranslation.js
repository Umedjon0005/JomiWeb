import { useLanguage } from "../context/LanguageContext";
import { translations } from "../i18n/translations";

const getValueByPath = (obj, path) => {
  return path.split(".").reduce((acc, part) => {
    if (acc && typeof acc === "object" && part in acc) {
      return acc[part];
    }
    return undefined;
  }, obj);
};

export const useTranslation = () => {
  const { language } = useLanguage();

  const t = (key, fallback) => {
    const langBundle = translations[language] || translations.en;
    const value = getValueByPath(langBundle, key);

    if (value !== undefined && value !== null) {
      return value;
    }

    if (fallback !== undefined) {
      return fallback;
    }

    const defaultValue = getValueByPath(translations.en, key);
    if (defaultValue !== undefined && defaultValue !== null) {
      return defaultValue;
    }

    return key;
  };

  return { t, language };
};

