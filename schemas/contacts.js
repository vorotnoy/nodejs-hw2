const Joi = require("joi");
const { phonePattern } = require("../models/contacts");

const Add = Joi.object({
  name: Joi.string().required().label("name"),
  email: Joi.string().email().required().label("email"),
  phone: Joi.string().trim().required().label("phone"),
  favorite: Joi.boolean().label("favotite"),
});
const UppdateFavorite = Joi.object({
  favorite: Joi.boolean().required(),
});

const contactSchema= {
  Add,
  UppdateFavorite
}

module.exports = { contactSchema };
