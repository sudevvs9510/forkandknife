// /* eslint-disable @typescript-eslint/no-explicit-any */


// import React, { useEffect, useState, useRef } from 'react';
// import { useSelector } from 'react-redux';
// import { format } from 'timeago.js';
// import { RootState } from '../../redux/app/store';
// import { getUserDetails } from '../../api/RestaurantApis';
// import { getConversations, getMessages, sendMessage } from '../../api/ChatApis';
// import { io, Socket } from 'socket.io-client';
// import { IoIosSend } from 'react-icons/io';
// import { IoClose } from 'react-icons/io5';
// import { BsCheck2, BsCheck2All } from 'react-icons/bs';
// // import authAxios from '../../redux/api/authApi';

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

// interface UserDetails {
//   username: string;
//   email: string;
// }

// const RestaurantChat: React.FC = () => {
//   const restaurantId = useSelector((state: RootState) => state.restaurantAuth.restaurant._id);
//   const [conversations, setConversations] = useState<ConversationType[]>([]);
//   const [selectedConversation, setSelectedConversation] = useState<ConversationType | null>(null);
//   const [messages, setMessages] = useState<MessageType[]>([]);
//   const [newMessage, setNewMessage] = useState('');
//   const [usernames, setUsernames] = useState<{ [key: string]: string }>({});
//   const [selectedUser, setSelectedUser] = useState<UserDetails | null>(null);
//   const [showMessages, setShowMessages] = useState<boolean>(false);
//   const [onlineUsers, setOnlineUsers] = useState<string[]>([])

//   const [filteredConversations, setFilteredConversations] = useState<ConversationType[]>([]);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [unseenMessage, setUnseenMessage] = useState<UnseenMessageType[]>([])

//   const messagesEndRef = useRef<HTMLDivElement>(null);
//   const socketRef = useRef<Socket | null>(null);

//   console.log(messages)
//   console.log(conversations)
//   console.log(unseenMessage)
//   useEffect(() => {
//     const fetchConversations = async () => {
//       if (restaurantId) {
//         try {
//           const data = await getConversations(restaurantId);
//           console.log(data)
//           setConversations(data.conversation);
//           setUnseenMessage(data.unseenMessageCount)
//           const userPromises = data.conversation.map(async (conv: { members: any[]; }) => {
//             const userId = conv.members.find((member: any) => member !== restaurantId);
//             if (userId) {
//               const userDetails = await getUserDetails(userId);
//               return { [userId]: userDetails.username };
//             }
//             return {};
//           });

//           const users = await Promise.all(userPromises);
//           const usernamesMap = Object.assign({}, ...users);
//           setUsernames(usernamesMap);
//           setConversations(data.conversation);
//         } catch (error) {
//           console.error('Error fetching conversations:', error);
//         }
//       }
//     };
//     fetchConversations();
//   }, [restaurantId]);

//   useEffect(() => {
//     if (selectedConversation) {
//       const fetchMessages = async () => {
//         const data = await getMessages(selectedConversation._id);
//         setMessages(data);
//       };
//       fetchMessages();
//     }
//   }, [selectedConversation]);


//   //restaurant chat socket connection 
//   useEffect(() => {
//     if (restaurantId) {
//       socketRef.current = io('http://localhost:4000');

//       socketRef.current.emit("join", restaurantId)

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
//         console.log('Received message:', message);
//         if (message.conversationId === selectedConversation?._id) {
//           setMessages((prevMessages) => [...prevMessages, message]);
//           const userId = selectedConversation?.members.filter(item => item !== restaurantId)[0]
//           socketRef.current?.emit("set_messages_seen", { sender: userId, conversationId: selectedConversation._id, currentId: restaurantId })
//         } else {
//           let msg = unseenMessage.find(value => value._id === message.conversationId)
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
//         socketRef.current?.emit('remove_online', restaurantId)
//         socketRef.current?.disconnect();
//       };
//     }
//   }, [restaurantId, selectedConversation,unseenMessage]);


  
//   useEffect(() => {
//     if (socketRef.current) {
//       socketRef.current.on("set_messages_seen", () => {
//         if (messages.length > 0) {
//           const seenMessage = [...messages]
//           for (const msg of messages) {
//             if (msg.sender === restaurantId) {
//               msg.seen = true
//             }
//           }
//           setMessages(seenMessage)
//         }

//       })
//     }
//   }, [messages, restaurantId])





