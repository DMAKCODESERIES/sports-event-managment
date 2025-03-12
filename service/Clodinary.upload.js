import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';
import dotenv from 'dotenv';
dotenv.config();

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

 

const CloudinaryUpload =async(LocalFilePath)=>{
    try {
       
       
        if (!fs.existsSync(LocalFilePath)) {
            console.log("File not found")
            return null;
        }
        const response=await cloudinary.uploader.upload(LocalFilePath , {
            resource_type:"image",
        });
        console.log(response);
        return response;
    } catch (error) {
         fs.unlinkSync(LocalFilePath);
        console.log(error);
        return null
    }
}

export  {CloudinaryUpload};