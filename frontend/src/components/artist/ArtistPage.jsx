import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { artistContext } from './ArtistLayout';

const ArtistPage = () => {
  const { artist, setArtist } = useContext(artistContext);

  const [error, setError] = useState(null);

  if (error) {
    return <div className="p-6 text-red-500">{error}</div>;
  }

  if (!artist) {
    return <div className="p-6 text-white">Loading...</div>;
  }

  return (
    <div className="p-6 bg-neutral-800 text-white min-h-screen">
      <div className="max-w-7xl mx-auto">
        <header className="bg-neutral-700 border-l-4 border-orange-600 rounded-lg p-6 mb-6">
          <h1 className="text-3xl font-bold">Welcome, {artist.username}</h1>
        </header>

       
      </div>
    </div>
  );
};

export default ArtistPage;