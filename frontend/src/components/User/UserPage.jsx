import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { FaHeart, FaPlus, FaUserPlus } from 'react-icons/fa';
import { userContext } from './UserLayout';

const UserPage = () => {
  const {user} = useContext(userContext)
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState({ songs: [], artists: [] });
  const [likedSongs, setLikedSongs] = useState(user?.likedSongs || []);
  const [followedArtists, setFollowedArtists] = useState(user?.artistsFollowed || []);
  const token = localStorage.getItem("token")


  useEffect(()=>{
    setLikedSongs(user?.likedSongs || []);
    setFollowedArtists(user?.artistsFollowed || []); 
    console.log(likedSongs);
    
  },[user])

  // Handle input change and fetch search suggestions
  const handleSearchChange = async (e) => {

    const value = e.target.value;
    setSearchTerm(value);

    if (value.trim()) {
      try {
        const response = await axios.get(`http://localhost:8000/user/search?q=${value}`,{
          headers: {
            'Authorization': `Bearer ${token}`,
           
          }
        } );
        setSearchResults(response.data);
      } catch (error) {
        console.error('Error fetching search results:', error);
      }
    } else {
      setSearchResults({ songs: [], artists: [] });
    }
  };

  // Handle liking a song
  const handleLikeSong = async (songId) => {
    const userId = user._id
    
    if (likedSongs.includes(songId)) {
      // If song is already liked, send DELETE request
      try {
        console.log(token);
        
        const responseDel = await axios.delete(`http://localhost:8000/user/${userId}/like-song/${songId}`,{
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (responseDel.status === 200) {
          setLikedSongs((prev) => prev.filter((id) => id !== songId)); // Remove from liked songs
        } else {
          window.alert('Error removing song from liked songs');
        }
      } catch (error) {
        window.alert('Error removing song from liked songs');
        console.error('Error removing song from liked songs', error);
      }
    } else {
      // If song is not liked, send POST request
      try {
        
        const responseAdd = await axios.post(`http://localhost:8000/user/${userId}/like-song/${songId}`,{},  {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        } );
        if (responseAdd.status === 200) {
          setLikedSongs((prev) => [...prev, songId]); // Add to liked songs
        } else {
          window.alert('Error adding song to liked songs');
        }
      } catch (error) {
        window.alert('Error adding song to liked songs');
        console.error('Error adding song to liked songs', error);
      }
    }
  };

  // Handle following an artist
const handleFollowArtist = async (artistId) => {
  const userId = user._id;
  console.log(token);
  

  if (followedArtists.includes(artistId)) {
    // If artist is already followed, send DELETE request
    try {
      const responseDel = await axios.delete(`http://localhost:8000/user/${userId}/follow-artist/${artistId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (responseDel.status === 200) {
        setFollowedArtists((prev) => prev.filter((id) => id !== artistId)); // Remove from followed artists
      } else {
        window.alert('Error unfollowing artist');
      }
    } catch (error) {
      window.alert('Error unfollowing artist');
      console.error('Error unfollowing artist', error);
    }
  } else {
    // If artist is not followed, send POST request
    try {
      const responseAdd = await axios.post(`http://localhost:8000/user/${userId}/follow-artist/${artistId}`, {}, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (responseAdd.status === 200) {
        setFollowedArtists((prev) => [...prev, artistId]); // Add to followed artists
      } else {
        window.alert('Error following artist');
      }
    } catch (error) {
      window.alert('Error following artist');
      console.error('Error following artist', error);
    }
  }
};


  return (
    <div className="p-6 bg-neutral-800 text-white min-h-screen">
      <div className="max-w-7xl mx-auto">
        <header className="bg-neutral-700 p-6 mb-6 rounded-lg">
          <input
            type="text"
            placeholder="Search for songs or artists..."
            value={searchTerm}
            onChange={handleSearchChange}
            className="w-full p-2 rounded-md bg-neutral-600 text-white"
          />
        </header>

        {/* Display search results for songs */}
        <div className="mb-16">
          <h2 className="text-xl font-semibold mb-4 border-b-2 border-orange-600 pb-2">Songs</h2>
          <div className="space-y-4">
            {searchResults.songs.map((song) => (
              <div key={song._id} className="flex items-center justify-between bg-neutral-700 p-4 rounded-lg">
                <div className="flex items-center">
                  <img src={song.coverImage} alt={song.title} className="border-2 border-white w-12 h-12 rounded-full mr-4" />
                  <div>
                    <p className="font-medium">{song.title}</p>
                    <p className="text-sm text-gray-300">{song.artist?.name}</p>
                  </div>
                </div>
                <div className="flex space-x-4">
                  <button
                    className={`p-2 rounded-full ${likedSongs.includes(song._id) ? 'text-red-600' : 'text-white'}`}
                    onClick={() => handleLikeSong(song._id)}
                  >
                    <FaHeart />
                  </button>
                  <button className="p-2 rounded-full text-white">
                    <FaPlus />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Display search results for artists */}
        <div>
          <h2 className="text-xl font-semibold mb-4 border-b-2 border-orange-600 pb-2 ">Artists</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {searchResults.artists.map((artist) => (
              <div key={artist._id} className="bg-neutral-700 p-4 rounded-lg flex flex-col items-center">
                <img src={artist.profilePicture} alt={artist.username} className="w-20 h-20 border-2 border-white rounded-full mb-4" />
                <p className="font-medium">{artist.username}</p>
                <button
                  className={`mt-4 px-4 py-2 rounded-lg ${
                    followedArtists.includes(artist._id) ? 'bg-gray-500' : 'bg-orange-600'
                  }`}
                  onClick={() => handleFollowArtist(artist._id)}
                >
                  {followedArtists.includes(artist._id) ? 'Following' : 'Follow'}
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserPage;
