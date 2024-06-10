import React, { useState } from 'react';
import { Link as ScrollLink } from 'react-scroll';
import { Link } from 'react-router-dom';
import { FaTimes } from "react-icons/fa";
import { CiMenuBurger } from 'react-icons/ci';

const Navbar: React.FC = () => {
  const [click, setClick] = useState(false);
  const handleClick = () => setClick(!click);

  const content = (
    <div className={`lg:hidden block absolute top-16 w-full left-0 right-0 bg-[#00CCB8] transition-all duration-300 ease-in-out transform ${click ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-full'}`}>
      <ul className='text-center text-xl p-20'>
        <ScrollLink spy={true} smooth={true} to='Home' onClick={handleClick}>
          <li className='my-4 py-4 border-b border-green-800 hover:bg-green-800 hover:rounded'>Home</li>
        </ScrollLink>
        <ScrollLink spy={true} smooth={true} to='About' onClick={handleClick}>
          <li className='my-4 py-4 border-b border-green-800 hover:bg-green-800 hover:rounded'>About</li>
        </ScrollLink>
        <ScrollLink spy={true} smooth={true} to='Restaurant' onClick={handleClick}>
          <li className='my-4 py-4 border-b border-green-800 hover:bg-green-800 hover:rounded'>Restaurant</li>
        </ScrollLink>
        <li className='my-4 py-4'>
          <Link to="/login">
            <button className='border bg-[#00655B] rounded px-4 py-1 hover:bg-[#008376] border-white'>
              Login
            </button>
          </Link>
        </li>
      </ul>
    </div>
  );

  return (
    <nav className="bg-[#008376] text-white">
      <div className="flex justify-between items-center h-10vh lg:py-5 px-4 lg:px-20 py-4 transition-all duration-300 ease-in-out">
        <div className='flex items-center flex-1'>
          <span className='text-2xl font-bold text-white'>Fork & Knife</span>
        </div>

        <div className='hidden lg:flex flex-1 items-center justify-center font-normal'>
          <ul className='flex gap-8 text-[18px]'>
            <ScrollLink spy={true} smooth={true} to='Home'>
              <li className='hover:text-[#00CCB8] transition duration-300 text-white border-slate-800 hover:border-[#008376] cursor-pointer'>Home</li>
            </ScrollLink>
            <ScrollLink spy={true} smooth={true} to='About'>
              <li className='hover:text-[#00CCB8] transition duration-300 text-white border-slate-800 hover:border-[#008376] cursor-pointer'>About</li>
            </ScrollLink>
            <ScrollLink spy={true} smooth={true} to='Restaurants'>
              <li className='hover:text-[#00CCB8] transition duration-300 text-white border-slate-800 hover:border-[#008376] cursor-pointer'>Restaurants</li>
            </ScrollLink>
          </ul>
        </div>

        <div className='hidden lg:block'>
          <Link to="/login">
            <button className='border rounded px-4 py-1 hover:bg-[#00CCB8] border-white'>
              Login
            </button>
          </Link>
        </div>

        <button className='block lg:hidden transition duration-300 ease-in-out ml-auto' onClick={handleClick}>
          {click ? <FaTimes style={{ color: "#ffff" }} /> : <CiMenuBurger style={{ color: "#ffff" }} />}
        </button>
      </div>

      {click && content}
    </nav>
  );
}

export default Navbar;
