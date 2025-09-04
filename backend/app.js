const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");
const { handleError } = require("./utils/functionHandlers");
const dotenv = require("dotenv");
const router = require("./controllers/main");
const morgan = require("morgan");

dotenv.config();
const app = express();

// global middleware
app.use(
  cors({
    origin: ["http://localhost:5173", "http://localhost:5174"],
    credentials: true,
  })
);

const accessLogStream = fs.createWriteStream(
  path.join(__dirname, "logs.txt"),
  { flags: "a" }, // 'a' means append - add new logs without erasing old ones
);

app.use(morgan("combined", { stream: accessLogStream }));

app.use(express.json());

app.use(express.static("public"));

app.use(router);

// error handler
app.use((error, _req, res, _next) => {
  handleError(res, error.status || 500, error.message);
});

module.exports = app;