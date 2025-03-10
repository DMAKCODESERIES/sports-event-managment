import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import userroutes from "./routers/user.routes.js"
import adminroutes from "./routers/admin.routes.js"


dotenv.config();
const app=express()



app.use(express.json())
app.use(cors()) 
app.use(cookieParser())



app.use("/user",userroutes)
app.use("/admin",adminroutes)
export default app