
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
      if(!onlineUsers.includes(userId)) {
        onlineUsers.push(userId )
      }
      // console.log(`User ${data} connected with socket ID ${socket.id}`);
      console.log("Online users after join:", onlineUsers);
      socket.emit("return_online",onlineUsers);
      socket.broadcast.emit("online_update",onlineUsers)
    })


    socket.on('disconnect', (userId) => {
      console.log('User disconnected:', socket.id)
      
      // const index = onlineUsers.findIndex(user => user.socketId === socket.id);
      // if (index !== -1) {
      //   console.log(`User ${onlineUsers[index].userId} disconnected with socket ID ${socket.id}`);
      //   onlineUsers.splice(index, 1);
      // }
      // console.log('Online users after disconnect:', onlineUsers);
    })

    socket.on('remove_online',userId =>  {
      onlineUsers = onlineUsers.filter(item => item !== userId);
      console.log("removing online",onlineUsers)
      socket.broadcast.emit("online_update",onlineUsers)

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





