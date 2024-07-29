import { useState, useEffect } from 'react';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';

const AgentTransactionsHistory = () => {

    const [transactions, setTransactions] = useState([]);

    useEffect(() => {
        const fetchTransactions = async () => {
            const token = localStorage.getItem('token');

            if (!token) {
                toast.error('User is not authenticated.');
                return;
            }

            try {
                const response = await axios.get('http://localhost:5000/agent-transactions', {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                setTransactions(response.data);
            } catch (error) {
                toast.error('Error fetching transactions.');
            }
        };

        fetchTransactions();
    }, []);

    return (
        <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-4">Transaction History</h2>
            <ul className="space-y-4">
                {transactions.map((transaction, index) => (
                    <li key={index} className="bg-gray-100 p-4 rounded-lg">
                        <p>Amount: {transaction.amount} Taka</p>
                        <p>Date: {new Date(transaction.date).toLocaleString()}</p>
                    </li>
                ))}
            </ul>
            <Toaster />
        </div>
    );
};

export default AgentTransactionsHistory;