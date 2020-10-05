const Joi = require('joi')

exports.SignupValidator = Joi.object({
    name: Joi.string().min(3).max(25),
    email: Joi.string().email(),
    password: Joi.string().min(8).max(15)
})

exports.SigninValidator = Joi.object({
    email: Joi.string().email(),
    password: Joi.string().min(8).max(15)
})
exports.DeleteValidator = Joi.string().max(24).min(24)