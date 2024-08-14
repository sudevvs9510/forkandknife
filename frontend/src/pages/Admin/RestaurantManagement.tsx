import React from 'react'
import Sidebar from "../../Components/admin/Sidebar"
import Header from "../../Components/admin/NavBar"
import RestaurantManagement from '../../Components/admin/RestaurantManagement';


const AdminRestaurantManagement: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="flex flex-1 ">
      <div className='bg-gray-100'>
        <Sidebar />
        </div>
        <RestaurantManagement />
      </div>
    </div>
  );
};

export default AdminRestaurantManagement;

