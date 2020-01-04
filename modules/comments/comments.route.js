import express from 'express';
import commentsController from './comments.controller';
import { enterCommentsValidation } from './middlewares/comments.joi.validation';
import { getCommentsAuth } from './middlewares/comments.authorization';

import accessTokenVerify from '../../lib/authorization/accessTokenVerify';

const router = express.Router();
const subRouter = express.Router();

router.use('/comments', subRouter);

/**
 * @swagger
 * /comments:
 *  $ref: ./swagger/comments.yaml/#/comments
 */
subRouter.post('/', enterCommentsValidation, commentsController.enterComments);

/**
 * @swagger
 * /comments/filtered:
 *  $ref: ./swagger/comments.yaml/#/getComments
 */
subRouter.post('/filtered', accessTokenVerify, getCommentsAuth, commentsController.getComments);

/**
 * @swagger
 * /comments/{id}:
 *  $ref: ./swagger/comments.yaml/#/getComment
 */
subRouter.get('/:id', commentsController.getComment);

/**
 * @swagger
 * /comments/{id}:
 *  $ref: ./swagger/comments.yaml/#/deleteComment
 */
subRouter.delete('/:id', commentsController.deleteComment);

export default router;
