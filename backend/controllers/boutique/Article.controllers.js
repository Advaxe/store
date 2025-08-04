const express = require("express");
const RESPONSE_CODES = require("../../constants/RESPONSE_CODES.js");
const RESPONSE_STATUS = require("../../constants/RESPONSE_STATUS.js");
const Article = require("../../models/Boutique/Article.js");
const Validation = require("../../class/Validation.js");
const { Op , where, QueryTypes} = require("sequelize");
const Category = require("../../models/Boutique/Category.js");
const ArticleUpload = require("../../class/uploads/ArticleUpload.js");
const IMAGES_DESTINATIONS = require("../../constants/IMAGES_DESTINATIONS.js");
const sendMail = require("../../utils/sendMail.js");
const sequelize = require("../../utils/sequerize.js");
/**
 * Fonction pour inserer les donnees dans la table article
 * @param {express} req 
 * @param {express} res
 * @author Nzosaba Milka<santa.milka@mediabox.bi> 
 * @Date le 7/6/2024
 */
const createArticle = async(req,res)=>{
    try{

        const{ID_CATEGORY,NAME_ARTICLE,PRICE_ARTICLE}= req.body;
        const {IMAGE} = req.files
        const data = {...req.body, ...req.files}
        const validation = new Validation(data,{
            ID_CATEGORY : {
                required : true,
                number : true
            },
            NAME_ARTICLE : {
                required : true,
                alpha : true,
                length : [2,20]
            },
            PRICE_ARTICLE : {
                required : true
            },
            IMAGE : {  
                required : true,
                image : 2000000            
            }

        },{
            ID_CATEGORY : {
                required : "Ce champ est obligatoire",
                number : "La valeur doit etre numerique"

            },
            NAME_ARTICLE : {
                required : "Ce champ est obligatoire",
                alpha : "La valeur doit etre alpha numerique",
                length : "La valeur doit etre entre 2 et 20 caracteres"
            },
            PRICE_ARTICLE : {
                required : "Ce champ est obligatoire",
            },
            IMAGE : {  
              required : "Ce champ est obligatoire",
              image : "L'image ne doit pas dépasser 2Mo"            
          }


        })

        if(!validation){
            const errors = await validation.getErrors()
            return res.status(RESPONSE_CODES.UNPROCESSABLE_ENTITY).json({
                statusCode: RESPONSE_CODES.UNPROCESSABLE_ENTITY,
                httpStatus: RESPONSE_STATUS.UNPROCESSABLE_ENTITY,
                message: "Probleme de validation des donnees",
                result: errors
                })
        }
        //Import de la classe qui va uploader les images
        const articleUpload = new ArticleUpload()
        var filename;
        if(IMAGE){
          const{fileInfo: fileInfo_1, thumbInfo: thumbInfo_1}=
          await articleUpload.upload(IMAGE,false);
          filename = fileInfo_1;
        }
        const result= await Article.create({
          ID_CATEGORY,
          NAME_ARTICLE,
          PRICE_ARTICLE,
          IMAGE: filename ?`${req.protocol}://${req.get("host")}/${ IMAGES_DESTINATIONS.articles }/${filename?.fileName}` : null,
        });
        const sujet= "Boutique - Confirmation article"
        //Envoyer un mail lorsque l'article a été enregistré avec succes
        await sendMail({to : "nzosabamilka@gmail.com", sujet}, "confirm_article" ,{ NAME_ARTICLE, PRICE_ARTICLE});
        res.status(RESPONSE_CODES.CREATED).json({
            statusCode: RESPONSE_CODES.CREATED,
            httpStatus: RESPONSE_STATUS.CREATED,
            message: "L'article a été crée avec succes",
            result: result
  })

    }catch(error){
        console.log(error)
        res.status(RESPONSE_CODES.INTERNAL_SERVER_ERROR).json({
            statusCode: RESPONSE_CODES.INTERNAL_SERVER_ERROR,
            httpStatus: RESPONSE_STATUS.INTERNAL_SERVER_ERROR,
            message: "Erreur interne du serveur, réessayer plus tard",
  })
    }


};

