const Post = require('../model/postScheme');
// méthode pour afficher la page d'accueil
exports.showHome = async (req, res)=>{
    try {
        // on récupére l'id de l'user connecté
        const userId = req.user._id;

        // on récupére tous les post de l'user connecté
        const userPosts = await Post.find({author: userId} ).sort({created_at: 'desc'});

        // on renvoie la vue accueil avec les posts de l'user connecté
        res.render('accueil', {userPosts});
    } catch (error) {
        console.log(error);
    }
};

// methode pour afficher le formulaire
exports.showAddPost = (req, res)=>{
    res.render('post/add', {error: null});
};

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

// methode pour afficher le formulaire de modification d'un post
exports.showEditPost = async (req, res)=>{
    try {
        // on recupére l'id du post à modifier
        const postId = req.params.id;

        // on récupére les données du post grace a son id
        const post = await Post.findById(postId);

        // on vérifie si l'user est l'autheur du poste
        if(post.author.equals(req.user._id)){

            // on renvoie la vue de modification du post avec les données du post
            res.render('post/edit', {post}, );
        }else {
            // on redirige vers la page d'accueil
            res.redirect('/');
        }

    } catch (error) {
        res.render('post/edit', {error: 'Une erreur est survenue.'});
    }
};

// méthode qui met a jour un poste
exports.editPost = async (req, res)=>{
    try {
        // on recupére les donnée du formulaire
        const { title, content} = req.body;
        // on recupere l'id du post à modifier
        const postId = req.params.id;
        // on recupére les données du post grace a son id
        const post = await Post.findById(postId);
        // on verifie si user est l'autheur du post
        if(post.author.equals(req.user._id)){
            // met a jour el poste
            post.title = title;
            post.content = content;
            post.updated_at = new Date;
            // on sauvegarde le post dans la bdd mongoose mongodb
            await post.save();

            // autre méthode pour mettre a jour le post 
            // await Post.updateOne({_id: postId}, {$set: {title: title, content: content, updated_at: new Date()}})


            // on redirige vers la page d'accueil
            res.redirect('/');
        } else {
            // on redirige vers la page d'accueil
            res.redirect('/');
        }
    } catch (error) {
        // on retourne le formulaire avec message d'erreur
        res.render('post/edit', {error: 'Une erreur est survenue.'});
    }
};

// méthode pour supprimer un poste
exports.deletePost = async (req, res)=>{
    try {
        // on recupere l'id du post
        const postId = req.params.id;
        // on recupére les données du post grace a son id
        const post = await Post.findById(postId);
        // on verifie si user est l'autheur du post
        if(!post){
            return res.status(404).send({message: 'Stop playing with urls'})
        }
        // on verifie si user est l'autheur du post
        if(post.author.equals(req.user._id)){
            // on supprime le post
            await Post.deleteOne({_id: postId});
            // on redirige vers la page d'accueil
            res.redirect('/');
        } else {
            // on redirige vers la page d'accueil
            res.redirect('/');
        }
    } catch (error) {
        
    }
};