// index.js connects the database and starts the server.

import dotenv from "dotenv";  //.env(dotenv) file ki values ko process.env mein load karta hai.
import connectDB from "./db/index.js";
import { app } from "./app.js";  // index.js ko server start karne ke liye Express ka app chahiye.

dotenv.config({  //config(): .env file ko read karta hai aur uski values ko process.env mein available kar deta hai.
    path: './.env'
})
import dns from "dns"
import { error } from "console";

dns.setServers(["1.1.1.1", "8.8.8.8"])

connectDB() // execution

    .then(() => {
        // Error Listen
        app.on("error", (error) => {
            console.log("Error:", error);
            throw err
        })

        // First MongoDB Connected then Server Start
        app.listen(process.env.PORT || 8000, () => {
            console.log(`Server is runnig at PORT :
             ${process.env.PORT}`);
        })
    })

    .catch((err) => {
        console.log("MongoDB Connection Failed !!! ", err);
    })

/*
import mongoose from "mongoose";
import { DB_Name } from "./constants";

import express from "express";
const app = express()

    // await is only valid in async functions
    (async () => {
        try {
            await mongoose.connect(`${process.env.MONGODB_URL}/
        ${DB_Name}`)

            app.on("error", (error) => {
                console.log("ERROR: ", error);
                throw err
            })

            app.listen(process.env.PORT, () => {
                console.log(`App is listening on PORT $
                    {process.env.PORT}`);
            })

        } catch (error) {
            console.error("ERROR: ", error)
            throw err
        }
    })()

    */