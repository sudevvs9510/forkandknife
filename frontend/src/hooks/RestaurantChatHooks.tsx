/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/app/store';
import { getUserDetails } from '../api/RestaurantApis';
import { getConversations, getMessages, sendMessage } from '../api/ChatApis';
import { useSocket } from '../Contexts/Socketio';

export interface ConversationType {
  _id: string;
  members: string[];
}

export interface UnseenMessageType {
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

export interface UserDetails {
  username: string;
  email: string;
}

export const useRestaurantChat = () => {
  const restaurantId = useSelector((state: RootState) => state.restaurantAuth.restaurant._id);
  const [conversations, setConversations] = useState<ConversationType[]>([]);
  const [selectedConversation, setSelectedConversation] = useState<ConversationType | null>(null);
  const [messages, setMessages] = useState<MessageType[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [usernames, setUsernames] = useState<{ [key: string]: string }>({});
  const [selectedUser, setSelectedUser] = useState<UserDetails | null>(null);
  const [showMessages, setShowMessages] = useState<boolean>(false);
  const [onlineUsers, setOnlineUsers] = useState<string[]>([]);
  const [filteredConversations, setFilteredConversations] = useState<ConversationType[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [unseenMessage, setUnseenMessage] = useState<UnseenMessageType[]>([]);

  const socketRef = useSocket();

  useEffect(() => {
    const fetchConversations = async () => {
      if (restaurantId) {
        try {
          const data = await getConversations(restaurantId);
          setConversations(data.conversation);
          setUnseenMessage(data.unseenMessageCount);

          const userPromises = data.conversation.map(async (conv:any) => {
            const userId = conv.members.find((member:any) => member !== restaurantId);
            if (userId) {
              const userDetails = await getUserDetails(userId);
              return { [userId]: userDetails.username };
            }
            return {};
          });

          const users = await Promise.all(userPromises);
          const usernamesMap = Object.assign({}, ...users);
          setUsernames(usernamesMap);
        } catch (error) {
          console.error('Error fetching conversations:', error);
        }
      }
    };
    fetchConversations();
  }, [restaurantId]);

  useEffect(() => {
    if (selectedConversation) {
      const fetchMessages = async () => {
        const data = await getMessages(selectedConversation._id);
        setMessages(data);
        setUnseenMessage((prevUnseen) =>
          prevUnseen.filter((msg) => msg._id !== selectedConversation._id)
        );
      };
      fetchMessages();
    }
  }, [selectedConversation]);

  useEffect(() => {
    if (restaurantId && socketRef && selectedConversation) {
      socketRef.emit("join", restaurantId);

      socketRef.on('connect', () => {
        console.log('Connected to socket server');
      });

      socketRef.on("return_online", setOnlineUsers);
      socketRef.on("online_update", setOnlineUsers);

      socketRef.on('disconnect', () => {
        console.log('Disconnected from socket server');
      });
    }
  }, [restaurantId, selectedConversation, socketRef]);

  useEffect(() => {
    if (socketRef) {
      socketRef.on('chat message', (message: MessageType) => {
        if (message.conversationId === selectedConversation?._id) {
          setMessages((prevMessages) => [...prevMessages, message]);
          const userId = selectedConversation?.members.find(item => item !== restaurantId);
          if (userId) {
            socketRef.emit("set_messages_seen", {
              sender: userId,
              conversationId: selectedConversation._id,
              currentId: restaurantId,
            });
          }
        } else {
          setUnseenMessage((prevUnseen) => {
            const msg = prevUnseen.find(value => value._id === message.conversationId) || { _id: message.conversationId, count: 0 };
            msg.count += 1;
            return [msg, ...prevUnseen.filter(value => value._id !== msg._id)];
          });
        }
        setConversations((prevConversations) => {
          const conv = prevConversations.find(value => value._id === message.conversationId);
          return conv ? [conv, ...prevConversations.filter(value => value._id !== conv._id)] : prevConversations;
        });
      });
    }
    return () => {
      socketRef?.off('chat message');
    };
  }, [socketRef, selectedConversation, restaurantId]);

  useEffect(() => {
    if (socketRef) {
      socketRef.on("set_messages_seen", () => {
        setMessages((prevMessages) =>
          prevMessages.map((msg) => (msg.sender === restaurantId ? { ...msg, seen: true } : msg))
        );
      });
    }
  }, [restaurantId, socketRef]);

  useEffect(() => {
    if (selectedConversation && restaurantId && socketRef) {
      const restoId = selectedConversation?.members.find(item => item !== restaurantId);
      if (restoId) {
        socketRef.emit("set_messages_seen", {
          sender: restoId,
          conversationId: selectedConversation._id,
          currentId: restaurantId,
        });
      }
    }
  }, [selectedConversation, restaurantId, socketRef]);

  useEffect(() => {
    if (searchTerm) {
      setFilteredConversations(conversations.filter((conv) => {
        const userId = conv.members.find((member) => member !== restaurantId);
        const username = userId ? usernames[userId] : 'Unknown User';
        return username.toLowerCase().includes(searchTerm.toLowerCase());
      }));
    } else {
      setFilteredConversations(conversations);
    }
  }, [searchTerm, conversations, restaurantId, usernames]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedConversation && restaurantId && newMessage) {
      await sendMessage(selectedConversation._id, restaurantId, newMessage);
      setNewMessage('');

      const message: MessageType = {
        senderId: restaurantId,
        receiverId: selectedConversation.members.find((member) => member !== restaurantId),
        content: newMessage,
        conversationId: selectedConversation._id,
        _id: '',
        sender: restaurantId,
        seen: false,
        createdAt: '',
        updatedAt: ''
      };

      socketRef?.emit('chat message', message);
      setMessages((prevMessages) => [...prevMessages, message]);
    }
  };

  const handleSelectConversation = async (conv: ConversationType) => {
    setSelectedConversation(conv);
    const userId = conv.members.find((member) => member !== restaurantId);
    if (userId) {
      const userDetails = await getUserDetails(userId);
      setSelectedUser(userDetails);
    }
    setShowMessages(true);
    socketRef?.emit('join conversation', conv._id);
  };

  const handleCloseConversation = () => {
    setSelectedConversation(null);
    setMessages([]);
    setSelectedUser(null);
    setShowMessages(false);
  };

  return {
    restaurantId,
    conversations,
    selectedConversation,
    messages,
    newMessage,
    usernames,
    selectedUser,
    showMessages,
    onlineUsers,
    filteredConversations,
    searchTerm,
    unseenMessage,
    setNewMessage,
    setSearchTerm,
    handleSendMessage,
    handleSelectConversation,
    handleCloseConversation,
  };
};
