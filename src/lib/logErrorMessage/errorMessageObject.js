import response from '../../config/response';

export const invalidDataInformation = {
  status: response.invalidData.status,
  message: response.invalidData.message,
};

export const authenticationInformation = {
  status: response.authentication.status,
  message: response.authentication.message,
};

export const resetPasswordInformationEmail = {
  status: response.resetPasswordInformationEmail.status,
  message: response.resetPasswordInformationEmail.message,
};

export const newPasswordInformationFail = {
  status: response.newPasswordInformationFail.status,
  message: response.newPasswordInformationFail.message,
};
