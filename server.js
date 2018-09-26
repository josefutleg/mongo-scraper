//hw-10_mongo-scraper

var express = require("express");
var bodyParser = require("body-parser");
var mongojs = require("mongojs");
var cheerio = require("cheerio");
var request = require("request");

var app = express();
var $ = cheerio.load(html);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.static(__dirname + "/public"));

app.set("view engine", "ejs");

var homePageRoutes = require("./routes/home.js");

app.use("/", homePageRoutes);

var surveyPageRoutes = require("./routes/survey.js");

app.use("/survey", surveyPageRoutes);

app.listen(3001);
