
import React, { useEffect, useState, useRef } from 'react';
import { RootState, useAppSelector, useAppDispatch } from '../../redux/app/store';
import { getConversations, getMessages, sendMessage } from '../../api/ChatApis';
import { fetchRestaurants, selectRestaurants } from '../../redux/reducers/userSlices/RestaurantSearchSlice';
import { format } from 'timeago.js';
import { io, Socket } from 'socket.io-client';

interface ConversationType {
  _id: string;
  members: string[];
}

interface MessageType {
  _id: string;
  conversationId: string;
  sender: string;
  content: string;
  createdAt: string;
  updatedAt: string;
}

const Chat: React.FC = () => {
  const dispatch = useAppDispatch();
  const userId = useAppSelector((state: RootState) => state.userAuth.user?._id);
  const restaurants = useAppSelector(selectRestaurants);

  const [conversations, setConversations] = useState<ConversationType[]>([]);
  const [selectedConversation, setSelectedConversation] = useState<ConversationType | null>(null);
  const [messages, setMessages] = useState<MessageType[]>([]);
  const [newMessage, setNewMessage] = useState('');

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const socketRef = useRef<Socket | null>(null);

  useEffect(() => {
    const fetchConversations = async () => {
      if (userId) {
        try {
          const data = await getConversations(userId);
          setConversations(data);
        } catch (error) {
          console.error('Error fetching conversations:', error);
        }
      }
    };
    fetchConversations();
  }, [userId]);

  useEffect(() => {
    if (selectedConversation) {
      const fetchMessages = async () => {
        const data = await getMessages(selectedConversation._id);
        setMessages(data);
      };
      fetchMessages();
    }
  }, [selectedConversation]);

  useEffect(() => {
    dispatch(fetchRestaurants());
  }, [dispatch]);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  useEffect(() => {
    if (userId) {
      socketRef.current = io('http://localhost:4000');

      socketRef.current.on('connect', () => {
        console.log('Connected to socket server');
      });

      socketRef.current.on('chat message', (message: MessageType) => {
        console.log('Received message:', message); 
        if (message.conversationId === selectedConversation?._id) {
          setMessages((prevMessages) => [...prevMessages, message]);
        }
      }); 

      socketRef.current.on('disconnect', () => {
        console.log('Disconnected from socket server');
      });

      return () => {
        socketRef.current?.disconnect();
      };
    }
  }, [userId, selectedConversation]);

  const getRestaurantDetails = (restaurantId: string) => {
    const restaurant = restaurants.find((res) => res._id === restaurantId);
    return restaurant
      ? { name: restaurant.restaurantName, image: restaurant.featuredImage }
      : { name: restaurantId, image: '' };
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedConversation && userId && newMessage) {
      await sendMessage(selectedConversation._id, userId, newMessage);
      // setMessages((prevMessages) => [...prevMessages, message]);
      setNewMessage('');
      socketRef.current?.emit('chat message', {
        senderId: userId,
        receiverId: selectedConversation.members.find((member) => member !== userId),
        content: newMessage,
        conversationId: selectedConversation._id,
      });
    }
  };

  const handleSelectConversation = (conv: ConversationType) => {
    setSelectedConversation(conv);
    if (socketRef.current) {
      console.log('Joining conversation room:', conv._id); // Logging room join
      socketRef.current.emit('join conversation', conv._id);
    }
  };

  if (!userId) {
    return <div>Please log in</div>;
  }

  return (
    <div className="flex h-screen">
      {/* User Section */}
      <div className="w-full sm:w-1/5 border-r bg-white border-gray-300 p-4 sticky top-10 ">
        <h2 className=" bg-white text-2xl font-bold mb-4">Chat</h2>
        <ul>
          {conversations.map((conv) => (
            <li
              key={conv._id}
              className={`p-2 border mb-1 rounded-lg bg-teal-50 font-[500] cursor-pointer ${selectedConversation?._id === conv._id ? 'bg-gray-200' : ''}`}
              onClick={() => handleSelectConversation(conv)}
            >
              {conv.members.filter((member) => member !== userId).map((restaurantId) => {
                const { name, image } = getRestaurantDetails(restaurantId);
                return (
                  <div key={restaurantId} className="flex items-center">
                    {image && <img src={image} alt={name} className="w-10 h-10 rounded-full mr-2" />}
                    <span>{name}</span>
                  </div>
                );
              })}
            </li>
          ))}
        </ul>
      </div>

      {/* Conversation Section */}
      <div className="w-full sm:w-4/5 p-4 flex flex-col">
        {selectedConversation ? (
          <div className="flex flex-col h-full relative">
            <div className=" bg-white z-10 pb-2">
              <h2 className="text-2xl font-bold mb-4">
                {selectedConversation.members.filter((member) => member !== userId).map((restaurantId) => {
                  const { name, image } = getRestaurantDetails(restaurantId);
                  return (
                    <span key={restaurantId} className="flex items-center">
                      {image && <img src={image} alt={name} className="w-10 h-10 rounded-full mr-2" />}
                      {name}
                    </span>
                  );
                })}
              </h2>
            </div>
            <div className="flex-1 mb-16  bg-teal-200 bg-opacity-20">
              {messages.length > 0 ? (
                <>
                  {messages.map((msg) => (
                    <div key={msg._id} className={`p-2 ${msg.sender === userId ? 'text-right' : 'text-left'}`}>
                      <p className={`inline-block px-4 py-2 rounded-lg ${msg.sender === userId ? 'bg-teal-600 text-white' : 'bg-gray-300 text-black'}`}>
                        {msg.content}
                      </p>
                      <div className="text-xs text-gray-500 mb-3">
                        {format(new Date(msg.updatedAt))}
                      </div>
                    </div>
                  ))}
                  <div ref={messagesEndRef} />
                </>
              ) : (
                <div className="text-center">No messages yet. Start a new conversation with a Hi.</div>
              )}
            </div>
            <div className="sticky bottom-0">
              <form onSubmit={handleSendMessage} className="absolute bottom-0 left-0 right-0 p-4 bg-white border-t border-gray-300 flex items-center">
                <input
                  type="text"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  className="w-full border p-2 rounded mr-2"
                  placeholder="Type your message..."
                />
                <button type="submit" className="bg-teal-600 text-white p-2 rounded">Send</button>
              </form>
            </div>
          </div>
        ) : (
          <p className="text-center">Select a conversation to start chatting</p>
        )}
      </div>
    </div>
  );
};

export default Chat;
