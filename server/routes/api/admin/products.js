const router = require('express').Router();

const verifyJwt = require('../../../middlewares/verifyJwt');
const ProductController = require('../../../controllers/productController');

router.use(verifyJwt);
router.route('/')
    .get(async(req,res) => {
        const productController = new ProductController(req,res);
        await productController.getProducts()
    })
    .post(async(req,res) => {
        const productController = new ProductController(req,res);
        await productController.addProduct();
    })

// API ROUTES WITH APIS
router.route('/:productId')
    .get(async(req,res) => {
        const productController = new ProductController(req,res);
        await productController.getProduct();
    })
    .put(async(req,res) => {
        const productController = new ProductController(req,res);
        await productController.updateProduct();
    })
    .delete(async(req,res) => {
        const productController = new ProductController(req,res);
        await productController.deleteProduct();
    })

module.exports = router