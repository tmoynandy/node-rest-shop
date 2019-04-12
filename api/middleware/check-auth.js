const jwt = require ('jsonwebtoken');
const secret = "secret"

module.exports = (req, res, next) =>{
    try{
        // to add tokens to requestAnimationFrame, use the Headers option if using postman
        // .
        // .
        // Key : Authorization
        // Value : Bearer <Your JWT>
        const token = req.headers.authorization.split(" ")[1];
        console.log(token);
        const decoded = jwt.verify(token, secret);
        req.userDate = decoded;
        next();//if successful authentication 
    }
    catch(error){
        return res.status(401).json({
            message : 'Auth Failed'
        });
    }
};