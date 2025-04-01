import React, { useEffect, useState } from "react";
import Slidebar from "./ProSlidebar";
import img from "../../assets/user-img.jpeg";
import {AdminContext} from "../../context/AdminContext";
import {useContext} from 'react'
import { toast } from 'react-toastify';
import { useParams } from "react-router-dom";
import ProNav from "./ProNav";
import Loader from "../../components/Loading";

const AddProfessional = () => {
    const {findProfessional,updateProfessional}=useContext(AdminContext)
    const {id}=useParams() 

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    image: "",
    service: "",
    certification: "",
    experience: "",
    fees: "",
    address:"",
    about: "",
    pinCode:"",
    contactNumber:"",
    city:""
  });
   const [loading, setLoading] = useState(true);
  
  useEffect(()=>{

    const find=async()=>{
        const response=await findProfessional(id)
        console.log(response)
        setFormData(response)
        setLoading(false)
        console.log("HII")
    }

    find()
},[id])

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    setLoading(true)
    console.log(formData);
    window.scrollTo(0, 0)


    const res=await updateProfessional({id,formData})
    setLoading(false)
  };

  return (
    (
        <>
    {loading && <Loader/>}

            <ProNav/>
        
        <div className="admin-add-professional-page">
               <Slidebar/>
               <div className="admin-add-professional-right">
                 <div className="form-container">
                 <h2>Update Professional</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group image-upload">
                     <label htmlFor="doc-img">
                        <img className="professional-img-input" src={formData?.image} alt="img" />
                     </label>
                    </div>
                    
                    <div className="form-grid">
                    <div className="form-group">
                        <label>Your name</label>
                        <input type="text" name="name" value={formData?.name} placeholder="Name" onChange={handleChange} />
                    </div>
                    <div className="form-group">
                        <label>Service</label>
                        <select name="service" value={formData?.select} onChange={handleChange}>
                        <option>All Services</option>
                        <option>Carpentry</option>
                        <option>Pest Control</option>
                        <option>Electrician</option>
                        <option>Plumbing</option>
                        <option>Painting</option>
                        <option>AC Repair & Services</option>
                        <option>Home Deep Cleaning</option>
                        <option>Kitchen Cleaning</option>
                        <option>Bathroom Cleaning</option>
                        <option>Furniture Repair</option>
                        <option>Water Purifier Service</option>
                        <option>Home Security & Automation</option>
                        <option>Interior Designing</option>
                        <option>Appliance Repair</option>
                        <option>Washing Machine Repair</option>
                        <option>Refrigerator Repair</option>
                        <option>Microwave Repair</option>
                        <option>Geyser Repair</option>
                        <option>TV Installation & Repair</option>
                        <option>Gardening</option>
                        <option>Glass & Mirror Work</option>
                        <option>False Ceiling & POP</option>
                        <option>Packers & Movers</option>
                        <option>Water Tank Cleaning</option>
                        <option>Chimney Cleaning & Repair</option>
                        <option>Septic Tank Cleaning</option>
                        <option>Doorstep Car Wash</option>
                        <option>Home Sanitization</option>

                        </select>
                    </div>
                    <div className="form-group">
                        <label>Your Email</label>
                        <input value={formData?.email} type="email" name="email" placeholder="Your email" onChange={handleChange} disabled />
                    </div>
                    <div className="form-group">
                        <label>Certification <span className="small">(if avilable)</span></label>
                        <input value={formData?.certification} type="text" name="certification" placeholder="Certification" onChange={handleChange} />
                    </div>
                    <div className="form-group">
                        <label>Address</label>
                        <input  value={formData?.address}  type="text" name="address" placeholder="Address" onChange={handleChange} />
                    </div>
                    <div className="form-group">
                        <label>City</label>
                        <input  value={formData?.city}  type="text" name="city" placeholder="City" onChange={handleChange} />
                    </div>
                    <div className="form-group">
                        <label>Pin Code</label>
                        <input  value={formData.pinCode}  type="text" name="pinCode" placeholder="Pin Code" onChange={handleChange} />
                    </div>
                    <div className="form-group">
                        <label>Contact Number</label>
                        <input  value={formData?.contactNumber}  type="text"  name="contactNumber" placeholder="Mobile Number" onChange={handleChange} />
                    </div>
                    <div className="form-group">
                        <label>Experience</label>
                        <select  value={formData?.experience}  name="experience" onChange={handleChange}>
                        <option>Select</option>
                        <option>0-6 Months</option>
                        <option>6 Months</option>
                        <option>1 Year</option>
                        <option>2 Years</option>
                        <option>5+ Years</option>
                        </select>
                    </div>
                    
                    <div className="form-group">
                        <label>Fees <span className="small">(Per Service)</span></label>
                        <input  value={formData?.fees}  type="text" name="fees" placeholder="Your fees" onChange={handleChange} />
                    </div>
                    </div>
                    <div className="form-group">
                    <label  className="about-professionalAdd">About me <span className="small">(Minimum 50 Words)</span></label>
                    <textarea value={formData?.about} name="about" placeholder="Write about yourself" onChange={handleChange}></textarea>
                    </div>
                    <button type="submit" className="submit-btn" onClick={handleSubmit} >Update Details</button>
                </form>
                   </div>
               </div>

        </div>
        </>
    )
  );
};

export default AddProfessional