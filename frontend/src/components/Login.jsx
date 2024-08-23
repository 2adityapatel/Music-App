import React, { useState ,useEffect} from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [showModal, setShowModal] = useState(false);
    const navigate = useNavigate();
    const [role,setRole] = useState('USER')
    
    useEffect(() => {

        {
            role == 'ARTIST' ?  navigate('/artist') : navigate('/user');
        }
       
    }, [role, navigate]);

    const handleLogin = async (e) => {
        e.preventDefault();
        console.log(email + " " + password);
        try {
            const response = await axios.post('http://localhost:8000/signin', {
                email:email,
                password:password,
            });

            if (response.data.token) {
                console.log(response.data.msg);
                localStorage.setItem('token', response.data.token);
                console.log(response.data.role);
                setRole(response.data.role)
               
                
            }
        } catch (err) {
            console.log(err);
            setError('Invalid credentials. Please try again.');
            setShowModal(true);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-900">
            <div className="bg-gray-800 p-10 rounded-lg shadow-2xl w-full max-w-lg transform transition-transform hover:scale-100">
                <h2 className="text-2xl font-medium text-white mb-8 text-center">Welcome Back</h2>
                <form onSubmit={handleLogin}>
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
                        Login
                    </button>
                </form>
                <p className="text-gray-400 text-center mt-6">Don't have an account? <a href="/signup" className="text-orange-500 hover:text-orange-600">Sign up</a></p>
            </div>

            {/* Modal for error messages */}
            {showModal && (
                <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full text-center">
                        <h2 className="text-2xl font-semibold text-red-500 mb-4">Login Error</h2>
                        <p className="text-gray-700 mb-6">{error}</p>
                        <button
                            onClick={() => setShowModal(false)}
                            className="bg-orange-500 text-white py-2 px-4 rounded-lg hover:bg-orange-400 transition-all duration-300"
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Login;
