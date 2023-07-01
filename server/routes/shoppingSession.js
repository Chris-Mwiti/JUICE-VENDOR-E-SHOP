const verifyJwt = require('../middlewares/verifyJwt');
const ShoppingSessionController = require('../controllers/shoppingSession');

const router = require('express').Router();


// COMMON ROUTES
router.use(verifyJwt)
router.route('/')
    .get(async(req,res) => {
        const shoppingController = new ShoppingSessionController(req,res);
        await shoppingController.getSesssion()
    })
    .post(async(req,res) => {
        const shoppingController = new ShoppingSessionController(req,res);
        await shoppingController.createSession()
    })
    .put(async(req,res) => {
        const shoppingController = new ShoppingSessionController(req,res);
        await shoppingController.updateSession();
    })

    
// @TODO: SEPARETE USER ROUTES FROM ADMIN ROUTES

// ROUTES WITH PARAMS (ADMIN PRIVILEGES)
router.route('/:sessionId')
    .delete(async(req,res) => {
        const shoppingController = new ShoppingSessionController(req,res);
        await shoppingController.deleteSession();
    })


module.exports = router;