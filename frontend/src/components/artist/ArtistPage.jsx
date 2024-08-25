import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { artistContext } from './ArtistLayout';

const ArtistPage = () => {
  const { artistName, setArtistName } = useContext(artistContext);
  const [artistData, setArtistData] = useState(null);
  const [error, setError] = useState(null);


  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem('token');
      try {
        const response = await axios.get('http://localhost:8000/artist', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        // setArtistName(response.data.user.fullName);
        setArtistData(response.data);
       
      } catch (error) {
        setError(error.response?.data?.message || 'An error occurred');
      }
    };

    fetchUserData();
  }, [setArtistName]);

  if (error) {
    return <div className="p-6 text-red-500">{error}</div>;
  }

  if (!artistData) {
    return <div className="p-6 text-white">Loading...</div>;
  }

  return (
    <div className="p-6 bg-neutral-800 text-white min-h-screen">
      <div className="max-w-7xl mx-auto">
        <header className="bg-neutral-700 border-l-4 border-orange-600 rounded-lg p-6 mb-6">
          <h1 className="text-3xl font-bold">Welcome, {artistName}</h1>
          <p className="text-gray-300 mt-2">{artistData.message}</p>
        </header>

       
      </div>
    </div>
  );
};

export default ArtistPage;