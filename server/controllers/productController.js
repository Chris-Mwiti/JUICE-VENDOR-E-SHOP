// Models
const Product = require('../models/products');

// Response Handlers
const ResponseHandler = require('../helpers/modelResponseHandlers');

class ProductController{
    constructor(req,res){
        this.req = req,
        this.res = res,
        this.productModel = new Product(req.body.name,req.body.category,req.body.price,req.body.description,req.body.discount,req.body.assetImage,req.body.quantity),
        this.productId = req.params.productId
        this.role = req.role
    }

    async addProduct(){
        if(role !== "admin") return this.res.status(403).json({message: "Forbidden"})
        const response = await this.productModel.addProduct();
        console.log(response)
        new ResponseHandler(response,this.res).postResponse();
    }

    async getProducts(){
        const products = await this.productModel.getProducts();
        if(this.role == 'admin') return new ResponseHandler(products,this.res).getResponse();
        
        if(this.role == 'user'){
            const userProducts = products.map((product) => {
                const { id, productName, productDescription, price, category:{categoryName} } = product
                const productProperties = {
                    id: id,
                    productName: productName,
                    productDescription: productDescription,
                    price: price,
                    category: categoryName
                }
                return productProperties
            })

            return new ResponseHandler(userProducts, this.res).getResponse();
        }

        return this.res.status(403).json({message: "Forbidden"});
    }

    async getProduct(){
        const product = await this.productModel.getProduct(this.productId);
        if (this.role == 'admin') return new ResponseHandler(product,this.res).getResponse();

        if(this.role == 'user'){
            const {id, productName, productDescription, price, category:{categoryName}} = product
            const userProduct = {
                id: id,
                productName: productName,
                productDescription: productDescription,
                price: price,
                category: categoryName
            }

            return new ResponseHandler(userProduct,this.res).getResponse();
        }

        return this.res.status(403).json({message: "Forbidden"});

    }

    async updateProduct(){
        if(role !== "admin") return this.res.status(403).json({message: "Forbidden"});
        Number(this.productId)
        const response = await this.productModel.updateProduct(this.productId);
        new ResponseHandler(response,this.res).updatesResponse()
    }
    async deleteProduct(){
        if(role !== "admin") return this.res.status(403).json({message: "Forbidden"})
        const response = await this.productModel.deleteProduct(this.productId);
        new ResponseHandler(response,this.res).deleteResponse()
    }
}

module.exports = ProductController