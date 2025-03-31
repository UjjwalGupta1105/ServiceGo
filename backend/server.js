const mongoose=require("mongoose")

// const password = encodeURIComponent(process.env.MONGO_PASSWORD);

const connectDataBase=()=>{
   mongoose.connect("mongodb://localhost:27017/ServiceGo").
   // mongoose.connect(`mongodb+srv://ujjwalgupta621:${process.env.MONGO_PASSWORD}@servicego.lbmse.mongodb.net/ServiceGo?retryWrites=true&w=majority`).
   then(()=>console.log("Connected with DataBase...."))
   .catch((err)=>console.log(err))
}

module.exports=connectDataBase