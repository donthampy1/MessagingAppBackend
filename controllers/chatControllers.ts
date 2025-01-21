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
       // console.log('initiated')

    const userId  = req.query.userId
    const chats = await Chat.find({ users: { $elemMatch: { $eq: userId } } })
      .populate("users") 
      .populate("latestMessage")
      .sort({ updatedAt: -1 })
      .lean()
      .exec();
   // console.log( chats )

    

    res.status(200).json(chats);
  } catch (error) {
    console.log(error)
    res.status(400).json({ message: error });
  }
}

export const createGroupChat = async (req: Request, res: Response): Promise<any> => {
    const { users: usersRaw, name,init } = req.body;
  if (!usersRaw || !name) {
    return res.status(400).json({ message: "Please fill all the fields" });
  }

  let users: IUser[];
console.log(usersRaw,"create")
  try {
    users = JSON.parse(usersRaw);
console.log(users)
    // if (users.length < 2) {
    //   return res.status(400).json({
    //     message: "More than 2 users are required to form a group chat",
    //   });
    // }

    // Add the requesting user to the group
    if (init) {
      users.push(init);
    }
     console.log('ddnidjvn', users)

    // Create the group chat
    const groupChat = await Chat.create({
      chatName: name,
      users: users, // Ensure only IDs are saved in the users array
      isGroupChat: true,
      groupAdmin: init,
    });
console.log(groupChat)
  //   // Populate group chat with user details
    const fullGroupChat = await Chat.findById(groupChat._id)
      .populate("users")
      .populate("groupAdmin");
    console.log(fullGroupChat)
    res.status(200).json(fullGroupChat);
 
}catch(error) {
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