const express = require('express');
const router = express.Router();
const authController = require('../controller/authController');

// Connexion Form Page / rte GET Form
router.get('/login', (req, res)=>{
    res.render('login');
})

// Register Form Page / rte GET Form
router.get('/register', authController.showRegistrationForm);
// route qui receptionne les donnéeés du formulaire d'inscription
router.post('/register', authController.registerUser);

// if no export, routeur not working
module.exports = router; 
