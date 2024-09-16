import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useContext } from 'react';
import { artistContext } from './ArtistLayout';
import SongModal from '../SongModal';


const AlbumPage = () => {
  const [songs, setSongs] = useState([]);
  const { artist } = useContext(artistContext);
  const [selectedSong, setSelectedSong] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    
    const fetchSongs = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/artist/songs/${artist._id}`, {
          headers: {
            'Authorization': `Bearer ${token}`,
          }
        });
        setSongs(response.data);
      } catch (error) {
        console.error('Error fetching songs', error);
      }
    };

    fetchSongs();
  }, [artist]);

  const handleSongClick = (song) => {
    setSelectedSong(song);
    setIsModalOpen(true);
  };

  return (
    <div className="album-page container mx-auto px-4 mt-6">
      <h1 className="text-4xl font-bold text-center mb-8 text-white">Album Songs</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {songs.map((song) => (
          <div
            key={song._id}
            className="card bg-gradient-to-br from-orange-400 to-orange-600 shadow-lg rounded-lg overflow-hidden transform transition duration-300 hover:scale-105 cursor-pointer"
            onClick={() => handleSongClick(song)}
          >
            <div className="relative">
              <img
                src={song.coverImage || 'https://sm.mashable.com/t/mashable_in/photo/default/arijit-singh-copy_ddzh.1248.jpg'}
                alt={song.title}
                className="w-full h-48 object-cover"
              />
              <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300">
                <span className="text-white text-lg font-semibold">View Details</span>
              </div>
            </div>
            <div className="p-4 text-white">
              <h2 className="text-xl font-bold mb-2">{song.title}</h2>
              <p className="text-orange-100">Genre: {song.genre}</p>
              <p className="text-orange-100">Duration: {song.duration} sec</p>
            </div>
          </div>
        ))}
      </div>

      <SongModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        song={selectedSong}
      />
    </div>
  );
};

export default AlbumPage;