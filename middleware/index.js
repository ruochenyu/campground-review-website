var Campground = require("../models/campground");
var Comment = require("../models/comment");
var middleware = {};

middleware.checkCampgroundOwnership = function checkCampgroundOwnership(req, res, next) {
    if (req.isAuthenticated()) {
        Campground.findById(req.params.id, function(err, foundCamp) {
            if (err) {
                req.flash("error", "Campground not found");
                res.redirect("back");
            } else {
                if (foundCamp.author.id.equals(req.user._id)) {
                    next();
                } else {
                    req.flash("error", "You don't have permission to do that");
                    res.redirect("back");
                }
            }
        });
    } else {
        req.flash("error", "You need to be logged in to do that");
        res.redirect("back");
    }
}

middleware.checkCommentOwnership = function checkCommentOwnership(req, res, next) {
    if (req.isAuthenticated()) {
        Comment.findById(req.params.comment_id, function(err, comment) {
            if (err) {
                res.redirect("back");
            } else {
                if (comment.author.id.equals(req.user._id)) {
                    next();
                } else {
                    req.flash("error", "You don't have permission to do that");
                    res.redirect("back");
                }
            }
        });
    } else {
        req.flash("error", "You need to be logged in to do that");
        res.redirect("back");
    }
}

middleware.isLoggedIn = function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    
    req.flash("error", "You need to be logged in to do that");
    res.redirect("/login");
}

module.exports = middleware;