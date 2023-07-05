// Dependancies
const ShoppingSession = require('../models/shoppingSession');
const OrderDetails = require('../models/ordersDetails');
const ResponseHandlers = require('../helpers/modelResponseHandlers');
const UserController = require('./userController');

class OrderDetailsController{
    constructor(req,res){
        this.req = req,
        this.res = res
    }

    // SERVER FUNCTIONALITIES
    async generateUserId(){
        const userId =  await new UserController().generateUserId(this.req,this.res);
        return userId;
    }

    async createOrder(){
        // Generate userId
        const userId = await this.generateUserId();

        // Get the  user session from the database
        const shoppingModel = new ShoppingSession();
        const session = await shoppingModel.getSession(userId); 

        // Check if the user has any available sessions
        if(session == undefined) return this.res.status(403).json({message: "You dont have a shopping session"});

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
        const orderModel = new OrderDetails(total,userId,provider,orderItems);
        const response = await orderModel.createOrder();

        new ResponseHandlers(response,this.res).postResponse();

    }

}

module.exports = OrderDetailsController
