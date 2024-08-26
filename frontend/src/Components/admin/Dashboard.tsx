// src/components/Dashboard.tsx
import React, { useEffect, useState } from 'react';
import { FaTable, FaRupeeSign, FaUsers, FaDownload } from 'react-icons/fa';
import toast, { Toaster } from 'react-hot-toast';
import authAxios from '../../redux/api/authApi';
import { BarChart } from '@mui/x-charts/BarChart';
import { AiOutlineFileDone } from "react-icons/ai";
import { MdOutlineRestaurant, MdCancelPresentation } from "react-icons/md";
import { GiConfirmed } from "react-icons/gi";
import RestaurantLists from "../../Components/admin/RestaurantManagement"


interface DashboardData {
  usersCount: number;
  restaurantsCount: number;
  bookingCount: number;
  bookingCountCompleted: number;
  bookingCountConfirmed: number;
  bookingCountCancelled: number;
  sortedRevenueByRestaurantObject: { [restaurantName: string]: number };
}

const AdminDashboard: React.FC = () => {
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(null);
  const [reportPeriod, setReportPeriod] = useState<string>('Month');

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


  const handleDownloadReport = async () => {
    try {
      const response = await authAxios.get(`/admin/download-report?period=${reportPeriod}`, {
        responseType: 'blob',

      });
      console.log(response)

      if (response.data) {
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', `${reportPeriod}_report.pdf`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      } else {
        toast.error('Failed to download the report.');
      }
    } catch (error) {
      console.error('Error downloading report:', error);
      toast.error('Failed to download the report.');
    }
  };


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
          <MdOutlineRestaurant className="text-4xl text-orange-500 mr-4" />
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
            <div className="text-xl font-bold">INR - {Object.values(dashboardData?.sortedRevenueByRestaurantObject || {}).reduce((acc, val) => acc + val, 0).toFixed(2)}</div>
            <div className="text-gray-500">Total Revenue</div>
          </div>
        </div>

        <div className="flex items-center p-4 bg-white rounded shadow">
          <AiOutlineFileDone className="text-4xl text-green-600 mr-4" />
          <div>
            <div className="text-xl font-bold">{dashboardData?.bookingCountCompleted || 0}</div>
            <div className="text-gray-500">Completed Bookings</div>
          </div>
        </div>

        <div className="flex items-center p-4 bg-white rounded shadow">
          <GiConfirmed className="text-4xl text-teal-600 mr-4" />
          <div>
            <div className="text-xl font-bold">{dashboardData?.bookingCountConfirmed || 0}</div>
            <div className="text-gray-500">Confirmed Bookings</div>
          </div>
        </div>

        <div className="flex items-center p-4 bg-white rounded shadow">
          <MdCancelPresentation className="text-4xl text-red-600 mr-4" />
          <div>
            <div className="text-xl font-bold">{dashboardData?.bookingCountCancelled || 0}</div>
            <div className="text-gray-500">Cancelled Bookings</div>
          </div>
        </div>

      </div>


      {/* Report Download Section */}
      <div className="flex justify-end items-center mb-8 mr-10">
        <div className="flex items-center">
          <select
            value={reportPeriod}
            onChange={(e) => setReportPeriod(e.target.value)}
            className="mr-4 border border-gray-200 rounded px-2 py-1"
          >
            <option value="Week">Week</option>
            <option value="Month">Month</option>
            <option value="Yearly">Yearly</option>
          </select>
          <button
            onClick={handleDownloadReport}
            className="flex items-center bg-teal-500 text-white font-bold py-2 px-4 rounded hover:bg-teal-600"
          >
            <FaDownload className="mr-2" /> Download Report
          </button>
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
