const { Schema, model } = require("mongoose");
const UserSchema = Schema({
  names: {
    type: String,
    required: true,
  },
  surnames: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  number: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

module.exports = model("User", UserSchema);
