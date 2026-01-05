require("dotenv").config();
const express = require("express");
const connectDB = require("./config/db");
const session = require("./config/session");

const app = express();
connectDB();

app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(session);

/* ✅ MOVE THIS HERE (BEFORE ROUTES) */
app.use((req, res, next) => {
  res.locals.userId = req.session.userId;
  res.locals.role = req.session.role;
  next();
});

app.set("view engine", "ejs");

/* ROUTES */
app.use(require("./routes/authRoutes"));
app.use(require("./routes/userRoutes"));
app.use("/admin", require("./routes/AdminRoutes"));

module.exports = app;

