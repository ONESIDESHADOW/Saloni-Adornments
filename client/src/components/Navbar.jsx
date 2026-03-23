import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, User, Menu, X } from 'lucide-react';
import { useContext, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import { CartContext } from '../context/CartContext';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const { getCartCount } = useContext(CartContext);
  const [showMenu, setShowMenu] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="bg-dark text-gold-100 p-4 sticky top-0 z-50 shadow-lg">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 900 300" className="h-16 w-auto">
            <rect width="900" height="300" fill="#0b0f18" />
            <defs>
              <linearGradient id="gold" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stop-color="#d4af37" />
                <stop offset="50%" stop-color="#f6e27a" />
                <stop offset="100%" stop-color="#caa133" />
              </linearGradient>
            </defs>
            <g transform="translate(120,80)">
              <path d="M0 0 Q40 40 0 80 Q-40 40 0 0" fill="none" stroke="url(#gold)" strokeWidth="4" />
              <circle cx="0" cy="95" r="10" fill="url(#gold)" />
              <circle cx="0" cy="-10" r="6" fill="url(#gold)" />
            </g>
            <text x="250" y="140" fontFamily="Playfair Display" fontSize="80" fill="url(#gold)">Saloni's</text>
            <text x="260" y="200" fontFamily="Cinzel" fontSize="48" letterSpacing="6" fill="url(#gold)">ADORNMENTS</text>
            <text x="260" y="240" fontFamily="Arial" fontSize="22" fill="#e5d7a3">Exquisite Jewelry & Accessories</text>
          </svg>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-6">
          <Link to="/" className="hover:text-white transition">Home</Link>
          <Link to="/shop" className="hover:text-white transition">Shop</Link>
          <Link to="/about" className="hover:text-white transition">About</Link>
          <Link to="/contact" className="hover:text-white transition">Contact</Link>
          
          {user ? (
            <>
              <Link to="/my-orders" className="hover:text-white transition">Orders</Link>
              <Link to="/profile" className="hover:text-white transition">Profile</Link>
              {user.isAdmin && (
                <Link to="/admin/dashboard" className="hover:text-white transition">Admin</Link>
              )}
              <button onClick={handleLogout} className="hover:text-white transition">Logout</button>
            </>
          ) : (
            <Link to="/login" className="hover:text-white transition">Login</Link>
          )}

          <Link to="/cart" className="relative hover:text-white transition">
            <ShoppingCart size={24} />
            {getCartCount() > 0 && (
              <span className="absolute -top-2 -right-2 bg-gold-500 text-dark text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                {getCartCount()}
              </span>
            )}
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden text-gold-100"
          onClick={() => setShowMenu(!showMenu)}
        >
          {showMenu ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {showMenu && (
        <div className="md:hidden bg-dark border-t border-gray-800">
          <div className="flex flex-col p-4 space-y-4">
            <Link to="/" className="hover:text-white transition" onClick={() => setShowMenu(false)}>Home</Link>
            <Link to="/shop" className="hover:text-white transition" onClick={() => setShowMenu(false)}>Shop</Link>
            <Link to="/about" className="hover:text-white transition" onClick={() => setShowMenu(false)}>About</Link>
            <Link to="/contact" className="hover:text-white transition" onClick={() => setShowMenu(false)}>Contact</Link>
            
            {user ? (
              <>
                <Link to="/my-orders" className="hover:text-white transition" onClick={() => setShowMenu(false)}>Orders</Link>
                <Link to="/profile" className="hover:text-white transition" onClick={() => setShowMenu(false)}>Profile</Link>
                {user.isAdmin && (
                  <Link to="/admin/dashboard" className="hover:text-white transition" onClick={() => setShowMenu(false)}>Admin</Link>
                )}
                <button onClick={() => {handleLogout(); setShowMenu(false);}} className="hover:text-white transition text-left">Logout</button>
              </>
            ) : (
              <Link to="/login" className="hover:text-white transition" onClick={() => setShowMenu(false)}>Login</Link>
            )}

            <Link to="/cart" className="hover:text-white transition flex items-center gap-2" onClick={() => setShowMenu(false)}>
              <ShoppingCart size={20} />
              Cart {getCartCount() > 0 && `(${getCartCount()})`}
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;