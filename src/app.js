// Express Features
/* App.js contains the Express app setup, such as middleware,
  routes, CORS, JSON handling, cookies, and static files.    */

// import express from "express";
import express, { urlencoded } from "express";

// CORS = Cross-Origin Resource Sharing
// “CORS allows communication between frontend and backend when they have different origins.”
/* 👉 Different origins isliye hote hain kyunki frontend aur backend aksar different ports/domains
  par run hote hain; CORS unke beech browser-level access ko allow karta hai. */
import cors from "cors"

// Cookie = information 🍪 like : user = Roshni
// Cookie-parser: "Main cookie ke andar kya likha hai, woh backend ko padhne dunga." 👀
// Cookie-parser is used to read cookies sent by the browser in the backend.
// Cookie-parser = cookie ko read karne wala middleware. 🍪👀
// Middleware = request aur response ke beech mein kaam karne wala function.
// Browser request ke saath cookie bhej sakta hai
// browser ke pass cookies save hoti hain jab ham browser mai request bhejte hain 
import cookieParser from "cookie-parser";

const app = express()   // Create Express Application
// const app = express()

// If Middleware is used then we use : use keyword 
// cors() — Frontend ko Backend se connect karne dena
app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))

// Work Same only Format Matter
app.use(express.json({limit: "16kb"}))  // JSON data read karne ke liye & It means the maximum JSON request body size is 16 KB.
app.use(express.urlencoded({extended: true, limit: "16kb"}))  //form data read karne ke liye.
app.use(express.static("public")) // public folder ki files browser ko serve/send karne ke liye.
app.use(cookieParser())



export { app }
// export { app }