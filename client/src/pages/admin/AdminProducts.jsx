import { useState, useEffect } from 'react';
import axios from 'axios';
import { Plus, Edit, Trash2 } from 'lucide-react';

const AdminProducts = () => {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({ 
    name: '', 
    price: '', 
    category: '', 
    subCategory: '', 
    stock: '', 
    description: '',
    images: ['https://via.placeholder.com/300']
  });
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const { data } = await axios.get('/api/products');
      setProducts(data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await axios.put(`/api/products/${editingId}`, form);
      } else {
        await axios.post('/api/products', form);
      }
      fetchProducts();
      resetForm();
    } catch (error) {
      alert('Error saving product');
    }
  };

  const handleEdit = (product) => {
    setForm(product);
    setEditingId(product._id);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        await axios.delete(`/api/products/${id}`);
        fetchProducts();
      } catch (error) {
        alert('Error deleting product');
      }
    }
  };

  const resetForm = () => {
    setForm({ 
      name: '', 
      price: '', 
      category: '', 
      subCategory: '', 
      stock: '', 
      description: '',
      images: ['https://via.placeholder.com/300']
    });
    setEditingId(null);
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="font-serif text-3xl text-dark mb-6">Manage Products</h1>
      
      {/* Add/Edit Form */}
      <div className="bg-white p-6 rounded-lg shadow mb-8">
        <h2 className="text-xl font-bold mb-4">{editingId ? 'Edit Product' : 'Add New Product'}</h2>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input 
            type="text" 
            placeholder="Product Name" 
            className="border p-2 rounded" 
            value={form.name} 
            onChange={(e) => setForm({...form, name: e.target.value})} 
            required 
          />
          <input 
            type="number" 
            placeholder="Price" 
            className="border p-2 rounded" 
            value={form.price} 
            onChange={(e) => setForm({...form, price: e.target.value})} 
            required 
          />
          <input 
            type="text" 
            placeholder="Category" 
            className="border p-2 rounded" 
            value={form.category} 
            onChange={(e) => setForm({...form, category: e.target.value})} 
            required 
          />
          <input 
            type="text" 
            placeholder="Sub Category" 
            className="border p-2 rounded" 
            value={form.subCategory} 
            onChange={(e) => setForm({...form, subCategory: e.target.value})} 
            required 
          />
          <input 
            type="number" 
            placeholder="Stock" 
            className="border p-2 rounded" 
            value={form.stock} 
            onChange={(e) => setForm({...form, stock: e.target.value})} 
            required 
          />
          <textarea 
            placeholder="Description" 
            className="border p-2 rounded md:col-span-2" 
            value={form.description} 
            onChange={(e) => setForm({...form, description: e.target.value})} 
          />
          <div className="md:col-span-2 flex gap-2">
            <button type="submit" className="bg-gold-500 text-dark px-4 py-2 rounded font-bold">
              {editingId ? 'Update' : 'Add Product'}
            </button>
            {editingId && (
              <button type="button" onClick={resetForm} className="bg-gray-500 text-white px-4 py-2 rounded">
                Cancel
              </button>
            )}
          </div>
        </form>
      </div>

      {/* Product List */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-4 text-left">Name</th>
              <th className="p-4 text-left">Category</th>
              <th className="p-4 text-left">Price</th>
              <th className="p-4 text-left">Stock</th>
              <th className="p-4 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product._id} className="border-b">
                <td className="p-4">{product.name}</td>
                <td className="p-4">{product.category}</td>
                <td className="p-4">₹{product.price}</td>
                <td className="p-4">{product.stock}</td>
                <td className="p-4 flex gap-2">
                  <button onClick={() => handleEdit(product)} className="text-blue-500">
                    <Edit size={20} />
                  </button>
                  <button onClick={() => handleDelete(product._id)} className="text-red-500">
                    <Trash2 size={20} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminProducts;