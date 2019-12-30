// need to unify paginate method
const paginate = async (collection, options, ...aggregationSteps) => {
  const { limit, page } = options;

  const aggr = await collection.aggregate([
    ...aggregationSteps,
    {
      $facet: {
        total: [{ $count: 'total' }],
        results: [{ $skip: (page - 1) * limit }, { $limit: +limit || Number.MAX_SAFE_INTEGER }],
      },
    },
  ]);

  return aggr.reduce(
    (acc, res) => ({
      results: (res && res.results) || [],
      total: (res && res.total && res.total[0] && res.total[0].total) || 0,
    }),
    {},
  );
};

export default paginate;
