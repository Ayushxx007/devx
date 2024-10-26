const express=require("express");
const app=express();
const {connect}=require("./config/database.js");

connect()
.then(()=>{console.log("connected to cluster");})  // connected to database
.catch(()=>{console.log("error occured");});

app.listen(7777,()=>{console.log("listening");});  // listening after connecting to database

const {User}=require("./models/user.js");

app.use(express.json()) // MiddleWare


app.post("/signup", async (req,res)=>{             // adding data of a user to database
           // express converted req as an object

   

    const user=new User(req.body);  // creating a new instance of a User Model
    try{ await  user.save();  // returns a promise 
        res.send("user added successfully");
     }
     catch{
            res.status(400).send("user not added successfully");
        }
});

app.get("/user", async(req,res)=>{     // get al perticular user from database by emailId

    const email= req.body.emailId;

    try{
        const user=  await User.find({emailId:email});
        if(user.length===0){
            res.status(404).send("user not found");

        }else{

            res.send(user);

        }
  

    }catch(err){

        res.status(400).send("something went wrong");

    
    }

 

});             

app.get("/feed", async(req,res)=>{     // Feed api-- get all the users from database

    try{
        const user=  await User.find({});
        res.send(user);

    }catch(err){

        res.status(400).send("something went wrong");


    }


});    

app.delete("/user",async(req,res)=>{           // Deleting user from database

const userId=req.body.userId;
    

try{
    const user=await User.findByIdAndDelete({_id:userId});

    res.send("deleted successfully");

}catch(err){

res.status(400).send("something went wrong");

    }
});

app.patch("/user",async(req,res)=>{       // updating data  in database

    const data=req.body;
    const userId=req.body.userId;

 try{
        await User.findByIdAndUpdate({_id:userId},data);
        res.send("updated successfully");

 }catch(err){
        res.status(400).send("something went wrong");
 }

});











