//   useEffect(() => {
//     if (selectedConversation && restaurantId) {
//       const restoId = selectedConversation?.members.filter(item => item !== restaurantId)[0]
//       socketRef.current?.emit("set_messages_seen", { sender: restoId, conversationId: selectedConversation._id, currentId: restaurantId })
//     }
//   }, [selectedConversation, restaurantId])

//   useEffect(() => {
//     if (messagesEndRef.current) {
//       messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
//     }

//   }, [messages]);

//   useEffect(() => {
//     if (searchTerm) {
//       const filtered = conversations.filter((conv) => {
//         const userId = conv.members.find((member) => member !== restaurantId);
//         const username = userId ? usernames[userId] : 'Unknown User';
//         return username.toLowerCase().includes(searchTerm.toLowerCase());
//       });
//       setFilteredConversations(filtered);
//     } else {
//       setFilteredConversations(conversations);
//     }
//   }, [searchTerm, conversations, restaurantId, usernames]);


//   const handleSendMessage = async (e: React.FormEvent) => {
//     e.preventDefault();
//     if (selectedConversation && restaurantId && newMessage) {
//       if (selectedConversation && restaurantId && newMessage) {
//         await sendMessage(selectedConversation._id, restaurantId, newMessage);
//         setNewMessage('');
//         const message: MessageType = {
//           senderId: restaurantId + "",
//           receiverId: selectedConversation.members.find((member) => member !== restaurantId),
//           content: newMessage,
//           conversationId: selectedConversation._id,
//           _id: '',
//           sender: restaurantId,
//           seen: false,
//           createdAt: '',
//           updatedAt: ''
//         }
//         socketRef.current?.emit('chat message', message);

//         setMessages([...messages, message])
//       }
//     }
//   };

//   const handleSelectConversation = async (conv: ConversationType) => {
//     setSelectedConversation(conv);
//     const userId = conv.members.find((member) => member !== restaurantId);
//     if (userId) {
//       const userDetails = await getUserDetails(userId);
//       setSelectedUser(userDetails);
//     }
//     setShowMessages(true); // Show message section
//     if (socketRef.current) {
//       console.log('Joining conversation room:', conv._id);
//       socketRef.current.emit('join conversation', conv._id);
//     }
//   };

//   const handleCloseConversation = () => {
//     setSelectedConversation(null);
//     setMessages([]);
//     setSelectedUser(null);
//     setShowMessages(false); // Hide message section
//   };

//   if (!restaurantId) {
//     return <div>Please log in</div>;
//   }


//   console.log(messages)
//   console.log(filteredConversations)

//   return (
//     <div className="flex flex-col md:flex-row h-screen overflow-x-hidden">
//       {/* User list Section */}
//       <div className={`max-w-[25%] md:w-2/4 border-r border-gray-300 p-2 ${showMessages ? 'hidden md:block' : 'block'}`}>
//         <h2 className="text-2xl font-bold mb-4">Chat</h2>

//         {/* Search Input */}
//         <input
//           type="text"
//           value={searchTerm}
//           onChange={(e) => setSearchTerm(e.target.value)}
//           className="w-full mb-4 p-2 border border-gray-300 rounded-lg"
//           placeholder="Search users..."
//         />

//         {filteredConversations.length > 0 ? (
//           <ul>
//             {filteredConversations.map((conv) => {
//               const userId = conv.members.find((member) => member !== restaurantId);
//               const username = userId ? usernames[userId] : 'Unknown User';
//               return (
//                 <li
//                   key={conv._id}
//                   className={`p-2 border mb-1 rounded-lg bg-teal-50 font-[500] cursor-pointer ${selectedConversation?._id === conv._id ? 'bg-gray-200' : ''}`}
//                   onClick={() => handleSelectConversation(conv)}
//                 >
//                   <div className="flex items-center">
//                     <div className="bg-teal-600 text-white rounded-full h-8 w-8 flex items-center justify-center">
//                       {username?.charAt(0).toUpperCase()}
//                     </div>
//                     <span className="ml-2">{username}</span>
//                     {unseenMessage.length > 0 && (
//                       <span className="bg-teal-600 text-white rounded-full px-2 ml-auto">
//                         {unseenMessage.find(value => value._id === conv._id)?.count || ""}
//                       </span>
//                     )}
//                   </div>
//                 </li>
//               );
//             })}
//           </ul>
//         ) : (

