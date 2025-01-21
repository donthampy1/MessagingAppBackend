import { Request, Response } from "express";
import Message from "../models/messageModel";
import  { Chat }  from "../models/chatModel";
import User from "../models/userModel";
 


export const sendMessage = async (req: Request, res: Response): Promise<any>=> {
    const  { content, chatId, init } = req.body

    let newMessage = {
        sender: init,
        content: content,
        chat: chatId
    }

    try{
        let message = await Message.create(newMessage)

        message = await message.populate("sender")
            message = await message.populate("chat")
            message = await User.populate(message,{
                path:"chat.users",
                select : " name picture email"
            })



        let lastMessage = await Chat.findByIdAndUpdate(chatId, {latestMessage: message})

        res.json(message)
    }catch (error){
        console.log(error)
    }
}

export const allMessage = async (req: Request, res: Response): Promise<any>=> {
    try{
        const message = await Message.find({chat: req.params.chatId})
        .populate("sender")
        .populate("chat")
        res.json(message)
    }catch(error) {
        console.log(error)
    }
}

