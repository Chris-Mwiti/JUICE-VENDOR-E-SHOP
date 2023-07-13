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

    // ADMIN PRIVELEGES
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

    async getOrder(orderId){
        try{
            const order = await prisma.orderDetails.findUnique({
                where: {
                    id: orderId
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

    // ADMIN PRIVILEGE
    async updateOrder(status,orderId){
        try{
            const response = await prisma.orderDetails.update({
                where: {
                    id: orderId
                },
                data:{
                    status: status
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
    // ADMIN PRIVILEGE
    async deleteOrder(orderId){
        try{
            const response = await prisma.orderDetails.delete({
                where:{
                    id: orderId
                }
            })
            return response
        }catch(err){
            prismaErrHandler(err)
        }
    }
}

module.exports = OrderDetails