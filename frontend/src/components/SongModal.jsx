import React, { useEffect, useRef } from 'react';

const SongModal = ({ isOpen, onClose, song }) => {
  const modalRef = useRef();

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleOutsideClick);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen || !song) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 px-4">
      <div ref={modalRef} className="bg-gradient-to-br from-orange-400 to-orange-600 rounded-lg p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
        <div className="flex justify-end">
          <button
            onClick={onClose}
            className="text-white hover:text-gray-200 focus:outline-none transition duration-300"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div className="flex flex-col md:flex-row gap-6">
          <div className="md:w-1/2">
            <img
              src={song.coverImage || 'https://sm.mashable.com/t/mashable_in/photo/default/arijit-singh-copy_ddzh.1248.jpg'}
              alt={song.title}
              className="w-full h-64 object-cover rounded-lg shadow-lg"
            />
          </div>
          <div className="md:w-1/2 text-white">
            <h2 className="text-3xl font-bold mb-4">{song.title}</h2>
            <div className="space-y-3">
              <p><span className="font-semibold text-orange-200">Genre:</span> {song.genre}</p>
              <p><span className="font-semibold text-orange-200">Duration:</span> {song.duration} sec</p>
              <p><span className="font-semibold text-orange-200">Release Date:</span> {new Date(song.releaseDate).toLocaleDateString()}</p>
              {song.featuredArtists && <p><span className="font-semibold text-orange-200">Featured Artists:</span> {song.featuredArtists}</p>}
              {song.album && <p><span className="font-semibold text-orange-200">Album:</span> {song.album}</p>}
              {song.songwriters && <p><span className="font-semibold text-orange-200">Songwriters:</span> {song.songwriters}</p>}
              {song.producers && <p><span className="font-semibold text-orange-200">Producers:</span> {song.producers}</p>}
              <p><span className="font-semibold text-orange-200">Explicit:</span> {song.isExplicit ? 'Yes' : 'No'}</p>
            </div>
          </div>
        </div>
        {song.lyrics && (
          <div className="mt-6">
            <h3 className="text-2xl font-bold text-white mb-2">Lyrics</h3>
            <div className="bg-white bg-opacity-10 p-4 rounded-lg text-white whitespace-pre-wrap">
              {song.lyrics}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SongModal;