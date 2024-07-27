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
        <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-4">Send Money</h2>
            <form onSubmit={handleSendMoney}>
                <div className="mb-4">
                    <label className="block text-gray-700">Recipient Mobile Number</label>
                    <input
                        type="text"
                        className="w-full px-3 py-2 border rounded"
                        value={recipient}
                        onChange={(e) => setRecipient(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Amount</label>
                    <input
                        type="number"
                        className="w-full px-3 py-2 border rounded"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">PIN</label>
                    <input
                        type="password"
                        className="w-full px-3 py-2 border rounded"
                        value={pin}
                        onChange={(e) => setPin(e.target.value)}
                        required
                    />
                </div>
                <button
                    type="submit"
                    className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-700"
                >
                    Send Money
                </button>
            </form>
            <Toaster />
        </div>
    );
};

export default SendMoney;
