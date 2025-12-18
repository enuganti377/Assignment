const express = require("express");
const bcrypt = require("bcryptjs");
const {Usermodel} =  require("../db");
const router = express.Router();


router.post("/signup", async function( req, res) {

    try{
    const username = req.body.username;
    const email = req.body.email;
    const password = req.body.password;

    if(!username || !email || !password){

    return res.status(400).json({
        message: "All fields are required" 
    })
    }
    
    const userexsist = await Usermodel.findOne({
         $or: [{ email }, { username }] 
    })

    if(userexsist){
return res.status(400).json({
    message:"user alredy exsist"
})

    }

const hashedPassword = await bcrypt.hash(password, 10);

await Usermodel.create({
    username: username,
    email :  email,
    password : hashedPassword 


});

res.status(201).json({
    message:"User signup successful"
})

    }

    catch(error){
res.status(500).json({ message: "Server error" })

    }

    
})
module.exports = router;