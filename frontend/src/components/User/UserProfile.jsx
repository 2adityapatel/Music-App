import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { FaUser, FaUserFriends, FaEdit } from 'react-icons/fa';
import { userContext } from './UserLayout';

const UserProfile = () => {
  
  const [isEditing, setIsEditing] = useState(false);
  const [newUsername, setNewUsername] = useState('');
  const [newPhoto, setNewPhoto] = useState(null);
  const {user , setUser} = useContext(userContext)

  useEffect(()=>{
    setUser(user)
    },[setUser])

  
  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setNewUsername(user.username);
    
    setNewPhoto(null);
  };

  const handleSave = async () => {

    try {
        const token = localStorage.getItem('token')
      const updatedProfile = {
        username: newUsername,
        profilePhoto: newPhoto ? await convertToBase64(newPhoto) : user.profilePhoto,
        numberOfArtistsFollowed: user.numberOfArtistsFollowed
      };

      const response = await axios.post('http://localhost:8000/user/profile', updatedProfile,{
        headers : {
            Authorization : `Bearer ${token}`,
            
        }
      });

      setUser(response.data);
    
      setIsEditing(false);
    
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  const handlePhotoChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setNewPhoto(e.target.files[0]);
    }
  };

  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };

  return (
    <div className="bg-neutral-700 p-6 m-6 rounded-lg border-t-4 border-orange-600">
      <h2 className="text-xl font-semibold mb-4 flex items-center">
        <FaUser className="mr-2 text-orange-600" />
        User Profile
      </h2>
      <div className="flex flex-col items-center">
        <div className="relative mb-4">
          <img
            src={isEditing && newPhoto ? URL.createObjectURL(newPhoto) : user.profilePhoto}
            alt="Profile"
            className="w-32 h-32 rounded-full object-cover"
          />
          {isEditing && (
            <label htmlFor="photo-upload" className="absolute bottom-0 right-0 bg-orange-600 rounded-full p-2 cursor-pointer">
              <FaEdit className="text-white" />
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
        {isEditing ? (
          <input
            type="text"
            value={newUsername}
            onChange={(e) => setNewUsername(e.target.value)}
            className="bg-neutral-600 text-white px-3 py-2 rounded mb-2"
          />
        ) : (
          <h3 className="text-2xl font-bold mb-2">{user.username}</h3>
        )}
        <div className="flex items-center mb-4">
          <FaUserFriends className="mr-2 text-orange-600" />
          <span>{user.numberOfArtistsFollowed} Following</span>
        </div>
        {isEditing ? (
          <div>
            <button
              onClick={handleSave}
              className="bg-orange-600 text-white px-4 py-2 rounded mr-2 hover:bg-orange-700 transition duration-300"
            >
              Save
            </button>
            <button
              onClick={handleCancel}
              className="bg-neutral-600 text-white px-4 py-2 rounded hover:bg-neutral-500 transition duration-300"
            >
              Cancel
            </button>
          </div>
        ) : (
          <button
            onClick={handleEdit}
            className="bg-orange-600 text-white px-4 py-2 rounded hover:bg-orange-700 transition duration-300"
          >
            Edit Profile
          </button>
        )}
      </div>
    </div>
  );
};

export default UserProfile;

