import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
    const [mobileOrEmail, setMobileOrEmail] = useState('');
    const [pin, setPin] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();

        const loginInfo = {
            mobileOrEmail,
            pin
        };

        try {
            const response = await axios.post('https://task-server-five-mu.vercel.app/login', loginInfo);
            const { token, user } = response.data;
            localStorage.setItem('token', token);
            localStorage.setItem('user', JSON.stringify(user));
            navigate('/dashboard/welcome');
        } catch (error) {
            console.error('Error logging in', error);
        }
    };

    return (
        <div className="flex lg:px-0 px-2 items-center justify-center h-screen bg-gray-100">
            <div className="w-full max-w-sm bg-white rounded-lg shadow-lg p-8">
                <h2 className="text-3xl font-semibold mb-6 text-center text-gray-800">Login</h2>
                <form onSubmit={handleLogin} className="space-y-6">
                    <div>
                        <label className="block text-gray-700 text-sm font-medium mb-2">Mobile Number or Email</label>
                        <input
                            type="text"
                            className="w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={mobileOrEmail}
                            onChange={(e) => setMobileOrEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700 text-sm font-medium mb-2">PIN</label>
                        <input
                            type="password"
                            className="w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={pin}
                            onChange={(e) => setPin(e.target.value)}
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition-colors"
                    >
                        Login
                    </button>
                </form>
                <div className="mt-6 text-center">
                    <p className="text-gray-600">
                        Do not have an account?{' '}
                        <Link to="/register" className="text-blue-500 hover:underline">
                            Register
                        </Link>
                    </p>
                </div>
            </div>
        </div>

    );
};

export default Login;
