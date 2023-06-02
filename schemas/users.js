const Joi = require("joi");

const userRegisterSchema = Joi.object({
  email: Joi.string().email().required().label("email"),
  password: Joi.string().trim().required().label("password"),
  //   subscription:Joi.string().label("subscription"),
});

const userLoginSchema = Joi.object({
  email: Joi.string().email().required().label("email"),
  password: Joi.string().trim().required().label("password"),
});
const updateUserSubcriptionSchema = Joi.object({
  subscription: Joi.string().trim().valid('starter', 'pro', 'business').required()
})
module.exports = { userRegisterSchema, userLoginSchema, updateUserSubcriptionSchema};
