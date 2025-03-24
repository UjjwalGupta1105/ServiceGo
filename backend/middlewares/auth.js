const jwt=require("jsonwebtoken")
const Professional=require("../models/ProfessionalsModel")
const User=require("../models/UserModel")


const auth=async(req,res,next)=>{
    try {
         console.log("CAME")
        let token=req.cookies.jwt
        console.log(token)
        let user
        if(token){
            const verify=jwt.verify(token,process.env.secret_key)
            user=await User.findOne({_id:verify._id})
        }
        else{
            token=req.cookies.protoken
            console.log("Showwjhdjekdke .. . ... ")
            console.log(token)
            const verify=jwt.verify(token,process.env.secret_key)
           user=await Professional.findOne({_id:verify._id})
        }
        req.user=user
        console.log(req.user)
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
