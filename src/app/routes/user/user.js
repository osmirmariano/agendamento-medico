
"use strict";
const router = require("express").Router();
const userController = require('../../controllers/user/user');
const token = require("../../middlewares/check_token");

router.post("", userController.store);

router.use(token.check);
router.put("/:id", userController.update);
router.get("/:id", userController.showById);

module.exports = router;