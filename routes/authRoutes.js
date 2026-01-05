const router = require("express").Router();
const auth = require("../controllers/authController");

router.get("/login", (req, res) => {
  res.render("login", { error: null });
});

router.get("/signup", (req, res) => res.render("signup"));

router.post("/signup", auth.signup);
router.post("/login", auth.login);
router.get("/logout", auth.logout);

module.exports = router;
