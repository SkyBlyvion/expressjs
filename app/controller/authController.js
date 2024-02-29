const passport = require('../passport-config');
const User = require('../model/userScheme');
const bcrypt = require('bcrypt');

// affiche le formulaire d'inscription
// grace a export, la const peut etre apelle nimporte ou
exports.showRegistrationForm = (req, res)=>{
    res.render('register', { error:null});
}

// register new user
// execute la fonction en asynchrone, pour eviter les erreurs
exports.registerUser = async (req, res)=>{
    try {
        const { name, email, password } = req.body; // on apelle ça de la destructuration des objets
        
        // verifier si l'utilisateur existe déja
        const existingUser = await User.findOne({ email: email }); // await only in async function
        if(existingUser) {
            return res.render('register', { error: 'Cet utilisateur existe déjà !' });
        }
        
        // on vérifie si les champs soient remplis
        if( name === '' || email === '' || password === ''){
            return res.render('register', { error: 'Veuillez remplir tous les champs !' });
        }
        console.log(req.body);

        // on encode le mot de passe
        const hashedPassword = await bcrypt.hash(password, 10);

        // on crée l'objet user
        const newUser = new User({
            name:name,
            email:email,
            password:hashedPassword
        });

        // on save l'user dans la base de données
        await newUser.save();

        res.redirect('/login');


    } catch (error) {
        console.error(error);
        res.render('register', { error:'Erreur d\'enregistrement de l\'utilisateur !'});
    }
}

// affiche le formulaire de connexion
exports.showLoginForm = (req, res)=>{
    res.render('login');
}

exports.loginUser = passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: true
})

// deconnextion de l'user
exports.logoutUser = (req, res)=>{
    req.logout();
    res.redirect('/login')
}

// affiche le profil de l'user connecté
exports.showProfile = async (req, res)=>{
    try {
        // on récupére l'id de l'user connecté
        const userId = req.user._id;

        // on récupére les information de l'user connecté
        const user = await User.findById(userId);

        // on renvoie la vue accueil avec les infos de l'user connecté
        res.render('profile', {user});
    } catch (error) {
        console.log(error);
    }
}