import React from 'react'
import { useNavigate } from 'react-router-dom';

const Home = () => {
    const navigate = useNavigate();
    const handleSalesClick = (e) =>{
        e.preventDefault();
        navigate('/sales-growth');


    }
  return (
    <div style={{textAlign:'center'}}>
        <h1>Welcome to the Home Page</h1>
        <h2>This is a simple sales dashboard application.</h2>
        <h3>Click on the Sales Growth link in the navigation bar to view the sales growth chart.</h3>
        <button onClick={handleSalesClick} style={{marginTop:'30px', padding:'10px 10px', fontSize:'16px', fontWeight:'bold',cursor:'pointer'}}>Sales Growth</button>
    </div>
  )
}

export default Home
