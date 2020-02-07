import mongoose, { Schema } from 'mongoose';

import connectMatchingFields from '../../lib/helpers/comments/connectMatchingFields';
import paginate from '../../lib/paginate';
import parseFilterFields from '../../lib/helpers/comments/parseFilterFields';
import { CommentModel, CommentSchema } from '../../types/comments/comments.types';

const CommentsSchema: Schema = new Schema({
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
  getFilteredComments(data, user): Promise<any[]> {
    const limit = parseInt(data.pagination.limit, 10);
    const page = parseInt(data.pagination.page, 10);
    const filters = parseFilterFields(data.filters, ['slug']);
    const fieldsMatch = connectMatchingFields(this, filters, user);

    const options = {
      page,
      limit,
    };

    return paginate(this, options, {
      $match: fieldsMatch,
    });
  },
};

export default mongoose.model<CommentModel, CommentSchema>('Comment', CommentsSchema, 'comments');
// https://github.com/Microsoft/TypeScript-Node-Starter/issues/101
