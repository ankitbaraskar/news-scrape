const express = require("express");
const router = express.Router();

const db = require("../models");

const axios = require("axios");
const cheerio = require("cheerio");

router.get("/", function (req, res) {
    //Home page for web
    res.render("index");
});



module.exports = router;