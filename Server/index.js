
const express = require('express');
const ConnectDB = require('./Config/ConnectDB');
const cors = require("cors");
const AuthRouter = require('./Controllers/UserLogin');
const NoteRouter = require('./Controllers/Notes');

const app = express();

app.use(express.json());
app.use(cors());
app.use("/auth", AuthRouter);
app.use("/note",NoteRouter);

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