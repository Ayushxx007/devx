const express=require("express");
const authRouter=express.Router();
const {validateSignUpData}=require("../utils/validation.js");
const {User}=require("../models/user.js");
const bcrypt=require("bcrypt");


authRouter.post("/signup", async (req,res)=>{           // adding data of a user to database   // signup mein we dont need any token
    // express converted req as an object
    try{
    //validate the data
   validateSignUpData(req);



    // encrypt the password
    const {firstName,lastName,emailId,password}=req.body;
    const passwordHash= await bcrypt.hash(password,10);

   




const user=new User({firstName,lastName,emailId,password:passwordHash});  // creating a new instance of a User Model
await  user.save();  // returns a promise 
 res.send("user added successfully");
}
catch(err){
     res.status(400).send(err.message +" user not added successfully");
 }
});


authRouter.post("/login",async(req,res)=>{          //  we will generate jwt token in login

    try{
        const {emailId,password}=req.body;
        

        const user = await User.findOne({emailId:emailId});
        if(!user){
            throw new Error("email  not found");
        }

        const isPasswordValid= await user.validatePassword(password);

        if(isPasswordValid){
            const token= await user.getJWT();
           

            //create a jwt token

            // add the token to cookie and send the response to the user

            res.cookie("token",token,{expires:new Date(Date.now()+8*360000)});



            res.send("login successful");
        }else{
            throw new Error("incorrect password")

        }



    }catch(err){

        res.status(400).send(err.message);



    }

});


  


module.exports=authRouter;