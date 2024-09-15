const mongoose = require('mongoose');

const songSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  genre: {
    type: String,
    required: true,
    trim: true
  },
  duration: {
    type: Number,
    required: true,
    min: 0
  },
  releaseDate: {
    type: Date,
    required: true
  },
  audioFile: {
    type: String,  // This will store the path or URL to the audio file
    // required: true
  },
  coverImage: {
    type: String,  // This will store the path or URL to the cover image
    default : "https://sm.mashable.com/t/mashable_in/photo/default/arijit-singh-copy_ddzh.1248.jpg",
  },
  lyrics: {
    type: String,
    trim: true
  },
  featuredArtists: {
    type: String,
    trim: true
  },
  isExplicit: {
    type: Boolean,
    default: false
  },
  songwriters: {
    type: String,
    trim: true
  },
  producers: {
    type: String,
    trim: true
  },
  album: {
    type: String,
    trim: true
  },
  artist: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Artist',
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Add a pre-save hook to update the 'updatedAt' field
songSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

const Song = mongoose.model('Song', songSchema);

module.exports = Song;