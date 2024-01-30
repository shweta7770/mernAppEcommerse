const mongoose = require("mongoose");

mongoose.connect('mongodb://127.0.0.1:27017/BiteEcommerse').then(()=>{
    console.log("database connected sucessfully");
}).catch((err)=>{
   console.log(err);
})