//           <div className="p-4 text-center text-gray-500">
//             No search results
//           </div>
//         )}
//       </div>

//       {/* Messages show Section */}
//       {/* <div className={`w-full h-full md:flex-2 p-4 bg-teal-50 ${showMessages ? 'block' : 'hidden md:block'}`}>
//         {selectedConversation ? (
//           <div className="flex flex-col h-full relative">
//             {selectedUser && (
//               <div className="pt-2 p-4 border border-gray-200 rounded mb-1 flex items-center justify-between">
//                 <div>
//                   <h3 className="text-xl font-bold">{selectedUser.username}</h3>
//                   <p>{selectedUser.email}</p>
//                   <span className="flex items-center mt-1">
//                     <span
//                       className={`inline-block w-2 h-2 rounded-full ${onlineUsers.includes(selectedConversation.members.filter(item => item !== restaurantId)[0]) ? 'bg-green-500' : 'bg-red-500'}`}
//                     ></span>
//                     <span className="ml-2">
//                       {onlineUsers.includes(selectedConversation.members.filter(item => item !== restaurantId)[0]) ? 'Online' : 'Offline'}
//                     </span>
//                   </span>
//                 </div>
//                 <button
//                   onClick={handleCloseConversation}
//                   className="text-gray-600 hover:text-gray-800 transition"
//                 >
//                   <IoClose size={24} />
//                 </button>
//               </div>
//             )}


//             <div className="flex-1 overflow-y-auto mb-16 bg-teal-200 bg-opacity-20 flex flex-col justify-end">
//               {messages.length > 0 ? (
//                 messages.map((msg) => (
//                   <div key={msg._id} className={`p-2 ${msg.sender === restaurantId ? 'text-right' : 'text-left'}`}>
//                     <span className={`inline-block  px-4 py-2 rounded-lg ${msg.sender === restaurantId ? 'bg-teal-600 text-white' : 'bg-gray-300 text-black'}`}>
//                       {msg.content}
//                       {msg.sender === restaurantId && (
//                         <small className="block text-white mt-1">
//                           {msg.seen ? 'Seen' : 'Delivered'}
//                         </small>
//                       )}
//                     </span>


//                     <div className="text-xs text-gray-500 mb-3">
//                       {format(new Date(msg.createdAt))}
//                     </div>
//                   </div>
//                 ))
//               ) : (
//                 <div className="mt-64 text-center">No messages yet. Start a new conversation.</div>
//               )}

//               <div ref={messagesEndRef} />
//             </div>


//             <div className="sticky bottom-0">
//               <form onSubmit={handleSendMessage} className="absolute bottom-0 left-0 right-0 p-2 bg-white border-t border-gray-300 flex items-center">
//                 <input
//                   type="text"
//                   value={newMessage}
//                   onChange={(e) => setNewMessage(e.target.value)}
//                   className="w-full border p-2 rounded mr-2"
//                   placeholder="Type your message..."
//                 />
//                 <button type="submit" className="bg-teal-600 text-white p-2 rounded-lg flex items-center hover:bg-teal-700 transition">
//                   <IoIosSend size={20} />
//                 </button>
//               </form>
//             </div>
//           </div>
//         ) : (
//           <div className="font-bold mt-10 text-center text-lg">Select a user to start messaging.</div>
//         )}
//       </div> */}


//       {/* Messages show Section */}
//       <div className={`w-full h-full md:flex-2 p-4 bg-teal-50 ${showMessages ? 'block' : 'hidden md:block'}`}>
//         {selectedConversation ? (
//           <div className="flex flex-col h-full w relative">
//             {selectedUser && (
//               <div className="pt-2 p-4 border border-gray-200 rounded mb-1 flex items-center justify-between">
//                 <div>
//                   <h3 className="text-xl font-bold">{selectedUser.username}</h3>
//                   <p>{selectedUser.email}</p>
//                   <span className="flex items-center mt-1">
//                     <span
//                       className={`inline-block w-2 h-2 rounded-full ${onlineUsers.includes(selectedConversation.members.filter(item => item !== restaurantId)[0]) ? 'bg-green-500' : 'bg-red-500'}`}
//                     ></span>
//                     <span className="ml-2">
//                       {onlineUsers.includes(selectedConversation.members.filter(item => item !== restaurantId)[0]) ? 'Online' : 'Offline'}
//                     </span>
//                   </span>
//                 </div>
//                 <button
//                   onClick={handleCloseConversation}
//                   className="text-gray-600 hover:text-gray-800 transition"
//                 >
//                   <IoClose size={24} />
//                 </button>
//               </div>
//             )}

