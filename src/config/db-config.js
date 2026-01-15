import mongoose from "mongoose";
import { DB_URL } from "./server-config.js";

export default async function dbConnect () {
    try {
        const connect = await mongoose.connect(DB_URL);
        console.log("DB connected");
    } catch (error) {
        console.log(error);
    }
}