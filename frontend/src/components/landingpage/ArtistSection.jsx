import { Link } from 'react-router-dom';
import artist from '../../assets/artistpic.webp'
import React from 'react';
import { useNavigate } from 'react-router-dom';

const ArtistSection = () => {
  const navigate = useNavigate()
  return (
    <div className="flex flex-col lg:flex-row items-start mt-6  lg:mt-20">
      
      {/* Left Div */}
      <div className="flex flex-col lg:w-1/2  lg:pr-12">
        <h1 className="text-4xl sm:text-6xl lg:text-7xl tracking-wide ">
          Empower Your 
          <span className="bg-gradient-to-r from-orange-500 to-red-800 text-transparent p-2 bg-clip-text">
            {" "}Artistry
          </span>
        </h1>
        <p className="mt-10 text-lg text-neutral-500 max-w-xl">
          Transform your live music career by connecting with fans, streaming performances, and growing your audience on our platform.
        </p>
        <div className="flex mt-10">
          <button
            onClick={()=> navigate('/signup', { state: { role: 'ARTIST' } })}
            className="bg-gradient-to-r from-orange-500 to-orange-800 py-3 px-6 rounded-md shadow-md hover:bg-orange-600 transition duration-300"
          >
            Join as an Artist
          </button>
        </div>
      </div>
      
      {/* Right Div - Image Section */}
      <div className="lg:w-1/2 flex justify-center mt-6 lg:mt-0 lg:pl-12">
        <img 
          src={artist}
          alt="Artist performing live" 
          className="rounded-md border-4 border-orange-500 shadow-lg transform "
        />
      </div>
    </div>
  );
};

export default ArtistSection;
