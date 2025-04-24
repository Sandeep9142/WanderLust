const express=require('express');
const router=express.Router({mergeParams:true});

const Review=require('../models/reviewModel.js');
const Listing=require('../models/listingModel.js');
const wrapAsync=require('../utils/wrapAsync.js');
const ExpressError=require('../utils/ExpressError.js');

const {reviewSchema}=require('../schema.js');



const validateReview = (req, res, next) => {
    let { error } = reviewSchema.validate(req.body);
   
    if (error) {
        let errMsg = error.details.map((el) => el.message).join(",");
        throw new ExpressError(400, errMsg);
    } else {
        
        next();
    }
};


//adding review route

router.post("/",validateReview,wrapAsync(async (req,res)=>{
    let id=req.params.id;
    
    let newReview=new Review(req.body.review);
    
    
    let userList=await Listing.findById(id);
    
    userList.review.push(newReview);
    await newReview.save();
    userList=await userList.save();

    res.redirect(`/listings/${id}`);
    
}))

// deleting review route
router.delete("/:reviewId",wrapAsync(async(req,res)=>{
    let{id,reviewId}=req.params;
    await Listing.findByIdAndUpdate(id,{$pull:{review:reviewId}});
    await Review.findByIdAndDelete(reviewId);
    res.redirect(`/listings/${id}`);
}))


module.exports=router;