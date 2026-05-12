const express=require("express")
const router=express.Router()
const {ensureLoggedIn,ensureMember}=require("../middleware/auth")
const {joinClub,joinClubHandle,joinAdmins,joinAdminsHandle} =require("../controllers/memberController")
router.get("/join",ensureLoggedIn,joinClub)
router.post("/join",ensureLoggedIn,joinClubHandle)
router.get("/admin",ensureMember,joinAdmins)
router.post("/admin",ensureMember,joinAdminsHandle)
module.exports=router