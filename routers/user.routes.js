import { getUserProfile, loginUser, logoutUser, registerUser, verifyEmail } from "../controllers/user.controller.js";
import express from "express";


const router = express.Router();



router.post("/register", registerUser);
router.get("/verify-email/:verificationcode", verifyEmail)
router.post("/login", loginUser)
router.post("/logout/:id", logoutUser)
router.get("/getProfile/:id", getUserProfile)


export default router; 