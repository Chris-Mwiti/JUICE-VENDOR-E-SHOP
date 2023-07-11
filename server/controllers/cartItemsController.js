// Models
const CartItems = require('../models/cartItems');
const ShoppingSession = require('../models/shoppingSession')

// Helpers
const ResponseHanlders = require('../helpers/modelResponseHandlers');
const calculateTotalPrice = require('../helpers/calculateTotalPrice');

class CartItemsController{
    constructor(req,res){
        this.req = req,
        this.res = res,
        this.sessionId = req.sessionId,
        this.itemId = req.params.itemId,
        this.userId = req.userId
        this.cartModel = new CartItems(req.body.product,req.body.quantity,this.sessionId)
    }

    // CRUD OPERATIONS
    async addCartItem(){
        const response = await this.cartModel.addCartItem();
        if (response == null || undefined) return this.res.status(500).json({message: "Server side error"});

        // Get the total and sessionId from the session table
        const { total } = response.session;
        const { id } = response.session;

        // Calculate the total price of the cart item & calculate new session total price
        const { quantity } = response;
        const { price } = response.product;
        const newTotalPrice = calculateTotalPrice(total,quantity,price);

        // Update the session id with the new total price
        const updateResponse = await new ShoppingSession(newTotalPrice,this.userId).updateSessionTotal(id);

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

        // Update the session id with the new total price
        const updateResponse = await new ShoppingSession(newTotalPrice,this.userId).updateSessionTotal(id);

        new ResponseHanlders(updateResponse,this.res).updatesResponse();
    }

    async deleteCartItem(){
        const reqId = Number(this.itemId);
        const response = await this.cartModel.deleteCartItem(reqId);
        new ResponseHanlders(response,this.res).deleteResponse();
    }

    // ADMIN ONLY
    async deleteAllCartItems(){
        const response = await this.cartModel.deleteAllCartItems();
        new ResponseHanlders(response,this.res).deleteResponse();
    }

}

module.exports = CartItemsController