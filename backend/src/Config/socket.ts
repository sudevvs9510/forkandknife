
import { Server as HTTPServer } from 'http'
import { Server as SocketIOServer } from 'socket.io'
import ChatMessageModel from "../frameworks/database/models/messageModel"

export const initializeSocket = (server: HTTPServer) => {
  const io = new SocketIOServer(server, {
    cors: {
      origin: "*",
      methods: ['GET', 'POST'],
    },
  })

  io.on('connection', (socket) => {
    console.log('New user connected', socket.id)

    socket.on('disconnect', () => {
      console.log('User disconnected:', socket.id)
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
        console.log(message)

        io.emit('chat message', message)
      } catch (error) {
        console.log(error)
      }
    })
  })
}





