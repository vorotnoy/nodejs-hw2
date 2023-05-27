const Joi = require("joi");
const { phonePattern } = require("../models/contacts");

const contactsAddSchema = Joi.object({
  name: Joi.string().required().label("name"),
  email: Joi.string().email().required().label("email"),
  phone: Joi.string().trim().required().label("phone"),
  favorite: Joi.boolean().label("favotite"),
});
const contactsUppdateFavoriteSchema = Joi.object({
  favorite: Joi.boolean().required(),
});

module.exports = { contactsAddSchema, contactsUppdateFavoriteSchema };
