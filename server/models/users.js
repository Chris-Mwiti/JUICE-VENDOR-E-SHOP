const prisma = require('../configs/prismaConfig');

// User Model Class defination
class User {
   constructor(){

   }
    async addUser(userInfo){
       try{
        const response = await prisma.user.create({
            data: userInfo
        })
        console.log(response);
        return response
       }catch(e){
        console.error(e);
       }
    }

    async getUser(email){
        console.log('checking')
        try{
            const user = await prisma.user.findUnique({
                where:{email: email}
            })
            return user
        }
        catch(err){
            console.error(err)
        }
    }

    async postRefreshToken(token,userId){
        try{
            const response = await prisma.refreshTokens.create({
                data:{
                    refreshToken: token,
                    userId: userId,
                }
            })
            return response
        }catch(error){
            console.error(error)
        }
    }
}

module.exports = User
