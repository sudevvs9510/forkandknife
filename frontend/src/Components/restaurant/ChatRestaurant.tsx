/* eslint-disable @typescript-eslint/no-explicit-any */



import React, { useEffect, useState, useRef } from 'react';
import { useSelector } from 'react-redux';
import { format } from 'timeago.js';
import { RootState } from '../../redux/app/store';
import { getUserDetails } from '../../api/RestaurantApis';
import { getConversations, getMessages, sendMessage } from '../../api/ChatApis';
import { io, Socket } from 'socket.io-client';
import { IoIosSend } from 'react-icons/io';
import { IoClose } from 'react-icons/io5';
// import authAxios from '../../redux/api/authApi';

interface ConversationType {
  _id: string;
  members: string[];
}

interface MessageType {
  _id: string;
  conversationId: string;
  senderId?: string;
  receiverId?: string
  sender: string;
  content: string;
  seen: boolean;
  createdAt: string;
  updatedAt: string;

}

interface UserDetails {
  username: string;
  email: string;
}

const RestaurantChat: React.FC = () => {
  const restaurantId = useSelector((state: RootState) => state.restaurantAuth.restaurant._id);
  const [conversations, setConversations] = useState<ConversationType[]>([]);
  const [selectedConversation, setSelectedConversation] = useState<ConversationType | null>(null);
  const [messages, setMessages] = useState<MessageType[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [usernames, setUsernames] = useState<{ [key: string]: string }>({});
  const [selectedUser, setSelectedUser] = useState<UserDetails | null>(null);
  const [showMessages, setShowMessages] = useState<boolean>(false);
  const [onlineUsers, setOnlineUsers] = useState<string[]>([])

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const socketRef = useRef<Socket | null>(null);

  useEffect(() => {
    const fetchConversations = async () => {
      if (restaurantId) {
        try {
          const data = await getConversations(restaurantId);

          const userPromises = data.map(async (conv: { members: any[]; }) => {
            const userId = conv.members.find((member: any) => member !== restaurantId);
            if (userId) {
              const userDetails = await getUserDetails(userId);
              return { [userId]: userDetails.username };
            }
            return {};
          });

          const users = await Promise.all(userPromises);
          const usernamesMap = Object.assign({}, ...users);
          setUsernames(usernamesMap);
          setConversations(data);
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
      };
      fetchMessages();
    }
  }, [selectedConversation]);

  useEffect(() => {
    if (restaurantId) {
      socketRef.current = io('http://localhost:4000');

      socketRef.current.emit("join", restaurantId)

      socketRef.current.on('connect', () => {
        console.log('Connected to socket server');
      });

      socketRef.current.on("return_online", (data) => {
        console.log(data)
        setOnlineUsers(data)
      })

      socketRef.current.on("online_update", (data) => {
        setOnlineUsers(data)
      })

      socketRef.current.on('chat message', (message: MessageType) => {
        console.log('Received message:', message);
        if (message.conversationId === selectedConversation?._id) {
          setMessages((prevMessages) => [...prevMessages, message]);
          const userId = selectedConversation?.members.filter(item => item !== restaurantId)[0]
          socketRef.current?.emit("set_messages_seen", { sender: userId, conversationId: selectedConversation._id, currentId: restaurantId })
        }
      });



      socketRef.current.on('disconnect', () => {
        console.log('Disconnected from socket server');
      });

      return () => {
        socketRef.current?.emit('remove_online', restaurantId)
        socketRef.current?.disconnect();
      };
    }
  }, [restaurantId, selectedConversation]);

  useEffect(() => {
    if (socketRef.current) {
      socketRef.current.on("set_messages_seen", () => {
        if (messages.length > 0) {
          const seenMessage = [...messages]
          for (const msg of messages) {
            if (msg.sender === restaurantId) {
              msg.seen = true
            }
          }
          setMessages(seenMessage)
        }

      })
    }
  }, [messages, restaurantId])


  useEffect(() => {
    if (selectedConversation && restaurantId) {
      const restoId = selectedConversation?.members.filter(item => item !== restaurantId)[0]
      socketRef.current?.emit("set_messages_seen", { sender: restoId, conversationId: selectedConversation._id, currentId: restaurantId })
    }
  }, [selectedConversation, restaurantId])

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }

  }, [messages]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedConversation && restaurantId && newMessage) {
      if (selectedConversation && restaurantId && newMessage) {
        await sendMessage(selectedConversation._id, restaurantId, newMessage);
        setNewMessage('');
        const message: MessageType = {
          senderId: restaurantId + "",
          receiverId: selectedConversation.members.find((member) => member !== restaurantId),
          content: newMessage,
          conversationId: selectedConversation._id,
          _id: '',
          sender: restaurantId,
          seen: false,
          createdAt: '',
          updatedAt: ''
        }
        socketRef.current?.emit('chat message', message);

        setMessages([...messages, message])
      }
    }
  };

  const handleSelectConversation = async (conv: ConversationType) => {
    setSelectedConversation(conv);
    const userId = conv.members.find((member) => member !== restaurantId);
    if (userId) {
      const userDetails = await getUserDetails(userId);
      setSelectedUser(userDetails);
    }
    setShowMessages(true); // Show message section
    if (socketRef.current) {
      console.log('Joining conversation room:', conv._id);
      socketRef.current.emit('join conversation', conv._id);
    }
  };

  const handleCloseConversation = () => {
    setSelectedConversation(null);
    setMessages([]);
    setSelectedUser(null);
    setShowMessages(false); // Hide message section
  };

  if (!restaurantId) {
    return <div>Please log in</div>;
  }

  return (
    <div className="flex flex-col md:flex-row h-screen">
      {/* User list Section */}
      <div className={`w-full md:w-1/4 border-r border-gray-300 p-2 ${showMessages ? 'hidden md:block' : 'block'}`}>
        <h2 className="text-2xl font-bold mb-4">Chat</h2>
        <ul>
          {conversations.map((conv) => {
            const userId = conv.members.find((member) => member !== restaurantId);
            const username = userId ? usernames[userId] : 'Unknown User';
            return (
              <li
                key={conv._id}
                className={`p-2 border mb-1 rounded-lg bg-teal-50 font-[500] cursor-pointer ${selectedConversation?._id === conv._id ? 'bg-gray-200' : ''}`}
                onClick={() => handleSelectConversation(conv)}
              >
                <div className="flex items-center">
                  <div className="bg-teal-600 text-white rounded-full h-8 w-8 flex items-center justify-center">
                    {username.charAt(0).toUpperCase()}
                  </div>
                  <span className="ml-2">{username}</span>
                </div>
              </li>
            );
          })}
        </ul>
      </div>

      {/* Messages show Section */}
      <div className={`w-full h-full md:flex-2 p-4 bg-teal-50 ${showMessages ? 'block' : 'hidden md:block'}`}>
        {selectedConversation ? (
          <div className="flex flex-col h-full relative">
            {selectedUser && (
              <div className="pt-2 p-4 border border-gray-200 rounded mb-1 flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-bold">{selectedUser.username}</h3>
                  <p>{selectedUser.email}</p>
                  <span className="flex items-center mt-1">
                    <span
                      className={`inline-block w-2 h-2 rounded-full ${onlineUsers.includes(selectedConversation.members.filter(item => item !== restaurantId)[0]) ? 'bg-green-500' : 'bg-red-500'}`}
                    ></span>
                    <span className="ml-2">
                      {onlineUsers.includes(selectedConversation.members.filter(item => item !== restaurantId)[0]) ? 'Online' : 'Offline'}
                    </span>
                  </span>
                </div>
                <button
                  onClick={handleCloseConversation}
                  className="text-gray-600 hover:text-gray-800 transition"
                >
                  <IoClose size={24} />
                </button>
              </div>
            )}
            <div className="flex-1 overflow-y-auto mb-16 bg-teal-200 bg-opacity-20 ">
              {messages.length > 0 ? (
                messages.map((msg) => (
                  <div key={msg._id} className={`p-2 ${msg.sender === restaurantId ? 'text-right' : 'text-left'}`}>
                    <p className={`inline-block px-4 py-2 rounded-lg ${msg.sender === restaurantId ? 'bg-teal-600 text-white' : 'bg-gray-300 text-black'}`}>
                      {msg.content}
                    </p>
                    {msg.sender === restaurantId && (
                      <small className="block text-gray-500 mt-1">
                        {msg.seen ? 'Seen' : 'Delivered'}
                      </small>
                    )}
                    <div className="text-xs text-gray-500 mb-3">
                      {format(new Date(msg.createdAt))}
                    </div>
                  </div>
                ))
              ) : (
                <div className="mt-64 text-center">No messages yet. Start a new conversation.</div>
              )}

              <div ref={messagesEndRef} />
            </div>
            <div className="sticky bottom-0">
              <form onSubmit={handleSendMessage} className="absolute bottom-0 left-0 right-0 p-2 bg-white border-t border-gray-300 flex items-center">
                <input
                  type="text"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  className="w-full border p-2 rounded mr-2"
                  placeholder="Type your message..."
                />
                <button type="submit" className="bg-teal-600 text-white p-2 rounded-lg flex items-center hover:bg-teal-700 transition">
                  <IoIosSend size={20} />
                </button>
              </form>
            </div>
          </div>
        ) : (
          <div className="font-bold mt-10 text-center text-lg">Select a user to start messaging.</div>
        )}
      </div>
    </div>
  );
};

export default RestaurantChat;
