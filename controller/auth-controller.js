const { SECRET_KEY, DB_HOST, PORT, BASE_URL } = process.env;
const { ctrlWrapper } = require("../utils/index");
const { HttpError, sendEmail, sendVerify } = require("../helper");
const { User } = require("../models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const gravatar = require("gravatar");
const path = require("path");
const fs = require("fs/promises");
const Jimp = require("jimp");
const { nanoid } = require("nanoid");
require("dotenv").config();

const avatarDir = path.join("public", "avatars");

const register = async (req, res, next) => {
  const { password, email, subscription } = req.body;
  const user = await User.findOne({ email });

  if (user) {
    throw HttpError(409, "Email in use");
  }

  const hashPassword = await bcrypt.hash(password, 10);
  const avatarURL = gravatar.url(email);

  const verificationToken = nanoid();

  const newUser = await User.create({
    password: hashPassword,
    email,
    subscription,
    avatarURL,
    verificationToken,
  });

  const send = sendVerify(email, verificationToken);
  await sendEmail(send);

  res.status(201).json({
    user: {
      email: newUser.email,
      subscription: newUser.subscription,
      avatarURL: newUser.avatarURL,
    },
  });
};

const login = async (req, res, next) => {
  const { password, email } = req.body;
  const user = await User.findOne({ email });

  if (!user) {
    throw HttpError(401, "Email or password is wrong");
  }

  if (!user.verify) {
    throw HttpError(401, "Email is not verify");
  }
  const passwordCompareResult = await bcrypt.compare(password, user.password);

  if (!passwordCompareResult) {
    throw HttpError(401, "Email or password is wrong");
  }

  const payload = {
    id: user._id,
  };

  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "10h" });
  await User.findByIdAndUpdate(user._id, { token });
  res.json({
    token,
    user: {
      email: user.email,
      subscription: user.subscription,
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

const updateAvatar = async (req, res) => {
  const { path: tempPath, originalname } = req.file;
  const { _id } = req.user;
  const newName = `${req.user.email}-${originalname}`;
  const resultDir = path.join(avatarDir, newName);
  fs.rename(tempPath, resultDir);
  (await Jimp.read(resultDir)).resize(250, 250).write(resultDir);
  const avatarURL = path.join("avatars", newName);
  await User.findByIdAndUpdate(_id, { avatarURL });
  res.json({
    avatarURL,
  });
};

const verify = async (req, res) => {
  const { verificationToken } = req.params;

  const user = await User.findOne({ verificationToken });
  if (!user) {
    throw HttpError(401, "Not Found");
  }
  await User.findByIdAndUpdate(user._id, {
    verify: true,
    verificationToken: "",
  });

  res.json({
    message: "Verification successful",
  });
};

const resendEmail = async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    throw HttpError(401, "User not found");
  }
  if (user.verify) {
    throw HttpError(400, "Verification has already been passed");
  }

  const send = sendVerify(email, user.verificationToken);
  await sendEmail(send);

  res.json({
    message: "Verification email sent",
  });
};

module.exports = {
  register: ctrlWrapper(register),
  login: ctrlWrapper(login),
  logout: ctrlWrapper(logout),
  getCurrent: ctrlWrapper(getCurrent),
  updateById: ctrlWrapper(updateById),
  updateAvatar: ctrlWrapper(updateAvatar),
  verify: ctrlWrapper(verify),
  resendEmail: ctrlWrapper(resendEmail),
};
