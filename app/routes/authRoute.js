const express = require('express');
const router = express.Router();

// Connexion Form Page / rte GET Form
router.get('/login', (req, res)=>{
    res.render('login');
})

// Register Form Page / rte GET Form
router.get('/register', (req, res)=>{
    res.render('register');
})

// if no export, routeur not working
module.exports = router; 
