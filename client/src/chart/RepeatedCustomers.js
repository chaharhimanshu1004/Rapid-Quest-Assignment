import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const RepeatCustomersChart = () => {
    const [data, setData] = useState([]);
    const [interval, setInterval] = useState('daily'); 

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`http://localhost:6002/api/customers/repeat-customers?interval=${interval}`);
                const result = await response.json();
                setData(result);
            } catch (error) {
                console.error('Error fetching repeat customers data:', error);
            }
        };

        fetchData();
    }, [interval]);

    const chartData = {
        labels: data.map(d => d._id),
        datasets: [
            {
                label: 'Repeat Customers Count',
                data: data.map(d => d.repeatCustomersCount),
                borderColor: 'rgba(255, 99, 132, 1)',
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                borderWidth: 1,
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            tooltip: {
                callbacks: {
                    label: function (context) {
                        return `Repeat Customers: ${context.raw}`;
                    },
                },
            },
        },
        scales: {
            x: {
                title: {
                    display: true,
                    text: 'Time Period',
                },
            },
            y: {
                title: {
                    display: true,
                    text: 'Repeat Customers Count',
                },
            },
        },
    };

    return (
        <div style={{ textAlign: 'center', margin: '20px' ,fontSize: '2rem', fontWeight: 'bold',font:'#e0e0e0' }}>
            <h1>Repeat Customers Over Time</h1>
            <label htmlFor="interval-select" style={{ fontSize: '1.2rem', color: '#e0e0e0', marginRight: '10px' }}>
                Select Interval:
            </label>
            <select
                id="interval-select"
                value={interval}
                onChange={(e) => setInterval(e.target.value)}
                style={{
                    fontSize: '1rem',
                    padding: '5px 10px',
                    borderRadius: '4px',
                    border: '1px solid #ccc',
                    backgroundColor: '#000000',
                    cursor: 'pointer'
                }}
            >
                <option value="daily">Daily</option>
                <option value="monthly">Monthly</option>
                <option value="quarterly">Quarterly</option>
                <option value="yearly">Yearly</option>
            </select>
            <Line data={chartData} options={options} />
        </div>
    );
};

export default RepeatCustomersChart;
