const { response } = require("express");
const IncidentType = require("../models/IncidentType");

exports.listType = async(req, res, next)=>{
    try{
      let types = await IncidentType.find({});
       req.types=types;
      next();
    }catch(e){
      console.log(e)
      res.status(404).send({message: "No type to display" });
    }
};

