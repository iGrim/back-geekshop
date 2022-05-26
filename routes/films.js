const express = require("express");
const router = express.Router();
router
    .route("/")
    .get((req, res) => res.sendFile(process.cwd()+"/views/.ejs"))
    .post((req, res) => res.send("POST FILMS"));
module.exports = router;