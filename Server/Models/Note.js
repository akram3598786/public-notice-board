
const mongoose = require('mongoose');

const noteSchema = new mongoose.Schema(
 {
   noteText : {type : String},
   user : String
 },{
    versionKey: false,
    timestamps: true
}
);
const NoteModel = mongoose.model("Note",noteSchema, "notes")
module.exports = NoteModel;