import axios from "axios";
import * as React from 'react';
import Rating from '@mui/material/Rating';
import Stack from '@mui/material/Stack';
import Slidebar from "./Slidebar"
import { AdminContext } from "../../context/AdminContext"
import { useEffect,useContext,useState } from "react"
import { useParams,useNavigate } from "react-router-dom"
import { AppContext } from "../../context/AppContext"


const AdminProfessionalPage = () => {
   const {allProfessionals,deleteProfessional,updateProfessionalAvailability}=useContext(AdminContext)
   const [professionals, setProfessionals] = useState([]);
   const [filteredProfessionals, setFilteredProfessionals] = useState([]);

  const {title} = useParams();
  const navigate=useNavigate()  
//   const {Professionals}=useContext(AppContext)
  

const filterProfessionals=()=>{
  if(title && title!=='all-services'){
    const data=professionals.filter((professional)=>professional.service===decodeURIComponent(title))
    setFilteredProfessionals(data)
  }
  else{
    setFilteredProfessionals(professionals)
  }
}

useEffect(()=>{
  filterProfessionals()
},[title,professionals])

  useEffect(() => {
    const fetchProfessionals=async()=>{
                    const response=await allProfessionals()
                    setProfessionals(response.reverse())
                }
                fetchProfessionals()
                
  }, [professionals]);

  const handleDelete = async (id) => {
    try {
      console.log(id)
          await deleteProfessional(id)
          window.scrollTo(0,0)
    } catch (error) {
          console.error("Error deleting professional:", error);
    }
  };

  const handleUpdate = (id) => {
    navigate(`/admin/update-professional/${id}`)
  };

  return (
    <div className="admin-users-page">
               <Slidebar/>
               <div className="admin-users-right">
               <div className="admin-container">
               <div className="admin-professionals-topChoices service-page-division-left ">
                  <p onClick={() => navigate("/admin/professionals/all-services")} className={`${title === "all-services" ? "p-new" : ""}`}>All Services</p>
                  <p onClick={() => title !== "Carpentry" ? navigate("/admin/professionals/Carpentry") : navigate("/admin/professionals/all-services")} className={`${title === "Carpentry" ? "p-new" : ""}`}>Carpentry</p>
                  <p onClick={() => title !== "Pest Control" ? navigate(`/admin/professionals/${encodeURIComponent("Pest Control")}`) : navigate("/admin/professionals/all-services")} className={`${title === "Pest Control" ? "p-new" : ""}`}>Pest Control</p>
                  <p onClick={() => title !== "Electrician" ? navigate("/admin/professionals/Electrician") : navigate("/admin/professionals/all-services")} className={`${title === "Electrician" ? "p-new" : ""}`}>Electrician</p>
                  <p onClick={() => title !== "Plumbing" ? navigate("/admin/professionals/Plumbing") : navigate("/admin/professionals/all-services")} className={`${title === "Plumbing" ? "p-new" : ""}`}>Plumbing</p>
                  <p onClick={() => title !== "Painting" ? navigate("/admin/professionals/Painting") : navigate("/admin/professionals/all-services")} className={`${title === "Painting" ? "p-new" : ""}`}>Painting</p>
                  <p onClick={() => title !== "AC Repair & Services" ? navigate(`/admin/professionals/${encodeURIComponent("AC Repair & Services")}`) : navigate("/admin/professionals/all-services")} className={`${title === "AC Repair & Services" ? "p-new" : ""}`}>AC Repair & Services</p>
                  <p onClick={() => title !== "Home Deep Cleaning" ? navigate(`/admin/professionals/${encodeURIComponent("Home Deep Cleaning")}`) : navigate("/admin/professionals/all-services")} className={`${title === "Home Deep Cleaning" ? "p-new" : ""}`}>Home Deep Cleaning</p>
                  <p onClick={() => title !== "Bathroom Cleaning" ? navigate(`/admin/professionals/${encodeURIComponent("Bathroom Cleaning")}`) : navigate("/admin/professionals/all-services")} className={`${title === "Bathroom Cleaning" ? "p-new" : ""}`}>Bathroom Cleaning</p>
                  <p onClick={() => title !== "Furniture Repair" ? navigate(`/admin/professionals/${encodeURIComponent("Furniture Repair")}`) : navigate("/admin/professionals/all-services")} className={`${title === "Furniture Repair" ? "p-new" : ""}`}>Furniture Repair</p>
                  <p onClick={() => title !== "Water Purifier Service" ? navigate(`/admin/professionals/${encodeURIComponent("Water Purifier Service")}`) : navigate("/admin/professionals/all-services")} className={`${title === "Water Purifier Service" ? "p-new" : ""}`}>Water Purifier Service</p>
                  <p onClick={() => title !== "Home Security & Automation" ? navigate(`/admin/professionals/${encodeURIComponent("Home Security & Automation")}`) : navigate("/admin/professionals/all-services")} className={`${title === "Home Security & Automation" ? "p-new" : ""}`}>Home Security & Automation</p>
                  <p onClick={() => title !== "Appliance Repair" ? navigate(`/admin/professionals/${encodeURIComponent("Appliance Repair")}`) : navigate("/admin/professionals/all-services")} className={`${title === "Appliance Repair" ? "p-new" : ""}`}>Appliance Repair</p>
                  <p onClick={() => title !== "TV Installation & Repair" ? navigate(`/admin/professionals/${encodeURIComponent("TV Installation & Repair")}`) : navigate("/admin/professionals/all-services")} className={`${title === "TV Installation & Repair" ? "p-new" : ""}`}>TV Installation & Repair</p>
                  <p onClick={()=> title!=="Gardening" ? navigate(`/admin/professionals/${encodeURIComponent("Gardening")}`) : navigate("/admin/professionals/all-services")} className={ `${title === "Gardening" ? "p-new" : ""}`}>Gardening</p>
                  <p onClick={()=> title!=="Glass & Mirror Work" ? navigate(`/admin/professionals/${encodeURIComponent("Glass & Mirror Work")}`) : navigate("/admin/professionals/all-services")} className={ `${title === "Glass & Mirror Work" ? "p-new" : ""}`}>Glass & Mirror Work</p>
                  <p onClick={() => title !== "Packers & Movers" ? navigate(`/admin/professionals/${encodeURIComponent("Packers & Movers")}`) : navigate("/admin/professionals/all-services")} className={`${title === "Packers & Movers" ? "p-new" : ""}`}>Packers & Movers</p>
                  <p onClick={()=> title!=="Water Tank Cleaning" ? navigate(`/admin/professionals/${encodeURIComponent("Water Tank Cleaning")}`) : navigate("/admin/professionals/all-services")} className={ `${title === "Water Tank Cleaning" ? "p-new" : ""}`}>Water Tank Cleaning</p>
                  <p onClick={()=> title!=="Septic Tank Cleaning" ? navigate(`/admin/professionals/${encodeURIComponent("Septic Tank Cleaning")}`) : navigate("/admin/professionals/all-services")} className={ `${title === "Septic Tank Cleaning" ? "p-new" : ""}`}>Septic Tank Cleaning</p>
                  <p onClick={() => title !== "Doorstep Car Wash" ? navigate(`/admin/professionals/${encodeURIComponent("Doorstep Car Wash")}`) : navigate("/admin/professionals/all-services")} className={`${title === "Doorstep Car Wash" ? "p-new" : ""}`}>Doorstep Car Wash</p>
                  <p onClick={() => title !== "Home Sanitization" ? navigate(`/admin/professionals/${encodeURIComponent("Home Sanitization")}`) : navigate("/admin/professionals/all-services")} className={`${title === "Home Sanitization" ? "p-new" : ""}`}>Home Sanitization</p>
                </div>

                    <div className="professional-grid">
                    {filteredProfessionals?.length === 0 &&  <div className="flex flex-col items-center justify-center h-80 bg-gray-100 rounded-lg shadow-md p-6">
      <img 
        src="https://cdn-icons-png.flaticon.com/512/2748/2748558.png" 
        alt="No Professionals Available" 
        className="w-24 h-24 mb-4 opacity-70 mt-7"

      />
      <h2 className="text-xl font-semibold text-gray-700">No Professionals Available</h2>
      <p className="text-gray-500 text-sm mt-2">We're sorry, but there are currently no professionals available. Please check back later.</p>
    </div>}
                        {filteredProfessionals?.map((pro) => (
                          
                        <div className="professional-card" key={pro._id}>
                            <div className="img-section">
                              <img src={pro.image} alt={pro.name} className="professional-image" />
                             
                            </div>

                            <div>
                            <input type="checkbox" className="professional-check" checked={pro.available} onClick={()=>updateProfessionalAvailability(pro._id)} />
                              <span
                                className={`professional-availability ${pro.available ? "available" : "unavailable"}`}
                              >
                                {pro.available ? "Available" : "Unavailable"}
                              </span>
                            </div>
                            
                            <div className="professional-info">
                            <h3>{pro.name}</h3>
                            <p className="rating">
                            <Stack spacing={1}>
                                <Rating name="half-rating-read" defaultValue={pro.rating} precision={0.5} readOnly />
                            </Stack>
                            <span className="professional_rating">({pro.rating || "New"})</span>
                            </p>
                            <p><strong>Speciality:</strong> {pro.service}</p>
                            <p><strong>Experience:</strong> {pro.experience}</p>
                            <p><strong>Fees:</strong> ₹ {pro.fees}</p>
                            <p><strong>Address:</strong> {pro.address}, {pro.city} - {pro.pinCode} </p>
                            <div className="button-group">
                                <button className="update-btn" onClick={() => handleUpdate(pro._id)}>Update</button>
                                <button className="delete-btn" onClick={() => handleDelete(pro._id)}>Remove</button>
                            </div>
                            </div>
                        </div>
                        ))}
                    </div>
                    </div>
               </div>

        </div>
  );
};

export default AdminProfessionalPage;