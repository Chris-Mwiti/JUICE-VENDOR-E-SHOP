const prisma = require('../configs/prismaConfig');
const prismaErrHandler = require('../err/prismaErrHandler')

// User Model Class defination
class User {
   constructor(){

   }
    async addUser(userInfo){
       try{
        const response = await prisma.user.create({
            data: userInfo
        })
        return response
       }catch(err){
            prismaErrHandler(err);
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
            prismaErrHandler(err);
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
        }catch(err){
            prismaErrHandler(err);
        }
    }

    async getRefreshToken(token){
        try{
            const response = await prisma.refreshTokens.findUnique({
                where: {
                    refreshToken:token
                }
            })
            return response
        }
        catch(err){
            prismaErrHandler(err);
        }
    }
}

module.exports = User
