//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");
const mongoose = require("mongoose");

const homeStartingContent = "Travelling is an amazing way to learn a lot of things in life. A lot of people around the world travel every year to many places. Moreover, it is important to travel to humans. Some travel to learn more while some travel to take a break from their life. No matter the reason, travelling opens a big door for us to explore the world beyond our imagination and indulge in many things. All in all, it is no less than a blessing to be able to travel. Many people are not privileged enough to do that. Those who do get the chance, it brings excitement in their lives and teaches them new things. No matter how a travelling experience may go, whether good or bad, it will definitely help you learn.";
const aboutContent = "";
const contactContent = "";
const app = express();
mongoose.connect("mongodb+srv://subhanshukumar631:subhanshu123@cluster0.o6pn2iq.mongodb.net/tests", { useNewUrlParser: true });
const postSchema = new mongoose.Schema({
  title: String,
  author: String,
  post: String,
 
});
const Post = mongoose.model("Post", postSchema);

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", function (req, res) {
  Post.find(function (err, result) {
    if (err) {
      console.log(err);
    }
    else {

      res.render("home", { homeStartingContent: homeStartingContent, post: result });
    }
  })


});
app.get("/about", function (req, res) {
  res.render("about", { about: aboutContent });
});
app.get("/contact", function (req, res) {
  res.render("contact", { contact: contactContent });
});
app.get("/compose", function (req, res) {
  res.render("compose",);
});
app.post("/compose", function (req, res) {
  let compose = {
    title: "long",
    post: "long"
  }

  compose.title = req.body.title;
  compose.post = req.body.compose;
  const newpost = new Post({
    title: compose.title,
    post: compose.post,
    author: req.body.author
  });
  newpost.save();


  res.redirect("/");

});
app.get("/posts/:postId", function (req, res) {
  const request = (req.params.postId);
  
  Post.findOne({ _id: request }, function (err, result) {
    if (err) {
      console.log(err);
    }
    else {
      
      res.render("post", { title: result.title, content: result.post, author: result.author});

    }
  });

});


app.listen(process.env.PORT||3000, function () {
  console.log("Server started on port 3000");
});