/**
 * Fonction pour lire les donnees se trouvant dans la tble article/Liste
 * @param {express} req 
 * @param {express} res
 * @author Nzosaba Milka<santa.milka@mediabox.bi> 
 * @Date le 7/6/2024
 */
const findAllArticle = async(req,res)=>{
    try{

        const { rows = 10, first = 0, sortField, sortOrder, search } = req.query
        const defaultSortDirection = "DESC"

        const sortColumns = {
            category: {
                      as: "category",
                      fields: {
                        ID_CATEGORY: 'ID_CATEGORY',
                        DESIGNATION: 'DESIGNATION',
                        CREATED_AT: 'CREATED_AT',
                      }
            },
            article: {
                as: "article",
                fields: {
                ARTICLE_ID: 'ARTICLE_ID',
                ID_CATEGORY: 'ID_CATEGORY',
                NAME_ARTICLE: 'NAME_ARTICLE',
                PRICE_ARTICLE: 'PRICE_ARTICLE',
                CREATED_AT: 'CREATED_AT'
                }
      }
  }
  var orderColumn, orderDirection


    // sorting
    var sortModel;
    if (sortField) {
      for (let key in sortColumns) {
        if (sortColumns[key].fields.hasOwnProperty(sortField)) {
          sortModel = {
            model: key,
            as: sortColumns[key].as,
          };
          orderColumn = sortColumns[key].fields[sortField];
          break;
        }
      }
    }
    if (!orderColumn || !sortModel) {
      orderColumn = sortColumns.article.fields.CREATED_AT;
      sortModel = {
        model: "article",
        as: sortColumns.article.as,
      };
    }

    // ordering
    if (sortOrder == 1) {
      orderDirection = "ASC";
    } else if (sortOrder == -1) {
      orderDirection = "DESC";
    } else {
      orderDirection = defaultSortDirection;
    }

    // searching
    const globalSearchColumns = ["NAME_ARTICLE","$categorie.DESIGNATION$"];
    
    var globalSearchWhereLike = {};
    if (search && search.trim() != "") {
      const searchWildCard = {};
      globalSearchColumns.forEach((column) => {
        searchWildCard[column] = {
          [Op.substring]: search,
        };
      });
      globalSearchWhereLike = {
        [Op.or]: searchWildCard,
      };
    }

    const result = await Article.findAndCountAll({
      limit: parseInt(rows),
      offset: parseInt(first),
    //   order: [[sortModel, orderColumn, orderDirection]],
      where: {
        ...globalSearchWhereLike,
      },
      include: {
        model: Category,
        required: true,
        as: "category"
      }
    });
    res.status(RESPONSE_CODES.OK).json({
        statusCode: RESPONSE_CODES.OK,
        httpStatus: RESPONSE_STATUS.OK,
        message: "Liste des articles",
        result: {
                  data: result.rows,
                  totalRecords:result.count
        }
})

    }catch(error){
        console.log(error)
        res.status(RESPONSE_CODES.INTERNAL_SERVER_ERROR).json({
            statusCode: RESPONSE_CODES.INTERNAL_SERVER_ERROR,
            httpStatus: RESPONSE_STATUS.INTERNAL_SERVER_ERROR,
            message: "Erreur interne du serveur, réessayer plus tard",
  })
    }
};

/**
 * Fonction pour afficher une donnee se trouvant dans la table article
 * @param {express} req 
 * @param {express} res
 * @author Nzosaba Milka<santa.milka@mediabox.bi> 
 * @Date le 7/6/2024
 */
