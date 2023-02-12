const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "Please user"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Please pass"],
  },
});

const User = mongoose.model("User", userSchema);
module.exports = User;
