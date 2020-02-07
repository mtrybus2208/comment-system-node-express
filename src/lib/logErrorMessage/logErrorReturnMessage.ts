/* eslint no-console: 0 */
import chalk from 'chalk';
import { Response, Request } from 'express';

import { ResponseInformation } from '../../types/shared/responseInformation.types';

const logAndSendMessage = (
  req: Request,
  res: Response,
  err,
  responseInformation: ResponseInformation,
): Response => {
  console.log(chalk.italic.red(err));
  return res.status(responseInformation.status).json({
    msg: responseInformation.message,
    err,
  });
};

export default logAndSendMessage;
