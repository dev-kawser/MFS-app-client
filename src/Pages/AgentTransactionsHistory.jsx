import { useState, useEffect } from 'react';
import axios from 'axios';

const AgentTransactionsHistory = () => {
    const [transactions, setTransactions] = useState([]);

    useEffect(() => {
        const fetchTransactions = async () => {
            try {
                const response = await axios.get('http://localhost:5000/agent-transactions', {
                    headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
                });
                setTransactions(response.data);
            } catch (error) {
                console.error(error);
            }
        };
        fetchTransactions();
    }, []);

    return (
        <div>
            <h2>Transaction History</h2>
            <ul>
                {transactions.map(transaction => (
                    <li key={transaction._id}>
                        {transaction.type === 'cash-in' ? 'Cash-In' : 'Cash-Out'} - Amount: {transaction.amount}, Fee: {transaction.fee}, Status: {transaction.status}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default AgentTransactionsHistory;
