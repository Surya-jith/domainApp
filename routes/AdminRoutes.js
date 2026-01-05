const router = require("express").Router();
const { isAuth, isAdmin } = require("../middleware/auth");
const controller = require("../controllers/adminController");

router.get("/", isAuth, isAdmin, controller.dashboard);
router.post("/add", isAuth, isAdmin, controller.addUser);
router.get("/block/:id", isAuth, isAdmin, controller.toggleBlock);
router.get("/delete/:id", isAuth, isAdmin, controller.deleteUser);

module.exports = router;


