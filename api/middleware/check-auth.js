const Boom = require('@hapi/boom');
const jwt = require('jsonwebtoken');
const { verifyJWT } = require('../services/jwt');

module.exports = async (req, res, next) => {
    try {
        // to add tokens to requestAnimationFrame, use the Headers option if using postman
        // .
        // .
        // Key : Authorization
        // Value : Bearer <Your JWT>
        let token = req.headers.authorization;
        if (!token) {
            next(Boom.forbidden().output)
        }
        token = token.split(" ")[1]
        const decoded = await verifyJWT(token)
        req.user = decoded;
        next();//if successful authentication 
    }
    catch (error) {
        next(Boom.unauthorized().output)
    }
};