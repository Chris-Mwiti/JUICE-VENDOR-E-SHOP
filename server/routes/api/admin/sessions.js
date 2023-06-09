const verifyJwt = require('../../../middlewares/verifyJwt');
const ShoppingSessionController = require('../../../controllers/shoppingSession');

const router = require('express').Router();


// COMMON ROUTES
router.use(verifyJwt)
router.route('/')
    .get(async(req,res) => {
        const shoppingController = new ShoppingSessionController(req,res);
        await shoppingController.getSesssions()
    })
    
// ROUTES WITH PARAMS (ADMIN PRIVILEGES)
router.route('/:sessionId')
    .delete(async(req,res) => {
        const shoppingController = new ShoppingSessionController(req,res);
        await shoppingController.deleteSession();
    })


module.exports = router;