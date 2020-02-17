import sinon from 'sinon';
import proxyquire from 'proxyquire';
import httpMocks from 'node-mocks-http';
import chai from 'chai';

proxyquire.noCallThru();

describe('Users controller', () => {
  const usersStub = sinon.stub();

  const logAndSendMessageStub = sinon.stub();
  const nextStub = sinon.stub();
  const jwtStub = sinon.stub();
  const sendEmailStub = sinon.stub();

  let request;
  let response;

  const { default: usersController } = proxyquire('./users.controller.ts', {
    './users.model': {
      findOne: usersStub,
      findById: usersStub,
      save: usersStub,
    },
    '../../lib/helpers/users/sendEmail': sendEmailStub,
    '../../lib/logErrorMessage/logErrorReturnMessage': logAndSendMessageStub,
    jsonwebtoken: {
      sign: jwtStub,
      verify: jwtStub,
    },
  });

  beforeEach(() => {
    response = httpMocks.createResponse();
    request = httpMocks.createRequest();
  });

  afterEach(() => {
    nextStub.resetHistory();
    logAndSendMessageStub.resetHistory();
    usersStub.resetHistory();
  });

  describe('findUserByEmail', () => {
    beforeEach(() => {
      request = {
        body: {
          email: 'test@t.com',
        },
      };
    });

    it('should  call next on success', async () => {
      const user = {
        password: '123',
      };

      usersStub.resolves(user);

      await usersController.findUserByEmail(request, response, nextStub);

      sinon.assert.calledWithExactly(usersStub, {
        email: {
          $regex: new RegExp(`^${request.body.email}$`, 'i'),
        },
      });
      sinon.assert.calledOnce(nextStub);
      chai.expect(response.locals.user).to.deep.equal(user);
    });

    it('should not call next when it wont find user with given name', async () => {
      usersStub.resolves(null);

      await usersController.findUserByEmail(request, response, nextStub);

      sinon.assert.calledWithExactly(usersStub, {
        email: {
          $regex: new RegExp(`^${request.body.email}$`, 'i'),
        },
      });
      sinon.assert.notCalled(nextStub);
    });
  });

  describe('generatePasswordResetToken', () => {
    beforeEach(() => {
      response = {
        locals: {
          user: {
            _id: '123',
          },
        },
      };
    });

    it('should pass token to locals and call next on success', async () => {
      const userSaveStub = sinon.stub();
      const token = 'generatedToken';

      userSaveStub.resolves();

      usersStub.resolves({
        save: userSaveStub,
        tokens: {
          passwordReset: 'old',
        },
      });

      jwtStub.returns(token);

      await usersController.generatePasswordResetToken(request, response, nextStub);

      sinon.assert.calledWithExactly(usersStub, response.locals.user._id);
      sinon.assert.calledOnce(jwtStub);
      chai.expect(response.locals.token).to.equal(token);
      sinon.assert.calledOnce(nextStub);
    });

    it('should call logAndSendMessage upon failure', async () => {
      usersStub.rejects();

      await usersController.generatePasswordResetToken(request, response, nextStub);

      sinon.assert.calledOnce(logAndSendMessageStub);
    });
  });

  describe('sendResetPasswordEmail', () => {
    it('should call next on success', async () => {
      response = {
        locals: {
          user: {
            _id: '123',
            email: 'john@doe.com',
          },
          token: '123',
        },
      };

      sendEmailStub.resolves();
      await usersController.sendResetPasswordEmail(request, response, nextStub);

      sinon.assert.calledOnce(nextStub);
    });
  });

  describe('sendResetPasswordEmailSuccess', () => {
    it('should send response which contains email given in the request body', async () => {
      request = {
        body: {
          email: 'test@t.com',
        },
      };
      await usersController.sendResetPasswordEmailSuccess(request, response, nextStub);

      const resData = JSON.parse(response._getData());

      chai.expect(resData.message).to.have.string(request.body.email);
    });
  });

  describe('getTokenPayload', () => {
    it('should verify token and pass user id to locals', async () => {});

    it('should call next on success', async () => {});
    it('should call logAndSendMessage upon failure', async () => {});
  });
});
