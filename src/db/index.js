import mongoose from "mongoose";
import { DB_Name } from "../constants.js";

// DB is another continents so we use async function
// function create
const connectDB = async () => {
    // If we connect a DB then its show a error so we use try catch
    try {

        // mongoose give a return object
        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URL}/${DB_Name}`);
        console.log(`MongoBD Connected !! DB HOST: 
            ${connectionInstance.connection.host}`);

    } catch (error) {

        console.log("MONGODB Connection Failed", error);
        process.exit(1)
    }
};

export default connectDB;
/* export default connectDB is used to export the connectDB function so that 
 we can import and use it in another file.  */

