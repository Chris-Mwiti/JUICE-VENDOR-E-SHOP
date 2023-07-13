// Instantiate the router
const router = require("express").Router();

// Dependancies
const UserController = require("../../../controllers/userController");

// User Routes
router.route("/").post(async (req, res, next) => {
  // Instanstantiate the user controller
  const userController = new UserController(req, res);
  await userController.postUser();
});

module.exports = router;
