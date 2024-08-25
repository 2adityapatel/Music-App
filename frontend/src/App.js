import "./App.css";
import "./index.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Link } from "react-router-dom";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Layout from "./components/User/UserLayout";
import Sample from "./components/Sample";
import UserPage from "./components/User/UserPage";
import ProtectedRoute from "./components/ProtectedRoute";
import LandingPage from "./components/LandingPage";
import ArtistLayout from "./components/artist/ArtistLayout";
import UserLayout from "./components/User/UserLayout";
import ArtistPage from "./components/artist/ArtistPage";
import UserProfile from "./components/User/UserProfile";


function App() {
  return (
    <>
      
      <Router>
        
        <Routes>

          <Route path="/" element={<LandingPage/>} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup/>} />
          <Route path="/user" element={<UserLayout/>} >
            <Route path="" element={
              <ProtectedRoute requiredRole="USER">
                <UserPage/>
              </ProtectedRoute>
              }/>
              <Route path="profile" element={
              <ProtectedRoute requiredRole="USER">
                <UserProfile/>
              </ProtectedRoute>
              }/>
          </Route>
          <Route path="/artist" element={<ArtistLayout/>} >
            <Route path="" element={
              <ProtectedRoute requiredRole="ARTIST">
                <ArtistPage/>
              </ProtectedRoute>
              }/>
          </Route>
          
          {/* <Route path="*" element={<Nopage />} /> */}
        </Routes>
      </Router>
    </>
  );
}

export default App;
