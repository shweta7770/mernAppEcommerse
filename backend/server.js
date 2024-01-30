const express = require("express")
require('./db/config')
const Router=require('./router/user')
const app = express();
app.use(express.json());
app.use('/user',Router)

app.listen(4000 , ()=>{
    console.log("server is created !!!!!")
})