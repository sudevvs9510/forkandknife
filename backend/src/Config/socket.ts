
import { Server as HTTPServer } from 'http'
import { Server as SocketIOServer } from 'socket.io'
import ChatMessageModel from "../frameworks/database/models/messageModel"


let onlineUsers: string[] = [];

export const initializeSocket = (server: HTTPServer) => {
  const io = new SocketIOServer(server, {
    cors: {
      origin: "*",
      methods: ['GET', 'POST'],
    },
  })

  io.on('connection', (socket) => {
    console.log('New user connected', socket.id)

    socket.on('join', (userId: any) => {
      console.log(userId)
      if (!onlineUsers.includes(userId)) {
        onlineUsers.push(userId)
      }
      socket.join(userId)
      socket.emit("return_online", onlineUsers);
      socket.broadcast.emit("online_update", onlineUsers)
    })


    socket.on('disconnect', (userId) => {
      console.log('User disconnected:', socket.id)

    })

    socket.on('remove_online', userId => {
      onlineUsers = onlineUsers.filter(item => item !== userId);
      socket.broadcast.emit("online_update", onlineUsers)

    })

    socket.on('chat message', async (msg) => {
      const { senderId, receiverId, content, conversationId } = msg;

      try {
        const message = new ChatMessageModel({
          sender: senderId,
          receiver: receiverId,
          content,
          conversationId,
        })

        io.to(receiverId).emit('chat message', message)
      } catch (error) {
        console.log(error)
      }
    })

    socket.on("set_messages_seen", async ({ sender, conversationId,currentId }) => {
      const message = await ChatMessageModel.find({ conversationId })
      for (const msg of message) {
        if (msg.sender === sender) {
          msg.seen = true
          await msg.save()
        }
      }
      io.to(sender).emit("set_messages_seen",currentId)
     
    })

  })
}





