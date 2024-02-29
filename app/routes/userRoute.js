const express = require('express');
const router = express.Router();
const authController = require('../controller/authController');
// Middleware to verify if the user is connected
const {ensureAuthenticator} = require('../middlewares/authMiddleware'); 

// route pour afficher le profil de l'user connecté
router.get('/profile', ensureAuthenticator, authController.showProfile);

// route qui renvoie le formulaire de modification d'un profil
router.get('/profile/edit', ensureAuthenticator, authController.showEditProfile);

// route pour receptionner les données du formulaire d'un profil
router.post('/profile/edit', ensureAuthenticator, authController.editProfile);


module.exports = router;