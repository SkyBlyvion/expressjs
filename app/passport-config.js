const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('./model/userScheme');

// on va enregister une strategie locale a notre passport
// fonction annonyme asynchrone ( use try catch)
passport.use(new LocalStrategy(
    {usernameField: 'email'},
    async (email, password, done)=>{
        try {

            // recuperer l'user de la base de données par son email
            const user = await User.findOne({ email: email });
            // verifier si l'user existe deja ou pas 
            if(!user){
                return done(null, false, {message: 'email et ou mdp incorrect !'});
            }
            
            // verifie le mdp avec celui de la bdd
            const isMatch = await user.comparePassword(password);
            
            // verifier si le mdp est correct ou pas
            if(isMatch){
                return done(null, user);
            }else {
                return done(null, false , {message: 'email et ou mdp incorrect !'});
            }
            
        } catch (error) {
            return done(error);
        }
    }
));

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    try {
        const user = await User.findById(id);
        done(null, user);
    } catch (error) {
        done(error);
    }
});

module.exports = passport
