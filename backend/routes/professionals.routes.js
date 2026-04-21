const express=require('express')
const router=express.Router()

const upload=require("../middlewares/multer")
const auth=require("../middlewares/auth")

const {
    register,
    login,
    logout,
    getAll,
    getOne,
    update,
    changeAvailability,
    remove,
    dashboard,
    addReview
} = require("../controllers/professionals.controller")

router.post("/register-professional", upload.single("image"), register)

router.post("/professional/login", login)
router.delete("/professional/logOut", logout)

router.get("/admin/all-professionals", getAll)
router.get("/admin/get-Professional/:id", getOne)

router.patch("/admin/update-professional/:id", update)
router.patch("/admin/change-availability/:id", changeAvailability)

router.delete("/admin/delete-professional/:id", remove)
router.delete("/admin/get-Professional/:id", getOne)

router.get("/admin/dashData", dashboard)

router.post("/professional/reviews/:id", auth, addReview)

module.exports = router