const express=require('express');
const router=express.Router();
const Listing=require('../models/listingModel.js');
const wrapAsync=require('../utils/wrapAsync.js');
const ExpressError=require('../utils/ExpressError.js');
const {listingSchema}=require('../schema.js');
const {isLoggedIn}=require('../middleware.js');


const validateListing=(req,res,next)=>{
    let {error}=listingSchema.validate(req.body);
    if(error){
        let errMsg=error.details.map((el)=>el.message).join(",");
        throw new ExpressError(400,errMsg);
    }else{
        next();
    }
}

//index.route (showing all listing)
router.get("/",wrapAsync( async (req,res)=>{
   const allListing= await Listing.find();
 
   res.render("listing/index.ejs",{allList:allListing});
}));



//adding new listing
router.get("/new",isLoggedIn,(req,res)=>{
    
    res.render("listing/new.ejs");
})


//creating new listing
router.post("/",isLoggedIn,validateListing,wrapAsync(async(req,res,next)=>{
    //let  {title,description,image,price,location,country}=req.body;
       
        let newList=new Listing(req.body.listing);
        await newList.save();
        req.flash("success","New listing created!")
        res.redirect("/listings");
        // res.render("/popup.ejs");
    }));

//editing listing route
router.get("/:id/new",isLoggedIn,wrapAsync( async (req,res)=>{
    let {id}=req.params;
   
    let listing=await Listing.findById(id);
    
    res.render("listing/edit.ejs",{listing});
}));

//editing the listing

router.put("/:id",isLoggedIn,wrapAsync(async (req,res)=>{
    
    //update the data by id and using deconstruct to put indivisual value ...
    await Listing.findByIdAndUpdate(req.params.id,{...req.body.listing});
    req.flash("success","Listing edited successfully");
    res.redirect(`/listings/${req.params.id}`);
}));


//showing listing
router.get("/:id",wrapAsync( async (req,res)=>{
    const cList=await Listing.findById(req.params.id).populate("review");
    res.render("listing/show.ejs",{cList});
}));

//delete listing route

router.delete("/:id",isLoggedIn,wrapAsync(async (req,res)=>{
    await Listing.findByIdAndDelete({_id:req.params.id});
    req.flash("success","Listing deleted permanently!!");
    res.redirect("/listings");
}));

module.exports=router;

