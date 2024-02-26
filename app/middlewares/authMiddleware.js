module.exports = {
    // OLD Method ( fonction annonyme )
    ensureAuthenticator: function(req,res, next){
        if(req.isAuthenticated()){
            return next();
        }
        res.redirect('/login')
    }
}

// module.exports = {
//     // NEW Method ( fonction annonyme )
//     ensureAuthenticator: (req,res, next)=>{

//     }
// }