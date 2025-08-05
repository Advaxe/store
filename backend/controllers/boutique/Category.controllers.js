const express = require("express");
const RESPONSE_CODES = require("../../constants/RESPONSE_CODES.js");
const RESPONSE_STATUS = require("../../constants/RESPONSE_STATUS.js");
const Category = require("../../models/Boutique/Category.js");
const Validation = require("../../class/Validation.js");


/**
 * Fonction pour inserer les donnees dans la table category
 * @param {express} req 
 * @param {express} res
 * @author Nzosaba Milka<santa.milka@mediabox.bi> 
 * @Date le 6/6/2024
 */

const createCategory=async(req,res)=>{

    try{

        const{ NAME_CATEGORY }=req.body
        const data = { ...req.body }

        const validation = new Validation(data, {
            NAME_CATEGORY:{
                required: true,
                length: [2, 25],
                alpha: true
            }

        },{
            NAME_CATEGORY:{
                required: "Ce champ est obligatoire",
                length: "La valeur doit etre entre 2 et 25 caracteres",
                alpha: "Doit contenir des caracteres alpha Numérique"
            }

        });

        if(!validation){

            const errors = await validation.getErrors()
                              return res.status(RESPONSE_CODES.UNPROCESSABLE_ENTITY).json({
                                        statusCode: RESPONSE_CODES.UNPROCESSABLE_ENTITY,
                                        httpStatus: RESPONSE_STATUS.UNPROCESSABLE_ENTITY,
                                        message: "Probleme de validation des donnees",
                                        result: errors
                              })
        }
        const result = await Category.create({ NAME_CATEGORY });
        res.status(RESPONSE_CODES.CREATED).json({
            statusCode: RESPONSE_CODES.CREATED,
            httpStatus: RESPONSE_STATUS.CREATED,
            message: "La categorie a été crée avec succes",
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


}
/**
 * Fonction pour lire les donnees se trouvant dans la tble category
 * @param {express} req 
 * @param {express} res
 * @author Nzosaba Milka<santa.milka@mediabox.bi> 
 * @Date le 6/6/2024
 */
const findAllCategory=async(req,res)=>{

    try{
        const { rows = 10, first = 0, sortField, sortOrder, search } = req.query
        const limit = parseInt(rows);
        const skip = parseInt(first);

        // Build sort object
        let sort = {};
        if (sortField) {
            const sortDirection = sortOrder == 1 ? 1 : -1;
            sort[sortField] = sortDirection;
        } else {
            sort = { CREATED_AT: -1 }; // Default sort by creation date descending
        }

        // Build search query
        let query = {};
        if (search && search.trim() !== "") {
            query.NAME_CATEGORY = { $regex: search, $options: 'i' };
        }

        // Execute query with pagination
        const [categories, totalCount] = await Promise.all([
            Category.find(query)
                .sort(sort)
                .limit(limit)
                .skip(skip),
            Category.countDocuments(query)
        ]);

        res.status(RESPONSE_CODES.OK).json({
            statusCode: RESPONSE_CODES.OK,
            httpStatus: RESPONSE_STATUS.OK,
            message: "Liste des categories",
            result: {
                data: categories,
                totalRecords: totalCount
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


}
/**
 * Fonction pour afficher une donnee se trouvant dans la table category
 * @param {express} req 
 * @param {express} res
 * @author Nzosaba Milka<santa.milka@mediabox.bi> 
 * @Date le 6/6/2024
 */
const findOneCategory=async(req,res)=>{

    try{

        const {ID_CATEGORY}=req.params
        const category = await Category.findById(ID_CATEGORY)
        if(!category){
          return res.status(RESPONSE_CODES.NOT_FOUND).json({
            statusCode: RESPONSE_CODES.NOT_FOUND,
            httpStatus: RESPONSE_STATUS.NOT_FOUND,
            message: "La categorie non trouvee",
  })
        }
          res.status(RESPONSE_CODES.OK).json({
            statusCode: RESPONSE_CODES.OK,
            httpStatus: RESPONSE_STATUS.OK,
            message: "categorie trouveee",
            result: category
        })

    }catch(error){
        console.log(error)
        res.status(RESPONSE_CODES.INTERNAL_SERVER_ERROR).json({
            statusCode: RESPONSE_CODES.INTERNAL_SERVER_ERROR,
            httpStatus: RESPONSE_STATUS.INTERNAL_SERVER_ERROR,
            message: "Erreur interne du serveur, réessayer plus tard",
  })
    }


}
/**
 * Fonction pour supprimer les donnees dans la table category
 * @param {express} req 
 * @param {express} res
 * @author Nzosaba Milka<santa.milka@mediabox.bi> 
 * @Date le 6/6/2024
 */
const deleteCategory=async(req,res)=>{

  try{
    const {ids}= req.body
    const itemsIds = JSON.parse(ids)
    await Category.deleteMany({
        _id: { $in: itemsIds }
    })
      res.status(RESPONSE_CODES.OK).json({
        statusCode: RESPONSE_CODES.OK,
        httpStatus: RESPONSE_STATUS.OK,
        message: "Les categories ont ete supprimés avec success",
            })
  }
  catch(error){

    console.log(error)
    res.status(RESPONSE_CODES.INTERNAL_SERVER_ERROR).json({
        statusCode: RESPONSE_CODES.INTERNAL_SERVER_ERROR,
        httpStatus: RESPONSE_STATUS.INTERNAL_SERVER_ERROR,
        message: "Erreur interne du serveur, réessayer plus tard",
})
  }


}

/**
 * Fonction pour modifier les donnees dans la table category
 * @param {express} req 
 * @param {express} res
 * @author Nzosaba Milka<santa.milka@mediabox.bi> 
 * @Date le 6/6/2024
 */

const updateCategory=async(req,res)=>{

  try{

    const {ID_CATEGORY}= req.params
    const { NAME_CATEGORY } = req.body;

    const data = { ...req.body };
    const validation = new Validation(
      data,
      {
        NAME_CATEGORY: {
          required: true,
          alpha: true,
          length: [2, 20],
        },
      },
      {
        NAME_CATEGORY: {
          required: "Ce champ est obligatoire",
          alpha: "Doit contenir des caractères alpha numeriques",
          length: "La valeur doit être comprise 2 et 20 caractères",
        },
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

    const result = await Category.findByIdAndUpdate(
      ID_CATEGORY,
      { NAME_CATEGORY },
      { new: true }
    );
    res.status(RESPONSE_CODES.CREATED).json({
      statusCode: RESPONSE_CODES.CREATED,
      httpStatus: RESPONSE_STATUS.CREATED,
      message: "Categorie mis à jour avec succès",
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


}

module.exports={
    createCategory,
    findAllCategory,
    findOneCategory,
    deleteCategory,
    updateCategory
}