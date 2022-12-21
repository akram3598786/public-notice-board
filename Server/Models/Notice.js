
const mongoose = require('mongoose');

const noticeSchema = new mongoose.Schema(
 {
   noticeText : {type : String},
   user : String
 },{
    versionKey: false,
    timestamps: true
}
);
const NoticeModel = mongoose.model("Notice",noticeSchema, "notices")
module.exports = NoticeModel;