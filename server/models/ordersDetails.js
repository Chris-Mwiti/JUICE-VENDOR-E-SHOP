// Dependancies
const prismaErrHandler = require('../err/prismaErrHandler');
const prisma = require('../configs/prismaConfig');


class OrderDetails{
    constructor(total,userId,paymentProvider,cartItems){
        this.total = total,
        this.userId = userId,
        this.provider = paymentProvider,
        this.cartItems = cartItems
    }

    async createOrder(){
        try{
            const response = await prisma.orderDetails.create({
                data:{
                    total: this.total,
                    user: {
                        connect:{
                            id: this.userId
                        }
                    },
                    payment:{
                        create:{
                            provider: this.provider,
                            amount: this.total
                        }
                    },

                    items:{
                        createMany:{
                            data: this.cartItems
                        }
                    }
                    
                },
                include: {
                    payment: true,
                    items: true
                }
            })
            return response
        }catch(err){
            prismaErrHandler(err)
        }
    }

    async getOrders(){
        try{
            const orders = await prisma.orderDetails.findMany({
                include:{
                    payment: true,
                    items: true
                }
            });
            return orders
        }catch(err){
            prismaErrHandler(err)
        }
    }

    async getOrder(){
        try{
            const order = await prisma.orderDetails.findUnique({
                where: {
                    userId: this.userId
                },
                include:{
                    payment: true,
                    items: true
                }
            })
            return order
        }catch(err){
            prismaErrHandler(err)
        }
    }

    async updateOrder(){
        try{
            const response = await prisma.orderDetails.update({
                where: {
                    userId: this.userId
                },
                data:{
                    total: this.total,
                },
                include:{
                    items: true
                }
            })
            return response
        }catch(err){
            prismaErrHandler(err)
        }
    }

    async deleteOrder(){
        try{
            const response = await prisma.orderDetails.delete({
                where:{
                    userId: this.userId
                }
            })
            return response
        }catch(err){
            prismaErrHandler(err)
        }
    }
}

module.exports = OrderDetails