const OrderDetailsController = require('../../../controllers/orderDetailsController');
const verifyJwt = require('../../../middlewares/verifyJwt');

const router = require('express').Router();

router.use(verifyJwt);

router.route('/')
    .get(async(req,res) => {
        const ordersController = new OrderDetailsController(req,res);
        await ordersController.getOrders();
    })
    
router.route('/:id')
    .put(async(req,res) => {
        const ordersController = new OrderDetailsController(req,res);
        await ordersController.updateOrder();
    })
    .get(async(req,res) => {
       const ordersController = new OrderDetailsController(req,res);
       await ordersController.getOrder(); 
    })
    .delete(async(req,res) => {
        const ordersController = new OrderDetailsController(req,res);
        await ordersController.deleteOrder();
    })



module.exports = router