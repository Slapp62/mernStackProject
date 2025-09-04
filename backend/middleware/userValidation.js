const joiLoginSchema = require("../validation/joiSchemas/joiLoginSchema");
const joiUserSchema = require("../validation/joiSchemas/joiUserSchema");
const { handleError } = require("../utils/functionHandlers");

const profileValidation = (req, res, next) => {
  const { error } = joiUserSchema.validate(req.body, { abortEarly: false });
  if (error) {
    handleError(res, 400, error.details[0].message);
  }
  next();
};

const loginValidation = (req, res, next) => {
  const { error } = joiLoginSchema.validate(req.body, { abortEarly: false });
  if (error) {
    handleError(res, 400, error.details[0].message);
  }
  next();
};

module.exports = {
  profileValidation,
  loginValidation,
};
