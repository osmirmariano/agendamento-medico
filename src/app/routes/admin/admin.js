
"use strict";
const router = require("express").Router();
const permission = require("../../middlewares/check_permission");
const auth = require("../../middlewares/check_token");
const adminController = require("../../controllers/admin/admin")

router.use(auth.check);
router.use(permission.checkPermission);
router.get("", adminController.showSchedulingClinic);

module.exports = router;
