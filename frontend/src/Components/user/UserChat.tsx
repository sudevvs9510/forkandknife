/* eslint-disable @typescript-eslint/no-explicit-any */
// /* eslint-disable @typescript-eslint/no-explicit-any */

// import React, { useEffect, useState, useRef } from 'react';
// import { RootState, useAppSelector, useAppDispatch } from '../../redux/app/store';
// import { getConversations, getMessages, sendMessage } from '../../api/ChatApis';
// import { fetchRestaurants, selectRestaurants } from '../../redux/reducers/userSlices/RestaurantSearchSlice';
// import { format } from 'timeago.js';
// import { io, Socket } from 'socket.io-client';
// import { IoIosSend, IoMdClose } from 'react-icons/io';
// import { useLocation } from 'react-router-dom';

// interface ConversationType {
//   _id: string;
//   members: string[];
// }

// interface MessageType {
//   _id: string;
//   conversationId: string;
//   sender: string;
//   content: string;
//   createdAt: string;
//   updatedAt: string;
// }

// const Chat: React.FC = () => {
//   const dispatch = useAppDispatch();
//   const userId = useAppSelector((state: RootState) => state.userAuth.user?._id);
//   const restaurants = useAppSelector(selectRestaurants);
//   const location = useLocation();
//   const conversationIdFromLocation = location.state?.conversationId || null;

//   const [conversations, setConversations] = useState<ConversationType[]>([]);
//   const [selectedConversation, setSelectedConversation] = useState<ConversationType | null>(null);
//   const [messages, setMessages] = useState<MessageType[]>([]);
//   const [newMessage, setNewMessage] = useState('');

//   const messagesEndRef = useRef<HTMLDivElement>(null);
//   const socketRef = useRef<Socket | null>(null);

//   useEffect(() => {
//     const fetchConversations = async () => {
//       if (userId) {
//         try {
//           const data = await getConversations(userId);
//           setConversations(data);
//           if (conversationIdFromLocation) {
//             const conversation = data.find((conv: { _id: any; }) => conv._id === conversationIdFromLocation);
//             if (conversation) {
//               setSelectedConversation(conversation);
//             }
//           }
//         } catch (error) {
//           console.error('Error fetching conversations:', error);
//         }
//       }
//     };
//     fetchConversations();
//   }, [userId, conversationIdFromLocation]);

//   useEffect(() => {
//     if (selectedConversation) {
//       const fetchMessages = async () => {
//         const data = await getMessages(selectedConversation._id);
//         setMessages(data);
//       };
//       fetchMessages();
//     }
//   }, [selectedConversation]);

//   useEffect(() => {
//     dispatch(fetchRestaurants());
//   }, [dispatch]);

//   useEffect(() => {
//     if (messagesEndRef.current) {
//       messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
//     }
//   }, [messages]);

//   useEffect(() => {
//     if (userId) {
//       socketRef.current = io('http://localhost:4000');

//       socketRef.current.on('connect', () => {
//         console.log('Connected to socket server');
//       });

//       socketRef.current.on('chat message', (message: MessageType) => {
//         console.log('Received message:', message);
//         if (message.conversationId === selectedConversation?._id) {
//           setMessages((prevMessages) => [...prevMessages, message]);
//         }
//       });

//       socketRef.current.on('disconnect', () => {
//         console.log('Disconnected from socket server');
//       });

//       return () => {
//         socketRef.current?.disconnect();
//       };
//     }
//   }, [userId, selectedConversation]);

//   const getRestaurantDetails = (restaurantId: string) => {
//     const restaurant = restaurants.find((res) => res._id === restaurantId);
//     return restaurant
//       ? { name: restaurant.restaurantName, image: restaurant.featuredImage }
//       : { name: restaurantId, image: '' };
//   };

//   const handleSendMessage = async (e: React.FormEvent) => {
//     e.preventDefault();
//     if (selectedConversation && userId && newMessage) {
//       await sendMessage(selectedConversation._id, userId, newMessage);
//       setNewMessage('');
//       socketRef.current?.emit('chat message', {
//         senderId: userId,
//         receiverId: selectedConversation.members.find((member) => member !== userId),
//         content: newMessage,
//         conversationId: selectedConversation._id,
//       });
//     }
//   };

//   const handleSelectConversation = (conv: ConversationType) => {
//     setSelectedConversation(conv);
//     if (socketRef.current) {
//       console.log('Joining conversation room:', conv._id);
//       socketRef.current.emit('join conversation', conv._id);
//     }
//   };

//   const handleCloseConversation = () => {
//     setSelectedConversation(null);
//   };

//   if (!userId) {
//     return <div>Please log in</div>;
//   }

