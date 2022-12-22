
const express = require('express');
const ConnectDB = require('./Config/ConnectDB');
const cors = require("cors");
const AuthRouter = require('./Controllers/UserLogin');
const NoticeRouter = require('./Controllers/Notices');
require('dotenv').config();
const app = express();

app.use(express.json());
app.use(cors());
app.use("/auth", AuthRouter);
app.use("/notice",NoticeRouter);

// const somple=(req,res)=>{
//     res.send("Working fine")
// }
// app.get("/",somple);

let port = process.env.PORT || 8080;
app.listen(port,async (req, res)=>{ 
    try {
        await ConnectDB();
       console.log(`server running on ${port} port`);
     }
     catch (err) {
       console.log("Error occured", err);
     }
})