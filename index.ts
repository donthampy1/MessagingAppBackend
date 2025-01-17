import express, { Application } from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db";
import userRoutes  from "./routes/userRoutes"
import chatRoutes  from "./routes/chatRoutes"


const app: Application = express();
dotenv.config();
connectDB();


const corsOptions = {
  origin: "http://localhost:5173", 
  credentials: true,
};

app.use(cors(corsOptions))

app.use(express.json())



app.use('/api/user',userRoutes)
app.use('/api/chat', chatRoutes)








const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
