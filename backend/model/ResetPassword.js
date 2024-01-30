const mongoose = require("mongoose");

const resetPasswordSchema= new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    resetToken: String,
    // resetTokenExpiration: Date
});
let ResetPassword = mongoose.model('ResetPassword', resetPasswordSchema);

module.exports = ResetPassword;