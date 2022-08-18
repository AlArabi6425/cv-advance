const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");
const mongoose = require('mongoose')
const app = express();
const port = process.env.PORT || 5000

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static("public"));

mongoose.connect("mongodb+srv://admin-arabi:3HEqybVLsSgNoV@cluster0.5yinvwk.mongodb.net/BlogDB", {
  useNewUrlParser: true
});

const blogSchema = new mongoose.Schema({
  title: String,
  content: String
});

const Blogg = new mongoose.model('Blogg', blogSchema)


app.get("/", function(req, res) {
  res.render("Home")
});

app.get("/blog", function(req, res) {
  Blogg.find({}, function(err, Bloggs){
        res.render("Blog", {posts: Bloggs});
      });
    });

app.get("/compose", function(req, res){
  res.render("compose");
});

app.post("/compose", function(req, res){
  const Bloggs = new Blogg({
    title: req.body.postTitle,
    content: req.body.postBody, function(err, user) {
    if (err) {
      console.log(err);
    } else {
      res.redirect("/");
    }
  }
});
Bloggs.save()
res.redirect("/");
});


app.listen(port, function() {
  console.log("Server started on port 5000");
});
