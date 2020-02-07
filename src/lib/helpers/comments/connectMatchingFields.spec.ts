import proxyquire from 'proxyquire';
import chai from 'chai';

proxyquire.noCallThru();

describe('connectMatchingFields function', () => {
  const collection = null;
  const filters = {};
  let user = { _id: 'foo', name: 'admin' };

  const { default: connectMatchingFields } = proxyquire('./connectMatchingFields.js', {
    '../../../config/roles': {
      admin: {
        name: 'admin',
      },
    },
  });

  beforeEach(() => {});

  afterEach(() => {});

  it('should return empty object when user role is admin', () => {
    const fieldsMatch = connectMatchingFields(collection, filters, user);

    chai.expect(fieldsMatch).to.eql({});
  });

  it('should return valid object when user role is base', () => {
    user = { _id: 'foo', name: 'base' };
    const fieldsMatch = connectMatchingFields(collection, filters, user);

    chai.expect(fieldsMatch.createdBy).to.eql(user._id);
  });
});
