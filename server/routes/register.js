// Instantiate the router
const router = require('express').Router()

// Dependancies
const UserController = require('../controllers/userController')

// User Routes
router.route('/')
    .post(async (req,res,next) => {
        const userController = new UserController();
        try{
            const response = await userController.postUser(req.body);
            if (typeof(response) !== 'object'){
                return res.sendStatus(500);
            }else{
                res.sendStatus(201);
            }
            
        }
        catch(error){
            console.log(error)
            next(error);
        }
    })
    .delete((req,res,next) => {
        console.log(req.params);
    })

module.exports = router