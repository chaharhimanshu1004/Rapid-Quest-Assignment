import React, { useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const CustomerLifetimeValueChart = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`https://rapid-quest-assignment.onrender.com/api/customers/customer-lifetime-value`);
                const result = await response.json();
                setData(result);
            } catch (error) {
                console.error('Error fetching customer lifetime value data:', error);
            }
        };

        fetchData();
    }, []);

    return (
        <div style={{ textAlign: 'center',fontWeight:'bold', margin: '30px', marginBottom:'30px', padding: '10px', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0,0,0,0.1)' }}>
            <h1 style={{ fontSize: '2rem', color: '#ffffff' }}>Customer Lifetime Value by Cohort</h1>
            <ResponsiveContainer width="100%" height={400}>
                <LineChart data={data} margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis 
                        dataKey="_id" 
                        tickFormatter={(value) => value.slice(0, 7)} 
                        style={{ fontSize: '0.9rem', color: '#ffffff' }} 
                    />
                    <YAxis 
                        style={{ fontSize: '0.9rem', color: '#ffffff' }} 
                    />
                    <Tooltip 
                        formatter={(value) => `$${value.toFixed(2)}`} 
                        labelStyle={{ color: '#ffffff' }}
                    />
                    <Line 
                        type="monotone" 
                        dataKey="cohortValue" 
                        stroke="#8884d8" 
                        strokeWidth={2} 
                        dot={false}
                    />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
};

export default CustomerLifetimeValueChart;
