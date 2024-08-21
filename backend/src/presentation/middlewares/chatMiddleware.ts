import { Request, Response, NextFunction } from 'express'
import messageModel from '../../frameworks/database/models/messageModel';
import conversationModel from "../../frameworks/database/models/conversationModel"

export async function getConversationMembers(req: Request, res: Response, next: NextFunction) {
   try {
      const { userId } = req.params
      console.log('Fetching conversations for userId:', userId);
      const conversation = await conversationModel.find({
         members: { $in: [userId] }
      })
      console.log('Conversations found:', conversation);

      return res.status(200).json(conversation)
   } catch (error) {
      console.log("Error fetching chat messages:", error)
      return res.status(500).json({ message: 'Error fetching chat messages', error })
   }
}


export async function addConversationMembers(req: Request, res: Response, next: NextFunction) {
   try {
      const { senderId, receiverId } = req.body
      console.log(req.body)

      if (!senderId || !receiverId) {
         return res.status(400).json({ message: 'Both senderId and receiverId are required.' });
      }
      console.log(req.body);

      const existingConversation = await conversationModel.findOne({
         members: { $all: [senderId, receiverId] }
      })

      if (existingConversation) {
         return res.status(200).json({ message: "conversation already exists", existingConversation })
      }


      const newChatMessage = new conversationModel({
         members: [senderId, receiverId]
      })
      const savedConversation = await newChatMessage.save();
      return res.status(200).json(savedConversation)

   } catch (error) {
      console.log(error)
      return res.status(500).json({ message: "Error sednding chat message", error })
   }
}


export async function addChatMessages(req: Request, res: Response, next: NextFunction) {
   try {
      const newMessage = new messageModel(req.body)
      console.log(newMessage)

      const savedMessage = await newMessage.save()
      return res.status(200).json(savedMessage)

   } catch (error) {
      console.log(error)
      return res.status(500).json({ message: "Internal server error" })
   }
}

export async function getChatMessages(req: Request, res: Response, next: NextFunction) {

   const { conversationId } = req.params
   console.log(conversationId)
   try {

      const messages = await messageModel.find
         ({
            conversationId: conversationId
         })
      console.log(messages)
      return res.status(200).json(messages)
   } catch (error) {
      console.log(error)
      return res.status(500).json({ message: "Error fetching chat messages", error })
   }
}

export async function messageSeenUpdate (req:Request, res:Response, next:NextFunction){
   try{
      const {messageId} = req.params
      const updatedMessage = await messageModel.findByIdAndUpdate(messageId, {seen:true}, {new:true})
      return res.status(200).json(updatedMessage)
   } catch(error){
      console.log(error)
      return res.status(500).json({ message:"Error ",error})
   }
}