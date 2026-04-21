const mongoose=require("mongoose")
const validator=require("validator")

const requestSchema=new mongoose.Schema({
    name:{
         type:String,
         required:[true,"Please Enter Your Name"],
         trim:true,
        },
    email:{
        type:String,
        required:[true,"Please Enter Your Email"],
       validate:[validator.isEmail,"Please Enter a Valid Email"]
    },
    message:{
        type:String,
        required:[true,"Please Enter Your Message"],
    },
    service:{
        type:String,
        required:[true,"Please Enter Your Service"],
    },
    city:{
        type:String,
        required:[true,"Please Enter Your City"],
        trim:true,
    }
})


const Requets=mongoose.model("Requests",requestSchema)
module.exports=Requets;