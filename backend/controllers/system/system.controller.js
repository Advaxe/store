const express = require('express')
const RESPONSE_CODES = require('../../constants/RESPONSE_CODES.js')
const RESPONSE_STATUS = require('../../constants/RESPONSE_STATUS.js')
const Province = require('../../models/Syst_provinces.js')
const Commune = require('../../models/Syst_communes.js')
const Zone = require('../../models/Syst_zones.js')
const Colline = require('../../models/Syst_collines.js')

/**
 * Permet de recuperer tous les pays
 * @author Dukizwe Darcie <darcy@mediabox.bi>
 * @param {express.Request} req 
 * @param {express.Response} res 
 */
const findAllCountries = async (req, res) => {
          try {
                    // For now, return empty array since we don't have countries collection
                    // You can create a countries collection later if needed
                    res.status(RESPONSE_CODES.OK).json({
                              statusCode: RESPONSE_CODES.OK,
                              httpStatus: RESPONSE_STATUS.OK,
                              message: "Liste de tous les pays",
                              result: []
                    })
          } catch (error) {
                    console.log(error)
                    res.status(RESPONSE_CODES.INTERNAL_SERVER_ERROR).json({
                              statusCode: RESPONSE_CODES.INTERNAL_SERVER_ERROR,
                              httpStatus: RESPONSE_STATUS.INTERNAL_SERVER_ERROR,
                              message: "Erreur interne du serveur, réessayer plus tard",
                    })
          }
}

const getProvinces = async (req, res) => {
          try {
                    const provinces = await Province.find().sort({ PROVINCE_NAME: 1 })
                    res.status(200).json(provinces)
          } catch (error)  {
                    console.log(error)
                    res.status(500).send('Server error')
          }
}

const getCommunes = async (req, res) => {
          try {
                    const { provinceId } = req.params
                    const communes = await Commune.find({ PROVINCE_ID: provinceId }).sort({ COMMUNE_NAME: 1 })
                    res.status(200).json(communes)
          } catch (error)  {
                    console.log(error)
                    res.status(500).send('Server error')
          }
}

const getZones = async (req, res) => {
          try {
                    const { communeId } = req.params
                    const zones = await Zone.find({ COMMUNE_ID: communeId }).sort({ ZONE_NAME: 1 })
                    res.status(200).json(zones)
          } catch (error)  {
                    console.log(error)
                    res.status(500).send('Server error')
          }
}

const getCollines = async (req, res) => {
          try {
                    const { zoneId } = req.params
                    const collines = await Colline.find({ ZONE_ID: zoneId }).sort({ COLLINE_NAME: 1 })
                    res.status(200).json(collines)
          } catch (error)  {
                    console.log(error)
                    res.status(500).send('Server error')
          }
}
const getAvenues = async (req, res) => {
          try {
                    const { collineId } = req.params
                    // For now, return empty array since we don't have avenues collection
                    // You can create an avenues collection later if needed
                    res.status(200).json([])
          } catch (error)  {
                    console.log(error)
                    res.status(500).send('Server error')
          }
}


module.exports = {
          findAllCountries,
          getProvinces,
          getCommunes,
          getZones,
          getCollines,
          getAvenues
}