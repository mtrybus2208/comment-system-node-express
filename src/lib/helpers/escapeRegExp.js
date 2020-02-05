const escapeRegExp = string => string && string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

export default escapeRegExp;
