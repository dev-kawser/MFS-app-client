import { useState, useEffect } from "react";
import axios from "axios";

const Welcome = () => {
    const [users, setUsers] = useState([]);
    const [currentUser, setCurrentUser] = useState(null);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const token = localStorage.getItem('token'); // Get token from localStorage
                const response = await axios.get('https://task-server-five-mu.vercel.app/users', {
                    headers: {
                        'Authorization': `Bearer ${token}` // Format the token correctly
                    }
                });
                setUsers(response.data);
            } catch (error) {
                console.error("Error fetching users:", error);
            }
        };

        fetchUsers();
    }, []);

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            try {
                const parsedUser = JSON.parse(storedUser);
                const matchedUser = users.find(user => user._id === parsedUser._id); // Find matching user
                setCurrentUser(matchedUser);
            } catch (error) {
                console.error("Error parsing user from local storage:", error);
                localStorage.removeItem('user'); // Remove invalid data
            }
        }
    }, [users]); // Re-run when users change (to match with fetched data)

    if (!currentUser) return null; // Return nothing if no matched user found

    return (
        <div className="user-overview px-8 py-6 bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl shadow-lg border border-blue-200">
            <h1 className="text-3xl font-semibold text-gray-800 mb-6">
                Welcome, <span className="text-blue-600">{currentUser?.name}!</span>
            </h1>
            <ul className="list-none space-y-3">
                <li className="flex items-center text-gray-700 text-lg">
                    <svg className="w-5 h-5 text-blue-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5.5 12h13m-6.5 6H19a2 2 0 0 0 2-2v-6a2 2 0 0 0-2-2h-6m-1 1V4a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h6v6a2 2 0 0 0 2 2z"></path></svg>
                    <span>Email: {currentUser?.email}</span>
                </li>
                <li className="flex items-center text-gray-700 text-lg">
                    <svg className="w-5 h-5 text-blue-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 7h16M4 10h16m-7 4h7M4 14h6m-7 4h4m-4-8h6m-6 4h7"></path></svg>
                    <span>Phone Number: {currentUser?.mobileNumber}</span>
                </li>
                <li className="flex items-center text-gray-700 text-lg">
                    <svg className="w-5 h-5 text-blue-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 5v14m7-7H5"></path></svg>
                    <span>Account Balance: {currentUser?.balance.toFixed(2)} TK</span>
                </li>
                <li className="flex items-center text-gray-700 text-lg">
                    <svg className="w-5 h-5 text-blue-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 12l1.293 1.293a1 1 0 0 0 1.414 0L12 12l5.293 5.293a1 1 0 0 0 1.414-1.414L13.414 12l5.293-5.293a1 1 0 0 0-1.414-1.414L12 10.586 6.707 5.293a1 1 0 0 0-1.414 1.414L10.586 12 5.293 17.293a1 1 0 0 0 1.414 1.414L12 13.414l5.293 5.293a1 1 0 0 0 1.414-1.414L13.414 12l5.293-5.293a1 1 0 0 0-1.414-1.414L12 10.586 6.707 5.293a1 1 0 0 0-1.414 1.414L10.586 12 5.293 17.293a1 1 0 0 0 1.414 1.414L12 13.414l5.293 5.293a1 1 0 0 0 1.414-1.414L13.414 12z"></path></svg>
                    <span>Status: {currentUser?.status}</span>
                </li>
            </ul>
        </div>

    );
};

export default Welcome;
