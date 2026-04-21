const Professional=require("../models/professionals.model")
const User=require("../models/user.model")
const Appointment=require("../models/appointments.model")
const bcrypt=require("bcryptjs")
const cloudinary = require('cloudinary').v2;

async function register(req,res){
    try{
        const {name,email,password,service,certification,experience,about,fees,address,pinCode,contactNumber,city}=req.body;
        const imageFile=req.file
        
        if(!name || !email || !password || !service || !experience || experience=="Select" || !about || !fees || !address || !pinCode || !contactNumber || !city){
            return res.status(400).json({sucess:"false",message:"Please Enter All Fields...."})
        }

        const imageUpload=await cloudinary.uploader.upload(imageFile.path)
        const imgurl=imageUpload.secure_url

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

        res.status(200).json({success:true,message:"Professional Registered Successfully...."})
    }
    catch(error){
        res.status(400).json({success:false,message:"Facing Some problem in registring the Professional"})
    }
}

async function login(req,res){
    try {
        const {email,password}=req.body

        if(!email || !password){
            res.send(400).send("Please enter email & password")
        }

        const professional=await Professional.findOne({email:email})
        const isMatch=await bcrypt.compare(password,professional.password)

        if(isMatch){
            const token=await professional.generateAuthToken()
            res.cookie("protoken",token,{
                expires:new Date(Date.now()+5*24*60*60*1000),
                sameSite: "None",
                secure:true,
                httpOnly:true,
            })
            res.status(200).json({success:true,professional:professional})
        }
    }
    catch (error) {
        res.status(400).send({success:false,error:error})
    }
}

async function logout(req,res){
    try {
        res.clearCookie("protoken",{
            httpOnly: true,
            secure: true,
            sameSite: "None",
        })
        res.status(201).send({success:true,message:"Successfully Logged Out"})
    } catch(error){
        res.status(400).send({success:false,message:error.message})
    }
}

async function getAll(req,res){
    try{
        const professionals=await Professional.find({})
        res.status(200).json({success:true,professionals:professionals})
    }
    catch(error){
        res.status(400).json({success:false,message:"Facing Some problem in fetching the Professionals"})
    }
}

async function getOne(req,res){
    try{
        const professional=await Professional.findById({_id:req.params.id})
        res.status(200).send(professional)
    }
    catch(error){
        res.status(400).json({success:false,message:"Facing Some problem in fetching the Professional"})
    }
}

async function update(req,res){
    try{
        const {formData}=req.body

        const updatedProfessional=await Professional.findByIdAndUpdate({_id:req.params.id},{
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
    }
}

async function changeAvailability(req,res){
    try{
        const professional=await Professional.findById({_id:req.params.id})
        const now=!(professional.available)

        const updatedProfessional=await Professional.findByIdAndUpdate(req.params.id,{available:now})
        await updatedProfessional.save()

        res.status(200).json({success:true,message:"Professional Updated Successfully",professional:updatedProfessional})
    }
    catch(error){
        res.status(400).json({success:false,message:"Facing Some problem in updating the Professional"})
    }
}

async function remove(req,res){
    try{
        await Professional.findByIdAndDelete({_id:req.params.id})
        res.status(200).json({success:true,message:"Professional Deleteed Successfully"})
    }
    catch(error){
        res.status(400).json({success:false,message:"Facing Some problem in Deleting the Professional"})
    }
}

async function dashboard(req,res){
    try{
        const professionals=await Professional.find({})
        const users=await User.find({})
        const appointments=await Appointment.find({})

        res.status(200).send({success:true,data:{professionals,users,appointments}})
    }
    catch(error){
        res.status(400).json({success:false,message:"Facing Some problem in fetching the Data"})
    }
}

async function addReview(req,res){
    try {
        const review={
            user:req.user._id,
            name:req.user.name,
            rating:Number(req.body.rating),
            comment:req.body.comment
        }

        const professional=await Professional.findById(req.params.id)

        professional.reviews=professional.reviews.filter((rev)=>{
            return rev.user.toString()!==review.user.toString()
        })

        professional.reviews.push(review)

        let avg=0;
        professional.reviews.forEach((rev)=>{
            avg+=rev.rating
        })

        professional.rating=avg/professional.reviews.length

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
}

module.exports = {
    register,
    login,
    logout,
    getAll,
    getOne,
    update,
    changeAvailability,
    remove,
    dashboard,
    addReview
}