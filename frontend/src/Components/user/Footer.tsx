import React from 'react'
import { IconType } from 'react-icons'
import { FaFacebook, FaInstagram } from 'react-icons/fa'
import { FaXTwitter } from 'react-icons/fa6';
import { Link } from 'react-router-dom';
import logoBlack  from "../../assets/images/logo-black.png"

interface Section {
   title: string;
   items: string[];
   link: string
}

interface Item {
   name: string;
   icon: IconType;
   link: string;
}

const sections: Section[] = [
   {
      title: "Restaurant login",
      items: [""],
      link: '/restaurant/login'
   }

]

const items: Item[] = [
   {
      name: 'Facebook',
      icon: FaFacebook,
      link: 'http://facebook.com/'
   },
   {
      name: 'Instagram',
      icon: FaInstagram,
      link: 'http://instagram.com/'
   },
   {
      name: 'Twitter',
      icon: FaXTwitter,
      link: 'http://twitter.com/'
   }
]

const Footer: React.FC = () => {
   return (
      <div className='w-full mt-24 bg-[#080708] text-white py-4 px-2'>

         <div className='flex justify-center'>
            <Link to='/'>
               {/* <span className='text-2xl font-bold text-white'>Fork & Knife</span> */}
               <img src={logoBlack} className='h-[125px]' alt="logo" />
            </Link>
         </div>


         <div className='max-w-[80%] mx-auto flex flex-col justify-center text-center border-b-2 border-gray-600 py-4'>
            <div className='flex justify-evenly'>
               {sections.map((section, index) => (
                  <div className='w-full sm:w-1/5 md:w-1/5 px-2' key={index}>
                     <ul className='text-center'>
                        <li className="text-lg pt-2 cursor-pointer hover:text-[#00CCB8]">
                           <Link to={section.link}>
                              {section.title}
                           </Link>

                        </li>
                     </ul>

                  </div>
               ))}
            </div>

            {/* <div className='col-span-2 pt-8 md:pt-2'>
               <p className='font-bold uppercase'>
                  Subscribe to our newsleeter
               </p>
               <p>
                  The latest updates, articles and resources, sent to ypuir inbox weekly.
               </p>
               <form className='flex flex-col sm:flex-row'>
                  <input type="text" placeholder='Enter email address'
                     className='w-full p-2 mr0-4 rounded-md mb-4' />
                  <button className='p-2 mb-4'>
                     Subscribe
                  </button>
               </form>

            </div> */}

            {/* social Icons  */}
            <div className='flex pt-8 pb-2 text-2xl justify-center'>
               <div className='flex space-x-12'>
                  {items.map((item, index) => (
                     <a key={index} href={item.link} className='hover:text-white cursor-pointer'>
                        <item.icon />
                     </a>
                  ))}
               </div>
            </div>



         </div>



         <div className='mt-2'>
            <p className='px-2 pt-3 text-center'>
               2024 <span className='text-[#00CCB8]'> Fork and Knife. </span> All rights reserved
            </p>

         </div>
      </div>
   )
}

export default Footer
