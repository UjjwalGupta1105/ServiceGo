const express=require("express")
const mongoose = require("mongoose");
const router=express.Router()
router.use(express.json())
const User=require("../models/UserModel")
const upload=require("../middlewares/multer")
const cloudinary = require('cloudinary').v2;
const auth=require("../middlewares/auth")
const authorizeRoleAdmin=require("../middlewares/auth")
const cookieParser=require("cookie-parser")
router.use(cookieParser())
const bcrypt=require("bcryptjs")
const cors=require("cors")
const Appointment = require("../models/AppointmentModel")
const Professional = require("../models/ProfessionalsModel")
const razorpay=require("razorpay")
const Requests=require("../models/newRequestsModel")


router.post("/user/register",async(req,res)=>{
    try {
            const {name,email,password,city}=req.body
            if(!name || !email || !password || !city){
                return res.status(400).json({success:"false",message:"Please Enter All Fields...."})
            }

            const user=new User({
                name,
                email,
                password,
                city
            })
            console.log(user)
            const token=await user.generateAuthToken()
            const savedUser=await user.save()
            res.cookie("jwt",token,{
                expires:new Date(Date.now()+5*24*60*60*1000),
                secure:true,
               sameSite: "None",
                httpOnly:true,
            })
            console.log(savedUser)

            res.status(200).json({success:true,user:savedUser})

    } catch (error) {
        res.status(400).json({success:false,error:error})
        console.log(error)
    }
})

