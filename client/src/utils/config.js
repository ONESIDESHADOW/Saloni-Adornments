
export const getImageUrl = (path) => {
  //  Handle null/undefined/empty array
  if (!path || path === 'undefined' || path === 'null') {
    return "https://via.placeholder.com/300?text=No+Image";
  }

  //  If already full URL → return as is
  if (path.startsWith("http")) return path;

  //  Otherwise add backend URL
  return `${API_URL}${path}`;
};