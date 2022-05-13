const express = require("express");
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');



app.set('view engine', 'ejs');
app.set('views', './views');

app.use(express.static('assets'))

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

const fs = require('fs')
const path = require('path')
const user = require("./app/model/user");
mongoose.connect("mongodb+srv://Grim:h8VSt3Y8uBpehbXc@geekshopnew-ejs.8i1l4.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",(err)=>{
    if(err){
        console.log(err)
    }
    else{
        console.log('connected');
    }
})

const port = process.env.PORT || 80;

const UserRoute = require('./app/routes/User')
app.use('/user',UserRoute)

const ItemsRoute = require('./app/routes/Items')
app.use('/items',ItemsRoute)

app.get('/', (req, res, next) => {
    res.render('index', {
        title: 'test'
    });
});

app.get('/index', (req, res) => {
    res.json({"message": "Hello Crud Node Express"});
});

app.get('/favorite', (req, res, next) => {
    res.render('favorite', {
        title: 'test'
    });
});

app.get('/login', (req, res, next) => {
    res.render('login', {
        title: 'test'
    });
});

app.get('/register', (req, res, next) => {
    res.render('register', {
        title: 'test'
    });
});

app.post('/register',(req,res)=>{
    const newUser = new user({
        email:req.body.email,
        password:req.body.password,
    })
    if(req.body.password === req.body.passwordr) {
        newUser.save((err) => {
            if (err) {
                console.log(err)
            } else {
                console.log("Ok")
            }
        })
        res.json({msg:"user saved"})
    }
    else{
        res.json({msg:"err"})
    }


})

app.listen(port, () =>
    console.log(`App listening at http://localhost:${port}`)
);