const joiCardSchema = require("../validation/joiSchemas/joiCardSchema");

const cardValidation = (req, res, next) => {
  const { error } = joiCardSchema.validate(req.body);
  if (error) {
    return res.status(400).send({ error: error.details[0].message });
  }
  next();
};

module.exports = cardValidation;
