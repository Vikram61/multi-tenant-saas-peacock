const jwt = require('jsonwebtoken');
const Organization = require('../models/Organization');

const createAccessToken = (user)=>{
    return jwt.sign(
        {
            userId:user._id,
            role:user.role,
            organization: user.organization,
            tokenVersion: user.tokenVersion
        },
        process.env.JWT_ACCESS_SECRET,
        {expiresIn:"7d"}
    )
};


module.exports = {createAccessToken};