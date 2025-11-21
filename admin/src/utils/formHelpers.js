// Helper function to format dates for input fields
export const formatDateForInput = (dateString) => {
  if (!dateString) return '';
  try {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return '';
    return date.toISOString().split('T')[0];
  } catch (error) {
    return '';
  }
};

// Helper function to ensure all language fields have default values
export const normalizeLanguageFields = (data, fields) => {
  const normalized = { ...data };
  fields.forEach(field => {
    normalized[field] = normalized[field] || '';
    normalized[`${field}_ru`] = normalized[`${field}_ru`] || '';
    normalized[`${field}_tj`] = normalized[`${field}_tj`] || '';
  });
  return normalized;
};

// Helper function to build image URL
export const buildImageUrl = (path) => {
  if (!path) return null;
  if (path.startsWith('http://') || path.startsWith('https://')) return path;
  const mediaBase = import.meta.env.VITE_MEDIA_URL || 'http://194.187.122.145:5000';
  return `${mediaBase}${path.startsWith('/') ? path : `/${path}`}`;
};

