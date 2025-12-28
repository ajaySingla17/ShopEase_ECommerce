import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Cart from './components/Cart';
import Compare from './components/Compare';
import Inquiry from './components/Inquiry';
import OrderDetails from './components/OrderDetails';
import './css/index.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/compare" element={<Compare />} />
        <Route path="/inquiry" element={<Inquiry />} />
        <Route path="/orders/:orderId" element={<OrderDetails />} />
      </Routes>
    </Router>
  );
}

export default App;
