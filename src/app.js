const express=require("express");

const app=express();



const {connect}=require("./config/database.js");

const {User}=require("./models/user.js");


app.post("/signup", async (req,res)=>{

    const data={
        firstName:"mahika",
        lastName:"jain",
        emailId:"jainmahika@gmail.com",
        password:"jainx123"
    }

    const user=new User(data);  // creating a new instance of a user Model
    try{ await  user.save();  // return a promise 
        res.send("user added successfully"); } catch{
            res.status(400).send("user not added successfully");
        }
  





});













connect()
.then(()=>{console.log("connected to cluster");})  // connected to database
.catch(()=>{console.log("error occured");});


app.listen(7777,()=>{console.log("listening");});  // listening after connecting to database






























