const express = require("express");
const article_routes = require("./article.routes.js");
const article_router=express.Router();
article_router.use("/", article_routes);

module.exports = article_router;