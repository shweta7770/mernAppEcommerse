const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
     firstName: {
          type: String,
          require: true
     },
     lastName: {
          type: String,
          require: true
     },
     emailId: {
          type: String,
          require: true
     },
     password:{
          type: String,
          require: true
     },
});
let User = mongoose.model('User', userSchema);

module.exports = User;