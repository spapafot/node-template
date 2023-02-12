const User = require("../models/userModel");
const bcrypt = require("bcryptjs");

exports.signUp = async (req, res) => {
  const { username, password } = req.body;

  try {
    const hash = await bcrypt.hash(password, 12);
    const user = await User.create({ username, password: hash });
    req.session.user = user
    res.status(201).json({
      status: "success",
      data: { user },
    });
  } catch (error) {
    console.log(error)
    res.status(400).json({
      status: "fail",
    });
  }
};

exports.login = async (req, res) => {
  const { username, password } = req.body;
  const hash = await bcrypt.hash(password, 12);

  try {
    const user = await User.findOne({ username });

    if (!user) {
      res.status(404).json({
        status: "fail",
        message: "user not found",
      });
    } else {
      const isCorrect = await bcrypt.compare(password, user.password);
      if (isCorrect) {
        req.session.user = user
        res.status(200).json({
          status: "success",
        });
      } else {
        res.status(404).json({
          status: "fail",
          message: "invalid credentials",
        });
      }
    }
  } catch (error) {
    console.log(error)
    res.status(400).json({
      status: "fail",
    });
  }
};
