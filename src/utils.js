export const kebabCase = string =>
  string
    .replace(/([a-z])([A-Z])/g, "$1-$2")
    .replace(/[\s_]+/g, "-")
    .toLowerCase();

export const capitalize = string => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};
