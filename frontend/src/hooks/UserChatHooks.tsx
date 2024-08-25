import { useState, useEffect, useRef } from 'react';
import { getConversations, getMessages, sendMessage } from '../api/ChatApis';
import { RootState, useAppSelector, useAppDispatch } from '../redux/app/store';
import { fetchRestaurants, selectRestaurants } from '../redux/reducers/userSlices/RestaurantSearchSlice';
import { useSocket } from '../Contexts/Socketio';

interface ConversationType {
  _id: string;
  members: string[];
}

interface UnseenMessageType {
  _id: string;
  count: number;
}

export interface MessageType {
  _id: string;
  conversationId: string;
  senderId?: string;
  receiverId?: string;
  sender: string;
  content: string;
  seen: boolean;
  createdAt: string;
  updatedAt: string;
}

export const UserChatHooks = () => {
  const dispatch = useAppDispatch();
  const userId = useAppSelector((state: RootState) => state.userAuth.user?._id);
  const restaurants = useAppSelector(selectRestaurants);

  const [conversations, setConversations] = useState<ConversationType[]>([]);
  const [selectedConversation, setSelectedConversation] = useState<ConversationType | null>(null);
  const [messages, setMessages] = useState<MessageType[]>([]);
  const [onlineUsers, setOnlineUsers] = useState<string[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [filteredConversations, setFilteredConversations] = useState<ConversationType[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [unseenMessage, setUnseenMessage] = useState<UnseenMessageType[]>([]);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const socket = useSocket();

  // Fetch conversations
  useEffect(() => {
    const fetchConversations = async () => {
      if (userId) {
        try {
          const data = await getConversations(userId);
          setConversations(data.conversation);
          setUnseenMessage(data.unseenMessageCount);
        } catch (error) {
          console.error('Error fetching conversations:', error);
        }
      }
    };
    fetchConversations();
  }, [userId]);

  // Fetch messages when a conversation is selected
  useEffect(() => {
    if (selectedConversation) {
      const fetchMessages = async () => {
        try {
          const data = await getMessages(selectedConversation._id);
          setMessages(data);
        } catch (error) {
          console.log('Error fetching messages', error);
        }
      };
      fetchMessages();
    }
  }, [selectedConversation]);

  // Fetch restaurants
  useEffect(() => {
    dispatch(fetchRestaurants());
  }, [dispatch]);

  // Auto-scroll to the latest message
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  // Socket connection and events setup
  useEffect(() => {
    if (userId && socket) {
      socket.emit('join', userId);

      const handleConnect = () => console.log('Connected to socket server');
      const handleOnlineUpdate = (data: string[]) => setOnlineUsers(data);
      const handleChatMessage = (message: MessageType) => {
        if (message.conversationId === selectedConversation?._id) {
          setMessages((prevMessages) => [...prevMessages, message]);
          const restoId = selectedConversation.members.find(item => item !== userId)!;
          socket.emit('set_messages_seen', {
            sender: restoId,
            conversationId: selectedConversation._id,
            currentId: userId
          });
        } else {
          let msg = unseenMessage.find(value => value._id === message.conversationId);
          if (!msg) {
            msg = { _id: message.conversationId, count: 1 };
          } else {
            msg.count += 1;
          }
          setUnseenMessage([msg, ...unseenMessage.filter((value) => value._id !== msg._id)]);
        }

        const conv = conversations.find(value => value._id === message.conversationId);
        conv && setConversations([conv, ...conversations.filter(value => value._id !== conv._id)]);
      };
      const handleSetMessagesSeen = () => {
        setMessages(prevMessages => prevMessages.map(msg =>
          msg.sender === userId ? { ...msg, seen: true } : msg
        ));
      };
      const handleDisconnect = () => console.log('Disconnected from socket server');

      socket.on('connect', handleConnect);
      socket.on('return_online', handleOnlineUpdate);
      socket.on('online_update', handleOnlineUpdate);
      socket.on('chat message', handleChatMessage);
      socket.on('set_messages_seen', handleSetMessagesSeen);
      socket.on('disconnect', handleDisconnect);

      return () => {
        socket.off('connect', handleConnect);
        socket.off('return_online', handleOnlineUpdate);
        socket.off('online_update', handleOnlineUpdate);
        socket.off('chat message', handleChatMessage);
        socket.off('set_messages_seen', handleSetMessagesSeen);
        socket.off('disconnect', handleDisconnect);
      };
    }
  }, [userId, selectedConversation, unseenMessage, socket, conversations]);

  // Mark messages as seen when a conversation is selected
  useEffect(() => {
    if (selectedConversation && userId && socket) {
      const restoId = selectedConversation.members.find(item => item !== userId);
      socket.emit('set_messages_seen', {
        sender: restoId,
        conversationId: selectedConversation._id,
        currentId: userId
      });
    }
  }, [selectedConversation, userId, socket]);

  // Filter conversations based on search term
  useEffect(() => {
    if (searchTerm) {
      const filtered = conversations.filter((conv) => {
        const restaurantId = conv.members.find((member) => member !== userId);
        const restaurant = getRestaurantDetails(restaurantId || '');
        return restaurant.name.toLowerCase().includes(searchTerm.toLowerCase());
      });
      setFilteredConversations(filtered);
    } else {
      setFilteredConversations(conversations);
    }
  }, [searchTerm, conversations, userId]);

  const getRestaurantDetails = (restaurantId: string) => {
    const restaurant = restaurants.find((res) => res._id === restaurantId);
    return restaurant
      ? { name: restaurant.restaurantName, image: restaurant.featuredImage }
      : { name: restaurantId, image: '' };
  };

  const handleSendMessage = async (messageContent: string) => {
    if (selectedConversation && userId && messageContent) {
      try {
        await sendMessage(selectedConversation._id, userId, messageContent);
        setNewMessage('');

        const message: MessageType = {
          senderId: userId,
          receiverId: selectedConversation.members.find((member) => member !== userId),
          content: messageContent,
          conversationId: selectedConversation._id,
          _id: '',
          sender: userId,
          seen: false,
          createdAt: '',
          updatedAt: ''
        };
        socket?.emit('chat message', message);
        setMessages((prevMessages) => [...prevMessages, message]);

        const conv = conversations.find(value => value._id === message.conversationId);
        conv && setConversations([conv, ...conversations.filter(value => value._id !== conv._id)]);
      } catch (error) {
        console.error('Error sending message:', error);
      }
    }
  };

  const handleSelectConversation = (conv: ConversationType) => {
    setSelectedConversation(conv);
    setUnseenMessage(unseenMessage.filter((value) => value._id !== conv._id));
    socket?.emit('join conversation', conv._id);
  };

  const handleCloseConversation = () => {
    setSelectedConversation(null);
  };

  return {
    conversations,
    selectedConversation,
    messages,
    onlineUsers,
    newMessage,
    filteredConversations,
    searchTerm,
    unseenMessage,
    setNewMessage,
    setSearchTerm,
    handleSendMessage,
    handleSelectConversation,
    handleCloseConversation,
    getRestaurantDetails,
  };
};
