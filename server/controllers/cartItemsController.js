// Models
const CartItems = require('../models/cartItems');
const ShoppingSession = require('../models/shoppingSession')

// Helpers
const ResponseHanlders = require('../helpers/modelResponseHandlers');
const calculateTotalPrice = require('../helpers/calculateTotalPrice');

// Controllers
const UserController = require('./userController');


class CartItemsController{
    constructor(req,res){
        this.req = req,
        this.res = res,
        this.sessionId = req.sessionId,
        this.itemId = req.params.itemId,
        this.cartModel = new CartItems(req.body.product,req.body.quantity,this.sessionId)
    }

    // SERVER FUNCTIONALITIES
    async generateUserId(){
        const userId =  await new UserController().generateUserId(this.req,this.res);
        return userId;
    }

    // CRUD OPERATIONS
    async addCartItem(){
        const response = await this.cartModel.addCartItem();
        if (response == null || undefined) return this.res.status(500).json({message: "Server side error"});

        // Generate userId
        const userId = await this.generateUserId()

        // Get the total and sessionId from the session table
        const { total } = response.session;
        const { id } = response.session;

        // Calculate the total price of the cart item & calculate new session total price
        const { quantity } = response;
        const { price } = response.product;
        const newTotalPrice = calculateTotalPrice(total,quantity,price);

        // Update the session id with the new total price
        const updateResponse = await new ShoppingSession(newTotalPrice,userId).updateSession(id);

        new ResponseHanlders(updateResponse,this.res).updatesResponse();

    }

    async getCartItems(){
        const cartItems = await this.cartModel.getCartItems()
        new ResponseHanlders(cartItems,this.res).getResponse();
    }

    async getCartItem(){
        const reqId = Number(this.itemId);
        const cartItem = await this.cartModel.getCartItem(reqId);
        new ResponseHanlders(cartItem,this.res).getResponse()
    }

    async updateCartItem(){
        const reqId = Number(this.itemId);
        const response = await this.cartModel.updateCartItem(reqId);

        // Get the total and sessionId from the session table
        const { total } = response.session;
        const { id } = response.session;

        // Calculate the total price of the cart item & calculate new session total price
        const { quantity } = response;
        const { price } = response.product;
        const newTotalPrice = calculateTotalPrice(total,quantity,price);

        const userId = await this.generateUserId()

        // Update the session id with the new total price
        const updateResponse = await new ShoppingSession(newTotalPrice,userId).updateSession(id);

        new ResponseHanlders(updateResponse,this.res).updatesResponse();
    }

    async deleteCartItem(){
        const reqId = Number(this.itemId);
        const response = await this.cartModel.deleteCartItem(reqId);
        new ResponseHanlders(response,this.res).deleteResponse();
    }

    async deleteAllCartItems(){
        const response = await this.cartModel.deleteAllCartItems();
        new ResponseHanlders(response,this.res).deleteResponse();
    }

}

module.exports = CartItemsController