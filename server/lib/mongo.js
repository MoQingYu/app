const config = require("config-lite")(__dirname);
const MongoLass = require("mongolass");
const mongolass = new MongoLass();

mongolass.connect(config.mongodb);

exports.User = mongolass.model("User", {
  name: { type: 'string', require: true },
  password: { type: "string", require: true },
  create_date: { type: MongoLass.Types.Date, require: true, default: Date.now },
});

exports.User.index({name: 1}, { unique: true }).exec();