import React, { useState, useContext } from 'react';
import { artistContext } from './ArtistLayout';
import axios from 'axios';
import { FaUpload, FaMusic } from 'react-icons/fa';

const AddSongPage = () => {
  const { artist } = useContext(artistContext);
  const [songData, setSongData] = useState({
    title: '',
    genre: '',
    duration: '',
    releaseDate: '',
    audioFile: null,
    coverImage: null,
    lyrics: '',
    featuredArtists: '',
    isExplicit: false,
    songwriters: '',
    producers: '',
    album: '',
  });
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setSongData(prevData => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setSongData(prevData => ({
      ...prevData,
      [name]: files[0]
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);

    try {
      const token = localStorage.getItem('token');
      await axios.post('http://localhost:8000/artist/add-song', songData, {
        headers: {
          'Authorization': `Bearer ${token}`,
         
        }
      });
      setSuccess(true);
      setSongData({
        title: '',
        genre: '',
        duration: '',
        releaseDate: '',
        audioFile: null,
        coverImage: null,
        lyrics: '',
        featuredArtists: '',
        isExplicit: false,
        songwriters: '',
        producers: '',
        album: '',
      });
    } catch (err) {
      setError(err.response?.data?.message || 'An error occurred while adding the song');
    }
  };

  return (
    <div className="p-6 m-6 mt-6  bg-neutral-800 text-white min-h-screen">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Add New Song</h1>
        {error && <div className="bg-red-500 text-white p-3 rounded mb-4">{error}</div>}
        {success && <div className="bg-green-500 text-white p-3 rounded mb-4">Song added successfully!</div>}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="title" className="block mb-2">Title *</label>
            <input
              type="text"
              id="title"
              name="title"
              value={songData.title}
              onChange={handleInputChange}
              required
              className="w-full px-3 py-2 bg-neutral-700 rounded focus:outline-none focus:ring-2 focus:ring-orange-600"
            />
          </div>
          <div>
            <label htmlFor="genre" className="block mb-2">Genre *</label>
            <input
              type="text"
              id="genre"
              name="genre"
              value={songData.genre}
              onChange={handleInputChange}
              required
              className="w-full px-3 py-2 bg-neutral-700 rounded focus:outline-none focus:ring-2 focus:ring-orange-600"
            />
          </div>
          <div>
            <label htmlFor="duration" className="block mb-2">Duration (in seconds) *</label>
            <input
              type="number"
              id="duration"
              name="duration"
              value={songData.duration}
              onChange={handleInputChange}
              required
              className="w-full px-3 py-2 bg-neutral-700 rounded focus:outline-none focus:ring-2 focus:ring-orange-600"
            />
          </div>
          <div>
            <label htmlFor="releaseDate" className="block mb-2">Release Date *</label>
            <input
              type="date"
              id="releaseDate"
              name="releaseDate"
              value={songData.releaseDate}
              onChange={handleInputChange}
              required
              className="w-full px-3 py-2 bg-neutral-700 rounded focus:outline-none focus:ring-2 focus:ring-orange-600"
            />
          </div>
          {/* <div>
            <label htmlFor="audioFile" className="block mb-2">Audio File (MP3) *</label>
            <div className="flex items-center space-x-2">
              <label className="w-full flex items-center px-3 py-2 bg-neutral-700 rounded cursor-pointer hover:bg-neutral-600 transition-colors duration-200">
                <FaMusic className="mr-2" />
                <span>{songData.audioFile ? songData.audioFile.name : 'Choose file'}</span>
                <input
                  type="file"
                  id="audioFile"
                  name="audioFile"
                  accept=".mp3"
                  onChange={handleFileChange}
                  required
                  className="hidden"
                />
              </label>
            </div> 
          </div> */}
          <div>
            <label htmlFor="coverImage" className="block mb-2">Cover Image</label>
            <div className="flex items-center space-x-2">
              <label className="w-full flex items-center px-3 py-2 bg-neutral-700 rounded cursor-pointer hover:bg-neutral-600 transition-colors duration-200">
                <FaUpload className="mr-2" />
                <span>{songData.coverImage ? songData.coverImage.name : 'Choose file'}</span>
                <input
                  type="file"
                  id="coverImage"
                  name="coverImage"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="hidden"
                />
              </label>
            </div>
          </div>
          <div>
            <label htmlFor="lyrics" className="block mb-2">Lyrics</label>
            <textarea
              id="lyrics"
              name="lyrics"
              value={songData.lyrics}
              onChange={handleInputChange}
              rows="4"
              className="w-full px-3 py-2 bg-neutral-700 rounded focus:outline-none focus:ring-2 focus:ring-orange-600"
            ></textarea>
          </div>
          <div>
            <label htmlFor="featuredArtists" className="block mb-2">Featured Artists (comma-separated)</label>
            <input
              type="text"
              id="featuredArtists"
              name="featuredArtists"
              value={songData.featuredArtists}
              onChange={handleInputChange}
              className="w-full px-3 py-2 bg-neutral-700 rounded focus:outline-none focus:ring-2 focus:ring-orange-600"
            />
          </div>
          <div className="flex items-center">
            <input
              type="checkbox"
              id="isExplicit"
              name="isExplicit"
              checked={songData.isExplicit}
              onChange={handleInputChange}
              className="mr-2"
            />
            <label htmlFor="isExplicit">Explicit Content</label>
          </div>
          <div>
            <label htmlFor="songwriters" className="block mb-2">Songwriters (comma-separated)</label>
            <input
              type="text"
              id="songwriters"
              name="songwriters"
              value={songData.songwriters}
              onChange={handleInputChange}
              className="w-full px-3 py-2 bg-neutral-700 rounded focus:outline-none focus:ring-2 focus:ring-orange-600"
            />
          </div>
          <div>
            <label htmlFor="producers" className="block mb-2">Producers (comma-separated)</label>
            <input
              type="text"
              id="producers"
              name="producers"
              value={songData.producers}
              onChange={handleInputChange}
              className="w-full px-3 py-2 bg-neutral-700 rounded focus:outline-none focus:ring-2 focus:ring-orange-600"
            />
          </div>
          <div>
            <label htmlFor="album" className="block mb-2">Album</label>
            <input
              type="text"
              id="album"
              name="album"
              value={songData.album}
              onChange={handleInputChange}
              className="w-full px-3 py-2 bg-neutral-700 rounded focus:outline-none focus:ring-2 focus:ring-orange-600"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-orange-600 text-white py-2 px-4 rounded hover:bg-orange-700 transition-colors duration-200"
          >
            Add Song
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddSongPage;