const session = require("express-session");

const sessionConfig = {
  secret: "your-secret-key",
  resave: false,
  saveUninitialized: true,
  cookie: {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 1000 * 60 * 60 * 24 * 7, // 1 week
  },
};

const sessionMiddleware = session(sessionConfig);

module.exports = { sessionMiddleware };