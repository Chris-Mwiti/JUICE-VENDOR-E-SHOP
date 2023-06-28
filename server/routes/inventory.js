const router = require('express').Router()

// Controllers
const InventoryController = require('../controllers/inventoryController')

// COMMON ROUTES API
router.route('/')
    .get(async (req,res) => {
        const inventoryController = new InventoryController(req,res);
        await inventoryController.getItems()
    })
    .post(async (req,res) => {
        const inventoryController = new InventoryController(req,res);
        await inventoryController.addItem()
    })

// API ROUTES WITH PARAMS
router.route('/:inventoryName')
    .get(async(req,res) => {
        const inventoryController = new InventoryController(req,res);
        await inventoryController.getItem()
    })
    .put(async(req,res) => {
        const inventoryController = new InventoryController(req,res);
        await inventoryController.updateItem()
    })
    .delete(async(req,res) => {
        const inventoryController = new InventoryController(req,res);
        await inventoryController.deleteItem()
    })


module.exports = router