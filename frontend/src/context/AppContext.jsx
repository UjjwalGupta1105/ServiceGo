import {createContext} from 'react';
import { Services } from '../data/Services';
import { Professionals } from '../data/Professionals';
import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

export const AppContext = createContext(null);

export const AppContextProvider=({children})=>{

    const [user, setUser] = useState({
        email: "",
        password:""
      });
    const [isAuthenticated,setIsAuthenticated]=useState(false)
    const [isProfessional,setIsProfessional]=useState(false)
    const [currBooking,setCurrBooking]=useState({})

    const auth=async()=>{
        try {
            const response=await axios.get(`${import.meta.env.VITE_BACKEND_URL}/user`,{withCredentials:true})
            if(response.data.sucess){
                setUser(response.data.user)
                setIsAuthenticated(true)
            }
            else{
                setUser({
                    email: "",
                    password:""
                  })
                setIsAuthenticated(false)
            }

            return response.data

        } catch (error) {
             console.log(error)
             return false
        }
        
    }

    const userRegister=async(user)=>{
        try {
            const {name,email,password,city}=user

            const response=await axios.post(`${import.meta.env.VITE_BACKEND_URL}/user/register`,{name,email,password,city},{
                headers:{"Content-Type":"application/json"}, withCredentials: true
            })
            console.log(response.data)
            setUser({email:user.email,password:user.password})
            setIsAuthenticated(true)
            toast.success("SignUp Successfull...")
            return response.data.success

        } catch (error) {
            toast.error("Unable to SignUp at the moment")
            console.log(error)
            return false
        }
        
    }
    const userLogin=async(user)=>{
        try {
            const {email,password}=user

            const response=await axios.post(`${import.meta.env.VITE_BACKEND_URL}/user/login`,{email,password},{
                headers:{"Content-Type":"application/json"}, withCredentials: true
            })
            console.log(response.data)
            setUser({email:user.email,password:user.password})
            setIsAuthenticated(true)
            toast.success("Login Successfull...")
            return response.data.success

        } catch (error) {
            toast.error("Enter Valid Email & Password")
            console.log(error)
            return false
        }
        
    }
    const professionalLogin=async(user)=>{
        try {
            const {email,password}=user

            const response=await axios.post(`${import.meta.env.VITE_BACKEND_URL}/professional/login`,{email,password},{
                headers:{"Content-Type":"application/json"}, withCredentials: true
            })
            console.log(response.data)
            setIsAuthenticated(true)
            toast.success("Professional Login Successfull")
            return response.data.success

        } catch (error) {
            toast.error("Enter Valid Email & Password")
            console.log(error)
            return false
        }
        
    }
    const professionalLogOut=async()=>{
        try {
              const response=await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/professional/logOut`,{withCredentials:true})
              if(response.data.success){
                      setIsAuthenticated(false)
                   toast.success("Logged Out Successfully")
                   return response.data.success
              }

        } catch (error) {
            toast.error(error.response.data.message)
            console.log(error)
            return false
        }
        
    }
    const userLogOut=async()=>{
        try {
              const response=await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/user/logOut`,{withCredentials:true})
              if(response.data.success){
                    setUser({
                        email:"",
                        password:""
                      })
                      setIsAuthenticated(false)
                //    toast.success("Logged Out Successfully")
                   return response.data.success
              }

        } catch (error) {
            toast.error("Can't Perform the action Now !!")
            console.log(error)
            return false
        }
        
    }

    

    const confirmBooking=async ({professionalId,slotDate,slotTime,appointmentData})=>{
        try {
            const response=await axios.post(`${import.meta.env.VITE_BACKEND_URL}/user/book-appointment`,{professionalId,slotDate,slotTime,appointmentData},{
                headers:{"Content-Type":"application/json"}, withCredentials: true
            })
            console.log(response.data)
            if(response.data.success){
                toast.success("Professional Booked")
            }
            return response.data
        } catch (error) {
            console.log(error)
            console.log(error.response.data.message)
            toast.error(error.response.data.message)
        }
    }


   
    const getMyBookings=async()=>{
        try {
            const response=await axios.get(`${import.meta.env.VITE_BACKEND_URL}/user/my-appointments`,{
                headers:{"Content-Type":"application/json"}, withCredentials: true
            })
            console.log(response.data)
            return response.data.appointments
        } catch (error) {
            console.log(error)
            toast.error(error.response.data.message)
        }
    }

    const cancelBooking=async(appointmentId)=>{
        try {
            const response=await axios.patch(`${import.meta.env.VITE_BACKEND_URL}/user/cancel-booking`,{appointmentId},{
                headers:{"Content-Type":"application/json"}, withCredentials: true
            })
            console.log(response.data)
            if(response.data.success){
                toast.success(response.data.message)
            }
            return response.data
        } catch (error) {
            console.log(error)
            console.log(error.response.data.message)
            toast.error(error.response.data.message)
        }
    }

    const deleteCancelledBooking=async(appointmentId)=>{
        try {
            const response=await axios.post(`${import.meta.env.VITE_BACKEND_URL}/user/cancel-booking/delete`,{appointmentId},{
                headers:{"Content-Type":"application/json"}, withCredentials: true
            })
            console.log(response.data)
            if(response.data.success){
                toast.success(response.data.message)
            }
            return response.data
        } catch (error) {
            console.log(error)
            console.log(error.response.data.message)
            toast.error(error.response.data.message)
        }
    }
    const MarkBookingDone=async(id)=>{
        try {
            const response=await axios.post(`${import.meta.env.VITE_BACKEND_URL}/booking/completed/${id}`)
            if (response){
                console.log(response.data)
                return response.data
            }
        } catch (error) {
            console.log(error.response.data.message)
            toast.error("Error in Fetching")
        }
    }

    const RazorPay_Payment=async(appointmentId)=>{
        try {
            const response=await axios.post(`${import.meta.env.VITE_BACKEND_URL}/user/payment-razorpay`,{appointmentId},{
                headers:{"Content-Type":"application/json"}, withCredentials: true
            })
            console.log(response.data)
            // if(response.data.success){
            //     toast.success(response.data.message)
            // }
            return response.data
        } catch (error) {
            console.log(error)
            console.log(error.response.data.message)
            toast.error(error.response.data.message)
        }
    }

   
    const RazorPay_Payment_Verification=async(response)=>{
        try {
            
            const data=await axios.post(`${import.meta.env.VITE_BACKEND_URL}/user/payment-verification-razorpay`,
                {...response}, {headers:{"Content-Type":"application/json"}, withCredentials: true}
            )
            console.log(data.data)
            if(data.data.success){
                toast.success(data.data.message)
            }
            return data.data

        } catch (error) {
            console.log(error)
            toast.error(error.response.data.message)
        }
    }

    const CheckPerson=async()=>{
        const data=await auth()
        if(data?.sucess){
            console.log(data)
          console.log(data?.user?.role)
            if(data?.user?.role=='professional'){
                setIsProfessional(true)
            }
        }
        else{
            setIsProfessional(false)
        }
    }

    const uploadReview=async({id,rating,comment})=>{
        console.log(id,rating,comment)
        try {
            const response=await axios.post(`${import.meta.env.VITE_BACKEND_URL}/professional/reviews/${id}`,{rating,comment},{
                headers:{"Content-Type":"application/json"}, withCredentials: true
            })
            if(response?.data?.success){
                toast.success(response.data.message)
            } 
        } catch (error) {
            console.log(error)
            toast.error(error.response.data.message)
        }
    }

    const updateUser=async({name,additionalInfo})=>{
        try {
            const response=await axios.patch(`${import.meta.env.VITE_BACKEND_URL}/user/update`,{name,additionalInfo},{
                headers:{"Content-Type":"application/json"}, withCredentials: true
            })
            console.log(response.data)
            return response.data
        } catch (error) {
            console.log(error)
            console.log(error.response.data.message)
            toast.error(error.response.data.message)
        }
    }
    const updateUserAddress=async(additionalInfo)=>{
        try {
            const response=await axios.patch(`${import.meta.env.VITE_BACKEND_URL}/user/address-update`,{additionalInfo},{
                headers:{"Content-Type":"application/json"}, withCredentials: true
            })
            console.log(response.data)
            return response.data
        } catch (error) {
            console.log(error)
            console.log(error.response.data.message)
        }
    }

    const UpdatePassword=async({currPass,newPass,confirmNewPass})=>{
        try {
            const response=await axios.post(`${import.meta.env.VITE_BACKEND_URL}/me/updatePassword`,{currPass,newPass,confirmNewPass},{
                headers:{"Content-Type":"application/json"}, withCredentials: true
            })
            console.log(response.data)
            return response.data
        } catch (error) {
            console.log(error)
            console.log(error.response.data.message)
            toast.error(error.response.data.message)
        }
    }

    const newReq=async({name,email,message,service,city})=>{
        try {
            console.log({name,email,message,service,city})
            const response=await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/contact`,{name,email,message,service,city},{    
                headers:{"Content-Type":"application/json"}, withCredentials: true
            })
            console.log(response.data)
            return response.data
        } catch (error) {
            console.log(error)
            // console.log(error.response.data)
            toast.error(error?.response?.data)
        }
    }
    const getNewRequests=async()=>{
        try {
            const response=await axios.get(`${import.meta.env.VITE_BACKEND_URL}/new-requests`)
            console.log(response.data)
            if(response.data.success){
               return response.data.requests
            }
        } catch (error) {
            console.log(error)
            toast.error(error.response.data.message)
        }
    }
    const deleteRequest=async(id)=>{
        try {
            console.log(id)
            const response=await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/request/delete/${id}`)
            console.log(response.data)
            if(response.data.success){
                toast.success(response.data.message)
            }
            return response.data
        } catch (error) {
            console.log(error)
            toast.error(error.response.data.message)
        }
    }

    return(
        <AppContext.Provider value={{Services,Professionals,userRegister,userLogin,auth,professionalLogOut,MarkBookingDone,updateUser,newReq,getNewRequests,
        userLogOut,user,isAuthenticated,confirmBooking,getMyBookings,professionalLogin,uploadReview,currBooking,setCurrBooking,UpdatePassword,deleteRequest,
        cancelBooking,deleteCancelledBooking,RazorPay_Payment,RazorPay_Payment_Verification,CheckPerson,isProfessional,updateUserAddress}}>
            {children}
        </AppContext.Provider>
    )
}