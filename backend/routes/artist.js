const { Router } = require("express");
const ArtistProfile = require('../models/artistprofile');
const Song = require('../models/song');  
const User = require("../models/user")


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

  router.post('/add-song', async (req, res) => {
    try {
        // Extracting the song details from the request body
        const { title, genre, duration, releaseDate, audioFile, coverImage, lyrics, featuredArtists, isExplicit, songwriters, producers, album } = req.body;
        const artistEmail = req.user.email;
        console.log(req.user);
        console.log( { title, genre, duration, releaseDate, audioFile, coverImage, lyrics, featuredArtists, isExplicit, songwriters, producers, album });
        
        
        // Check if the artist exists before adding the song
        const artist = await ArtistProfile.find( {email : artistEmail},{_id:1} )
        const artistId = artist[0]._id.toString()
        console.log(artistId);
        
        if (!artistId) {
            return res.status(404).json({ message: 'Artist not found' });
        }

        // Create a new song instance
        const newSong = new Song({
            title,
            genre,
            duration,
            releaseDate,  
            audioFile,
            coverImage,
            lyrics,
            featuredArtists,
            isExplicit,
            songwriters,
            producers,
            album,
            artist: artistId  // Link the song to the artist
        });

        // Save the song to the database
        const savedSong = await newSong.save();

        // Return the saved song as a response
        res.status(201).json( { savedSong , msg : "Song added successfully" });
    } catch (error) {
        // Handle any errors
        console.log(error.message);
        res.status(500).json({ message: 'Error adding song', error: error.message });
        
    }
});

router.get('/songs/:artistId', async (req, res) => {
  try {
      const { artistId } = req.params;
      const songs = await Song.find({ artist: artistId });
      console.log(songs);
      
      if (!songs) {
          return res.status(404).json({ message: 'No songs found for this artist' });
      }

      res.json(songs);
  } catch (error) {
      res.status(500).json({ message: 'Error fetching songs', error: error.message });
  }
});

module.exports = router