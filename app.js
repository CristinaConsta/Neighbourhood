require("dotenv").config();
const expressSession = require("express-session");
const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const app = express();
const User = require("./models/User");
const IncidentType = require("./models/IncidentType");

bodyParser = require("body-parser");
app.set("view engine", "ejs");
// app.use(express.static(path.join(__dirname, "public")));
app.use(express.static(__dirname));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
const { PORT, MONGODB_URI } = process.env;
mongoose.connect(MONGODB_URI, { useNewUrlParser: true },  {autoIndex: false});
mongoose.connection.on("error", (err) => {
  console.error(err);
  console.log(
    "MongoDB connection error. Please make sure MongoDB is running.",
  );
  process.exit();
});

//cookie for userSession

app.use(expressSession({ secret: 'foo barr', cookie: { expires: new Date(253402300000000) } }))
global.user = false;
app.use("*", async (req, res, next) => {
  if (req.session.userID && !global.user) {
    const user = await User.findById(req.session.userID);
    // console.log(user);
    global.user = user;
  }
  next();
})

//functions

const isLoggedIn = async (req, res, next) => {
  // const msg = "You must login to post a message";
  const user = await User.findById(req.session.userID);
  if (!user) {
    // res.render("index", { posts: posts, message: message});
    res.redirect("/login-user/?message=Please login to post your story")
    return
  }
  next();
}

function renderData(req, res) {
  res.render("create-post", {types: req.types, errors: {}});
}

function renderIndex(req, res) {
  res.render("index", { errors: {}, message: req.params.message});
}

function renderStatistics(req, res) {
  res.render("statistics", { errors: {}, message: req.params.message});
}

//import controllers

const userController = require("./controllers/user")
const postController = require("./controllers/post")
const typeController = require("./controllers/incidentType")

//routes

app.get("/", postController.listPost, renderIndex);

app.get("/header", (req, res) => {
  res.render("header", { errors: {} });
});

app.get("/my-account", postController.listPostByUser);
app.get("/my-account/delete", userController.delete);

app.get("/news", postController.listAllPosts);
app.all("/news/Borough", postController.listPostByBorough);
app.get("/news/:id", postController.updatePost);
app.post("/news", postController.updatePosts);

app.get("/news-id/:id", postController.listPostById);
app.post("/news-id/:id", postController.updatePost);

app.get("/json1", postController.listTotalByType);
app.get("/json2", postController.listTotalByMonth);
app.get("/json3", postController.listTotalByBorough);
app.get("/json4", postController.listTotalByCity);
app.get("/statistics", renderStatistics);

app.get("/create-user", (req, res) =>{
  res.render("create-user", {errors: {}});
});
app.post("/create-user", userController.registerUser);

app.get("/login-user", (req, res) =>{
  res.render("login-user", {errors: {}});
});
app.post("/login-user", userController.login);

app.get("/logout", async (req, res) => {
  req.session.destroy();
  global.user = false;
  res.redirect('/');
})

app.get("/create-post", typeController.listType, isLoggedIn, renderData);
app.post("/create-post", typeController.listType, postController.addPost);


app.listen(PORT, () => {
  console.log(`Example app listening at http://localhost:${PORT}`);
});
