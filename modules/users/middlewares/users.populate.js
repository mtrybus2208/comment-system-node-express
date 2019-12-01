import Comment from "../../comments/comments.model";
import logAndSendMessage from "../../../lib/logErrorMessage/logErrorReturnMessage";
import User from "../users.model";
import { invalidDataInformation } from "../../../lib/logErrorMessage/errorMessageObject";

export const populateComments = async (req, res, next) => {
  const { _id } = res.locals.user;

  try {
    const comments = await Comment.find({ createdBy: _id });
    if (!comments) throw new NotFoundError("comments");
    res.locals.comments = comments;
    next();
  } catch (error) {
    logAndSendMessage(req, res, error, invalidDataInformation);
  }
};

export const populateDetails = async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);

    if (!user) throw new NotFoundError("user");
    res.locals.user = user;
    next();
  } catch (error) {
    logAndSendMessage(req, res, error, invalidDataInformation);
  }
};
