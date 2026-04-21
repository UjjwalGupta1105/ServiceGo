const express = require("express")
const router = express.Router()

const auth=require("../middlewares/auth")

const {
    register,
    login,
    updateUser,
    updateAddress,
    updateUserById,
    getUser,
    logout,
    deleteUser,
    updatePassword,
    payment,
    verifyPayment,
    getAllUsers,
    getUserById,
    contact,
    getRequests,
    deleteRequest,
    forgotPassword,
    resetPassword
} = require("../controllers/user.controller")

router.post("/user/register", register)
router.post("/user/login", login)

router.patch("/user/update", auth, updateUser)
router.patch("/user/address-update", auth, updateAddress)
router.patch("/user/update/:id", auth, updateUserById)

router.get("/user", auth, getUser)

router.delete("/user/logOut", auth, logout)
router.delete("/user/delete/:id", deleteUser)

router.post("/me/updatePassword", auth, updatePassword)

router.post("/user/payment-razorpay", auth, payment)
router.post("/user/payment-verification-razorpay", auth, verifyPayment)

router.get("/admin/get-users", getAllUsers)
router.get("/admin/get-user/:id", getUserById)

router.post("/api/contact", contact)
router.get("/new-requests", getRequests)
router.delete("/request/delete/:id", deleteRequest)

router.post("/user/password/forgot", forgotPassword)
router.patch("/password/reset/:token", resetPassword)

module.exports = router