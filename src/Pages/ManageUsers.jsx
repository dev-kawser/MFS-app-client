import { useEffect, useState } from "react";
import axios from "axios";

const ManageUsers = () => {
    const [users, setUsers] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [usersPerPage] = useState(7);
    const [totalUsers, setTotalUsers] = useState(0);

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
                setTotalUsers(response.data.length);
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
            setTotalUsers(response.data.length);
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

    // Calculate paginated users
    const startIndex = (currentPage - 1) * usersPerPage;
    const endIndex = Math.min(startIndex + usersPerPage, users.length);
    const currentUsers = users.slice(startIndex, endIndex);

    // Calculate total pages
    const totalPages = Math.ceil(totalUsers / usersPerPage);

    const handlePageChange = (pageNumber) => {
        if (pageNumber >= 1 && pageNumber <= totalPages) {
            setCurrentPage(pageNumber);
        }
    };

    return (
        <div className="p-8 bg-gradient-to-r from-gray-50 to-gray-100 shadow-lg rounded-xl overflow-auto border border-gray-200">
            <h1 className="text-3xl font-semibold text-gray-800 mb-6">Manage Users</h1>
            <div className="mb-6 flex items-center">
                <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search by name"
                    className="px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                    onClick={handleSearch}
                    className="ml-4 px-6 py-2 bg-blue-600 text-white rounded-md shadow-md hover:bg-blue-700 transition-colors">
                    Search
                </button>
            </div>
            <table className="min-w-full bg-white rounded-lg overflow-hidden shadow-md">
                <thead className="bg-blue-600 text-white">
                    <tr>
                        <th className="py-3 px-6 text-left">Name</th>
                        <th className="py-3 px-6 text-left">Email</th>
                        <th className="py-3 px-6 text-left">Mobile Number</th>
                        <th className="py-3 px-6 text-left">Role</th>
                        <th className="py-3 px-6 text-left">Status</th>
                        <th className="py-3 px-6 text-left">Actions</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                    {currentUsers.length > 0 ? currentUsers.map((user) => (
                        <tr key={user._id} className="hover:bg-gray-50">
                            <td className="py-4 px-6">{user.name}</td>
                            <td className="py-4 px-6">{user.email}</td>
                            <td className="py-4 px-6">{user.mobileNumber}</td>
                            <td className="py-4 px-6 capitalize">{user.role}</td>
                            <td className="py-4 px-6">
                                {user.status === 'pending' ? (
                                    <select
                                        onChange={(e) => handleStatusChange(user._id, e.target.value)}
                                        value={user.status}
                                        className="bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    >
                                        <option value="pending">Pending</option>
                                        <option value="approved">Approved</option>
                                    </select>
                                ) : (
                                    user.status
                                )}
                            </td>
                            <td className="py-4 px-6 flex space-x-2">
                                <button
                                    onClick={() => handleActionChange(user._id, 'active')}
                                    className="px-4 py-2 bg-green-500 text-white rounded-md shadow-md hover:bg-green-600 transition-colors"
                                >
                                    Activate
                                </button>
                                <button
                                    onClick={() => handleActionChange(user._id, 'blocked')}
                                    className="px-4 py-2 bg-red-500 text-white rounded-md shadow-md hover:bg-red-600 transition-colors"
                                >
                                    Block
                                </button>
                            </td>
                        </tr>
                    )) : (
                        <tr>
                            <td colSpan="6" className="py-4 px-6 text-center text-gray-500">No users found</td>
                        </tr>
                    )}
                </tbody>
            </table>

            {/* Pagination Controls */}
            <div className="flex justify-between items-center mt-6">
                <button 
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-700 disabled:bg-gray-300 transition-colors"
                >
                    Previous
                </button>
                <span className="text-lg">
                    Page {currentPage} of {totalPages}
                </span>
                <button 
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-700 disabled:bg-gray-300 transition-colors"
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default ManageUsers;
