import express from "express";
import usersController from "./users.controller";

const router = express.Router();
const subRouter = express.Router();

router.use("/users", subRouter);

subRouter.post("/", usersController.createUser);

subRouter.get("/", usersController.getUsers);

subRouter.get("/:id", usersController.getUser);

export default router;
