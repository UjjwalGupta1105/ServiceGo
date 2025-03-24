const mongoose=require("mongoose")

const AppointmentSchema=new mongoose.Schema({
    userId:{type:String,required:true},
    professionalId:{type:String,required:true},
    slotDate:{type:String,required:true},
    slotTime:{type:String,required:true},
    userData:{type:Object,required:true},
    professionalData:{type:Object,required:true},
    amount:{type:String,required:true},
    date:{type:Number,required:true},
    cancelled:{type:Boolean,default:false,required:true},
    payment:{type:Boolean,default:false,required:true},
    isCompleted:{type:Boolean,default:false,required:true},
    appointmentData:{type:Object,required:true},
})

const Appointment=mongoose.model("Appointment",AppointmentSchema)
module.exports= Appointment