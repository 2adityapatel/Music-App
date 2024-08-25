const { Schema, model } = require("mongoose");

const userProfile = new Schema(
    {
    username: {
      type: String,
      required: true, 
      unique: true,   
      trim: true    
    },
    profilePhoto: {
      type: String,   
      required: false 
    },
    numberOfArtistsFollowed: {
        type: Number,
        default: 0      
      }
  }, 
  { timestamps: true }
);
  
const UserProfile = model("userprofile", userProfile);

module.exports = UserProfile;