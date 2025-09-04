const { handleError } = require("../utils/errorHandler");
const joiCardSchema = require("../validation/joiSchemas/joiCardSchema");

const cardValidation = (req, res, next) => {
  const { error } = joiCardSchema.validate(req.body, { abortEarly: false });
  if (error) {
    handleError(res, 400, error.details[0].message);
  }
  next();
};

module.exports = cardValidation;
