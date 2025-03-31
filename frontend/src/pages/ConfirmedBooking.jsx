import React,{useState,useContext,useEffect} from 'react'
import { toast } from 'react-toastify'
import {useNavigate} from 'react-router-dom'
import {Link} from 'react-router-dom'
import { CheckCircle, Calendar, Clock, MapPin, Phone, User, Mail, Award, DollarSign,IndianRupee , Info } from 'lucide-react';
import {AdminContext} from "../context/AdminContext"
import {AppContext} from "../context/AppContext"
import Stepper from "./Stepper(Path)"


const ConfirmedBooking=()=>{
    const {getMyBookings}=useContext(AppContext)
    const [bookings,setBookings]=useState([])

      const getData=async()=>{
        const response=await getMyBookings()
        console.log("  fvnedmjv ndsokdcjndkskdckvn cdc d YOOOOOOOOOOOOOOOOOOOO")
        console.log(response)
        setBookings(response.reverse())
        sessionStorage.removeItem("booking");
      }
    
      useEffect(()=>{
        window.scrollTo(0,0)
        getData()
      },[])

    return(
        <>
        <div className="stepper">
                <Stepper activePage={2}/> 
        </div>
            <div className="text-center py-6 my-10 mb-18">
                            <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-green-100 mb-4">
                              <CheckCircle size={32} className="text-green-600" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-800 mb-2">Booking Confirmed!</h3>
                            <p className="text-gray-600 max-w-md mx-auto">
                              Your booking with {bookings[0]?.professionalData?.name} on <span className=''>{bookings[0]?.slotDate}</span> at <span>{bookings[0]?.slotTime}</span> has been confirmed. You will receive a confirmation email shortly.
                            </p>
                            <p className='text-red-700 text-lg'>[ You can do the payment at, My Bookings Page]</p>
                            <button 
                              className="mt-6 px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                              onClick={() => window.location.href = '/my-bookings'}
                            >
                              My Bookings
                            </button>
                          </div>
        </>
    )
}

export default ConfirmedBooking