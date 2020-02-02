import { expect } from 'chai';
import sinon from 'sinon';
import proxyquire from 'proxyquire';
import httpMocks from 'node-mocks-http';
import chai from 'chai';

describe('Comments validation', () => {
  const joiStub = sinon.stub();
  const logAndSendMessageStub = sinon.stub();
  const nextStub = sinon.stub();

  let request;
  let response;

  const commentsValidation = proxyquire('./comments.joi.validation.js', {
    './comments.joi.schema': {
      validateAsync: joiStub,
    },
    '../../../lib/logErrorMessage/logErrorReturnMessage': logAndSendMessageStub,
  });

  beforeEach(() => {
    request = httpMocks.createRequest();
    response = httpMocks.createResponse();
  });

  afterEach(() => {
    joiStub.resetHistory();
    logAndSendMessageStub.resetHistory();
    nextStub.resetHistory();
  });

  describe('enterCommentsValidation', async () => {
    it('should call next on validation success', async () => {
      joiStub.resolves();
      await commentsValidation.enterCommentsValidation(request, response, nextStub);

      sinon.assert.calledOnce(nextStub);
    });

    it('should call logAndSendMessage on validation failure', async () => {
      joiStub.rejects();
      try {
        await commentsValidation.enterCommentsValidation(request, response, nextStub);
      } catch (e) {
        sinon.assert.calledOnce(logAndSendMessageStub);
      }
    });
  });
});
