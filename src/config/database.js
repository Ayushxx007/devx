const mongoose = require('mongoose');


const connect=async function mongoosex(){
    await mongoose.connect("mongodb+srv://ayushkumawat77889:B8xFdwJTzOlwh3iY@ayush.kq1ew.mongodb.net/devtinder"); // connecting to cluster  // returns a promise;


 }

 module.exports={connect};

