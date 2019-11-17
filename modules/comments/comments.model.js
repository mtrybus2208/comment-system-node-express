const mongoose = require('mongoose');

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
});

export default mongoose.model('Comments', CommentsSchema);
