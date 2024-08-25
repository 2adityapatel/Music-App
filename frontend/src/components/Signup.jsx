import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate , useLocation } from 'react-router-dom';

const Signup = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    // const [fullName, setFullName] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [showModal, setShowModal] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();

    const { role } = location.state || {role:'USER'};  
    

    const handleSignup = async (e) => {
        e.preventDefault();

    
        try {
            const response = await axios.post('http://localhost:8000/signup', {
                email,
                password,
                role

            });
            console.log(response);
            if (response.data) {
                setSuccess('Signup successful! Please login.');
                setShowModal(true);
            }
        } catch (err) {
            console.log(err);
            // setError('Signup failed. Please try again.');

            if (err.response) {
                // Server responded with a status other than 2xx
                setError(`Signup failed: ${err.response.data.message || 'Server error'}`);
            } else if (err.request) {
                // Request was made but no response was received
                setError('No response from server. Please try again.');
            } else {
                // Something else happened in setting up the request
                setError(`Error: ${err.message}`);
            }
            setShowModal(true);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-900">
            <div className="bg-gray-800 p-10 rounded-lg shadow-2xl w-full max-w-lg transform transition-transform hover:scale-105">
                <h2 className="text-2xl font-medium text-white mb-8 text-center">Create Your Account</h2>
                <form onSubmit={handleSignup}>
                    {/* <div className="mb-6">
                        <label className="block text-orange-500 font-semibold mb-2">Name</label>
                        <input
                            type="text"
                            value={fullName}
                            onChange={(e) => setFullName(e.target.value)}
                            required
                            className="w-full px-4 py-3 bg-gray-700 text-white rounded focus:outline-none focus:ring focus:ring-orange-500 placeholder-gray-400 transition-all duration-300"
                            placeholder="Enter your name"
                        />
                    </div> */}
                    <div className="mb-6">
                        <label className="block text-orange-500 font-semibold mb-2">Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="w-full px-4 py-3 bg-gray-700 text-white rounded focus:outline-none focus:ring focus:ring-orange-500 placeholder-gray-400 transition-all duration-300"
                            placeholder="Enter your email"
                        />
                    </div>
                    <div className="mb-6">
                        <label className="block text-orange-500 font-semibold mb-2">Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="w-full px-4 py-3 bg-gray-700 text-white rounded focus:outline-none focus:ring focus:ring-orange-500 placeholder-gray-400 transition-all duration-300"
                            placeholder="Enter your password"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-orange-500 hover:bg-orange-400 hover:opacity-80 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 focus:outline-none focus:ring focus:ring-orange-700 shadow-md"
                    >
                        Sign Up
                    </button>
                </form>
                <p className="text-gray-400 text-center mt-6">Already have an account? <a href="/login" className="text-orange-500 hover:text-orange-600">Login</a></p>
            </div>

            {/* Modal for success/error messages */}
            {showModal && (
                <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full text-center">
                        {success ? (
                            <>
                                <h2 className="text-2xl font-semibold text-green-500 mb-4">Success</h2>
                                <p className="text-gray-700 mb-6">{success}</p>
                                <button
                                    onClick={() => {
                                        setShowModal(false);
                                        navigate('/login');
                                    }}
                                    className="bg-orange-500 text-white py-2 px-4 rounded-lg hover:bg-orange-400 transition-all duration-300"
                                >
                                    Go to Login
                                </button>
                            </>
                        ) : (
                            <>
                                <h2 className="text-2xl font-semibold text-red-500 mb-4">Signup Error</h2>
                                <p className="text-gray-700 mb-6">{error}</p>
                                <button
                                    onClick={() => setShowModal(false)}
                                    className="bg-orange-500 text-white py-2 px-4 rounded-lg hover:bg-orange-400 transition-all duration-300"
                                >
                                    Close
                                </button>
                            </>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default Signup;
