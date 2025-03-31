import HeroSection from "../components/HeroSection"
import Category from "../sections/Category"
import Professionals from "../sections/Professionals"
import  Loader from "../components/Loading"
import {useState} from "react"

const Home=()=>{
    const [loading, setLoading] = useState(true); 
    
    return(
        <>
        {loading && <Loader/>}
        <div>
            <HeroSection/>
            <Category/>
            <Professionals setLoading={setLoading}/>
        </div>
         
        </>
    )
}

export default Home