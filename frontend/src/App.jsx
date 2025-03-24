import { useState,useContext, useEffect } from 'react'
import './App.css'
import { BrowserRouter, Route, Routes,useLocation } from 'react-router-dom'
import Home from './pages/Home'
import Navbar from './components/Navbar'
import Services from './pages/Services'
import Footer from './components/Footer'
import About from './pages/About'
import Contact from './pages/Contact'
import {AppContext} from './context/AppContext.jsx'
import {AppContextProvider} from './context/AppContext'
import {AdminContextProvider} from './context/AdminContext'
import AllProfessionals from './pages/AllProfessionals'
import ProfessionalData from './pages/ProfessionalData'
import LoginSignup from './pages/LoginSignup'
import MyAppointments from './pages/MyBookings.jsx'
import MyProfile from './pages/MyProfile.jsx'
import Dashboard from './pages/admin/Dashboard.jsx'
import Bookings from './pages/admin/Bookings.jsx'
import Professionals from './pages/admin/Professionals.jsx'
import AddProfessional from './pages/admin/AddProfessional.jsx'
import UpdateProfessional from './pages/admin/UpdateProfessional.jsx'
import Users from './pages/admin//Users.jsx'
import ViewUser from './pages/admin/ViewUser.jsx'
import ProDashboard from "./pages/proDashboard/ProDashboard.jsx"
import ProBookings from "./pages/proDashboard/ProBookings.jsx"
import ProLogin from './pages/ProLogin.jsx'
import ProProfile from "./pages/proDashboard/ProProfile.jsx"
import ProViewUser from "./pages/proDashboard/ProViewUser.jsx"
import Address from './pages/Address.jsx'
import BookingConfirmation from './pages/BookingConfirmation.jsx'
import ConfirmedBooking from './pages/ConfirmedBooking.jsx'
import ProUpdate from "./pages/proDashboard/ProUpdate.jsx"
import NewRequests from './pages/admin/NewRequests.jsx'

function App() {
  return (
    <AppContextProvider>
      <AdminContextProvider>
        <BrowserRouter>
          <MainApp />
        </BrowserRouter>
      </AdminContextProvider>
    </AppContextProvider>
  );
}

function MainApp() {
  const location = useLocation();
  const {CheckPerson,auth,isProfessional}=useContext(AppContext)
  // const [isProfessional,setIsProfessional]=useState(false)
  // console.log(location.pathname)

  useEffect(()=>{
    // const getData=async()=>{
    //   const data=await auth()
    //   if(data?.sucess){
    //     console.log(data?.user.role)
    //       if(data?.user.role=='professional'){
    //           setIsProfessional(true)
    //       }
    //   }
    // }
    const getData=async()=>{
      const response=await CheckPerson()
    }
  
    getData()
  },[])

  return (
    <>
    {
      isProfessional &&
       <>
        <Routes>
            <Route path="/" element={<ProDashboard />} />
            <Route path="/bookings" element={<ProBookings/>} />
            <Route path="/profile" element={<ProProfile/>} />
            <Route path="/bookings/user/:id" element={<ProViewUser/>} />
            <Route path="/update-professional/:id" element={<ProUpdate/>} />
        </Routes>
      </>
    }

    {
      !isProfessional &&
       <>
       {(location.pathname !=="/professional/dashboard" && location.pathname !=="/professional/dashboard/bookings" && location.pathname !=="/professional/dashboard/profile") && 
    <Navbar/>
  }
     <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Services/:title" element={<Services/>} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/professionals" element={<AllProfessionals/>} />
        <Route path="/book/:_id" element={<ProfessionalData/>} />
        <Route path="/register" element={<LoginSignup/>} />
        <Route path="/my-profile" element={<MyProfile/>} />
        <Route path="/my-bookings" element={<MyAppointments/>} />
        <Route path="/admin/dashboard" element={<Dashboard/>} />
        <Route path="/admin/bookings" element={<Bookings/>} />
        <Route path="/admin/professionals/:title" element={<Professionals/>} />
        <Route path="/admin/add-professional" element={<AddProfessional/>} />
        <Route path="/admin/users" element={<Users/>} />
        <Route path="/admin/update-professional/:id" element={<UpdateProfessional/>} />
        <Route path="/admin/users/:id" element={<ViewUser/>} />
        <Route path="/professional/dashboard" element={<ProDashboard/>} />
        <Route path="/login/professional" element={<ProLogin/>} />
        <Route path="/bookings/user/:id" element={<ProViewUser/>} />
        <Route path="/booking/address" element={<Address/>}/>
        <Route path="/booking/confirm" element={<BookingConfirmation/>}/>
        <Route path="/booking-confirmed" element={<ConfirmedBooking/>}/>
        <Route path="/admin/newRequests" element={<NewRequests/>}/>
        


     </Routes>
     {(location.pathname !=="/professional/dashboard" && location.pathname !=="/professional/dashboard/bookings" && location.pathname !=="/professional/dashboard/profile") && 
    <Footer/>
  }


       </>
    }
  
      
    </>
  )
}

export default App
