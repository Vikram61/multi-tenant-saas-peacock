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
        {expiresIn:"10m"}
    )
};

const createRefreshToken = (user)=>{
    return jwt.sign({
        userId:user._id,
        tokenVersion:user.tokenVersion
    },
    process.env.JWT_REFRESH_SECRET,
    {expiresIn:"7d"})
}

module.exports = {createAccessToken, createRefreshToken};