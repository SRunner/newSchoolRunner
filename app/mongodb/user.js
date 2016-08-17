import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const User = new Schema({
  ID: Number,
  name: String,
  password: String,
  email: String,
  tel: String
});
const Users = mongoose.model('users', User);

module.exports = Users;
