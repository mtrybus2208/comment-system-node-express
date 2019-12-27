import mongoose from 'mongoose';
import { ObjectId } from 'mongodb';
import roles from '../../config/roles';
import connectMatchingFields from '../../lib/helpers/comments/connectMatchingFields';

const { Schema } = mongoose;

const CommentsSchema = new Schema({
  createdAt: {
    type: Number,
    default: Date.now,
  },
  name: {
    type: String,
    required: true,
  },
  slug: {
    type: String,
    required: true,
  },
  copy: {
    type: String,
    required: true,
  },
  createdBy: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
});

CommentsSchema.statics = {
  getFilteredComments(data, user) {
    const filters = {};
    return connectMatchingFields(this, filters, user);
  },
};

export default mongoose.model('Comment', CommentsSchema, 'comments');
