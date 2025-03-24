const express=require('express');
const router=express.Router();
const upload=require("../middlewares/multer")
const cloudinary = require('cloudinary').v2;
const Professional=require("../models/ProfessionalsModel")
const User=require("../models/UserModel")
const Appointment=require("../models/AppointmentModel")
const jwt=require("jsonwebtoken")
const auth=require("../middlewares/auth")
const authorizeRoleProfessional=require("../middlewares/auth")
const cookieParser=require("cookie-parser")
const bcrypt=require("bcryptjs")
router.use(cookieParser())
router.use(express.json())



router.post("/register-professional", upload.single("image"),async(req,res)=>{
    try{
        const {name,email,password,service,certification,experience,about,fees,address,pinCode,contactNumber,city}=req.body;
        const imageFile=req.file
        console.log(name,email,password,service,certification,experience,about,fees,address,imageFile,pinCode,contactNumber,city)
        
        if(!name || !email || !password || !service || !experience || experience=="Select" || !about || !fees || !address || !pinCode || !contactNumber || !city){
            return res.status(400).json({sucess:"false",message:"Please Enter All Fields...."})
        }
        const imageUpload=await cloudinary.uploader.upload(imageFile.path)
        const imgurl=imageUpload.secure_url

        console.log(imageUpload)
        const professional=new Professional({
            name,
            email,
            password,
            image:imgurl,
            service,
            certification,
            experience,
            about,
            pinCode,
            contactNumber,
            fees,
            address,
            city
        })
        const token=await professional.generateAuthToken()
        const savedProfessional=await professional.save()
        // res.cookie("jwt",token,{
        //     expires:new Date(Date.now()+5*24*60*60*1000),
        //     secure:true,
        //     httpOnly:true
        // })
        // await professional.save()
        console.log(savedProfessional)

        res.status(200).json({success:true,message:"Professional Registered Successfully...."})
    }
    catch(error){
        
        res.status(400).json({success:false,message:"Facing Some problem in registring the Professional"})
        console.log(error)
    }
})

router.post("/professional/login",async(req,res)=>{
    try {

    const {email,password}=req.body
    console.log(email,password)

    if(!email || !password){
        res.send(400).send("Please enter email & password")
    }

    const professional=await Professional.findOne({email:email})
    console.log(professional)
    const isMatch=await bcrypt.compare(password,professional.password)
    if(isMatch){
        const token=await professional.generateAuthToken()
            res.cookie("protoken",token,{
                expires:new Date(Date.now()+5*24*60*60*1000),
                secure:true,
                httpOnly:true
            })
            res.status(200).json({success:true,professional:professional})
    }
    }
      catch (error) {
        res.status(400).send({success:false,error:error})
    }
})
 router.delete("/professional/logOut",async(req,res,next)=>{
        try {
            res.clearCookie("protoken")
            res.status(201).send({success:true,message:"Successfully Logged Out"})
          } catch(error){
              res.status(400).send({success:false,message:error.message})
          }
    })

router.get("/admin/all-professionals",async(req,res)=>
    {
    try{
        const professionals=await Professional.find({})
        res.status(200).json({success:true,professionals:professionals})
    }
    catch(error){
        res.status(400).json({success:false,message:"Facing Some problem in fetching the Professionals"})
        console.log(error)
    }
})
router.get("/admin/get-Professional/:id",async(req,res)=>{
    try{
        const id=req.params.id
        const professional=await Professional.findById({_id:id})
        res.status(200).send(professional)
    }
    catch(error){
        res.status(400).json({success:false,message:"Facing Some problem in fetching the Professional"})
        console.log(error)
    }
})
router.patch("/admin/update-professional/:id",async(req,res)=>{
    try{
        const  id=req.params.id
        const {formData}=req.body
        console.log("re.body",req.body)
       console.log("DAta is",formData)
        const updatedProfessional=await Professional.findByIdAndUpdate({_id:id},{
    name: formData.name,
    service: formData.service ,
    certification:formData.certification ,
    experience: formData.experience ,
    about: formData.about ,
    fees: formData.fees ,
    address:  formData.address ,
    city: formData.city ,
    pinCode: formData.pinCode ,
    contactNumber:formData.contactNumber ,
        })
        updatedProfessional.save()
        res.status(200).json({success:true,message:"Professional Updated Successfully",professional:updatedProfessional})
    }
    catch(error){
        res.status(400).json({success:false,message:"Facing Some problem in updating the Professional"})
        console.log(error)
    }
})

router.patch("/admin/change-availability/:id",async(req,res)=>{
    try{
        const id=req.params.id
        const professional=await Professional.findById({_id:id})
        const now=!(professional.available)
        console.log(now)
        const updatedProfessional=await Professional.findByIdAndUpdate(id,{available:now})
        await updatedProfessional.save()
        console.log(updatedProfessional)
        res.status(200).json({success:true,message:"Professional Updated Successfully",professional:updatedProfessional})
    }
    catch(error){
        res.status(400).json({success:false,message:"Facing Some problem in updating the Professional"})
        console.log(error)
    }
})

router.delete("/admin/delete-professional/:id",async(req,res)=>{
    try{
        const id=req.params.id
        const professional=await Professional.findByIdAndDelete({_id:id})

        res.status(200).json({success:true,message:"Professional Deleteed Successfully"})
    }
    catch(error){
        res.status(400).json({success:false,message:"Facing Some problem in Deleting the Professional"})
        console.log(error)
    }
})
router.delete("/admin/get-Professional/:id",async(req,res)=>{
    try{
        const id=req.params.id
        const professional=await Professional.findById({_id:id})

        res.status(200).json({success:true,professional:professional})
    }
    catch(error){
        res.status(400).json({success:false,message:"Facing Probelem in Fetching the Professional"})
        console.log(error)
    }
})

router.get("/admin/dashData",async(req,res)=>{
    try{
        const professionals=await Professional.find({})
        const users=await User.find({})
        const appointments=await Appointment.find({})

        res.status(200).send({success:true,data:{professionals,users,appointments}})
    }
    catch(error){
        res.status(400).json({success:false,message:"Facing Some problem in fetching the Data"})
        console.log(error)
    }
})

router.post("/professional/reviews/:id",auth,async(req,res,next)=>{
    try {
        console.log("kaamkeshwar")
        const review={
            user:req.user._id,
            name:req.user.name,
            rating:Number(req.body.rating),
            comment:req.body.comment
        }
        console.log("review issjwdid")
        console.log(review)
        
        const id_=req.params.id
        console.log(id_)

        const professional=await Professional.findById(id_)

        professional.reviews=professional.reviews.filter((rev)=>{
        console.log(rev.user.toString()!==review.user.toString())
          return rev.user.toString()!==review.user.toString()
        })
       
        professional.reviews.push(review)

        let avg=0;
        professional.reviews.forEach((rev)=>{
            avg+=rev.rating
        })
        professional.rating=avg/professional.reviews.length

        console.log(professional)

        await professional.save()

        res.status(201).json({
            success:true,
            message:"Review Submitted Successfully"
        })
    } catch (error) {
        res.status(500).json({
            success:false,
            error:error.message
        })
    }
})

module.exports = router;