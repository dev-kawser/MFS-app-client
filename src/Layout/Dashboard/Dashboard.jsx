import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";


const Dashboard = () => {

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
    }, [users]);


    const isAdmin = currentUser?.role === "admin";


    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        navigate('/');
    };

    return (
        <div className="flex lg:flex-row flex-col">
            {/* Sidebar */}
            <div className="relative lg:w-64 w-full">
                <div className="drawer lg:drawer-open">
                    <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
                    <div className="drawer-content flex flex-col items-center justify-center">
                        <label htmlFor="my-drawer-2" className="btn bg-[#d32f2f] drawer-button lg:hidden mt-2 text-white rounded-none">☰ Open Drawer</label>
                    </div>
                    <div className="drawer-side">
                        <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay"></label>
                        <ul className="menu inter space-y-2 p-4 w-64 min-h-full bg-[#6A64F1] text-white">
                            {isAdmin && (
                                <>
                                    <NavLink to="/dashboard/manage-users"
                                        className={({ isActive }) =>
                                            isActive
                                                ? "flex items-center gap-2 py-2 px-4 bg-[#553c9a] text-white rounded-md"
                                                : "flex items-center gap-2 py-2 px-4 hover:bg-[#553c9a] rounded-md"
                                        }>
                                        <span className="flex gap-1 items-center"> Manage User</span>
                                    </NavLink>
                                    <NavLink to="/dashboard/all-transactions"
                                        className={({ isActive }) =>
                                            isActive
                                                ? "flex items-center gap-2 py-2 px-4 bg-[#553c9a] text-white rounded-md"
                                                : "flex items-center gap-2 py-2 px-4 hover:bg-[#553c9a] rounded-md"
                                        }>
                                        <span className="flex gap-1 items-center">All Transactions</span>
                                    </NavLink>
                                </>
                            )}

                            {!isAdmin && (
                                <>
                                    <li>
                                        <NavLink to="/dashboard/send-money"
                                            className={({ isActive }) =>
                                                isActive
                                                    ? "flex items-center gap-2 py-2 px-4 bg-[#553c9a] text-white rounded-md"
                                                    : "flex items-center gap-2 py-2 px-4 hover:bg-[#553c9a] rounded-md"
                                            }>
                                            <span className="flex gap-1 items-center">Send Money</span>
                                        </NavLink>
                                    </li>
                                    <li>
                                        <NavLink to="/dashboard/my-winning-contest" className="flex items-center gap-2 py-2 px-4 hover:bg-[#553c9a] rounded-md">
                                            <span className="flex gap-1 items-center">My Winning Contest Page</span>
                                        </NavLink>
                                    </li>
                                    <li>
                                        <NavLink to="/dashboard/my-profile" className="flex items-center gap-2 py-2 px-4 hover:bg-[#553c9a] rounded-md">
                                            <span className="flex gap-1 items-center">My Profile</span>
                                        </NavLink>
                                    </li>
                                </>
                            )}
                            {/* For all roles */}
                            <div className="divider divider-error" />
                            <li>
                                <button onClick={handleLogout} className="flex text-red-600 font-semibold items-center gap-2 py-2 px-4 bg-white hover:bg-white hover:scale-105 transition-all rounded-md">
                                    <span className="flex gap-1 items-center"> Logout</span>
                                </button>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            {/* Main Content */}
            <div className="mt-10 flex-1">
                <Outlet />
            </div>
        </div>
    );
};

export default Dashboard;
