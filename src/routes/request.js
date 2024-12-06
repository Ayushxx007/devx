const express=require("express");
const requestRouter=express.Router();
const {userAuth}=require("../middleware/auth.js");
const ConnectionRequest = require("../models/connectionRequest.js");
const {User}=require("../models/user.js");


requestRouter.post("/request/send/:status/:toUserId",userAuth,async(req,res)=>{

    
try{
    const fromUserId=req.user._id;
    const toUserId=req.params.toUserId;
    const status=req.params.status;

    const allowedStatus=["interested","ignored"];

    if(!allowedStatus.includes(status)){                           // validation for status
       throw new Error("Invalid status");
    };


     // if fromUserId===toUserId then you cannot send connection request
     if(fromUserId.equals(toUserId)){
        throw new Error("You cannot send a request to yourself...");

    }

   

    //  if there is an existing connection request between these two users, then they cannot send another request to each other.
    const existingRequest=await ConnectionRequest.findOne({$or:[ {fromUserId,toUserId } ,{ fromUserId:toUserId,toUserId:fromUserId}]});
    if(existingRequest){
        throw new Error("You have already sent a request to this user.");

    };



    // if the toUserId is an existing userId in the database, then we can send the request

    const toUser=await User.findById(toUserId);
    if(!toUser){
      throw new Error("User not found");
}




    const connectionRequest=new ConnectionRequest({fromUserId,toUserId,status});

   const data= await connectionRequest.save();

   return res.json({
    message:req.user.firstName +" is " + status + " in "+ toUser.firstName,
    data,


   });


}catch(err){

    res.status(400).send(err.message);



}



});


requestRouter.post("/request/review/:status/:requestId",userAuth,async(req,res)=>{

  try{


    const loggedInUser=req.user;
    const {status,requestId}=req.params;
    const allowedStatus=["accepted","rejected"];

    if(!allowedStatus.includes(status)){     // Validate the status  

        throw new Error("Invalid status");

    }
    const connectionRequest= await ConnectionRequest.findOne({
        _id:requestId,
        toUserId:loggedInUser,
        status:"interested"

    });
    if(!connectionRequest){
        throw new Error("Connection request not found");
    }

    connectionRequest.status=status;

   const data = await connectionRequest.save();

   res.json({message:"connection request"+" "+status+" "+"successfully",data});



  }catch(err){

    res.status(400).send(err.message);


  }



})


module.exports=requestRouter;