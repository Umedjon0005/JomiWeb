const SUPPORTED_LANGS = ["en", "ru", "tj"];

const getLanguageFromRequest = (req) => {
  const lang = (req.query.lang || "en").toLowerCase();
  if (SUPPORTED_LANGS.includes(lang)) {
    return lang;
  }
  return "en";
};

const getFieldValue = (row, field, lang) => {
  if (lang === "en") {
    return row[field];
  }
  const translatedField = `${field}_${lang}`;
  return row[translatedField] || row[field];
};

const applyTranslations = (row, lang, fields) => {
  if (!row) return row;
  const translatedRow = { ...row };
  fields.forEach((field) => {
    translatedRow[field] = getFieldValue(row, field, lang);
  });
  return translatedRow;
};

module.exports = {
  SUPPORTED_LANGS,
  getLanguageFromRequest,
  applyTranslations,
};

