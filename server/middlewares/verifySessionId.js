const jwt = require('jsonwebtoken');

const verifySessionId = (req,res,next) => {
    const cookies = req.cookies
    // Check if the access_token cookie exists and retrieve it
    if(!cookies?.access_token) return res.status(401).json({message: "Unauthorized"});
    const accessToken = cookies.access_token;
    // Verify the token if not tampared with and has not expired
    jwt.verify(
        accessToken,
        process.env.ACCESS_TOKEN_SECRET,
        (err,decode) =>{
            if(err) return res.status(403).json({message: "Forbiden"})
            req.sessionId = decode.sessionId
            next()
        }
    )
}

module.exports = verifySessionId