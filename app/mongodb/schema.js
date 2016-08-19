import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const UserModel = new Schema({
  name:String,
  userId: String,
  tel: String,
  email: String
});
const User = mongoose.model('users', UserModel);
module.exports = {User};