//   return (
//     <div className="flex flex-col h-screen md:flex-row top-10">
//       {/* User Section */}
//       <div
//         className={`fixed top-14  left-0 mt-[70px] bg-white border-r border-gray-300 p-4 md:static md:w-1/3 lg:w-1/4 xl:w-1/5`}
//       >
//         <h2 className="text-2xl font-bold mb-4">Messages</h2>
//         <div>
//           <ul>
//             {conversations.map((conv) => (
//               <li
//                 key={conv._id}
//                 className={`p-2 border mb-1 rounded-lg bg-teal-50 font-medium cursor-pointer ${selectedConversation?._id === conv._id ? 'bg-gray-200' : ''}`}
//                 onClick={() => handleSelectConversation(conv)}
//               >
//                 {conv.members.filter((member) => member !== userId).map((restaurantId) => {
//                   const { name, image } = getRestaurantDetails(restaurantId);
//                   return (
//                     <div key={restaurantId} className="flex items-center">
//                       {image && <img src={image} alt={name} className="w-10 h-10 rounded-full mr-2" />}
//                       <span>{name}</span>
//                     </div>
//                   );
//                 })}
//               </li>
//             ))}
//           </ul>
//         </div>
//       </div>

//       {/* Conversation Section */}
//       <div className={`flex-1 p-4 mt-[70px] bg-white md:ml-1/3 lg:ml-1/4 xl:ml-1/5`}>
//         {selectedConversation ? (
//           <div className="flex flex-col h-full relative">
//             {/* Sticky restaurant name and image section */}
//             <div className="bg-white sticky top-0 flex items-center justify-between border-b border-gray-300">
//               <h2 className="text-2xl font-bold mb-4">
//                 {selectedConversation.members.filter((member) => member !== userId).map((restaurantId) => {
//                   const { name, image } = getRestaurantDetails(restaurantId);
//                   return (
//                     <span key={restaurantId} className="flex items-center">
//                       {image && <img src={image} alt={name} className="w-10 h-10 rounded-full mr-2" />}
//                       {name}
//                     </span>
//                   );
//                 })}
//               </h2>
//               <button
//                 onClick={handleCloseConversation}
//                 className="text-gray-500 hover:text-gray-800"
//               >
//                 <IoMdClose size={24} />
//               </button>
//             </div>

//             {/* Message show section */}
//             <div className="flex-1 bg-teal-50 overflow-y-auto flex flex-col justify-end">
//               <div className="flex flex-col">
//                 {messages.length > 0 ? (
//                   <>
//                     {messages.map((msg) => (
//                       <div key={msg._id} className={`p-1 ${msg.sender === userId ? 'text-right' : 'text-left'}`}>
//                         <p className={`inline-block px-4 py-2 rounded-lg ${msg.sender === userId ? 'bg-teal-600 text-white' : 'bg-gray-300 text-black'}`}>
//                           {msg.content}
//                         </p>
//                         <div className="text-xs text-gray-500 mb-3">
//                           {format(new Date(msg.updatedAt))}
//                         </div>
//                       </div>
//                     ))}
//                   </>
//                 ) : (
//                   <div className="text-center pb-10">No messages yet. Start a new conversation with a Hi.</div>
//                 )}
//               </div>
//               <div ref={messagesEndRef} />
//             </div>

//             <div className="sticky bottom-0 bg-white border-t border-gray-300">
//               <form onSubmit={handleSendMessage} className="p-4 flex items-center">
//                 <input
//                   type="text"
//                   value={newMessage}
//                   onChange={(e) => setNewMessage(e.target.value)}
//                   className="flex-1 p-2 border border-gray-300 rounded-l-md"
//                   placeholder="Type a message..."
//                 />
//                 <button
//                   type="submit"
//                   className="p-2 bg-teal-600 text-white rounded-r-md"
//                   disabled={!newMessage.trim()}
//                 >
//                   <IoIosSend size={24} />
//                 </button>
//               </form>
//             </div>
//           </div>
//         ) : (
//           <div className="font-bold mt-10 text-center text-lg ">Select a restaurant to start messaging.</div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Chat;




