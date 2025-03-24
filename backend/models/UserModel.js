const mongoose=require("mongoose")
const validator=require("validator")
const bcrypt=require("bcryptjs")
const jwt=require("jsonwebtoken")

const userSchema=new mongoose.Schema({
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
        minLength:[8,"Password Should be Strong"],
    },
    city:{
        type:String,
        required:[true,"Please Enter Your City"],
        trim:true,
    },
    image:{
       type:String,
       default:"data:image/jpeg;base64,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"
    },
    additionalInfo:{
        type:Object,
        default:{
            phone: "",
            address: "",
            city: "",
            state: "",
            pincode: "",
            country: ""
}
    },
    createdAt:{
        type:Date,
        default:Date.now
    },
    role:{
        type:String,
        default:"user"
    },

    tokens:[{
        token:{
            type:String,
            required:true
        }
    }],
})

//In Arrow function, this do not points to current object-:
userSchema.pre("save",async function(next){
    console.log(`The Password is ${this.password}`)
    if(this.isModified("password")){
        this.password=await bcrypt.hash(this.password,10);
    }

    next()
})

userSchema.methods.generateAuthToken=async function(req,res,next){
    try {
        console.log(this._id)
        token=jwt.sign({_id:this._id},process.env.secret_key,{
        expiresIn: "5d"
        })
        console.log(this.tokens)
        this.tokens=this.tokens.concat({token:token})
        console.log(this.tokens)
        await this.save()
        return token;
        next()
    } catch (error) {
        console.log(error)
    }
    
}
    


const User=mongoose.model("User",userSchema)
module.exports=User;