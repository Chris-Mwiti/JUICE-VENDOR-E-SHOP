const prisma = require('@configs/prismaConfig')

class Products {
    constructor(name,category,price,desc){
        this.name = name,
        this.category = category,
        this.price = price,
        this.desc = desc
    }

    async addProduct(){

        const productInfo = {
            name: this.name,
            category: this.category
        }
    }
}

module.exports =Products