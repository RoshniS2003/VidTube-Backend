// controller = Kya kaam karna hai
import { asyncHandler } from "../utils/asyncHandler.js";  // 1

// User register karne ka actual logic yahan hoga.
const registerUser = asyncHandler(async (req, res) => {  // 2
    res.status(200).json({
        message: "Learn Backends"
    })
})

export { registerUser }  // 3


