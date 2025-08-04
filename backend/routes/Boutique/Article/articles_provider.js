const express = require("express");
const article_routes = require("./article.routes");
const article_router=express.Router();
article_router.use("/", article_routes);

module.exports = article_router;