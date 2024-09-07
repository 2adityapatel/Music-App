import React, { createContext, useEffect,useState } from 'react';
import { Outlet } from 'react-router-dom';
import axios from 'axios';
import Header from '../Header';
import ArtistSidebar from './ArtistSidebar';

const artistContext = createContext();

function ArtistLayout() {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [artist, setArtist] = useState({});
  
  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem('token');
      try {
        const response = await axios.get('http://localhost:8000/artist', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        
        setArtist(response.data);
        console.log(response.data);
       
      } catch (error) {
        console.log(error.response?.data?.message || 'An error occurred');
      }
    };

    fetchUserData();
  }, []);

  return (
    <artistContext.Provider value={{ artist, setArtist }}>
      <div className="h-screen flex flex-col">
        {/* Navbar */}
        <div className="fixed top-0 left-0 w-full z-50">
          <Header toggleSidebar={() => setSidebarOpen(!isSidebarOpen)} />
        </div>

        <div className="flex flex-1 pt-16">
          {/* Sidebar */}
          <div
            className={`fixed top-16 left-0 h-full w-64 z-40 transform transition-transform duration-200 ease-in-out ${
              isSidebarOpen ? 'translate-x-0' : 'translate-x-full'
            } md:translate-x-0`}
            style={{ zIndex: '45' }} // Ensuring the sidebar is on top of other elements except the navbar
          >
            <ArtistSidebar/>
          </div>

          {/* Main Content */}
          <div className="ml-0 md:ml-64 flex-1 overflow-y-auto">
            <Outlet />
          </div>
        </div>
      </div>
    </artistContext.Provider>
  );
}

export default ArtistLayout;
export {artistContext};
