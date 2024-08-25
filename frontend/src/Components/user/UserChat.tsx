/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */

// import React, { useEffect, useState, useRef } from 'react';
// import { RootState, useAppSelector, useAppDispatch } from '../../redux/app/store';
// import { getConversations, getMessages, sendMessage } from '../../api/ChatApis';
// import { fetchRestaurants, selectRestaurants } from '../../redux/reducers/userSlices/RestaurantSearchSlice';
// import { format } from 'timeago.js';
// import { io, Socket } from 'socket.io-client';
// import { IoIosSend, IoMdClose } from 'react-icons/io';
// import { useLocation } from 'react-router-dom';
// import { BsCheck, BsCheck2All } from 'react-icons/bs';

// interface ConversationType {
//   _id: string;
//   members: string[];
// }

// interface UnseenMessageType {
//   _id: string;
//   count: number;
// }

// interface MessageType {
//   _id: string;
//   conversationId: string;
//   senderId?: string;
//   receiverId?: string
//   sender: string;
//   content: string;
//   seen: boolean;
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
//   const [onlineUsers, setOnlineUsers] = useState<string[]>([])
//   const [newMessage, setNewMessage] = useState('');

//   const [filteredConversations, setFilteredConversations] = useState<ConversationType[]>([]);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [unseenMessage, setUnseenMessage] = useState<UnseenMessageType[]>([])

//   const messagesEndRef = useRef<HTMLDivElement>(null);
//   const socketRef = useRef<Socket | null>(null);

//   console.log(messages)
//   console.log(conversations)
//   console.log(unseenMessage)
//   // Fetch conversations
//   useEffect(() => {
//     const fetchConversations = async () => {
//       if (userId) {
//         try {
//           const data = await getConversations(userId);
//           setConversations(data.conversation);
//           setUnseenMessage(data.unseenMessageCount)
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



//   // Fetch messages when a conversation is selected
//   useEffect(() => {
//     if (selectedConversation) {
//       const fetchMessages = async () => {
//         try {
//           const data = await getMessages(selectedConversation._id);
//           setMessages(data);
//         } catch (error) {
//           console.log("Error fetching messages", error)
//         }
//       }
//       fetchMessages();
//     }
//   }, [selectedConversation]);


//   //fetch restaurants
//   useEffect(() => {
//     dispatch(fetchRestaurants());
//   }, [dispatch]);

//   //auto scroll to the latest message
//   useEffect(() => {
//     if (messagesEndRef.current) {
//       messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
//     }
//   }, [messages]);



//   //user chat socket connection
//   useEffect(() => {
//     if (userId) {
//       socketRef.current = io('http://localhost:4000');
//       socketRef.current.emit("join", userId)

//       socketRef.current.on('connect', () => {
//         console.log('Connected to socket server');
//       });

//       socketRef.current.on("return_online", (data) => {
//         console.log(data)
//         setOnlineUsers(data)
//       })

//       socketRef.current.on("online_update", (data) => {
//         setOnlineUsers(data)
//       })

//       socketRef.current.on('chat message', (message: MessageType) => {
//         if (message.conversationId === selectedConversation?._id) {
//           setMessages((prevMessages) => [...prevMessages, message])
//           const restoId = selectedConversation.members.find(item => item !== userId)!
//           socketRef.current?.emit("set_messages_seen", { sender: restoId, conversationId: selectedConversation._id, currentId: userId });
//         } else {
//           let msg = unseenMessage.find(value => value._id === message.conversationId)
//           console.log(msg,unseenMessage,":::::::",message)
//           if (!msg) msg = { _id: message.conversationId, count: 1 };
//           else msg.count += 1;
//           setUnseenMessage([msg, ...unseenMessage.filter((value) => value._id !== msg._id)])
//         }
//         const conv = conversations.find(value => value._id === message.conversationId)
//         conv && setConversations([conv, ...conversations.filter(value => value._id !== conv._id)])
//       });


//       socketRef.current.on('disconnect', () => {
//         console.log('Disconnected from socket server');
//       });

