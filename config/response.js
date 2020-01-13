const response = {
  authorizationFail: {
    status: 403,
    message: 'Forbidden access.',
  },
  invalidData: {
    status: 400,
    message: 'Invalid request data.',
  },
  resetPasswordInformation: {
    status: 400,
    message: 'User with given email does not exist',
  },
  jwtExpired: {
    status: 401,
    message: 'JWT token has expired, please login to obtain a new one',
  },
  jwtTokenTokenNotComplete: {
    status: 401,
    message: 'Token is not complete',
  },
  authentication: {
    status: 401,
    message: 'Incorrect email or password. Please re-enter your email and password.',
  },
};

export default response;
