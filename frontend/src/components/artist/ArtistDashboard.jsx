import React from 'react';
import { Music, Calendar, TrendingUp, TrendingDown, Minus, Edit } from 'lucide-react';
import { dashboardData } from './dashboardData';
const ArtistDashboard = () => {
  const { artist, recentReleases, topSongs, upcomingEvents, drafts } = dashboardData;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-orange-100 p-8">
      <header className="mb-12 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <img src={"https://img.freepik.com/free-photo/caucasian-female-singer-portrait-isolated-blue-studio-background-neon-light-beautiful-female-model-bright-dress-with-microphone-concept-human-emotions-facial-expression-ad-music-art_155003-30901.jpg"} alt={artist.name} className="w-24 h-24 rounded-full border-4 border-orange-500" />
          <div>
            <h1 className="text-4xl font-bold text-white">{artist.name}</h1>
            <p className="text-xl text-orange-400">{artist.genre}</p>
          </div>
        </div>
        <div className="text-right">
          <p className="text-3xl font-semibold text-white">{artist.monthlyListeners.toLocaleString()}</p>
          <p className="text-orange-400">Monthly Listeners</p>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <section className="col-span-1 md:col-span-2 lg:col-span-3">
          <h2 className="text-2xl font-semibold mb-4 text-white">Recent Releases</h2>
          <div className="flex space-x-6 overflow-x-auto pb-4">
            {recentReleases.map(release => (
              <div key={release.id} className="flex-shrink-0 w-64 bg-gradient-to-b from-gray-800 to-gray-900 rounded-lg overflow-hidden shadow-lg transform hover:scale-105 transition-transform duration-200">
                <img src={release.coverArt} alt={release.title} className="w-full h-64 object-cover" />
                <div className="p-4">
                  <h3 className="text-xl font-semibold text-white">{release.title}</h3>
                  <p className="text-orange-400">{release.type}</p>
                  <p className="text-sm text-orange-500">{new Date(release.releaseDate).toLocaleDateString()}</p>
                  <p className="mt-2 text-white">{release.streams.toLocaleString()} streams</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4 text-white">Top Songs</h2>
          <div className="bg-gradient-to-b from-gray-800 to-gray-900 rounded-lg p-4">
            {topSongs.map(song => (
              <div key={song.id} className="flex items-center justify-between mb-4 last:mb-0">
                <div>
                  <h3 className="text-lg font-semibold text-white">{song.title}</h3>
                  <p className="text-orange-400">{song.streams.toLocaleString()} streams</p>
                </div>
                {song.trend === 'up' && <TrendingUp className="text-green-400" />}
                {song.trend === 'down' && <TrendingDown className="text-red-400" />}
                {song.trend === 'stable' && <Minus className="text-yellow-400" />}
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4 text-white">Upcoming Events</h2>
          <div className="space-y-4">
            {upcomingEvents.map(event => (
              <div key={event.id} className="bg-gradient-to-b from-gray-800 to-gray-900 rounded-lg p-4">
                <h3 className="text-xl font-semibold text-white">{event.name}</h3>
                <p className="text-orange-400">{new Date(event.date).toLocaleDateString()}</p>
                <p className="text-orange-500">{event.venue}</p>
                <div className="mt-2 bg-gray-700 rounded-full h-2">
                  <div 
                    className="bg-orange-400 h-2 rounded-full" 
                    style={{width: `${(event.ticketsSold / event.capacity) * 100}%`}}
                  ></div>
                </div>
                <p className="text-sm text-orange-400 mt-1">
                  {event.ticketsSold.toLocaleString()} / {event.capacity.toLocaleString()} tickets sold
                </p>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4 text-white">Song Drafts</h2>
          <div className="space-y-4">
            {drafts.map(draft => (
              <div key={draft.id} className="bg-gradient-to-b from-gray-800 to-gray-900 rounded-lg p-4 flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-white">{draft.title}</h3>
                  <p className="text-sm text-orange-400">Last edited: {new Date(draft.lastEdited).toLocaleDateString()}</p>
                </div>
                <div className="flex items-center">
                  <span className={`px-2 py-1 rounded text-xs ${
                    draft.status === 'In Progress' ? 'bg-yellow-600 text-yellow-100' :
                    draft.status === 'Review' ? 'bg-blue-600 text-blue-100' :
                    'bg-green-600 text-green-100'
                  }`}>
                    {draft.status}
                  </span>
                  <Edit className="ml-2 text-orange-400" />
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default ArtistDashboard;