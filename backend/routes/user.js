const { Router } = require("express");
const User = require("../models/user");
const UserProfile = require('../models/userprofile');
const Song = require("../models/song");
const Artist = require("../models/artistprofile")

const router = Router();



router.get('/',async (req,res)=>{
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

// Route to search for songs and related artists
router.get('/search', async (req, res) => {
  const searchQuery = req.query.q;

  if (!searchQuery) {
    return res.status(400).json({ message: 'Search query is required' });
  }

  try {
    // Find songs that match the query in title using regex and populate their artist field
    const songs = await Song.find({
      title: { $regex: searchQuery, $options: 'i' }
    }).limit(10).populate('artist');

    const songArtists = songs.map(song => song.artist);

    const regexArtists = await Artist.find({
      name: { $regex: searchQuery, $options: 'i' }
    });

    // Merge songArtists and regexArtists without duplicates
    const allArtists = [...songArtists, ...regexArtists].reduce((uniqueArtists, artist) => {
      if (!uniqueArtists.some(a => a._id.toString() === artist._id.toString())) {
        uniqueArtists.push(artist);
      }
      return uniqueArtists;
    }, []);

    res.json({ songs, artists: allArtists });
  } catch (error) {
    console.log(error);
    
    res.status(500).json({ message: 'Server error', error });
  }
});


// Remove a song from liked songs
router.delete('/:userId/like-song/:songId', async (req, res) => {
  const { songId , userId} = req.params;
  
  try {
    const userProfile = await UserProfile.findById(userId);

    if (!userProfile) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (userProfile.likedSongs.includes(songId)) {
      userProfile.likedSongs = userProfile.likedSongs.filter((id) => id.toString() !== songId);
      await userProfile.save();
      return res.status(200).json({ message: 'Song removed from liked songs' });
    }

    res.status(400).json({ message: 'Song not found in liked songs' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Add a song to liked songs
router.post('/:userId/like-song/:songId', async (req, res) => {
  const { userId, songId } = req.params;

  try {
    const userProfile = await UserProfile.findById(userId);

    if (!userProfile) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (!userProfile.likedSongs.includes(songId)) {
      userProfile.likedSongs.push(songId);
      await userProfile.save();
      return res.status(200).json({ message: 'Song added to liked songs' });
    }

    res.status(400).json({ message: 'Song already in liked songs' });
  } catch (error) {
    console.log(error);
    
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});



module.exports = router