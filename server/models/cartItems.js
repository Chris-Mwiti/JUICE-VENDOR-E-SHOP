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

    async getCartItem(productId){
        try{
            const item = await prisma.cartItems.findUnique({
                where:{
                    productId: productId
                }
            })
            return item
        }catch(err){
            prismaErrHandler(err)
        }
    }

    async updateCartItem(productId){
        try{
            const response = await prisma.cartItems.update({
                where:{
                    productId: productId
                },
                data:{
                    quantity: this.quantity
                }
            })

            return response
        }catch(err){
            prismaErrHandler(err)
        }
    }

    async deleteCartItem(productId){
        try{
            const response = await prisma.cartItems.delete({
                where:{
                    productId: productId
                }
            })
            return response
        }catch(err){
            prismaErrHandler(err)
        }
    }
}

module.exports = CartItems