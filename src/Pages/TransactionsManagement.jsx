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
    
                const response = await axios.get('http://localhost:5000/pending-transactions', {
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
    
            const response = await axios.patch(`http://localhost:5000/approve-transaction/${id}`, { approve: true }, {
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
    
            const response = await axios.patch(`http://localhost:5000/approve-transaction/${id}`, { approve: false }, {
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
        <div>
            <h2>Pending Transactions</h2>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <ul>
                {transactions?.length === 0 && <p>No pending transactions.</p>}
                {transactions?.map(tx => (
                    <li key={tx._id}>
                        {tx.type} - {tx.amount} Taka
                        <button onClick={() => handleApprove(tx._id)}>Approve</button>
                        <button onClick={() => handleReject(tx._id)}>Reject</button>
                    </li>
                ))}
            </ul>
        </div>
    );
    
};

export default TransactionsManagement;
