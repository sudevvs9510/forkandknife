
import React from 'react'
import Sidebar from "../../Components/admin/Sidebar"
import Header from "../../Components/admin/NavBar"
import Dashboard from '../../Components/admin/Dashboard';

const AdminDashboard: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="flex flex-1 ">
      <div className='bg-gray-100'>
        <Sidebar />
        </div>
        <Dashboard />
      </div>
    </div>
  );
};

export default AdminDashboard;

