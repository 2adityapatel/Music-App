import React, { useContext } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { FaHome, FaUser, FaMusic, FaStream, FaHeart, FaSignOutAlt } from 'react-icons/fa';
import profile from '../../assets/profile-pictures/default.png';
import { userContext } from './UserLayout';
import { toast } from 'react-toastify';

const UserSidebar = () => {
  const {user, setUser } = useContext(userContext);
  const navigate = useNavigate();

  const handleLogOut = () => {
    localStorage.removeItem('token');
   
    setUser({});
    navigate('/login');
    toast.success('You have been logged out successfully');
  };

  return (
    <div className="bg-neutral-800 border-r-2 border-neutral-400 text-white w-64 space-y-6 py-7 px-2 fixed inset-y-0 left-0 transform -translate-x-full md:translate-x-0 transition duration-200 ease-in-out">
      <div className="flex items-center space-x-2 px-4 pb-4 border-b border-gray-600">
        <img
          src={profile}
          alt="logo"
          className="h-10 w-10 rounded-full"
        />
        <span className="text-2xl font-extrabold">Hii, {user.username}</span>
      </div>

      <nav>
        <NavLink
          to="/user/home"
          className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700 hover:text-white"
          activeClassName="bg-gray-700 text-white"
        >
          <FaHome className="inline-block mr-2" />
          Home
        </NavLink>
        <NavLink
          to="/user/profile"
          className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700 hover:text-white"
          activeClassName="bg-gray-700 text-white"
        >
          <FaUser className="inline-block mr-2" />
          Profile
        </NavLink>
        <NavLink
          to="/user/streams"
          className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700 hover:text-white"
          activeClassName="bg-gray-700 text-white"
        >
          <FaStream className="inline-block mr-2" />
          Streams
        </NavLink>
        <NavLink
          to="/user/playlist"
          className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700 hover:text-white"
          activeClassName="bg-gray-700 text-white"
        >
          <FaMusic className="inline-block mr-2" />
          Playlist
        </NavLink>
        <NavLink
          to="/user/liked-songs"
          className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700 hover:text-white"
          activeClassName="bg-gray-700 text-white"
        >
          <FaHeart className="inline-block mr-2" />
          Liked Songs
        </NavLink>
        <button
          onClick={handleLogOut}
          className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700 hover:text-white"
        >
          <FaSignOutAlt className="inline-block mr-2" />
          Sign Out
        </button>
      </nav>
    </div>
  );
};

export default UserSidebar;
