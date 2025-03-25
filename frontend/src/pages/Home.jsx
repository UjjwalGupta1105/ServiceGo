import HeroSection from "../components/HeroSection"
import Category from "../sections/Category"
import Professionals from "../sections/Professionals"


const Home=()=>{
    console.log(import.meta.env.VITE_BACKEND_URL)
    console.log(import.meta.env.VITE_RAZORPAY_KEY_ID)
    return(
        <div>
            <HeroSection/>
            <Category/>
            <Professionals/>
        </div>
    )
}

export default Home