var express=require("express");
var router=express.Router();
var Campground=require("../models/campground");
var middleware = require("../middleware");


//INDEX ROUTE-show all campgrounds
router.get("/",function(req,res){
    Campground.find({},function(err,allCampground){
        if(err){
            console.log(err);
        }else{
            res.render("campgrounds/index",{campgrounds:allCampground}); 
        }
    })
      
});


// CREATE ROUTE
router.post("/", middleware.isLoggedIn, function(req,res){
    var name=req.body.name;
    var price=req.body.price;
    var image=req.body.image;
    var description=req.body.description;
    var author={
        id:req.user._id,
        username:req.user.username
    };
    var newCampground={name:name, price: price, image:image, description:description, author:author};
    Campground.create(newCampground,function(err,newlyCreated){
        if(err){
            console.log(err);
        }else{
            req.flash("success", "Campground added");
            res.redirect("/campgrounds");
        }
    });
    
});


// NEW ROUTE
router.get("/new", middleware.isLoggedIn, function(req,res){
   res.render("campgrounds/new"); 
});


//SHOW ROUTE
router.get("/:id",function(req, res) {
    Campground.findById(req.params.id).populate("comments").exec(function(err,foundCampground){
        if(err){
            console.log(err);
        }else{
            console.log(foundCampground);
            res.render("campgrounds/show",{campground:foundCampground});
        }
    });
    
});

//edit campground route
router.get("/:id/edit", middleware.checkCampgroundOwnership,  function(req,res){
   Campground.findById(req.params.id, function(err,foundCampground){
       if(err){
           res.redirect("/campgrounds");
       }else{
           res.render("campgrounds/edit", {campground: foundCampground});
       }
   }) ;
});

//update campground route

router.put("/:id", middleware.checkCampgroundOwnership, function(req,res){
   Campground.findByIdAndUpdate(req.params.id, req.body.campground, function(err, updatedCampground){
       if(err){
           res.redirect("/campgrounds");
       }
       else{
           req.flash("success", "Campground updated successfully");
           res.redirect("/campgrounds/" + req.params.id);
       }
   }) 
});

//destroy campground route

router.delete("/:id", middleware.checkCampgroundOwnership, function(req,res){
    Campground.findByIdAndRemove(req.params.id, function(err){
       if(err) {
           res.redirect("/campgrounds");
       }else{
           req.flash("success", "Campground deleted");
           res.redirect("/campgrounds");
       }
    });
});



module.exports=router;