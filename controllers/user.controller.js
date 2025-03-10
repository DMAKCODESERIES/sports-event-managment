import User from "../models/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { sendemailverification } from "../middlewares/Email.js";
dotenv.config();

export const registerUser = async (req, res) => {
    const { fullname, email, location, gender, age, password } = req.body;

    try {
      
        const user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ message: "User already exists" });
        }


        const adminEmail = process.env.ADMIN_EMAIL;
        const adminPassword = process.env.ADMIN_PASSWORD;

        if (email === adminEmail && password === adminPassword) {
            console.log(adminEmail)

            const hashedAdminPassword = await bcrypt.hash(adminPassword, 10);

            const admin = new User({
                email: adminEmail,
                password: hashedAdminPassword,
                location: "chandni chowk",
                fullname: "Admin",
                gender: "male",
                age: 22,
                role: "admin",
                isVerified: true
            });

            await admin.save();
            return res.status(201).json({ message: "Admin user registered successfully", user: admin });

        }


        const hashedPassword = await bcrypt.hash(password, 10);
        const verificationcode = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: "1d" });

        console.log("verificationcode:", verificationcode);
        const newUser = new User({
            fullname,
            email,
            location,
            gender,
            age,
            password: hashedPassword
        });

        await newUser.save();
        res.status(201).json({ message: "User registered successfully", user: newUser });
        await sendemailverification(email, verificationcode)
        res.json({ msg: "User registered successfully", user: newUser })

    } catch (error) {
        console.error("Error while registering user:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};


export const verifyEmail = async (req, res) => {
    const { verificationcode } = req.params;

    try {
        const decoded = jwt.verify(verificationcode, process.env.JWT_SECRET);
        const user = await User.findOne({ email: decoded.email });

        if (!user) {
            return res.status(400).json({ msg: "Invalid verification link" });
        }

        user.isVerified = true;
        user.verificationcode = null; 
        await user.save();

        res.json({ msg: "Email verified successfully. You can now log in." });

    } catch (error) {
        console.error(" Verification error:", error);
        res.status(400).json({ msg: "Invalid or expired verification link" });
    }
};


export const loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user= await User.findOne({email:email});
        if(!user){
            return res.status(400).json({message:"User does not exist"});
        }
        if(!user.isVerified){
            return res.status(400).json({message:"Email not verified"});
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch){
            return res.status(400).json({message:"Invalid credentials"});
        }
        const token = jwt.sign(
            { id: user._id, email: user.email, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: "1d" }
        );
        await User.findByIdAndUpdate(user._id, {token}, {new:true});
        res.json({message:"User logged in successfully", token});
    } catch (error) {
        console.error("Error while logging in user:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}


export const logoutUser = async (req, res) => {
    const { id } = req.params;
    try {
         const user = await User.findById(id);
                if (!user) {
                    return res.status(404).json({ msg: "User not found" });
                }
        await User.findByIdAndUpdate(id, {token:null}, {new:true});
        res.json({message:"User logged out successfully"});}
         catch (error) 
         {
        console.error("Error while logging out user:", error);
}} 

export const getUserProfile = async (req, res) => {
    const { id } = req.params;
    console.log(id)
    try {
        const user = await User.findById(id).select
            ('-password');
        res.json(user);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }}

    