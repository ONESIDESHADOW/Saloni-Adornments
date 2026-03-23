import { useContext } from 'react';
import { CartContext } from '../context/CartContext';
import { Link } from 'react-router-dom';
import { Trash2, Minus, Plus, ShoppingBag, CreditCard } from 'lucide-react';

const Cart = () => {
  const { cart, removeFromCart, updateCartQty, getCartTotal, getCartCount } = useContext(CartContext);

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 py-12 px-4 flex items-center justify-center">
        <div className="text-center">
          <ShoppingBag className="mx-auto h-24 w-24 text-gray-300 mb-6" />
          <h2 className="text-2xl font-bold text-gray-600 mb-4">Your Cart is Empty</h2>
          <Link to="/shop" className="bg-gold-500 text-dark px-8 py-3 rounded-lg font-bold hover:bg-gold-100 transition">
            Start Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <h1 className="font-serif text-3xl text-dark font-bold mb-8">Shopping Cart ({getCartCount()} items)</h1>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {cart.map((item) => (
                <div key={item._id} className="border border-gray-200 rounded-lg p-4 flex gap-4 hover:shadow-md transition">
                  <img 
                    src={item.images[0] || "https://via.placeholder.com/100"} 
                    alt={item.name} 
                    className="w-24 h-24 object-cover rounded-lg"
                  />
                  <div className="flex-1">
                    <Link to={`/product/${item._id}`} className="font-bold text-dark hover:text-gold-500">
                      {item.name}
                    </Link>
                    <p className="text-gray-500 text-sm mt-1">{item.category}</p>
                    <p className="text-gold-500 font-bold mt-2">₹{item.price}</p>
                  </div>
                  <div className="flex flex-col items-end justify-between">
                    <button 
                      onClick={() => removeFromCart(item._id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <Trash2 size={20} />
                    </button>
                    <div className="flex items-center border border-gray-300 rounded-lg">
                      <button 
                        onClick={() => updateCartQty(item._id, item.qty - 1)}
                        className="px-3 py-1 hover:bg-gray-100"
                      >
                        <Minus size={16} />
                      </button>
                      <span className="px-3 py-1 font-medium">{item.qty}</span>
                      <button 
                        onClick={() => updateCartQty(item._id, item.qty + 1)}
                        className="px-3 py-1 hover:bg-gray-100"
                      >
                        <Plus size={16} />
                      </button>
                    </div>
                    <p className="font-bold text-dark">₹{item.price * item.qty}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-gray-50 rounded-xl p-6 sticky top-24">
                <h3 className="font-bold text-xl mb-4">Order Summary</h3>
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="font-medium">₹{getCartTotal()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Shipping</span>
                    <span className="font-medium">Free</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Tax</span>
                    <span className="font-medium">₹{Math.round(getCartTotal() * 0.05)}</span>
                  </div>
                  <div className="border-t border-gray-200 pt-3 flex justify-between">
                    <span className="font-bold text-lg">Total</span>
                    <span className="font-bold text-lg text-gold-500">₹{getCartTotal()}</span>
                  </div>
                </div>
                <Link 
                  to="/checkout" 
                  className="block bg-gold-500 text-dark text-center py-3 rounded-lg font-bold hover:bg-gold-100 transition"
                >
                  Proceed to Checkout
                </Link>
                <Link 
                  to="/shop" 
                  className="block text-center mt-4 text-gold-500 hover:underline"
                >
                  Continue Shopping
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;