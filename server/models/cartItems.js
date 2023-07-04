const prismaErrHandler = require('../err/prismaErrHandler');
const prisma = require('../configs/prismaConfig');

class CartItems{
    constructor(item,quantity,sessionId){
        this.item = item,
        this.quantity = quantity,
        this.sessionId = sessionId
    }

    async addCartItem(){
        try{
            const response = await prisma.cartItems.create({
                data:{
                    productId: this.item,
                    quantity: this.quantity,
                    sessionId: this.sessionId
                },
                include: {
                    product: true,
                    session: true
                }

            })
            return response
        }catch(err){
            prismaErrHandler(err)
        }
    }

    async getCartItems(){
        try{
            const items = await prisma.cartItems.findMany({
                where: {
                    sessionId: this.sessionId
                },
                include:{
                    session: true,
                    product: true
                }
            })
            return items
        }catch(err){
            prismaErrHandler(err)
        }
    }

    async getCartItem(cartItemId){
        try{
            const item = await prisma.cartItems.findUnique({
                where:{
                    id: cartItemId
                }
            })
            return item
        }catch(err){
            prismaErrHandler(err)
        }
    }

    async updateCartItem(cartItemId){
        try{
            const response = await prisma.cartItems.update({
                where:{
                    id: cartItemId
                },
                data:{
                    quantity: this.quantity
                },
                include: {
                    session: true,
                    product: true
                }
            })

            return response
        }catch(err){
            prismaErrHandler(err)
        }
    }

    async deleteCartItem(cartItemId){
        try{
            const response = await prisma.cartItems.delete({
                where:{
                    id: cartItemId
                }
            })
            return response
        }catch(err){
            prismaErrHandler(err)
        }
    }

    async deleteAllCartItems(){
        try{
            const response = await prisma.cartItems.deleteMany({
                where:{
                    sessionId: this.sessionId
                }
            })
            return response
        }catch(err){
            prismaErrHandler(err)
        }
    }
}

module.exports = CartItems