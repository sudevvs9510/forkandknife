import express, { Router } from 'express'
import { getConversationMembers, addConversationMembers, addChatMessages, getChatMessages, messageSeenUpdate } from "../middlewares/chatMiddleware"

const chatRouter: Router = Router()


chatRouter.get("/conversations/:userId", getConversationMembers);
chatRouter.post("/conversations", addConversationMembers);

chatRouter.get("/messages/:conversationId", getChatMessages)
chatRouter.post("/messages", addChatMessages)

chatRouter.post("/message-seen/:messageId", messageSeenUpdate)



export default chatRouter



// {
//   "conversations": [
//     {
//       "_id": "66b6fccb78dcf1bc3542c191",
//       "members": ["668d39f808ca7c9c99ba09ee", "667fbbf110195cd6815aec35"],
//       "createdAt": "2024-08-10T05:38:19.500Z",
//       "updatedAt": "2024-08-10T05:38:19.500Z",

//     },
//     {
//       "_id": "66b70f44185d88c226889257",
//       "members": ["668d39f808ca7c9c99ba09ee", "6684258a25f2ae5d0fe3fb6e"],
//       "createdAt": "2024-08-10T06:57:08.239Z",
//       "updatedAt": "2024-08-10T06:57:08.239Z",

//     },
//     {
//       "_id": "66b761e2099b93abdc110fd6",
//       "members": ["668d39f808ca7c9c99ba09ee", "6680008795b340ed7f568bd3"],
//       createdAt: "2024-08-10T12:49:38.686Z",
//       "updatedAt": "2024-08-10T12:49:38.686Z",

//     },
//     {
//       "_id": "66be0bc7d61cf7ad290a22f1",
//       "members": ["668d39f808ca7c9c99ba09ee", "668000e195b340ed7f568bde"],
//       "createdAt": "2024-08-15T14:08:07.231Z",
//       "updatedAt": "2024-08-15T14:08:07.231Z",

//     },
//     {
//       "_id": "66be25acd61cf7ad290a2422",
//       "members": ["668d39f808ca7c9c99ba09ee", "668004b795b340ed7f568c00"],
//       "createdAt": "2024-08-15T15:58:36.810Z",
//       updatedAt: "2024-08-15T15:58:36.810Z",

//     },
//     {
//       "_id": "66c1cd74424a03987335b4df",
//       "members": ["668d39f808ca7c9c99ba09ee", "6684db8925f2ae5d0fe3fb8a"],
//       "createdAt": "2024-08-18T10:31:16.031Z",
//       "updatedAt": "2024-08-18T10:31:16.031Z",

//     }
//   ]
// }