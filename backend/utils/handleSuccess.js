const chalk = require("chalk");

const handleSuccess = (res, status, message = "") => {
  console.log(chalk.blueBright.bold(message, status));
  return res.status(status).json(message);
};

module.exports = { handleSuccess };
