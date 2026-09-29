// Cloudinary ek online service hai jahan hum apni images aur videos upload karke store karte hain.☁️
// Cloudinary = Images/Videos ko online store karne ki service.
// Image -> cloudinary -> online store -> Image ki URL
/* Cloudinary par image store hoti hai, aur hume us image ka URL milta hai, jise hum database mein 
 save karke baad mein image display kar sakte hain.   */


import { v2 as roshni } from "cloudinary"
import fs from "fs"  // file system: read, write, remove, update


// Configuration :--->>> Permission to upload files
cloudinary.config({
    CLOUDINARY_CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME,
    CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY,
    CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET
});


// // const uploadOnCloudinary = (this is a fuction name/parameter) => {}
const uploadOnCloudinary = async (localFilePath) => {
    try {
        if (!localFilePath) return null   // localFilePath = "public/temp/photo.jpg" 
        // (path hain agar path nhi hota toh function stop)

        // upload the file on Cloudinary
        // response: url , public_id , resource_type
        const response = await cloudinary.uploader.upload(localFilePath, {
            resource_type: "auto" // File kis type ki hai, automatically identify kar lo
        })

        // file has been uploaded successfully
        console.log("File is uploaded on Cloudinary", response.url);
        return response;   // user ko pura response return de diye wo apne needs ke according use karega
    
    } catch (error) {  // Agar Cloudinary upload mein error aa gaya:
          fs.unlinkSync(localFilePath)  // Agar upload fail hua, to temporary file ko rakhne ka fayda nahi.
          return null; // Upload successful nahi hua.
    }
}

export {uploadOnCloudinary}
/* uploadOnCloudinary() function local file ko Cloudinary par upload karta hai, Cloudinary ka response 
 return karta hai, aur upload fail hone par local temporary file delete karta hai.  */






