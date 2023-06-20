// Dependancies models
const User = require('../models/users')

// Dependancies encryption
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
// Users Controller defination
class UserController {
    constructor(){
        this.statusCode = 200
    }

    async postUser(data){
        if(typeof(data) !== 'object') return this.statusCode = 400;
        const hashedPwd = await bcrypt.hash(data.password,10)
        const newData = {
            ...data,
            password: hashedPwd
        }
        const response = await new User().addUser(newData);
        console.log(response);
        return response
    }

    async logInUser(data){
        if(typeof(data) !== 'object') return this.statusCode = 400;
        console.log(data)
        const response = await new User().getUser(data.email);
        console.log(response)
        if  (response == null) return this.statusCode = 401;
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
}

module.exports = UserController;