
const jwt=require("jsonwebtoken");
const {User}=require("../models/user.js");


const userAuth=async (req,res,next)=>{

    // read the token from request cookies
    //validate the token 

   try{
    const cookies =req.cookies;
    const{token}=cookies;
    if(!token){
        throw new Error("token is not valid");}

    const decodedObj=await jwt.verify(token,"itsasecret");

    const{_id}=decodedObj;

    const user= await User.findById(_id);
    if(!user){
        throw new Error("user not found");
    }else{

        req.user=user;
        next();


    }






   }catch(err){
    res.status(400).send(err.message);




   }


// find the user


    


};

module.exports= {userAuth:userAuth};