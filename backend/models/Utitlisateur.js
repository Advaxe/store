const mongoose = require('mongoose');

const utilisateurSchema = new mongoose.Schema({
          nom: {
                    type: String,
                    required: true,
                    maxlength: 50
          },
          prenom: {
                    type: String,
                    required: true,
                    maxlength: 50
          },
          id_colline: {
                    type: Number,
                    required: true
          },
          image: {
                    type: String,
                    required: true,
                    maxlength: 255
          },
          date_naissance: {
                    type: Date,
                    required: true
          },
          date_insertion: {
                    type: Date,
                    default: Date.now
          }
}, {
          timestamps: false,
          collection: 'utilisateurs'
});

module.exports = mongoose.model('Utilisateur', utilisateurSchema);