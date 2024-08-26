
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

