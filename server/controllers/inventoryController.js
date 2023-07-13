// Models
const Inventory =  require('../models/inventory');

// Response Handlers
const ResponseHandler = require('../helpers/modelResponseHandlers');

class InventoryController{
    constructor(req,res){
        this.req = req,
        this.res = res,
        this.role = req.role
        this.inventoryModel = new Inventory(req.body.quantity,req.body.product)
        this.inventoryParam = req.params.inventoryId,
        this.quantity = req.body.quantity
    }

    async addItem(){
        if (this.role !== 'admin') return this.res.status(403).json({message: "Forbidden"})
        const response = await this.inventoryModel.addItem();
        new ResponseHandler(response,this.res).postResponse();
    }

    async getItems(){
        const items = await this.inventoryModel.getItems();
        if(this.role == 'admin') return new ResponseHandler(items,this.res).getResponse();
        if(this.role == 'user'){
            const userInventory = items.map((item) => {
                const { id, productName, quantity} = item
                const inventoryProperties = {
                    id: id,
                    productName: productName,
                    quantity: quantity
                }
                return inventoryProperties
            })

            return new ResponseHandler(userInventory, this.res).getResponse();
        }
    }

    async getItem(){
        if(this.role !== 'admin') return this.res.status(403).json({message: "Forbidden"});
        const inventoryId = Number(this.inventoryParam);
        const item = await this.inventoryModel.getItem(inventoryId);
        new ResponseHandler(item,this.res).getResponse();
    }

    async updateItem(){
        if(this.role !== 'admin') return this.res.status(403).json({message: "Forbidden"});
        const inventoryId = Number(this.inventoryParam)
        const response = await this.inventoryModel.updateItem(inventoryId, this.quantity);
        new ResponseHandler(response,this.res).updatesResponse();
    }

    

    async deleteItem(){
        if(this.role !== 'admin') return this.res.status(403).json({message: "Forbidden"});
        const inventoryId = Number(this.inventoryParam)
        const response = await this.inventoryModel.deleteItem(inventoryId);
        new ResponseHandler(response,this.res).deleteResponse();
    }
}

module.exports = InventoryController