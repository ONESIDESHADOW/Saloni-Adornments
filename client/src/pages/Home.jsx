import { useState, useEffect } from 'react';
import axios from 'axios';
import ProductCard from '../components/ProductCard';
import { ArrowRight, Star, Shield, Truck, Headphones, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await axios.get('/api/products');
        setProducts(data.slice(0, 8));
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const features = [
    { icon: Shield, title: 'Authentic Products', desc: '100% genuine jewelry' },
    { icon: Truck, title: 'Free Shipping', desc: 'On orders above ₹5000' },
    { icon: Star, title: 'Premium Quality', desc: 'Handcrafted excellence' },
    { icon: Headphones, title: '24/7 Support', desc: 'Dedicated customer care' },
  ];

  const categories = [
    { name: 'Stud Earrings', image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=400' },
    { name: 'Hoop Earrings', image: 'https://images.unsplash.com/photo-1535632787350-4e68ef0ac584?w=400' },
    { name: 'Jhumka Earrings', image: 'https://images.unsplash.com/photo-1506630448388-4e683c67ddb0?w=400' },
    { name: 'Chandbali', image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=400' },
  ];

  return (
    <div>
      {/* Hero Section */}
      <div className="relative bg-dark h-[600px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-dark via-dark/90 to-dark/70"></div>
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=1920')] bg-cover bg-center opacity-30"></div>
        
        <div className="relative z-10 text-center px-4 max-w-4xl">
          <h1 className="font-serif text-5xl md:text-7xl text-gold-500 mb-6 leading-tight">
            Saloni's <br /> Adornments
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-8">
            Exquisite Jewelry & Accessories for the Modern Woman
          </p>
          <div className="flex flex-col md:flex-row gap-4 justify-center">
            <a href="/shop" className="bg-gold-500 text-dark px-10 py-4 rounded-full font-bold text-lg hover:bg-gold-100 transition-all transform hover:scale-105 shadow-lg">
              Shop Collection
            </a>
            <a href="/about" className="border-2 border-gold-500 text-gold-500 px-10 py-4 rounded-full font-bold text-lg hover:bg-gold-500 hover:text-dark transition-all">
              Learn More
            </a>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="text-center p-6">
                <div className="w-16 h-16 bg-gold-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <feature.icon className="text-white" size={28} />
                </div>
                <h3 className="font-serif text-xl text-dark font-bold mb-2">{feature.title}</h3>
                <p className="text-gray-500">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Categories Section */}
      <div className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="font-serif text-4xl text-center text-dark mb-12">Shop by Category</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((cat, index) => (
              <div key={index} className="group relative overflow-hidden rounded-xl cursor-pointer">
                <Link to={`/shop?category=${cat.name}`}>
                <img src={cat.image} alt={cat.name} className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-dark/80 to-transparent"></div>
                <div className="absolute bottom-4 left-4">
                  <h3 className="text-white font-serif text-2xl font-bold">{cat.name}</h3>
                  <p className="text-gold-500 text-sm mt-1">View Collection →</p>
                </div> 
                </Link>
              </div>
             
            ))}

            <Link
                to="/shop?category=Stud Earrings"
                className="hover:text-gold-500"
              >
                Stud Earrings
              </Link>
          </div>
        </div>
      </div>

      {/* Featured Products */}
      <div className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-12">
            <h2 className="font-serif text-4xl text-dark">Trending Accessories</h2>
            <a href="/shop" className="flex items-center gap-2 text-gold-500 font-bold hover:underline">
              View All <ArrowRight size={20} />
            </a>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {loading ? (
              <div className="col-span-4 text-center py-20">Loading...</div>
            ) : (
              products.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))
            )}
          </div>
        </div>
      </div>

      {/* Newsletter */}
      <div className="py-16 bg-dark text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-serif text-4xl mb-4">Join Our Newsletter</h2>
          <p className="text-gray-400 mb-8">Get exclusive offers and updates</p>
          <div className="flex max-w-md mx-auto gap-4">
            <input type="email" placeholder="Enter your email" className="flex-1 px-6 py-3 rounded-full text-dark" />
            <button className="bg-gold-500 text-dark px-8 py-3 rounded-full font-bold hover:bg-gold-100 transition">Subscribe</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;