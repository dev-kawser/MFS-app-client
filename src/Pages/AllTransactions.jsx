import { useState, useEffect } from 'react';
import axios from 'axios';

const AllTransactions = () => {
    const [transactions, setTransactions] = useState([]);

    useEffect(() => {
        const fetchTransactions = async () => {
            const token = localStorage.getItem('token');
            if (!token) {
                console.error("Token not found");
                return;
            }

            try {
                const response = await axios.get('http://localhost:5000/allTransactions', {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                setTransactions(response.data);
            } catch (error) {
                console.error("Error fetching transactions:", error.message);
            }
        };

        fetchTransactions();
    }, []);

    return (
        <div className="p-6 bg-white shadow-lg rounded-lg overflow-auto">
            <h1 className="text-2xl font-bold mb-4">All Transactions</h1>
            <table className="min-w-full bg-white">
                <thead>
                    <tr>
                        <th className="py-2 px-4 border-b">Transaction ID</th>
                        <th className="py-2 px-4 border-b">Amount</th>
                        <th className="py-2 px-4 border-b">Date</th>
                    </tr>
                </thead>
                <tbody>
                    {transactions.length > 0 ? (
                        transactions.map(transaction => (
                            <tr key={transaction._id}>
                                <td className="py-2 px-4 border-b">{transaction._id}</td>
                                <td className="py-2 px-4 border-b">{transaction.amount} TK</td>
                                <td className="py-2 px-4 border-b">{new Date(transaction.date).toLocaleDateString()}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="5" className="py-2 px-4 text-center">No transactions found</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default AllTransactions;
