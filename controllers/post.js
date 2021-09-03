const Post = require("../models/Post");
math = require("mathjs");
const IncidentType = require("../models/IncidentType");

//select from Post for different contexts

exports.listPost = async (req, res) => {
  const message= req.params.message;
  const perPage=5;
  const page = 1 || 1;
   try {
    const posts = await Post.find({"Message":{$ne:null}}).sort({Date:-1}).skip((perPage*page)-perPage).limit(perPage);
      if(posts){
      // console.log(count)
      res.render("index", {
      message: message,
      posts: posts,
    });
    }else{
      res.status(404).send({message: console.log(e)});  
    }
  } catch (e) {
    res.status(404).send({message: console.log(e)});
  }
};

exports.listPostByUser = async (req, res) => {
  try {
    let posts = await Post.find({UserID: global.user._id});
    res.render("my-account", { posts: posts });
  } catch (e) {
    res.status(404).send({
      message: console.log(e)
    });
  }
}

exports.listPostByType = async (req, res) => {
    try {
      let posts = await Post.find({Incident_Type: req.body.Incident_Type});
      res.render("/", { posts: posts });
    } catch (e) {
      res.status(404).send({
        message: console.log(e)
      });
    }
  }

exports.listTotalByType = async (req, res) => {
    try {
    let postsByType = await Post.aggregate([
      {
        $match: {"CrimeType":{$ne:null}}
      },
      {
       $group : {
        _id: '$CrimeType',
        count : {$sum : 1}}
      }
      ]).limit(10)
      // console.log(postsByType)
      res.json(postsByType)
    } catch (e) {
      res.status(404).send({
        message: console.log(e)
      });
    }
  }

exports.listTotalByMonth = async (req, res) =>{
  try {
    let postsByMonth = await Post.aggregate([
      {
       $group : {
        _id: {"$month": "$Date"},
        count : {$sum : 1}}
      }
      ])
      // console.log(postsByMonth)
      res.json(postsByMonth)
    } catch (e) {
      res.status(404).send({
        message: console.log(e)
      });
    }
  }

  exports.listTotalByBorough = async (req, res) => {
    try {
    let postsByBorough = await Post.aggregate([
      {
        $match: {"City": "London"}
      },
      {
       $group : {
        _id: '$Borough',
        count : {$sum : 1}}
      }
      ])
      // console.log(postsByType)
      res.json(postsByBorough)
    } catch (e) {
      res.status(404).send({
        message: console.log(e)
      });
    }
  }

  exports.listTotalByCity = async (req, res) => {
    try {
    let postsByCity = await Post.aggregate([
      {
        $match: {"City":{$ne:null}}
      },
      {
       $group : {
        _id: '$City',
        count : {$sum : 1}}
      }
      ])
      // console.log(postsByType)
      res.json(postsByCity)
    } catch (e) {
      res.status(404).send({
        message: console.log(e)
      });
    }
  }

  exports.listAllPosts = async (req, res) => {
    const currentPage = parseInt(req.query.page) || 1;
    const perPage = parseInt(req.query.noPerPage) || 5;
    const count = await Post.find({}).count();
    const pagesNo = Math.ceil(count/perPage);
    try {
      let posts = await Post.find({"Message":{$ne:null}}).sort({Date:-1}).skip((perPage*currentPage)-perPage).limit(perPage);
      res.render("news", {
        posts: posts,
        pagesNo: pagesNo,
        currentPage: currentPage,
        perPage: perPage,
    }) 
  }catch (e) {
      res.status(404).send({
        message: console.log(e)
      });
    }
  }

  exports.listPostByBorough = async (req, res) => {
    const currentPage = parseInt(req.query.page) || 1;
    const perPage = parseInt(req.query.noPerPage) || 5;
    const count = await Post.find({}).count();
    const pagesNo = Math.ceil(count/perPage);
    const search = req.body.searchBorough;
    try {
      // console.log(search)
      if(!search){
        let posts = await Post.find({"Message":{$ne:null}}).sort({Date:-1}).skip((perPage*currentPage)-perPage).limit(perPage);
        res.render("news", {
          posts: posts,
          pagesNo: pagesNo,
          currentPage: currentPage,
          perPage: perPage,
        });
    }else{
      let posts = await Post.find({Borough: search}).sort({Date:-1}).skip((perPage*currentPage)-perPage).limit(perPage);
      res.render("news", {
        posts: posts,
        pagesNo: pagesNo,
        currentPage: currentPage,
        perPage: perPage,
      });
      }
    } catch (e) {
      res.status(404).send({
        message: console.log(e)
      });
    }
  }

exports.listPostById = async(req, res)=>{
  const id = req.params.id; 
  try{
    const post= await Post.findOne({_id: id});
    res.render("news-id", {post: post});   
  }catch(e){
    res.status(404).send({
      message: console.log(e)
    });
  }
}

// update Posts
// from news:id
exports.updatePost = async(req, res, next) =>{
  const id = req.params.id;
  const comment = req.body.comment;
  const date = Date();                                           
  try {
    if(user){
    // console.log(id)
    // console.log(comment)
    const post = await Post.updateOne({ _id: id },
      {
        $push:{
          Comments: {
          Comment: comment,
          Date: date,
        }
      }
      });    
      res.redirect("/")
    }else
    {
      res.redirect("/login-user/?message=Please login to post a comment")
    }
  } catch (e) {                                                     
    res.status(404).send({
      message: `could not find post ${id}.`,                          
    });
  }
};

//from news
exports.updatePosts = async(req, res, next) =>{
  const id = req.body.id;
  const comment = req.body.comment;
  const date = Date();                                           
  try {
    if(user){
    console.log(id)
    console.log(comment)
    const post = await Post.updateOne({ _id: id },
      {
        $push:{
          Comments: {
          Comment: comment,
          Date: date,
        }
      }
      });    
      res.redirect("/")
  }else{
    res.redirect("/login-user/?message=Please login to post a comment")
  } 
}catch (e) {                                                     
    res.status(404).send({
      message: `could not find post ${id}.`,                          
    });
  }
};

// create new Post

exports.addPost = async (req, res, next) =>{
  const errors = req.errros;
  try{
  let newPost = new Post({user: "Anonymous",
  UserID: global.user._id,
  City: req.body.city,
  Borough: req.body.borough,
  PostCode: req.body.postCode,
  CrimeType: req.body.IncidentType,
  Message: req.body.message,
  Date: Date()});
  if(!req.body.city){
      res.render("create-post", { errors: {city: {message: "City is required"}}, types: req.types})
      // res.send("City is required")
      return
    }else if(!req.body.borough){
      res.render("create-post", { errors: {borough: {message: "Borough is required"}}, types: req.types})
      return
    }else if(!req.body.IncidentType){
          res.render("create-post", { errors: {type: {message: "Please select an incident type"}}, types: req.types})
          return
    }else if(!req.body.message){
          res.render("create-post", { errors: {message: {message: "Tell your story"}}, types: req.types})
          return
  }else{
     await newPost.save();
     res.redirect("/");
}
} catch(e){
res.status(404).send({message: console.log(e)});
}
};