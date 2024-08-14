// src/components/Dashboard.tsx
import React, { useEffect, useState } from 'react';
import { FaTable, FaRupeeSign, FaUsers } from 'react-icons/fa';
import { Toaster } from 'react-hot-toast';
import authAxios from '../../redux/api/authApi';
import { BarChart } from '@mui/x-charts/BarChart';
import { IoRestaurant } from 'react-icons/io5';
import RestaurantLists from "../../Components/admin/RestaurantManagement"


interface DashboardData {
  usersCount: number;
  restaurantsCount: number;
  bookingCount: number;
  sortedRevenueByRestaurantObject: { [restaurantName: string]: number };
}

const AdminDashboard: React.FC = () => {
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(null);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const response = await authAxios.get(`/admin/dashboard`);
        const { data } = response;
        setDashboardData(data);
        console.log(response.data);
      } catch (error) {
        console.error('Error fetching dashboard data', error);
      }
    };
    fetchDashboardData();
  }, []);

  console.log(dashboardData);


  // Prepare data for LineChart
  const xData = dashboardData ? Object.keys(dashboardData.sortedRevenueByRestaurantObject).slice(0, 5) : [];
  const yData = dashboardData ? Object.values(dashboardData.sortedRevenueByRestaurantObject).slice(0, 5) : [];

  console.log(xData, yData)

  return (
    <div className="w-full p-4">
      <Toaster />
      <h2 className="text-2xl font-bold mb-4">Dashboard</h2>
      {/* Dashboard Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="flex items-center p-4 bg-white rounded shadow">
          <FaTable className="text-4xl text-blue-500 mr-4" />
          <div>
            <div className="text-xl font-bold">{dashboardData?.bookingCount || 0}</div>
            <div className="text-gray-500">Total Bookings</div>
          </div>
        </div>

        <div className="flex items-center p-4 bg-white rounded shadow">
          <IoRestaurant className="text-4xl text-orange-500 mr-4" />
          <div>
            <div className="text-xl font-bold">{dashboardData?.restaurantsCount || 0}</div>
            <div className="text-gray-500">Total Restaurants</div>
          </div>
        </div>

        <div className="flex items-center p-4 bg-white rounded shadow">
          <FaUsers className="text-4xl text-violet-600 mr-4" />
          <div>
            <div className="text-xl font-bold">{dashboardData?.usersCount || 0}</div>
            <div className="text-gray-500">Total users</div>
          </div>
        </div>

        <div className="flex items-center p-4 bg-white rounded shadow">
          <FaRupeeSign className="text-4xl text-green-500 mr-4" />
          <div>
            <div className="text-xl font-bold">{Object.values(dashboardData?.sortedRevenueByRestaurantObject || {}).reduce((acc, val) => acc + val, 0)}</div>
            <div className="text-gray-500">Total Revenue</div>
          </div>
        </div>
      </div>

      <div className="flex justify-center items-center mb-4">
        <h3 className="text-xl font-bold">Top 5 Revenue Restaurants</h3>
      </div>
      <div className='flex justify-center'>

        {xData.length > 1 && yData.length > 1 ? (
          <BarChart
            xAxis={[{ scaleType: 'band', data: xData }]}
            series={[{ data: yData }]}
            width={600}
            height={400}
            barLabel="value"
          />
        ) : (
          <div className=" text-center font-semibold text-gray-600">No data available</div>
        )}
      </div>
      <RestaurantLists />
    </div>
  );
};

export default AdminDashboard;
