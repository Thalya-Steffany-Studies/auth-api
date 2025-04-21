import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  password: {
    type: String,
    required: true
  },
  refreshToken: {
    type: String,
    default: null
  }
});

const UserModel = mongoose.model('User', UserSchema);

export default UserModel
