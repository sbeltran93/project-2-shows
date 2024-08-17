const express = require("express");
const router = express.Router();

const User = require("../models/user.js");

module.exports = router;

// shows your shows
router.get("/", async (req, res) => {
  const userId = req.session.user._id;
  const user = await User.findById(userId);
  res.render("tvshows/index.ejs", {
    foundShowCase: user.showCase,
  });
});

// to leave a new review
router.get("/new", (req, res) => {
  res.render("tvshows/new.ejs");
});

// to post new review
router.post("/", async (req, res) => {
  try {
    req.body.rating = parseInt(req.body.rating);
    const foundUser = await User.findById(req.session.user._id);
    foundUser.showCase.push(req.body);
    await foundUser.save();
    res.redirect(`/users/${foundUser._id}/tvshows`);
  } catch (error) {}
});

// delete show
router.delete("/:id", async (req, res) => {
  try {
    const userId = req.session.user._id;
    const itemId = req.params.id;
    const user = await User.findById(userId);
    if (!user) {
      return res.redirect("/");
    }
    user.showCase.pull({ _id: itemId });
    await user.save();
    res.redirect(`/users/${userId}/tvshows`);
  } catch (error) {
    console.error(error);
    res.redirect("/");
  }
});

// goes to edit show
router.get("/:id/edit", async (req, res) => {
  try {
    const foundUser = await User.findOne({ _id: req.session.user._id });
    const foundTvshow = foundUser.showCase.id(req.params.id);
    res.render("tvshows/edit.ejs", {
      item: foundTvshow,
    });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
});

// edits shows
router.put("/:id", async (req, res) => {
  try {
    const userId = req.session.user._id;
    const user = await User.findById(userId);
    const updatedTvshow = user.showCase.id(req.params.id);
    updatedTvshow.set(req.body);
    await user.save();
    res.redirect(`/users/${userId}/tvshows`);
  } catch (error) {
    console.error(error);
    res.redirect("/");
  }
});

module.exports = router;
