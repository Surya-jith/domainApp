// module.exports = (req, res, next) => {
//   console.log("SESSION ROLE:", req.session.role);
//   if (req.session.role !== "admin") {
//     return res.send("Access Restricted");
//   }
//   next();
// };


// module.exports = (req, res, next) => {
//   if (req.session.role !== "admin") return res.status(403).send("Access Restricted");
//   next();
// };
