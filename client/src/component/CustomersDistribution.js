import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";

// Register the components you need for Chart.js
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function CustomersDistribution() {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:6002/api/customers/customers-distribution");
        const data = await response.json();
        
        const formattedData = data.map(item => ({
          city: item._id, 
          customerCount: item.count, 
        }));

        setChartData(formattedData);
      } catch (error) {
        console.error("Error fetching customer distribution data:", error);
      }
    };

    fetchData();
  }, []);

  const data = {
    labels: chartData.map(item => item.city),
    datasets: [
      {
        label: "Customers",
        data: chartData.map(item => item.customerCount),
        backgroundColor: "#2563eb",
        borderColor: "#1d4ed8",
        borderWidth: 1,
      },
    ],
  };

  const options = {
    plugins: {
      title: {
        display: true,
        text: 'Customer Distribution by City',
        font: {
          size: 20,
        },
        padding: {
          bottom: 20,
        },
      },
      legend: {
        position: 'top',
      },
      tooltip: {
        callbacks: {
          label: function(tooltipItem) {
            return `${tooltipItem.dataset.label}: ${tooltipItem.raw}`;
          }
        }
      }
    },
    scales: {
      x: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'City',
        },
        ticks: {
          autoSkip: false,
        }
      },
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Customer Count',
        }
      }
    }
  };

  return (
    <div style={{ textAlign: "center", padding: "20px", backgroundColor: "#000000", color: "#fff" }}>
      <h1 style={{ fontSize: "32px", fontWeight: 'bold', marginBottom: '20px' }}>Customer Distribution by City</h1>
      <div style={{display:'flex',gap:'10px', maxWidth: '100vw', margin: '0 auto', height: '80vh',justifyContent:'center' }}>
        <Bar data={data} options={options} style={{ height: '100%', width: '100%' }} />
      </div>
    </div>
  );
}
