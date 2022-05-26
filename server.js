require('dotenv').config();

const express = require("express");
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const GoogleStrategy = require('passport-google-oauth20').Strategy;

const methodOverride = require('method-override')

const session = require('express-session')
const passport=require('passport')

app.use(methodOverride('_method'))

app.set('view engine', 'ejs');
app.set('views', './views');

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.use(express.static('assets'))

app.use(session({
    secret: "then we need to replace it to .env file",
    resave: false,
    saveUninitialized: false
}))
app.use(passport.initialize())
app.use(passport.session())

mongoose.connect("mongodb+srv://Grim:h8VSt3Y8uBpehbXc@geekshopnew-ejs.8i1l4.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",(err)=>{
    if(err){
        console.log(err)
    }
    else{
        console.log('connected');
    }
})

const UserRoute = require('./routes/userRoute')

app.use('/',UserRoute)

app.get("/", function(req, res){
    res.render("index");
});

app.get("/films", function(req, res){
    res.render("films");
});

app.get("/register", function(req, res){
    res.render("register");
});

app.get("/login", function(req, res){
    res.render("login");
});


app.use("/admin/items/add", require("./routes/add-item"));

//level 5
app.get("/favorite", function(req, res){
    if(req.isAuthenticated()){
        res.render("favorite")
    }else{
        res.redirect("/login")
    }
});

app.get("/secrets", function(req, res){
    if(req.isAuthenticated()){
        res.render("secrets")
    }else{
        res.redirect("/login")
    }
});

//level 6
app.get("/auth/google",
    passport.authenticate('google',{ scope: ["profile", "email"] })
)

app.get('/auth/google/favorite',
    passport.authenticate('google', { failureRedirect: '/login' }),
    function(req, res) {
        // Successful authentication, redirect home.
        res.redirect('/favorite');
    });
//

app.get("/logout",function (req, res){
    req.logout()
    res.redirect("/")
})

const port = process.env.PORT || 80;

app.listen(port, () =>
    console.log(`App listening at http://localhost:${port}`)
);

const swaggerUi = require('swagger-ui-express')
swaggerDocument = require('./swagger.json');
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));