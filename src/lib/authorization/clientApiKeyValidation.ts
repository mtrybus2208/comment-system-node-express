import CryptoJS from 'crypto-js';

import { apiKeyConfig } from '../../config/apiKeyConfig';

export const apiKeyEncryption = (data: string): string =>
  CryptoJS.AES.encrypt(data, apiKeyConfig.secret).toString();

export const apiKeyDecryption = (data: string): string => {
  const bytes = CryptoJS.AES.decrypt(data.toString(), apiKeyConfig.secret);
  return bytes.toString(CryptoJS.enc.Utf8);
};
