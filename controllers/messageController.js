// create, delete messages
const db=require("../db/queries")
const {body,validationResult}=require("express-validator")
const messageValidationRules=[
    body("title")
        .trim()
        .notEmpty()
        .withMessage("Title is required.")
        .isLength({max:100})
        .withMessage("Title must be under 100 characters."),
    body("text")
        .trim()
        .optional({values:"falsy"})
        .isLength({max:500})
        .withMessage("Text must be under 500 characters.")
]

function createMessage(req,res){
    res.render("new-message",{title:"Create message",errors:[],formData:{}})
}

async function createMessageHandle(req,res,next){
    try{
        const err=validationResult(req)
        if(!err.isEmpty()){
            return res.render("new-message",{title:"Create message",errors:err.array(),formData:req.body})
        }
        await db.createMessage(parseInt(req.user.id),req.body)
        res.redirect("/")
    }catch(err){
        next(err)
    }
}

async function deleteMessage(req,res,next){
    try{
        const id=parseInt(req.params.id)
        const existingMsg=await db.findMessageById(id)
        if(!existingMsg){
            return res.status(404).render("error",{title:"No message",message:"Message doesn't exist."})
        }
        await db.deleteMessage(id)
        res.redirect("/")
    }catch(err){
        next(err)
    }
}

module.exports={
    messageValidationRules,
    createMessage,createMessageHandle,deleteMessage
}
