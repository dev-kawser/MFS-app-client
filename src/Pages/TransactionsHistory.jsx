import { useState, useEffect } from 'react';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';

const TransactionsHistory = () => {
    const [transactions, setTransactions] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [transactionsPerPage] = useState(5); // Number of transactions per page
    const [totalTransactions, setTotalTransactions] = useState(0); // Total number of transactions

    useEffect(() => {
        const fetchTransactions = async () => {
            const token = localStorage.getItem('token');

            if (!token) {
                toast.error('User is not authenticated.');
                return;
            }

            try {
                const response = await axios.get('http://localhost:5000/transactions', {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                setTransactions(response.data);
                setTotalTransactions(response.data.length); // Set total transactions
            } catch (error) {
                toast.error('Error fetching transactions.');
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
        <div className="max-w-md mx-auto bg-gradient-to-r from-gray-50 to-gray-100 p-8 rounded-lg shadow-lg border border-gray-200">
            <h2 className="text-3xl font-semibold text-gray-800 mb-6 text-center">Transaction History</h2>

            <ul className="space-y-4">
                {currentTransactions.length > 0 ? (
                    currentTransactions.map((transaction, index) => (
                        <li key={index} className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
                            <div className="flex justify-between items-center mb-2">
                                <span className="text-gray-700 font-semibold">Amount:</span>
                                <span className="text-green-600 font-bold">{transaction.amount} Taka</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-gray-700 font-semibold">Date:</span>
                                <span className="text-gray-500">{new Date(transaction.date).toLocaleString()}</span>
                            </div>
                        </li>
                    ))
                ) : (
                    <li className="bg-white p-6 rounded-lg shadow-md border border-gray-200 text-center text-gray-500">
                        No transactions available
                    </li>
                )}
            </ul>

            {/* Pagination Controls */}
            <div className="flex justify-between items-center mt-6">
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

            <Toaster />
        </div>
    );
};

export default TransactionsHistory;
