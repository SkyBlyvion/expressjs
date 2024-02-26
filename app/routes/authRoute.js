const express = require('express');
const router = express.Router();
const authController = require('../controller/authController');

// Connexion Form Page / rte GET Form
router.get('/login', (req, res)=>{
    res.render('login');
})

// Register Form Page / rte GET Form
router.get('/register', authController.showRegistrationForm)

// if no export, routeur not working
module.exports = router; 
