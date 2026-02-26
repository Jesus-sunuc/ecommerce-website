import { Route, Routes } from "react-router-dom";
import "./App.css";
import { Checkout } from "./pages/Checkout";
import { Auth } from "./pages/Auth";
import { Home } from "./pages/Home";
import { Navbar } from "./components/Navbar";
import { ProductDetails } from "./pages/ProductDetails";
import { AuthProvider } from "./context/AuthContex";
import { CartProvider } from "./context/CartContext";

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <div className="app">
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/products/:id" element={<ProductDetails />} />
          </Routes>
        </div>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
