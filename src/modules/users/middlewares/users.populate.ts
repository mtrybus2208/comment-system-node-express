import { Request, Response, NextFunction } from 'express';

import Comment from '../../comments/comments.model';
import logAndSendMessage from '../../../lib/logErrorMessage/logErrorReturnMessage';
import User from '../users.model';
import { invalidDataInformation } from '../../../lib/logErrorMessage/errorMessageObject';
import NotFoundError from '../../../lib/logErrorMessage/NotFoundError';
import { UserModel } from '../../../types/users/users.types';
import { CommentModel } from '../../../types/comments/comments.types';

export const populateComments = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  const { _id } = res.locals.user;

  try {
    const comments: CommentModel[] = await Comment.find({ createdBy: _id });
    if (!comments) throw new NotFoundError('comments');
    res.locals.comments = comments;
    next();
  } catch (error) {
    logAndSendMessage(req, res, error, invalidDataInformation);
  }
};

export const populateDetails = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const { id } = req.params;
    const user: UserModel = await User.findById(id);

    if (!user) throw new NotFoundError('user');
    res.locals.user = user;
    next();
  } catch (error) {
    logAndSendMessage(req, res, error, invalidDataInformation);
  }
};
