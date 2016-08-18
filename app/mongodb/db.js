import mongoose from'mongoose';

module.exports = {
  connect: function () {
    mongoose.connect('mongodb://localhost/login');
  },
  close: function () {
    mongoose.connection.close();
  }
};
