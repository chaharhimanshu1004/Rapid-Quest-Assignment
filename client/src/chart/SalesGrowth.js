// SalesGrowthChart.js
import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const SalesGrowthChart = () => {
    const [data, setData] = useState([]);
    const [interval, setInterval] = useState('daily'); 

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`http://localhost:6002/api/sales/sales-growth-rate?interval=${interval}`);
                const result = await response.json();
                setData(result);
            } catch (error) {
                console.error('Error fetching sales growth rate:', error);
            }
        };

        fetchData();
    }, [interval]); 

    const chartData = {
        labels: data.map(d => d.period),
        datasets: [
            {
                label: 'Growth Rate (%)',
                data: data.map(d => d.growthRate),
                borderColor: 'rgba(75, 192, 192, 1)',
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
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
                        return `Growth Rate: ${context.raw.toFixed(2)}%`;
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
                    text: 'Growth Rate (%)',
                },
                ticks: {
                    callback: function (value) {
                        return `${value}%`;
                    },
                },
            },
        },
    };

    return (
        <div style={{ textAlign: 'center', margin: '20px' ,fontSize: '2rem', fontWeight: 'bold',font:'#f5f5f5'}}>
            <h1>Sales Dashboard</h1>
    <label htmlFor="interval-select" style={{ fontSize: '1.2rem', color: '#f5f5f5', marginRight: '10px' }}>
        Select Interval:
    </label>
    <select
        id="interval-select"
        value={interval}
        onChange={(e) => setInterval(e.target.value)}
        style={{
            fontSize: '1.1rem',
            fontWeight: 'bold',
            padding: '5px 10px',
            borderRadius: '4px',
            border: '1px solid #ccc',
            backgroundColor: '#000000',
            cursor: 'pointer',
            font:'white'
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

export default SalesGrowthChart;