router.post("/user/login",async(req,res)=>{
    try {

    const {email,password}=req.body

    if(!email || !password){
        res.send(400).send("Please enter email & password")
    }

    const user=await User.findOne({email:email})
    const isMatch=await bcrypt.compare(password,user.password)
    if(isMatch){
        const token=await user.generateAuthToken()
            res.cookie("jwt",token,{
                expires:new Date(Date.now()+5*24*60*60*1000),
                sameSite: "None",
                secure:true,
                httpOnly:true,
                
            })
            res.status(200).json({success:true,user:user})
    }
    }
      catch (error) {
        res.status(400).send({success:false,error:error})
    }
})
router.patch("/user/update",auth,async(req,res)=>{
    try {
        const user=req.user
        const {name,additionalInfo}=req.body
        const currUser=await User.findByIdAndUpdate({_id:user._id},{name:name,additionalInfo:additionalInfo})
        await currUser.save()
        res.status(200).json({success:true,user:currUser})
    } catch (error) {
        console.log(error)
        res.status(400).json({success:false,error:error.message})
    }
})
router.patch("/user/address-update",auth,async(req,res)=>{
    try {
        const user=req.user
        const {additionalInfo}=req.body
        const currUser=await User.findByIdAndUpdate({_id:user._id},{additionalInfo:additionalInfo,city:additionalInfo.city})
        await currUser.save()
        res.status(200).json({success:true,user:currUser})
    } catch (error) {
        console.log(error)
        res.status(400).json({success:false,error:error.message})
    }
})
router.patch("/user/update/:id",auth,async(req,res)=>{
    try {
        const id=req.params.id
        const {name,additionalInfo}=req.body
        const currUser=await User.findByIdAndUpdate({_id:id},{name:name,additionalInfo:additionalInfo})
        await currUser.save()
        res.status(200).json({success:true,user:currUser})
    } catch (error) {
        console.log(error)
        res.status(400).json({success:false,error:error.message})
    }
})
  router.get("/user",auth,async(req,res,next)=>{
        try {
            const user=req.user
            res.status(200).json({sucess:true,user:user})
        } catch (error) {
            res.status(400).json({sucess:false,error:error})
        }
    })

    router.delete("/user/logOut",auth,async(req,res,next)=>{
        try {
            res.clearCookie("jwt")
            res.status(201).send({success:true,message:"Successfully Logged Out"})
          } catch(error){
              res.status(400).send({success:true,error:error})
          }
    })
    router.delete("/user/delete/:id",async(req,res,next)=>{
        try {
            const id=req.params.id
           const user=User.findByIdAndDelete({_id:id})
           res.status(200).send({success:true,message:"User Deleted Successfully"})
          } catch(error){
            res.status(400).send({success:false,message:error.message})
          }
    })

    router.post("/me/updatePassword",auth,async(req,res,next)=>{
        try {
            console.log("comeshah hola")
            const user=req.user
            const isMatch =await bcrypt.compare(req.body.currPass,user.password)
            console.log(isMatch)
            
            if(!isMatch){
                return res.status(400).json({success:false,message:"Password is Incorrect...."})
            }
            if(req.body.newPass!=req.body.confirmNewPass){
                return res.status(400).json({success:false,message:"New & Confirm new are not same "})
            }

            user.password=req.body.newPass
            console.log(user)
            await user.save()
            console.log("gono")
            res.status(201).json({
                success:true
            })
        } catch (error) {
            res.status(400).send({success:false,message:error.message})
        }
     })

    const rajorpayInstance=new razorpay({
        key_id:process.env.RAZORPAY_KEY_ID,
        key_secret:process.env.RAZORPAY_KEY_SECRET
    })
    
    router.post("/user/payment-razorpay",auth,async(req,res)=>{
        try {
            
            const {appointmentId}=req.body
            console.log("checking....")
            console.log(appointmentId)
            const appointmentData=await Appointment.findById({_id:appointmentId})
            console.log(appointmentData)
        
            if(!appointmentData || appointmentData.cancelled){
                return res.status(400).json({success:true,message:"Appointment Not Found"})
            }
        
            const options={
                amount:appointmentData.amount*100,
                currency:"INR",
                receipt:appointmentId
            }
        
            const order=await rajorpayInstance.orders.create(options)
        
            res.json({success:true,order:order})
    
        } catch (error) {
            console.log(error)
            res.json({success:false,message:error.message})
        }
    })

    router.post("/user/payment-verification-razorpay",auth,async(req,res)=>{
        try {
            
            const {razorpay_order_id}=req.body
            console.log(razorpay_order_id)
            const orderInfo=await rajorpayInstance.orders.fetch(razorpay_order_id)
            console.log(orderInfo)

            if(orderInfo.status==='paid'){
                await Appointment.findByIdAndUpdate({_id:orderInfo.receipt},{payment:true})
                return res.status(200).json({success:true,message:"Payment Successfull..."})
            }
            else{
                res.json({success:false,message:"Payment Failed"})
            }
            
        } catch (error) {
            res.status(400).json({success:false,message:error.message})
        }
    })

    router.get("/admin/get-users",async(req,res,next)=>{
        try {
            const users=await User.find({})
            res.status(200).json({success:true,users:users})
        } catch (error) {
            res.status(400).json({success:false,error:error.message})
        }
    })
    router.get("/admin/get-user/:id",async(req,res,next)=>{
        try {
            const id=req.params.id
            const user=await User.findById({_id:id})
            res.status(200).json({success:true,user:user})
        } catch (error) {
            res.status(400).json({success:false,error:error.message})
        }
    })


    router.post("/api/contact", async (req, res) => {
        try {
            console.log("SAMAMII....")
            const { name, email, message,service,city } = req.body;
            console.log(req.body)
            
            if (!name || !email || !message || !service || !city) {
                return res.status(400).json({ success: false, message: "All fields are required!" });
            }
    
            const request=new Requests({
                name,
                email,
                message,
                service,
                city
            })
    
            await request.save()
            console.log("New Message:", { name, email, message });
        
            res.json({ success: true, message: "Message received!" });
        } catch (error) {
            console.log(error)
            res.json({ success: false, message: error.message });
        }
    });
    router.get("/new-requests", async (req, res) => {
        try {
            const requests=await Requests.find({})
            res.status(200).json({success:true,requests:requests})
        } catch (error) {
            res.status(400).json({success:false,error:error.message})
        }
    });
    router.delete("/request/delete/:id",async(req,res,next)=>{
        try {
            const id=req.params.id
           const request=await Requests.findByIdAndDelete({_id:id})
           res.status(200).send({success:true,message:"Requests Deleted Successfully..."})
          } catch(error){
            res.status(400).send({success:false,message:error.message})
          }
    })

    

module.exports=router