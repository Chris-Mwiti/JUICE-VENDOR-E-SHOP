const jwt = require('jsonwebtoken');

function tokenGenerators(user){
     // Generate a new access token & refresh token for the user
    const access_token = jwt.sign(
        {"email": user.email},
        process.env.ACCESS_TOKEN_SECRET,
        {expiresIn: '900s'}
    )
    const refresh_token =  jwt.sign(
        {"email": user.email},
        process.env.REFRESH_TOKEN_SECRET,
        {expiresIn: '1d'}
    )

    return {
        access_token,
        refresh_token
    }
}

module.exports = tokenGenerators