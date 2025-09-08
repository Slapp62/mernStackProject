const chalk = require("chalk");
const { m } = require("framer-motion");

const handleSuccess = (res, status, data = {}, message = "") => {
  console.log(chalk.blueBright.bold(message, status));
  return res.status(status).json(data);
};

const throwError = (status, message) => {
  const error = new Error(message);
  error.status = status;
  throw error;
};

const nextError = (next, status, message) => {
  const error = new Error(message);
  error.status = status;
  return next(error);
};

const handleError = (res, status = 500, message = "") => {
  console.log(chalk.redBright.bold(message, status));
  return res.status(status).json({ message: message });
};

module.exports = { handleSuccess, throwError, nextError, handleError };
