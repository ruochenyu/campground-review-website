var mongoose = require("mongoose"),
    Campground = require("./models/campground"),
    Comment = require("./models/comment");

var data = [
        {
            name: "Salmon Creek", 
            image:"https://farm3.staticflickr.com/2931/14128269785_f27fb630f3.jpg", 
            description: "Established in 2004, this is Indiana's newest state park where you can enjoy camping, hiking, biking, fishing, birding, and wildlife observation. The park is unique because of the large expanses of tall prairie grasses, blooming native wildflowers, and numerous wetlands called fens that wait to be explored. Several picnic areas, shelter houses, playgrounds and a 110 site modern campground, all of which are ADA accessible, can be found within the park."},
        {
            name: "Canyon", 
            image:"https://farm3.staticflickr.com/2116/2164766085_0229ac3f08.jpg", 
            description: "Established in 2004, this is Indiana's newest state park where you can enjoy camping, hiking, biking, fishing, birding, and wildlife observation. The park is unique because of the large expanses of tall prairie grasses, blooming native wildflowers, and numerous wetlands called fens that wait to be explored. Several picnic areas, shelter houses, playgrounds and a 110 site modern campground, all of which are ADA accessible, can be found within the park."},
        {
            name: "White Park", 
            image:"https://farm7.staticflickr.com/6105/6381606819_df560e1a51.jpg", 
            description: "Established in 2004, this is Indiana's newest state park where you can enjoy camping, hiking, biking, fishing, birding, and wildlife observation. The park is unique because of the large expanses of tall prairie grasses, blooming native wildflowers, and numerous wetlands called fens that wait to be explored. Several picnic areas, shelter houses, playgrounds and a 110 site modern campground, all of which are ADA accessible, can be found within the park."}
    ];
    
function seedDB() {
    Campground.remove({}, function(err) {
        if (err) {
            console.log(err);
        }
        
        console.log("removed!!");
        data.forEach(function(seed) {
            Campground.create(seed, function(err, campground) {
                if (err) {
                    console.log(err);
                } else {
                    console.log("added!!!");
                    Comment.create({
                        text: "This is a good place",
                        author: "Homer"
                    }, function(err, comment) {
                        if (err) {
                            console.log(err);
                        } else {
                            campground.comments.push(comment);
                            campground.save();
                            console.log("Comment added!");
                        }
                    });
                }
            }); 
        }); 
    });
}

module.exports = seedDB;