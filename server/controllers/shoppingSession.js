// Models
const ShoppingSession = require('../models/shoppingSession');

// Controllers

// Response Handlers
const ResponseHanlders = require('../helpers/modelResponseHandlers');
const User = require('../models/users');

class ShoppingSessionController{
    constructor(req,res){
        this.req = req,
        this.res = res,
        this.userEmail = req.email
    }

    // SERVER FUNCTIONALITIES
    async generateUserId(){
        // Fetch the user id from the database
        const user = await new User().getUser(this.userEmail);
        // Check if the user response is valid
        if (user == null || undefined) return this.res.status(403).json({message: "Forbidden"});
        // Get the userid from the user object
        const userId = user.id;
        return userId
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

    // PRIVILEGES: USER ONLY
    async updateSession(){
       
        const userId = await this.generateUserId();
        const shoppingModel = new ShoppingSession(this.req.body.total, userId);

        const response = await shoppingModel.updateSession(userId);
        new ResponseHanlders(response,this.res).updatesResponse()
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