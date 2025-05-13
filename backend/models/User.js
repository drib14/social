const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: String,
    email: { type: String, unique: true },
    phone: { type: String, unique: true },
    password: String,
    emailCode: String,
    phoneCode: String,
    isVerified: { type: Boolean, default: false },
}, { timestamps: true });

module.exports = mongoose.model("User", userSchema);
