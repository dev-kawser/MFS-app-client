import { useEffect, useState } from "react";
import axios from "axios";

const ManageUsers = () => {
    const [users, setUsers] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    throw new Error("Token not found");
                }

                const response = await axios.get('http://localhost:5000/users', {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                setUsers(response.data);
            } catch (error) {
                console.error("Error fetching users:", error.message);
            }
        };

        fetchUsers();
    }, []);

    const handleSearch = async () => {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                throw new Error("Token not found");
            }

            const response = await axios.get('http://localhost:5000/users/search', {
                headers: {
                    'Authorization': `Bearer ${token}`
                },
                params: {
                    name: searchTerm
                }
            });
            setUsers(response.data);
        } catch (error) {
            console.error("Error searching users:", error.message);
        }
    };

    const handleActionChange = async (id, action) => {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                throw new Error("Token not found");
            }

            await axios.patch(`http://localhost:5000/users/action/${id}`, { action }, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            setUsers(users.map(user => user._id === id ? { ...user, action } : user));
        } catch (error) {
            console.error("Error updating user action:", error.message);
        }
    };

    const handleStatusChange = async (id, status) => {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                throw new Error("Token not found");
            }

            await axios.patch(`http://localhost:5000/users/status/${id}`, { status }, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            setUsers(users.map(user => user._id === id ? { ...user, status, balance: status === 'approved' ? 40 : user.balance } : user));
        } catch (error) {
            console.error("Error updating user status:", error.message);
        }
    };

    return (
        <div className="p-6 bg-white shadow-lg rounded-lg overflow-auto">
            <h1 className="text-2xl font-bold mb-4">Manage Users</h1>
            <div className="mb-4">
                <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search by name"
                    className="px-4 py-2 border rounded-md"
                />
                <button onClick={handleSearch} className="ml-2 px-4 py-2 bg-blue-500 text-white rounded-md">Search</button>
            </div>
            <table className="min-w-full bg-white">
                <thead>
                    <tr>
                        <th className="py-2 px-4 border-b">Name</th>
                        <th className="py-2 px-4 border-b">Email</th>
                        <th className="py-2 px-4 border-b">Mobile Number</th>
                        <th className="py-2 px-4 border-b">Role</th>
                        <th className="py-2 px-4 border-b">Status</th>
                        <th className="py-2 px-4 border-b">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {users.length > 0 ? users.map((user) => (
                        <tr key={user._id}>
                            <td className="py-2 px-4 border-b">{user.name}</td>
                            <td className="py-2 px-4 border-b">{user.email}</td>
                            <td className="py-2 px-4 border-b">{user.mobileNumber}</td>
                            <td className="py-2 px-4 border-b">{user.role}</td>
                            <td className="py-2 px-4 border-b">
                                {user.status === 'pending' ? (
                                    <select onChange={(e) => handleStatusChange(user._id, e.target.value)} value={user.status}>
                                        <option value="pending">Pending</option>
                                        <option value="approved">Approved</option>
                                    </select>
                                ) : (
                                    user.status
                                )}
                            </td>
                            <td className="py-2 px-4 border-b">
                                <button onClick={() => handleActionChange(user._id, 'active')} className="px-4 py-2 bg-green-500 text-white rounded-md mr-2">Activate</button>
                                <button onClick={() => handleActionChange(user._id, 'blocked')} className="px-4 py-2 bg-red-500 text-white rounded-md">Block</button>
                            </td>
                        </tr>
                    )) : (
                        <tr>
                            <td colSpan="6" className="py-2 px-4 text-center">No users found</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default ManageUsers;
