import { useState, useEffect } from 'react';
import axios from 'axios';
import { DollarSign, Users, ShoppingBag, Package, TrendingUp, Activity, IndianRupee } from 'lucide-react';

const AdminDashboard = () => {
  const [stats, setStats] = useState({ orders: 0, users: 0, products: 0, sales: 0, pending: 0 });
  const [recentOrders, setRecentOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const [ordersRes, usersRes, productsRes] = await Promise.all([
        axios.get('/api/orders'),
        axios.get('/api/admin/users'),
        axios.get('/api/products')
      ]);
      
      const orders = ordersRes.data;
      const pending = orders.filter(o => !o.isDelivered).length;
      
      setStats({
        orders: orders.length,
        users: usersRes.data.length,
        products: productsRes.data.length,
        sales: orders.reduce((acc, order) => acc + order.totalPrice, 0),
        pending: pending
      });
      
      setRecentOrders(orders.slice(0, 5));
    } catch (error) {
      console.error('Error fetching stats:', error);
    } finally {
      setLoading(false);
    }
  };

  const statCards = [
    { title: 'Total Sales', value: `₹${stats.sales.toLocaleString()}`, icon: IndianRupee, color: 'bg-gradient-to-r from-gold-500 to-gold-700', trend: '+12%' },
    { title: 'Total Orders', value: stats.orders, icon: ShoppingBag, color: 'bg-gradient-to-r from-blue-500 to-blue-700', trend: '+8%' },
    { title: 'Total Users', value: stats.users, icon: Users, color: 'bg-gradient-to-r from-green-500 to-green-700', trend: '+15%' },
    { title: 'Pending Orders', value: stats.pending, icon: Activity, color: 'bg-gradient-to-r from-orange-500 to-orange-700', trend: '-3%' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="fixed left-0 top-0 h-full w-64 bg-dark text-white p-6 hidden md:block">
        <div className="mb-8">
          <h2 className="font-serif text-2xl text-gold-500">Saloni Admin</h2>
          <p className="text-gray-400 text-sm">Dashboard</p>
        </div>
        <nav className="space-y-2">
          <a href="/admin/dashboard" className="block px-4 py-3 bg-gold-500 text-dark rounded-lg font-bold">Dashboard</a>
          <a href="/admin/products" className="block px-4 py-3 hover:bg-gray-800 rounded-lg">Products</a>
          <a href="/admin/orders" className="block px-4 py-3 hover:bg-gray-800 rounded-lg">Orders</a>
          <a href="/admin/users" className="block px-4 py-3 hover:bg-gray-800 rounded-lg">Users</a>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="md:ml-64 p-8">
        {/* Header */}
        <header className="flex justify-between items-center mb-8">
          <div>
            <h1 className="font-serif text-3xl text-dark">Dashboard Overview</h1>
            <p className="text-gray-500">Welcome back, Admin</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-gold-500 rounded-full flex items-center justify-center text-white font-bold">A</div>
              <span className="text-dark font-bold">Admin</span>
            </div>
          </div>
        </header>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {statCards.map((stat, index) => (
            <div key={index} className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-lg ${stat.color} text-white`}>
                  <stat.icon size={24} />
                </div>
                <span className="text-green-500 text-sm font-bold">{stat.trend}</span>
              </div>
              <h3 className="text-gray-500 text-sm font-medium">{stat.title}</h3>
              <p className="text-2xl font-bold text-dark mt-1">{stat.value}</p>
            </div>
          ))}
        </div>

        {/* Recent Orders */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="font-serif text-xl text-dark">Recent Orders</h2>
            <a href="/admin/orders" className="text-gold-500 text-sm font-bold hover:underline">View All</a>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4 text-gray-500 font-medium">Order ID</th>
                  <th className="text-left py-3 px-4 text-gray-500 font-medium">Customer</th>
                  <th className="text-left py-3 px-4 text-gray-500 font-medium">Amount</th>
                  <th className="text-left py-3 px-4 text-gray-500 font-medium">Status</th>
                  <th className="text-left py-3 px-4 text-gray-500 font-medium">Date</th>
                </tr>
              </thead>
              <tbody>
                {recentOrders.map((order) => (
                  <tr key={order._id} className="border-b hover:bg-gray-50">
                    <td className="py-3 px-4 text-dark font-medium">#{order._id.slice(-8)}</td>
                    <td className="py-3 px-4 text-gray-600">{order.user?.name}</td>
                    <td className="py-3 px-4 text-dark font-bold">₹{order.totalPrice}</td>
                    <td className="py-3 px-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                        order.isDelivered ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                      }`}>
                        {order.isDelivered ? 'Delivered' : 'Pending'}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-gray-500 text-sm">{new Date(order.createdAt).toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;