const chalk = require("chalk");

const handleSuccess = (res, status, data= {}, message= "",) => {
  const responseObject = {
    success: true,
    message: message,
    data: data,
  }

  console.log(chalk.blueBright.bold(message, status));
  return res.status(status).json(responseObject);
};

const throwError = (status, message ) =>{
  const error = new Error (message);
  error.status = status;
  throw error;
}

const handleError = (res, status=500, message = "") => {
  const responseObject = {
    success: false,
    message: message,
  }

  console.log(chalk.redBright.bold(message, status));
  return res.status(status).json(responseObject);
};

module.exports = { handleSuccess, throwError, handleError };
