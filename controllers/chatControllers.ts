import { Request, Response } from "express";
import { Chat, IUser } from "../models/chatModel";  // Import correct types
import User from "../models/userModel";

export const accessChat = async (req: Request, res: Response): Promise<any>=> {
  const { userId, init } = req.body;

  if (!userId) {
    console.log("UserId param not sent with request");
    return res.sendStatus(400);
  }

  if (!init) {
    console.log("Unauthorized request");
    return res.sendStatus(401);
  }

  try {
    const isChat = await Chat.findOne({
      isGroupChat: false,
      users: { $all: [init, userId] },
    })

    if (isChat) {
      return res.status(200).json(isChat)
    }

    const chatData = {
      chatName: "sender",
      isGroupChat: false,
      users: [init, userId],
    }

    const createdChat = await Chat.create(chatData)
    const fullChat = await Chat.findById(createdChat._id)

    if (!fullChat) {
      return res.status(404).json({ message: "Chat creation failed" })
    }

    res.status(200).json(fullChat)
  } catch (error: any) {
    console.error("Error ", error.message)
    res.status(500).json({ message: " error" })
  }
};




export const fetchChat = async (req: Request, res: Response): Promise<any> => {
   try {
        console.log('initiated')

    const userId  = req.query.userId
    const chats = await Chat.find({ users: { $elemMatch: { $eq: userId } } })
      .populate("users") 
      .populate("latestMessage")
      .sort({ updatedAt: -1 })
      .lean()
      .exec();
    console.log( chats )

    

    res.status(200).json(chats);
  } catch (error) {
    console.log(error)
    res.status(400).json({ message: error });
  }
}

export const createGroupChat = async (req: Request, res: Response): Promise<any> => {
    if(!req.body.users || !req.body.name){
        return res.status(400)
    }
    let users = JSON.parse(req.body.users)

    if(users.length < 2 ){
        return res.status(400)
    }

    try {
        const groupChat = await Chat.create({
            chatName:req.body.name,
            users: users,
            isGroupChat: true,
            groupAdmin: req.user
        })
        const fullGroupChat = await Chat.findOne({
            _id: groupChat._id
        })
        //needs populating

     } catch (error){
        console.log(error)
    }
}

export const renameGroupChat = async (req: Request, res: Response): Promise<any> => {
    const { chatId, chatName } = req.body
    console.log(chatId, chatName)
}


export const addtoGroup = async (req: Request, res: Response): Promise<any> => {
    const { chatId, userId } = req.body

    const added = Chat.findByIdAndUpdate(chatId,{ $push: { users: userId}}, {new: true})
    ///populate
}

export const removefromGroup = async (req: Request, res: Response): Promise<any> => {
    const { chatId, userId } = req.body

    const added = Chat.findByIdAndUpdate(chatId,{ $push: { users: userId}}, {new: true})
    ///populate
}