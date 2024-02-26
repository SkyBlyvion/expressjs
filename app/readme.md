# command 

# first init, create package.json
npm init -y

# install express.js
npm i express

# start server
npm start
 docker exec -it nodeexpress npm start

# more librairies
npm i mongoose ( object data modeling "doctrine for mongo" )
npm i nodemon --save-dev ( refresh node file / monitor script )
npm i express-session ( middleware / gérer des sessions )
npm i body-parser ( middleware / sert a traiter les données d'un formulaire )
npm i bootstrap ( Collection )
npm i bcrypt ( pass encoder )
npm i passport ( middleware / authenticate requests )
npm i passport-local ( auth Oauth )
npm i ejs ( templates engines )

# uninstall librairies
npm uninstall nodemon

# definition des routes
"/" => accueil ( access if authenticated only )
"/login" => connexion
"/register" => enregistrement

# definition des modeles
"User" = "name", "email", "password"
"Post" = "title", "content", "author", "created_at", "updated_at"