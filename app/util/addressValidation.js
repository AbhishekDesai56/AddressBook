const Joi = require('joi');

const userValidationSchema = Joi.object({
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    phoneNumber: Joi.number().integer().min(1000000000).max(9999999999).required(),
    city: Joi.string().required(),
    pinCode: Joi.number().required(),
    address: Joi.string().min(1).max(150).required()
});

module.exports = userValidationSchema;