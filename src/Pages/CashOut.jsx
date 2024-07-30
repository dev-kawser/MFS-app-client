import { useState, useEffect } from 'react';
import axios from 'axios';

const CashOut = () => {
    const [agents, setAgents] = useState([]);
    const [formData, setFormData] = useState({
        agentId: '',
        amount: '',
        pin: ''
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    useEffect(() => {
        const fetchAgents = async () => {
            try {
                const response = await axios.get('https://task-server-five-mu.vercel.app/agents', {
                    headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
                });
                setAgents(response.data);
            } catch (error) {
                console.error(error);
                setError('Failed to fetch agents');
            }
        };
        fetchAgents();
    }, []);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        setSuccess(null);

        try {
            await axios.post('https://task-server-five-mu.vercel.app/cash-out', formData, {
                headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
            });
            setSuccess('Cash-Out request submitted and is pending approval.');
        } catch (error) {
            console.error(error);
            setError('Failed to submit Cash-Out request.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-lg border border-gray-200">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">Cash Out</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <label className="block text-gray-700 text-sm font-medium mb-2">Select Agent</label>
                    <select
                        name="agentId"
                        value={formData.agentId}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        <option value="">Select Agent</option>
                        {agents?.map(agent => (
                            <option key={agent._id} value={agent._id}>{agent.name}</option>
                        ))}
                    </select>
                </div>
                <div>
                    <label className="block text-gray-700 text-sm font-medium mb-2">Amount</label>
                    <input
                        name="amount"
                        value={formData.amount}
                        onChange={handleChange}
                        placeholder="Amount"
                        type="number"
                        className="w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    />
                </div>
                <div>
                    <label className="block text-gray-700 text-sm font-medium mb-2">PIN</label>
                    <input
                        name="pin"
                        value={formData.pin}
                        onChange={handleChange}
                        placeholder="PIN"
                        type="password"
                        className="w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    />
                </div>
                <button
                    type="submit"
                    disabled={loading}
                    className={`w-full py-3 rounded-md text-white font-semibold ${loading ? 'bg-gray-400' : 'bg-red-600 hover:bg-red-700'} transition-colors`}
                >
                    {loading ? 'Submitting...' : 'Cash Out'}
                </button>
                {error && <p className="text-red-500 text-center">{error}</p>}
                {success && <p className="text-green-500 text-center">{success}</p>}
            </form>
        </div>

    );
};

export default CashOut;
