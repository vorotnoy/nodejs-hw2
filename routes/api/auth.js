const express = require("express");
const router = express.Router();
const authController = require('../../controller/auth-controller')
const {userLoginSchema, userRegisterSchema, updateUserSubcriptionSchema} = require('../../schemas')
const { validateBody } = require("../../utils/index");
const {authenticate, upload} = require('../../middlewares')


router.post('/register', validateBody(userRegisterSchema), authController.register )
router.post('/login',validateBody(userLoginSchema),  authController.login )

router.get('/current', authenticate, authController.getCurrent);
router.post('/logout', authenticate, authController.logout);
router.patch('/users', authenticate, validateBody(updateUserSubcriptionSchema), authController.updateById);
router.patch('/avatar',authenticate, upload.single('avatar'), authController.updateAvatar)

module.exports = router;