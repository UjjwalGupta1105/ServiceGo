const mongoose=require("mongoose")
const validator=require("validator")
const bcrypt=require("bcryptjs")
const jwt=require("jsonwebtoken")
const crypto=require("crypto")


const professionalSchema=new mongoose.Schema({
    name:{
         type:String,
         required:[true,"Please Enter Your Name"],
         trim:true,
        },
    email:{
        type:String,
        required:[true,"Please Enter Your Email"],
        unique:true,
       validate:[validator.isEmail,"Please Enter a Valid Email"]
    },
    password:{
        type:String,
        required:[true,"Please Enter Your Password"],
        minLength:[8,"Password Should be strong"],
    },
    image:{
       type:String,
       required:true,
    },
    service:{
        type:String,
        required:true,
    },
    certification:{
        type:String
    },
    experience:{
        type:String,
        required:true,
    },
    rating:{
        type:Number,
        default:0,
    },
    about:{
        type:String,
        required:true,
        minLength:[50,"Write a minimum of 50 words"]
    },
    available:{
        type:Boolean,
        default:true
    },
    fees:{
        type:Number,
        required:true,
    },
    address:{
        type:String,
        required:true,
    },
    city:{
        type:String,
        required:true,
    },
     pinCode:{
        type:Number,
        required:true,
    },
    contactNumber:{
        type:Number,
        required:true,
    },
    createdAt:{
        type:Date,
        default:Date.now
    },
    role:{
        type:String,
        default:"professional"
    },
    slots_booked:{
        type:Object,
        default:{}
    },
    reviews:[{
        name:{
            type:String,
            required:true
        },
        rating:{
            type:Number,
            required:true
        },
        comment:{
            type:String,
            required:true
        },
        user:{
                type:mongoose.Schema.ObjectId,
                ref:"User",
                required:true
            },
    }],
    tokens:[{
        token:{
            type:String,
            required:true
        }
    }],
    resetPasswordToken:String,
    resetPasswordExpire:Date,
})
professionalSchema.pre("save",async function(next){
    if(this.isModified("password")){
        this.password= await bcrypt.hash(this.password,10);
    }
    next();
 })
 professionalSchema.methods.generateAuthToken=async function(req,res,next){
    try {
        const token=jwt.sign({_id:this._id},process.env.secret_key,{
            //  expiresIn:new Date(Date.now()+5*24*60*60*1000)
            expiresIn: "5d"
        })
        this.tokens=this.tokens.concat({token:token})
        await this.save()
        return token;
        next()

    } catch (error) {
        console.log(error)
    }
}
professionalSchema.methods.generatePasswordToken= function(){
    try {
        const resetToken=crypto.randomBytes(20).toString("hex")

        this.resetPasswordToken=crypto.createHash("sha256").update(resetToken).digest("hex")
        this.resetPasswordExpire=Date.now()+15*60*1000
        return resetToken

    } catch (error) {
        console.log("Error In Generating Reset Password Token....")
    }
 }
const Professional=mongoose.model("Professional",professionalSchema)
module.exports=Professional;