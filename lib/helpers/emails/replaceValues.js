const replaceValues = (sourceObj, str, start = '{{', end = '}}') =>
  str.replace(new RegExp(`${start}(\\w+)${end}`, 'g'), (tag, prop) =>
    sourceObj[prop] !== undefined && sourceObj[prop] !== null ? sourceObj[prop] : tag,
  );

export default replaceValues;
