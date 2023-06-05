const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const { sessionMiddleware } = require("./session");
const taskRoutes = require("./routes/tasks.routes");
const setCookieAttributes = require("./setCookieAttributes");

const app = express();

app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "http://192.168.100.4:3000",
    ],
    credentials: true,
  })
);
app.use(morgan("dev"));
app.use(express.json());
app.use(sessionMiddleware);
app.use(taskRoutes);

app.use((err, resq, res, next) => {
  return res.json({
    message: err.message,
  });
});

app.use(setCookieAttributes);
app.listen(4000);
console.log("Server on port 4000");
