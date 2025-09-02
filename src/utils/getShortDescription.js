export const getShortDescription = (text) => {
  if (!text) return "";
  const index = text.indexOf("(");
  return index !== -1 ? text.slice(0, index).trim() : text;
};