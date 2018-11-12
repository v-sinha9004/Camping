var mongoose=require("mongoose");
var Campground=require("./models/campground");
var Comment =require("./models/comment");

var data=[
    {
        name:"Ranbir Kapoor",
        image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRsJus9_-RqcDcdLzsYWJ50txBviAaQClPOe1WUH-wKK61Ge3GjOQ",
        description:"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
    },
    {
        name:"Ranveer Singh",
        image:"http://static.dnaindia.com/sites/default/files/styles/full/public/2018/07/06/701516-683121-661882-ranveer-singh.jpg",
        description:"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
    },
    {
        name:"Sanju",
        image:"https://images.indianexpress.com/2018/07/sanju759.jpg",
        description:"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."

    }
]

function seedDB(){
    // REMOVE ALL CAMPGROUNDS
        Campground.remove({},function(err){
        if(err){
            console.log(err);
        }
        console.log("Removed Campgrounds");
    });
    data.forEach(function(seed){
        Campground.create(seed,function(err,data){
            if(err){
                console.log(err);
            }else{
                console.log("added a campground");
                Comment.create({
                    text:"He is an fantabulous actor.",
                    author:"Vishal Sinha"
                },function(err,comment){
                    if(err){
                        console.log(err);
                    }else{
                        data.comments.push(comment);
                        data.save();
                        console.log("Added a Comment");
                    }
                })
            }
        })
    })
    
}

module.exports=seedDB;
