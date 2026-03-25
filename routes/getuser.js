const express = require("express")
const { getDB } = require("../db")


const router = express.Router()


router.post("/getuser",async(req,res)=>{
    let db = getDB()
    let users = await db.collection("users").findOne({sessionid:req.body.sessionid})

    if(!users){
        return res.json({
            code:-1,
            message:"User not found"
        })
    }
    return res.json({code:0,body:users})

})

module.exports = router
