const jwt = require('jsonwebtoken');
require('dotenv').config();

const verifyJwt = (req,res,next) => {
    const cookies = req.cookies
    // Check if the access_token cookie exists and retrieve it
    if(!cookies?.access_token) return res.status(401).json({message: "Unauthorized"});
    const accessToken = cookies.access_token;
    // Verify the token is not tampared with and has not expired
    jwt.verify(
        accessToken,
        process.env.ACCESS_TOKEN_SECRET,
        (err,decode) =>{
            if(err) return res.status(403).json({message: "Forbiden"})
            req.userId = decode.userId,
            req.role = decode.role,
            next()
        }
    )
}

module.exports = verifyJwt