const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const { sessionMiddleware } = require("./session");
const taskRoutes = require("./routes/tasks.routes");
const setCookieAttributes = require("./setCookieAttributes");

//const path = require("path");


const app = express();

app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "http://192.168.145.7:3000",
    ],
    credentials: true,
  })
);
app.use(morgan("dev"));
app.use(express.json());
app.use(sessionMiddleware);
app.use(taskRoutes);

app.use((err, req, res, next) => {
  return res.json({
    message: err.message,
  });
});
/*
// Serve the static files from the build directory
app.use(express.static(path.join(__dirname, '..', 'client', 'build')));

 //Serve the index.html file for all other routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'client', 'build', 'index.html'));
});*/


app.use(setCookieAttributes);
app.listen(4000);
/*const backendPort = process.env.PORT || 4000;
app.listen(backendPort, () => {
  console.log(`Backend server running on port ${backendPort}`);
});

// Start the frontend server
const frontendPort = 3000;
app.use('/', express.static(path.join(__dirname, '..', 'client', 'build')));
app.listen(frontendPort, () => {
  console.log(`Frontend server running on port ${frontendPort}`);
});*/
console.log("Server on port 4000");
