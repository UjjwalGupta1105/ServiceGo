import {createContext} from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

export const AdminContext = createContext(null);

export const AdminContextProvider=({children})=>{

   
    const addProfessional = async(formData) => {
        try {
            console.log(formData);
            const response= await axios.post("http://localhost:8000/register-professional",formData,{
                headers: { "Content-Type": "multipart/form-data" },
              })
            
            console.log(response);
            if(response.data.success){
                toast.success("Professional Added Successfully")
                return true
            }
            else{
                toast.error(response.data.message)
                return false
            }
        } catch (error) {
            toast.error(error.response.data.message)
            return false
        }
    }

    const allProfessionals=async()=>{
        try{
            const response=await axios.get("http://localhost:8000/admin/all-professionals")
            if(response.data.success){
                return response.data.professionals
            }
            else{
                toast.error(response.data.message)
                return []
            }
        }
        catch(error){
            toast.error(error.data)
            return []
        }
    }
    const updateProfessional=async({id,formData})=>{
        try{
            console.log(formData)
            const response=await axios.patch(`http://localhost:8000/admin/update-professional/${id}`,formData,{
                headers: { "Content-Type": "multipart/form-data" },
              })
            console.log(response)
            if(response.data.success){
                toast.success("User Updated Successfully")
                return response.data.professionals
            }
        }
        catch(error){
            console.log(error)
            toast.error(error.response.data.message)
            return []
        }
    }
    const updateProfessionalAvailability=async(id)=>{
        try{
            const response=await axios.patch(`http://localhost:8000/admin/change-availability/${id}`)
            console.log(response)
            if(response.data.success){
                return response.data
            }
            else{
                toast.error(response.data.message)
                return []
            }
        }
        catch(error){
            toast.error(error.response.data.message)
            return []
        }
    }
    const deleteProfessional=async(id)=>{
        try{
            console.log(id)
            const response=await axios.delete(`http://localhost:8000/admin/delete-professional/${id}`)
            console.log(response)
            if(response.status==200){
                toast.success("Professional Deleted Sucessfully")
            }
            else{
                toast.error("error")
                return []
            }
        }
        catch(error){
            toast.error(error)
            return []
        }
    }

    const findProfessional=async(id)=>{
        try {
            const response=await axios.get(`http://localhost:8000/admin/get-Professional/${id}`)
            if (response){
                console.log(response.data)
                return response.data
            }
            else{
                toast.error("Error in Fetching")
            }
        } catch (error) {
            console.log(error)
            toast.error("Error in Fetching")
        }
    }

    const all_bookings=async()=>{
        try{
            const response=await axios.get("http://localhost:8000/admin/get-appointments")
            if(response.data.success){
                return response.data.appointments
            }
        }
        catch(error){
            toast.error(error)
            return []
        }
    }

    const DashData=async()=>{
        try {
            const response=await axios.get(`http://localhost:8000/admin/dashData`)
            if (response.data.success){
                console.log(response.data.data)
                return response.data.data
            }
        } catch (error) {
            console.log(error)
            toast.error("Error in Fetching")
        }
    }


    const getAllUsers=async()=>{
        try {
            const response=await axios.get("http://localhost:8000/admin/get-users")
            console.log(response.data)
            if(response.data.success){
                return response.data.users
            }
        } catch (error) {
            console.log(error)
            toast.error(error)
        }
    }

    const deleteUser=async(id)=>{
        try{
            console.log(id)
            const response=await axios.delete(`http://localhost:8000/admin/user/delete/${id}`)
            console.log(response)
            if(response.data.success){
                toast.success(response.data.message)
            }
        }
        catch(error){
            toast.error(error.response.data.message)
            return []
        }
    }

    const viewUser=async(id)=>{
        try {
            console.log("id is" + id)
            const response=await axios.get(`http://localhost:8000/admin/get-user/${id}`)
            if (response.data.success){
                console.log(response.data)
                return response.data.user
            }
        } catch (error) {
            console.log(error)
            toast.error("Error in Fetching")
        }
    }

    const updateUser=async({name,additionalInfo,id})=>{
        try {
            const response=await axios.patch(`http://localhost:8000/user/update/${id}`,{name,additionalInfo},{
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
 

    return(
        <AdminContext.Provider value={{addProfessional,allProfessionals,updateProfessional,getAllUsers,deleteUser,viewUser,updateUser,
        updateProfessionalAvailability,deleteProfessional,findProfessional,all_bookings,DashData}}>
            {children}
        </AdminContext.Provider>
    )
}