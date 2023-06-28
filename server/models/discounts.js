const prismaErrHandler = require('../err/prismaErrHandler');
const prisma = require('../configs/prismaConfig');

class Discount{
    constructor(coupon,percentage){
        this.coupon = coupon,
        this.percentage = percentage
    }

    async addDiscount(){
      try{
        const response = await prisma.discount.create({
            data:{
                coupon: this.coupon,
                percentage: this.percentage,
            }
        })
        return response
      }catch(err){
        prismaErrHandler(err)
      }
    }

    async getDiscounts(){
        try{
            const discounts = await prisma.discount.findMany()
            return discounts
        }catch(err){
            prismaErrHandler(err)
        }
    }

    async getDiscount(coupon){
        try{
            const discount = await prisma.discount.findUnique({
                where:{
                    coupon: coupon
                }
            })
            return discount
        }catch(err){
            prismaErrHandler(err)
        }
    }

    async updateDiscount(coupon){
        try{
            const response = await prisma.discount.update({
                where:{
                    coupon: coupon
                },
                data:{
                    coupon: this.coupon,
                    percentage: this.percentage
                }
            })
            return response
        }catch(err){
            prismaErrHandler(err)
        }
    }

    async deleteDiscount(coupon){
        try{
            const response = await prisma.discount.delete({
                where:{
                    coupon: coupon
                }
            })
            return response
        }catch(err){
            prismaErrHandler(err)
        }
    }

}

module.exports = Discount