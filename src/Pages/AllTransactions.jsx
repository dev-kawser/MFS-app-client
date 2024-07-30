import { useState, useEffect } from 'react';
import axios from 'axios';

const AllTransactions = () => {
    const [transactions, setTransactions] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [transactionsPerPage] = useState(10);
    const [totalTransactions, setTotalTransactions] = useState(0);

    useEffect(() => {
        const fetchTransactions = async () => {
            const token = localStorage.getItem('token');
            if (!token) {
                console.error("Token not found");
                return;
            }

            try {
                const response = await axios.get('https://task-server-five-mu.vercel.app/allTransactions', {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                setTransactions(response?.data);
                setTotalTransactions(response.data.length); // Set total transactions
            } catch (error) {
                console.error("Error fetching transactions:", error.message);
            }
        };

        fetchTransactions();
    }, []);

    // Calculate the start and end index of transactions for the current page
    const startIndex = (currentPage - 1) * transactionsPerPage;
    const endIndex = Math.min(startIndex + transactionsPerPage, transactions.length);
    const currentTransactions = transactions.slice(startIndex, endIndex);

    // Calculate total pages
    const totalPages = Math.ceil(totalTransactions / transactionsPerPage);

    const handlePageChange = (pageNumber) => {
        if (pageNumber >= 1 && pageNumber <= totalPages) {
            setCurrentPage(pageNumber);
        }
    };

    return (
        <div className="p-8 bg-gradient-to-r from-gray-50 to-gray-100 shadow-lg rounded-xl overflow-auto border border-gray-200">
            <h1 className="text-3xl font-semibold text-gray-800 mb-6">All Transactions</h1>

            <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
                <thead className="bg-blue-500 text-white">
                    <tr>
                        <th className="py-3 px-6 text-left">Transaction ID</th>
                        <th className="py-3 px-6 text-left">Amount</th>
                        <th className="py-3 px-6 text-left">Type</th>
                        <th className="py-3 px-6 text-left">Date</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                    {currentTransactions?.length > 0 ? (
                        currentTransactions?.map(transaction => (
                            <tr key={transaction._id} className="hover:bg-gray-50">
                                <td className="py-4 px-6">{transaction._id}</td>
                                <td className="py-4 px-6 text-green-600 font-medium">{transaction.amount} TK</td>
                                <td className="py-4 px-6 capitalize">{transaction.type}</td>
                                <td className="py-4 px-6">{new Date(transaction.date).toLocaleDateString()}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="4" className="py-4 px-6 text-center text-gray-500">No transactions found</td>
                        </tr>
                    )}
                </tbody>
            </table>

            {/* Pagination Controls */}
            <div className="flex justify-between items-center mt-4">
                <button 
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-700 disabled:bg-gray-300"
                >
                    Previous
                </button>
                <span className="text-lg">
                    Page {currentPage} of {totalPages}
                </span>
                <button 
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-700 disabled:bg-gray-300"
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default AllTransactions;
