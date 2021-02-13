
"use strict";
const router = require("express").Router();
const clinicController = require("../../controllers/clinic/clinic");
const token = require("../../middlewares/check_token");

router.use(token.check);
router.post("", clinicController.store);

module.exports = router;
