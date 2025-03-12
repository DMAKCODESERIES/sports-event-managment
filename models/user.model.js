import mongoose from "mongoose"

const userSchema = new mongoose.Schema({
    fullname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    location: {
        type: String,
        required: true
    },
    image: {type: String},
    bio: { type: String },
    sportPreferences: [String],
    ratings: [{ type: mongoose.Schema.Types.ObjectId, ref: "Rating" }],
    isPlatinumOrganizer: { type: Boolean, default: false },
    platinumMembershipExpiry: { type: Date },
    walletBalance: { type: Number, default: 0 },
    gender: {
        enum: ["male", "female"],
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    token: {
        type: String,
    },
    role: {
        type: String,
        default: "visitor",
        required: true,
        lowercase: true,
        trim: true,
        enum: ["visitor", "organizer", "player", "superadmin"]
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

const User = mongoose.model("User", userSchema)
export default User;