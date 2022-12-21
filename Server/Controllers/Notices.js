const express = require("express");
const NoticeModel = require("../Models/Notice");
const UserModel = require("../Models/User");
const NoticeRouter = express.Router();

// To crate the notice
const createNote=async (req, res)=>{
    try{
       let notice = req.body;
       let user = await UserModel.findOne({username : notice.user});
       let CreatedNotice = await NoticeModel.create(notice);
        user.notices = [...user.notices, CreatedNotice._id];
         await user.save();
        res.status(201).send({ message: "Notice created", notice });
       
    }catch(err){
        res.status(500).send(err.message);
    }
}

// To get all exist notice
const getNotes=async(req, res)=>{
   try{
    const notice = await NoticeModel.find().sort({createdAt : -1});
    if(notice.length > 0) res.status(200).send(notice); 
    else res.status(404).send("No notice exist yet !");
   }catch(err){
    res.status(500).send(err.message);
   }
}

NoticeRouter.get("/all", getNotes);
NoticeRouter.post("/create", createNote);

module.exports = NoticeRouter;