//             {/* Restaurant chat message section */}
//             <div className="flex-1 bg-teal-50 overflow-y-auto flex flex-col justify-end">
//               <div className="flex flex-col">
//                 {messages.length > 0 ? (
//                   <>
//                     {messages.map((msg) => (
//                       <div key={msg._id} className="p-1">
//                         {msg.sender === restaurantId ? (
//                           // Restaurant messages
//                           <div className="text-right self-end">
//                             <span className="inline-block max-w-[50%] break-words px-4 py-2 rounded-lg bg-teal-600 text-white text-left">
//                               {msg.content}

//                               <small className="flex text-right text-white mt-1 items-center justify-end space-x-1">
//                                 {msg.seen ? (
//                                   <>
//                                     <BsCheck2All /> <span>Seen</span>
//                                   </>
//                                 ) : (
//                                   <>
//                                     <BsCheck2 /> <span>Delivered</span>
//                                   </>
//                                 )}
//                               </small>
//                             </span>
//                             <small className="block text-gray-500 mt-1">
//                               {format(msg.createdAt)}
//                             </small>
//                           </div>
//                         ) : (
//                           // User messages
//                           <div className="text-left  self-start">
//                             <span className="inline-block max-w-[50%] break-words px-4 py-2 rounded-lg bg-gray-300 text-black">
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
//           <div className="font-bold mt-10 text-center text-lg">Select a user to start messaging.</div>
//         )}
//       </div>

//     </div>
//   );
// };

// export default RestaurantChat;













// import React, { useRef, useEffect } from 'react';
// import { format } from 'timeago.js';
// import { IoIosSend } from 'react-icons/io';
// import { IoClose } from 'react-icons/io5';
// import { BsCheck2, BsCheck2All } from 'react-icons/bs';
// import { useRestaurantChat } from '../../hooks/RestaurantChatHooks';

// export const RestaurantChat: React.FC = () => {
//   const {
//     restaurantId,
//     filteredConversations,
//     selectedConversation,
//     messages,
//     newMessage,
//     usernames,
//     selectedUser,
//     showMessages,
//     onlineUsers,
//     searchTerm,
//     unseenMessage,
//     setNewMessage,
//     setSearchTerm,
//     handleSendMessage,
//     handleSelectConversation,
//     handleCloseConversation,
//   } = useRestaurantChat();

//   const messagesEndRef = useRef<HTMLDivElement>(null);

//   // Scroll to the bottom when messages change
//   useEffect(() => {
//     if (messagesEndRef.current) {
//       messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
//     }
//   }, [messages]);

//   if (!restaurantId) {
//     return <div className="text-center p-4">Please log in</div>;
//   }

//   return (
//     <div className="flex flex-col md:flex-row h-screen overflow-x-hidden">
//       <div className={`w-full md:w-1/4 border-r border-gray-300 p-4 ${showMessages ? 'hidden md:block' : 'block'}`}>
//         <h2 className="text-2xl font-bold mb-4">Chat</h2>
//         <input
//           type="text"
//           value={searchTerm}
//           onChange={(e) => setSearchTerm(e.target.value)}
//           className="w-full mb-4 p-2 border border-gray-300 rounded-lg"
//           placeholder="Search users..."
//         />
//         {filteredConversations.length > 0 ? (
//           <ul className="space-y-2">
//             {filteredConversations.map((conv) => {
//               const userId = conv.members.find((member) => member !== restaurantId);
//               const username = userId ? usernames[userId] : 'Unknown User';
//               return (
//                 <li
//                   key={conv._id}
//                   className={`p-2 border rounded-lg bg-teal-50 font-medium cursor-pointer ${selectedConversation?._id === conv._id ? 'bg-teal-100' : ''}`}
//                   onClick={() => handleSelectConversation(conv)}
//                 >
//                   <div className="flex items-center">
//                     <div className="bg-teal-600 text-white rounded-full h-8 w-8 flex items-center justify-center">
//                       {username?.charAt(0).toUpperCase()}
//                     </div>
//                     <span className="ml-2">{username}</span>
//                     {unseenMessage.length > 0 && (
//                       <span className="bg-teal-600 text-white rounded-full px-2 ml-auto">
//                         {unseenMessage.find(value => value._id === conv._id)?.count || ""}
//                       </span>
//                     )}
//                   </div>
//                 </li>
//               );
//             })}
//           </ul>
//         ) : (
//           <div className="p-4 text-center text-gray-500">
//             No search results
//           </div>
//         )}
//       </div>

