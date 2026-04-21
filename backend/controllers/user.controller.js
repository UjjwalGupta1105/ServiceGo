const User=require("../models/user.model")
const bcrypt=require("bcryptjs")
const Appointment = require("../models/appointments.model")
const razorpay=require("razorpay")
const Requests=require("../models/newRequests.model")
const sendEmail=require("../config/sendEmail")
const crypto = require("crypto");


const rajorpayInstance=new razorpay({
    key_id:process.env.RAZORPAY_KEY_ID,
    key_secret:process.env.RAZORPAY_KEY_SECRET
})

async function register(req,res){
    try {
        const {name,email,password,city}=req.body
        if(!name || !email || !password || !city){
            return res.status(400).json({success:"false",message:"Please Enter All Fields...."})
        }

        const user=new User({ name,email,password,city })
        const token=await user.generateAuthToken()
        const savedUser=await user.save()

        res.cookie("jwt",token,{
            expires:new Date(Date.now()+5*24*60*60*1000),
            secure:true,
            sameSite: "None",
            httpOnly:true,
        })

        res.status(200).json({success:true,user:savedUser})

    } catch (error) {
        res.status(400).json({success:false,error:error})
    }
}

async function login(req,res){
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
        } else {
            return res.status(400).send({success:false,error:error})
        }

    } catch (error) {
        res.status(400).send({success:false,error:error})
    }
}

async function updateUser(req,res){
    try {
        const user=req.user
        const {name,additionalInfo}=req.body
        const currUser=await User.findByIdAndUpdate({_id:user._id},{name:name,additionalInfo:additionalInfo})
        await currUser.save()
        res.status(200).json({success:true,user:currUser})
    } catch (error) {
        res.status(400).json({success:false,error:error.message})
    }
}

async function updateAddress(req,res){
    try {
        const user=req.user
        const {additionalInfo}=req.body
        const currUser=await User.findByIdAndUpdate({_id:user._id},{additionalInfo:additionalInfo,city:additionalInfo.city})
        await currUser.save()
        res.status(200).json({success:true,user:currUser})
    } catch (error) {
        res.status(400).json({success:false,error:error.message})
    }
}

async function updateUserById(req,res){
    try {
        const id=req.params.id
        const {name,additionalInfo}=req.body
        const currUser=await User.findByIdAndUpdate({_id:id},{name:name,additionalInfo:additionalInfo})
        await currUser.save()
        res.status(200).json({success:true,user:currUser})
    } catch (error) {
        res.status(400).json({success:false,error:error.message})
    }
}

async function getUser(req,res){
    try {
        res.status(200).json({sucess:true,user:req.user})
    } catch (error) {
        res.status(400).json({sucess:false,error:error})
    }
}

async function logout(req,res){
    try {
        res.clearCookie("jwt",{
            httpOnly: true,
            secure: true,
            sameSite: "None",
        })
        res.status(201).send({success:true,message:"Successfully Logged Out"})
    } catch(error){
        res.status(400).send({success:true,error:error})
    }
}

async function deleteUser(req,res){
    try {
        const id=req.params.id
        await User.findByIdAndDelete({_id:id})
        res.status(200).send({success:true,message:"User Deleted Successfully"})
    } catch(error){
        res.status(400).send({success:false,message:error.message})
    }
}

async function updatePassword(req,res){
    try {
        const user=req.user
        const isMatch =await bcrypt.compare(req.body.currPass,user.password)

        if(!isMatch){
            return res.status(400).json({success:false,message:"Password is Incorrect...."})
        }

        if(req.body.newPass!=req.body.confirmNewPass){
            return res.status(400).json({success:false,message:"New & Confirm new are not same "})
        }

        user.password=req.body.newPass
        await user.save()

        res.status(201).json({ success:true })
    } catch (error) {
        res.status(400).send({success:false,message:error.message})
    }
}

async function payment(req,res){
    try {
        const {appointmentId}=req.body
        const appointmentData=await Appointment.findById({_id:appointmentId})

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
        res.json({success:false,message:error.message})
    }
}

async function verifyPayment(req,res){
    try {
        const {razorpay_order_id}=req.body
        const orderInfo=await rajorpayInstance.orders.fetch(razorpay_order_id)

        if(orderInfo.status==='paid'){
            await Appointment.findByIdAndUpdate({_id:orderInfo.receipt},{payment:true})
            return res.status(200).json({success:true,message:"Payment Successfull"})
        } else {
            res.json({success:false,message:"Payment Failed"})
        }

    } catch (error) {
        res.status(400).json({success:false,message:error.message})
    }
}

async function getAllUsers(req,res){
    try {
        const users=await User.find({})
        res.status(200).json({success:true,users:users})
    } catch (error) {
        res.status(400).json({success:false,error:error.message})
    }
}

async function getUserById(req,res){
    try {
        const user=await User.findById({_id:req.params.id})
        res.status(200).json({success:true,user:user})
    } catch (error) {
        res.status(400).json({success:false,error:error.message})
    }
}

async function contact(req,res){
    try {
        const { name, email, message,service,city } = req.body;

        if (!name || !email || !message || !service || !city) {
            return res.status(400).json({ success: false, message: "All fields are required!" });
        }

        const request=new Requests({ name,email,message,service,city })
        await request.save()

        res.json({ success: true, message: "Message received!" });

    } catch (error) {
        res.json({ success: false, message: error.message });
    }
}

async function getRequests(req,res){
    try {
        const requests=await Requests.find({})
        res.status(200).json({success:true,requests:requests})
    } catch (error) {
        res.status(400).json({success:false,error:error.message})
    }
}

async function deleteRequest(req,res){
    try {
        await Requests.findByIdAndDelete({_id:req.params.id})
        res.status(200).send({success:true,message:"Requests Deleted Successfully"})
    } catch(error){
        res.status(400).send({success:false,message:error.message})
    }
}

async function forgotPassword(req,res){
    try {
        const user=await User.findOne({email:req.body.email})
        if(!user){
            return res.status(400).send({success:false,message:"User Not Found"})
        }

        const resetToken=await user.generatePasswordToken();
        await user.save({validateBeforeSave:false})

        const resetPasswordUrl=`${process.env.FRONTEND_URL}/password/reset/${resetToken}`
        const message=`Update your password through this link -:\n\n ${resetPasswordUrl}`

        await sendEmail({
            email:user.email,
            subject:`ServiceGo Password Recovery`,
            message,
        })

        res.status(200).send({ success:true })

    } catch (error) {
        res.status(400).send({ success:false })
    }
}

async function resetPassword(req,res){
    try {
        const resettoken=crypto.createHash("sha256").update(req.params.token).digest("hex")

        const user=await User.findOne({
            resetPasswordToken:resettoken,
            resetPasswordExpire:{$gt:Date.now()}
        })

        if(req.body.password!=req.body.confirmPassword){
            return res.status(400).send({ success:false })
        }

        user.password=req.body.password
        user.resetPasswordToken=undefined
        user.resetPasswordExpire=undefined

        await user.save()

        res.status(200).json({ success:true })

    } catch (error) {
        res.status(400).send({success:false})
    }
}

module.exports = {
    register,
    login,
    updateUser,
    updateAddress,
    updateUserById,
    getUser,
    logout,
    deleteUser,
    updatePassword,
    payment,
    verifyPayment,
    getAllUsers,
    getUserById,
    contact,
    getRequests,
    deleteRequest,
    forgotPassword,
    resetPassword
}