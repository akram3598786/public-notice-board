const express = require("express");
const UserModel = require("../Models/User.js");
const AuthRouter = express.Router();

AuthRouter.post("/login",Login);

async function Login(req, res){
    try{
       const userData = req.body;
       const userExist = await UserModel.find({username : userData.username});

       if(userExist.length==0){
        let created = await UserModel.create(userData);
       }
       let user = await UserModel.find({username : userData.username});
       res.status(201).send({message : `${user[0].username} logged in`,user});
    }
    catch(err){
        res.status(500).send(err.message);
    }
}

module.exports = AuthRouter;