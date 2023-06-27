const prisma  = require('../configs/prismaConfig')
const prismaErrHandler = require('../err/prismaErrHandler')

class Categories{
    constructor(name,desc){
        this.name = name,
        this.desc = desc
    }

    async addCategory(){
       try {
        const response = await prisma.category.create({
            data:{
                categoryName: this.name,
                categoryDescription: this.desc
            }
        })
        return response
       } catch (error) {
           prismaErrHandler(error)
       }
    }

    async getCategories(){
        try{
            const categories = await prisma.category.findMany()
            return categories
        }catch(error){
            prismaErrHandler(error)
        }
    }

    async getCategory(categoryName){
        try{
            const category = await prisma.category.findUnique({
                where:{
                    categoryName: categoryName
                }
            })
            return category
        }catch(error){
            prismaErrHandler(error)
        }
    }

    async updateCategory(categoryName,newCategoryName,newCategoryDescription){
        try{
            const response = await prisma.category.update({
                where:{
                    categoryName: categoryName
                },
                data:{
                    categoryName: newCategoryName,
                    categoryDescription: newCategoryDescription
                }
            })
            return response
        }catch(error){
            prismaErrHandler(error)
        }
    }

    async deleteCategory(categoryName){
        console.log(categoryName)
        try{
            const response =  await prisma.category.delete({
                where:{
                    categoryName: categoryName
                }
            })
            return response
        }catch(error){
            prismaErrHandler(error)
        }
    }
}

module.exports = Categories