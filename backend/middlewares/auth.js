const jwt=require("jsonwebtoken")
const Professional=require("../models/professionals.model")
const User=require("../models/user.model")


const auth=async(req,res,next)=>{
    try {
        let token=req.cookies.jwt
        let user
        if(token){
            const verify=jwt.verify(token,process.env.secret_key)
            user=await User.findOne({_id:verify._id})
        }
        else{
            token=req.cookies.protoken
            const verify=jwt.verify(token,process.env.secret_key)
           user=await Professional.findOne({_id:verify._id})
        }
        req.user=user
        next()
    } catch (error) {

        res.status(401).send("You are not authorized to access this")
        console.log(error)
    }
}
const authorizeRoleAdmin=async(req,res,next)=>{
    try {
        if(req.user.role=="admin"){
            next()
        }
    } catch (error) {
        res.status(403).send("Your Role is not allowed to access this....")
    }
        
     } 
const authorizeRoleProfessional=async(req,res,next)=>{
        try {
            if(req.user.role=="professional"){
                next()
            }
        } catch (error) {
            res.status(403).send("Your Role is not allowed to access this....")
        }
            
} 

module.exports=auth,authorizeRoleAdmin,authorizeRoleProfessional
