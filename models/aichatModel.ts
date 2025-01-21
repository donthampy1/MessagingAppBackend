import mongoose, { Document, ObjectId } from "mongoose";

// User interface for typing the User documents
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
    userId: { type: mongoose.Schema.Types.ObjectId, required: true, index: true }, // Index for efficient querying
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
