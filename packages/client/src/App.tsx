import './App.css';
import { Routes, Route } from 'react-router-dom';
import ProductsPage from './pages/ProductsPage';
import ReviewsPage from './pages/ReviewsPage';

function App() {
  return (
    <div className="min-h-screen bg-background">
      <Routes>
        <Route path="/" element={<ProductsPage />} />
        <Route path="/products/:id/reviews" element={<ReviewsPage />} />
      </Routes>
    </div>
  );
}

export default App;
