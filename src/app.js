const express=require("express");
const app=express();
const {connect}=require("./config/database.js");
const {validateSignUpData}=require("./utils/validation.js");
const bcrypt=require("bcrypt");
const cookieParser=require("cookie-parser");
const jwt=require("jsonwebtoken");
const {userAuth}=require("./middleware/auth.js");
connect()
.then(()=>{console.log("connected to cluster");})  // connected to database
.catch(()=>{console.log("error occured");});

app.listen(7777,()=>{console.log("listening");});  // listening after connecting to database

const {User}=require("./models/user.js");

app.use(express.json()) // MiddleWare
app.use(cookieParser());


app.post("/signup", async (req,res)=>{           // adding data of a user to database   // signup mein we dont need any token
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
            res.status(400).send(err+"user not added successfully");
        }
});

app.post("/login",async(req,res)=>{          //  we will generate jwt token in login

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
  

app.get("/profile",userAuth,async(req,res)=>{        //   userAuth middleware

    try{

        const user =req.user;
        res.send(user);
       
       
      
    }catch(err){

        res.status(400).send("something went wrong "+err.message);


    }
  

});


app.post("/sendConnectionRequest",userAuth,async(req,res)=>{
    res.send(req.user.firstName);
    // sending a connection request
    


});










































