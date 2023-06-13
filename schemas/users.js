const Joi = require("joi");

const userRegister = Joi.object({
  email: Joi.string().email().required().label("email"),
  password: Joi.string().trim().required().label("password"),
  //   subscription:Joi.string().label("subscription"),
});

const userLogin = Joi.object({
  email: Joi.string().email().required().label("email"),
  password: Joi.string().trim().required().label("password"),
});
const updateUserSubcription = Joi.object({
  subscription: Joi.string()
    .trim()
    .valid("starter", "pro", "business")
    .required(),
});

const email=Joi.object({
  email: Joi.string().email().required().label("email"),
})

const userSchema = {
  userRegister,
  userLogin,
  updateUserSubcription,
  email,
};
module.exports = {
  userSchema
};
