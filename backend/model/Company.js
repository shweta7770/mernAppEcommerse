const mongoose = require("mongoose");
const companySchema = new mongoose.Schema({
     companyName: {
          type: String,
          require: true
     },
     location: {
          type: String,
          require: true
     },
     city: {
          type: String,
          require: true
     },
     foundedOn: {
          type: String,
          require: true
     },
   
});
let Company = mongoose.model('Company', companySchema);

module.exports = Company;