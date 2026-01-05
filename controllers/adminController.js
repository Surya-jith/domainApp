const User = require("../models/user"); // ✅ FIXED CASE


/* ================= ADMIN DASHBOARD ================= */

exports.dashboard = async (req, res) => {
  const search = req.query.search || "";

  const users = await User.find({
    $or: [
      { name: { $regex: search, $options: "i" } },
      { email: { $regex: search, $options: "i" } }
    ]
  });

  res.render("admin", {
    users,
    search,
    role: req.session.role
  });
};

/* ================= TOGGLE BLOCK ================= */

exports.toggleBlock = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) return res.redirect("/admin");

    user.isBlocked = !user.isBlocked;
    await user.save();

    res.redirect("/admin");
  } catch (err) {
    console.error("BLOCK ERROR:", err);
    res.redirect("/admin");
  }
};

/* ================= DELETE USER ================= */

exports.deleteUser = async (req, res) => {
  try {
    // ❌ Prevent admin deleting himself
    if (req.params.id === req.session.userId.toString()) {
      return res.redirect("/admin");
    }

    await User.findByIdAndDelete(req.params.id);
    res.redirect("/admin");
  } catch (err) {
    console.error("DELETE ERROR:", err);
    res.redirect("/admin");
  }
};

/* ================= ADD USER ================= */

exports.addUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    await User.create({
      name,
      email,
      password,   // ✅ plain password
      role: "user"
    });

    res.redirect("/admin");
  } catch (err) {
    console.error("ADD USER ERROR:", err);
    res.redirect("/admin");
  }
};



