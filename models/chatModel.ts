import mongoose, { Document, ObjectId } from "mongoose";

// User interface for typing the User documents
interface IUser extends Document {
  username: string;
  email: string;
  picture: string
}

interface IChat extends Document {
  chatName: string;
  isGroupChat: boolean;
  users: IUser[];
  latestMessage: ObjectId;
  groupAdmin: IUser;
}

const ChatSchema = new mongoose.Schema(
  {
    chatName: { type: String },
    isGroupChat: { type: Boolean, default: false },
    users: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    latestMessage: {
      type: mongoose.Schema.ObjectId,
      ref: "Message",
    },
    groupAdmin: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

// Make sure to use the correct type for the Chat model
const Chat = mongoose.model<IChat>("Chat", ChatSchema);

export { Chat, IChat, IUser };
