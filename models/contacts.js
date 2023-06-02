const { Schema, model } = require("mongoose");
const { handleMongooseError } = require("../helper");

const phonePattern = /^(d{3})sd{3}-d{4}$/;

const contactsSchema = Schema({
  name: {
    type: String,
    required: [true, 'Set name for contact'],
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
    // match: phonePattern,
  },
  favorite: {
    type: Boolean,
    required: true,
    default: false,
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'user',
    required:true,
  }
}, { versionKey: false, timestamps: false },);

contactsSchema.post("save", handleMongooseError);
const Contacts = model("contact", contactsSchema);

module.exports = { Contacts, phonePattern };