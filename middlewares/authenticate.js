const { HttpError } = require("../helper");
const jwt = require("jsonwebtoken");
const { SECRET_KEY, PORT } = process.env;
const { User } = require("../models");

const authenticate = async (req, res, next) => {
  const { authorization = "" } = req.headers;
  const [bearer, token] = authorization.split(" ");

  if (bearer !== "Bearer") {
    next(HttpError(401, "Unauthenticate1"));
  }
  try {
    const { id } = jwt.verify(token, process.env.SECRET_KEY);
    const user = await User.findById(id);
    if (!user) {
      next(HttpError(401, "Unauthenticate2"));
    }
    req.user = user;
    next();
  } catch (error) {
    next(HttpError(401, "Unauthenticate3"));
  }
};
module.exports = authenticate;
