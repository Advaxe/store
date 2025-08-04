const express = require("express");
const category_routes = require("./categorie.routes");
const category_router=express.Router();
category_router.use("/", category_routes);

module.exports = category_router;