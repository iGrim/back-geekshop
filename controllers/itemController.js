const MovieModel = require('../model/itemModel')
const path = require("path");
const UserModel = require("../model/userModel");
//Create
exports.create = async (req, res) => {
    if (!req.body.title && !req.body.description) {
        res.status(400).send({ message: "Entered data is empty!" });
    }

    const movie = new MovieModel({
        title: req.body.title,
        description: req.body.description,
        year: req.body.year,
        genre: req.body.genre,
        country: req.body.country,
        director: req.body.director,
        actors: req.body.actors,
        cover: req.body.cover,
        trailer: req.body.trailer,
    });

    await movie.save().then(data => {
        // res.send({
        //     message:"Movie added successfully!",
        //     movie:data
        // });
        res.redirect("/items/" + data.id)
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Error occurred while adding movie"
        });
    });
};
//FindAll
exports.findAll = async (req, res) => {
    try {
        const movies = await MovieModel.find();
        res.render(path.resolve("views/items.ejs"),{
            data: movies
        })
    } catch(error) {
        console.log(error.message)
        res.status(404).json({message: error.message});
    }
};
//FindById
exports.findOne = async (req, res) => {
    try {
        const movie = await MovieModel.findById(req.params.id);
        res.render(path.resolve("views/item.ejs"),{
            data: movie
        })
    } catch(error) {
        res.status(404).json({ message: error.message});
    }
};
//FindByIdEdit
exports.findOneEdit = async (req, res) => {
    try {
        const movie = await MovieModel.findById(req.params.id);
        res.render(path.resolve("views/item-edit.ejs"),{
            data: movie
        })
    } catch(error) {
        res.status(404).json({ message: error.message});
    }
};
//FindByTitle
exports.findByTitle = async (req, res) => {
    try {
        if (!req.body.searchReq) {
            const movies = await MovieModel.find();
            res.render(path.resolve("views/items.ejs"),{
                data: movies
            })
        }
        else{
            const movie = await MovieModel.find({ title: new RegExp('^'+req.body.searchReq+'$', "i")});
            res.render(path.resolve("views/items.ejs"),{
                data: movie
            })
        }
    } catch(error) {
        res.status(404).json({ message: error.message});
    }
};
//Update
exports.update = async (req, res) => {
    if(!req.body) {
        res.status(400).send({
            message: "Content is empty!"
        });
    }

    const id = req.params.id;

    await MovieModel.findByIdAndUpdate(id, req.body, { useFindAndModify: false }).then(data => {
        if (!data) {
            res.status(404).send({
                message: `Item not found`
            });
        }else{
            // res.send({ message: "Movie data updated successfully!" })
            res.redirect("/item/" + id)
        }
    }).catch(err => {
        res.status(500).send({
            message: err.message
        });
    });
};
//Delete
exports.destroy = async (req, res) => {
    await MovieModel.findByIdAndRemove(req.params.id).then(data => {
        if (!data) {
            res.status(404).send({
                message: `Item not found`
            });
        } else {
            // res.send({
            //     message: "Movie has been deleted!"
            // });
            res.redirect("/items/")
        }
    }).catch(err => {
        res.status(500).send({
            message: err.message
        });
    });
};