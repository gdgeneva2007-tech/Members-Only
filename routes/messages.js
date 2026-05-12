const express=require("express")
const router=express.Router()
const {ensureLoggedIn,ensureAdmin}=require("../middleware/auth")
const {messageValidationRules,createMessage,createMessageHandle,deleteMessage}=require("../controllers/messageController")
router.get("/new",ensureLoggedIn,createMessage)
router.post("/new",ensureLoggedIn,messageValidationRules,createMessageHandle)
router.post("/:id/delete",ensureAdmin,deleteMessage)
module.exports=router