import axios from 'axios'

class CartController{
    constructor(item){
        this.item = item
    }

   async addItem(){
    const addQuery = await axios.post('http://localhost:1100/cart',this.item)
    return addQuery.status
    }

    async getItems(){
        const getQuery = await axios.get('http://localhost:1100/cart')
        return getQuery.data
    }
}

export default CartController