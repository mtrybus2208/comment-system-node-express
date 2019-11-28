const mongoose = require("mongoose");
const validators = require("mongoose-validators");

const { Schema } = mongoose;

const User = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    validate: [
      validators.isLength(
        {
          message: "usersValidation.email.validate.EN.message.length"
        },
        0,
        100
      ),
      validators.isEmail({
        message: "usersValidation.email.validate.EN.message.regex"
      })
    ],
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  page: {
    type: String,
    required: false
  },
  comments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comment" }]
});

export default mongoose.model("User", User, "users");
