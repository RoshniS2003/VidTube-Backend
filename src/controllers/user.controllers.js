// controller = Kya kaam karna hai
import { asyncHandler } from "../utils/asyncHandler.js";  // 1
import { ApiError } from "../utils/ApiError.js"  // 6
import { User } from "../models/user.model.js"   // 8
import { uploadOnCloudinary } from "../utils/cloudinary.js"   // 10

// User register karne ka actual logic yahan hoga.
const registerUser = asyncHandler(async (req, res) => {  // 2
    // res.status(200).json({
    //     message: "Learn Backends"
    // })

    /*
    get user details from frontend
    valiadtion  --> user details not empty
    check if users already exits: username, email
    check for images , check for avatar
    upload them to cloudinary , avatar :---> return image url
    create user object - create entry in db
    remove password and refresh token field from response
    check for user creation
    return res
    */

    const { fullName, username, email, password } = req.body    // 4
    console.log("email:", email);    // 5

    if (   // 7
        [fullName, username, email, password].some((field) =>   //map(some)
            field?.trim() === "")    // field is given or not(field?)
    ) {
        throw new ApiError(400, "All fields are required")
    }

    const existedUser = User.findOne({     // 9
        $or: [{ username }, { email }]
    })

    if (existedUser) {
        throw new ApiError(409, "User with email and username already exists")
    }

    const avatarLocalPath = req.files?.avatar[0]?.path;
    const coverImageLocalPath = req.files?.coverImage[0]?.path;

    if (!avatarLocalPath) {
        throw new ApiError(400, "Avatar file is required")
   }

     // 11
    const avatar = await uploadOnCloudinary(avatarLocalPath);
    const coverImage = await uploadOnCloudinary(coverImageLocalPath);

    if (!avatar) {
        throw new ApiError(400, "Avatar file is required")
    }

    // 12
    User.create({
        fullName,
        avatar: avatar.url,
        coverImage: coverImage?.url || "",
        email,
        password,
        username: username.toLowerCase()
    })
})

export { registerUser }  // 3


