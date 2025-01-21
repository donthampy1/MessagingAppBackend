import { Request, Response } from "express";
import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";
import ChatHistoryModel from "../models/aichatModel";
dotenv.config();



export const aiChat = async (req: Request, res: Response): Promise<any> => {
    const { history , query } = req.body;
    if ( !query) {
        return res.status(400).json({ error: "query required" });
    }

    try {

        const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY as string);
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
        

       const formattedHistory = history ? history.map((msg:any) => ({
            role: msg.role,
            parts: [{ text: msg.parts.join('') }], // Join parts if it's an array
        })) : [];

        const chat = model.startChat({
            history: formattedHistory,
        });

           
        const result = await chat.sendMessage(query)
        const response = await result.response
        const text = response.text()
        res.send(text)

       
    } catch (error) {
        console.error("Error in aiChat:", error);
        res.status(500).json({ error: "An error occurred" });
    }
};