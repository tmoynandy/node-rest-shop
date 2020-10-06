const { SignupService, SigninService, DeleteUser } = require('../services/users');


exports.users_signup = async (req, res, next) => {
    try {
        let payload = {
            name: req.body.name,
            email: req.body.email,
            password: req.body.password
        }
        let result = await SignupService(payload)
        res.json({ ...result })
    } catch (e) {
        next(e)
    }
}

exports.user_delete = async (req, res, next) => {
    let { userId } = req.params
    try {
        await DeleteUser(userId)
        res.json();
    } catch (e) {
        next(e)
    }

}

exports.user_login = async (req, res, next) => {
    try {
        let payload = {
            email: req.body.email,
            password: req.body.password
        }
        let result = await SigninService(payload)
        res.json({ ...result })
    } catch (e) {
        next(e)
    }
}