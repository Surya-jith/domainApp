const router = require("express").Router();
const { isAuth } = require("../middleware/auth");

router.get("/home", isAuth, (req, res) => {
  res.render("home");
});

module.exports = router;

