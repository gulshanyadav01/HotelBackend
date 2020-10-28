const jwt = require('jsonwebtoken');

exports.getToken = (id) => {
    return jwt.sign({id} , process.env.JWT_SECRET , {expiresIn: 360000})
}

