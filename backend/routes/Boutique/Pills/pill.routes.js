const express = require("express")
const pill_controller = require("../../../controllers/boutique/Pill.controllers")
const pill_routes=express.Router()
/**
 * Une route qui permet de créer une catégorie
 *@method POST
 * @url /category/create/
 * @author Nadvaxe2024 <advaxe@freeti.org>
 */
 pill_routes.post('/create',pill_controller.createPill)


 module.exports=pill_routes