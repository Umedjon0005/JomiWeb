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
  
  // If already a full URL, return as is
  if (path.startsWith('http://') || path.startsWith('https://')) {
    return path;
  }
  
  // Normalize path: remove leading/trailing whitespace, ensure it starts with /
  const trimmedPath = path.trim();
  const normalizedPath = trimmedPath.startsWith('/') ? trimmedPath : `/${trimmedPath}`;
  
  // Use VITE_MEDIA_URL or default to server IP
  const mediaBase = import.meta.env.VITE_MEDIA_URL || 'http://194.187.122.145:5000';
  
  // Ensure mediaBase doesn't end with / and path starts with /
  const baseUrl = mediaBase.endsWith('/') ? mediaBase.slice(0, -1) : mediaBase;
  
  return `${baseUrl}${normalizedPath}`;
};


