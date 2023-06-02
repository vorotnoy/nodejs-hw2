const {
  contactsAddSchema,
  contactsUppdateFavoriteSchema,
} = require("./contacts");

const { userLoginSchema, userRegisterSchema, updateUserSubcriptionSchema } = require("./users");

module.exports = {
  contactsAddSchema,
  contactsUppdateFavoriteSchema,
  userLoginSchema,
  userRegisterSchema,
  updateUserSubcriptionSchema
};
