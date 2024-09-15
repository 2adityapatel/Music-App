const mongoose = require('mongoose');
// Define the Artist schema
const artistSchema = new mongoose.Schema({
  email : {
    type:String,
    required:true
  },
  username: {
    type: String,
    unique:true,
    trim: true
  },
  profilePicture: {
    type: String,
    trim: true
  },
  genre: {
    type: String,
    trim: true
  },
  bio: {
    type: String,
    trim: true
  },
  instagram: {
    type: String,
    trim: true
  },
  twitter: {
    type: String,
    trim: true
  },
  facebook: {
    type: String,
    trim: true
  },
  followers: {
    type: Number,
    default: 0
  },
  topTracks: [{
    type: String,
    trim: true
  }],
  albums: [{
    title: { type: String, trim: true },
    releaseDate: { type: Date }
  }],
  upcomingEvents: [{
    eventName: { type: String, trim: true },
    eventDate: { type: Date },
    location: { type: String, trim: true }
  }],
  awards: [{
    awardName: { type: String, trim: true },
    year: { type: Number }
  }],
  relatedArtists: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Artist'
  }],
  musicVideos: [{
    title: { type: String, trim: true },
    url: { type: String, trim: true }
  }]
});

// Create the Artist model
const Artist = mongoose.model('Artist', artistSchema);

module.exports = Artist;
