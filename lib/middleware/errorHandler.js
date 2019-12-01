const errorHandler = () => async (err, req, res, next) => {
  return res.status(401).json({
    message: 'Unauthorized',
  });
}

export default errorHandler;
