import React, { useState,useContext,useEffect} from "react";
import img from "../assets/logo2.jpg"
import {AppContext} from "../context/AppContext"
import DeleteIcon from '@mui/icons-material/Delete';
import {useNavigate} from "react-router-dom"
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import Rating from '@mui/material/Rating';
import { Button } from '@mui/material'
import { Bookmark} from 'lucide-react';
import { toast } from "react-toastify";
import Loader from "../components/Loading";

const MyAppointments = () => {
  const {isAuthenticated,getMyBookings,cancelBooking,
     deleteCancelledBooking,RazorPay_Payment,RazorPay_Payment_Verification,uploadReview}=useContext(AppContext)
  const [bookings,setBookings]=useState([])
      const [loading, setLoading] = useState(true);

  const [rating,setRating]=useState(0)
  const [comment,setComment]=useState("")
  const [open,setOpen]=useState(false)

  const submitReviewToggel=()=>{
    open ? setOpen(false):setOpen(true)
}

const reviewSubmitHandler=async(id)=>{
 const response=await uploadReview({id,rating,comment})
  setOpen(false)
}


  const navigate=useNavigate()

  const initPay=async(order)=>{

    const options={
      key: import.meta.env.VITE_RAZORPAY_KEY_ID,
      amount: order.amount,
      currency: "INR",
      name:"Booking Payment",
      description:"Online Payment for the Booking",
      order_id:order.id,
      receipt:order.receipt,
      modal: {
      ondismiss: function () {
        console.log("Payment popup closed");
        document.body.classList.remove("no-scroll"); // Re-enable scrolling if closed
      },
    },
    
      handler:async(response)=>{
        console.log(response)
        document.body.classList.remove("no-scroll");
        try {
          const data=await RazorPay_Payment_Verification(response)
          if(data.success){
            getData()
            navigate("/my-bookings")
          }
        } catch (error) {
          console.log(error)
        }
      }
    }
    setLoading(false)
    // Initializing the Razorpay Payemnt
    const paymentInitialization=new window.Razorpay(options)
   //To open payment popUp 
   document.body.classList.add("no-scroll"); 
    paymentInitialization.open() 
  }
  const handlePay = async(appointmentId) => {
    window.scrollTo(0, 0);
    setLoading(true)
   const response=await RazorPay_Payment(appointmentId)
   if(response?.success){
        initPay(response?.order)
   }
  };

  const handleCancel = async(appointmentId) => {
    console.log(appointmentId)
    let isPaid = bookings.some((appointment) => {
      if (toString(appointment._id) === toString(appointmentId)) {
        console.log("Yes");
        console.log(appointment)
        console.log(appointment.payment)
        if(appointment.payment===true) {
          console.log("Paid");
          toast.error("You have already paid for this booking. You cannot cancel it.");
          return true; // Stops iteration early
        }
      }
      return false; // Ensures it doesn't return undefined
    });
  
    console.log("isPaid:", isPaid);
    if (isPaid) return;
    setLoading(true)

    const response=await cancelBooking(appointmentId)
    window.scrollTo(0, 0);
    if(response?.success){
      getData()
    }
  };

  const setDelete=async(appointmentId)=>{
    setLoading(true)
    const response=await deleteCancelledBooking(appointmentId)
    if(response?.success){
      getData()
    }
  }

  const months = ["","Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

  const dateFormat=(slotDate)=>{
    const dateArray=slotDate.split("-")
    return dateArray[0] + " " + months[Number(dateArray[1])] + " " + dateArray[2]

  }

  const getData=async()=>{
    const response=await getMyBookings()
    console.log(response)
    setBookings(response?.reverse())
    setLoading(false)
  }

  useEffect(()=>{
    getData()
  },[])

  return (
    <>
      {loading && <Loader/>}
      <div className="appointments-container">
      <h2>My Bookings</h2>
      {bookings?.length === 0 && <>
        <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-xl p-8 text-center my-12 mx-10 py-10 rounded-lg">
                    <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Bookmark size={24} className="text-indigo-600" />
                    </div>
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No bookings found</h3>
                    <p className="text-gray-500 max-w-md mx-auto mb-6">You haven't made any bookings yet. Explore our services and make your first booking!</p>
                    <button onClick={()=>navigate("/Services/all-services")} className="px-6 py-2.5 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 font-medium transition-colors">
                      Book Now !!
                    </button>
                  </div>

      </>}
      {bookings?.map((appointment) => (
        <div className="appointment-card" key={appointment._id}>
          {/* Left Section: Image */}
          <div className="appointment-image">
            {/* <img src={appointment.image} alt="Doctor" />
             */}
            <img src={appointment.professionalData.image} alt="Doctor" />
          </div>

          {/* Center Section: Details */}
          <div className="appointment-details">
            <h3>{appointment.professionalData.name}</h3>
            <p><strong>Service:</strong> {appointment.professionalData.service}</p>
            <p><strong>Address: </strong>
            {appointment?.appointmentData?.address}, {appointment?.appointmentData?.city}, {appointment?.appointmentData?.state}, {appointment?.appointmentData?.country} - {appointment?.appointmentData?.pincode}
            </p>
            <p><strong>Amount:</strong> {appointment.amount}</p>
            <p><strong>Date:</strong> {dateFormat(appointment.slotDate)}</p>
            <p><strong>Time:</strong> {appointment.slotTime}</p>
          </div>

          {/* Right Section: Buttons */}
          <div className="appointment-actions">
          {appointment?.isCompleted ?
          <>
              <h5 className="write-review" onClick={submitReviewToggel}>Write a Review</h5>
              <button
              className={`completed-btn`}
              disabled={appointment.cancelled || appointment.paid}
            >
              Completed
            </button> 

            <Dialog aria-labelledby='simple-dialog-title'
        open={open}
        onClose={submitReviewToggel}
        // disableScrollLock={true} // Prevents page jump
        // container={document.body} // Ensures it renders in the viewport
        // disablePortal // Prevents it from rendering at the top of the page
        className='dialog-container'
        sx={{
          "& .MuiDialog-paper": {
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            maxWidth: "475px",
            width: "90%",
          }
        }}
        >

        <DialogTitle>Submit Review</DialogTitle>
        <DialogContent className='submitDialog'>
            <Rating
            onChange={(e)=>setRating(e.target.value)}
            value={rating}
            size="large"
            />
            <textarea
            className='submitDialogTextArea'
            cols="30"
            rows="5"
            value={comment}
            onChange={(e)=>setComment(e.target.value)}></textarea>
        </DialogContent>
        <DialogActions>
            <Button color='primary' onClick={()=>reviewSubmitHandler(appointment?.professionalId)}>Submit</Button>
            <Button onClick={submitReviewToggel} color='secondary'>Cancel</Button>

        </DialogActions>

        </Dialog>
          </>

            :
            <>
            <button
              className={`pay-btn ${appointment.payment ? "paid" : ""}`}
              onClick={() => handlePay(appointment._id)}
              disabled={appointment.payment || appointment.cancelled}
              hidden={ appointment.cancelled}
            >
              {appointment.payment ? "Paid" : "Pay Online"}
            </button>

            {appointment.cancelled && 
              <button style={{width:"min-Content",margin:"auto",padding:"5px",borderRadius:"100%"}} onClick={()=>setDelete(appointment._id)}><DeleteIcon/></button>
            }

            <button
              className={`cancel-btn ${appointment.cancelled ? "cancelled" : ""}`}
              onClick={() => handleCancel(appointment._id)}
              disabled={appointment.cancelled || appointment.paid}
            >
              {appointment.cancelled ? "Booking Cancelled" : "Cancel Booking"}
            </button>
            </>
             }
          </div>
        </div>
      ))}
    </div>
    </>
    
  );
};

export default MyAppointments;
