const { Router } = require("express");
const User = require("../models/user");
const UserProfile = require('../models/userProfile');

const router = Router();

router.get('/', (req,res) => {
    res.json({ message: 'Welcome to the user page!', user: req.user })
})

router.post('/profile', async (req, res) => {
    try {
      const { username, profilePhoto, numFollowings } = req.body;
      
      const updatedProfile = await UserProfile.findOneAndUpdate(
        { username },
        { profilePhoto, numFollowings },
        { new: true, upsert: true }
      );
      
      res.json(updatedProfile);
    } catch (error) {
      res.status(500).json({ message: 'Error updating user profile', error: error.message });
    }
  });

module.exports = router