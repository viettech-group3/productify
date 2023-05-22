// Create User routers
const express = require("express");
const UserRouter = express.Router();
const { signUp, login } = require("../controllers/User");

// Set up routes
UserRouter.post("/", signUp);
UserRouter.post("/login", login);

module.exports = UserRouter;