const findOneArticle = async(req,res)=>{
    try{

        const {ARTICLE_ID}=req.params
        const article= await Article.findOne({
          include: { model: Category, as: "category" },
          where: {ARTICLE_ID},
        });
       
        if (article) {
          res.status(RESPONSE_CODES.OK).json({
            statusCode: RESPONSE_CODES.OK,
            httpStatus: RESPONSE_STATUS.OK,
            message: "Article trouvé",
            result: article,
          });
        } else {
          res.status(RESPONSE_CODES.NOT_FOUND).json({
            statusCode: RESPONSE_CODES.NOT_FOUND,
            httpStatus: RESPONSE_STATUS.NOT_FOUND,
            message: "L'article non trouvé",
          });
        }
          

    }catch(error){
        console.log(error)
        res.status(RESPONSE_CODES.INTERNAL_SERVER_ERROR).json({
            statusCode: RESPONSE_CODES.INTERNAL_SERVER_ERROR,
            httpStatus: RESPONSE_STATUS.INTERNAL_SERVER_ERROR,
            message: "Erreur interne du serveur, réessayer plus tard",
  })
    }
};

/**
 * Fonction pour supprimer les donnees dans la table article
 * @param {express} req 
 * @param {express} res
 * @author Nzosaba Milka<santa.milka@mediabox.bi> 
 * @Date le 7/6/2024
 */
const deleteArticle = async(req,res)=>{
    try{

        const {ids}= req.body
    const itemsIds = JSON.parse(ids)
    await Article.destroy({
        where: {
          ARTICLE_ID: {
                   [Op.in]: itemsIds
                         }
             }
              })
      res.status(RESPONSE_CODES.OK).json({
        statusCode: RESPONSE_CODES.OK,
        httpStatus: RESPONSE_STATUS.OK,
        message: "Les articles ont ete supprimés avec success",
            })

    }catch(error){
        console.log(error)
        res.status(RESPONSE_CODES.INTERNAL_SERVER_ERROR).json({
            statusCode: RESPONSE_CODES.INTERNAL_SERVER_ERROR,
            httpStatus: RESPONSE_STATUS.INTERNAL_SERVER_ERROR,
            message: "Erreur interne du serveur, réessayer plus tard",
  })
    }
};

/**
 * Fonction pour modifier les donnees dans la table article
 * @param {express} req 
 * @param {express} res
 * @author Nzosaba Milka<santa.milka@mediabox.bi> 
 * @Date le 7/6/2024
 */
const updateArticle = async(req,res)=>{
    try{

        const {ARTICLE_ID}= req.params
        const { ID_CATEGORY,NAME_ARTICLE,PRICE_ARTICLE } = req.body;
        const{ IMAGE } = req.files || {};
    
        const data = { ...req.body, ...req.files };
        const validation = new Validation(
          data,
          {
            ID_CATEGORY : {
                required : true,
                number : true
            },
            NAME_ARTICLE : {
                required : true,
                alpha : true,
                length : [2,20]
            },
            PRICE_ARTICLE : {
                required : true
            },
            IMAGE : {
              image: 2000000,
            }
          },
          {
            ID_CATEGORY : {
                required : "Ce champ est obligatoire",
                number : "La valeur doit etre numerique"

            },
            NAME_ARTICLE : {
                required : "Ce champ est obligatoire",
                alpha : "La valeur doit etre alpha numerique",
                length : "La valeur doit etre entre 2 et 20 caracteres"
            },
            PRICE_ARTICLE : {
                required : "Ce champ est obligatoire",
            },
            IMAGE : {
              image: "L'image ne doit pas dépasser 2Mo",
            }
          }
        );
    
        if (!validation) {
          const errors = await validation.getErrors();
          return res.status(RESPONSE_CODES.UNPROCESSABLE_ENTITY).json({
            statusCode: RESPONSE_CODES.UNPROCESSABLE_ENTITY,
            httpStatus: RESPONSE_STATUS.UNPROCESSABLE_ENTITY,
            message: "Problème de validation des données",
            result: errors,
          });
        }

        //Pour recuperer l'image actuel
        const currentArticle = await Article.findByPk(ARTICLE_ID,
          {
            attributes: ["IMAGE"],

          })

        //Import de la classe qui va uploader les images
        const articleUpload = new ArticleUpload()
        var filename;//va afficher le nom de l'image uploade
        if(IMAGE){
          const{fileInfo} = await articleUpload.upload(IMAGE,false);
          filename = `${req.protocol}://${req.get("host")}/${ IMAGES_DESTINATIONS.articles }/${fileInfo?.fileName}`
          
        }
    

        const result = await Article.update(
          { ID_CATEGORY,NAME_ARTICLE,PRICE_ARTICLE, IMAGE:filename?filename:currentArticle.IMAGE},
          {
            where: { ARTICLE_ID: ARTICLE_ID },
          }
        );
        res.status(RESPONSE_CODES.CREATED).json({
          statusCode: RESPONSE_CODES.CREATED,
          httpStatus: RESPONSE_STATUS.CREATED,
          message: "Article mis à jour avec succès",
          result: result,
        });

    }catch(error){
        console.log(error)
        res.status(RESPONSE_CODES.INTERNAL_SERVER_ERROR).json({
            statusCode: RESPONSE_CODES.INTERNAL_SERVER_ERROR,
            httpStatus: RESPONSE_STATUS.INTERNAL_SERVER_ERROR,
            message: "Erreur interne du serveur, réessayer plus tard",
  })
    }
};

