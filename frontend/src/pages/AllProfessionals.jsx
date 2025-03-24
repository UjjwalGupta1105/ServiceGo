import ProfessionalsCard from "../components/ProfessionalsCard";
import {AppContext} from '../context/AppContext';
import {useContext,useEffect,useState} from 'react';
import { AdminContext } from "../context/AdminContext";

const AllProfessionals=()=>{
    const {allProfessionals}=useContext(AdminContext);
    console.log(allProfessionals)
    const [professionals,setProfessionals]=useState([])

    useEffect(() => {
      const findProfessionals=async()=>{
        const response=await allProfessionals()
        setProfessionals(response.reverse())
        console.log(response)
      }



      findProfessionals()
        window.scrollTo(0, 0)
      }, [allProfessionals])

    return(
        <div className="professionals-page">
           <h2>Book Top Professionals</h2>
              <p>Find top-rated professionals for every home service need—trusted, skilled, and ready to help at your doorstep!</p>
                <div className='professionals-lists'>
                {professionals?.length === 0 &&  <div className="flex flex-col items-center justify-center h-80 bg-gray-100 rounded-lg shadow-md p-6">
      <img 
        src="https://cdn-icons-png.flaticon.com/512/2748/2748558.png" 
        alt="No Professionals Available" 
        className="w-24 h-24 mb-4 opacity-70 mt-7"

      />
      <h2 className="text-xl font-semibold text-gray-700">No Professionals Available</h2>
      <p className="text-gray-500 text-sm mt-2">We're sorry, but there are currently no professionals available. Please check back later.</p>
    </div>}
                {professionals?.map((serviceman, index) => (
                     <ProfessionalsCard key={index} serviceman={serviceman} />
                ))}
                
                </div>
        </div>
    )
}

export default AllProfessionals;