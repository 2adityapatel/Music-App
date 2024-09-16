import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { FaInstagram, FaTwitter, FaFacebook, FaEdit, FaSave, FaTimes } from 'react-icons/fa';
import { artistContext } from './ArtistLayout';

const ArtistProfile = () => {
  const { artist, setArtist } = useContext(artistContext);
  const [isEditing, setIsEditing] = useState(false);
  const [newPhoto, setNewPhoto] = useState(null);
  const [error, setError] = useState(null);

  const handleEdit = () => setIsEditing(true);
  const handleCancel = () => {
    setIsEditing(false);
    setNewPhoto(null);
  };

  const handleSave = async () => {
    try {
      const token = localStorage.getItem('token');
      const formData = new FormData();
   
    // Populate FormData with artist information
    Object.keys(artist).forEach(key => {
        if (key !== 'profilePhoto') {  // Skiping profilePhoto as it's handled separately
          formData.append(key, artist[key]);
        }
      });

      // Add new photo if it exists
      if (newPhoto) {
        formData.append('profilePhoto', newPhoto);
      }else{
        formData.append('profilePhoto',"if not photo !!")
      }

      console.log(formData.entries());
      console.log('FormData entries:');
      for (let [key, value] of formData.entries()) {
        console.log(key, value);
      }

    console.log( "form : ");
    console.log( formData);
    console.log("artist : ");
    console.log(artist);
    const response = await axios.post('http://localhost:8000/artist/profile', artist, {
        headers: {
          Authorization: `Bearer ${token}`,
          //  'Content-Type': 'multipart/form-data'
         'Content-Type': 'application/x-www-form-urlencoded'
        }
      });
      setArtist(response.data);
      console.log("Set Artist Response data after save : \n");
      console.log(response.data);
      setIsEditing(false);
      // setNewPhoto(null);
      // fetchArtistData()
    } catch (error) {
      setError(error.response?.data?.message || 'An error occurred while updating artist profile');
    }
  };

  const handleChange = (e) => {
    setArtist({ ...artist, [e.target.name]: e.target.value });
    console.log("Change : \n");
    console.log(artist);
  };

  const handlePhotoChange = (e) => {
    if (e.target.files[0]) setNewPhoto(e.target.files[0]);
  };

  if (error) {
    return <div className="p-6 text-red-500">{error}</div>;
  }

//   if (!artist.username) {
//     return <div className="p-6 text-white">Loading...</div>;
//   }

  return (
    <div className="p-4 md:p-6 bg-neutral-800 text-white min-h-screen">
      <div className="max-w-4xl mx-auto bg-neutral-700 rounded-lg shadow-2xl overflow-hidden">
        <div className="relative">
          <div className="h-32 md:h-48 bg-orange-600"></div>
          <img 
            src={isEditing && newPhoto ? URL.createObjectURL(newPhoto) : artist.profilePhoto} 
            alt={artist.username} 
            className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 w-24 h-24 md:w-32 md:h-32 rounded-full border-4 border-neutral-800 shadow-lg"
          />
          {isEditing && (
            <label htmlFor="photo-upload" className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 w-24 h-24 md:w-32 md:h-32 rounded-full bg-black bg-opacity-50 flex items-center justify-center cursor-pointer">
              <FaEdit className="text-white text-xl md:text-2xl" />
              <input
                id="photo-upload"
                type="file"
                accept="image/*"
                onChange={handlePhotoChange}
                className="hidden"
              />
            </label>
          )}
        </div>
        <div className="p-4 md:p-8 pt-20 md:pt-24 text-center"> {/* Increased top padding */}
          <div className="mb-6"> {/* Increased bottom margin */}
            {isEditing ? (
              <div className="flex flex-col items-center">
                <label htmlFor="username" className="text-sm text-gray-300 mb-1">Username</label>
                <input
                  id="username"
                  type="text"
                  name="username"
                  value={artist.username}
                  onChange={handleChange}
                  className="text-2xl md:text-3xl font-bold bg-transparent border-b-2 border-white text-center"
                />
              </div>
            ) : (
              <h1 className="text-2xl md:text-3xl font-bold">{artist.username}</h1>
            )}
            <p className="text-lg md:text-xl text-gray-300 mt-2">{artist.followers} Followers</p>
          </div>
          
          <div className="mb-6"> {/* Increased bottom margin */}
            {isEditing ? (
              <div className="flex flex-col items-center">
                <label htmlFor="genre" className="text-sm text-gray-300 mb-1">Genre</label>
                <input
                  id="genre"
                  type="text"
                  name="genre"
                  value={artist.genre}
                  onChange={handleChange}
                  className="text-lg text-orange-400 bg-transparent border-b-2 border-orange-400 text-center"
                />
              </div>
            ) : (
              <p className="text-lg text-orange-400">{artist.genre}</p>
            )}
          </div>
          
          <div className="mb-8"> {/* Increased bottom margin */}
            {isEditing ? (
              <div className="flex flex-col items-center">
                <label htmlFor="bio" className="text-sm text-gray-300 mb-1">Biography</label>
                <textarea
                  id="bio"
                  name="bio"
                  value={artist.bio}
                  onChange={handleChange}
                  className="w-full h-32 p-2 bg-neutral-600 rounded text-white"
                />
              </div>
            ) : (
              <p>{artist.bio}</p>
            )}
          </div>
          
          <div className="flex justify-center space-x-6 mb-8">
            {['instagram', 'twitter', 'facebook'].map((social) => (
              <div key={social} className="text-center">
                {isEditing ? (
                  <div className="flex flex-col items-center">
                    <label htmlFor={social} className="text-sm text-gray-300 mb-1">{social.charAt(0).toUpperCase() + social.slice(1)}</label>
                    <input
                      id={social}
                      type="text"
                      name={social}
                      value={artist[social]}
                      onChange={handleChange}
                      className="bg-transparent border-b-2 border-white text-center w-full"
                    />
                  </div>
                ) : (
                  <a href={`${artist[social]}`} target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white transition-colors duration-200">
                    {social === 'instagram' && <FaInstagram className="text-3xl" />}
                    {social === 'twitter' && <FaTwitter className="text-3xl" />}
                    {social === 'facebook' && <FaFacebook className="text-3xl" />}
                  </a>
                )}
              </div>
            ))}
          </div>
          {isEditing ? (
            <div className="flex justify-center space-x-4">
              <button onClick={handleSave} className="bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded flex items-center">
                <FaSave className="mr-2" /> Save
              </button>
              <button onClick={handleCancel} className="bg-neutral-600 hover:bg-neutral-500 text-white px-4 py-2 rounded flex items-center">
                <FaTimes className="mr-2" /> Cancel
              </button>
            </div>
          ) : (
            <button onClick={handleEdit} className="bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded flex items-center mx-auto">
              <FaEdit className="mr-2" /> Edit Profile
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ArtistProfile;