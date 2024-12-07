const express=require("express");
const userRouter=express.Router();
const {userAuth}=require("../middleware/auth.js");
const ConnectionRequest = require("../models/connectionRequest.js");
const {User}=require("../models/user.js")

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


userRouter.get("/user/connections",userAuth,async(req,res)=>{

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


userRouter.get("/feed",userAuth,async(req,res)=>{


    try{
        let page= parseInt(req.query.page) || 1;
        let limit= parseInt(req.query.limit) || 10;
        let skip=(page-1)*limit;
        if (limit > 50) {
            limit = 50;
        } else {
            limit = limit;
        }
        
        




        // should not see his own card
        //  should not see cards of users he has blocked
        //  should not see cards of users who have blocked him
        // should not see cards of his connections
        // sohuld not see the card of ignored peoples
        // should not see the card of user who i already sent connection request to

        const loggedInUser=req.user;

        // find all connection request that i have sent or recieved

        const connectionRequest= await ConnectionRequest.find({

            $or:[{fromUserId:loggedInUser._id},{ toUserId:loggedInUser._id}]

        }).select("fromUserId toUserId");

        const hideUsersFromFeed=new Set();
        connectionRequest.forEach(req=>{ 
            hideUsersFromFeed.add(req.fromUserId.toString());
            hideUsersFromFeed.add(req.toUserId.toString());

        });

        const users=await User.find({
          $and:[
            {_id:{$nin:Array.from(hideUsersFromFeed)}},
            { _id: {$ne:loggedInUser} }
        ] 

        }).select(USER_SAFE_DATA).skip(skip).limit(limit);

        res.send(users);

    }catch(err){

        res.status(400).send(err.message);

    }

});


module.exports=userRouter;



