import React, { useContext } from 'react';
import profile from '../../assets/profile-pictures/default.png'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { artistContext } from './ArtistLayout';

const ArtistSidebar = () => {

    const { artistName, setArtistName,setArtistData} = useContext(artistContext);
  const navigate = useNavigate()

  const handleLogOut = () => {

    localStorage.removeItem('token');
    
    setArtistName('')
    setArtistData({})

    navigate('/login')
    toast.success('You have been logged out successfully');
  }

  return (
    <div className="bg-neutral-800 border-r-2 border-neutral-400  text-white w-64 space-y-6 py-7 px-2 fixed inset-y-0 left-0 transform -translate-x-full md:translate-x-0 transition duration-200 ease-in-out">
      <div className="flex items-center space-x-2 px-4 pb-4 border-b border-gray-600 ">
        <img
          src={profile}
          alt="logo"
          className="h-10 w-10 rounded-full"
        />
        <span className="text-2xl font-extrabold">{artistName} </span>
      </div>
      
      <nav>
        <a
          href="#"
          className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700 hover:text-white"
        >
          Dashboard
        </a>
        <a
          href="#"
          className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700 hover:text-white"
        >
          Settings
        </a>
        <a
          href="#"
          className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700 hover:text-white"
        >
          Profile
        </a>
        <button
          onClick={()=>{handleLogOut()}}
          className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700 hover:text-white"
        >
          Sign Out
        </button>
      </nav>
    </div>
  );
};

export default ArtistSidebar;
