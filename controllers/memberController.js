// join club, join admin
const db=require("../db/queries")
const joinClub=(req,res)=>{
    res.render("join-club",{title:"Join Club",errors:"",formData:{},formAction:"/member/join"})
}
const joinClubHandle=async (req,res,next)=>{
    try{
        if(req.body.passCode===process.env.MEMBERSHIP_PASSCODE){
            await db.joinMembers(parseInt(req.user.id))
            res.redirect("/")
        }
        else{
            res.render("join-club",{title:"Join Club",formAction:"/member/join",errors:"Incorrect membership passcode.",formData:req.body})
        }
    }catch(err){
        next(err)
    }
}
const joinAdmins=(req,res)=>{
    res.render("join-club",{title:"Join Admins",errors:"",formData:{},formAction:"/member/admin"})
}
const joinAdminsHandle=async (req,res,next)=>{
    try{
        if(req.body.passCode===process.env.ADMIN_PASSCODE){
            await db.joinAdmins(parseInt(req.user.id))
            res.redirect("/")
        }
        else{
            res.render("join-club",{title:"Join Admins",formAction:"/member/admin",errors:"Incorrect admin passcode.",formData:req.body})
        }
    }catch(err){
        next(err)
    }
}
module.exports={joinClub,joinClubHandle,joinAdmins,joinAdminsHandle}