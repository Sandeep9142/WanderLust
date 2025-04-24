const express=require('express');
const router=express.Router();
const User=require('../models/userModel');
const wrapAsync = require('../utils/wrapAsync');

router.get("/signup",(req,res)=>{
    res.render("users/signup.ejs");
});

router.post("/signup",wrapAsync(async(req,res)=>{
    //will be used try and catch which solve the error when same username registered again
    let{username,email,password}=req.body;
    console.log(username+" "+email+" "+password);
    let newUser=new User({email,username});
    let registeredUser=await User.register(newUser,password);
    console.log(registeredUser);

    //will be add popup for success and failure and for failure page should not change 
    res.redirect("/listings");

}));

module.exports=router;