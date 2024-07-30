import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Register = () => {
  const [name, setName] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [email, setEmail] = useState('');
  const [pin, setPin] = useState('');
  const [role, setRole] = useState('user');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    const registerInfo = {
      name,
      mobileNumber,
      email,
      pin,
      role,
      status: "pending"
    };

    try {
      const response = await axios.post('https://task-server-five-mu.vercel.app/register', registerInfo);
      console.log(response.data);
      navigate('/');
    } catch (error) {
      console.error('Error registering user', error);
    }
  };

  return (
    <div className="flex lg:px-0 px-2 items-center justify-center h-screen bg-gray-100">
      <div className="w-full max-w-sm bg-white rounded-lg shadow-lg p-8">
        <h2 className="text-3xl font-semibold mb-6 text-center text-gray-800">Register</h2>
        <form onSubmit={handleRegister} className="space-y-6">
          <div>
            <label className="block text-gray-700 text-sm font-medium mb-2">Name</label>
            <input
              type="text"
              className="w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 text-sm font-medium mb-2">Mobile Number</label>
            <input
              type="number"
              className="w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={mobileNumber}
              onChange={(e) => setMobileNumber(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 text-sm font-medium mb-2">Email</label>
            <input
              type="email"
              className="w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
          <div>
            <label className="block text-gray-700 text-sm font-medium mb-2">Role</label>
            <select
              className="w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={role}
              onChange={(e) => setRole(e.target.value)}
            >
              <option value="user">User</option>
              <option value="agent">Agent</option>
            </select>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition-colors"
          >
            Register
          </button>
        </form>
        <div className="mt-6 text-center">
          <p className="text-gray-600">
            Already have an account?{' '}
            <Link to="/" className="text-blue-500 hover:underline">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>

  );
};

export default Register;
