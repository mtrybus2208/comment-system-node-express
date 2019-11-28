import express from "express";
import usersController from "./users.controller";
import {
  populateDetails,
  populateComments
} from "./middlewares/users.populate";

const router = express.Router();
const subRouter = express.Router();

router.use("/users", subRouter);

subRouter.post("/", usersController.createUser);

subRouter.get("/", usersController.getUsers);

subRouter.get(
  "/:id",
  populateDetails,
  populateComments,
  usersController.getUser
);

export default router;
