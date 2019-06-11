const axios = require("axios");
const cheerio = require("cheerio");

const db = require("../models");

module.exports = function (app) {
    app.get("/scrape", function (req, res) {
        axios.get("http://dev.to").then(function (response) {

            const $ = cheerio.load(response.data);
            const results = [];

            $("div.single-article").each(function(i, element) {

                const title = $(element).find("h3").text();
                const link = "http://dev.to" + $(element).children("a.index-article-link").attr("href");

                console.log(title, link)

                // results.push({
                //     title: title,
                //     link: link,
                //})
            })
            console.log(results);
        }).then(function () {
            res.send("scrape complete");
        }).catch(function (err) {
            console.log(err);
        })
    })
}