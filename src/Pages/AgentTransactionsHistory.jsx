import { useState, useEffect } from 'react';
import axios from 'axios';

const AgentTransactionsHistory = () => {
    const [transactions, setTransactions] = useState([]);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const transactionsPerPage = 5;

    useEffect(() => {
        const fetchTransactions = async () => {
            try {
                const response = await axios.get('http://localhost:5000/agent-transactions', {
                    headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
                });
                setTransactions(response.data);
            } catch (error) {
                console.error('Error fetching transactions:', error);
                setError('Failed to fetch transactions.');
            }
        };
        fetchTransactions();
    }, []);

    // Calculate the start and end index of transactions for the current page
    const startIndex = (currentPage - 1) * transactionsPerPage;
    const endIndex = Math.min(startIndex + transactionsPerPage, transactions.length);
    const currentTransactions = transactions.slice(startIndex, endIndex);

    // Calculate total pages
    const totalPages = Math.ceil(transactions.length / transactionsPerPage);

    const handlePageChange = (pageNumber) => {
        if (pageNumber >= 1 && pageNumber <= totalPages) {
            setCurrentPage(pageNumber);
        }
    };

    return (
        <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-4">Transaction History</h2>

            {error && <p className="text-red-500 mb-4">{error}</p>}

            {transactions.length === 0 ? (
                <p className="text-gray-600">No transactions found.</p>
            ) : (
                <>
                    <ul className="space-y-4 mb-6">
                        {currentTransactions.map(transaction => (
                            <li key={transaction._id} className="p-4 bg-gray-100 rounded-lg shadow-md flex justify-between items-center">
                                <div>
                                    <p className="font-semibold text-lg">
                                        {transaction.type === 'cash-in' ? 'Cash-In' : 'Cash-Out'}
                                    </p>
                                    <p className="text-sm text-gray-600">Amount: {transaction.amount}</p>
                                    <p className="text-sm text-gray-600">Fee: {transaction.fee}</p>
                                    <p className="text-sm text-gray-600">Status: {transaction.status}</p>
                                </div>
                            </li>
                        ))}
                    </ul>

                    <div className="flex justify-between items-center">
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
                </>
            )}
        </div>
    );
};

export default AgentTransactionsHistory;
