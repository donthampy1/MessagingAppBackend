import mongoose from "mongoose";
//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

const MessageSchema = new mongoose.Schema({

    sender: { 
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    content: { type: String },
    chat: { 
        type: mongoose.Schema.ObjectId,
        ref: 'Chat'
    }

},{ timestamps: true })


const Message = mongoose.model('Message', MessageSchema)


export default Message