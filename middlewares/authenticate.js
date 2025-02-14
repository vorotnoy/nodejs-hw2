const { HttpError } = require("../helper");
const jwt = require("jsonwebtoken");
const { SECRET_KEY, PORT } = process.env;
const { User } = require("../models");
require('dotenv').config()

const authenticate = async (req, res, next) => {
  const { authorization = "" } = req.headers;
  const [bearer, token] = authorization.split(" ");

  if (bearer !== "Bearer") {
    next(HttpError(401, "Unauthenticate"));
  }
  try {
    const { id } = jwt.verify(token, SECRET_KEY);
    const user = await User.findById(id);
    if (!user|| !user.token || token !== user.token) {
      next(HttpError(401, "Unauthenticate"));
    }
    req.user = user;
    next();
  } catch (error) {
    next(HttpError(401, "Unauthenticate"));
  }
};
module.exports = authenticate;
