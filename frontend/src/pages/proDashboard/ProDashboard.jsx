import React,{useEffect,useContext,useState} from 'react'
// import {useDispatch,useSelector} from 'react-redux'
import {useNavigate} from 'react-router-dom'
// import { getProduct } from '../../actions/productAction'
// import { getOrders } from '../../actions/orderAction'
// import { getAllUsers, getUserDetails } from '../../actions/userAction'
import img from "../../assets/logo2.jpg"
import { AppContext } from "../../context/AppContext"
import ProNav from "./ProNav"
import Slidebar from "./ProSlidebar"

import {Link} from 'react-router-dom'
import { AdminContext } from '../../context/AdminContext'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Calendar, Clock, User, DollarSign,IndianRupee , CheckCircle, XCircle, AlertCircle, TrendingUp } from 'lucide-react';

const ProDashboard = () => {
  const { all_bookings } = useContext(AdminContext);
  const { auth } = useContext(AppContext);
    const [bookingData, setBookingData] = useState([]);
     const [professional, setProfessional] = useState({});
  const [stats, setStats] = useState({
    totalBookings: 0,
    completedBookings: 0,
    cancelledBookings: 0,
    pendingBookings: 0,
    totalRevenue: 0,
    upcomingBookings: []
  });

  const [timeframe, setTimeframe] = useState('week');
  const [activeSection, setActiveSection] = useState('overview');

  useEffect(() => {
    const getProfessional = async () => {
      const response = await auth();
      console.log(response)
        setProfessional(response.user);
    };

    getProfessional();
  }, []);

  const getData = async () => {
    const response = await all_bookings();
    console.log(response.reverse())
    const ProfessionalsBookings = response.filter(
      (booking) => booking.professionalId === professional._id
    );
    console.log(ProfessionalsBookings)

    // if (isMounted.current) {
      setBookingData(ProfessionalsBookings);
    // }
  };

  useEffect(() => {
    getData();
  }, [professional]);

  useEffect(() => {
    if (bookingData && bookingData.length > 0) {
      const professionalInfo = bookingData[0].professionalData;
      
      const completed = bookingData.filter(booking => booking.isCompleted).length;
      const cancelled = bookingData.filter(booking => booking.cancelled).length;
      const pending = bookingData.filter(booking => !booking.isCompleted && !booking.cancelled).length;
      
      const revenue = bookingData
        .filter(booking => booking.isCompleted)
        .reduce((sum, booking) => sum + parseInt(booking.amount), 0);
      
      const currentDate = new Date();
      const upcoming = bookingData
        .filter(booking => {
          const [day, month, year] = booking.slotDate.split('-');
          const bookingDate = new Date(`${month}/${day}/${year}`);
          return bookingDate >= currentDate && !booking.cancelled;
        })
        .sort((a, b) => {
          const [dayA, monthA, yearA] = a.slotDate.split('-');
          const [dayB, monthB, yearB] = b.slotDate.split('-');
          const dateA = new Date(`${monthA}/${dayA}/${yearA}`);
          const dateB = new Date(`${monthB}/${dayB}/${yearB}`);
          return dateA - dateB;
        });
      
      setStats({
        totalBookings: bookingData.length,
        completedBookings: completed,
        cancelledBookings: cancelled,
        pendingBookings: pending,
        totalRevenue: revenue,
        upcomingBookings: upcoming
      });
    }
  }, [bookingData]);

  // Prepare data for charts
  const prepareBookingStatusData = () => {
    return [
      { name: 'Completed', value: stats.completedBookings },
      { name: 'Cancelled', value: stats.cancelledBookings },
      { name: 'Pending', value: stats.pendingBookings }
    ];
  };

  const prepareRevenueData = () => {
    // Group by date for revenue chart
    const revenueByDate = {};
    
    bookingData
      ?.filter(booking => booking.isCompleted)
      .forEach(booking => {
        if (!revenueByDate[booking.slotDate]) {
          revenueByDate[booking.slotDate] = 0;
        }
        revenueByDate[booking.slotDate] += parseInt(booking.amount);
      });
    
    return Object.keys(revenueByDate).map(date => ({
      date,
      revenue: revenueByDate[date]
    }));
  };

  const prepareTimeDistributionData = () => {
    const timeSlots = {};
    
    bookingData.forEach(booking => {
      if (!timeSlots[booking.slotTime]) {
        timeSlots[booking.slotTime] = 0;
      }
      timeSlots[booking.slotTime]++;
    });
    
    return Object.keys(timeSlots).map(time => ({
      time,
      bookings: timeSlots[time]
    })).sort((a, b) => {
      // Sort by time
      const timeA = a.time.split(':').map(Number);
      const timeB = b.time.split(':').map(Number);
      
      if (timeA[0] !== timeB[0]) {
        return timeA[0] - timeB[0];
      }
      return timeA[1] - timeB[1];
    });
  };

  const COLORS = ['#0088FE', '#FF8042', '#FFBB28'];
  const CARD_COLORS = ['bg-blue-100', 'bg-green-100', 'bg-orange-100', 'bg-purple-100'];
  const CARD_ICON_COLORS = ['text-blue-500', 'text-green-500', 'text-orange-500', 'text-purple-500'];

  const formatDate = (dateString) => {
    const [day, month, year] = dateString.split('-');
    return `${day}/${month}/${year}`;
  };

  const renderTimeButtons = () => (
    <div className="pro-slot-sec flex space-x-2 mb-6">
      <button 
        onClick={() => setTimeframe('week')} 
        className={`px-4 py-2 rounded-md ${timeframe === 'week' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
      >
        Week
      </button>
      <button 
        onClick={() => setTimeframe('month')} 
        className={`px-4 py-2 rounded-md ${timeframe === 'month' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
      >
        Month
      </button>
      <button 
        onClick={() => setTimeframe('year')} 
        className={`px-4 py-2 rounded-md ${timeframe === 'year' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
      >
        Year
      </button>
    </div>
  );

  const renderTabButtons = () => (
    <div className="flex space-x-4 mb-6 border-b pb-2 pt-2 p-2 gap-3">
      <button 
        onClick={() => setActiveSection('overview')} 
        className={`px-4 py-2 rounded-md ${activeSection === 'overview' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
      >
        Overview
      </button>
      <button 
        onClick={() => setActiveSection('analytics')} 
        className={`px-4 py-2 rounded-md ${activeSection === 'analytics' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
      >
        Analytics
      </button>
    </div>
  );

  const renderOverviewSection = () => (
    <div className="space-y-6">
      <div className="pro-data-diff grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        
        <div className={`${CARD_COLORS[0]} p-6 rounded-lg shadow-sm`}>
          <div className="flex items-center">
            <div className={`p-3 rounded-full ${CARD_ICON_COLORS[0]} bg-white m-2`}>
              <Calendar size={24} />
            </div>
            <div className='p-2'>
              <p className=" text-lg text-gray-500">Total Bookings</p>
              <p className="pro-data-quant text-2xl font-bold">{stats.totalBookings}</p>
            </div>
          </div>
        </div>

        <div className={`${CARD_COLORS[1]} p-6 rounded-lg shadow-sm`}>
          <div className="flex items-center">
            <div className={`p-3 rounded-full ${CARD_ICON_COLORS[1]} bg-white m-2`}>
              <CheckCircle size={24}  />
            </div>
            <div className='p-2'>
              <p className="text-lg text-gray-500">Completed</p>
              <p className="pro-data-quant text-2xl font-bold">{stats.completedBookings}</p>
            </div>
          </div>
        </div>

       
        <div className={`${CARD_COLORS[2]} p-6 rounded-lg shadow-sm`}>
          <div className="flex items-center">
            <div className={`p-3 rounded-full ${CARD_ICON_COLORS[2]} bg-white m-2`}>
              <IndianRupee size={24} />
            </div>
            <div className='p-2'>
              <p className="text-lg text-gray-500">Revenue</p>
              <p className="pro-data-quant text-2xl font-bold">₹ {stats.totalRevenue}</p>
            </div>
          </div>
        </div>

    
        <div className={`${CARD_COLORS[3]} p-6 rounded-lg shadow-sm`}>
          <div className="flex items-center">
            <div className={`p-3 rounded-full ${CARD_ICON_COLORS[3]} bg-white m-2`}>
              <XCircle size={24} />
            </div>
            <div className='p-2'>
              <p className="text-lg text-gray-500">Cancellations</p>
              <p className="pro-data-quant text-2xl font-bold">{stats.cancelledBookings}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h3 className="pro-head-parts text-lg font-semibold mb-4">Booking Status</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={prepareBookingStatusData()}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                >
                  {prepareBookingStatusData().map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h3 className="pro-head-parts text-lg font-semibold mb-4">Revenue Overview</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={prepareRevenueData()}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" tick={{ fontSize: 12 }} />
                <YAxis />
                <Tooltip formatter={(value) => [`₹${value}`, 'Revenue']} />
                <Bar dataKey="revenue" fill="#0088FE" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

    </div>
  );


  const renderAnalyticsSection = () => (
    <div className="pro-main-data-sec space-y-6">
      {renderTimeButtons()}
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Popular Time Slots */}
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h3 className="pro-head-parts text-lg font-semibold mb-4">Popular Time Slots</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={prepareTimeDistributionData()}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="time" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="bookings" name="Bookings" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h3 className="pro-head-parts text-lg font-semibold mb-4">Booking Completion Rate</h3>
          <div className="flex flex-col items-center justify-center h-64">
            <div className="relative w-40 h-40">
              <svg className="w-full h-full" viewBox="0 0 100 100">
                <circle 
                  className="text-gray-200" 
                  strokeWidth="10" 
                  stroke="currentColor" 
                  fill="transparent" 
                  r="40" 
                  cx="50" 
                  cy="50" 
                />
                <circle 
                  className="text-blue-500" 
                  strokeWidth="10" 
                  strokeDasharray={`${stats.totalBookings > 0 ? (stats.completedBookings / stats.totalBookings) * 251.2 : 0} 251.2`}
                  strokeLinecap="round" 
                  stroke="currentColor" 
                  fill="transparent" 
                  r="40" 
                  cx="50" 
                  cy="50" 
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-2xl font-bold">
                  {stats.totalBookings > 0 ? Math.round((stats.completedBookings / stats.totalBookings) * 100) : 0}%
                </span>
              </div>
            </div>
            <div className="mt-4 text-center">
              <p className="text-sm text-gray-500">Completed {stats.completedBookings} out of {stats.totalBookings} bookings</p>
            </div>
          </div>
        </div>
      </div>

      <div className="analytics-pro-sec bg-white p-6 rounded-lg shadow-sm">
        <h3 className="text-lg font-semibold mb-4">Performance Metrics</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="border rounded-lg p-4">
            <div className="flex items-center">
              <TrendingUp className="text-green-500 mr-2" size={20} />
              <h4 className="analytic-box-pro-heading text-md font-medium">Conversion Rate</h4>
            </div>
            <p className="mt-2 text-2xl font-bold">
              {stats.totalBookings > 0 ? Math.round((stats.completedBookings / stats.totalBookings) * 100) : 0}%
            </p>
            <p className="text-sm text-gray-500">Bookings completed successfully</p>
          </div>
          
          <div className="border rounded-lg p-4">
            <div className="flex items-center">
              <DollarSign className="text-blue-500 mr-2" size={20} />
              <h4 className="analytic-box-pro-heading text-md font-medium">Avg. Booking Value</h4>
            </div>
            <p className="mt-2 text-2xl font-bold">
              ₹{stats.completedBookings > 0 ? Math.round(stats.totalRevenue / stats.completedBookings) : 0}
            </p>
            <p className="text-sm text-gray-500">Per completed booking</p>
          </div>
          
          <div className="border rounded-lg p-4">
            <div className="flex items-center">
              <AlertCircle className="text-red-500 mr-2" size={20} />
              <h4 className="analytic-box-pro-heading text-md font-medium">Cancellation Rate</h4>
            </div>
            <p className="mt-2 text-2xl font-bold">
              {stats.totalBookings > 0 ? Math.round((stats.cancelledBookings / stats.totalBookings) * 100) : 0}%
            </p>
            <p className="text-sm text-gray-500">Bookings cancelled</p>
          </div>
        </div>
      </div>
    </div>
  );

  const renderProfessionalInfo = () => {
    if (!bookingData || bookingData.length === 0) return null;
    
    const professionalInfo = bookingData[0].professionalData;
    
    return (
      <div className="bg-white p-6 rounded-lg shadow-sm mb-6">
        <div className="flex flex-col md:flex-row items-start md:items-center">
          <div className="pro-pho flex-shrink-0 mb-4 md:mb-0 md:mr-6">
            <img 
              src={professionalInfo.image} 
              alt={professionalInfo.name} 
              className="h-24 w-24 rounded-full object-cover border-4 border-blue-100"
            />
          </div>
          <div className="proInfo-top flex-1 p-19">
            <h2 className="mt-12 text-2xl font-bold">{professionalInfo.name}</h2>
            <p className="text-lg text-gray-600">{professionalInfo.service}</p>
            <div className="mt-2 flex flex-wrap gap-2">
              <span className="px-3 py-1 rounded-full text-xs bg-blue-100 text-blue-800">
                {professionalInfo.experience}
              </span>
              <span className="px-3 py-1 rounded-full text-xs bg-green-100 text-green-800">
                ₹{professionalInfo.fees} per service
              </span>
              {professionalInfo.available && (
                <span className="px-3 py-1 rounded-full text-xs bg-green-100 text-green-800">
                  Available for Booking
                </span>
              )}
            </div>
          </div>
        </div>
      </div>      
    );
  };

  return (
        <div className="pro-dashboard-page">
        <ProNav/>
          <div className="admin-bookings-page">
            <Slidebar />
            <div className=" bg-gray-50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">  
          
        {renderProfessionalInfo()}
        
        {renderOverviewSection()}
        {renderAnalyticsSection()}
      </div>
    </div>
          </div>
        </div>
  );
};

export default ProDashboard;