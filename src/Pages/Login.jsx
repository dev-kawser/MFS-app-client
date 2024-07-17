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
            const response = await axios.post('http://localhost:5000/login', loginInfo);
            const { token, user } = response.data;
            localStorage.setItem('token', token);
            localStorage.setItem('user', JSON.stringify(user));
            navigate('/dashboard/welcome');
        } catch (error) {
            console.error('Error logging in', error);
        }
    };

    return (
        <div className="flex items-center justify-center h-screen bg-gray-100">
            <div className="w-full max-w-md bg-white rounded-lg shadow-md p-8">
                <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
                <form onSubmit={handleLogin}>
                    <div className="mb-4">
                        <label className="block text-gray-700">Mobile Number or Email</label>
                        <input
                            type="text"
                            className="w-full px-3 py-2 border rounded"
                            value={mobileOrEmail}
                            onChange={(e) => setMobileOrEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-6">
                        <label className="block text-gray-700">PIN</label>
                        <input
                            type="password"
                            className="w-full px-3 py-2 border rounded"
                            value={pin}
                            onChange={(e) => setPin(e.target.value)}
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-700"
                    >
                        Login
                    </button>
                </form>
                <div className="mt-6 text-center">
                    <p>
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
