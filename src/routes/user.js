const express=require("express");
const userRouter=express.Router();
const {userAuth}=require("../middleware/auth.js");
const ConnectionRequest = require("../models/connectionRequest.js");

const USER_SAFE_DATA="firstName lastName photoUrl age gender about skills";


// get all the pending connection request for the loggedInUser
userRouter.get("/user/requests/recieved",userAuth,async(req,res)=>{

    try{

        const loggedInUser=req.user;

        const connectionRequest= await ConnectionRequest.find({
            toUserId:loggedInUser._id,
            status:"interested"

        }).populate("fromUserId",["firstName","lastName","photoUrl"]);



        res.json({data:connectionRequest});


    }catch(err){

        res.status(400).send(err.message);


    }


});


userRouter.get("/users/connections",userAuth,async(req,res)=>{

    try{

        const loggedInUser=req.user;

        const connectionRequest=await ConnectionRequest.find({

            $or:[
                {
                    toUserId:loggedInUser._id,
                    status:"accepted"

                },
                {
                    fromUserId:loggedInUser._id,
                    status:"accepted"
                }
            ]

        }).populate("fromUserId",USER_SAFE_DATA)
        .populate("toUserId",USER_SAFE_DATA);


        const data=connectionRequest.map((row) => {


            if(row.fromUserId._id.toString()===loggedInUser._id.toString()){

              return   row.toUserId;


            }

            return row.fromUserId;

            
        }
 
        
        );

        res.json({data});

    }catch(err){
        res.status(400).send(err.message);
    }

});


module.exports=userRouter;



