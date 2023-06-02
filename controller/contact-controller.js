const { ctrlWrapper } = require("../utils/index");
const contactChange = require("../models/operation");
const { HttpError } = require("../helper");
const { Contacts, User } = require("../models/");

const getList = async (req, res, next) => {
  const { _id: owner } = req.user;
  const { page = 1, limit = 5 } = req.query;
  const skip = (page - 1) * limit;
  const contacts = await Contacts.find({ owner }, skip, limit);
  res.json(contacts);
};

const getContactsbyId = async (req, res, next) => {
  const { id } = req.params;
  const { _id: owner } = req.user;
  const contact = await Contacts.findOne({ _id: id, owner });
  if (!contact) {
    throw HttpError(404);
  }
  res.status(200).json(contact);
};

const addContacts = async (req, res, next) => {
  const { _id: owner } = req.user;
  const newContact = await Contacts.create({ ...req.body, owner });
  res.status(201).json(newContact);
};

const delContacts = async (req, res, next) => {
  const { id } = req.params;
  const { _id: owner } = req.user;
  const removeContacts = await Contacts.deleteOne({ _id: id, owner });
  if (removeContacts.deletedCount === 0) {
    throw HttpError(404);
  }
  res.json({ message: "contact deleted" });
};

const updateContacts = async (req, res, next) => {
  const { id } = req.params;
  const { _id: owner } = req.user;
  const contactUp = await Contacts.updateOne(
    { _id: id, owner },
    req.body,
    { new: true },
    "favorite"
  );
  if (contactUp.modifiedCount === 0) {
    throw HttpError(404);
  }
  const contact = await User.findById(id);
  res.json(contact);
};

const updateFavorite = async (req, res, next) => {
  const { id } = req.params;
  const { _id: owner } = req.user;
  const contactUp = await Contacts.updateOne(
    { _id: id, owner },
    req.body,
    { new: true },
    "favorite"
  );
  if (!contactUp) {
    throw HttpError(404);
  }
  const contact = await User.findById(id);
  res.json(contact);
};

module.exports = {
  getList: ctrlWrapper(getList),
  getContactsbyId: ctrlWrapper(getContactsbyId),
  addContacts: ctrlWrapper(addContacts),
  delContacts: ctrlWrapper(delContacts),
  updateContacts: ctrlWrapper(updateContacts),
  updateFavorite: ctrlWrapper(updateFavorite),
};
