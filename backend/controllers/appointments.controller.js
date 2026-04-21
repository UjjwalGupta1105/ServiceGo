const User=require("../models/user.model")
const Professionals=require("../models/professionals.model")
const Appointment=require("../models/appointments.model")
const mongoose = require("mongoose");

// Changed the multiple backend operations into one atomic operation & also added transaction for safety
async function book(req, res) {
  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    const { professionalId, slotDate, slotTime, appointmentData } = req.body;
    const userId = req.user._id;

    // Created the process of finding professional & slot reserving on one atomic process
    const professionalData = await Professionals.findOneAndUpdate(
      {
        _id: professionalId,
        available: true,
        // for this slotDate, the slotTime should not exist
        [`slots_booked.${slotDate}`]: { $ne: slotTime }
      },
      {
        $push: { [`slots_booked.${slotDate}`]: slotTime }
      },
      { new: true, session }
    );

    if (!professionalData) {
      await session.abortTransaction();
      return res.status(400).json({
        success: false,
        message: "Slot Not Available"
      });
    }

    const userData = await User.findById(userId)
      .select("-password")
      .session(session);

    const professionalCopy = professionalData.toObject();
    delete professionalCopy.slots_booked;

    const newAppointment = new Appointment({
      userId,
      professionalId,
      userData,
      professionalData: professionalCopy,
      amount: professionalData.fees,
      slotTime,
      slotDate,
      date: Date.now(),
      appointmentData
    });

    await newAppointment.save({ session });

    await session.commitTransaction();

    res.json({ success: true, Appointment: newAppointment });

  } catch (error) {
    await session.abortTransaction();
    console.log(error);
    res.status(500).json({ success: false, message: "Booking failed" });
  } finally {
    session.endSession();
  }
}

// async function book(req,res){
//   try {
//     const {professionalId,slotDate,slotTime,appointmentData}=req.body
//     const userId=req.user._id

//     const professionalData=await Professionals.findById({_id:professionalId}).select("-password")

//     if(!professionalData.available){
//       return res.status(400).json({success:false,message:"Professional Not Avilable..."})
//     }

//     let slots_booked=professionalData.slots_booked

//     if(slots_booked[slotDate]){
//       if(slots_booked[slotDate].includes(slotTime)){
//           return res.status(400).json({success:false,message:"Slot Not Avilable..."})
//       }
//       else{
//         slots_booked[slotDate].push(slotTime)
//       }
//     }
//     else{
//       slots_booked[slotDate]=[]
//       slots_booked[slotDate].push(slotTime)
//     }

//     const userData=await User.findById({_id:userId}).select("-password")

//     delete professionalData.slots_booked

//     const newAppointment=new Appointment({
//      userId,
//      professionalId,
//      userData,
//      professionalData,
//      amount:professionalData.fees,
//      slotTime,
//      slotDate,
//      date:Date.now(),
//      appointmentData
//     })

//     await newAppointment.save()
//     await Professionals.findByIdAndUpdate({_id:professionalId},{slots_booked})

//     res.json({success:true,Appointment:newAppointment})

//   } catch (error) {
//     res.json({success:false,message:"Unable to Book at the moment"})
//   }
// }

async function myAppointments(req,res){
    try {
        const user=req.user
        const myAppointments=await Appointment.find({userId:user._id})
        res.status(200).json({sucess:true,appointments:myAppointments})
    } catch (error) {
        res.status(400).json({sucess:false,error:error})
    }
}

async function cancel(req,res){
    try {     
        const {appointmentId}=req.body
        const user=req.user

        const targetAppointment=await Appointment.findById({_id:appointmentId})

        await Appointment.findByIdAndUpdate({_id:appointmentId},{cancelled:true})

        const {professionalId,slotDate,slotTime}=targetAppointment
        const professional=await Professionals.findById({_id:professionalId})

        let slots_booked=professional.slots_booked

        slots_booked[slotDate]= slots_booked[slotDate].filter((item) =>{
          return item != slotTime
        })

        const updated=await Professionals.findByIdAndUpdate({_id:professionalId},{slots_booked})
        await updated.save()

        return res.status(200).json({success:true,message:"Booking Cancelled...."})

    } catch (error) {
        return res.status(400).json({success:true,message:"Unable to Cancel Booking at the moment"})
    }
}

async function remove(req,res){
  try {     
      const {appointmentId}=req.body

      const targetAppointment=await Appointment.findByIdAndDelete({_id:appointmentId})

      return res.status(200).json({success:true,message:"Booking Deleted...."})

  } catch (error) {
      return res.status(400).json({success:false,message:"Unable to Delete the Booking at the moment"})
  }
}

async function getAll(req,res){
  try {
    const appointments=await Appointment.find({})
    res.status(200).json({success:true,appointments:appointments})
  } catch (error) {
    res.status(400).json({success:false,message:error.message})
  }
}

async function complete(req,res){
  try {
    const id=req.params.id
    const appointment=await Appointment.findByIdAndUpdate({_id:id},{isCompleted:true ,payment:true})
    res.status(200).json({success:true,message:"Service Completed"})
  } catch (error) {
    res.status(400).json({success:false,message:error.message})
  }
}

module.exports = {
  book,
  myAppointments,
  cancel,
  remove,
  getAll,
  complete
}