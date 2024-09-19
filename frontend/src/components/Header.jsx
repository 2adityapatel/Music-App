import React, { useContext } from 'react';
import profile from '../assets/profile-pictures/default.png'
import logo from "../assets/logo.png"

function Header({ toggleSidebar }) {

  return (
    <header className="flex items-center justify-between p-4 bg-neutral-800 text-white md:px-6 border-b-2 border-orange-600">
      <button
        className="md:hidden text-white focus:outline-none"
        onClick={toggleSidebar}
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M4 6h16M4 12h16M4 18h16"
          ></path>
        </svg>
      </button>
      <img src={logo} className="h-10 w-10 object-cover" />
      <div>
        <img
          src={profile}
          alt="Profile"
          className="w-10 h-10 rounded-full"
        />
      </div>
    </header>
  );
}

export default Header;
