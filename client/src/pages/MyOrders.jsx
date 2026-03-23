import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Package, CheckCircle, Clock, Truck } from 'lucide-react';

const MyOrders = () => {
  const { user } = useContext(AuthContext);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const { data } = await axios.get('/api/orders/myorders');
        setOrders(data);
      } catch (error) {
        console.error('Error fetching orders:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  if (!user) return <div className="p-20 text-center">Loading...</div>;

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="text-center mb-8">
            <h1 className="font-serif text-3xl text-dark font-bold">My Orders</h1>
            <p className="text-gray-500 mt-2">View and track your orders</p>
          </div>

          {loading ? (
            <div className="text-center py-10">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gold-500 mx-auto"></div>
            </div>
          ) : orders.length === 0 ? (
            <div className="text-center py-10">
              <Package className="mx-auto h-16 w-16 text-gray-400 mb-4" />
              <p className="text-gray-500 mb-4">No orders yet</p>
              <Link to="/shop" className="text-gold-500 underline font-medium">Start Shopping</Link>
            </div>
          ) : (
            <div className="space-y-4">
              {orders.map((order) => (
                <div key={order._id} className="border border-gray-200 rounded-lg p-6 hover:shadow-lg transition">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="font-bold text-lg">Order #{order._id.slice(-8)}</h3>
                      <p className="text-gray-500 text-sm">
                        {new Date(order.createdAt).toLocaleDateString()} at{' '}
                        {new Date(order.createdAt).toLocaleTimeString()}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-gold-500">₹{order.totalPrice}</p>
                      <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                        order.isDelivered ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                      }`}>
                        {order.isDelivered ? 'Delivered' : 'Pending'}
                      </span>
                    </div>
                  </div>

                  <div className="border-t border-gray-200 pt-4">
                    <h4 className="font-bold text-sm mb-2">Items:</h4>
                    <div className="space-y-2">
                      {order.orderItems.map((item, index) => (
                        <div key={index} className="flex justify-between text-sm">
                          <span>{item.name} x {item.qty}</span>
                          <span>₹{item.price * item.qty}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="border-t border-gray-200 pt-4 mt-4">
                    <h4 className="font-bold text-sm mb-2">Shipping Address:</h4>
                    <p className="text-sm text-gray-600">
                      {order.shippingAddress.address}, {order.shippingAddress.city},{' '}
                      {order.shippingAddress.state} {order.shippingAddress.postalCode},{' '}
                      {order.shippingAddress.country}
                    </p>
                  </div>

                  <div className="border-t border-gray-200 pt-4 mt-4 flex justify-between items-center">
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      {order.isDelivered ? (
                        <CheckCircle className="text-green-500" size={16} />
                      ) : (
                        <Clock className="text-yellow-500" size={16} />
                      )}
                      <span>{order.isDelivered ? 'Delivered' : 'Processing'}</span>
                    </div>
                    <Link to={`/order/${order._id}`} className="text-gold-500 text-sm font-medium hover:underline">
                      View Details
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyOrders;