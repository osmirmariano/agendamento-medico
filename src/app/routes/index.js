
const router = require('express').Router();
const packageJson = require('../../../package.json');

router.get('/', (req, res) => {
    res.type('text/plain')
    res.send(`${packageJson.name} online`)
});

router.use("/login", require("./login/login"));
router.use("/user", require("./user/user"));
router.use("/scheduling", require("./scheduling/scheduling"));
// router.use("/clinic", require("./clinic/clinic"));

module.exports = router;
