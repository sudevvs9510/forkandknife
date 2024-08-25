import React, { useEffect, useCallback } from 'react';
import { toast, Toaster } from 'sonner';
import { useSocket } from '../Contexts/Socketio';
import { MessageType } from '../hooks/UserChatHooks';
import { useAppSelector } from '../redux/app/store';
import { getUserDetails } from '../api/RestaurantApis';
import { selectRestaurants } from '../redux/reducers/userSlices/RestaurantSearchSlice';

const Notifications: React.FC = () => {
  const userId = useAppSelector((state) => state.userAuth?.user?._id);
  const restaurants = useAppSelector(selectRestaurants);
  const socket = useSocket();

  const handleNewMessage = useCallback(async (data: MessageType) => {
    let senderDetails;
    if (userId) {
      senderDetails = restaurants.find((value) => value._id === data.sender);
    } else {
      senderDetails = await getUserDetails(data.sender);
    }

    toast.success(senderDetails?.restaurantName || senderDetails?.username, {
      description: data.content,
    });

    return senderDetails;
  }, [userId, restaurants]);

  useEffect(() => {
    if (socket) {
      if (window.location.pathname !== "/chat") {
        socket.on("chat message", handleNewMessage);
      }
    }

    return () => {
      socket?.off("chat message", handleNewMessage);
    };
  }, [socket, handleNewMessage]);

  return <><Toaster richColors position='bottom-right' duration={1000} closeButton /></>;
};

export default Notifications;
