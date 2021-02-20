
"use strict";
const router = require("express").Router();
const schedulingController = require("../../controllers/scheduling/scheduling");
const token = require("../../middlewares/check_token");

router.use(token.check);
router.post("", schedulingController.store);
router.put("/:id", schedulingController.markOff);


module.exports = router;
