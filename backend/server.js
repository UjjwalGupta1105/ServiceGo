const mongoose=require("mongoose")

// const password = encodeURIComponent(process.env.MONGO_PASSWORD);

const connectDataBase=()=>{
   // mongoose.connect("mongodb://localhost:27017/ServiceGo").
   // mongoose.connect(`mongodb+srv://ujjwalgupta621:${process.env.MONGO_PASSWORD}@servicego.lbmse.mongodb.net/ServiceGo?retryWrites=true&w=majority`).
   //  mongoose.connect(`mongodb://ujjwalgupta621:${process.env.MONGO_PASSWORD}@servicego-shard-00-00.lbmse.mongodb.net:27017,servicego-shard-00-01.lbmse.mongodb.net:27017,servicego-shard-00-02.lbmse.mongodb.net:27017/?ssl=true&replicaSet=atlas-3rvort-shard-0&authSource=admin&appName=ServiceGo`).
   mongoose.connect(
  `mongodb://ujjwalgupta621:${process.env.MONGO_PASSWORD}@servicego-shard-00-00.lbmse.mongodb.net:27017,servicego-shard-00-01.lbmse.mongodb.net:27017,servicego-shard-00-02.lbmse.mongodb.net:27017/ServiceGo?ssl=true&replicaSet=atlas-3rvort-shard-0&authSource=admin&retryWrites=true&w=majority`
)
   .then(()=>console.log("Connected with DataBase...."))
   .catch((err)=>console.log(err))
}

module.exports=connectDataBase