const joi = require('joi');

const joiUserSchema = joi.object({
  name: joi.object({
    first: joi.string().min(2).max(256).required(),
    middle: joi.string().min(2).max(256).optional().allow(''),
    last: joi.string().min(2).max(256).required()
  }).required(),

  phone: joi.string().pattern(/^(\+972|972|0)(2|3|4|8|9|5\d)\d{7}$/).required(),
  
  email: joi.string().email().required(),
  password: joi.string().required(),

  image: joi.object({
    url: joi.string().uri().optional().allow(''),
    alt: joi.string().max(256).optional().allow('')
  }).optional(),

  address: joi.object({
    state: joi.string().max(256).optional().allow(''),
    country: joi.string().min(2).max(256).required(),
    city: joi.string().min(2).max(256).required(),
    street: joi.string().min(2).max(256).required(),
    houseNumber: joi.alternatives().try(joi.string(), joi.number()).required(),
    zip: joi.alternatives().try(joi.string(), joi.number()).required()
  }).required(),

  isAdmin: joi.boolean().optional(),
  isBusiness: joi.boolean().optional()
});

module.exports = joiUserSchema;