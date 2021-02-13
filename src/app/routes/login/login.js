
"use strict";
const router = require("express").Router();
const userController = require('../../controllers/user/login');

router.post("", userController.login);

module.exports = router;