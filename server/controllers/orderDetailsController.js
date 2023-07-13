// Dependancies
const ShoppingSession = require('../models/shoppingSession');
const OrderDetails = require('../models/ordersDetails');
const ResponseHandlers = require('../helpers/modelResponseHandlers');
const Inventory = require('../models/inventory');
const Products = require('../models/products');

class OrderDetailsController{
    constructor(req,res){
        this.req = req,
        this.res = res,
        this.role = req.role
        this.userId = req.userId
    }


    // USERS PRIVILEGES
    async createOrder(){
        if(this.role !== 'user') return this.res.status(403).json({message: "Forbidden"});

        // Get the  user session from the database
        const shoppingModel = new ShoppingSession();
        const session = await shoppingModel.getSession(this.userId); 

        // Check if the user has any available sessions
        if(!session) return this.res.status(403).json({message: "You dont have a shopping session"});

        const { status } = session;

        if (status == "pending") return this.res.status(403).json({message: "Please ensure you have checked out to complete order"});

        const { total } = session;

        // Extract the product id and quantity from the session
        const  { cartItems } = session

        const orderItems = cartItems.map(item => (
            {
                productId: item.productId,
                quantity: item.quantity
            }
        ))

        const { provider } = this.req.body
        const orderModel = new OrderDetails(total,this.userId,provider,orderItems);
        const response = await orderModel.createOrder();

        new ResponseHandlers(response,this.res).postResponse();

    }


    // ADMINS ONLY
    async updateOrder(){
        if(this.role !== 'admin') return this.res.status(403).json({message: "Forbidden"});
        const { id } = this.req.params
        const orderId =  Number(id);
        const updateResponse = await new OrderDetails().updateOrder(this.req.body.status,orderId);
    
        if(!updateResponse) return this.res.status(500).json({message: "Server side error"});

        // Destructure the orderItems from the update response
        const { items,status } = updateResponse
        if (status == 'pending') return new ResponseHandlers(updateResponse,this.res).updatesResponse();

        // Update the inventory for each order item
        const inventoryModel = new Inventory();
        const productModel = new Products();
        
        for(const cartItem of items){
            try{
                const {quantity, productId} = cartItem
                // Get the product name
                const {productName} = await productModel.getProduct(productId);
                if(!productName) return this.res.status(400).json({message: `There is no product by the id ${productId}`});

                // Update the quantity of the item in the inventory
                const inventoryGetRes = await inventoryModel.getProductItem(productName);
                if(!inventoryGetRes) return this.res.status(400).json({message: `The following product does not exist in the inventory: ${productName}`});

                const initQuantity = inventoryGetRes.quantity;

                if(initQuantity === 0) return this.res.status(400).json({message: `${productName} is out of stock`});

                // Deduct the ordered quantities
                const newQuantity = initQuantity - quantity;

                const inventoryUptRes = await inventoryModel.updateProduct(productName, newQuantity);

                if(!inventoryUptRes) return this.res.status(500).json({message: "Error while updating inventory"});
            }catch(err){
                console.error("Error while updating:" +err);
                return this.res.status(500).json({message: "Server side error"})
            }
        }

        return this.res.status(200).json({message: "Ok"})
    }

    async getOrders(){
        if(this.role !== 'admin') return this.res.status(403).json({message: "Forbidden"});
        try{
            const response = await new OrderDetails().getOrders();
            new ResponseHandlers(response,this.res).getResponse();

        }catch(err){
            console.error("Error while getting orders:" +err);
            return this.res.status(500).json({message: "Server side error"});
        }
    }

    async getOrder(){
        if(this.role !== 'admin') return this.res.status(403).json({message: "Forbidden"});
        try{
            const {id} = this.req.params
            const orderId =  Number(id);
            const order = await new OrderDetails().getOrder(orderId)
            new ResponseHandlers(order,this.res).getResponse()
        }catch(err){
            console.error("Error while getting orders:" +err);
            return this.res.status(500).json({message: "Server side error"});
        }
    }

    async deleteOrder(){
        if(this.role !== 'admin') return this.res.status(403).json({message: "Forbidden"});
        try{
            const {id} = this.req.params
            const orderId =  Number(id);
            const order = await new OrderDetails().deleteOrder(orderId)
            new ResponseHandlers(order,this.res).deleteResponse()
        }catch(err){
            console.error("Error while getting orders:" +err);
            return this.res.status(500).json({message: "Server side error"});
        }
    }

}

module.exports = OrderDetailsController
