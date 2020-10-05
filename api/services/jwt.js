
const secretKey = 'secret';
const jwt = require('jsonwebtoken');

exports.generateJWT = (payload, expiresIn = "1h") => {
    return new Promise((resolve, reject) => {
        jwt.sign(payload, secretKey, { expiresIn }, (err, token) => {
            if (!err) {
                resolve(token)
            }
            else {
                reject(err)
            }
        })
    })
}
exports.verifyJWT = (token) => {
    return new Promise((resolve, reject) => {
        jwt.verify(token, secretKey, (err, decoded) => {
            if (err) {
                reject(err)
            } else {
                resolve(decoded)
            }
        });
    })

}