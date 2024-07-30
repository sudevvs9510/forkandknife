
import React from 'react';
import { FaCommentDots } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const ChatIcon: React.FC = () => {

  const navigate = useNavigate()
  const handleClick = () => {
    navigate('/chat')
    console.log('Chat icon clicked');
  };

  return (
    <div
      onClick={handleClick}
      className="fixed bottom-4 right-4 bg-teal-600 text-white p-4 rounded-full shadow-lg cursor-pointer hover:bg-teal-800"
    >
      <FaCommentDots size={24} />
    </div>
  );
};

export default ChatIcon;
