const express = require('express');
const router = express.Router();
const authController = require('../controller/authController');
// Middleware to verify if the user is connected
const {ensureAuthenticator} = require('../middlewares/authMiddleware'); 

// route pour afficher le profil de l'user connecté
router.get('/profile', ensureAuthenticator, authController.showProfile);

module.exports = router;