import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useContext } from 'react';
import { artistContext } from './ArtistLayout';

const AlbumPage = () => {
  const [songs, setSongs] = useState([]);
  const { artist } = useContext(artistContext)

  useEffect(() => {
    const token = localStorage.getItem("token")
    
    // Fetch songs for the given artist
    const fetchSongs = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/artist/songs/${artist._id}`,{
            headers: {
              'Authorization': `Bearer ${token}`,
             
            }
          } );
        setSongs(response.data);
        console.log(response.data);
        console.log(songs);
        
        
      } catch (error) {
        console.error('Error fetching songs', error);
      }
    };

    fetchSongs();
  }, [artist]);

  return (
    <div className="album-page container mx-auto px-4 mt-6 ">
      <h1 className="text-4xl font-bold text-center mb-8">Album Songs</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {songs.map((song) => (
          <div key={song._id} className="card bg-white shadow-md rounded-lg overflow-hidden">
            <img
              src={song.coverImage || 'https://sm.mashable.com/t/mashable_in/photo/default/arijit-singh-copy_ddzh.1248.jpg'}
              alt={song.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h2 className="text-lg text-gray-900 font-semibold mb-2">{song.title}</h2>
              <p className="text-gray-600">Genre: {song.genre}</p>
              <p className="text-gray-600">Duration: {song.duration} sec</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AlbumPage;
