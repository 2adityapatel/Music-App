import React, { createContext, useState } from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../Header';
import UserSidebar from './UserSidebar';

const userContext = createContext();

function UserLayout() {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [userData, setUserData] = useState({});
  const [name, setName] = useState("");

  return (
    <userContext.Provider value={{ name, setName, setUserData }}>
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
