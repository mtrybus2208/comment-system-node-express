import express, { IRouter } from 'express';

import commentsController from './comments.controller';
import { enterCommentsValidation } from './middlewares/comments.joi.validation';
import { getCommentsAuth } from './middlewares/comments.authorization';
import clientApiKeyVerify from '../../lib/authorization/clientApiKeyVerify';

const { enterComments, getComments, getComment, deleteComment } = commentsController;

const router: IRouter = express.Router();
const subRouter: IRouter = express.Router();

router.use('/comments', subRouter);

subRouter.post('/', enterCommentsValidation, enterComments);

/**
 * @swagger
 * /comments/filtered:
 *  $ref: ./src/swagger/comments.yaml/#/getComments
 */
subRouter.post('/filtered', clientApiKeyVerify, getCommentsAuth, getComments);

subRouter.get('/:id', getComment);

subRouter.delete('/:id', deleteComment);

export default router;
