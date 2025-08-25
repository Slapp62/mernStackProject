const express = require('express');
const cors = require('cors');
const chalk = require('chalk');
const { handleError } = require('./utils/errorHandler');
const { connectToDB } = require('./database/dbService');

const app = express();

// global middleware
app.use(
  cors({
    origin: ["http://localhost:5173", "http://localhost:5174"],
    credentials: true,
  }),
);

app.use(express.json());
//app.use(router);

// error handler
app.use((error, req, res, next) => {
  handleError(res, error.status || 500, error.message);
});

// listen
const PORT = 5000;
app.listen(PORT, () => {
  console.log(chalk.green.bold(`server running on port ${PORT}`));
  connectToDB();
});
