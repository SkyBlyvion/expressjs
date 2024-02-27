exports.showHome = (req, res)=>{
    res.render('accueil');
};

exports.showAddPost = (req, res)=>{
    res.render('post/add');
}