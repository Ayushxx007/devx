const express=require("express");
const app=express();
const {connect}=require("./config/database.js");
const cookieParser=require("cookie-parser");

const authRouter=require("./routes/auths.js");               // Handling different routes
const profileRouter=require("./routes/profile.js");
const requestRouter=require("./routes/request.js");
const userRouter=require("./routes/user.js");


app.use(express.json()) // MiddleWares
app.use(cookieParser());  
app.use("/",authRouter);
app.use("/",profileRouter);
app.use("/",requestRouter);
app.use("/",userRouter);






connect()
.then(()=>{console.log("connected to cluster");

    app.listen(7777,()=>{console.log("listening");});  // listening after connecting to database

})  
.catch(()=>{console.log("error occured");});


































