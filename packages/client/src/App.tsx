import './App.css';
import { Routes, Route } from 'react-router-dom';
import ProductsPage from './pages/ProductsPage';

function App() {
  return (
    <div className="min-h-screen bg-background">
      <Routes>
        <Route path="/" element={<ProductsPage />} />
        <Route
          path="/products/:id/reviews"
          element={<div>Reviews Page (TODO)</div>}
        />
      </Routes>
    </div>
  );
}

export default App;
