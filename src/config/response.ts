import { ResponseInformationDefinition } from '../types/shared/responseInformation.types';

const response: ResponseInformationDefinition = {
  authorizationFail: {
    status: 403,
    message: 'Forbidden access.',
  },
  invalidData: {
    status: 400,
    message: 'Invalid request data.',
  },
  resetPasswordInformationEmail: {
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
  newPasswordInformationFail: {
    status: 400,
    message:
      'Incorrect password format. It must be between 5 and 15 digits long and include at least one numeric digit.',
  },
};

export default response;
