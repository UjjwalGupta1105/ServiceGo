import ProfessionalsCard from "../components/ProfessionalsCard";
import {useState,useEffect,useContext, use} from 'react';
import {AppContext} from '../context/AppContext';
import { AdminContext } from "../context/AdminContext";
import { useParams,useNavigate } from "react-router-dom";
import Loader from "../components/Loading";

const Services=()=>{
  const { allProfessionals } = useContext(AdminContext);
    const [all_professionals,setALL_Professionals]=useState([])
    const  [professionals,setProfessionals]=useState([])
    const [loading, setLoading] = useState(true); 
  
    useEffect(()=>{
      const getData=async()=>{
        const response=await allProfessionals()
        setALL_Professionals(response)
        setLoading(false)
      }
      window.scrollTo(0, 0)
      getData()
    },[])

      const {title} = useParams();
      const navigate=useNavigate()  

    const filterProfessionals=()=>{
      if(title && title!=='all-services'){
        const filteredProfessionals=all_professionals.filter((professional)=>professional.service===title)
        setProfessionals(filteredProfessionals)
        console.log(filteredProfessionals)
      }
      else{
        setProfessionals(all_professionals)
      }
    }
    useEffect(()=>{
      filterProfessionals()
      window.scrollTo(0, 0)
    },[title,all_professionals])

    useEffect(()=>{
      window.scrollTo(0, 0)
    },[loading])

    return(
      <>
       {loading && <Loader/>} 
        <div className="service-page">
            {/* <h1>Services</h1>
            <p>Find expert home services for every need – quick, reliable, and hassle-free!</p> */}
            <h1>Find Expert Professionals for Every Home Service</h1>  
            <p>Browse through various service categories and connect with top-rated professionals for your needs. From cleaning to repairs, get the best experts at your doorstep!</p>
            <div className="service-page-division">
              <div className="service-page-division-left">
              <p onClick={()=> navigate("/Services/all-services")} className={ `${title === "all-services" ? "p-new" : ""}`}>All Services</p>
                  <p onClick={()=> title!=="Carpentry" ? navigate("/Services/Carpentry") : navigate("/Services/all-services")} className={ `${title === "Carpentry" ? "p-new" : ""}`}>Carpentry</p>
                  <p onClick={()=> title!=="Pest Control" ? navigate("/Services/Pest Control") : navigate("/Services/all-services")} className={ `${title === "Pest Control" ? "p-new" : ""}`}>Pest Control</p>
                  <p onClick={()=> title!=="Electrician" ? navigate("/Services/Electrician") : navigate("/Services/all-services")} className={ `${title === "Electrician" ? "p-new" : ""}`}>Electrician</p>
                  <p onClick={()=> title!=="Plumbing" ? navigate("/Services/Plumbing") : navigate("/Services/all-services")} className={ `${title === "Plumbing" ? "p-new" : ""}`}>Plumbing</p>
                  <p onClick={()=> title!=="Painting" ? navigate("/Services/Painting") : navigate("/Services/all-services")} className={ `${title === "Painting" ? "p-new" : ""}`}>Painting</p>
                  <p onClick={()=> title!=="AC Repair & Services" ? navigate("/Services/AC Repair & Services") : navigate("/Services/all-services")} className={ `${title === "AC Repair & Services" ? "p-new" : ""}`}>AC Repair & Services</p>
                  <p onClick={()=> title!=="Home Deep Cleaning" ? navigate("/Services/Home Deep Cleaning") : navigate("/Services/all-services")} className={ `${title === "Home Deep Cleaning" ? "p-new" : ""}`}>Home Deep Cleaning</p>
                  <p onClick={()=> title!=="Bathroom Cleaning" ? navigate("/Services/Bathroom Cleaning") : navigate("/Services/all-services")} className={ `${title === "Bathroom Cleaning" ? "p-new" : ""}`}>Bathroom Cleaning</p>
                  <p onClick={()=> title!=="Water Purifier Service" ? navigate("/Services/Water Purifier Service") : navigate("/Services/all-services")} className={ `${title === "Water Purifier Service" ? "p-new" : ""}`}>Water Purifier Service</p>
                  <p onClick={()=> title!=="Appliance Repair" ? navigate("/Services/Appliance Repair") : navigate("/Services/all-services")} className={ `${title === "Appliance Repair" ? "p-new" : ""}`}>Appliance Repair</p>
                  <p onClick={()=> title!=="Washing Machine Repair" ? navigate("/Services/Washing Machine Repair") : navigate("/Services/all-services")} className={ `${title === "Washing Machine Repair" ? "p-new" : ""}`}>Washing Machine Repair</p>
                  <p onClick={()=> title!=="Refrigerator Repair" ? navigate("/Services/Refrigerator Repair") : navigate("/Services/all-services")} className={ `${title === "Refrigerator Repair" ? "p-new" : ""}`}>Refrigerator Repair</p>
                  <p onClick={()=> title!=="Microwave Repair" ? navigate("/Services/Microwave Repair") : navigate("/Services/all-services")} className={ `${title === "Microwave Repair" ? "p-new" : ""}`}>Microwave Repair</p>
                  <p onClick={()=> title!=="TV Installation & Repair" ? navigate("/Services/TV Installation & Repair") : navigate("/Services/all-services")} className={ `${title === "TV Installation & Repair" ? "p-new" : ""}`}>TV Installation & Repair</p>
                  <p onClick={()=> title!=="Gardening" ? navigate("/Services/Gardening") : navigate("/Services/all-services")} className={ `${title === "Gardening" ? "p-new" : ""}`}>Gardening</p>
                  <p onClick={()=> title!=="Glass & Mirror Work" ? navigate("/Services/Glass & Mirror Work") : navigate("/Services/all-services")} className={ `${title === "Glass & Mirror Work" ? "p-new" : ""}`}>Glass & Mirror Work</p>
                  <p onClick={()=> title!=="Packers & Movers" ? navigate("/Services/Packers & Movers") : navigate("/Services/all-services")} className={ `${title === "Packers & Movers" ? "p-new" : ""}`}>Packers & Movers</p>
                  <p onClick={()=> title!=="Water Tank Cleaning" ? navigate("/Services/Water Tank Cleaning") : navigate("/Services/all-services")} className={ `${title === "Water Tank Cleaning" ? "p-new" : ""}`}>Water Tank Cleaning</p>
                  <p onClick={()=> title!=="Septic Tank Cleaning" ? navigate("/Services/Septic Tank Cleaning") : navigate("/Services/all-services")} className={ `${title === "Septic Tank Cleaning" ? "p-new" : ""}`}>Septic Tank Cleaning</p>
                  <p onClick={()=> title!=="Doorstep Car Wash" ? navigate("/Services/Doorstep Car Wash") : navigate("/Services/all-services")} className={ `${title === "Doorstep Car Wash" ? "p-new" : ""}`}>Doorstep Car Wash</p>
                  <p onClick={()=> title!=="Home Sanitization" ? navigate("/Services/Home Sanitization") : navigate("/Services/all-services")} className={ `${title === "Home Sanitization" ? "p-new" : ""}`}>Home Sanitization</p>

              </div>
                <div className='service-page-division-right'>
                {professionals.map((serviceman, index) => (
                     <ProfessionalsCard key={index} serviceman={serviceman} />
                ))}
                {professionals?.length === 0 &&  <div className="give-marg flex flex-col items-center justify-center h-80 bg-gray-100 rounded-lg shadow-md  p-6">
      <img 
        src="https://cdn-icons-png.flaticon.com/512/2748/2748558.png" 
        alt="No Professionals Available" 
        className="w-24 h-24 mb-4 opacity-70 mt-7"

      />
      <h2 className="text-xl font-semibold text-gray-700">No Professionals Available</h2>
      <p className="text-gray-500 text-sm mt-2">We're sorry, but there are currently no professionals available. Please check back later.</p>
    </div>}
                </div>
            </div>
        </div>
        </>
    )
}

export default Services;