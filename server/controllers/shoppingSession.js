// Models
const ShoppingSession = require('../models/shoppingSession');

// Controllers

// Response Handlers
const ResponseHanlders = require('../helpers/modelResponseHandlers');


class ShoppingSessionController{
    constructor(req,res){
        this.req = req,
        this.res = res,
        this.total = req.body.total,
        this.status = req.body.status,
        this.userId = req.userId,
        this.role = req.role
        this.sessionModel = new ShoppingSession(this.total,this.userId,this.status)
    }


    // PRIVILEGES: USER ONLY
    async createSession(){
        if(this.role !== 'user') return this.res.status(403).json({message: "Forbidden"});
        const response = await this.sessionModel.createSession();
        const access_token = this.req.cookies.access_token
        new ResponseHanlders(response, this.res).postSessionResponse(access_token);

    }

    // PRIVILEGES: ADMIN
    async getSesssions(){
        if(this.role !== 'admin') return this.res.status(403).json({message: "Forbidden"});
        const sessions  = await this.sessionModel.getSessions();
        new ResponseHanlders(sessions,this.res).getResponse();
    }

    // PRIVILEGES: USER 
    async getSession(){
        if(this.role !== 'user') return this.res.status(403).json({message: "Forbidden"});
        const session = await this.sessionModel.getSession(this.userId);
        new ResponseHanlders(session,this.res).getResponse()
    }
    
    async updateSessionStatus(){
        if(this.role !== 'user') return this.res.status(403).json({message: "Forbidden"});
        const session = await this.sessionModel.getSession(this.userId);

        if (session == null || undefined) return this.res.status(403).json({message: "Forbidden"});

        const { id } = session;
        const {status} = this.req.body
        const response = await this.sessionModel.updateSessionStatus(id,status);

        new ResponseHanlders(response,this.res).updatesResponse();

    }
    
    // PRIVILEGES: ADMIN ONLY
    async deleteSession(){
        if(this.role !== 'admin') return this.res.status(403).json({message: "Forbidden"});
        const {sessionId} = this.req.params;
        const id = Number(sessionId);
        const response = await this.sessionModel.deleteSession(id);
        new ResponseHanlders(response,this.res).deleteResponse()
    }
}


module.exports = ShoppingSessionController