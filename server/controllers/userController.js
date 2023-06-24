// Dependancies models
const User = require('../models/users')

// Dependancies encryption
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
// Users Controller defination
class UserController {
    constructor(){
        this.statusCode = 200
        this.checkStatusCode = 200
    }

    async postUser(data){
        if(typeof(data) !== 'object') return this.statusCode = 400;
        console.log('posting...')
        const hashedPwd = await bcrypt.hash(data.password,10)
        const newData = {
            ...data,
            password: hashedPwd
        }
        const response = await new User().addUser(newData);
        if(response !== undefined) return response
        return this.statusCode = 500
        
    }

    async logInUser(data){
        if(typeof(data) !== 'object') return this.statusCode = 400;
        console.log(data)
        const response = await new User().getUser(data.email);
        console.log(response)
        if  (response == null) return this.statusCode = 401;
        if (response == undefined) return this.statusCode = 500;
        const matchPwd = await bcrypt.compare(data.password, response.password);
        if(!matchPwd) return this.statusCode = 401;
        const access_token = jwt.sign(
            {"email": data.email},
            process.env.ACCESS_TOKEN_SECRET,
            {expiresIn: '900s'}
        )
        const refresh_token = jwt.sign(
            {"email": data.email},
            process.env.REFRESH_TOKEN_SECRET,
            {expiresIn: '1d'}
        )

        const tokenResponse = await new User().postRefreshToken(refresh_token,response.id).catch((e) => {
            return this.statusCode = 500;
        })
        if(!tokenResponse) return this.statusCode = 500;
        
        return {access_token,refresh_token}
    }

    async checkUser(req){
        // Check if the request has access_token & refresh_token cookies
        const cookies = req.cookies
        if(!cookies || !cookies.refresh_token && !cookies.access_token) return this.checkStatusCode = 401;
        // Generate a new access token if the user has a refresh token but no access token
        if(cookies.refresh_token && !cookies.access_token){
            const refreshToken = cookies.refresh_token
            let accessToken = "";
            const refreshTokenModel = new User()
            const response =  await refreshTokenModel.getRefreshToken(refreshToken);
            if (response == null) return this.checkStatusCode = 403;
            if(response == undefined) return this.checkStatusCode = 500;

            // Verify the refresh token
            jwt.verify(
                refreshToken,
                process.env.REFRESH_TOKEN_SECRET,
                (err,decode) => {
                    if(err) return this.checkStatusCode = 500;
                    accessToken = jwt.sign(
                        {"email": decode.email},
                        process.env.ACCESS_TOKEN_SECRET,
                        {expiresIn: '900s'}
                    )
                }
            )
            // Return new access token

            return {accessToken}
        }else{
            // User has an access token but no refresh token
            return this.checkStatusCode = 200;
        }


    }
}

module.exports = UserController;