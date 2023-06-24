// Instantiate the router
const router = require('express').Router()

// Dependancies
const UserController = require('../controllers/userController')

// User Routes
router.route('/')
    .post(async (req,res,next) => {
        // Instanstantiate the user controller
        const userController = new UserController();
        try{
            const response = await userController.postUser(req.body);
            
            // Check the response and send status code per the response
            switch(response){
                case 400: return res.status(400).json({message: "Bad Request"})
                case 500: return res.status(500).json({message: "Server side error"})

                default:
                    res.status(201).json({message: "Created"})
            }
            
        }
        catch(error){
            next(error);
        }
    })
    .delete((req,res,next) => {
        console.log(req.params);
    })

module.exports = router