import logAndSendMessage from "../../lib/logErrorMessage/logErrorReturnMessage";
import User from "./users.model";
import NotFoundError from "../../lib/logErrorMessage/NotFoundError";
import { invalidDataInformation } from "../../lib/logErrorMessage/errorMessageObject";

const usersController = {
  async createUser(req, res, next) {
    try {
      const { user } = req.body;
      const createdUser = await User.create(user);

      return res.status(201).json({
        message: "User have been created",
        user: createdUser
      });
    } catch (error) {
      logAndSendMessage(req, res, error, invalidDataInformation);
    }
  },

  async getUsers(req, res, next) {
    try {
      const users = await User.find({});
      return res.status(200).json({
        message: "Successful operation",
        users
      });
    } catch (error) {
      logAndSendMessage(req, res, error, invalidDataInformation);
    }
  },

  async getUser(req, res, next) {
    try {
      const { user, comments } = res.locals;
      return res.status(200).json({
        message: "Successful operation",
        user,
        comments
      });
    } catch (error) {
      logAndSendMessage(req, res, error, invalidDataInformation);
    }
  }
};

export default usersController;