//       return () => {
//         socketRef.current?.emit('remove_online', userId)
//         socketRef.current?.disconnect();
//       };
//     }
//   }, [userId, selectedConversation,unseenMessage]);

//   useEffect(() => {
//     if (socketRef.current) {
//       socketRef.current.on("set_messages_seen", () => {
//         if (messages.length > 0) {
//           const seenMessage = [...messages]
//           for (const msg of messages) {
//             if (msg.sender === userId) {
//               msg.seen = true
//             }
//           }
//           setMessages(seenMessage)
//         }
//       })
//     }
//   }, [messages, userId])


//   useEffect(() => {
//     if (selectedConversation && userId) {
//       const restoId = selectedConversation?.members.filter(item => item !== userId)[0]
//       socketRef.current?.emit("set_messages_seen", { sender: restoId, conversationId: selectedConversation._id, currentId: userId })
//     }
//   }, [selectedConversation, userId])



//   //restaurant search  
//   useEffect(() => {
//     if (searchTerm) {
//       const filtered = conversations.filter((conv) => {
//         const restaurantId = conv.members.filter((member) => member !== userId)[0];
//         const restaurant = getRestaurantDetails(restaurantId);
//         return restaurant.name.toLowerCase().includes(searchTerm.toLowerCase());
//       });
//       setFilteredConversations(filtered);
//     } else {
//       setFilteredConversations(conversations);
//     }
//   }, [searchTerm, conversations, userId]);



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
//       const message: MessageType = {
//         senderId: userId + "",
//         receiverId: selectedConversation.members.find((member) => member !== userId),
//         content: newMessage,
//         conversationId: selectedConversation._id,
//         _id: '',
//         sender: userId,
//         seen: false,
//         createdAt: '',
//         updatedAt: ''
//       }
//       socketRef.current?.emit('chat message', message);
//       setMessages([...messages, message])
//       const conv = conversations.find(value => value._id === message.conversationId)
//       conv && setConversations([conv, ...conversations.filter(value => value._id !== conv._id)])
//     }
//   };

//   const handleSelectConversation = (conv: ConversationType) => {
//     setSelectedConversation(conv);
//     setUnseenMessage([...unseenMessage].filter((value => value._id !== conv._id)))
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

//         {/* Search Input */}
//         <input
//           type="text"
//           value={searchTerm}
//           onChange={(e) => setSearchTerm(e.target.value)}
//           className="w-full mb-4 p-2 border border-gray-300 rounded-lg"
//           placeholder="Search restaurants..."
//         />

//         <div>
//           {filteredConversations.length > 0 ? (
//             <ul>
//               {filteredConversations.map((conv) => (
//                 <li
//                   key={conv._id}
//                   className={`p-2 border mb-1 rounded-lg bg-teal-50 font-medium cursor-pointer ${selectedConversation?._id === conv._id ? 'bg-gray-200' : ''}`}
//                   onClick={() => handleSelectConversation(conv)}
//                 >

//                   {conv.members.filter((member) => member !== userId).map((restaurantId) => {
//                     const { name, image } = getRestaurantDetails(restaurantId);
//                     return (
//                       <div key={restaurantId} className="flex items-center">
//                         {image && <img src={image} alt={name} className="w-10 h-10 rounded-full mr-2" />}
//                         <span>{name}</span>

//                         {unseenMessage.length > 0 && (
//                           <span className="bg-teal-600 text-white rounded-full px-2 ml-auto">
//                             {unseenMessage.find(value => value._id === conv._id)?.count || ""}
//                           </span>
//                         )}

//                       </div>
//                     );
//                   })}
//                 </li>
//               ))}
//             </ul>
//           ) : (

//             <div className="p-4 text-center text-gray-500">
//               No search results
//             </div>
//           )}
//         </div>
//       </div>

