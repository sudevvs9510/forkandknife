import React from 'react';
import { FaTrash, FaEdit } from 'react-icons/fa';
import Image from '../../assets/images/pizzaMenu.jpg';
import Form from "../../layouts/Form";

const Menu: React.FC = () => {
  return (
    <div className="flex-1 pt-12 px-4 lg:px-10 overflow-auto">
      <div className="flex justify-between items-center mb-5">
        <h1 className="text-2xl font-bold text-[#00655B]">Menu</h1>
        <Form />
      </div>
      <div className="flex flex-col gap-5">
        <div className="flex flex-wrap gap-4">
          <select className="select select-warning w-full max-w-[200px] font-semibold text-[#00655B]">
            <option disabled selected>Categories</option>
            <option className="text-sm font-bold text-[#00655B]">Starter</option>
            <option className="text-sm font-bold text-[#00655B]">Break Fast</option>
            <option className="text-sm font-bold text-[#00655B]">Main Course</option>
            <option className="text-sm font-bold text-[#00655B]">Drinks</option>
            <option className="text-sm font-bold text-[#00655B]">Dessert</option>
          </select>
          <input type="text" placeholder="Search" className="border border-[#00655B] p-2 outline-none rounded-xl w-full lg:w-[500px] max-w-xs" />
          <div className="form-control w-24">
            <label className="cursor-pointer label">
              <input type="checkbox" className="toggle toggle-accent" />
              <span className="label-text text-[#00655B] font-bold text-lg">Veg</span>
            </label>
          </div>
        </div>
        <div>
          <h1 className="text-2xl font-bold text-[#00655B]">Starters</h1>
        </div>
        <div className="flex flex-wrap gap-5 overflow-x-auto">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((item) => (
            <div key={item} className="w-full max-w-[250px] bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 transition transform duration-200 hover:-translate-y-1">
              <img className="p-8 rounded-t-lg" src={Image} alt="product image" />
              <div className="px-5 pb-5">
                <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">Chicken popper</h5>
                <div className="flex items-center justify-between mt-2.5 mb-3">
                  <span className="text-sm font-bold text-gray-900 dark:text-white">$599</span>
                  <div className="flex gap-2">
                    <FaEdit size={18} className="text-red-600 cursor-pointer" />
                    <FaTrash size={14} className="text-red-600 cursor-pointer" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Menu;
