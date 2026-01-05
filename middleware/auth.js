exports.isAuth = (req, res, next) => {
  if (req.session.userId) {
    next();
  } else {
    res.redirect("/login");
  }
};

exports.isAdmin = (req, res, next) => {
  if (req.session.userId && req.session.role === "admin") {
    next();
  } else {
    res.redirect("/login");
  }
};