//       {/* Conversation Section */}
//       <div className={`flex-1 w-full p-4 mt-[70px] bg-white md:ml-1/3 lg:ml-1/4 xl:ml-1/5`}>
//         {selectedConversation ? (
//           <div className="flex flex-col xl:h-full h-full relative">
//             {/* Sticky restaurant name and image section */}
//             <div className="bg-white flex items-center justify-between border-b border-gray-300">
//               <h2 className="text-2xl font-bold mb-4">
//                 {selectedConversation.members.filter((member) => member !== userId).map((restaurantId) => {
//                   const { name, image } = getRestaurantDetails(restaurantId);
//                   return (
//                     <span key={restaurantId} className="flex items-end">

//                       {image && <img src={image} alt={name} className="w-10 h-10 rounded-full mb-1 me-2" />}
//                       {name}

//                       <span className="flex items-center ml-2 mb-1">
//                         <span
//                           className={`inline-block w-2 h-2 rounded-full ${onlineUsers.includes(restaurantId) ? 'bg-green-500' : 'bg-red-500'}`}
//                         ></span>
//                         <span className="ml-1 text-sm">
//                           {onlineUsers.includes(restaurantId) ? 'Online' : 'Offline'}
//                         </span>
//                       </span>
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

//             {/* user chatMessage show section */}
//             <div className="flex-1 bg-teal-50 overflow-y-auto flex flex-col justify-end">
//               <div className="flex flex-col">
//                 {messages.length > 0 ? (
//                   <>
//                     {messages.map((msg) => (
//                       <div key={msg._id} className="p-1">
//                         {msg.sender === userId ? (
//                           // User messages
//                           <div className="text-right self-end">
//                             <span className="inline-block max-w-full break-words px-4 py-2 rounded-lg bg-teal-600 text-white text-left">
//                               {msg.content}

//                               <small className="flex text-right text-white mt-1 items-center justify-end space-x-1">
//                                 {msg.seen ? (
//                                   <>
//                                     <BsCheck2All /> <span>Seen</span>
//                                   </>
//                                 ) : (
//                                   <>
//                                     <BsCheck /> <span>Delivered</span>
//                                   </>
//                                 )}
//                               </small>
//                             </span>
//                             <small className="block text-gray-500 mt-1">
//                               {format(msg.createdAt)}
//                             </small>
//                           </div>
//                         ) : (
//                           // Restaurant messages
//                           <div className="text-left  self-start">
//                             <span className="inline-block max-w-full break-words px-4 py-2 rounded-lg bg-gray-300 text-black">
//                               {msg.content}
//                             </span>
//                             <small className="block text-gray-500 mt-1">
//                               {format(msg.createdAt)}
//                             </small>
//                           </div>
//                         )}
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
//                   className="flex-1 p-2 border border-gray-300 rounded-lg"
//                   placeholder="Type a message..."
//                 />
//                 <button
//                   type="submit"
//                   className="ml-2 p-2 bg-teal-600 text-white rounded-full hover:bg-teal-700 focus:outline-none"
//                 >
//                   <IoIosSend size={24} />
//                 </button>
//               </form>
//             </div>
//           </div>
//         ) : (
//           <div className="text-center text-2xl font-bold">Select a conversation</div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Chat;
















import React, { useRef, useEffect, useState } from 'react';
import { IoIosSend, IoMdClose } from 'react-icons/io';
import { BsCheck, BsCheck2All } from 'react-icons/bs';
import { format } from 'timeago.js';
import { UserChatHooks } from '../../hooks/UserChatHooks'; 
import { RootState, useAppSelector } from '../../redux/app/store';
import dayjs from 'dayjs'; 

