const response = {
  authorizationFail: {
    status: 403,
    message: 'Forbidden access.',
  },
  invalidData: {
    status: 400,
    message: 'Invalid request data.'
  },
  jwtExpired: {
    status: 401,
    message: 'JWT token has expired, please login to obtain a new one',
  },
  jwtTokenTokenNotComplete: {
    status: 401,
    message: 'Token is not complete',
  },
};

export default response;
