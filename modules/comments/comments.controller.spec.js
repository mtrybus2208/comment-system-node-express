import { expect } from 'chai';
import sinon from 'sinon';
import proxyquire from 'proxyquire';
import httpMocks from 'node-mocks-http';
import chai from 'chai';
require('babel-polyfill');

describe('Comments controller', () => {
  const modelStub = sinon.stub();
  const logAndSendMessageStub = sinon.stub();
  const nextStub = sinon.stub();

  let request;
  let response;

  const commentsController = proxyquire('./comments.controller.js', {
    './comments.model': {
      create: modelStub,
      getFilteredComments: modelStub,
      deleteOne: modelStub,
    },
    '../../lib/logErrorMessage/logErrorReturnMessage': logAndSendMessageStub,
  });

  beforeEach(() => {
    response = httpMocks.createResponse();
    request = httpMocks.createRequest();
  });

  afterEach(() => {
    nextStub.resetHistory();
    logAndSendMessageStub.resetHistory();
    modelStub.resetHistory();
  });

  describe('enterComments', () => {
    beforeEach(() => {
      request.body = {
        comment: {
          name: 'John Doe1',
          slug: '/slug-no-1',
          copy: 'lorem ipsum',
          createdAt: 1573913581802,
        },
      };
    });

    it('should create new comment', async () => {
      modelStub.resolves({ _id: 'foo' });

      await commentsController.enterComments(request, response, nextStub);

      sinon.assert.calledOnce(modelStub);
      chai.expect(response.locals.assay).to.deep.eq({ _id: 'foo' });
    });

    it('should call logAndSendMessage on error', async () => {
      modelStub.rejects();

      await commentsController.enterComments(request, response, nextStub);

      sinon.assert.calledOnce(logAndSendMessageStub);
    });
  });

  describe('getComments ', () => {
    const comments = [{ _id: 'foo1' }, { _id: 'foo2' }];
    it('should return all comments', async () => {
      modelStub.resolves(comments);

      await commentsController.getComments(request, response, nextStub);
      const res = JSON.parse(response._getData());

      chai.expect(res.comments).to.deep.eq([{ _id: 'foo1' }, { _id: 'foo2' }]);
    });
  });

  describe('deleteComment', () => {
    it('should delete comment with given id', async () => {
      const id = 3;
      request = {
        params: {
          id,
        },
      };
      modelStub.resolves();

      await commentsController.deleteComment(request, response, nextStub);

      sinon.assert.calledWithExactly(modelStub, { _id: id });
      const res = JSON.parse(response._getData());
      chai.expect(res.id).to.be.eq(id);
    });

    it('should call logAndSendMessage upon failure', async () => {});
  });
});
