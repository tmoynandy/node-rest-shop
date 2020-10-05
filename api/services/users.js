const Boom = require("@hapi/boom");
const UserRepo = require("../models/user");
const { SignupValidator, SigninValidator, DeleteValidator } = require("../validators/user-validators");
const bcrypt = require('bcrypt');
const { generateJWT } = require("./jwt")
exports.SignupService = function (payload) {
    return new Promise(async (resolve, reject) => {
        let { error } = SignupValidator.validate(payload)
        if (!error) {
            bcrypt.hash(payload.password, 10, async (err, hash) => {
                if (err) {
                    reject(Boom.badImplementation('terrible implementation').output)
                }
                else {
                    try {
                        let createdUser = await new UserRepo({
                            name: payload.name,
                            email: payload.email,
                            password: hash
                        }).save()
                        resolve(createdUser._doc)
                    } catch (e) {
                        if (e.code === 11000) {
                            reject(Boom.conflict(`${e.keyValue.email} already exist`).output)
                        }
                        reject(Boom.badImplementation().output)
                    }
                }
            });
        } else {
            reject(Boom.badRequest(error.message).output)
        }
    })

}
exports.SigninService = function (payload) {
    return new Promise(async (resolve, reject) => {
        let { error } = SigninValidator.validate(payload)
        if (!error) {
            let user = await UserRepo.findOne({ email: payload.email })
            if (!user) {
                reject(Boom.badRequest('Invalid email or password').output)
            } else {
                bcrypt.compare(payload.password, user._doc.password, async (err, same) => {
                    if (err) {
                        reject(Boom.badImplementation(err.message).output)
                    } else if (!same) {
                        reject(Boom.badRequest('Invalid email or password').output)
                    } else {
                        let _user = {
                            email: user._doc.email,
                            name: user._doc.name,
                            _id: user._doc._id,
                        }
                        try {
                            let token = await generateJWT(_user)
                            resolve({
                                token,
                                ..._user
                            })
                        } catch (err) {
                            reject(Boom.badImplementation(err.message).output)
                        }
                    }
                })
            }
        } else {
            reject(Boom.badRequest(error.message).output)
        }
    })
}
exports.DeleteUser = (id) => {
    return new Promise(async (resolve, reject) => {
        let { error } = await DeleteValidator.validate(id)
        if (!error) {
            try {
                await UserRepo.deleteOne({
                    _id: id
                })
                resolve()
            } catch (e) {
                reject(Boom.notFound(e.message).output)
            }
        }
        else {
            reject(Boom.badRequest(error.message).output)
        }
    })
}