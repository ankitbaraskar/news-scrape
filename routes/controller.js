const express = require("express");
const router = express.Router();

const db = require("../models");

const axios = require("axios");
const cheerio = require("cheerio");

router.get("/", function (req, res) {
    //Home page for web
    res.render("index");
});

router.get("/scrape", function (req, res) {
    
    axios.get("http://www.echojs.com/").then(function (response) {        
        var $ = cheerio.load(response.data);
        
        $("article").each(function (i, element) {            
            var result = {};
            
            result.title = $(this)
                .children("h2")
                .children("a")
                .text();
            result.summary = $(this)
                .children("p")
                .children("span.upvotes")
                .text() 
                + " up and " +
                $(this)
                .children("p")
                .children("span.downvotes")
                .text()
                + "down, posted by "+
                $(this)
                .children("p")
                .children("username")
                .children("a")
                .text()
                + $(this)
                .children("p")
                .children("username")
                .contents()
                .filter(function() {
                    return this.nodeType === 3;
                  })
                .text()
            result.link = $(this)
                .children("a")
                .attr("href");

            db.Article.create(result)
                .then(function (dbArticle) {
                    console.log(dbArticle);
                })
                .catch(function (err) {
                    console.log(err);
                });
        });

        // Send a message to the client
        res.send("Scrape Complete");
    });
});


module.exports = router;