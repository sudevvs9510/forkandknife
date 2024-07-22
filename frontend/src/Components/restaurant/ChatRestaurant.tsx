/* eslint-disable @typescript-eslint/no-explicit-any */

import React, { useEffect, useState, useRef } from 'react';
import { useSelector } from 'react-redux';
import { format } from 'timeago.js';
import { RootState } from '../../redux/app/store';
import { getUserDetails } from '../../api/RestaurantApis';
import { getConversations, getMessages, sendMessage } from '../../api/ChatApis';
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

const RestaurantChat: React.FC = () => {
  const restaurantId = useSelector((state: RootState) => state.restaurantAuth.restaurant._id);
  const [conversations, setConversations] = useState<ConversationType[]>([]);
  const [selectedConversation, setSelectedConversation] = useState<ConversationType | null>(null);
  const [messages, setMessages] = useState<MessageType[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [usernames, setUsernames] = useState<{ [key: string]: string }>({});

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
      socketRef.current = io('http://localhost:4000'); // Replace with your server URL

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
  }, [restaurantId, selectedConversation]);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedConversation && restaurantId && newMessage) {
      await sendMessage(selectedConversation._id, restaurantId, newMessage);
      // setMessages((prevMessages) => [...prevMessages, message]);
      setNewMessage('');

      socketRef.current?.emit('chat message', {
        senderId: restaurantId,
        receiverId: selectedConversation.members.find((member) => member !== restaurantId),
        content: newMessage,
        conversationId: selectedConversation._id,
      });
    }
  };

  const handleSelectConversation = (conv: ConversationType) => {
    setSelectedConversation(conv);
    if (socketRef.current) {
      console.log('Joining conversation room:', conv._id);
      socketRef.current.emit('join conversation', conv._id);
    }
  };

  if (!restaurantId) {
    return <div>Please log in</div>;
  }

  return (
    <div className="flex h-screen">
      {/* Conversations Section */}
      <div className="w-1/5 border-r border-gray-300 p-4">
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

      {/* Messages Section */}
      <div className="w-full p-4 flex flex-col bg-teal-50">
        {selectedConversation ? (
          <div className="flex flex-col h-full relative">
            <div className="flex-1 overflow-y-auto mb-16 bg-teal-200 bg-opacity-20">
              {messages.length > 0 ? (
                messages.map((msg) => (
                  <div key={msg._id} className={`p-2 ${msg.sender === restaurantId ? 'text-right' : 'text-left'}`}>
                    <p className={`inline-block px-4 py-2 rounded-lg ${msg.sender === restaurantId ? 'bg-teal-600 text-white' : 'bg-gray-300 text-black'}`}>
                      {msg.content}
                    </p>
                    <div className="text-xs text-gray-500 mb-3">
                      {format(new Date(msg.updatedAt))}
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center">No messages yet. Start a new conversation.</div>
              )}
              <div ref={messagesEndRef} />
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
          <p>Select a conversation to start chatting</p>
        )}
      </div>
    </div>
  );
};

export default RestaurantChat;
