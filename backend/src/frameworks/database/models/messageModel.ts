import mongoose, { Schema } from 'mongoose';

const messageSchema = new Schema({
  conversationId: {
    type: String
  },
  sender: {
    type: String
  },
  content: {
    type: String,
  },
},
  { timestamps: true },
);

const messageModel = mongoose.model('message', messageSchema);
export default messageModel;
