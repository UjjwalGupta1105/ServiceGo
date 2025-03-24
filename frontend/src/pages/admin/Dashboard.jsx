import React,{useEffect,useContext,useState} from 'react'
import Slidebar from "./Slidebar"
import {Link} from 'react-router-dom'
import { AdminContext } from '../../context/AdminContext'
import { LineChart, BarChart, PieChart, Pie, Line, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Activity, Users, DollarSign, Calendar, ShoppingBag,IndianRupee, User, Briefcase, Star, FileText, Bell, Menu, X } from 'lucide-react';

const AdminDashboard = () => {
  const {DashData}=useContext(AdminContext)
  const [dashData,setDashData]=useState()
  const [revenueData,setRevenueData]=useState()

  const getData=async()=>{
    const response=await DashData()
    setDashData(response)
    console.log(dashData)
    await setRevenueData(generateRevenueData(response.appointments))
  }
  useEffect(()=>{
    getData()
  },[])

  // Calculate various dashboard metrics
  const totalUsers = dashData?.users.length;
  const totalProfessionals = dashData?.professionals.length;
  const totalAppointments = dashData?.appointments.length;
  const cancelledAppointments = dashData?.appointments.filter(app => app.cancelled).length;
  const completedAppointments = dashData?.appointments.filter(app => app.isCompleted).length;
  
  // Calculate total revenue (from all appointments that are completed and not cancelled)
  const totalRevenue = dashData?.appointments
    .filter(app => !app.cancelled)
    .reduce((sum, app) => sum + parseFloat(app.amount), 0);

  // Generate service category data for pie chart
  const serviceCategories = {};
  dashData?.professionals.forEach(prof => {
    if (serviceCategories[prof.service]) {
      serviceCategories[prof.service]++;
    } else {
      serviceCategories[prof.service] = 1;
    }
  });

  const servicePieData = Object.keys(serviceCategories).map(service => ({
    name: service,
    value: serviceCategories[service]
  }));

  const bookedSlotsByDate = {};
  dashData?.professionals.forEach(prof => {
    if (prof.slots_booked) {
      Object.entries(prof.slots_booked).forEach(([date, slots]) => {
        if (!bookedSlotsByDate[date]) {
          bookedSlotsByDate[date] = slots.length;
        } else {
          bookedSlotsByDate[date] += slots.length;
        }
      });
    }
  });


  const appointmentsByDateData = Object.keys(bookedSlotsByDate)
    .sort((a, b) => {
      const dateA = new Date(a.split('-').reverse().join('-'));
      const dateB = new Date(b.split('-').reverse().join('-'));
      return dateA - dateB;
    })
    .map(date => ({
      date,
      appointments: bookedSlotsByDate[date]
    }));


  function generateRevenueData(bookings) {
    const today = new Date();
    
    const days = [];
    for (let i = 7; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(today.getDate() - i);
      days.push(date);
    }
    
    const revenueData = days.map(date => {
      const day = date.getDate();
      const month = date.toLocaleString('default', { month: 'short' });
      return {
        name: `${month} ${day}`,
        revenue: 0
      };
    });
    
    bookings.forEach(booking => {
      if (booking.cancelled || !booking.payment) {
        return;
      }
      
      // Parse booking date
      const bookingDateParts = booking.slotDate.split('-');
      const bookingDate = new Date(
        parseInt(bookingDateParts[2]),
        parseInt(bookingDateParts[1]) - 1, 
        parseInt(bookingDateParts[0])
      );
      
      for (let i = 0; i < days.length; i++) {
        const currentDay = days[i];
        
        if (
          bookingDate.getDate() === currentDay.getDate() &&
          bookingDate.getMonth() === currentDay.getMonth() &&
          bookingDate.getFullYear() === currentDay.getFullYear()
        ) {
          const amount = parseInt(booking.amount) || 0;
          revenueData[i].revenue += amount;
          break;
        }
      }
    });
    
    if (typeof totalRevenue !== 'undefined') {
      revenueData[revenueData.length - 1].revenue = totalRevenue;
    }
    console.log(revenueData)
    return revenueData;
  }


  const professionalBookings = dashData?.professionals.map(prof => {
    let bookingCount = 0;
    if (prof.slots_booked) {
      Object.values(prof.slots_booked).forEach(slots => {
        bookingCount += slots.length;
      });
    }
    return {
      name: prof.name,
      service: prof.service,
      bookings: bookingCount,
      fees: prof.fees
    };
  });

  const topProfessionals = professionalBookings && [...professionalBookings]
    .sort((a, b) => b.bookings - a.bookings)
    .slice(0, 5);

  return (
    <div className="flex bg-gray-50">
      {/* Sidebar */}
      <Slidebar/>

      {/* Main content */}
      <div className="flex-1 ">

        {/* Dashboard content */}
        <div className="p-6 admin-dash">
          {/* Stats overview */}
          <div className="admin-dash-dataSet grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
            <div className="bg-white rounded-lg shadow p-6 flex items-center">
              <div className="rounded-full bg-blue-100 p-3 mr-4">
                <Users className="h-8 w-8 text-blue-600" />
              </div>
              <div>
                <p className="text-gray-500 text-sm">Total Users</p>
                <h3 className="text-2xl font-bold">{totalUsers}</h3>
                <p className="text-green-500 text-sm">+12% from last month</p>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow p-6 flex items-center">
              <div className="rounded-full bg-purple-100 p-3 mr-4">
                <Briefcase className="h-8 w-8 text-purple-600" />
              </div>
              <div>
                <p className="text-gray-500 text-sm">Total Professionals</p>
                <h3 className="text-2xl font-bold">{totalProfessionals}</h3>
                <p className="text-green-500 text-sm">+8% from last month</p>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow p-6 flex items-center">
              <div className="rounded-full bg-green-100 p-3 mr-4">
                <Calendar className="h-8 w-8 text-green-600" />
              </div>
              <div>
                <p className="text-gray-500 text-sm">Appointments</p>
                <h3 className="text-2xl font-bold">{totalAppointments}</h3>
                <div className="flex text-sm gap-2">
                  <span className="text-green-500">{completedAppointments} Completed</span>
                  <span className="text-red-500">{cancelledAppointments} Cancelled</span>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow p-6 flex items-center">
              <div className="rounded-full bg-amber-100 p-3 mr-4">
                <IndianRupee className="h-8 w-8 text-amber-600" />
              </div>
              <div>
                <p className="text-gray-500 text-sm">Total Revenue</p>
                <h3 className="text-2xl font-bold">₹ {totalRevenue?.toLocaleString()}</h3>
                <p className="text-green-500 text-sm">+15% from last month</p>
              </div>
            </div>
          </div>

          <div className="flex flex-column w-75 mx-auto my-20">

            <div className="admin-dash-chart bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold mb-4">Revenue Trend</h3>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={revenueData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line 
                    type="monotone" 
                    dataKey="revenue" 
                    stroke="#6366F1" 
                    strokeWidth={2} 
                    activeDot={{ r: 8 }} 
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
            
            <div className="admin-dash-chart bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold mb-4">Service Categories</h3>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={servicePieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    fill="#8884d8"
                    paddingAngle={5}
                    dataKey="value"
                    label={({name, percent}) => `${name} (${(percent * 100).toFixed(0)}%)`}
                  >
                    {servicePieData.map((entry, index) => (
                      <Pie key={`cell-${index}`} fill={['#6366F1', '#8B5CF6', '#EC4899', '#F59E0B', '#10B981', '#3B82F6', '#EF4444', '#8B5CF6'][index % 8]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => [`${value} professionals`, 'Count']} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>



          <div className="flex flex-column w-75 mx-auto my-20">

          <div className="admin-dash-chart bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold mb-4">Top Professionals</h3>
              <div className="overflow-x-auto">
                <table className="min-w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="py-3 px-4 text-left text-sm font-medium text-gray-500">Name</th>
                      <th className="py-3 px-4 text-left text-sm font-medium text-gray-500">Service</th>
                      <th className="py-3 px-4 text-left text-sm font-medium text-gray-500">Bookings</th>
                      <th className="py-3 px-4 text-left text-sm font-medium text-gray-500">Fees</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {topProfessionals?.map((prof, index) => (
                      <tr key={index}>
                        <td className="py-3 px-4 text-sm text-gray-800">{prof.name}</td>
                        <td className="py-3 px-4 text-sm text-gray-600">{prof.service}</td>
                        <td className="py-3 px-4 text-sm text-gray-600">{prof.bookings}</td>
                        <td className="py-3 px-4 text-sm text-gray-600">₹{prof.fees}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            
            <div className="admin-dash-chart bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold mb-4">Appointments by Date</h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={appointmentsByDateData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="appointments" fill="#6366F1" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;