const { Schema, model } = require('mongoose');
const { compareSync, hashSync } = require('bcryptjs');

const opts = { toJSON: { virtuals: true }, toObject: { virtuals: true } };
const UserSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      unique: true,
      required: true,
    },

    password: {
      type: String,
    },

    picture: {
      type: String,
    },

    googleId: {
      type: String,
    },

    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  opts,
);

/* eslint-disable */
UserSchema.methods.setPassword = function (password) {
  try {
    const user = this;
    const hash = hashSync(password, 8, this.password);
    user.password = hash;
    return true;
  } catch (error) {
    throw new Error(error.message);
  }
};
// eslint-disable-next-line func-names
UserSchema.methods.validPassword = function (password) {
  try {
    return compareSync(password, this.password);
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = model('User', UserSchema);
