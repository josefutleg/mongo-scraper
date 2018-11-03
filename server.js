//hw-10_mongo-scraper

var express = require("express");
var bodyParser = require("body-parser");
var mongojs = require("mongojs");
var cheerio = require("cheerio");
var request = require("request");

var app = express();
// var $ = cheerio.load(html);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.static(__dirname + "/public"));

app.set("view engine", "ejs");

var homePageRoutes = require("./routes/home.js");

app.use("/", homePageRoutes);

var savedPageRoutes = require("./routes/saved.js");

app.use("/saved", savedPageRoutes);

var databaseUrl = "scraper";
var collections = ["scrapedData"];
var savedCollection = ["savedData"];

// Hook mongojs configuration to the db variable
var db = mongojs(databaseUrl, collections);
db.on("error", function(error) {
  console.log("Database Error:", error);
});

app.get("/all", function(req, res) {
  db.scrapedData.find({}, function(error, found) {
    if (error) {
      console.log(error);
    } else {
      res.json(found);
    }
  });
});

app.get("/all-saved", function(req, res) {
  db.savedData.find({}, function(error, found) {
    if (error) {
      console.log(error);
    } else {
      res.json(found);
    }
  });
});

app.get("/scrape", function(req, res) {
  db.scrapedData.drop({}, function(err,deleted){
    if(err){
      console.log(err)
    } else {
      console.log(deleted);
    }
  });
  request("https://www.sfchronicle.com/", function(error, response, html) {
    var $ = cheerio.load(html);

    $("h2").each(function(i, element) {
      var title = $(element)
        .children("a")
        .text();
      var link = $(element)
        .children("a")
        .attr("href");

      if (title && link) {
        db.scrapedData.insert(
          {
            title: title,
            link: `https://www.sfchronicle.com/${link}`
          },
          function(err, inserted) {
            if (err) {
              console.log(err);
            } else {
              // console.log(inserted);
            }
          }
        );
      }
    });
  });
  res.redirect("/");
});

// save an article to savedData collection
app.get("/save/:id", function(req, res) {
  var saveTitle, saveLink;
  db.scrapedData.find(
    {
      _id: mongojs.ObjectID(req.params.id)
    },

    function(error, saved) {
      if (error) {
        console.log(error);
        res.send(error);
      } else {
        console.log(saved[0]);
        db.savedData.insert({
          _id: saved[0]._id,
          title: saved[0].title,
          link: saved[0].link
        });
        db.scrapedData.remove(saved[0]);
      }
    }
  );
  res.redirect("/");
});

app.get("/delete/:id", function(req, res) {
  db.savedData.remove(
    {
      _id: mongojs.ObjectID(req.params.id)
    },

    function(error, removed) {
      if (error) {
        console.log(error);
        res.send(error);
      } else {
        console.log(removed);
      }
    }
  );
  res.redirect("/saved");
});

app.get("/find/:id", function(req, res) {
  db.savedData.findOne(
    {
      _id: mongojs.ObjectId(req.params.id)
    },
    function(error, found) {
      if (error) {
        console.log(error);
        res.send(error);
      } else {
        res.send(found);
      }
    }
  );
});

app.post("/saved/take-in-post-info", function(req, res) {
  console.log(req.body);
  var id = req.body.savedId;
  var description = req.body.description;

  db.savedData.update(
    { _id: mongojs.ObjectId(id) },
    { $set : { "description" : `${description}` } },

    function(err, saved) {
      if (err) {
        console.log(err);
        res.send(err);
      } else {
        console.log("done!");
      }
    }
  );
  res.redirect("/saved");
});

app.listen(3000);
console.log("listening!");
