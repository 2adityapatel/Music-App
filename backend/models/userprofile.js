const { Schema, model } = require("mongoose");

const userProfile = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    username: {
      type: String,
      unique: true,
      trim: true,
    },
    profilePhoto: {
      type: String,
      required: false,
    },
    numberOfArtistsFollowed: {
      type: Number,
      default: 0,
    },
    likedSongs: [
      {
        type: Schema.Types.ObjectId,
        ref: "Song",
      },
    ],
  
  artistsFollowed : [
    {
      type: Schema.Types.ObjectId,
      ref: "Artist",
    },
  ],
},
  { timestamps: true }
);

const UserProfile = model("userprofile", userProfile);

module.exports = UserProfile;
