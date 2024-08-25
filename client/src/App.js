
import './App.css';
import SalesGrowthChart from './chart/SalesGrowth';
import { BrowserRouter,Routes , Route } from 'react-router-dom';
import Home from './component/Home';
import NewCustomersChart from './chart/CustomersTrack';

function App() {
  return (

    <div>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home/>} />
          <Route path='/sales-growth' element={<SalesGrowthChart/>} />
          <Route path='/customers-track' element={<NewCustomersChart/>} />
        </Routes>
      </BrowserRouter>
    </div>
   
    
  );
}

export default App;