import React, { useEffect, useState, useRef } from 'react';
import { RootState, useAppSelector, useAppDispatch } from '../../redux/app/store';
import { getConversations, getMessages, sendMessage } from '../../api/ChatApis';
import { fetchRestaurants, selectRestaurants } from '../../redux/reducers/userSlices/RestaurantSearchSlice';
import { format } from 'timeago.js';
import { io, Socket } from 'socket.io-client';
import { IoIosSend, IoMdClose } from 'react-icons/io';
import { useLocation } from 'react-router-dom';

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
  const location = useLocation();
  const conversationIdFromLocation = location.state?.conversationId || null;

  const [conversations, setConversations] = useState<ConversationType[]>([]);
  const [selectedConversation, setSelectedConversation] = useState<ConversationType | null>(null);
  const [messages, setMessages] = useState<MessageType[]>([]);
  const [onlineUsers, setOnlineUsers] = useState<string[]>([])
  const [newMessage, setNewMessage] = useState('');

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const socketRef = useRef<Socket | null>(null);

  useEffect(() => {
    const fetchConversations = async () => {
      if (userId) {
        try {
          const data = await getConversations(userId);
          setConversations(data);
          if (conversationIdFromLocation) {
            const conversation = data.find((conv: { _id: any; }) => conv._id === conversationIdFromLocation);
            if (conversation) {
              setSelectedConversation(conversation);
            }
          }
        } catch (error) {
          console.error('Error fetching conversations:', error);
        }
      }
    };
    fetchConversations();
  }, [userId, conversationIdFromLocation]);

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
    // Scroll to the bottom of the messages when they are updated
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  useEffect(() => {
    if (userId) {
      socketRef.current = io('http://localhost:4000');
      socketRef.current.emit("join", userId)

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
        }
      });

      socketRef.current.on('disconnect', () => {
        console.log('Disconnected from socket server');
      });

      return () => {
        socketRef.current?.emit('remove_online', userId)
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
      console.log('Joining conversation room:', conv._id);
      socketRef.current.emit('join conversation', conv._id);
    }
  };

  const handleCloseConversation = () => {
    setSelectedConversation(null);
  };

  if (!userId) {
    return <div>Please log in</div>;
  }

  return (
    <div className="flex flex-col h-screen md:flex-row top-10">
      {/* User Section */}
      <div
        className={`fixed top-14  left-0 mt-[70px] bg-white border-r border-gray-300 p-4 md:static md:w-1/3 lg:w-1/4 xl:w-1/5`}
      >
        <h2 className="text-2xl font-bold mb-4">Messages</h2>
        <div>
          <ul>
            {conversations.map((conv) => (
              <li
                key={conv._id}
                className={`p-2 border mb-1 rounded-lg bg-teal-50 font-medium cursor-pointer ${selectedConversation?._id === conv._id ? 'bg-gray-200' : ''}`}
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
      </div>

      {/* Conversation Section */}
      <div className={`flex-1 w-full p-4 mt-[70px] bg-white md:ml-1/3 lg:ml-1/4 xl:ml-1/5`}>
        {selectedConversation ? (
          <div className="flex flex-col xl:h-full h-full relative">
            {/* Sticky restaurant name and image section */}
            <div className="bg-white flex items-center justify-between border-b border-gray-300">
              <h2 className="text-2xl font-bold mb-4">
                {selectedConversation.members.filter((member) => member !== userId).map((restaurantId) => {
                  const { name, image } = getRestaurantDetails(restaurantId);
                  return (
                    <span key={restaurantId} className="flex items-end">

                        {image && <img src={image} alt={name} className="w-10 h-10 rounded-full mb-1 me-2" />}
                        {name}

                      <span className="flex items-center ml-2 mb-1">
                        <span
                          className={`inline-block w-2 h-2 rounded-full ${onlineUsers.includes(restaurantId) ? 'bg-green-500' : 'bg-red-500'}`}
                        ></span>
                        <span className="ml-1 text-sm">
                          {onlineUsers.includes(restaurantId) ? 'Online' : 'Offline'}
                        </span>
                      </span>
                    </span>
                  );
                })}
              </h2>
              <button
                onClick={handleCloseConversation}
                className="text-gray-500 hover:text-gray-800"
              >
                <IoMdClose size={24} />
              </button>
            </div>

            {/* Message show section */}
            <div className="flex-1 bg-teal-50 overflow-y-auto flex flex-col justify-end">
              <div className="flex flex-col">
                {messages.length > 0 ? (
                  <>
                    {messages.map((msg) => (
                      <div key={msg._id} className={`p-1 ${msg.sender === userId ? 'text-right' : 'text-left'}`}>
                        <p className={`inline-block px-4 py-2 rounded-lg ${msg.sender === userId ? 'bg-teal-600 text-white' : 'bg-gray-300 text-black'}`}>
                          {msg.content}
                        </p>
                        <div className="text-xs text-gray-500 mb-3">
                          {format(new Date(msg.updatedAt))}
                        </div>
                      </div>
                    ))}
                  </>
                ) : (
                  <div className="text-center pb-10">No messages yet. Start a new conversation with a Hi.</div>
                )}
              </div>
              <div ref={messagesEndRef} />
            </div>

            <div className="sticky bottom-0 bg-white border-t border-gray-300">
              <form onSubmit={handleSendMessage} className="p-4 flex items-center">
                <input
                  type="text"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  className="flex-1 p-2 border border-gray-300 rounded-lg"
                  placeholder="Type a message..."
                />
                <button
                  type="submit"
                  className="ml-2 p-2 bg-teal-600 text-white rounded-full hover:bg-teal-700 focus:outline-none"
                >
                  <IoIosSend size={24} />
                </button>
              </form>
            </div>
          </div>
        ) : (
          <div className="text-center text-2xl font-bold">Select a conversation</div>
        )}
      </div>
    </div>
  );
};

export default Chat;
