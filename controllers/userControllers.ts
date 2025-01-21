import User from "../models/userModel";
import { Request, Response } from "express";

export const login = async (req: Request, res: Response): Promise<any> => {
  try {
    const { email, username, picture } = req.body;

    let user = await User.findOne({ email });
    if (!user) {
      user = new User({ email, username, picture });
      await user.save();
      return res
        .status(201)
        .json({ message: "User created successfully.", user });
    }console.log("added or logged in ")
    return res.status(200).json({ message: "User already exists.", user });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}

export const searchUsers = async (req: Request, res: Response) => {
try {
  const {search, userId}  = req.query

    const searchFilter = {
      $or: [
        { email: { $regex: search, $options: "i" } },
        { username: { $regex: search, $options: "i" } },
      ],
      _id: { $ne: userId },
    };

    const users = await User.find(searchFilter)
  res.send(users)
}catch(error){
  console.log(error)
}
}
