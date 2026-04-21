const express=require("express")
const app=express()
const connectDataBase=require("./server")
const env=require("dotenv")
const connectCloudinary=require("./config/cloudinary")
const cors=require("cors")
const cookieParser=require("cookie-parser")
env.config()

connectDataBase()
connectCloudinary()

app.use(cors({
  origin: process.env.FRONTEND_URL,
  credentials: true,
  "changeOrigin": true,
  "Access-Control-Allow-Origin": '*',
}))
;

console.log("Backend is connected")


app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser())

// Routes
const professional_routes=require("./routes/professionals.routes")
app.use(professional_routes)
const user_router=require("./routes/users.routes")
app.use(user_router)
const appointment_router=require("./routes/appointments.routes")
app.use(appointment_router)

app.get("/",(req,res)=>{
  res.send("Server Started")
})

app.listen(process.env.PORT || 8000,()=>{
console.log("Started")
})
