const express = require("express");
const router = express.Router();
router
    .route("/")
    .get((req, res) => res.sendFile(process.cwd()+"/views/favorite.ejs"))
    .post((req, res) => res.send("POST FAVORITE"));
module.exports = router;