const express=require("express");

const app=express();

app.listen(3000);

app.get("/:user",(req,res)=>{
    const params=req.params;
    const query=req.query;
    res.json({params:params,
        query:query}
    );});

  
   






// are changes being tracked






