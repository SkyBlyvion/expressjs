// import des modules
const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const passport = require('passport');
const mongoose = require('mongoose');
const ejs = require('ejs');
const flash = require('express-flash');

// init application
const app = express();

// Connexion to MongoDB
mongoose.connect('mongodb://expressmongo:27017/mongoexpress',{


})

// Session config
app.use(session({
    secret: 'user_info', // Secret Key for data crypt
    resave: true, // save the session 
    saveUninitialized: true // save empty sessions
}))

// bodyparser : middleware pour parser les requêtes
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json());

// Passport config
app.use(passport.initialize());
app.use(passport.session());

// config flash messages
app.use(flash());

// Routes Configuration
const authRoutes = require('./routes/authRoute');
const postRoutes = require('./routes/postRoute');
const userRoutes = require('./routes/userRoute');

app.use('/', authRoutes);
app.use('/posts', postRoutes);
app.use('/users', userRoutes);

// config view engine
app.set('view engine', 'ejs');
app.set('views', './view');

// Listen on port 3000
const PORT = 3000;
app.listen(PORT, ()=>{
    console.log(`Server listening on port http://localhost:${PORT}`);})