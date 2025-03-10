import mongoose from "mongoose"

const userSchema = new mongoose.Schema({
    fullname: {
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    location:{
        type: String,
        required: true
    },
    gender:{
        enum:["male","female"],
        type: String,
        required: true
    },
    age:{
        type: Number,
        required: true
    },
    password:{
        type: String,
        required: true
    },
    token: {
        type: String,
    },
    role: {
        type: String,
        default: "user",
        required: true,
        lowercase: true,
        trim: true,
        enum: ["user", "admin"]
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    date: {
        type: Date,
        default: Date.now
    }

})

const User = mongoose.model("User" , userSchema)
export default User;