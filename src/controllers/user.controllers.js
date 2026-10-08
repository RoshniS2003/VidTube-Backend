// controller = Kya kaam karna hai
import { asyncHandler } from "../utils/asyncHandler.js";  // 1
import { ApiError } from "../utils/ApiError.js"  // 6
import { User } from "../models/user.model.js"   // 8
import { uploadOnCloudinary } from "../utils/cloudinary.js"   // 11
import { ApiResponse } from "../utils/ApiResponse.js"   // 16

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
    check for user creation : user register is successfully completed or not? 
    return res if not return then show error
    */

    // get user details from frontend
    const { fullName, username, email, password } = req.body    // 4
    console.log("email:", email);    // 5

    // basic method
    /*  
    if (fullName === "") {
        throw new ApiError(400, "fullname is Required")
    }  
     */

        // valiadtion  --> user details not empty
    if (   // 7
        [fullName, username, email, password].some((field) =>   //map(some)
            field?.trim() === "")    // field is given or not(field?)
    ) {
        throw new ApiError(400, "All fields are required")
    }

    // 9
    // check if users already exits: username, email
    const existedUser = User.findOne({     
        $or: [{ username }, { email }]
    })

    if (existedUser) {
        throw new ApiError(409, "User with email and username already exists")
    }

    // 10
    // check for images, check for Avatar

    // check (upload) the images
    const avatarLocalPath = req.files?.avatar[0]?.path;
    const coverImageLocalPath = req.files?.coverImage[0]?.path;

    // check the Avatar image that is uploaded or not?
    if (!avatarLocalPath) {
        throw new ApiError(400, "Avatar file is required")
    }

    // 12
    // upload them to cloudinary , avatar :---> return image url
    const avatar = await uploadOnCloudinary(avatarLocalPath);
    const coverImage = await uploadOnCloudinary(coverImageLocalPath);

    // check avatar is properly uploaded or not?
    if (!avatar) {
        throw new ApiError(400, "Avatar file is required")
    }

     // 13
     // create user object - create entry in db
     // db mai baat karte samay error aa hi jata or db in another continents isliye await use kare
    const user = await User.create({
        fullName,
        avatar: avatar.url,
        // coverImage: coverImage.url, (coverImage hain toh url nikal lo)
        coverImage: coverImage?.url || "",   // coverImage nhi hain toh empty rahne do
        email,
        password,
        username: username.toLowerCase()
    })

    // 14
    // remove password and refresh token field from response
    const createdUser = await User.findById(user._id).select(
        "-password -refreshToken"   // not taken
    )

    // 15
    // check for user creation
    if (!createdUser) {
        throw new ApiError(500, "Something went wrong while registering the user")
    }

    // 17
    // return res
    return res.status(201).json(
        new ApiResponse(200, createdUser, "User Registered Successfully")
    )
})

export { registerUser }  // 3


