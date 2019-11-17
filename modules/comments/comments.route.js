import express from 'express';
import commentsController from './comments.controller';

const router = express.Router();
const subRouter = express.Router();

router.use('/comments', subRouter);

/**
 * @swagger
 * /comments:
 *  $ref: ./swagger/comments.yaml/#/comments
 */
subRouter.post(
  '/',
  commentsController.enterComments,
);

/**
 * @swagger
 * /comments/:
 *  $ref: ./swagger/comments.yaml/#/getComments
 */
subRouter.get(
  '/',
  commentsController.getComments,
);

/**
 * @swagger
 * /comments/{id}:
 *  $ref: ./swagger/comments.yaml/#/getComment
 */
subRouter.get(
  '/:id',
  commentsController.getComment,
);


/**
 * @swagger
 * /comments/{id}:
 *  $ref: ./swagger/comments.yaml/#/deleteComment
 */
subRouter.delete(
  '/:id',
  commentsController.deleteComment,
);

export default router;
