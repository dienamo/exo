const express = require("express");
const router = express.Router();
const User = require("../models/User");

router.put("/addtofavorite", async (req, res) => {
  const { userId, movieId } = req.body;
  try {
    await User.findByIdAndUpdate(
      { _id: userId },
      { $addToSet: { favoriteMovies: movieId } },
      { new: true }
    );
    res.status(200).json(movieId);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.put("/removefromfavorite", async (req, res) => {
  const { userId, movieId } = req.body;
  try {
    await User.findByIdAndUpdate(
      { _id: userId },
      { $pull: { favoriteMovies: movieId } },
      { new: true }
    );
    res.status(200).json(movieId);
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
