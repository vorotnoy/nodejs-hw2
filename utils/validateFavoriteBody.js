const { HttpError } = require("../helper");

const validateFavoriteBody = (schema) => {
  const func = async (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
      next(
        HttpError(
          400,
          `missing field favorite`
        )
      );
    }
    next();
  };
  return func;
};
module.exports = validateFavoriteBody;
