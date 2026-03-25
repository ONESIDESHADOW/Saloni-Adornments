export const API_URL = import.meta.env.VITE_API_URL;

export const getImageUrl = (path) => {
  if (!path) return "https://via.placeholder.com/300";

  // ✅ If already full URL → return as is
  if (path.startsWith("http")) return path;

  // ✅ Otherwise add backend URL
  return `${API_URL}${path}`;
};