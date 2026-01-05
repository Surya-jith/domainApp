const User = require("../models/user"); // ✅ CORRECT CASE
const bcrypt = require("bcrypt");

/* ================= SIGNUP ================= */

exports.signup = async (req, res) => {
  try {
    await User.create(req.body);
    res.redirect("/login");
  } catch (error) {
    if (error.code === 11000) {
      return res.render("signup", {
        error: "This email is already registered"
      });
    }

    res.render("signup", {
      error: "Something went wrong. Please try again."
    });
  }
};

/* ================= LOGIN ================= */

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    // ❌ Email not found
    if (!user) {
      return res.render("login", {
        error: "Email not registered"
      });
    }

    // ❌ Password incorrect
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.render("login", {
        error: "Wrong password"
      });
    }

    // 🚫 Blocked user
    if (user.isBlocked) {
      return res.render("login", {
        error: "Your account has been restricted. Contact admin."
      });
    }

    // ✅ Success
    req.session.userId = user._id;
    req.session.role = user.role;

    res.redirect(user.role === "admin" ? "/admin" : "/home");
  } catch (err) {
    console.error("LOGIN ERROR:", err);
    res.render("login", {
      error: "Something went wrong. Please try again."
    });
  }
};

/* ================= LOGOUT ================= */

exports.logout = (req, res) => {
  req.session.destroy(() => {
    res.clearCookie("app.sid");
    res.redirect("/login");
  });
};
