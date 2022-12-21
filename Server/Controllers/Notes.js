const express = require("express");
const NoteModel = require("../Models/Note");
const UserModel = require("../Models/User");
const NoteRouter = express.Router();

// To crate the note
const createNote=async (req, res)=>{
    try{
       let note = req.body;
       let user = await UserModel.findOne({username : note.user});
       let CreatedNote = await NoteModel.create(note);
       console.log(user);
        user.notes = [...user.notes, CreatedNote._id];
         await user.save();
        res.status(201).send({ message: "Note created", note });
       
    }catch(err){
        res.status(500).send(err.message);
    }
}

// To get all exist note
const getNotes=async(req, res)=>{
   try{
    const notes = await NoteModel.find();
    if(notes.length > 0) res.status(200).send(notes); 
    else res.status(404).send("No note exist yet !");
   }catch(err){
    res.status(500).send(err.message);
   }
}

NoteRouter.get("/all", getNotes);
NoteRouter.post("/create", createNote);

module.exports = NoteRouter;
