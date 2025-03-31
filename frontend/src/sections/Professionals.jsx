import ProfessionalsCard from '../components/ProfessionalsCard'
import { AdminContext } from '../context/AdminContext'
import { AppContext } from '../context/AppContext'
import { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'  

const Professionals = ({ setLoading }) => {
  const { allProfessionals } = useContext(AdminContext);
  const [professional,setProfessional]=useState([])

  useEffect(()=>{
    const getData=async()=>{
      const response=await allProfessionals()
      setProfessional(response)
      setLoading(false)
    }
    getData()
  },[setLoading])

  const navigate = useNavigate()
  
    return (
        <>
            <div className="professionals-section">
              <h2>Book Top Professionals</h2>
              <p>Meet the Best Professionals – Skilled, Verified, and Ready to Serve!</p>
                <div className='professionals-lists'>
                {professional.slice(0,6).map((serviceman, index) => (
                     <ProfessionalsCard key={index} serviceman={serviceman} />
                ))}
                {professional?.length === 0 &&  <div className="give-marg flex flex-col items-center justify-center h-80 bg-gray-100 rounded-lg shadow-md  p-6">
      <img 
        src="https://cdn-icons-png.flaticon.com/512/2748/2748558.png" 
        alt="No Professionals Available" 
        className="w-24 h-24 mb-4 opacity-70 mt-7"

      />
      <h2 className="text-xl font-semibold text-gray-700">No Professionals Available</h2>
      <p className="text-gray-500 text-sm mt-2">We're sorry, but there are currently no professionals available. Please check back later.</p>
    </div>}
                </div>
                <button className='more-button' onClick={()=>navigate("/Services/all-services")}>Show more</button>
            </div>
        </>
    )
}

export default Professionals