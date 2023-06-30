const prismaErrHandler = require('../err/prismaErrHandler');
const prisma = require('../configs/prismaConfig');

// @TODO: Change the req params to support strings requests

class Products {
    constructor(name,category,price,desc,discountCoupon,assetImage,quantity){
        this.name = name,
        this.category = category,
        this.price = price,
        this.desc = desc,
        this.discountCoupon = discountCoupon,
        this.productImage = assetImage,
        this.quantity = quantity
    }

    async addProduct(){
        try{
            const response = await prisma.product.create({
                data:{
                    productName: this.name,
                    price: this.price,
                    productDescription: this.desc,
                    inventory:{
                        connectOrCreate:{
                           where:{
                            productName: this.name
                           },
                           create:{
                            quantity: this.quantity,
                            productName: this.name
                           }
                           
                        }
                    },
                    discount: {
                        connect: {
                            coupon: this.discountCoupon
                        }
                    },
                    asset:{
                        create:{
                            image: this.productImage
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
            prismaErrHandler(err)
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
        const numId = Number(productId)
        try{
            const product = await prisma.product.findUnique({
                where:{
                    id: numId,
                }
            })
            return product
        }catch(err){
            prismaErrHandler(err)
        }
    }

    async updateProduct(productId){
        const numId = Number(productId)
        try{
           const response = await prisma.product.update({
            where:{
                id: numId
            },
            data:{
                productName: this.name,
                productDescription: this.desc,
                price: this.price,
                category:{
                    update:{
                        categoryName: this.category
                    }
                },
                inventory:{
                    update:{
                        quantity: this.quantity
                    }
                },
                asset:{
                    update:{
                        image: this.productImage
                    }
                },
                discount:{
                    update:{
                        coupon: this.discountCoupon
                    }
                }
                
                
            },
            include:{
                inventory: true,
                asset: true
            }
           })
           return response 
        }catch(err){
            console.error(err);
        }
    }

    async deleteProduct(productId){
        const numId = Number(productId)
        try{
            const response = await prisma.product.delete({
                where:{
                    id: numId
                },
                include:{
                    asset: true
                }
            })
            return response
        }catch(err){
            prismaErrHandler(err)
        }
    }
}

module.exports = Products