import { useState, useEffect } from 'react';
import axios from 'axios';

const CashOut = () => {
    const [agents, setAgents] = useState([]);
    const [formData, setFormData] = useState({
        agentId: '',
        amount: '',
        pin: ''
    });

    useEffect(() => {
        const fetchAgents = async () => {
            try {
                const response = await axios.get('http://localhost:5000/agents', {
                    headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
                });
                setAgents(response.data);
            } catch (error) {
                console.error(error);
            }
        };
        fetchAgents();
    }, []);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:5000/cash-out', formData, {
                headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
            });
            alert('Cash-Out request sent successfully');
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <select name="agentId" value={formData.agentId} onChange={handleChange}>
                <option value="">Select Agent</option>
                {agents.map(agent => (
                    <option key={agent._id} value={agent._id}>{agent.name}</option>
                ))}
            </select>
            <input name="amount" value={formData.amount} onChange={handleChange} placeholder="Amount" type="number" />
            <input name="pin" value={formData.pin} onChange={handleChange} placeholder="PIN" type="password" />
            <button type="submit">Cash Out</button>
        </form>
    );
};

export default CashOut;