/**
 * Fonction afficher les donnees qui s'afficheront sur un rapport article/category
 * @param {express} req 
 * @param {express} res
 * @author Nzosaba Milka<santa.milka@mediabox.bi> 
 * @Date le 14/6/2024
 */
const getArticlesByCategory1 = async (req,res) => {
  try{
    const result = await sequelize.query(`SELECT category.ID_CATEGORY,category.DESIGNATION as name,COUNT(article.ID_CATEGORY) as nbr  
      FROM article join category on article.ID_CATEGORY=category.ID_CATEGORY WHERE 1 GROUP by category.ID_CATEGORY,category.DESIGNATION`,
      { nest: true,type: QueryTypes.SELECT }
    );

    const totalRecords = result.length;

    res.status(RESPONSE_CODES.OK).json({
      statusCode: RESPONSE_CODES.OK,
      httpStatus: RESPONSE_STATUS.OK,
      message: "Liste des articles",
      result: {
        result,
        totalRecords,
      },
    });
  }catch(error){
    console.log(error)
    res.status(RESPONSE_CODES.INTERNAL_SERVER_ERROR).json({
      statusCode: RESPONSE_CODES.INTERNAL_SERVER_ERROR,
      httpStatus: RESPONSE_STATUS.INTERNAL_SERVER_ERROR,
      message: "Erreur interne du serveur, réessayer plus tard",
  });
}
}



const allArticlesByCategory = async(req,res) => {

  try{

    const {ID_CATEGORY}=req.params
    const article= await Article.findAll({
      include: { model: Category, as: "category" },
      where: {
        ID_CATEGORY : ID_CATEGORY
      },
    });
   
    if (article) {
      res.status(RESPONSE_CODES.OK).json({
        statusCode: RESPONSE_CODES.OK,
        httpStatus: RESPONSE_STATUS.OK,
        message: "Article trouvé",
        result: article,
      });
    } else {
      res.status(RESPONSE_CODES.NOT_FOUND).json({
        statusCode: RESPONSE_CODES.NOT_FOUND,
        httpStatus: RESPONSE_STATUS.NOT_FOUND,
        message: "L'article non trouvé",
      });
    }

  }catch(error){
    console.log(error)
    res.status(RESPONSE_CODES.INTERNAL_SERVER_ERROR).json({
      statusCode: RESPONSE_CODES.INTERNAL_SERVER_ERROR,
      httpStatus: RESPONSE_STATUS.INTERNAL_SERVER_ERROR,
      message: "Erreur interne du serveur, réessayer plus tard",
  });


  }
  
}




module.exports={
    createArticle,
    findAllArticle,
    findOneArticle,
    deleteArticle,
    updateArticle,
    getArticlesByCategory1,
    allArticlesByCategory

}

