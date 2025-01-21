import express, { Application } from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db";
import userRoutes  from "./routes/userRoutes"
import chatRoutes  from "./routes/chatRoutes"
import messageRoutes from "./routes/messageRoutes"
import aiChatRoutes from "./routes/aichatRoutes"


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
app.use('/api/message', messageRoutes)
app.use('/api/aichat', aiChatRoutes)













const PORT = process.env.PORT || 3000;

const server = app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});


const io = require('socket.io')(server, {
  pingTimeout: 60000,
  cors:{
    origin: "http://localhost:5173",
  }
}) 
 
io.on("connection", (socket: any) => {
  console.log("connected to socket.io")

  socket.on("setup", (userData:any) => {

    socket.join(userData._id)
    socket.emit("connected")

  })

  socket.on("join chat", (room:any)=> {
    socket.join(room)
    console.log("user joined" + room )
  })

 

  socket.on("new message", (newMessageRecieved:any) => {
    let chat = newMessageRecieved.chat

    if(!chat.users){
      console.log("users not defined")
      return
    }

    chat.users.forEach((user:any) => {
      if(user._id == newMessageRecieved.sender._id){
        return
      }

      socket.in(user._id).emit("message recieved", newMessageRecieved)
    });
 

  })

})