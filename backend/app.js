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
  origin: process.env.FRONTEND_URL || "https://servicego-abc.vercel.app",
  credentials: true,
  // "changeOrigin": true,
  // "Access-Control-Allow-Origin": '*',
    methods: "GET, POST, PUT, DELETE, OPTIONS",
  allowedHeaders: "Content-Type, Authorization"
}))

// Manually set CORS headers for extra safety
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", process.env.FRONTEND_URL || "https://servicego-abc.vercel.app");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.setHeader("Access-Control-Allow-Credentials", "true");

  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }

  next();
});

// Explicitly handle preflight requests
app.options("*", cors());


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

app.listen(process.env.PORT || 8000,()=>{
console.log("Started")
})
