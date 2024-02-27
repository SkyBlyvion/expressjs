const express = require('express');
const router = express.Router();
const authController = require('../controller/authController');
const postController = require('../controller/postController');

// route d'accueil
router.get('/', postController.showHome);
// router.get('/login', authController.showHome);

// Connexion Form Page / rte GET Form
router.get('/login', authController.showLoginForm);

// Route qui réceptionne les donnéeés du formulaire de connexion
router.post('/login', authController.loginUser);

// Register Form Page / rte GET Form
router.get('/register', authController.showRegistrationForm);

// route qui receptionne les donnéeés du formulaire d'inscription
router.post('/register', authController.registerUser);

// if no export, router not working
module.exports = router; 
