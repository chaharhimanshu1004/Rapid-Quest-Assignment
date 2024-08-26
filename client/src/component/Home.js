import React from 'react'
import { useNavigate } from 'react-router-dom';

const Home = () => {
    const navigate = useNavigate();
    const handleSalesClick = (e) =>{
        e.preventDefault();
        navigate('/sales-growth');
    }
    const handleCustomerTrack = (e) =>{
        e.preventDefault();
        navigate('/customers-track');
    }
    const handleRepeatedCustomers = (e) =>{
        e.preventDefault();
        navigate('/repeated-customers-track');
    }
    const handleCustomersDistribution = (e) =>{
        e.preventDefault();
        navigate('/customers-distribution');
    }
    const customerLifetimeCohort = (e) =>{
        e.preventDefault();
        navigate('/customer-lifetime-value');
    }
  return (
    <div style={{
        textAlign: 'center',
        padding: '40px', 
        backgroundColor: '#1a1a1a', 
        borderRadius: '8px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.3)',
        maxWidth: '1000px', 
        minHeight: '400px', 
        margin: 'auto',
        marginTop: '50px',
        color: '#f9f9f9' 
    }}>
        <h1 style={{
            fontSize: '2.5rem', 
            color: '#e0e0e0', 
            marginBottom: '15px', 
            fontWeight:'bold'
        }}>
            Welcome to the Home Page
        </h1>
        <h2 style={{
            fontSize: '1.8rem', 
            color: '#ccc', 
            marginBottom: '25px' 
        }}>
            This is a sales dashboard application.
        </h2>
        <h3 style={{
            fontSize: '1.5rem', 
            color: '#aaa', 
            marginBottom: '40px' 
        }}>
            IMPORTANT : Wait for sometime before clicking on the buttons below to see the data because backend is deployed on render.
        </h3>
        <button
            onClick={handleSalesClick}
            style={{
                backgroundColor: '#007bff', 
                color: '#fff',
                border: 'none',
                borderRadius: '4px',
                padding: '15px 30px',
                fontSize: '18px', 
                fontWeight: 'bold',
                cursor: 'pointer',
                outline: 'none',
                transition: 'background-color 0.3s ease',
                margin: '5px'
            }}
            onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#0056b3'} // Darker blue on hover
            onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#007bff'}
        >
            Sales Growth
        </button>
    
        <button onClick={handleCustomerTrack} style={{
            backgroundColor: '#007bff',
            color: '#fff',
            border: 'none',
            borderRadius: '4px',
            padding: '15px 30px',
            fontSize: '18px',
            fontWeight: 'bold',
            cursor: 'pointer',
            outline: 'none',
            transition: 'background-color 0.3s ease',
            margin: '5px'
        }}>
            Customer-Track
        </button>
        <button onClick={handleRepeatedCustomers} style={{
            backgroundColor: '#007bff',
            color: '#fff',
            border: 'none',
            borderRadius: '4px',
            padding: '15px 30px',
            fontSize: '18px',
            fontWeight: 'bold',
            cursor: 'pointer',
            outline: 'none',
            transition: 'background-color 0.3s ease',
            margin: '5px'

        }}>
            Repeated Customers Track
        </button>
    
        <button onClick={handleCustomersDistribution} style={{
            backgroundColor: '#007bff',
            color: '#fff',
            border: 'none',
            borderRadius: '4px',
            padding: '15px 30px',
            fontSize: '18px',
            fontWeight: 'bold',
            cursor: 'pointer',
            outline: 'none',
            transition: 'background-color 0.3s ease',
            margin: '5px'
        }}>
            Customers Distribution
        </button>
        <button onClick={customerLifetimeCohort} style={{
            backgroundColor: '#007bff',
            color: '#fff',
            border: 'none',
            borderRadius: '4px',
            padding: '15px 30px',
            fontSize: '18px',
            fontWeight: 'bold',
            cursor: 'pointer',
            outline: 'none',
            transition: 'background-color 0.3s ease',
            margin: '5px'
        }}>
            Customer Lifetime cohort
        </button>
    </div>

  
  )
}

export default Home
