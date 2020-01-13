import response from '../../config/response';

export const invalidDataInformation = {
  status: response.invalidData.status,
  message: response.invalidData.message,
};

export const authenticationInformation = {
  status: response.authentication.status,
  message: response.authentication.message,
};

export const resetPasswordInformation = {
  status: response.resetPasswordInformation.status,
  message: response.resetPasswordInformation.message,
};
