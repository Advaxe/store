const IMAGES_DESTINATIONS = require("../../constants/IMAGES_DESTINATIONS.js");
const Upload = require("../Upload.js");
const path = require('path')

class UtilisateurUpload extends Upload
{
          constructor() {
                    super()
                    this.destinationPath = path.resolve('./') + path.sep + 'public' + IMAGES_DESTINATIONS.utilisateurs
          }
}
module.exports = UtilisateurUpload