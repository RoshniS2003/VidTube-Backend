import mongoose from "mongoose";
import bcrypt from "bcrypt";  // Used for Password Hashing
import jwt from "jsonwebtoken";  // Used for Token :Login ke baad user ko identify karne ke liye

const userSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,  // Space Remove { "Rani" } :-->> {"Rani"}
            index: true
        },
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
        },
        fullName: {
            type: String,
            required: true,
            trim: true,
            index: true
        },
        avatar: {        // profile photo
            type: String,   // cloudinary url
            required: true
        },
        coverImage: {    // Banner photo
            type: String,   // cloudinary url
        },
        watchHistory: [
            {
                type: Schema.Types.ObjectId,
                ref: "Video"
            }
        ],
        password: {
            type: String,
            required: [true, 'Password is required']
        },
        refreshToken: {
            type: String
        }
    },
    {
        timestamps: true
    }
)

// Authentication :----->>> Need JWT

// pre("save")
// pre("save" , function () {})
// password ko encrypt karne ke liye usse bcrypt kiye .hash se

// Pre
userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();

    this.password = await bcrypt.hash(this.password, 10) //User password ko database mein hash karke save karta hai.
    next()
})

/* userSchema.pre("save", ...) :->> password ko database mein save karne se pehle bcrypt se hash karne 
 ke liye use hota hai.  */

/* if (!this.isModified("password")) return next() :-->> Check karo ki password new hai ya change hua hai.
Agar password change nahi hua, to dobara hash nahi karna. aur password modified hua hain toh password hash karo */

// this.password = bcrypt.hash(this.password, 10) :--->> Password ko bcrypt se hash karo.
// next() :--->> Ab middleware ka kaam complete hai, save process ko aage continue karo.
// 10 → hashing ke liye 2¹⁰ = 1024 computational rounds/work units
// 10 = computer ko password hash karte waqt kitna computational work karna hai.


// methods
userSchema.methods.isPasswordCorrect = async function (password) {
    // bcrypt.compare(password, this.password)
    // await bcrypt.compare(password, this.password)
    return await bcrypt.compare(password, this.password)
    // User ke login password ko database ke hashed password se check karta hai.
    //   // If we compare the password then its return in true or false value
}

// Create Access Token
userSchema.methods.generateAccessToken = function () {
    return jwt.sign(
        {
            _id: this._id,
            email: this.email,
            username: this.username,
            fullName: this.fullName
        },
        process.env.ACCESS_TOKEN_SECRET,  // secret key hai jisse JWT sign hota hai.
        // object
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY   // batata hai token kitne time tak valid rahega.
        }
    )
}
userSchema.methods.generateRefreshToken = function () {
    return jwt.sign(
        {
            _id: this._id
        },
        process.env.REFRESH_TOKEN_SECRET,
        // object
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY
        }
    );
};

// Access Token  → Short-term access
// Refresh Token → Naya access token lene ke liye

export const User = mongoose.model("User", userSchema)