import { useState, useEffect } from "react";
import axios from "axios";

const Welcome = () => {
    const [users, setUsers] = useState([]);
    const [currentUser, setCurrentUser] = useState(null);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const token = localStorage.getItem('token'); // Get token from localStorage
                const response = await axios.get('http://localhost:5000/users', {
                    headers: {
                        'Authorization': token
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
        <div className="user-overview px-6 py-4 bg-white rounded-lg shadow-md">
            <h1 className="text-2xl font-bold mb-4">Welcome, {currentUser.name}!</h1>
            <ul className="list-disc space-y-2">
                <li>Email: {currentUser.email}</li>
                <li>Phone Number: {currentUser.mobileNumber}</li>
                <li>Account Balance: {currentUser.balance.toFixed(2)}</li>
                <li>Status: {currentUser.status}</li>
            </ul>
        </div>
    );
};

export default Welcome;
