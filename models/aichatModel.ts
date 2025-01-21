import mongoose, { Document, ObjectId } from "mongoose";

interface Message {
  role: "user" | "model"
  parts: string;
  timestamp: number;
}

interface  ChatHistory{
  userId: string;
  messages:Message[]
}

const chatHistorySchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, required: true, index: true }, 
    messages: [
        {
            role: { type: String, enum: ['user', 'model'], required: true },
            parts: { type: String, required: true },
            timestamp: { type: Number, required: true },
        },
    ],
}, { timestamps: true })

const ChatHistoryModel = mongoose.model<ChatHistory>('ChatHistory', chatHistorySchema);

export default ChatHistoryModel;
