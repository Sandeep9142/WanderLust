const express=require('express');
const mongoose=require('mongoose');
const app=express();
const Listing=require('./models/listing');
const path=require('path');
const methodOverride=require('method-override');
const ejsmate=require('ejs-mate');
const wrapAsync=require('./utils/wrapAsync.js');
const ExpressError=require('./utils/ExpressError.js');
const {listingSchema}=require('./schema.js');



app.set(express.json());

app.set("view engine","ejs");
app.use(express.static(path.join(__dirname,'public')));
app.use(express.urlencoded({extended:true}));
app.use(methodOverride("_method"));
app.engine('ejs', ejsmate);

mngpath="mongodb://127.0.0.1:27017/wanderlust";

connectDB().then((data)=>{
    console.log("data base connected");
}).catch((err)=>{
    console.log(err)
});
async function connectDB(){
    await mongoose.connect(mngpath);
}

app.get("/",(req,res)=>{
    res.send("it is running");
});

//creating new list
app.post("/listings", wrapAsync(async (req,res,next)=>{
    //let  {title,description,image,price,location,country}=req.body;

        let result=listingSchema.validate(req.body);
        if(result.error){
            throw new ExpressError(400,result.error);
        }
        let newList=new Listing(req.body.listing);
        await newList.save();
        res.redirect("/listings");
    }));

//index.route
app.get("/listings",wrapAsync( async (req,res)=>{
   const allListing= await Listing.find();
   res.render("listing/index.ejs",{allList:allListing});
}));



//adding new list
app.get("/listings/new",(req,res)=>{
    res.render("listing/new.ejs");
})
//new list
//editing the list
app.get("/listings/:id/new",wrapAsync( async (req,res)=>{
    let {id}=req.params;
   
    let listing=await Listing.findById(id);
    
    res.render("listing/edit.ejs",{listing});
}));

// show route

app.get("/listings/:id",wrapAsync( async (req,res)=>{
    const cList=await Listing.findById(req.params.id);
    res.render("listing/show.ejs",{cList});
}));


//editroute

app.put("/listings/:id",wrapAsync(async (req,res)=>{
    
    //update the data by id and using deconstruct to put indivisual value ...
    await Listing.findByIdAndUpdate(req.params.id,{...req.body.listing});
    res.redirect(`/listings/${req.params.id}`);
}));

//delete route

app.delete("/listings/:id",wrapAsync(async (req,res)=>{
    await Listing.deleteOne({_id:req.params.id})
    res.redirect("/listings");
}));

// app.get("/testListing",(req,res)=>{
//     let first=new Listing({
//         title:"My new house",
//         description:"it is newly house for rent",
//         price:12000,
//         location:"ranchi ",
//         country:"india"
//     });

//     first.save();

//     console.log("heeloo");

//     res.send("successfully sended");
// })


// this will run when all the above route is not executed for specific route
// app.all("*",(req,res,next)=>{
//     next(new ExpressError(404,"asdfasf"));
// });
app.use((err,req,res,next)=>{
    let {statusCode=500,message="something went wrong!!"}=err;
    res.status(statusCode).render("Error.ejs",{message});
});


app.listen(5500);