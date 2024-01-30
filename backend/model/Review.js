const mongoose = require("mongoose");
const reviewSchema = new mongoose.Schema({
     userId: {
          type: String,
          require: true
     },
     companyId: {
          type: String,
          require: true
     },
     subject: {
          type: String,
          require: true
     },
     desc: {
          type: String,
          require: true
     },
     review: {
          type: Number,
          require: true
     }
   
});
let Review = mongoose.model('Review', reviewSchema);

module.exports = Review;