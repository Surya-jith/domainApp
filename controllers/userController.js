exports.home = (req, res) => {
  res.render("home", {
    role: req.session.role
  });
};
