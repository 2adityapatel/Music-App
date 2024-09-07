const { Router } = require("express");
const ArtistProfile = require('../models/artistprofile');

const router = Router();


router.get('/',async (req,res)=>{
    try {
        const email = req.user.email;
        const artistData = await ArtistProfile.findOne({email});
        res.json(artistData);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching artist profile details', error: error.message });
    }
})

router.post('/profile', async (req, res) => {
    try {
      const { username, profilePhoto, genre, bio, instagram, twitter, facebook } = req.body;
      const email = req.user.email;
      console.log(email);
      console.log("Heyy ");
      console.log(req.body);
      
      const updatedProfile = await ArtistProfile.findOneAndUpdate(
        { email },
        { username, profilePhoto, genre, bio, instagram, twitter, facebook },
        { new: true, upsert: true }
      );
      
      res.json(updatedProfile);
    } catch (error) {
      res.status(500).json({ message: 'Error updating user profile', error: error.message });
    }
  });

module.exports = router