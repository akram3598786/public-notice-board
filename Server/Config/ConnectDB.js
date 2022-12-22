const mongoose = require("mongoose");
mongoose.set('strictQuery', true)

async function ConnectDB(req, res){
  //  let url =  "mongodb://127.0.0.1:27017/notice-board-app";

   let url =  process.env.MONGODB_URI;

  return new Promise((resolve, reject)=>{
    mongoose.connect(url).
    then(()=>{
        console.log("Connected to Database");
        resolve();
    }).catch((err)=>{
        console.log("Cannot connect to Database");
        reject(err);
    })
  })
}
 
module.exports =  ConnectDB;