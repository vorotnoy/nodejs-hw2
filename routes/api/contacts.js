const express = require("express");
const router = express.Router();
const {
  contactsAddSchema,
  contactsUppdateFavoriteSchema,
} = require("../../schemas/index");
const { validateBody, validateFavoriteBody } = require("../../utils/index");
const { isValidId } = require("../../middlewares");
const contactsController = require("../../controller/contact-controller");

router.get("/", contactsController.getList);
router.get("/:id", isValidId, contactsController.getContactsbyId);
router.post(
  "/",
  validateBody(contactsAddSchema),
  contactsController.addContacts
);
router.delete("/:id", isValidId, contactsController.delContacts);
router.put(
  "/:id",
  isValidId,
  validateBody(contactsAddSchema),
  contactsController.updateContacts
);
router.patch(
  "/:id/favorite",
  isValidId,
  validateFavoriteBody(contactsUppdateFavoriteSchema),
  contactsController.updateFavorite
);
module.exports = router;
