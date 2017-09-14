var express = require("express");
var router = express.Router();
var Campground = require("../models/campground");
var middleware = require("../middleware");

// Display a list
router.get("/", function(req, res) {
    Campground.find({}, function(err, allCampgrounds) {
        if (err) {
            console.log(err);
        } else {
            res.render("campgrounds/index", {campgrounds: allCampgrounds});
        }
    });
});

// add a new campground to DB
router.post("/", middleware.isLoggedIn, function(req, res) {
    var name = req.body.name;
    var price = req.body.price;
    var image = req.body.image;
    var desc = req.body.description;
    var author = {
        id: req.user._id,
        username: req.user.username
    };
    Campground.create({name: name, price: price, image: image, description: desc, author: author}, function(err, newCampground) {
        if (err) {
            console.log(err);
        } else {
            res.redirect("/campgrounds");
        }
    });
    
});

// display form to make a new campground
router.get("/new", middleware.isLoggedIn, function(req, res) {
    res.render("campgrounds/new");
});

// show info of one campground
router.get("/:id", function(req, res) {
    Campground.findById(req.params.id).populate("comments").exec(function(err, foundCamp) {
        if (err) {
            console.log(err);
        } else {
            res.render("campgrounds/show", {foundCamp: foundCamp});
        }
    });
});

// EDIT
router.get("/:id/edit", middleware.checkCampgroundOwnership ,function(req, res) {
    Campground.findById(req.params.id, function(err, foundCamp) {
        if (err) {
            res.redirect("/campgrounds");
        } else {
            res.render("campgrounds/edit", {foundCamp: foundCamp});
        }
    });
});

// UPDATE
router.put("/:id", middleware.checkCampgroundOwnership, function(req, res) {
    Campground.findByIdAndUpdate(req.params.id, req.body.campground, function(err, updatedCampground) {
        if (err) {
            res.redirect("/campgrounds");
        } else {
            res.redirect("/campgrounds/" + req.params.id);
        }
    });
});

// DELETE
router.delete("/:id", middleware.checkCampgroundOwnership ,function(req, res) {
    Campground.findByIdAndRemove(req.params.id, function(err) {
        if (err) {
            res.redirect("/campgrounds" + req.params.id);
        } else {
            res.redirect("/campgrounds");
        }
    });
});

module.exports = router;