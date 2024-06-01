import React from 'react'
import Navbar from '../../Components/user/Navbar'
import About from '../../Components/user/About'
import Header from '../../Components/user/Header'
import Restaurants from '../../Components/user/Restaurants'
import Footer from '../../Components/user/Footer'


const Home: React.FC = () => {
  return (
    <div>
      <Navbar />
      <Header />
      <Restaurants  />
      <About />
      <Footer />
    </div>
  )
}

export default Home