const Chat: React.FC = () => {
  const userId = useAppSelector((state: RootState) => state.userAuth.user?._id);
  
  const {
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
    getRestaurantDetails
  } = UserChatHooks();

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [isMobileView, setIsMobileView] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobileView(window.innerWidth < 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  if (!userId) {
    return <div>Please log in</div>;
  }

  const formatDate = (date: string) => {
    return dayjs(date).format('MMM D, YYYY');
  };

  const shouldShowDate = (currentMessageDate: string, previousMessageDate?: string) => {
    if (!previousMessageDate) return true; 
    return dayjs(currentMessageDate).isAfter(dayjs(previousMessageDate), 'day');
  };

  return (
    // <div className="flex flex-col h-screen md:flex-row top-10">
    <div className="flex flex-col h-screen md:flex-row">
      {/* User Section */}
      {!selectedConversation || !isMobileView ? (
        <div className={`fixed top-14 left-0 mt-[70px] bg-white border-r border-gray-300 p-4 md:static md:w-1/3 lg:w-1/4 xl:w-1/5`}>
          <h2 className="text-2xl font-bold mb-4">Messages</h2>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search..."
            className="mb-4 p-2 border border-gray-300 rounded-lg w-full"
          />
          <div className="overflow-y-auto">
            {filteredConversations.length > 0 ? (
              <ul>
                {filteredConversations.map((conv) => (
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
                          {unseenMessage.length > 0 && (
                            <span className="bg-teal-600 text-white rounded-full px-2 ml-auto">
                              {unseenMessage.find(value => value._id === conv._id)?.count || ""}
                            </span>
                          )}
                        </div>
                      );
                    })}
                  </li>
                ))}
              </ul>
            ) : (
              <div className="p-4 text-center text-gray-500">
                No search results
              </div>
            )}
          </div>
        </div>
      ) : null}

      {/* Conversation Section */}
      <div className={`flex-1 w-full p-4 mt-[70px] bg-white md:ml-1/3 lg:ml-1/4 xl:ml-1/5 flex flex-col ${isMobileView && selectedConversation ? 'block' : 'hidden'} md:block`}>
        {selectedConversation ? (
          <div className="flex flex-col h-full">
            {/* Sticky restaurant name and image section */}
            <div className="bg-white flex items-center justify-between border-b border-gray-300 sticky top-0 z-10">
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

            {/* User chat messages show section */}
            <div className="flex-1 bg-teal-50 overflow-y-auto flex flex-col-reverse">
              <div className="flex-1">
                {messages.length > 0 ? (
                  <>
                    {messages.map((msg, index) => {
                      const previousMessage = messages[index - 1];
                      const showDate = shouldShowDate(msg.createdAt, previousMessage?.createdAt);
                      return (
                        <React.Fragment key={msg._id}>
                          {showDate && (
                            <div className="text-center my-2">
                              <span className=" text-gray-600 px-2 py-1 rounded-full">
                                {formatDate(msg.createdAt)}
                              </span>
                            </div>
                          )}
                          <div className="p-1">
                            {msg.sender === userId ? (
                              // User messages
                              <div className="text-right self-end">
                                <span className="inline-block max-w-full break-words px-4 py-2 rounded-lg bg-teal-600 text-white text-left">
                                  {msg.content}
                                  <small className="flex text-right text-white mt-1 items-center justify-end space-x-1">
                                    {msg.seen ? (
                                      <>
                                        <BsCheck2All /> <span>Seen</span>
                                      </>
                                    ) : (
                                      <>
                                        <BsCheck /> <span>Delivered</span>
                                      </>
                                    )}
                                  </small>
                                </span>
                                <small className="block text-gray-500 mt-1">
                                  {format(msg.createdAt)}
                                </small>
                              </div>
                            ) : (
                              // Restaurant messages
                              <div className="text-left self-start">
                                <span className="inline-block max-w-full break-words px-4 py-2 rounded-lg bg-gray-300 text-black">
                                  {msg.content}
                                </span>
                                <small className="block text-gray-500 mt-1">
                                  {format(msg.createdAt)}
                                </small>
                              </div>
                            )}
                          </div>
                        </React.Fragment>
                      );
                    })}
                  </>
                ) : (
                  <div className="text-center pb-10">No messages yet. Start a new conversation with a Hi.</div>
                )}
                <div ref={messagesEndRef} />
              </div>
            </div>

            <div className="bg-white border-t border-gray-300">
              <form onSubmit={(e) => { e.preventDefault(); handleSendMessage(newMessage); }} className="p-4 flex items-center">
                <input
                  type="text"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  className="flex-1 p-2 border border-gray-300 rounded-lg"
                  placeholder="Type a message..."
                />
                <button
                  type="submit"
                  className="ml-2 p-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 focus:outline-none"
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
