const express=require("express");
const app=express();
const {connect}=require("./config/database.js");

connect()
.then(()=>{console.log("connected to cluster");})  // connected to database
.catch(()=>{console.log("error occured");});

app.listen(7777,()=>{console.log("listening");});  // listening after connecting to database

const {User}=require("./models/user.js");

app.use(express.json()) // MiddleWare


app.post("/signup", async (req,res)=>{
           // express converted req as an object

   

    const user=new User(req.body);  // creating a new instance of a User Model
    try{ await  user.save();  // returns a promise 
        res.send("user added successfully");
     }
     catch{
            res.status(400).send("user not added successfully");
        }
});










































