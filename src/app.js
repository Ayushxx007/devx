const express=require("express");
const app=express();
const {connect}=require("./config/database.js");
const authRouter=require("./routes/auths.js");
const profileRouter=require("./routes/profile.js");
const requestRouter=require("./routes/request.js");
const cookieParser=require("cookie-parser");


app.use(express.json()) // MiddleWares
app.use(cookieParser());
app.use("/",authRouter);
app.use("/",profileRouter);
app.use("/",requestRouter);






connect()
.then(()=>{console.log("connected to cluster");

    app.listen(7777,()=>{console.log("listening");});  // listening after connecting to database

})  
.catch(()=>{console.log("error occured");});


























































