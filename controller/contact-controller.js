const { ctrlWrapper } = require("../utils/index");
const contactChange = require("../models/operation");
const { HttpError } = require("../helper");
const {Contacts} = require('../models/')

const getList = async (req, res, next) => {
const contacts = await Contacts.find();
  res.json(contacts);
};

const getContactsbyId = async (req, res, next) => {
  const { id } = req.params;
  const contact = await Contacts.findById(id);
  if (!contact) {
    throw HttpError(404);
  }
  res.status(200).json(contact);
};

const addContacts = async (req, res, next) => {
  const newContact = await Contacts.create(req.body);
  res.status(201).json(newContact);
};

const delContacts = async (req, res, next) => {
  const { id } = req.params;
  const removeContacts = await Contacts.findByIdAndDelete(id);
  if (!removeContacts) {
    throw HttpError(404);
  }
  res.json({"message": "contact deleted"});
};

const updateContacts = async (req, res, next) => {
  const { id } = req.params;
  const contact = await Contacts.findByIdAndUpdate(id, req.body, {new:true});
  if (!contact) {
    throw HttpError(404);
  }
  res.json(contact);
};
const updateFavorite = async (req, res, next)=>{
  const { id } = req.params;
  const contact = await Contacts.findByIdAndUpdate(id, req.body, {new:true});
  if (!contact) {
    throw HttpError(404);
  }
  res.json(contact);
}


module.exports = {
  getList: ctrlWrapper(getList),
  getContactsbyId: ctrlWrapper(getContactsbyId),
  addContacts: ctrlWrapper(addContacts),
  delContacts: ctrlWrapper(delContacts),
  updateContacts: ctrlWrapper(updateContacts),
  updateFavorite: ctrlWrapper(updateFavorite),
};
