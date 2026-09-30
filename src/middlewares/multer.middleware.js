// We create middleware with the help of multer
import multer from "multer"

const storage = multer.diskStorage({
    destination: function (req, file, cb) {  // file: multer ke pass hota hain
        cb(null, "./public/temp")
    },
    filename: function (req, file, cb) {

        cb(null, file.originalname)
    }
})

export const upload = multer({
    storage,
})

/* 
Multer = User se image/video/file lene ke liye.
Cloudinary = Us image/video ko online store karne ke liye. 

User ne: profile.jpg upload ki. Multer us uploaded file ko receive karke backend ko deta hai.
 server par temporary save karta hai:
👉 Tumhara backend code Cloudinary ko image bhejta hai.

Multer       → file receive/save करता है
Backend code → Cloudinary को file भेजता है
Cloudinary   → file store करता है

Multer file ko backend tak laata hai, aur backend ka cloudinary.uploader.upload() 
us file ko Cloudinary par upload karta hai.
*/