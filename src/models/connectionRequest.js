const mongoose=require("mongoose");
const {User}=require("./user.js")
const connectionRequestSchema =new mongoose.Schema({      // Schema of new collection

    fromUserId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"user"    // refrence to the User collection
    },
    toUserId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"user" 
    },

    status:{
        type:String,
        required:true,
        enum:{

            values:["interested","accepted","rejected","ignored"],
            message:`{value} is not supported`
        
        
        },
    }


},{timestamps:true});

connectionRequestSchema.index({fromUserId:1,toUserId:1});



connectionRequestSchema.pre("save", function(next){

    const connectionRequest=this;// check if from and to userId are same


    if(connectionRequest.fromUserId.equals(connectionRequest.toUserId)){


        throw new Error("cannot send req to yourself");
    }

    next();
});

   
   


const ConnectionRequestModel= new mongoose.model("ConnectionRequest",connectionRequestSchema);      


module.exports=ConnectionRequestModel;