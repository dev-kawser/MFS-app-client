import { useState, useEffect } from 'react';
import axios from 'axios';

const TransactionsManagement = () => {
    const [transactions, setTransactions] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPendingTransactions = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    throw new Error('No token found');
                }

                const response = await axios.get('https://task-server-five-mu.vercel.app/pending-transactions', {
                    headers: { 'Authorization': `Bearer ${token}` }
                });

                console.log('Fetched transactions:', response.data); // Log the data
                setTransactions(response.data);
            } catch (error) {
                console.error('Error fetching transactions:', error);
                setError('Failed to fetch pending transactions.');
            }
        };
        fetchPendingTransactions();
    }, []);



    const handleApprove = async (id) => {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                throw new Error('No token found');
            }

            const response = await axios.patch(`https://task-server-five-mu.vercel.app/approve-transaction/${id}`, { approve: true }, {
                headers: { 'Authorization': `Bearer ${token}` }
            });

            console.log('Approved transaction response:', response.data); // Debugging

            setTransactions(transactions.filter(tx => tx._id !== id));
        } catch (error) {
            console.error('Error approving transaction:', error);
            setError('Failed to approve transaction.');
        }
    };

    const handleReject = async (id) => {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                throw new Error('No token found');
            }

            const response = await axios.patch(`https://task-server-five-mu.vercel.app/approve-transaction/${id}`, { approve: false }, {
                headers: { 'Authorization': `Bearer ${token}` }
            });

            console.log('Rejected transaction response:', response.data); // Debugging

            setTransactions(transactions.filter(tx => tx._id !== id));
        } catch (error) {
            console.error('Error rejecting transaction:', error);
            setError('Failed to reject transaction.');
        }
    };




    return (
        <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-lg border border-gray-200">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4 text-center">Pending Transactions</h2>

            {error && <p className="text-red-500 text-center mb-4">{error}</p>}

            <ul className="space-y-4">
                {transactions?.length === 0 ? (
                    <li className="text-gray-500 text-center">No pending transactions.</li>
                ) : (
                    transactions?.map(tx => (
                        <li key={tx._id} className="bg-gray-100 p-4 rounded-lg shadow-sm border border-gray-200 flex justify-between items-center">
                            <div className="flex-1 text-gray-700">
                                <p className="font-semibold">{tx.type}</p>
                                <p>{tx.amount} Taka</p>
                            </div>
                            <div className="flex space-x-2">
                                <button
                                    onClick={() => handleApprove(tx._id)}
                                    className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors"
                                >
                                    Approve
                                </button>
                                <button
                                    onClick={() => handleReject(tx._id)}
                                    className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors"
                                >
                                    Reject
                                </button>
                            </div>
                        </li>
                    ))
                )}
            </ul>
        </div>

    );

};

export default TransactionsManagement;
