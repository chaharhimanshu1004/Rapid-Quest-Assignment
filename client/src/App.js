

import SalesGrowthChart from './chart/SalesGrowth';
import { BrowserRouter,Routes , Route } from 'react-router-dom';
import Home from './component/Home';
import NewCustomersChart from './chart/CustomersTrack';
import RepeatCustomersChart from './chart/RepeatedCustomers';
import CustomersDistribution from './component/CustomersDistribution';
import CustomerLifetimeValueChart from './chart/CohortValue';
import './App.css';


function App() {
  return (

    <div>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home/>} />
          <Route path='/sales-growth' element={<SalesGrowthChart/>} />
          <Route path='/customers-track' element={<NewCustomersChart/>} />
          <Route path='/repeated-customers-track' element={<RepeatCustomersChart/>}/>
          <Route path='/customers-distribution' element={<CustomersDistribution/>}/>
          <Route path='/customer-lifetime-value' element={<CustomerLifetimeValueChart/>}/>
        </Routes>
      </BrowserRouter>
    </div>
   
    
  );
}

export default App;
