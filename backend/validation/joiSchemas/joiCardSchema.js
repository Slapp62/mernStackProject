const joi = require('joi');

const cardSchema = joi.object({
  title: joi.string().min(2).max(256).required(),
  subtitle: joi.string().min(2).max(256).required(),
  description: joi.string().min(2).max(1024).required(),
  phone: joi.string().pattern(/^(\+972|972|0)(2|3|4|8|9|5\d)\d{7}$/).required(),
  email: joi.string().email().required(),
  web: joi.string().uri().optional().allow(''),
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
  bizNumber: joi.number().optional(),
  likes: joi.array().items(joi.string()).optional(),
  user_id: joi.string().required()
});

module.exports = cardSchema;