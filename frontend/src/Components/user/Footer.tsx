import React from 'react'
import { IconType } from 'react-icons'
import { FaFacebook, FaInstagram } from 'react-icons/fa'
import { FaXTwitter } from 'react-icons/fa6';
import { Link } from 'react-router-dom';

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
      title: "Restaurant signup",
      items: [""],
      link: '/restaurant/signup'
   },
   {
      title: "About",
      items: ['Marketing', 'Analytics', 'Commerce', 'Data', 'Cloud'],
      link: '/about'
   },
   {
      title: "Restaurants",
      items: ["Pricing", "Documentation", "Guides", 'Status'],
      link: '/restaurant'
   },
   {
      title: "Book Table",
      items: ["About", "Blog", "Jobs", 'Press'],
      link: '/book-table'
   },
   {
      title: "Policies",
      items: ["Claims", "Privacy", "Policies", 'Conditions'],
      link: '/policies'
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
      <div className='w-full mt-24 bg-[#080708] text-white py-8 px-2'>

         <div className='flex justify-center text-[#00CCB8] font-bold text-2xl'>
            Fork & Knife
         </div>
         <div className='max-w-[1240px] mx-auto flex flex-wrap justify-center text-center border-b-2 border-gray-600 py-8'>
            {sections.map((section, index) => (
               <div className='w-full sm:w-1/5 md:w-1/5 px-2' key={index}>
                  <ul>
                     <li className="text-lg pt-2 cursor-pointer hover:text-[#00CCB8]">
                        <Link to={section.link}>
                           {section.title}
                        </Link>

                     </li>
                  </ul>

                  {/* <ul >
                     {section.items.map((item, i) => (
                        <li key={i} className='py-1 text-white hover:text-white cursor-pointer'>
                           {item}
                        </li>
                     ))}
                  </ul> */}
               </div>
            ))}

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
            <div className='flex pt-8 pb-2 text-2xl'>
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
