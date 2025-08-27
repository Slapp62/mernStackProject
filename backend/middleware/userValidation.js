const joiLoginSchema = require('../validation/joiSchemas/joiLoginSchema');
const joiUserSchema = require('../validation/joiSchemas/joiUserSchema');

const profileValidation = (req, res, next) => {
  const { error } = joiUserSchema.validate(req.body);
  if (error) {
    return res.status(400).send({ error: error.details[0].message });
  }
  next();
};

const loginValidation = (req, res, next) => {
  const { error } = joiLoginSchema.validate(req.body);
  if (error) {
    return res.status(400).send({ error: error.details[0].message });
  }
  next();
};

module.exports = {
  profileValidation,
  loginValidation,
};