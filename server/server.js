// Server setup
const express = require("express");
const app = express();
require("dotenv").config();

// Cors setup
const cors = require("cors");
const corsConfig = require("./configs/cors");
app.use(cors(corsConfig));

// Middlewares setup
const cookieParser = require("cookie-parser");
const errHandler = require("./middlewares/errHandler");
const { logEvents } = require("./middlewares/logger");
const verifyJwt = require("./middlewares/verifyJwt");

// Cookie parser middleware set up
app.use(cookieParser());

// Parsing the form data into urlencoded version
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Logger
app.use(logEvents);

// Routes

// ADMIN ROUTES
app.use("/api/admin/products", require("./routes/api/admin/products"));
app.use("/api/admin/register", require("./routes/api/admin/register"));
app.use("/api/admin/login", require("./routes/api/admin/login"));
app.use("/api/admin/login/check-user", require("./routes/api/admin/login"));
app.use("/api/admin/inventory", require("./routes/api/admin/inventory"));
app.use("/api/admin/orders", require("./routes/api/admin/order"));
app.use("/api/admin/sessions", require("./routes/api/admin/sessions"));
app.use("/api/admin/discounts", require("./routes/api/admin/discounts"));
app.use("/api/admin/categories", require("./routes/api/admin/categories"));

// USER ROUTES
app.use("/api/user/register", require("./routes/api/users/register"));
app.use("/api/user/login", require("./routes/api/users/logIn"));
app.use("/api/user/inventory", require("./routes/api/users/inventory"));
app.use("/api/user/products", require("./routes/api/users/products"));
app.use("/api/user/categories", require("./routes/api/users/categories"));
app.use("/api/user/sessions", require("./routes/api/users/shoppingSession"));
app.use("/api/user/cart", require("./routes/api/users/cartItems"));
app.use("/api/user/orders", require("./routes/api/users/order"));
app.use("/api/user/discounts", require("./routes/api/users/discounts"));

// Error Middleware handler
app.use(errHandler);

app.listen(process.env.STAGING_PORT, () => {
  console.log(
    `The server is up and running on server ${process.env.STAGING_PORT}`
  );
});
