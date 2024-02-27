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