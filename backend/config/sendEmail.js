const nodeMailer=require("nodemailer")


const sendEmail=async(options)=>{
    try {
       const transporter=nodeMailer.createTransport({
           service:"gmail",
           auth:{
               user:"ujjwalgu108@gmail.com",
               pass:"blat zkhp ixdc xjqk"
           }
       })
       const emailOptions={
        //    from:process.env.SMPT_MAIL,
        //     to:options.email,
        //    subject:options.subject,
        //    text:options.message
        from:"ujjwalgu108@gmail.com",
        to:options.email,
       subject:options.subject,
       text:options.message
       }
       console.log("CaMe")
     const AAA= await transporter.sendMail(emailOptions);
   //    await transporter.sendMail(emailOptions)
   console.log(AAA)
      console.log("Done...oiutrdi0o-oiutrdertyuiopitressertyuiopoit")
    } catch (error) {
        console.log(error)
    }
    
}
module.exports=sendEmail