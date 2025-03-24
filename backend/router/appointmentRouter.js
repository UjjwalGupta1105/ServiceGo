const express=require("express")
const router=express.Router()
router.use(express.json())
const User=require("../models/UserModel")
const Professionals=require("../models/ProfessionalsModel")
const upload=require("../middlewares/multer")
const cloudinary = require('cloudinary').v2;
const auth=require("../middlewares/auth")
const authorizeRoleAdmin=require("../middlewares/auth")
const cookieParser=require("cookie-parser")
router.use(cookieParser())
const Appointment=require("../models/AppointmentModel")


router.post("/user/book-appointment",auth,async(req,res)=>{
  try {
    
    const {professionalId,slotDate,slotTime,appointmentData}=req.body
    const userId=req.user._id

  //  Get data,except password
   const professionalData=await Professionals.findById({_id:professionalId}).select("-password")

   if(!professionalData.available){
      return res.status(400).json({success:false,message:"Professional Not Avilable..."})
   }

   let slots_booked=professionalData.slots_booked

   if(slots_booked[slotDate]){
      if(slots_booked[slotDate].includes(slotTime)){
          return res.status(400).json({success:false,message:"Slot Not Avilable..."})
      }
      else{
        slots_booked[slotDate].push(slotTime)
      }
   }
   else{
      slots_booked[slotDate]=[]
      slots_booked[slotDate].push(slotTime)
   }

   const userData=await User.findById({_id:userId}).select("-password")

  //  So that the slots get deleted before putting professionl data in Appointment
  // (Otherwise it will contain very old slots also)
   delete professionalData.slots_booked

   const newAppointment=new Appointment({
     userId,
     professionalId,
     userData,
     professionalData,
     amount:professionalData.fees,
     slotTime,
     slotDate,
     date:Date.now(),
     appointmentData
   })

   await newAppointment.save()
   await Professionals.findByIdAndUpdate({_id:professionalId},{slots_booked})

   res.json({success:true,Appointment:newAppointment})

  } catch (error) {
    res.json({success:false,message:"Unable to Book at the moment"})
    console.log(error)
  }
   

})

    router.get("/user/my-appointments",auth,async(req,res,next)=>{
        try {
            const user=req.user
            const myAppointments=await Appointment.find({userId:user._id})
            res.status(200).json({sucess:true,appointments:myAppointments})
        } catch (error) {
            res.status(400).json({sucess:false,error:error})
        }
    })
    

    router.patch("/user/cancel-booking",auth,async(req,res)=>{
        try {     
                console.log("CameShuleeee")
                const {appointmentId}=req.body
                const user=req.user

                const targetAppointment=await Appointment.findById({_id:appointmentId})
                console.log(targetAppointment)

                await Appointment.findByIdAndUpdate({_id:appointmentId},{cancelled:true})

                // Release Professional's Slot
                const {professionalId,slotDate,slotTime}=targetAppointment
                const professional=await Professionals.findById({_id:professionalId})
                console.log(professional.slots_booked)

                let slots_booked=professional.slots_booked
                console.log("LOOK")
                console.log(slots_booked[slotDate])
                console.log(slotTime)

                slots_booked[slotDate]= slots_booked[slotDate].filter((item) =>{
                  return item != slotTime
                  })

                  console.log(slots_booked)

                
                const updated=await Professionals.findByIdAndUpdate({_id:professionalId},{slots_booked})
                await updated.save()

                console.log(updated)

                return res.status(200).json({success:true,message:"Booking Cancelled...."})

        } catch (error) {
            console.log(error)
            return res.status(400).json({success:true,message:"Unable to Cancel Booking at the moment"})
        }
        
    })

    router.post("/user/cancel-booking/delete",auth,async(req,res)=>{
      try {     
              const {appointmentId}=req.body
              // const user=req.user
              console.log(appointmentId)
              const targetAppointment=await Appointment.findByIdAndDelete({_id:appointmentId})
              console.log("AAPOINTOMENTOOOO")
              console.log(targetAppointment)
              // await targetAppointment.save()

              return res.status(200).json({success:true,message:"Booking Deleted...."})

      } catch (error) {
          console.log(error)
          return res.status(400).json({success:false,message:"Unable to Delete the Booking at the moment"})
      }
      
  })

  router.get("/admin/get-appointments",async(req,res)=>{
    try {
      
      const appointments=await Appointment.find({})
      res.status(200).json({success:true,appointments:appointments})

    } catch (error) {
      res.status(400).json({success:false,message:error.message})

    }
  })
  
  router.post("/booking/completed/:id",async(req,res)=>{
    try {
      const id=req.params.id
      const appointment=await Appointment.findByIdAndUpdate({_id:id},{isCompleted:true ,payment:true})
      res.status(200).json({success:true,message:"Service Completed"})

    } catch (error) {
      res.status(400).json({success:false,message:error.message})

    }
  })



module.exports=router