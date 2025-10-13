const express = require("express")
const adminRoute = express.Router()

const adminController = require("../../controller/admin/adminController")

adminRoute.get("/get-user-form-data",adminController.getUserFormData)
adminRoute.get("/get-individual-user-data/:id",adminController.getIndividualUserData)

adminRoute.post("/admin-verification",adminController.adminVerification)


adminRoute.delete("/delete-user-data/:id",adminController.deleteUserData)



module.exports = adminRoute