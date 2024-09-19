import { useEffect, useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function RecommendPage() {
  const [song, setSong] = useState('');
  const [recommendations, setRecommendations] = useState([]);
  const [posters, setPosters] = useState([]);

  
  const handleInputChange = (e) => {
    setSong(e.target.value);
  };

  const fetchRecommendations = () => {
    axios.post('http://127.0.0.1:8000/api/recommend/', { song })
      .then(response => {
        if (response.data.error) {
            toast.error(response.data.error); 
            setSong("")
        } else {
          setRecommendations(response.data.recommended_music_names);
          setPosters(response.data.recommended_music_posters);
          toast.success("Recommendations fetched successfully!");
        }
      })
      .catch(error => {
        console.error("There was an error fetching recommendations!", error);
        toast.error("Failed to recommend! ");
      });
  };

  return (
    <div className="min-h-screen bg-neutral-900 text-white p-10">
      <h1 className="text-3xl font-semibold text-orange-600 mb-6">Music Recommender</h1>

      <div className="flex mb-6">
        <input
          type="text"
          placeholder="Enter a song name"
          value={song}
          onChange={handleInputChange}
          className="p-3 rounded-lg w-full bg-neutral-800 text-white focus:outline-none focus:ring-2 focus:ring-orange-600"
        />
        <button
          onClick={fetchRecommendations}
          className="ml-4 px-6 py-3 bg-orange-600 text-white rounded-lg hover:bg-orange-500 transition"
        >
          Get Recommendations
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 mt-8">
        {recommendations.map((rec, index) => (
          <div key={index} className="flex flex-col items-center">
            <img
              src={posters[index]}
              alt={rec}
              className="w-40 h-40 rounded-lg shadow-lg mb-4"
            />
            <p className="text-center text-lg">{rec}</p>
          </div>
        ))}
      </div>
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
    </div>
  );
}

export default RecommendPage;
