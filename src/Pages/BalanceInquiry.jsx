import { useState, useEffect } from "react";
import axios from "axios";

const BalanceInquiry = () => {

    const [users, setUsers] = useState([]);
    const [currentUser, setCurrentUser] = useState(null);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const token = localStorage.getItem('token'); // Get token from localStorage
                const response = await axios.get('http://localhost:5000/users', {
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
        <div>
            <h2 className="text-3xl font-semibold text-center">
                Account Balance: <span className="text-4xl text-green-500 font-bold">
                    {currentUser.balance.toFixed(2)}
                </span>
            </h2>
        </div>
    );
};

export default BalanceInquiry;