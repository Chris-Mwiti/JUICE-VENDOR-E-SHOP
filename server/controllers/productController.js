// Models
const Product = require('../models/products');

// Response Handlers
const ResponseHandler = require('../helpers/modelResponseHandlers');

class ProductController{
    constructor(req,res){
        this.req = req,
        this.res = res,
        this.productModel = new Product(req.body.name,req.body.category,req.body.price,req.body.description,req.body.discount),
        this.productId = req.params.productId
    }

    async addProduct(){
        const response = await this.productModel.addProduct();
        console.log(response)
        new ResponseHandler(response,this.res).postResponse();
    }

    async getProducts(){
        const products = await this.productModel.getProducts();
        new ResponseHandler(products,this.res).getResponse()
    }

    async getProduct(){
        const product = await this.productModel.getProduct(this.productId);
        new ResponseHandler(product,this.res).getResponse()
    }

    async updateProduct(){
        Number(this.productId)
        const response = await this.productModel.updateProduct(this.productId);
        new ResponseHandler(response,this.res).updatesResponse()
    }
    async deleteProduct(){
        const response = await this.productModel.deleteProduct(this.productId);
        new ResponseHandler(response,this.res).deleteResponse()
    }
}

module.exports = ProductController