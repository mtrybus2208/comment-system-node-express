import {
  ObjectId
} from 'mongodb';
import logAndSendMessage from '../../lib/logErrorMessage/logErrorReturnMessage';
import Comments from './comments.model';
import NotFoundError from '../../lib/logErrorMessage/NotFoundError';
import {
  invalidDataInformation
} from '../../lib/logErrorMessage/errorMessageObject';

const commentsController = {
  async enterComments(req, res, next) {
    try {
      const commentReq = req.body.comment;
      const commentWithUser = {
        ...commentReq,
        createdBy: ObjectId(commentReq.createdBy)
      };

      const comment = await Comments.create(commentWithUser);
      res.locals.assay = comment;
      return res.status(201).json({
        message: "Comment have been created",
        comment
      });
    } catch (error) {
      logAndSendMessage(req, res, error, invalidDataInformation);
    }
  },

  async getComments(req, res, next) {
    try {
      const comments = await Comments.find({}).populate("createdBy");
      return res.status(200).json({
        message: "Successful operation",
        comments
      });
    } catch (error) {
      logAndSendMessage(req, res, error, invalidDataInformation);
    }
  },

  async getComment(req, res, next) {
    try {
      const {
        id
      } = req.params;
      const comment = await Comments.findById(id).populate("createdBy");
      if (!comment) throw new NotFoundError("comment");
      return res.status(200).json({
        message: "Successful operation",
        comment
      });
    } catch (error) {
      logAndSendMessage(req, res, error, invalidDataInformation);
    }
  },

  async deleteComment(req, res, next) {
    try {
      const {
        id
      } = req.params;
      await Comments.deleteOne({
        _id: id
      });
      return res.status(200).json({
        message: "Comment has been successfully deleted.",
        id
      });
    } catch (error) {
      logAndSendMessage(req, res, error, invalidDataInformation);
    }
  }
};

export default commentsController;
