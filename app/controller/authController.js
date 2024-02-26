const User= require('../model/userScheme');
const bcrypt = require('bcrypt');

// affiche le formulaire d'inscription
// grace a export, la const peut etre apelle nimporte ou
exports.showRegistrationForm = (req, res)=>{
    res.render('register', { error:'Message d\'erreur'});
}

