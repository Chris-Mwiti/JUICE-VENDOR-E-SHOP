// Dependancies models
const User = require('../models/users');
const ShoppingSession = require('../models/shoppingSession');

// Generators
const tokenGenerators = require('../JWT/generators/tokenGenerators');

// Dependancies encryption
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const ResponseHandlers = require('../helpers/modelResponseHandlers');

// Users Controller defination
class UserController {
    
    constructor(req,res){
        this.req = req,
        this.res = res
    }
    
    async generateUserId (req,res){
        const {email} = req
        // Fetch the user id from the database
        const user = await new User().getUser(email);
        // Check if the user response is valid
        if (user == null || undefined) return res.status(403).json({message: "Forbidden"});
        // Get the userid from the user object
        const userId = user.id;
        
        return userId
    }
    async postUser(){
        const { password } = this.req.body
        // Hash the password and store it in the database
        const hashedPwd = await bcrypt.hash(password,10)
        const newData = {
            ...data,
            password: hashedPwd
        }
        const response = await new User().addUser(newData);
        // Check if the response is undefined and if so return statusCode 500: Server Side Error
        new ResponseHandlers (response,this.res).postResponse();
        
    }

    // @TODO: Refactor the code such that the userId is stored as a payload instead of user email in JWT token

    async logInUser(){
        const { email } = this.req.body
        // Get user from the database
        const response = await new User().getUser(email);

        // Check if there is an existing user or an error has occured
        if  (response == null) return this.res.status(400).json({message: "Wrong Email"});
        if (response == undefined) return this.res.status(500).json({message: "Server side error"});

        // Compare encrypted password to the inputed password
        const matchPwd = await bcrypt.compare(this.req.body.password, response.password);
        if(!matchPwd) return this.res.status(401).json({message: "Wrong Password"});
    
        // Generators access_token & refresh_token
        const { access_token,refresh_token} = tokenGenerators(this.req.body);
        // Add the refresh token to the database
        const tokenResponse = await new User().postRefreshToken(refresh_token,response.id);
        if(!tokenResponse) return this.res.status(500). json({message: "Error while storing token"});

        // @TODO: Refactor the code
        await this.res.cookie('access_token',access_token,{httpOnly: true, maxAge: 15 * 60 * 1000});

        // Check if user has an existing session and if so append sessionId to the access_token payload
        const userId = await this.generateUserId(this.req.body,this.res);
        const isSessionAvailable = await new ShoppingSession().getSession(userId);
        await new ResponseHandlers(isSessionAvailable,this.res).checkExistingSessions(access_token,refresh_token);
    }

    async checkUser(){
        // Check if the request has access_token & refresh_token cookies
        const cookies = this.req.cookies
        if(!cookies || !cookies.refresh_token && !cookies.access_token) return this.res.status(401).json({message: "Unauthorized"});
        
        // Generate a new access token if the user has a refresh token but no access token
        if(cookies.refresh_token && !cookies.access_token){
            const refreshToken = cookies.refresh_token
            let accessToken = "";
            const refreshTokenModel = new User()
            const response =  await refreshTokenModel.getRefreshToken(refreshToken);
            if (response == null) return this.res.status(403).json({message: "Forbidden"});
            if(response == undefined) return this.res.status(500).json({message: "Server side error"});

            // Verify the refresh token
            jwt.verify(
                refreshToken,
                process.env.REFRESH_TOKEN_SECRET,
                (err,decode) => {
                    if(err) return this.res.status(500).json({message: "Server side error"});
                    accessToken = jwt.sign(
                        {"email": decode.email},
                        process.env.ACCESS_TOKEN_SECRET,
                        {expiresIn: '900s'}
                    )
                }
            )
            // Return new access token

            return this.res.cookie('access_token',access_token,{httpOnly: true, maxAge: 15 * 60 * 1000});
        }else{
            // User has an access token but no refresh token
            return this.res.status(200).json({message: "Ok"});
        }

    }


}

module.exports = UserController;