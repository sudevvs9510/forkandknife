
import React, { useState, useEffect } from 'react';
import Navbar from '../../Components/user/Navbar';
import MainNavBar from '../../Components/user/MainNavBar'; 
import About from '../../Components/user/About';
import Header from '../../Components/user/Header';
import Restaurants from './Restaurants';
import Footer from '../../Components/user/Footer';

const Home: React.FC = () => {
  const [showMainNavBar, setShowMainNavBar] = useState(false);

  const handleScroll = () => {
    const headerHeight = document.getElementById('header')?.offsetHeight || 0;
    const scrollTop = window.scrollY;
    setShowMainNavBar(scrollTop > headerHeight);
  };

  
  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div>
      {showMainNavBar ? <MainNavBar /> : <Navbar />}
      <div id="header">
        <Header />
      </div>
      <Restaurants  />
      <About />
      <Footer />
    </div>
  );
};

export default Home;




