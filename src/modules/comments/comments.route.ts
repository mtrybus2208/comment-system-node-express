import express, { IRouter } from 'express';

import commentsController from './comments.controller';
import { enterCommentsValidation } from './middlewares/comments.joi.validation';
import { getCommentsAuth } from './middlewares/comments.authorization';
import accessTokenVerify from '../../lib/authorization/accessTokenVerify';

const { enterComments, getComments, getComment, deleteComment } = commentsController;

const router: IRouter = express.Router();
const subRouter: IRouter = express.Router();

router.use('/comments', subRouter);

subRouter.post('/', enterCommentsValidation, enterComments);

/**
 * @swagger
 * /comments/filtered:
 *  $ref: ./swagger/comments.yaml/#/getComments
 */
subRouter.post('/filtered', accessTokenVerify, getCommentsAuth, getComments);

subRouter.get('/:id', getComment);

subRouter.delete('/:id', deleteComment);

export default router;
