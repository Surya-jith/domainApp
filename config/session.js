const session = require("express-session");
const MongoStore = require("connect-mongo");

module.exports = session({
  name: "app.sid",
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,

  store: new MongoStore({
    mongoUrl: process.env.MONGO_URI,
    collectionName: "sessions"
  }),

  cookie: {
    httpOnly: true,
    maxAge: 1000 * 60 * 60 // 1 hour
  }
});


