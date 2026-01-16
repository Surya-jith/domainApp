/* =====================
   REQUIRE STATEMENTS
===================== */
require("dotenv").config();
const express = require("express");
const connectDB = require("./config/db");
const session = require("./config/session");

const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const adminRoutes = require("./routes/AdminRoutes");

/* =====================
   APP INITIALIZATION
===================== */
const app = express();
connectDB();

/* =====================
   MIDDLEWARES
===================== */
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(session);

/* Global locals middleware (before routes) */
app.use((req, res, next) => {
  res.locals.userId = req.session.userId;
  res.locals.role = req.session.role;
  next();
});

app.set("view engine", "ejs");

/* =====================
   ROUTES
===================== */
app.use(authRoutes);
app.use(userRoutes);
app.use("/admin", adminRoutes);

/* =====================
   EXPORT
===================== */
module.exports = app;


