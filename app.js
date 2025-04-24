const express=require('express');
const mongoose=require('mongoose');
const app=express();
const path=require('path');
const methodOverride=require('method-override');
const ejsmate=require('ejs-mate');
const session=require('express-session');
const flash=require('connect-flash');
const passport=require('passport');
const LocalStrategy=require('passport-local');
const User=require('./models/userModel.js');

app.set(express.json());
app.set("view engine","ejs");
app.use(express.static(path.join(__dirname,'public')));
app.use(express.urlencoded({extended:true}));
app.use(methodOverride("_method"));
app.engine('ejs', ejsmate);

const sessionOptions={
    secret:"asdfasdf",
    resave:false,
    saveUninitialized:true,
    cookie:{
        expires:Date.now()+7*24*60*60*1000,
        maxAge:7*24*60*60,
        httpOnly:true

    }
}
app.use(session(sessionOptions));
app.use(flash());

app.use(passport.initialize());

// //ability to indentify the users as they browse page to page
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
// //storing the details of users to session 
passport.serializeUser(User.serializeUser());
// //fetching the details of users from session
passport.deserializeUser(User.deserializeUser());



const listingsRoute=require('./routes/listing.js');
const reviewsRoute=require("./routes/review.js");
const userRoute=require("./routes/user.js");



mngpath="mongodb://127.0.0.1:27017/wanderlust";

connectDB().then((data)=>{
    console.log("data base connected");
}).catch((err)=>{
    console.log(err)
});
async function connectDB(){
    await mongoose.connect(mngpath);
}


//root route
app.get("/",(req,res)=>{
    
    res.send("it is running");

});

app.get("/demouser",async(req,res)=>{
    let dummyUser=new User({
        email:"student@gmail.com",
        username:"sandeep"
    });
    let temp=await User.register(dummyUser,"sandeep");
    res.send(temp);
    
})


app.use("/listings",listingsRoute);
app.use("/listings/:id/review",reviewsRoute);
app.use("/",userRoute);



app.use((err,req,res,next)=>{
    let {statusCode=500,message="something went wrong!!"}=err;
    res.status(statusCode).render("Error.ejs",{message});
});


app.listen(5500);