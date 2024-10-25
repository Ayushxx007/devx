const express=require("express");

const app=express();

app.listen(3000);

app.get("testcase2/:username",(req,res)=>res.send("testcase2"));

app.use("/testcase1",(req,res)=> res.send("testcase1"));

app.use("/",(req,res)=> res.send("mahika"));





