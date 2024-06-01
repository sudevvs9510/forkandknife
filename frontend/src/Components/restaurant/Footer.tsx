import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-800 text-white text-center p-4">
      <p>Fork & Knife</p>
      <p>About Us | Contact Us | FAQs | Sign In</p>
      <div className="flex justify-center space-x-4">
        <a href="#" className="hover:underline">Facebook</a>
        <a href="#" className="hover:underline">Twitter</a>
        <a href="#" className="hover:underline">Instagram</a>
      </div>
      <p>&copy; 2024 forkandknife.com | All rights reserved</p>
    </footer>
  );
};

export default Footer;
