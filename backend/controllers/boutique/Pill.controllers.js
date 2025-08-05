const express = require("express");
const RESPONSE_CODES = require("../../constants/RESPONSE_CODES.js");
const RESPONSE_STATUS = require("../../constants/RESPONSE_STATUS.js");
const Pill = require("../../models/Boutique/Pill.js")
const Validation = require("../../class/Validation.js");

/**
 * Fonction pour inserer les donnees dans la table pill
 * @param {express} req 
 * @param {express} res
 * @author Nadvaxe<advaxe@freeti.org> 
 * @Date le 11/09/2024
 */

const createPill=async(req,res)=>{

    try{

        const{ DESIGNATION,PRICE }=req.body
        const data = { ...req.body }

        const validation = new Validation(data, {
            DESIGNATION:{
                required: true,
                length: [2, 25],
                alpha: true
            },
            PRICE:{
                required: true,
                length: [2, 25],
                alpha: true
            }

        },{
            DESIGNATION:{
                required: "Ce champ est obligatoire",
                length: "La valeur doit etre entre 2 et 25 caracteres",
                alpha: "Doit contenir des caracteres alpha Numérique"
            },
            PRICE:{
                required: "Ce champ est obligatoire",
                length: "La valeur doit etre entre 3 et 6 caracteres",
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
        const result=await Pill.create({DESIGNATION,PRICE});
        res.status(RESPONSE_CODES.CREATED).json({
            statusCode: RESPONSE_CODES.CREATED,
            httpStatus: RESPONSE_STATUS.CREATED,
            message: "Pill saved successfully",
            result: result
  })
    }catch(error){
        console.log(error)
        res.status(RESPONSE_CODES.INTERNAL_SERVER_ERROR).json({
            statusCode: RESPONSE_CODES.INTERNAL_SERVER_ERROR,
            httpStatus: RESPONSE_STATUS.INTERNAL_SERVER_ERROR,
            message: "An internal error occured",
  })
    }


}

/**
 * Fonction pour lire les donnees se trouvant dans la table pill
 * @param {express} req 
 * @param {express} res
 * @author Nadvaxe<advaxe@freeti.org> 
 * @Date le 11/09/2024
 */
const findAllPill=async(req,res)=>{

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
            query.DESIGNATION = { $regex: search, $options: 'i' };
        }

        // Execute query with pagination
        const [pills, totalCount] = await Promise.all([
            Pill.find(query)
                .sort(sort)
                .limit(limit)
                .skip(skip),
            Pill.countDocuments(query)
        ]);

        res.status(RESPONSE_CODES.OK).json({
            statusCode: RESPONSE_CODES.OK,
            httpStatus: RESPONSE_STATUS.OK,
            message: "Liste des pills",
            result: {
                data: pills,
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
 * Fonction pour afficher une donnee se trouvant dans la table pill
 * @param {express} req 
 * @param {express} res
 * @author Nadvaxe<advaxe@freeti.org> 
 * @Date le 11/09/2024
 */
const findOnePill=async(req,res)=>{

    try{

        const {ID_PILL}=req.params
        const pill = await Pill.findById(ID_PILL)
        if(!pill){
          return res.status(RESPONSE_CODES.NOT_FOUND).json({
            statusCode: RESPONSE_CODES.NOT_FOUND,
            httpStatus: RESPONSE_STATUS.NOT_FOUND,
            message: "La pill non trouvee",
  })
        }
          res.status(RESPONSE_CODES.OK).json({
            statusCode: RESPONSE_CODES.OK,
            httpStatus: RESPONSE_STATUS.OK,
            message: "pill trouveee",
            result: pill
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
 * Fonction pour supprimer les donnees dans la table pill
 * @param {express} req 
 * @param {express} res
 * @author Nadvaxe<advaxe@freeti.org> 
 * @Date le 11/09/2024
 */
const deletePill=async(req,res)=>{

  try{
    const {ids}= req.body
    const itemsIds = JSON.parse(ids)
    await Pill.deleteMany({
        _id: { $in: itemsIds }
    })
      res.status(RESPONSE_CODES.OK).json({
        statusCode: RESPONSE_CODES.OK,
        httpStatus: RESPONSE_STATUS.OK,
        message: "Les pills ont ete supprimés avec success",
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
 * Fonction pour modifier les donnees dans la table pill
 * @param {express} req 
 * @param {express} res
 * @author Nadvaxe<advaxe@freeti.org> 
 * @Date le 11/09/2024
 */

const updatePill=async(req,res)=>{

  try{

    const {ID_PILL}= req.params
    const { DESIGNATION, PRICE } = req.body;

    const data = { ...req.body };
    const validation = new Validation(
      data,
      {
        DESIGNATION: {
          required: true,
          alpha: true,
          length: [2, 20],
        },
        PRICE: {
          required: true,
          alpha: true,
          length: [2, 25],
        },
      },
      {
        DESIGNATION: {
          required: "Ce champ est obligatoire",
          alpha: "Doit contenir des caractères alpha numeriques",
          length: "La valeur doit être comprise 2 et 20 caractères",
        },
        PRICE: {
          required: "Ce champ est obligatoire",
          alpha: "Doit contenir des caractères alpha Numérique",
          length: "La valeur doit etre entre 2 et 25 caracteres",
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

    const result = await Pill.findByIdAndUpdate(
      ID_PILL,
      { DESIGNATION, PRICE },
      { new: true }
    );
    res.status(RESPONSE_CODES.CREATED).json({
      statusCode: RESPONSE_CODES.CREATED,
      httpStatus: RESPONSE_STATUS.CREATED,
      message: "Pill mis à jour avec succès",
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
    createPill,
    findAllPill,
    findOnePill,
    deletePill,
    updatePill
}