const prismaErrHandler = require('../err/prismaErrHandler');
const prisma = require('../configs/prismaConfig');

class Inventory{
    constructor(quantity,product){
        this.quantity = quantity
        this.product = product
    }

    async addItem(){
        try{
            const response = await prisma.inventory.create({
                data:{
                    quantity: this.quantity,
                    productName: this.product
                }
            })
            return response
        }catch(err){
            prismaErrHandler(err)
        }
    }

    async getItem(inventoryId){
        try{
            const inventoryItem =  await prisma.inventory.findUnique({
                where:{
                    id: inventoryId
                },
                include:{
                    product: true
                }
            })
            return inventoryItem
        }catch(err){
            prismaErrHandler(err)
        }
    }

    async getProductItem(productName){
        try{
            const product = await prisma.inventory.findUnique({
                where:{
                    productName: productName
                }
            })
            return product
        }catch(err){
            prismaErrHandler(err)
        }
    }


    async updateItem(inventoryId,quantity){
        try{
            const response =  await prisma.inventory.update({
                where:{
                    id: inventoryId
                },
                data:{
                    quantity: quantity
                },
            })
            return response
        }catch(err){
            prismaErrHandler(err)
        }
    }

    async updateProduct(productName,quantity){
        try{
            const response =  await prisma.inventory.update({
                where:{
                    productName: productName
                },
                data:{
                    quantity: quantity
                },
            })
            return response
        }catch(err){
            prismaErrHandler(err)
        }
    }
    

    async getItems(){
        try{
            const products = await prisma.inventory.findMany({
                include:{
                    product: true
                }
            })
            return products
        }catch(err){
            prismaErrHandler(err)
        }
    }

    async deleteItem(item){
        try{
            const response = await prisma.inventory.delete({
                where:{
                    productName: item
                }
            })
            return response
        }catch(err){
            prismaErrHandler(err)
        }
    }
}

module.exports = Inventory