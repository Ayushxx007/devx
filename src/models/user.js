const mongoose=require("mongoose");

const schema= new mongoose.Schema({

    firstName:{
        type:String,
    },
    lastName:{
        type:String,
    },
    emailId:{
        type:String,
    },
    password:{
        type:String,
    },
    age:{
        type:Number,
    },
    gender:{
        type:String,
    },
    
});

const User=mongoose.model("user",schema);

module.exports={User};