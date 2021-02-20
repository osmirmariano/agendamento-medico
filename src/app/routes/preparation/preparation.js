
"use strict";
const router = require("express").Router();
const preparationController = require("../../controllers/preparation/preparation");
const auth = require("../../middlewares/check_token");
const permission = require("../../middlewares/check_permission");

router.use(auth.check);
router.get("/:id", preparationController.list);
router.use(permission.checkPermission);
router.post("", preparationController.store);
router.put("/:id", preparationController.update);

module.exports = router;
