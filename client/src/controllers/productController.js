import axios from 'axios'

class ProductController{
    constructor(id,category){
        this.id = id,
        this.category = category
        this.source = axios.CancelToken.source()
    }

    async getProducts(){
        try {
            const products = await axios.get('http://localhost:1100/products',{cancelToken: this.source.token}).finally(() =>{
                this.source.cancel()
            })
            return products.data
        } catch (error) {
           console.error(error) 
        }
    }

   async getProduct(){
        try {
            const product = await axios.get(`http://localhost:1100/products/${this.id}`)
            return product.data
        } catch (error) {
            if (axios.isCancel(error)) {
                return "axios request cancelled";
            }
            console.error(error)
        }
    }

    async filterProducts(){
        try {
            const filteredProduct = await axios.get(`http://localhost:1100/products/?category=${this.category}`,{cancelToken: this.source.token}).finally(() => {
               this.source.cancel()
            })
            return filteredProduct.data
        } catch (error) {
            if (axios.isCancel(error)) {
                return "axios request cancelled";
            }
            console.error(error)
        }
    }
}

export default ProductController