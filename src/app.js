const express=require("express");

const app=express();

app.listen(3000);

app.get("/mahika",(req,res,next)=> { console.log("mahika");  next();  res.send("mahika"); },(req,res)=> res.send("mahika 2nd")); // next() is given by ExpressJS

app.post("/mahika",(req,res)=> res.send("mahika"));

app.get("/mahika/ganduka",(req,res)=> res.send("ganduka"));











// are changes being tracked






