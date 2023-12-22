import mongoose from 'mongoose';

const { Schema } = mongoose;

const UserSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      minLength: 5,
      maxLength: 20,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      max: 50,
      unique: true,
      validate: {
        validator: emailValidator,
        message: 'Invalid email format',
      },
    },
    password: {
      type: String,
      required: true,
      minLength: 8,
    },
    followers: {
      type: Array,
      default: [],
    },
    followings: {
      type: Array,
      default: [],
    },
    desc: {
      type: String,
      default: '',
      maxLength: 50,
    },
  },
  { timestamps: true }
);

function emailValidator(val) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val);
}

module.exports = mongoose.model('User', UserSchema);
