import express, {Router} from 'express'
import {getConversationMembers, addConversationMembers, addChatMessages, getChatMessages} from "../middlewares/chatMiddleware"

const chatRouter : Router = Router()


chatRouter.get("/conversations/:userId",getConversationMembers);
chatRouter.post("/conversations", addConversationMembers);

chatRouter.get("/messages/:conversationId",getChatMessages)
chatRouter.post("/messages", addChatMessages)


export default chatRouter