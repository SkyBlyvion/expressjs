const Post = require('../model/postScheme');
// méthode pour afficher la page d'accueil
exports.showHome = (req, res)=>{
    res.render('accueil');
};

// methode pour afficher le formulaire
exports.showAddPost = (req, res)=>{
    res.render('post/add', {error: null});
}

// méthode pour rajouter un post
exports.addPost = async (req, res)=>{
    try {
        // on récupére les donnée du formulaire
        const { title, content } = req.body;
        // on récupére l'id de l'user connecté
        const author = req.user._id; //mongodb _id

        // on crée l'objet post
        const newPost = new Post({
            title:title,
            content:content,
            author:author,
            created_at: new Date(),
        })

        // on sauvegarde le post dans la bdd mongoose mongodb
        await newPost.save();

        // on redirige vers la page d'accueil
        res.redirect('/');

    } catch (error) {
        // on redirige sur le formulaire de creation de post avec message d'erreur
        res.render('post/add', {error: 'Une erreur est survenue.'});
    }
};
