const express = require("express");
const router = express.Router();
const {contactSchema} = require("../../schemas/index");
const authenticate = require("../../middlewares/authenticate");

const { validateBody, validateFavoriteBody } = require("../../utils/index");
const { isValidId } = require("../../middlewares");
const contactsController = require("../../controller/contact-controller");

router.use(authenticate);
router.get("/", contactsController.getList);
router.get("/:id", isValidId, contactsController.getContactsbyId);
router.post(
  "/",
  validateBody(contactSchema.Add),
  contactsController.addContacts
);
router.delete("/:id", isValidId, contactsController.delContacts);
router.put(
  "/:id",
  isValidId,
  validateBody(contactSchema.Add),
  contactsController.updateContacts
);
router.patch(
  "/:id/favorite",
  isValidId,
  validateFavoriteBody(contactSchema.UppdateFavorite),
  contactsController.updateFavorite
);

module.exports = router;
