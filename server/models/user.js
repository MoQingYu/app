const User = require("../lib/mongo").User;

module.exports = {
  create: function (user) {
    return User.insertOne(user).exec();
  },
  getUserByName: function (name) {
    return User
      .findOne({name})
      .exec();
  }
}