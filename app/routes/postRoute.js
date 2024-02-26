const express = require('express');
const router = express.Router();
// TODO: Create ensureAuthenticator in Middleware
const {ensureAuthenticator} = require('../middlewares/authMiddleware'); 

// Landing page
router.get('/', ensureAuthenticator, (req,res)=>{
    res.render('accueil');
})

//TODO: others routes 

module.exports = router; 