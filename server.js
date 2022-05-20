const express = require("express");
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const methodOverride = require('method-override')

app.use(methodOverride('_method'))


app.set('view engine', 'ejs');
app.set('views', './views');

app.use(express.static('assets'))

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

mongoose.Promise = global.Promise;

const fs = require('fs')
const path = require('path')
const user = require("./model/user");
mongoose.connect("mongodb+srv://Grim:h8VSt3Y8uBpehbXc@geekshopnew-ejs.8i1l4.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",(err)=>{
    if(err){
        console.log(err)
    }
    else{
        console.log('connected');
    }
})


const UserRoute = require('./routes/User')
app.use('/user',UserRoute)

const test = require('./routes/itemRoute')
app.use('/items',test)



app.get('/', (req, res, next) => {
    res.render('index', {
        title: 'test'
    });
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

app.use("/register", require("./routes/register"));
app.use('/user', require('./routes/userRoute'))
app.use('/users', require('./routes/userRoute'))

app.use('/items', require('./routes/itemRoute'))
app.use("/admin/items/add", require("./routes/add-item"));

const port = process.env.PORT || 80;

app.listen(port, () =>
    console.log(`App listening at http://localhost:${port}`)
);