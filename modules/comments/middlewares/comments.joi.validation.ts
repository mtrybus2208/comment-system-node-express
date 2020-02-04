import { Request, Response, NextFunction } from 'express';
import logAndSendMessage from '../../../lib/logErrorMessage/logErrorReturnMessage';
import { invalidDataInformation } from '../../../lib/logErrorMessage/errorMessageObject';
import commentSchema from './comments.joi.schema';

const { enterComments } = commentSchema;

export const enterCommentsValidation = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    await enterComments.validateAsync(req.body.comment);

    next();
  } catch (error) {
    logAndSendMessage(req, res, error, invalidDataInformation);
  }
};
