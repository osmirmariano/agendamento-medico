
"use strict";
const router = require("express").Router();
const clinicController = require("../../controllers/clinic/clinic");
const token = require("../../middlewares/check_token");
const permission = require("../../middlewares/check_permission");

router.use(token.check);
router.use(permission.checkPermission);
router.post("", clinicController.store);

module.exports = router;
