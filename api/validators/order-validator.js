const Joi = require("joi");

exports.createOrderValidator = Joi.object({
    quantity: Joi.number().required(),
    productId:Joi.string().max(24).min(24).required(),
})
exports.IdValidator = Joi.string().max(24).min(24)