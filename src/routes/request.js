const express=require("express");
const requestRouter=express.Router();
const {userAuth}=require("../middleware/auth.js");





requestRouter.post("/sendConnectionRequest",userAuth,async(req,res)=>{
    res.send(req.user.firstName);
    // sending a connection request
    


});






module.exports=requestRouter;