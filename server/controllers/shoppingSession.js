// Models
const ShoppingSession = require('../models/shoppingSession');

// Controllers

// Response Handlers
const ResponseHanlders = require('../helpers/modelResponseHandlers');
const User = require('../models/users');
const UserController = require('./userController');

class ShoppingSessionController{
    constructor(req,res){
        this.req = req,
        this.res = res,
        this.userEmail = req.email
    }

    // SERVER FUNCTIONALITIES
    async generateUserId(){
        const userId =  await new UserController().generateUserId(this.req,this.res);
        return userId;
    }

    // PRIVILEGES: USER ONLY
    async createSession(){

        const userId = await this.generateUserId();
        // Instantiate the shopping model
        const shoppingModel = new ShoppingSession(this.req.body.total, userId);
        const response = await shoppingModel.createSession();

        const access_token = this.req.cookies.access_token
        new ResponseHanlders(response, this.res).postSessionResponse(access_token);

    }

    // PRIVILEGES: ADMIN
    async getSesssions(){
        const userId = await this.generateUserId();
        const shoppingModel = new ShoppingSession(this.req.body.total, userId);

        const sessions  = await shoppingModel.getSessions();
        new ResponseHanlders(sessions,this.res).getResponse();
    }

    // PRIVILEGES: USER 
    async getSession(){
       
        const userId = await this.generateUserId();
        const shoppingModel = new ShoppingSession(this.req.body.total, userId);

        const session = await shoppingModel.getSession(userId);
        new ResponseHanlders(session,this.res).getResponse()
    }

    
    // PRIVILEGES: ADMIN ONLY
    async deleteSession(){
        const {sessionId} = this.req.params;
        const id = Number(sessionId);

        const userId = await this.generateUserId();
        const shoppingModel = new ShoppingSession(this.req.body.total, userId);

        const response = await shoppingModel.deleteSession(id);
        new ResponseHanlders(response,this.res).deleteResponse()
    }
}


module.exports = ShoppingSessionController