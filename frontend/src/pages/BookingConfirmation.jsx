import React,{useState,useContext,useEffect} from 'react'
import { toast } from 'react-toastify'
import {useNavigate} from 'react-router-dom'
import {Link} from 'react-router-dom'
import { AppContext } from '../context/AppContext';
import { CheckCircle, Calendar, Clock, MapPin, Phone, User, Mail, Award, DollarSign,IndianRupee , Info } from 'lucide-react';
import {AdminContext} from "../context/AdminContext"
import Stepper from "./Stepper(Path)"

const BookingConfirmationPage = () => {
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [professionalData,setProfessionalData]= useState({})
  const [userData,setUserData]= useState({})


  const {Professionals,isAuthenticated,confirmBooking,currBooking,setCurrBooking,user,auth} = useContext(AppContext);
  const {findProfessional} = useContext(AdminContext);
  const navigate=useNavigate()

  console.log(currBooking)

//   if(!currBooking.addressInfo || !currBooking.addressInfo ){
//     const storedBooking = sessionStorage.getItem("booking");
//     const bookingObject = storedBooking ? JSON.parse(storedBooking) : null;
//     console.log(bookingObject)
//     setCurrBooking(bookingObject)
//     console.log(currBooking)
//     find()
// }
  
useEffect(() => {
    console.log("Current Booking:", currBooking);

    // Check if currBooking is empty (doesn't contain addressInfo or bookingObject)
    if (!currBooking?.addressInfo || !currBooking?.bookingObject) {
      const storedBooking = sessionStorage.getItem("booking");

      if (storedBooking) {
        setCurrBooking(JSON.parse(storedBooking));  // Convert string to object
        console.log("Retrieved booking from sessionStorage:", JSON.parse(storedBooking));
      }
    }
  }, [currBooking, setCurrBooking]);  // Run effect when currBooking changes


const find=async()=>{
    console.log(currBooking?.bookingObject?.professionalId)
    const response=await findProfessional(currBooking?.bookingObject.professionalId)
    console.log(response)
    setProfessionalData(response)
    const data=await auth()
    if(data.sucess){
        setUserData(data.user)
    }
}

  useEffect(()=>{
    window.scrollTo(0,0)
    find()
  },[currBooking])


  const handleConfirmBooking = async() => {
    setIsLoading(true);
    console.log(currBooking.bookingObject)
    const response=await confirmBooking({...currBooking.bookingObject,appointmentData:currBooking.addressInfo})
    console.log(response)
    if(response.success){
       navigate("/booking-confirmed")
    }

    // Simulate API call
    setTimeout(() => {
      setIsConfirmed(true);
      setIsLoading(false);
    }, 1500);
  };

  // Format date from DD-MM-YYYY to more readable format
  const formatDate = (dateString) => {
    // const [day, month, year] = dateString?.split('-');
    // const date = new Date(`${year}-${month}-${day}`);
    // return date?.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
    return dateString
  };

  return (
    <>
    <div className="stepper">
        <Stepper activePage={1}/> 
    </div>
    <div className=" min-h-screen bg-gray-50 py-8">
      <div className="confirmation-page-cont max-w-4xl mx-auto">
        
        {/* Header */}
        <div className="bg-white rounded-t-lg shadow-sm p-6 border-b border-gray-200">
          <h1 className="confirm-heading text-2xl font-bold text-gray-800">Booking Confirmation</h1>
          <p className="text-gray-600 mt-1">Please review your booking details below</p>
        </div>
        
        {/* Main Content */}
        <div className="bg-white shadow-sm rounded-b-lg overflow-hidden">
          
          {/* Professional Information */}
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-start">
              <div className="h-16 w-16 rounded-full bg-gray-200 flex-shrink-0 overflow-hidden">
                {professionalData?.image && (
                  <img 
                    src={professionalData?.image} 
                    alt={professionalData?.name}
                    className="h-full w-full object-cover"
                  />
                )}
              </div>
              <div className="ml-4 flex-1">
                <h2 className="text-xl font-semibold text-gray-800">{professionalData?.name}</h2>
                <div className="flex items-center mt-1">
                  <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full font-medium">
                    {professionalData?.service}
                  </span>
                  <span className="ml-2 flex items-center text-sm text-gray-600">
                    <Award size={14} className="mr-1" />
                    {professionalData?.experience}
                  </span>
                </div>
                <p className="mt-2 text-sm text-gray-600 line-clamp-2">{professionalData?.about}</p>
              </div>
            </div>
          </div>
          
          {/* Booking Details */}
          <div className="p-6 bg-gray-50">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Booking Details</h3>
            
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-white p-4 rounded-lg border border-gray-200">
                <div className="flex items-start">
                  <Calendar className="h-5 w-5 text-blue-600 mt-0.5" />
                  <div className="ml-3">
                    <p className="text-sm font-medium text-gray-900">Appointment Date</p>
                    <p className="text-sm text-gray-600">{formatDate(currBooking?.bookingObject?.slotDate)}</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white p-4 rounded-lg border border-gray-200">
                <div className="flex items-start">
                  <Clock className="h-5 w-5 text-blue-600 mt-0.5" />
                  <div className="ml-3">
                    <p className="text-sm font-medium text-gray-900">Appointment Time</p>
                    <p className="text-sm text-gray-600">{currBooking?.bookingObject?.slotTime}</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white p-4 rounded-lg border border-gray-200">
                <div className="flex items-start">
                  <User className="h-5 w-5 text-blue-600 mt-0.5" />
                  <div className="ml-3">
                    <p className="text-sm font-medium text-gray-900">Client Name</p>
                    <p className="text-sm text-gray-600">{userData?.name}</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white p-4 rounded-lg border border-gray-200">
                <div className="flex items-start">
                  <IndianRupee className="h-5 w-5 text-blue-600 mt-0.5" />
                  <div className="ml-3">
                    <p className="text-sm font-medium text-gray-900">Service Fee</p>
                    <p className="text-sm text-gray-600">₹ {professionalData?.fees?.toLocaleString()}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Location Information */}
          <div className="p-6 border-t border-gray-200">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Service Location</h3>
            
            <div className="bg-white p-4 rounded-lg border border-gray-200">
              <div className="flex items-start">
                <MapPin className="h-5 w-5 text-blue-600 mt-1 flex-shrink-0" />
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-900">Address</p>
                  <p className="text-sm text-gray-600">
                    {currBooking?.addressInfo?.address}, {currBooking?.addressInfo?.city}, {currBooking?.addressInfo?.state}, {currBooking?.addressInfo?.country} - {currBooking?.addressInfo?.pincode}
                  </p>
                </div>
              </div>
            </div>
            
            <div className="mt-4 bg-white p-4 rounded-lg border border-gray-200">
              <div className="flex items-start">
                <Phone className="h-5 w-5 text-blue-600 mt-1 flex-shrink-0" />
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-900">Contact Number</p>
                  <p className="text-sm text-gray-600">{currBooking?.addressInfo?.phone}</p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Notes and Policies */}
          <div className="p-6 border-t border-gray-200 bg-gray-50">
            <div className="flex items-start">
              <Info className="h-5 w-5 text-amber-500 mt-0.5 flex-shrink-0" />
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-900">Important Notes</p>
                <ul className="mt-1 text-sm text-gray-600 space-y-1 list-disc pl-5">
                  <li>Please be available at the location 15 minutes before the appointment time.</li>
                  <li>Cancellation is available up to 4 hours before the appointment without any charges.</li>
                  <li>Payment can be done before the service or will be collected after the service is completed.</li>
                </ul>
              </div>
            </div>
          </div>
          
          {/* Action Buttons */}
          <div className="p-6 border-t border-gray-200">
            {!isConfirmed ? (
              <div className="flex flex-col sm:flex-row justify-end gap-3">
                <button 
                  className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
                  onClick={() => window.history.back()}
                >
                  Go Back
                </button>
                <button
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors flex items-center justify-center"
                  onClick={handleConfirmBooking}
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <span className="inline-block h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></span>
                  ) : (
                    <CheckCircle size={18} className="mr-2" />
                  )}
                  {isLoading ? 'Processing...' : 'Confirm Booking'}
                </button>
              </div>
            ) : (
              <div className="text-center py-6">
                <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-green-100 mb-4">
                  <CheckCircle size={32} className="text-green-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">Booking Confirmed!</h3>
                <p className="text-gray-600 max-w-md mx-auto">
                  Your booking with {professionalData?.name} on {formatDate(currBooking.bookingObject.slotDate)} at {currBooking.bookingObject.slotTime} has been confirmed. You will receive a confirmation email shortly.
                </p>
                <button 
                  className="mt-6 px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                  onClick={() => window.location.href = '/my-bookings'}
                >
                  View My Bookings
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default BookingConfirmationPage;
       