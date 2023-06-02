const { SECRET_KEY, DB_HOST, PORT } = process.env;
const { ctrlWrapper } = require("../utils/index");
const { HttpError } = require("../helper");
const { User } = require("../models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const register = async (req, res, next) => {
  const { password, email, subscription } = req.body;
  const user = await User.findOne({ email });

  if (user) {
    throw HttpError(409, "Email in use");
  }

  const hashPassword = await bcrypt.hash(password, 10);

  const newUser = await User.create({
    password: hashPassword,
    email,
    subscription,
  });
  res.status(201).json(
 { "user": {
    email: newUser.email,
    subscription: newUser.subscription,
  }})
};

const login = async (req, res, next) => {
  const { password, email } = req.body;
  const user = await User.findOne({ email });

  if (!user) {
    throw HttpError(401, "Email or password is wrong");
  }
  const passwordCompareResult = await bcrypt.compare(password, user.password);

  if (!passwordCompareResult) {
    throw HttpError(401, "Email or password is wrong");
  }
  const payload = {
    id: user._id,
  };

  const token = jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: "10h" });
  await User.findByIdAndUpdate(user._id, { token });
  res.json({
    token,
    user: {
      email: user.email,
      subsciption: user.subscription,
    },
  });
};
const logout = async (req, res) => {
  const { _id } = req.user;
  await User.findByIdAndUpdate(_id, { token: "" });

  res.status(204).json();
};

const updateById = async (req, res) => {
  const { _id } = req.user;
  const updatedUser = await User.findByIdAndUpdate(_id, req.body, {
    new: true,
  });
  if (!updatedUser) throw HttpError(404);
  res.status(200).json({
    email: updatedUser.email,
    subscription: updatedUser.subscription,
  });
};

const getCurrent = async (req, res) => {
  const { email, subscription } = req.user;
  res.json({
    email,
    subscription,
  });
};

module.exports = {
  register: ctrlWrapper(register),
  login: ctrlWrapper(login),
  logout: ctrlWrapper(logout),
  getCurrent: ctrlWrapper(getCurrent),
  updateById: ctrlWrapper(updateById),
};
