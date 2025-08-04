const express = require("express")
const category_controller = require("../../../controllers/Boutique/Category.controllers")
const category_routes=express.Router()
/**
 * Une route qui permet de créer une catégorie
 *@method POST
 * @url /category/create/
 * @author NZOSABA santa Milka <santa.milka@mediabox.bi>
 */

 category_routes.post('/create',category_controller.createCategory)

 /**
 * Une route qui permet de lister toutes les catégories
 *@method GET
 * @url /category/all
 * @author NZOSABA santa Milka <santa.milka@mediabox.bi>
 */

 category_routes.get('/all',category_controller.findAllCategory)

 /**
 * Une route qui permet d'afficher une seule categorie
 *@method GET
 * @url /category/get/:ID_CATEGORY
 * @author NZOSABA santa Milka <santa.milka@mediabox.bi>
 */

 category_routes.get('/get/:ID_CATEGORY',category_controller.findOneCategory)


 /**
 * Une route qui permet de suppimer une ou plusieurs categories
 *@method POST
 * @url /category/delete
 * @author NZOSABA santa Milka <santa.milka@mediabox.bi>
 */

 category_routes.post('/delete',category_controller.deleteCategory)

 /**
 * Une route qui permet de modifer une ou plusieurs categories
 *@method PUT
 * @url /category/update/:ID_CATEGORY
 * @author NZOSABA santa Milka <santa.milka@mediabox.bi>
 */

 category_routes.put('/update/:ID_CATEGORY',category_controller.updateCategory)

 module.exports=category_routes