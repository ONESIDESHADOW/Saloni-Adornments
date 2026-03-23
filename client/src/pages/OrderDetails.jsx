import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const OrderDetails = () => {
  const { id } = useParams();
  const [order, setOrder] = useState(null);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const { data } = await axios.get(`/api/orders/${id}`);
        setOrder(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchOrder();
  }, [id]);

  if (!order) return <div>Loading...</div>;

  return (
    <div className="p-10">
      <h1 className="text-2xl font-bold">Order Details</h1>

      <p><strong>Order ID:</strong> {order._id}</p>
      <p><strong>Total:</strong> ₹{order.totalPrice}</p>

      <h3 className="mt-4 font-bold">Items:</h3>
      {order.orderItems.map((item, i) => (
        <div key={i}>
          {item.name} x {item.qty}
        </div>
      ))}
    </div>
  );
};

export default OrderDetails;