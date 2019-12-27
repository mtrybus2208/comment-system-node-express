import roles from '../../../config/roles';

const connectMatchingFields = (collection, filters, user) => {
  let fieldsMatch;

  if (user.name === roles.admin.name) {
    fieldsMatch = {};
  } else {
    fieldsMatch = {
      ...fieldsMatch,
      createdBy: ObjectId(user._id),
    };
  }
  return collection.find(fieldsMatch);
};

export default connectMatchingFields;
