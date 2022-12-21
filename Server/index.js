
const express = require('express');
const ConnectDB = require('./Config/ConnectDB');

const app = express();
app.use(express.json());

const somple=(req,res)=>[
    res.send("Working homepage")
]
app.get("/",somple);

let port = 8080 || process.env.PORT;
app.listen(port,async (req, res)=>{ 
    try {
        await ConnectDB();
       console.log(`server running on ${port} port`);
     }
     catch (err) {
       console.log("Error occured", err);
     }
})