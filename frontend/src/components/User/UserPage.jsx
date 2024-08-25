import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { userContext } from './UserLayout';
import { FaCalendarAlt, FaMusic, FaBell } from 'react-icons/fa';

const UserPage = () => {
  const { name, setName } = useContext(userContext);
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState(null);
  const [upcomingEvents, setUpcomingEvents] = useState([]);
  const [recommendedArtists, setRecommendedArtists] = useState([]);
  const [recentActivity, setRecentActivity] = useState([]);

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem('token');
      try {
        const response = await axios.get('http://localhost:8000/user', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        // setName(response.data.user.fullName);
        setUserData(response.data);

        // Fetch additional data (replace with actual API calls)
        setUpcomingEvents([
          { id: 1, artist: 'The Weeknd', date: '2024-08-25', time: '20:00', image: 'https://example.com/weeknd.jpg' },
          { id: 2, artist: 'Dua Lipa', date: '2024-08-27', time: '21:00', image: 'https://example.com/dualipa.jpg' },
        ]);
        setRecommendedArtists([
          { id: 1, name: 'Billie Eilish', genre: 'Pop', image: 'https://example.com/billieeilish.jpg' },
          { id: 2, name: 'Kendrick Lamar', genre: 'Hip Hop', image: 'https://example.com/kendricklamar.jpg' },
        ]);
        setRecentActivity([
          { id: 1, type: 'New Song', artist: 'Taylor Swift', content: 'Released a new single "Midnight Rain"', image: 'https://example.com/taylorswift.jpg' },
          { id: 2, type: 'Upcoming Event', artist: 'Ed Sheeran', content: 'Announced a new concert in New York', image: 'https://example.com/edsheeran.jpg' },
        ]);
      } catch (error) {
        setError(error.response?.data?.message || 'An error occurred');
      }
    };

    fetchUserData();
  }, [setName]);

  if (error) {
    return <div className="p-6 text-red-500">{error}</div>;
  }

  if (!userData) {
    return <div className="p-6 text-white">Loading...</div>;
  }

  return (
    <div className="p-6 bg-neutral-800 text-white min-h-screen">
      <div className="max-w-7xl mx-auto">
        <header className="bg-neutral-700 border-l-4 border-orange-600 rounded-lg p-6 mb-6">
          <h1 className="text-3xl font-bold">Welcome, {name}</h1>
          <p className="text-gray-300 mt-2">{userData.message}</p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-neutral-700 p-6 rounded-lg border-t-4 border-orange-600">
            <h2 className="text-xl font-semibold mb-4 flex items-center">
              <FaCalendarAlt className="mr-2 text-orange-600" />
              Upcoming Live Events
            </h2>
            <ul>
              {upcomingEvents.map(event => (
                <li key={event.id} className="mb-4 flex items-center">
                  <img src={event.image} alt={event.artist} className="w-12 h-12 rounded-full mr-4" />
                  <div>
                    <p className="font-medium">{event.artist}</p>
                    <p className="text-sm text-gray-300">{event.date} at {event.time}</p>
                  </div>
                  <button className="ml-auto bg-orange-600 text-white px-3 py-1 rounded text-sm hover:bg-orange-700 transition duration-300">
                    Set Reminder
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-neutral-700 p-6 rounded-lg border-t-4 border-orange-600">
            <h2 className="text-xl font-semibold mb-4 flex items-center">
              <FaMusic className="mr-2 text-orange-600" />
              Recommended Artists
            </h2>
            <ul>
              {recommendedArtists.map(artist => (
                <li key={artist.id} className="mb-4 flex items-center">
                  <img src={artist.image} alt={artist.name} className="w-12 h-12 rounded-full mr-4" />
                  <div>
                    <p className="font-medium">{artist.name}</p>
                    <p className="text-sm text-gray-300">{artist.genre}</p>
                  </div>
                  <button className="ml-auto bg-orange-600 text-white px-3 py-1 rounded text-sm hover:bg-orange-700 transition duration-300">
                    Follow
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-neutral-700 p-6 rounded-lg border-t-4 border-orange-600 md:col-span-2 lg:col-span-1">
            <h2 className="text-xl font-semibold mb-4 flex items-center">
              <FaBell className="mr-2 text-orange-600" />
              Recent Activity
            </h2>
            <ul>
              {recentActivity.map(activity => (
                <li key={activity.id} className="mb-4 flex items-start">
                  <img src={activity.image} alt={activity.artist} className="w-10 h-10 rounded-full mr-3" />
                  <div>
                    <p className="font-medium">{activity.artist}</p>
                    <p className="text-sm text-gray-300">{activity.content}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserPage;