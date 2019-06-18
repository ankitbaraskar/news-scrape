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
                + " down, posted by " +
                $(this)
                    .children("p")
                    .children("username")
                    .children("a")
                    .text()
                + $(this)
                    .children("p")
                    .contents()
                    .filter(function () {
                        return this.nodeType === 3;
                    })
                    .last()
            // .text()
            result.link = $(this)
                .children("h2")
                .children("a")
                .attr("href");

            db.Article.deleteMany({})
                .then(function () {
                    db.Article.create(result)
                        .then(function (dbArticle) {
                            // console.log(dbArticle);
                            console.log("sucessfully scraped and added to DB")
                            db.Article.find({})
                                .then(function (dbArticle) {
                                    // If we were able to successfully find Articles, send them back to the client
                                    res.json(dbArticle);
                                })
                                .catch(function (err) {
                                    // If an error occurred, send it to the client
                                    res.json(err);
                                });
                        })
                        .catch(function (err) {
                            console.log(err);
                        });
                });
        });

        // Send a message to the client
        // res.send("Scrape Complete");
    });
});


module.exports = router;