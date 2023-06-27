// Models
const Inventory =  require('../models/inventory');

// Response Handlers
const ResponseHandler = require('../helpers/modelResponseHandlers');

class InventoryController{
    constructor(req,res){
        this.req = req,
        this.res = res
        this.inventoryModel = new Inventory(req.body.quantity,req.body.product)
    }

    async addItem(){
        const response = await this.inventoryModel.addItem();
        new ResponseHandler(response,this.res).postResponse()
    }

    async getItems(){
        const items = await this.inventoryModel.getItems();
        new ResponseHandler(items,this.res).getResponse();
    }

    async getItem(){
        const item = await this.inventoryModel.getItem();
        new ResponseHandler(item,this.res).getResponse()
    }

    async updateItem(){
        const response = await this.inventoryModel.updateItem();
        new ResponseHandler(response,this.res)
    }

    async deleteItem(){
        const response = await this.inventoryModel.deleteItem();
        new ResponseHandler(response,this.res);
    }
}

module.exports = InventoryController