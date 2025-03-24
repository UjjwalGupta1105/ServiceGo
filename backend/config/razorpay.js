const razorpay=require("razorpay")
const Appointment = require("../models/AppointmentModel")

const rajorpayInstance=new razorpay({
    key_id:process.env.RAZORPAY_KEY_ID,
    key_secret:process.env.RAZORPAY_KEY_SECRET
})

const paymentRazorpay=async(req,res)=>{
    try {
        
        const {appointementId}=req.body
        const appointementData=await Appointment.findById({_id:appointementId})
    
        if(!appointementData || appointementData.cancelled){
            return res.status(400).json({success:true,message:"Appointment Not Found"})
        }
    
        const options={
            amount:appointementData.amount,
            currency:"INR",
            recipt:appointementId
        }
    
        const order=await rajorpayInstance.orders.create(options)
    
        res.staus(200).json({success:true,order:order})

    } catch (error) {
        res.staus(400).json({success:false,message:error})
    }
    
}