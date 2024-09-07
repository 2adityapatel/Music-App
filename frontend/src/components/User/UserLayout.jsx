import React, { createContext, useEffect,useState } from 'react';
import axios from 'axios'
import { Outlet } from 'react-router-dom';
import Header from '../Header';
import UserSidebar from './UserSidebar';

const userContext = createContext();

function UserLayout() {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [user, setUser] = useState({});
  const [error,setError] = useState("")


  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem('token');
      try {
        const response = await axios.get('http://localhost:8000/user', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log(response.data);
        setUser(response.data);

      } catch (error) {
        setError(error.response?.data?.message || 'An error occurred');
      }
    };

    fetchUserData();
  }, [setUser]);

  if (error) {
    return <div className="p-6 text-red-500">{error}</div>;
  }




  return (
    <userContext.Provider value={{ user, setUser }}>
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
            <UserSidebar />
          </div>

          {/* Main Content */}
          <div className="ml-0 md:ml-64 flex-1 overflow-y-auto">
            <Outlet />
          </div>
        </div>
      </div>
    </userContext.Provider>
  );
}

export default UserLayout;
export {userContext};
