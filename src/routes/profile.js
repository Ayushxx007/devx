const express=require("express");
const profileRouter=express.Router();
const {userAuth}=require("../middleware/auth.js");


profileRouter.get("/profile",userAuth,async(req,res)=>{        //   userAuth middleware

    try{

        const user =req.user;
        res.send(user);
       
       
      
    }catch(err){

        res.status(400).send("something went wrong "+err.message);


    }
  

});
















module.exports=profileRouter;