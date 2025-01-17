import User from "../models/userModel";
import { Request, Response } from "express";

export const login = async (req: Request, res: Response): Promise<any> => {
  try {
    const { email, username } = req.body;

    let user = await User.findOne({ email });
    console.log(user)
    if (!user) {
      user = new User({ email, username });
      await user.save();
      console.log(email, "added");
      return res
        .status(201)
        .json({ message: "User created successfully.", user });
    }
    console.log(username, "already exists ");
    return res.status(200).json({ message: "User already exists.", user });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}

export const searchUsers = async (req: Request, res: Response) => {
try {
  console.log("search reaching ")
  const {search, userId}  = req.query

    const searchFilter = {
      $or: [
        { email: { $regex: search, $options: "i" } },
        { username: { $regex: search, $options: "i" } },
      ],
      _id: { $ne: userId },
    };

    const users = await User.find(searchFilter)
    console.log('khbkhbjhbj',searchFilter, users)
  res.send(users)
}catch(error){
  console.log(error)
}
}
