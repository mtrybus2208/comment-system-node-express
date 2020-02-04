import { Request, Response } from 'express';

import logAndSendMessage from '../../lib/logErrorMessage/logErrorReturnMessage';
import NotFoundError from '../../lib/logErrorMessage/NotFoundError';
import { invalidDataInformation } from '../../lib/logErrorMessage/errorMessageObject';
import Comments from './comments.model';
import { Comment, EnterComment } from '../../types/comments/comments.interface';

const commentsController = {
  async enterComments(req: Request, res: Response): Promise<Response> {
    try {
      const commentReq: Comment = req.body.comment;
      const commentWithUser: EnterComment = {
        ...commentReq,
        createdBy: commentReq.createdBy,
      };

      const comment = await Comments.create(commentWithUser);

      res.locals.assay = comment;
      return res.status(201).json({
        message: 'Comment have been created',
        comment,
      });
    } catch (error) {
      logAndSendMessage(req, res, error, invalidDataInformation);
    }
  },

  async getComments(req: Request, res: Response): Promise<Response> {
    try {
      const data = req.body;
      const user = res.locals.loggedUser;

      const comments = await Comments.getFilteredComments(data, user);
      return res.status(200).json({
        message: 'Successful operation',
        comments,
      });
    } catch (error) {
      logAndSendMessage(req, res, error, invalidDataInformation);
    }
  },

  async getComment(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;
      const comment = await Comments.findById(id).populate('createdBy');
      if (!comment) throw new NotFoundError('comment');
      return res.status(200).json({
        message: 'Successful operation',
        comment,
      });
    } catch (error) {
      logAndSendMessage(req, res, error, invalidDataInformation);
    }
  },

  async deleteComment(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;
      await Comments.deleteOne({
        _id: id,
      });
      return res.status(200).json({
        message: 'Comment has been successfully deleted.',
        id,
      });
    } catch (error) {
      logAndSendMessage(req, res, error, invalidDataInformation);
    }
  },
};

export default commentsController;
