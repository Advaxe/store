const express = require("express");
const pill_routes = require("./pill.routes");
const pill_router=express.Router();
pill_router.use("/", pill_routes);

module.exports = pill_router;