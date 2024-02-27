const express = require('express');
const router = express.Router();
const postController = require('../controller/postController');

// Middleware to verify if the user is connected
const {ensureAuthenticator} = require('../middlewares/authMiddleware'); 

// route pour afficher le formulaire de creation d'un post
router.get('/add', ensureAuthenticator, postController.showAddPost);

// route pour receptionner les donnéeés du formulaire de creation d'un post
router.post('/add', ensureAuthenticator, postController.addPost);

module.exports = router; 