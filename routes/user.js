const express=require('express');
const router=express.Router();
const User=require('../models/userModel');
const wrapAsync = require('../utils/wrapAsync');
const passport = require('passport');

router.get("/signup",(req,res)=>{
    res.render("users/signup.ejs");
});

router.post("/signup",wrapAsync(async(req,res)=>{
    try{
    //will be used try and catch which solve the error when same username registered again
    let{username,email,password}=req.body;
    let newUser=new User({email,username});
    let registeredUser=await User.register(newUser,password);
    //will be add popup for success and failure and for failure page should not change 
    req.flash("success","Successfuly registered");
    
    res.redirect("/login");
    }catch(err){
        req.flash("error",err.message);
        res.redirect("/signup");
    }

}));

router.get("/login",(req, res)=>{
    res.render("users/login.ejs")
})


//failureFlash:true is set the value for error when authentication is fail and if it is fail then redirect will be /login
router.post("/login",passport.authenticate("local",{failureRedirect:'/login',failureFlash:true}),(req,res)=>{
    req.flash("success","Successfuly Login");
    res.redirect("/listings");   
})


//logout user

router.get("/logout",(req,res,next)=>{
    req.logOut((err)=>{
        if(err){
            return next(err);
        }
        req.flash("success","you are Logout");
        res.redirect("/listings");
    })
})

module.exports=router;