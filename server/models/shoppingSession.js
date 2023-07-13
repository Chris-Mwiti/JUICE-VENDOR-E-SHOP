const prismaErrHandler = require('../err/prismaErrHandler');
const prisma = require('../configs/prismaConfig');


// @TODO: Research more about on sessions generators 
class ShoppingSession{
    constructor(total,userId,status){
        this.total = total,
        this.userId = userId,
        this.status = status
    }

    async createSession(){
        try{
            const response = await prisma.shoppingSession.create({
                data:{
                    total: this.total,
                    userId: this.userId
                }
            })
            return response
        }catch(err){
            console.error(err)
        }
    }

    // ADMIN PRIVILEGES
    async getSessions(){
        try{
            const sessions = await prisma.shoppingSession.findMany({
                include:{
                    cartItems: true,
                }
            })
            return sessions
        }catch(err){
            prismaErrHandler(err)
        }
    }

    async getSession(userId){
        try{
            const session = await prisma.shoppingSession.findUnique({
                where: {
                    userId: userId
                },
                include:{
                    cartItems: true
                }
            })
            return session
        }catch(err){
            prismaErrHandler(err)
        }
    }

    async updateSessionTotal(sessionId){
        try{
            const response = await prisma.shoppingSession.update({
                where:{
                    id: sessionId
                },
                data: {  
                    total: this.total,
                }
            })

            return response
        }catch(err){
            console.error(err);
        }
    }

    async updateSessionStatus(sessionId,status){
        try{
            const response = await prisma.shoppingSession.update({
                where:{
                    id: sessionId
                },
                data:{
                    status: status
                }
            })
            return response
        }catch(err){
           prismaErrHandler(err);
        }
    }

    async deleteSession(sessionId){
        try{
            const response = await prisma.shoppingSession.delete({
                where:{
                    id: sessionId
                },
                include: {
                    cartItems: true
                }
            })

            return response
        }catch(err){
            prismaErrHandler(err)
        }
    }
}

module.exports = ShoppingSession