//       <div className={`w-full md:w-3/4 p-4 bg-teal-50 ${showMessages ? 'block' : 'hidden md:block'}`}>
//         {selectedConversation ? (
//           <div className="flex flex-col h-full relative">
//             {/* user details section  */}
//             {selectedUser && (
//               <div className="w-full p-3 border bg-white border-gray-200 rounded mb-4 flex items-center justify-between sticky top-0 z-10">
//                 <div>
//                   <h3 className="text-xl font-bold inline-block pr-1">{selectedUser.username}</h3>
//                   <span>({selectedUser.email})</span>
//                   <span className="flex items-center mt-1">
//                     <span
//                       className={`inline-block w-2 h-2 rounded-full ${onlineUsers.includes(selectedConversation.members.filter(item => item !== restaurantId)[0]) ? 'bg-green-500' : 'bg-red-500'}`}
//                     ></span>
//                     <span className="ml-2">
//                       {onlineUsers.includes(selectedConversation.members.filter(item => item !== restaurantId)[0]) ? 'Online' : 'Offline'}
//                     </span>
//                   </span>
//                 </div>
//                 <button
//                   onClick={handleCloseConversation}
//                   className="text-gray-600 hover:text-gray-800 transition"
//                 >
//                   <IoClose size={24} />
//                 </button>
//               </div>
//             )}

//             <div className="flex-1 overflow-y-auto bg-teal-100 bg-opacity-20 flex flex-col p-4 mb-10">
//               {messages.length > 0 ? (
//                 messages.map((msg) => (
//                   <div key={msg._id} className={`p-2 ${msg.sender === restaurantId ? 'text-right' : 'text-left'}`}>
//                     <span className={`inline-block max-w-[70%] px-4 py-2 rounded-lg ${msg.sender === restaurantId ? 'bg-teal-600 text-white' : 'bg-gray-300 text-black'}`}>
//                       {msg.content}
//                       {msg.sender === restaurantId && (
//                         <small className="block text-white mt-1">
//                           {msg.seen ? (
//                             <span className="flex items-center justify-end">
//                               <BsCheck2All className="mr-1" /> Seen
//                             </span>
//                           ) : (
//                             <span className="flex items-center justify-end">
//                               <BsCheck2 className="mr-1" /> Delivered
//                             </span>
//                           )}
//                         </small>
//                       )}
//                     </span>
//                     <div className="text-xs text-gray-500 mt-1">
//                       {format(new Date(msg.createdAt))}
//                     </div>
//                   </div>
//                 ))
//               ) : (
//                 <div className="mt-64 text-center">No messages yet. Start a new conversation.</div>
//               )}
//               <div ref={messagesEndRef} />
//             </div>

//             <form onSubmit={handleSendMessage} className="absolute bottom-10 left-0 right-0 p-2 bg-white border-t border-gray-300 flex items-center">
//               <input
//                 type="text"
//                 value={newMessage}
//                 onChange={(e) => setNewMessage(e.target.value)}
//                 className="flex-1 border p-2 rounded-l-lg"
//                 placeholder="Type your message..."
//               />
//               <button type="submit" className="bg-teal-600 text-white p-2 rounded-r-lg flex items-center hover:bg-teal-700 transition">
//                 <IoIosSend size={20} />
//               </button>
//             </form>
//           </div>
//         ) : (
//           <div className="font-bold mt-10 text-center text-lg">Select a user to start messaging.</div>
//         )}
//       </div>
//     </div>
//   );
// };




import React, { useRef, useEffect } from 'react';
import { format } from 'timeago.js';
import { IoIosSend } from 'react-icons/io';
import { IoClose } from 'react-icons/io5';
import { BsCheck2, BsCheck2All } from 'react-icons/bs';
import { useRestaurantChat } from '../../hooks/RestaurantChatHooks';

