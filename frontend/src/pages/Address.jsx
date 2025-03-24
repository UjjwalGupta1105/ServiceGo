import React,{useState,useContext,useEffect} from 'react'
import {useNavigate} from 'react-router-dom'
import { toast } from 'react-toastify';
import PinDropIcon from '@mui/icons-material/PinDrop';
import HomeIcon from '@mui/icons-material/Home';
import LocationCityIcon from '@mui/icons-material/LocationCity';
import PublicIcon from '@mui/icons-material/Public';
import PhoneIcon from '@mui/icons-material/Phone';
import TransferWithinAStationIcon from '@mui/icons-material/TransferWithinAStation'
import Stepper from "./Stepper(Path)"
import { AppContext } from '../context/AppContext';

const Address=()=>{
    const navigate=useNavigate()
    // const {shippingInfo} =useSelector((state)=>state.cart)
        const [addressInfo,setAddressInfo]=useState({
            address:"",
            city:"",
            state:"",
            country:"",
            pincode:"",
            phone:""
        })
         const [userData, setUserData] = useState({})
        const [address,setAddress]=useState(addressInfo?.address)
        const [city,setCity]=useState(addressInfo?.city)
        const [state,setState]=useState(addressInfo?.state)
        const [country,setCountry]=useState(addressInfo?.country)
        const [pincode,setPincode]=useState(addressInfo?.pincode)
        const [phone,setPhone]=useState(addressInfo?.phone)

        const {currBooking,setCurrBooking,auth,updateUserAddress}=useContext(AppContext)
        console.log(currBooking)
        
        const handelShippingSubmit=async(e)=>{
           e.preventDefault()

           if(phone.length<10||phone.length>10){
            toast.error("Phone Number should be of 10 Digits")
            return
           }
           setAddressInfo({
            address,
            city,
            state,
            country,
            pincode,
            phone
        })
        const res=await updateUserAddress({
            address,
            city,
            state,
            country,
            pincode,
            phone
        })
        // const storedBooking = localStorage.getItem("booking");

        // const bookingObject = storedBooking ? JSON.parse(storedBooking) : null;
        // localStorage.removeItem("booking");
        // localStorage.setItem("booking", JSON.stringify({addressInfo,bookingObject}));
        setCurrBooking({...currBooking,addressInfo:{
            address,
            city,
            state,
            country,
            pincode,
            phone
        }})
        sessionStorage.setItem("booking", JSON.stringify({...currBooking,addressInfo:{
            address,
            city,
            state,
            country,
            pincode,
            phone
        }}));
           navigate("/booking/confirm")
        }

        useEffect(()=>{
            window.scrollTo(0,0)
            const find=async()=>{ 
                const res=await auth()
                if(res.sucess){
                  console.log(res.user)
                  setUserData(res.user)
                }
              }
          
              find()
        },[])

        useEffect(()=>{
            console.log("SAMLIII SamLIIII.....")
            console.log(userData?.additionalInfo)
          setAddressInfo(userData.additionalInfo)
          setAddress(userData.additionalInfo?.address)
          setCity(userData.additionalInfo?.city)
          setPincode(userData.additionalInfo?.pincode)
          setPhone(userData.additionalInfo?.phone)
          setCountry(userData.additionalInfo?.country)
          setState(userData.additionalInfo?.state)

        },[userData])

    return(
        <>
        <div className="stepper">
            <Stepper activePage={0}/> 
        </div>
         
            <div className="shipping-page">
                <h2>Shipping Details</h2>
                <div className="shipping-form">
                    <form onSubmit={handelShippingSubmit}>
                    <div className='shipping-form-div' >
                        <div><HomeIcon/></div>
                        <input type="text" placeholder='Full Address'  className='form-input' required value={address} onChange={(e)=>setAddress(e.target.value)} />
                    </div>
                    <div  className='shipping-form-div'>
                        <div><LocationCityIcon/></div>
                        <input type="text" placeholder='City'  className='form-input'  required value={city} onChange={(e)=>setCity(e.target.value)} />
                    </div>
                    <div  className='shipping-form-div'>
                        <div><PinDropIcon/></div>
                        <input type="number" placeholder='Pincode'  className='form-input' required value={pincode} onChange={(e)=>setPincode(e.target.value)} />
                    </div>
                    <div  className='shipping-form-div'>
                        <div><PhoneIcon/></div>
                        <input type="number" placeholder='Phone Number'  className='form-input'  required value={phone} onChange={(e)=>setPhone(e.target.value)} />
                    </div>

                    <div className='shipping-form-div'>
                        <div><PublicIcon/></div>
                        <input type="text" placeholder='Country'  className='form-input'  required value={country} onChange={(e)=>setCountry(e.target.value)} />
                        </div>

                        <div className='shipping-form-div'>
                        <div><TransferWithinAStationIcon/></div>
                        <input type="text" placeholder='State'  className='form-input'  required value={state} onChange={(e)=>setState(e.target.value)} />
                         </div>
                    
                    <input type="submit" value="Continue" className='shipping-button' disabled={state?false:true}></input>
                    </form>
                </div>
            </div>
        </>
    )
}

export default Address