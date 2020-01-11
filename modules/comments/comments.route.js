import express from 'express';
import commentsController from './comments.controller';
import { enterCommentsValidation } from './middlewares/comments.joi.validation';
import { getCommentsAuth } from './middlewares/comments.authorization';

import accessTokenVerify from '../../lib/authorization/accessTokenVerify';

const router = express.Router();
const subRouter = express.Router();

router.use('/comments', subRouter);

subRouter.post('/', enterCommentsValidation, commentsController.enterComments);

/**
 * @swagger
 * /comments/filtered:
 *  $ref: ./swagger/comments.yaml/#/getComments
 */
subRouter.post('/filtered', accessTokenVerify, getCommentsAuth, commentsController.getComments);

subRouter.get('/:id', commentsController.getComment);

subRouter.delete('/:id', commentsController.deleteComment);

export default router;
