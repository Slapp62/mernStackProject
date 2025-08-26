const joiUserSchema = require('../validation/joiSchemas/joiUserSchema');

const userValidation = (req, res, next) => {
  const { error } = joiUserSchema.validate(req.body);
  if (error) {
    return res.status(400).send({ error: error.details[0].message });
  }
  next();
};

module.exports = userValidation;