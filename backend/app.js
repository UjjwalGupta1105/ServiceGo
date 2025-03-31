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
  "Access-Control-Allow-Origin": '*'
}))
// CORS Middleware
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", process.env.FRONTEND_URL); // Allow specific origin
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.header("Access-Control-Allow-Credentials", "true");

  if (req.method === "OPTIONS") {
    return res.sendStatus(200); // Preflight request successful
  }

  next();
});


console.log("Backend is connected")
console.log(process.env.FRONTEND_URL)
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser())

// Routes
const professional_routes=require("./router/professionalRouter")
app.use(professional_routes)
const user_router=require("./router/userRouter")
app.use(user_router)
const appointment_router=require("./router/appointmentRouter")
app.use(appointment_router)

app.get("/",(req,res)=>{
  res.send("Here i Comes....")
})

app.listen(8000,()=>{
console.log("Started")
})
