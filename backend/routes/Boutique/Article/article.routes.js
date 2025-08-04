const express = require("express")
const article_controllers = require("../../../controllers/boutique/Article.controllers")
const article_routes=express.Router()
/**
 * Une route qui permet de créer un article
 *@method POST
article * @author NZOSABA santa Milka <santa.milka@mediabox.bi>
 */
article_routes.post('/create',article_controllers.createArticle)
/**
 * Une route qui permet de lister toutes les articles
 *@method GET
 * @url /article/all
 * @author NZOSABA santa Milka <santa.milka@mediabox.bi>
 */
article_routes.get('/all',article_controllers.findAllArticle)

/**
 * Une route qui permet d'afficher un seul article
 *@method GET
 * @url /article/get/:ARTICLE_ID
 * @author NZOSABA santa Milka <santa.milka@mediabox.bi>
 */
article_routes.get('/get/:ARTICLE_ID',article_controllers.findOneArticle)

/**
 * Une route qui permet de suppimer une ou plusieurs articles
 *@method POST
 * @url /article/delete
 * @author NZOSABA santa Milka <santa.milka@mediabox.bi>
 */


article_routes.post('/delete',article_controllers.deleteArticle)

 /**
 * Une route qui permet de modifer une ou plusieurs articles
 *@method PUT
 * @url /article/update/:ARTICLE_ID
 * @author NZOSABA santa Milka <santa.milka@mediabox.bi>
 */
article_routes.put('/update/:ARTICLE_ID',article_controllers.updateArticle)
/**
 * Une route qui permet d'afficher le rapport
 *@method GET
 * @url /article/all_chart
 * @author NZOSABA santa Milka <santa.milka@mediabox.bi>
 */

article_routes.get('/all_chart',article_controllers.getArticlesByCategory1)
article_routes.get('/all_categories/:ID_CATEGORY',article_controllers.allArticlesByCategory)


module.exports=article_routes


