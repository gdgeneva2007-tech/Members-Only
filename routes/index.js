// routes/index.js
// TEMPLATE: just a home page, fill in the controller logic

const express = require("express");
const router = express.Router();
const db=require("../db/queries")
router.get("/", async(req, res,next) => {
  try{
    const messages=await db.getAllMessages();
    res.render("index",{title:"Home", messages:messages})
  }catch(err){
    next(err)
  }
});

module.exports = router;