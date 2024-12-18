const express=require("express");
const profileRouter=express.Router();
const {userAuth}=require("../middleware/auth.js");
const {validateProfileData}=require("../utils/validation.js");


profileRouter.get("/profile/view",userAuth,async(req,res)=>{        //   userAuth middleware

    try{

        const user =req.user;
        res.send(user);
            
      
    }catch(err){

        res.status(400).send("something went wrong "+err.message);

   }
  

});


profileRouter.patch("/profile/edit",userAuth,async(req,res)=>{
 try{
        if(!validateProfileData(req)){
            throw new Error("Invalid Edit Request");
        }
        const loggedInUser=req.user;
       
        Object.keys(req.body).forEach((key)=>(loggedInUser[key]=req.body[key]));

        await loggedInUser.save();

res.send("profile updated successfully");
     }catch(err){

        res.status(400).send("something went wrong "+err.message);


    }

});





module.exports=profileRouter;