const prismaErrHandler = require('../err/prismaErrHandler');
const prisma = require('../configs/prismaConfig');

class Products {
    constructor(name,category,price,desc,discountCoupon){
        this.name = name,
        this.category = category,
        this.price = price,
        this.desc = desc,
        this.discountCoupon = discountCoupon
    }

    async addProduct(){
        try{
            const response = await prisma.product.create({
                data:{
                    productName: this.name,
                    price: this.price,
                    productDescription: this.desc,
                    inventory:{
                        connect:{
                            productName: this.name
                        }
                    },
                    discount: {
                        connect: {
                            coupon: this.discountCoupon
                        }
                    },
                    asset:{
                        create:{
                            image: '../../client/public/Images/Products/banana-strawberry (1).jpg'
                        }
                    },
                    category:{
                        connect:{
                            categoryName: this.category
                        }
                    }
                }
            })
            return response
        }catch(err){
            console.log(err)
        }
        
    }

    async getProducts(){
        try{
            const products = await prisma.product.findMany({
                include: {
                    category: true,
                    inventory: true
                }
            })
            return products
        }catch(err){
            prismaErrHandler(err)
        }
    }

    async getProduct(productId){
        try{
            const product = await prisma.product.findUnique({
                where:{
                    id: productId
                }
            })
            return product
        }catch(err){
            prismaErrHandler(err)
        }
    }

    async updateProduct(productId){
        try{
           const response = await prisma.product.update({
            where:{
                id: productId
            },
            data:{
                productName: this.name,
                productDescription: this.desc,
                asset:{
                    connect:{
                        id: productId
                    }
                },
                category:{
                  connect:{
                    categoryName: this.category
                  }
                },
                inventory:{
                    connect:{
                        productName: this.name
                    }
                },
                discount:{
                    connect:{
                        coupon: this.discountCoupon
                    }
                }
            },
            include:{
                inventory: true
            }
           })
           return response 
        }catch(err){
            prismaErrHandler(err)
        }
    }

    async deleteProduct(productId){
        try{
            const response = await prisma.product.delete({
                where:{
                    id: productId
                }
            })
            return response
        }catch(err){
            prismaErrHandler(err)
        }
    }
}

module.exports = Products