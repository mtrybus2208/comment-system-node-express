import roles from '../../../config/roles';

const connectMatchingFields = (collection, filters, user) => {
  let fieldsMatch;

  if (user.name === roles.admin.name) {
    fieldsMatch = {};
  } else {
    fieldsMatch = {
      ...fieldsMatch,
      createdBy: user._id,
    };
  }

  if (filters) {
    fieldsMatch = {
      ...fieldsMatch,
      ...filters,
    };
  }
  return fieldsMatch;
};

export default connectMatchingFields;