const RestaurantChat: React.FC = () => {
  const {
    restaurantId,
    filteredConversations,
    selectedConversation,
    messages,
    newMessage,
    usernames,
    selectedUser,
    showMessages,
    onlineUsers,
    searchTerm,
    unseenMessage,
    setNewMessage,
    setSearchTerm,
    handleSendMessage,
    handleSelectConversation,
    handleCloseConversation,
  } = useRestaurantChat();

  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Scroll to the bottom when messages change
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  if (!restaurantId) {
    return <div className="text-center p-4">Please log in</div>;
  }

  return (
    <div className="flex flex-col md:flex-row h-screen overflow-x-hidden">
      {/* Sidebar */}
      <div className={`w-full md:w-1/4 border-r border-gray-300 p-4 ${showMessages ? 'hidden md:block' : 'block'}`}>
        <h2 className="text-2xl font-bold mb-4">Chat</h2>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full mb-4 p-2 border border-gray-300 rounded-lg"
          placeholder="Search users..."
        />
        {filteredConversations.length > 0 ? (
          <ul className="space-y-2">
            {filteredConversations.map((conv) => {
              const userId = conv.members.find((member) => member !== restaurantId);
              const username = userId ? usernames[userId] : 'Unknown User';
              return (
                <li
                  key={conv._id}
                  className={`p-2 border rounded-lg bg-teal-50 font-medium cursor-pointer ${selectedConversation?._id === conv._id ? 'bg-teal-100' : ''}`}
                  onClick={() => handleSelectConversation(conv)}
                >
                  <div className="flex items-center">
                    <div className="bg-teal-600 text-white rounded-full h-8 w-8 flex items-center justify-center">
                      {username?.charAt(0).toUpperCase()}
                    </div>
                    <span className="ml-2">{username}</span>
                    {unseenMessage.length > 0 && (
                      <span className="bg-teal-600 text-white rounded-full px-2 ml-auto">
                        {unseenMessage.find(value => value._id === conv._id)?.count || ""}
                      </span>
                    )}
                  </div>
                </li>
              );
            })}
          </ul>
        ) : (
          <div className="p-4 text-center text-gray-500">
            No search results
          </div>
        )}
      </div>

      {/* Chat Section */}
      <div className={`w-full md:w-3/4 flex flex-col h-full ${showMessages ? 'block' : 'hidden md:block'}`}>
        {selectedConversation ? (
          <div className="flex flex-col h-full">
            {/* User Details Section */}
            {selectedUser && (
              <div className="w-full p-3 border bg-white border-gray-200 rounded mb-4 flex items-center justify-between sticky top-0 z-10">
                <div>
                  <h3 className="text-xl font-bold inline-block pr-1">{selectedUser.username}</h3>
                  <span>({selectedUser.email})</span>
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

            {/* Messages Section */}
            <div className="flex-1 overflow-y-auto p-4 bg-teal-100 bg-opacity-20D">
              {messages.length > 0 ? (
                messages.map((msg) => (
                  <div key={msg._id} className={`p-2 ${msg.sender === restaurantId ? 'text-right' : 'text-left'}`}>
                    <span className={`inline-block max-w-[70%] px-4 py-2 rounded-lg ${msg.sender === restaurantId ? 'bg-teal-600 text-white' : 'bg-gray-300 text-black'}`}>
                      {msg.content}
                      {msg.sender === restaurantId && (
                        <small className="block text-white mt-1">
                          {msg.seen ? (
                            <span className="flex items-center justify-end">
                              <BsCheck2All className="mr-1" /> Seen
                            </span>
                          ) : (
                            <span className="flex items-center justify-end">
                              <BsCheck2 className="mr-1" /> Delivered
                            </span>
                          )}
                        </small>
                      )}
                    </span>
                    <div className="text-xs text-gray-500 mt-1">
                      {format(new Date(msg.createdAt))}
                    </div>
                  </div>
                ))
              ) : (
                <div className="mt-64 text-center">No messages yet. Start a new conversation.</div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Message Input Section */}
            <form
              onSubmit={handleSendMessage}
              className="p-2 bg-white border-t border-gray-300 flex items-center sticky bottom-0 left-0 right-0"
            >
              <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                className="flex-1 border p-2 rounded-l-lg"
                placeholder="Type your message..."
              />
              <button
                type="submit"
                className="bg-teal-600 text-white p-2 rounded-r-lg flex items-center hover:bg-teal-700 transition"
              >
                <IoIosSend size={20} />
              </button>
            </form>
          </div>
        ) : (
          <div className="font-bold mt-10 text-center text-lg">Select a user to start messaging.</div>
        )}
      </div>
    </div>
  );
};


export default RestaurantChat

