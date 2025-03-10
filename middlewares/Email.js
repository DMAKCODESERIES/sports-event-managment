
import { transporter } from "./email.config.middelware.js";
import dotenv from 'dotenv';
dotenv.config();


export const sendemailverification = async (email, verificationcode) => {

    try {
        const response = await transporter.sendMail({
            from: `"sport-managment" <${process.env.USER_SENDER_EMAIL}>`, 
            to: email, 
            subject: "Verify Your Email to Use  App",
            text: "Verify your email",
            html: `
                <h2>Email Verification</h2>
                <p>Please click the link below to verify your email:</p>
               <a href="http://localhost:5000/user/verify-email/${verificationcode}">
                    <button style="background-color: blue; color: white; padding: 10px 15px; border: none; cursor: pointer;">
                        Verify Email
                    </button>
                </a>
                <p>If you didn't request this, please ignore this email.</p>
            `
        });

        console.log("Email sent successfully:", response);
    } catch (error) {
        console.error("Error sending email:", error);
    }
};
