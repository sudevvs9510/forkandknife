import React, { createContext, useContext, useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';
import { useAppSelector } from '../redux/app/store';

interface SocketContextType {
  socket: Socket | null;
}

export const SocketContext = createContext<SocketContextType | null>(null);

interface SocketProviderProps {
  children: React.ReactNode;
  userId?: string;
  restaurantId?: string;
}

export const useSocket = () => {
  const socket = useContext(SocketContext)
  return socket?.socket
}

export const SocketProvider: React.FC<SocketProviderProps> = ({ children }) => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const userId = useAppSelector((state) => state.userAuth?.user?._id)
  const { restaurantId } = useAppSelector((state) => state.restaurantAuth)
  
  useEffect(() => {
    const id = userId || restaurantId;
    if (!socket) {
      const response = io(import.meta.env.VITE_APP_BASE_URL)
      console.log(response)
      setSocket(response)
    }
    if (id && socket) {
      console.log(socket, "??????")
      socket.on("connect", () => {
        console.log("Connected")
      })
      socket?.emit("join", id);
    }
  }, [userId, restaurantId, socket]);
  const value: SocketContextType = {
    socket,
  };

  return <SocketContext.Provider value={value}>{children}</SocketContext.Provider>;
};

export default SocketProvider;