import jwt from "jsonwebtoken";
import User from "../models/user.model.js"
export default async function VerifyAdmin(req, res, next) {

    try {
        const token = req.header("Authorization");

        if (!token) {
            return res.status(401).json({ message: "Access Denied: No Token Provided" });
        }

       
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        
        const user = await User.findById(decoded.id);

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

     
        if (user.role !== "admin") {
            return res.status(403).json({ message: "Access Denied: Admins Only" });
        }

        // Pass user details to the next middleware
        req.user = user;
        next();
  
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Internal Server Error' });
        
    }
}