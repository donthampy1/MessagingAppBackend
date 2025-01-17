import mongoose from "mongoose";
import dotenv from 'dotenv'


dotenv.config()

const connectDB = async () => {
    const MONGO_URI = process.env.MONGO_URI
    if (!MONGO_URI) {
    throw new Error("MONGO_URI is not defined ");
    }
    try{
        await mongoose.connect(MONGO_URI)
        console.log('DB connected')
    }catch (error) {
        console.log('DB Connection Error', error)
    }
}
export default connectDB