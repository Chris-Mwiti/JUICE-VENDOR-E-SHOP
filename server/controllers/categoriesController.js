// Models
const Categories = require('../models/categories')

// Response Handlers
const ResponseHandler =  require('../helpers/modelResponseHandlers')

class CategoriesController{
    constructor(req,res){
        this.req = req,
        this.res = res,
        this.categoriesModel = new Categories(req.body.name,req.body.description)
    }

    async addCategory(){
        const response = await this.categoriesModel.addCategory();
        // Response handlers
        new ResponseHandler(response,this.res).postResponse()
    }

    async getCategories(){
        const categories = await this.categoriesModel.getCategories();
        new ResponseHandler(categories,this.res).getResponse();
    }

    async getCategory(){
        const { categoryName } = this.req.params
        const category = await this.categoriesModel.getCategory(categoryName);
        new ResponseHandler(category,this.res).getResponse()
    }

    async updateCategory(){
        const {categoryName} = this.req.params;
        // Validation of the response
        const response = await this.categoriesModel.updateCategory(categoryName,this.req.body.name,this.req.body.description);
        new ResponseHandler(response,this.res).updatesResponse()
    }

    async deleteCategory(){
        const {categoryName} = this.req.params;
        const response = await this.categoriesModel.deleteCategory(categoryName);
        new ResponseHandler(response,this.res).deleteResponse()

    }
}

module.exports = CategoriesController