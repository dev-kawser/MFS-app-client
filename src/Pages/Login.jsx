import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { motion } from 'framer-motion';

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
    <div className="w-full max-w-sm bg-white rounded-lg shadow-lg p-8 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 opacity-75 pointer-events-none"></div>
        <div className="mb-6 text-center z-10 relative">
            <motion.h1 
                className="text-4xl font-bold text-white"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1 }}
            >
                TAKA EXPRESS
            </motion.h1>
            <motion.p 
                className="text-lg text-white mt-2"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1 }}
            >
                Welcome to TAKA EXPRESS, your one-stop solution for managing your financial services with ease and efficiency.
            </motion.p>
        </div>
        <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
        >
            <h2 className="text-4xl font-bold mb-6 text-center text-white z-10 relative">
                Login
            </h2>
        </motion.div>
        <motion.form
            onSubmit={handleLogin}
            className="space-y-6 z-10 relative"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
        >
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
            <motion.button
                type="submit"
                className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition-colors"
                whileHover={{ scale: 1.05 }}
            >
                Login
            </motion.button>
        </motion.form>
        <div className="mt-6 text-center">
            <p className="text-gray-900">
                Do not have an account?{' '}
                <Link to="/register" className="text-blue-900 font-semibold hover:underline">
                    Register
                </Link>
            </p>
        </div>
    </div>
</div>

    );
};

export default Login;
