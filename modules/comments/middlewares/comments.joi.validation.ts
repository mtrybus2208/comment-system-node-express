import { Request, Response, NextFunction } from 'express';

import logAndSendMessage from '../../../lib/logErrorMessage/logErrorReturnMessage';
import { invalidDataInformation } from '../../../lib/logErrorMessage/errorMessageObject';
import commentSchema from './comments.joi.schema';
import { Comment } from '../../../types/comments/comments.interface';

const { enterComments } = commentSchema;

export const enterCommentsValidation = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const { comment }: { comment: Comment } = req.body;
    await enterComments.validateAsync(comment);

    next();
  } catch (error) {
    logAndSendMessage(req, res, error, invalidDataInformation);
  }
};
