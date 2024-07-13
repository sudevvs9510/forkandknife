import React from 'react'
import Sidebar from "../../Components/admin/Sidebar"
import NavBar from "../../Components/admin/NavBar"
import RestaurantManagement from '../../Components/admin/RestaurantManagement';

const AdminRestaurantManagement: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      <div className="flex flex-1 flex-col lg:flex-row">
        <Sidebar />
        <div className="flex-1 p-4">
          <RestaurantManagement />
        </div>
      </div>
    </div>
  );
};

export default AdminRestaurantManagement;
