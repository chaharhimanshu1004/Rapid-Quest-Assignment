import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const NewCustomersChart = () => {
    const [data, setData] = useState([]);
    const [interval, setInterval] = useState('daily'); 

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}api/customers/new-customers-track?interval=${interval}`);
                const result = await response.json();
                setData(result);
            } catch (error) {
                console.error('Error fetching new customers data:', error);
            }
        };

        fetchData();
    }, [interval]);

    const chartData = {
        labels: data.map(d => d._id),
        datasets: [
            {
                label: 'New Customers',
                data: data.map(d => d.newCustomersCount),
                borderColor: 'rgba(54, 162, 235, 1)',
                backgroundColor: 'rgba(54, 162, 235, 0.2)',
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
                        return `New Customers: ${context.raw}`;
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
                    text: 'New Customers Count',
                },
            },
        },
    };

    return (
        <div style={{ textAlign: 'center', margin: '20px',fontSize: '2rem', fontWeight: 'bold',font:'#e0e0e0' }}>
            <h1>New Customers Over Time</h1>
            <label htmlFor="interval-select" style={{ fontSize: '1.2rem' ,color: '#e0e0e0'}}>
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

export default NewCustomersChart;
