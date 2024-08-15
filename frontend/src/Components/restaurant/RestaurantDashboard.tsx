import React, { useEffect, useState } from 'react';
import { FaTable, FaRupeeSign, FaDownload } from 'react-icons/fa';
import { MdReviews } from "react-icons/md";
import { toast } from 'react-hot-toast';
import { RootState, useAppSelector } from '../../redux/app/store';
import authAxios from '../../redux/api/authApi';
import { LineChart } from '@mui/x-charts/LineChart';
import { PieChart } from '@mui/x-charts/PieChart';
import Reservation from "./Reservation"


interface DashboardData {
  data: {
    totalRevenue: number;
    totalBookingCount: number;
    totalBookingPaidCount: number;
    totalCompletedBookingCount: number;
    totalConfirmedBookingCount: number;
    totalPendingBookingCount: number;
    totalCancelledBookingCount: number;
    reviewCount: number;
    dailyRevenue: { key: string[], values: number[] }

  }
}

const Dashboard: React.FC = () => {
  const restaurantId = useAppSelector((state: RootState) => state.restaurantAuth.restaurantId);
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedMonth, setSelectedMonth] = useState<number>(new Date().getMonth() + 1);
  const [reportPeriod, setReportPeriod] = useState<string>('Month');

  console.log(reportPeriod)

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const response = await authAxios.get(`/restaurant/dashboard/${restaurantId}?month=${selectedMonth}`);
        console.log(response.data);
        const { data } = response;
        setDashboardData(data);

        console.log(response.data.data.totalRevenue);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
        setError('Failed to load dashboard data.');
        toast.error('Failed to load dashboard data.');
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, [restaurantId, selectedMonth]);


  const handleDownloadReport = async () => {
    try {
      const response = await authAxios.get(`/restaurant/download-report/${restaurantId}?period=${reportPeriod}`, {
        responseType: 'blob',

      });
      console.log(response)

      if (response.data) {
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', `${reportPeriod}_report_${restaurantId}.pdf`);
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


  // Prepare dynamic data for the PieChart
  const pieChartData = [
    { id: 0, value: dashboardData?.data.totalCompletedBookingCount || 0, label: 'Completed' },
    { id: 1, value: dashboardData?.data.totalConfirmedBookingCount || 0, label: 'Confirmed' },
    { id: 2, value: dashboardData?.data.totalPendingBookingCount || 0, label: 'Pending' },
    { id: 3, value: dashboardData?.data.totalCancelledBookingCount || 0, label: 'Cancelled' },
  ];


  const values: number[] = dashboardData?.data.dailyRevenue.values ?? []
  const keys: number[] = dashboardData?.data.dailyRevenue.key.map(i => Number(i)) ?? []

  const obj1 = values.map((item, i) => { return { val: item, key: keys[i] } }).sort((a, b) => a.key - b.key)

  const xAxis = [0, ...obj1.map(item => item.key)]
  const yAxis = [0, ...obj1.map(item => item.val)]
  console.log(xAxis, yAxis)
  console.log(dashboardData?.data.dailyRevenue, "this is the daat daksjgkds")

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="w-[88%] p-4">
      <h2 className="text-2xl font-bold mb-4">Dashboard</h2>

      {/* Dashboard Cards */}
      <div className="grid grid-cols-1 w-full sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        <div className="flex items-center p-4 bg-white rounded shadow">
          <FaTable className="text-4xl text-blue-500 mr-4" />
          <div>
            <div className="text-xl font-bold">{dashboardData?.data.totalBookingCount}</div>
            <div className="text-gray-500">Total Bookings</div>
          </div>
        </div>

        <div className="flex items-center p-4 bg-white rounded shadow">
          <MdReviews className="text-4xl text-gray-500 mr-4" />
          <div>
            <div className="text-xl font-bold">{dashboardData?.data.reviewCount}</div>
            <div className="text-gray-500">Restaurant Reviews</div>
          </div>
        </div>

        <div className="flex items-center p-4 bg-white rounded shadow">
          <FaRupeeSign className="text-4xl text-green-500 mr-4" />
          <div>
            <div className="text-xl font-bold">{(dashboardData?.data.totalRevenue)?.toFixed(2)}</div>
            <div className="text-gray-500">Total Revenue</div>
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

      {/* Charts */}
      <div className="w-full flex flex-col lg:flex-row justify-evenly mb-8">
        <div className="lg:w-1/2 mb-4 lg:mb-0">
          <h1 className="font-semibold text-[22px] text-teal-600 text-center">Revenue Status</h1>
          <div className="flex justify-end mb-4">
            <label htmlFor="month" className="mr-2 font-semibold text-teal-600">Select Month:</label>
            <select
              id="month"
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(Number(e.target.value))}
              className=" border border-gray-200 rounded px-2 py-1"
            >
              <option value={1}>January</option>
              <option value={2}>February</option>
              <option value={3}>March</option>
              <option value={4}>April</option>
              <option value={5}>May</option>
              <option value={6}>June</option>
              <option value={7}>July</option>
              <option value={8}>August</option>
              <option value={9}>September</option>
              <option value={10}>October</option>
              <option value={11}>November</option>
              <option value={12}>December</option>
            </select>
          </div>
          {xAxis.length > 1 && yAxis.length > 1 ? (
            <LineChart
              xAxis={[{ data: xAxis }]}
              series={[{ data: yAxis, }]}
              width={450}
              height={300}
              className="mx-auto"
            />
          ) : (
            <div className=" text-center font-semibold text-gray-600">No data available</div>
          )}

        </div>

        <div className="w-full lg:w-1/2 ">
          <h1 className="font-semibold text-[22px] text-teal-600 text-center mb-10">Booking Status</h1>

          <PieChart
            series={[
              {
                data:pieChartData,
                highlightScope: { faded: 'global', highlighted: 'item' },
                faded: { innerRadius: 30, additionalRadius: -30, color: 'gray' },
              },
            ]}
            width={450}
            height={250}
          />
        </div>
      </div>

      {/* Upcoming Reservations Section */}
      <div className="items-center mb-4 w-full">
        <Reservation />
      </div>
    </div>
  );
};

export default Dashboard;
