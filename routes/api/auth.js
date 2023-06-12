const express = require("express");
const router = express.Router();
const authController = require('../../controller/auth-controller')
const {userSchema} = require('../../schemas')
const { validateBody } = require("../../utils/index");
const {authenticate, upload} = require('../../middlewares')


router.post('/register', validateBody(userSchema.userRegister), authController.register )
router.post('/login',validateBody(userSchema.userLogin),  authController.login )

router.get('/current', authenticate, authController.getCurrent);
router.post('/logout', authenticate, authController.logout);
router.patch('/users', authenticate, validateBody(userSchema.updateUserSubcription), authController.updateById);
router.patch('/avatars',authenticate, upload.single('avatar'), authController.updateAvatar)

router.get('/verify/:verificationToken', authController.verify)
router.post('/verify', validateBody(userSchema.email), authController.resendEmail)

module.exports = router;