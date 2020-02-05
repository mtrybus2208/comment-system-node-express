const parseFilterFields = (filters, allowed) =>
  Object.keys(filters)
    .filter(name => allowed.includes(name))
    .reduce(
      (acc, res) => ({
        ...acc,
        [res]: filters[res],
      }),
      {},
    );

export default parseFilterFields;
