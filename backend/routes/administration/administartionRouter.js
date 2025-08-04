const express = require('express')
const utilisateurs_routes = require('./utilisateurs.routes.js')
const administrationRouter = express.Router()

administrationRouter.use('/utilisateurs', utilisateurs_routes)

module.exports = administrationRouter