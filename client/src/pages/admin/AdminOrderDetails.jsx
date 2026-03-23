import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { CheckCircle, Clock } from "lucide-react";

const AdminOrderDetails = () => {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const { data } = await axios.get(`/api/orders/${id}`);
        setOrder(data);
      } catch (error) {
        console.error("Error fetching order:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [id]);

  if (loading) {
    return (
      <div className="text-center py-20">
        <div className="animate-spin h-10 w-10 border-b-2 mx-auto"></div>
      </div>
    );
  }

  if (!order) {
    return <div className="text-center py-20">Order not found</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-xl p-6">

        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">
            Order #{order._id.slice(-8)}
          </h1>
          <span
            className={`px-3 py-1 text-sm rounded-full font-bold ${
              order.isDelivered
                ? "bg-green-100 text-green-700"
                : "bg-yellow-100 text-yellow-700"
            }`}
          >
            {order.isDelivered ? "Delivered" : "Pending"}
          </span>
        </div>

        {/* Customer Info */}
        <div className="mb-6">
          <h2 className="font-bold mb-2">Customer Info</h2>
          <p>Name: {order.user?.name}</p>
          <p>Email: {order.user?.email}</p>
          <p>Phone: {order.user?.phone}</p>
        </div>

        {/* Shipping */}
        <div className="mb-6">
          <h2 className="font-bold mb-2">Shipping Address</h2>
          <p>
            {order.shippingAddress.address}, {order.shippingAddress.city},{" "}
            {order.shippingAddress.state} {order.shippingAddress.postalCode},{" "}
            {order.shippingAddress.country}
          </p>
        </div>

        {/* Items */}
        <div className="mb-6">
          <h2 className="font-bold mb-2">Order Items</h2>
          <div className="space-y-2">
            {order.orderItems.map((item, i) => (
              <div
                key={i}
                className="flex justify-between border-b pb-2"
              >
                <span>
                  {item.name} x {item.qty}
                </span>
                <span>₹{item.price * item.qty}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Payment */}
        <div className="mb-6">
          <h2 className="font-bold mb-2">Payment</h2>
          <p>Method: {order.paymentMethod}</p>
          <p className="font-bold text-lg mt-2">
            Total: ₹{order.totalPrice}
          </p>
        </div>

        {/* Status */}
        <div className="flex items-center gap-2 text-sm">
          {order.isDelivered ? (
            <CheckCircle className="text-green-500" />
          ) : (
            <Clock className="text-yellow-500" />
          )}
          <span>
            {order.isDelivered
              ? `Delivered at ${new Date(order.deliveredAt).toLocaleString()}`
              : "Processing Order"}
          </span>
        </div>
      </div>
    </div>
  );
};

export default AdminOrderDetails;