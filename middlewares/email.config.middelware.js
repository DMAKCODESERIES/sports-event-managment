import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();


export const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.USER_AUTH_EMAIL,
    pass: process.env.USER_AUTH_PASS,
  },
  pool: true,
  maxConnections: 5
});
