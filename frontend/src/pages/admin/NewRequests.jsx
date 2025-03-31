import React, { useState,useContext,useEffect} from "react";
import {AppContext} from "../../context/AppContext"
import DeleteIcon from '@mui/icons-material/Delete';
import {useNavigate} from "react-router-dom"
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import Rating from '@mui/material/Rating';
import { Button } from '@mui/material'
import { Bookmark} from 'lucide-react';
import img from '../../assets/user-img.jpeg'
// import DeleteIcon from '@mui/icons-material/Edit';
import Loader from "../../components/Loading";
import Slidebar from "./Slidebar"


const NewRequests = () => {
  const [requests, setRequests] = useState([])
  const {getNewRequests,deleteRequest}=useContext(AppContext)
  const [loading, setLoading] = useState(true);

  const getData=async()=>{
    const response=await getNewRequests()
    console.log(response)
    setRequests(response.reverse())
    setLoading(false)
  }

  const DeleteReq=async(id)=>{
    console.log(id)
    setLoading(true)
    const response=await deleteRequest(id)
    getData()
    setLoading(false)
  }

  useEffect(()=>{
    getData()
  },[])

  return(
    <>
     <div className="admin-bookings-page">
                <Slidebar/>
                <div className="admit-products-list">
                <>
    
    <div className="appointments-container" style={{width:"94%"}}>
  <h2>New Requests</h2>
  {requests.length === 0 && <>
          <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-xl p-8 text-center my-12 mx-10 py-10 rounded-lg">
                      <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Bookmark size={24} className="text-indigo-600" />
                      </div>
                      <h3 className="text-lg font-medium text-gray-900 mb-2">No New Requests Found !!</h3>
                    </div>
  
        </>}
  {requests?.map((request, index) => (
        <>
       <div className="review-card relative" style={{margin:"20px auto",paddingLeft:"10px"}}>
                          <div> <img  style={{marginLeft:"20px"}} src={img} alt="User" /></div>
                            
                             <div className="review-data">
                             <p className='reviewer-name' style={{fontSize:"20px"}}>{request.name}</p>
                           <p style={{fontSize:"16px",color:"grey",marginLeft:"5px",marginBottom:"12px"}}>{request.email}</p>
                           <p className="review-comment"><span style={{fontWeight:600,marginLeft:"7px"}}>Service :</span> {request.service}</p>
                           <p className="review-comment"><span style={{fontWeight:600,marginLeft:"7px"}}>City :</span> {request.city}</p>
                            <p className="review-comment"><span style={{fontWeight:600,marginLeft:"7px"}}>Message :</span> {request.message}</p>
                             </div>

                             <div className='absolute top-18 right-16 bg-grey-400 p-2 border-auto rounded-full cursor-pointer' title="Delete"
                                     onClick={()=>DeleteReq(request._id)}
                                     ><DeleteIcon/></div>
      </div>
    </>   
    ))}

  
    </div>
</>
                </div>
            </div>
    </>
  )
};

export default NewRequests;