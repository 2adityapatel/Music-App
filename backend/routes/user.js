const { Router } = require("express");
const User = require("../models/user");
const UserProfile = require('../models/userprofile');

const router = Router();

router.get('/', (req,res) => {
    res.json({ message: 'Welcome to the user page!', user: req.user })
})

router.get('/profile',async (req,res)=>{
    try {
        const email = req.user.email;
        const userData = await UserProfile.findOne({email});
        res.json(userData);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching user profile details', error: error.message });
    }
})

router.post('/profile', async (req, res) => {
    try {
      const { username, profilePhoto } = req.body;
      const email = req.user.email;
      console.log(email);
      const updatedProfile = await UserProfile.findOneAndUpdate(
        { email },
        {username, profilePhoto},
        { new: true, upsert: true }
      );
      
      res.json(updatedProfile);
    } catch (error) {
      res.status(500).json({ message: 'Error updating user profile', error: error.message });
    }
  });

module.exports = router