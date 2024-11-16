const mongoose=require("mongoose");

const validator=require("validator");

const schema= new mongoose.Schema({

    firstName:{
        type:String,
       required:true,
        minlength:3,

    },
    lastName:{
        type:String,
        

    },
    emailId:{
        type:String,
        required:true,
        unique:true,
        lowercase:true,
        trim:true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("invalid email address");
            }

        }

    },
    password:{
        type:String,
        required:true,

    },
    age:{
        type:Number,

    },
    gender:{
        type:String,
        validate(value){
            if(!["male","female","others"].includes(value)){
                throw new error("gender not valid");
            }

        }

    },
    photoUrl:{
        type:String,
        default:"https://hancockogundiyapartners.com/wp-content/uploads/2019/07/dummy-profile-pic-300x300.jpg",
        validate(value){
            if(!validator.isURL(value)){
                throw new Error("invalid url");
            }
        }
    
      
    },
   about:{
        type:String,
        default:"this is the default value of a user",
    },
    skills:{
        type:String,
        type:[String],
    }

    
},{timestamps:true});

const User=mongoose.model("user",schema);

module.exports={User};