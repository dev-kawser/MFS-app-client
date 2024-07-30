import { useState } from 'react';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';

const SendMoney = () => {
    const [recipient, setRecipient] = useState('');
    const [amount, setAmount] = useState('');
    const [pin, setPin] = useState('');

    const handleSendMoney = async (e) => {
        e.preventDefault();

        const token = localStorage.getItem('token');

        if (!token) {
            toast.error('User is not authenticated.');
            return;
        }

        const response = await axios.post('http://localhost:5000/send-money', {
            recipient,
            amount,
            pin
        }, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        toast.success(response.data.message)

    };

    return (
        <div className="max-w-md mx-auto bg-gradient-to-r from-gray-50 to-gray-100 p-8 rounded-lg shadow-xl border border-gray-200">
            <h2 className="text-3xl font-semibold text-gray-800 mb-6">Send Money</h2>
            <form onSubmit={handleSendMoney}>
                <div className="mb-6">
                    <label className="block text-gray-700 text-sm font-medium mb-2">Recipient Mobile Number</label>
                    <input
                        type="text"
                        className="w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={recipient}
                        onChange={(e) => setRecipient(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-6">
                    <label className="block text-gray-700 text-sm font-medium mb-2">Amount</label>
                    <input
                        type="number"
                        className="w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-6">
                    <label className="block text-gray-700 text-sm font-medium mb-2">PIN</label>
                    <input
                        type="password"
                        className="w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={pin}
                        onChange={(e) => setPin(e.target.value)}
                        required
                    />
                </div>
                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-3 rounded-md shadow-md hover:bg-blue-700 transition-colors"
                >
                    Send Money
                </button>
            </form>
            <Toaster />
        </div>

    );
};

export default SendMoney;
