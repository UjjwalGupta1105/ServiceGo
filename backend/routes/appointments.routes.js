const express=require("express")
const router=express.Router()

const auth=require("../middlewares/auth")

const {
  book,
  myAppointments,
  cancel,
  remove,
  getAll,
  complete
} = require("../controllers/appointments.controller")

router.post("/user/book-appointment",auth,book)

router.get("/user/my-appointments",auth,myAppointments)

router.patch("/user/cancel-booking",auth,cancel)

router.post("/user/cancel-booking/delete",auth,remove)

router.get("/admin/get-appointments",getAll)

router.post("/booking/completed/:id",complete)

module.exports=router