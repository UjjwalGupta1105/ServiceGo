import { useState,useEffect,useContext } from "react";
import { useNavigate ,useParams } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import { AdminContext } from "../context/AdminContext";
import * as React from 'react';
import Rating from '@mui/material/Rating';
import Stack from '@mui/material/Stack';
import img from "../assets/logo2.jpg"
import ReviewCard from "../components/ReviewCard";
import { toast } from 'react-toastify';
import Loader from "../components/Loading";

const ProfessionalData = () => {
    const [professionalsList,setProfessionalsList]=useState([])
    const [person,setPerson]=useState();
    const {_id}=useParams();
    console.log(_id)
    const navigate=useNavigate()
    const {Professionals,isAuthenticated,confirmBooking,currBooking,setCurrBooking} = useContext(AppContext);
    const {allProfessionals} = useContext(AdminContext);
    const [loading, setLoading] = useState(true);

    const [slots,setSlots]=useState([])
    const [slotIndex,setSlotIndex]=useState(0)
    const [slotTime,setSlotTime]=useState()
    const daysOfWeek=["MON","TUE","WED","THU","FRI","SAT","SUN"];

    const getData = async() => {
        console.log(professionalsList)
        const data=professionalsList.filter((item)=>{
            return item._id===_id
        })
        console.log(data)
        const result=data[0]
        console.log(result)
        setPerson(result);
        console.log(person)
    }

    const getAvailableSlots=()=>{
        setSlots([])

        let today=new Date()

        for(let i=0;i<7;i++){
            let currDate=new Date(today)
            currDate.setDate(today.getDate()+i)

            let endTime=new Date()
            endTime.setDate(today.getDate()+i)
            endTime.setHours(21,0,0,0)

            if(today.getDate()===currDate.getDate()){
                currDate.setHours(currDate.getHours()>10 ? currDate.getHours()+1 :10)
                currDate.setMinutes(currDate.getMinutes()>30 ? 30: 0 )
            }
            else{
                currDate.setHours(10)
                currDate.setMinutes(0)
            }

            let timeSlots=[]

            while(currDate<endTime){
                let timeFormat=currDate.toLocaleTimeString([],{hour:'2-digit',minute:'2-digit'})

                let day=currDate.getDate()
                let month=currDate.getMonth()+1
                let year=currDate.getFullYear()

                const slotdate=day + "-" + month + "-" + year
                const slotTime=timeFormat

                const isAvailable=person?.slots_booked && person?.slots_booked[slotdate] && person?.slots_booked[slotdate]?.includes(slotTime) ? false :true 

                if(isAvailable){
                    timeSlots.push({
                        dateTime: new Date(currDate),
                        time:timeFormat
                    })
                }
            

                currDate.setHours(currDate.getHours()+2)
                // currDate.setMinutes(currDate.getMinutes()+30)
            }
            

            setSlots((prev)=>([...prev,timeSlots]))
            setLoading(false)
        }
    }

    const setBooking=async()=>{
        window.scrollTo(0,0)
    if(!isAuthenticated){
        toast.error("Login to book Professional")
        navigate("/register")
        return
    }

    if(!slotTime){
        toast.error("Select the time slot")
        return
    }


    try{
        const date=slots[slotIndex][0].dateTime

        const day=date.getDate()
        const month=date.getMonth()+1
        const year=date.getFullYear()

        const slotDate=day + "-" +month +"-" + year
        let professionalId=_id
        console.log(professionalId,slotDate,slotTime)

        // const response=await confirmBooking({professionalId,slotDate,slotTime})
        // localStorage.setItem("booking", JSON.stringify({professionalId,slotDate,slotTime}));
        console.log(currBooking)
        await setCurrBooking({...currBooking,bookingObject:{professionalId,slotDate,slotTime}})
        // console.log(response)
        // if(response.success){
            // navigate("/my-bookings")
        // }
      navigate("/booking/address")

    }
    catch{

    }
    }

    useEffect(()=>{
        const fetchAllProfessionals=async()=>{
            const response=await allProfessionals()
            setProfessionalsList(response)
            console.log(response)
        }
        window.scrollTo(0,0)
        fetchAllProfessionals();
    },[_id,allProfessionals])

    useEffect(()=>{
        getData()
     },[professionalsList])

    useEffect(()=>{
       getAvailableSlots()
    },[person])


    return (
        <>
            {loading && <Loader/>}
            <div className="ProfessionalData-page">
          <div className="ProfessionalData-firstSection">
            <div className="professional-img">
                <img src={person?.image} alt="img" />
            </div>
            <div className="ProfessionalData-page-content">
            <div className="availablecheck">
                <span
                    className={`availability ${person?.available ? "available" : "unavailable"}`}
                 >
                    {person?.available ? "Available" : "Unavailable"}
                </span>
                </div>
                <h3>{person?.name}</h3>
                <h5>Role : <span>{person?.service}</span></h5>
                <p className="experience">Experience : <span>{person?.experience}</span></p>
                <div className="ratings">
                  {person &&  <Stack spacing={1}>
                      <Rating name="half-rating-read" defaultValue={person?.rating} precision={0.5} readOnly />
                    </Stack>}
                    <span style={{color:"black",fontWeight:450,fontSize:"18px"}}>({person?.rating || "New"})</span>
                </div>
                
                <div className="price">
                    ₹
                    <span> {person?.fees} / service</span>  
                 </div>   
            
              </div>
            </div>

            {/* Slot Booking */}
            <div className="BookingSlots">
                <h2>Booking Slots</h2>
                <div className="slots-set" >
                   { slots.length && slots.map((item,ind)=>{
                     return <div onClick={()=>setSlotIndex(ind)} className={`slot-box ${slotIndex===ind ? "selected-slot" :" " }`}>
                        <p>{item[0] && daysOfWeek[item[0].dateTime.getDay()]}</p>
                        <p>{item[0] && item[0].dateTime.getDate()}</p>
                     </div>
                   })}
                </div>
                <div className="time-slots">
                    { slots.length  &&
                        slots[slotIndex].length ? 
                     slots[slotIndex].map((item,ind)=>{
                        return <p onClick={()=>setSlotTime(item.time)} className={`${item.time===slotTime ? "selected-slot" :" " }`}>
                            {item.time.toLowerCase()}
                        </p>
                    })
                    :
                    <h4>Sorry, No Slots Available for this Date.....</h4>
                    }
                </div>

                <button className="book-visit" onClick={setBooking}>Book Visit</button>
            </div>

            <div className="data">
                <div className="about">
                    <h2>About</h2>
                    <p>{person?.about}</p>
                </div>
                <div className="reviews">
                  <h2>Reviews</h2>
                    {person?.reviews?.map((review, index) => (
                        <ReviewCard key={index} review={review} />
                    ))}
                    {
                        !person?.reviews?.length && <h4 style={{textAlign:"center",margin:"35px"}}>No Reviews Yet...</h4>
                    }
                </div>
            </div>
        </div>
        </>
        
    );
    }

export default ProfessionalData;