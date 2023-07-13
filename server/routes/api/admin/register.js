// Instantiate the router
const router = require('express').Router()

// Dependancies
const AdminController = require('../../../controllers/adminController');

// User Routes
router.route('/')
    .post(async (req,res,next) => {
        // Instanstantiate the user controller
        const adminController = new AdminController(req,res);
        await adminController.postUser();
    })

module.exports = router