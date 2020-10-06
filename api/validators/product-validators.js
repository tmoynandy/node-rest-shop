const Joi = require("joi");

exports.createProductValidate = Joi.object({
    name: Joi.string().max(25).min(5),
    price: Joi.number().max(1000).min(1),
    productImage: Joi.binary().encoding('base64').max(5 * 1024 * 1024),
})
exports.IdValidator = Joi.string().max(24).min(24)