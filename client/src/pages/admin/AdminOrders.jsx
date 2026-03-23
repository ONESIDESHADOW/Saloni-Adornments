import { useState, useEffect } from "react";
import axios from "axios";
import { CheckCircle, XCircle, Eye } from "lucide-react";
import { useNavigate } from "react-router-dom";

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const { data } = await axios.get("/api/orders");
      setOrders(data);
    } catch (error) {
      console.error("Error fetching orders:", error);
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id, status) => {
    try {
      await axios.put(`/api/orders/${id}/status`, { status });
      fetchOrders();
    } catch (error) {
      alert("Error updating order");
    }
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="font-serif text-3xl text-dark mb-6">Manage Orders</h1>

      {loading ? (
        <div className="text-center py-10">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gold-500 mx-auto"></div>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-4 text-left">Order ID</th>
                <th className="p-4 text-left">Customer</th>
                <th className="p-4 text-left">Total</th>
                <th className="p-4 text-left">Status</th>
                <th className="p-4 text-left">Date</th>
                <th className="p-4 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order._id} className="border-b hover:bg-gray-50">
                  <td className="p-4 text-sm">#{order._id.slice(-8)}</td>
                  <td className="p-4">{order.user?.name}</td>
                  <td className="p-4 font-bold">₹{order.totalPrice}</td>
                  <td className="p-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-bold ${
                        order.isDelivered
                          ? "bg-green-100 text-green-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {order.isDelivered ? "Delivered" : "Pending"}
                    </span>
                  </td>
                  <td className="p-4 text-sm">
                    {new Date(order.createdAt).toLocaleDateString()}
                  </td>
                  <td className="p-4 flex gap-2">
                    {!order.isDelivered && (
                      <button
                        onClick={() => updateStatus(order._id, "delivered")}
                        className="text-green-500"
                        title="Mark as Delivered"
                      >
                        <CheckCircle size={20} />
                      </button>
                    )}
                    <button
                      onClick={()=>navigate(`/admin/orders/${order._id}`)}
                      className="text-blue-500"
                      title="View Details"
                    >
                      <Eye size={20} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AdminOrders;
