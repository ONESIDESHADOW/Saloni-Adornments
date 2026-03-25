import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { AuthProvider, AuthContext } from "./context/AuthContext";
import { CartProvider } from "./context/CartContext";
import { useContext } from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Shop from "./pages/Shop";
import ProductDetails from "./pages/ProductDetails";
import Cart from "./pages/Cart";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ForgotPassword from "./pages/ForgotPassword";
import ChangePassword from "./pages/ChangePassword";
import Profile from "./pages/Profile";
import MyOrders from "./pages/MyOrders";
import Checkout from "./pages/Checkout";
import AboutUs from "./pages/AboutUs";
import ContactUs from "./pages/ContactUs";
import OrderDetails from "./pages/OrderDetails";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminProducts from "./pages/admin/AdminProducts";
import AdminOrders from "./pages/admin/AdminOrders";
import AdminUsers from "./pages/admin/AdminUsers";
import AdminOrderDetails from "./pages/admin/AdminOrderDetails";

// Protected Route Component
const ProtectedRoute = ({ children, adminOnly = false }) => {
  const { user, loading } = useContext(AuthContext);
  if (loading)
    return <div className="flex justify-center p-20">Loading...</div>;
  if (!user) return <Navigate to="/login" />;
  if (adminOnly && !user.isAdmin) return <Navigate to="/" />;
  return children;
};

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <Router>
          <div className="flex flex-col min-h-screen">
            <Navbar />
            <main className="flex-grow">
              <Routes>
                {/* Public Routes */}
                <Route path="/" element={<Home />} />
                <Route path="/shop" element={<Shop />} />
                <Route path="/product/:id" element={<ProductDetails />} />
                <Route path="/about" element={<AboutUs />} />
                <Route path="/contact" element={<ContactUs />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />
                <Route path="/order/:id" element={<OrderDetails />} />

                {/* Protected Routes */}
                <Route path="/cart" element={<Cart />} />
                <Route
                  path="/checkout"
                  element={
                    <ProtectedRoute>
                      <Checkout />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/my-orders"
                  element={
                    <ProtectedRoute>
                      <MyOrders />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/profile"
                  element={
                    <ProtectedRoute>
                      <Profile />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/change-password"
                  element={
                    <ProtectedRoute>
                      <ChangePassword />
                    </ProtectedRoute>
                  }
                />

                {/* Admin Routes */}
                <Route
                  path="/admin/dashboard"
                  element={
                    <ProtectedRoute adminOnly>
                      <AdminDashboard />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/admin/products"
                  element={
                    <ProtectedRoute adminOnly>
                      <AdminProducts />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/admin/orders"
                  element={
                    <ProtectedRoute adminOnly>
                      <AdminOrders />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/admin/users"
                  element={
                    <ProtectedRoute adminOnly>
                      <AdminUsers />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/admin/orders/:id"
                  element={
                    <ProtectedRoute adminOnly>
                      <AdminOrderDetails />
                    </ProtectedRoute>
                  }
                />
              </Routes>
            </main>
            <Footer />
          </div>
        </Router>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
