    // user.routes.js → route decide karta hai
// routes = Kahan jana hai

import { Router } from "express";   // 1
import { registerUser } from "../controllers/user.controllers.js";   // 4 automatic import

const router = Router(); // 2  // with the help of Router we create a router app

router.route("/register").post(registerUser)   // 4  /register request aaye → registerUser controller ko bulao.
// router.post("/register", registerUser);    
// /register is a route and registerUser is a methods
/* GET = lena/read karna kyunki backend se data mangaya ja raha hai.
POST = bhejna/create karna kyunki user registration ke time frontend user ka data backend ko bhej raha hai. */

export default router   // 3
// export { router }