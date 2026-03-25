import { useState, useEffect, useContext } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { CartContext } from "../context/CartContext";
import { Heart, Eye, Share2, Star } from "lucide-react";
import { getImageUrl } from "../utils/config";


const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useContext(CartContext);
  const [qty, setQty] = useState(1);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const { data } = await axios.get(`/api/products/${id}`);
        setProduct(data);
      } catch (error) {
        console.error("Error fetching product:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  if (loading) return <div className="p-20 text-center">Loading...</div>;
  if (!product)
    return <div className="p-20 text-center">Product not found</div>;

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Image */}
            <div className="bg-gray-100 rounded-xl overflow-hidden">
              <img
                src={getImageUrl(product.images?.[0])}
                // src={`${product.images[0]}`}
                // src={`http://localhost:5000${product.images[0]}`}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Details */}
            <div>
              <div className="mb-4">
                <span className="text-gold-500 text-sm font-medium">
                  {product.category}
                </span>
                <h1 className="font-serif text-3xl text-dark font-bold mt-2">
                  {product.name}
                </h1>
                <p className="text-gray-500 mt-2">{product.subCategory}</p>
              </div>

              <div className="flex items-center gap-2 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className="text-gold-500"
                    size={16}
                    fill="currentColor"
                  />
                ))}
                <span className="text-sm text-gray-500">
                  ({product.numReviews || 0} reviews)
                </span>
              </div>

              <p className="text-gray-600 mb-6">{product.description}</p>

              <div className="text-3xl text-gold-500 font-bold mb-6">
                ₹{product.price}
              </div>

              <div className="mb-6">
                <span className="text-sm text-gray-500">Stock: </span>
                <span className="text-green-500 font-medium">In Stock</span>
              </div>

              <div className="flex gap-4 mb-6">
                <div className="flex items-center border border-gray-300 rounded-lg">
                  <button
                    onClick={() => setQty(Math.max(1, qty - 1))}
                    className="px-4 py-2 hover:bg-gray-100"
                  >
                    -
                  </button>
                  <span className="px-4 py-2 font-medium">{qty}</span>
                  <button
                    onClick={() => setQty(qty + 1)}
                    className="px-4 py-2 hover:bg-gray-100"
                  >
                    +
                  </button>
                </div>
                <button
                  onClick={() => addToCart(product, qty)}
                  className="flex-1 bg-gold-500 text-dark py-3 rounded-lg font-bold hover:bg-gold-100 transition"
                >
                  Add to Cart
                </button>
              </div>

              <div className="flex gap-4">
                <button className="flex items-center gap-2 text-gray-500 hover:text-gold-500">
                  <Heart size={20} />
                  <span>Wishlist</span>
                </button>
                <button className="flex items-center gap-2 text-gray-500 hover:text-gold-500">
                  <Eye size={20} />
                  <span>Quick View</span>
                </button>
                <button className="flex items-center gap-2 text-gray-500 hover:text-gold-500">
                  <Share2 size={20} />
                  <span>Share</span>
                </button>
              </div>
            </div>
          </div>

          {/* Product Info */}
          <div className="border-t border-gray-200 mt-8 pt-8">
            <h3 className="font-bold text-xl mb-4">Product Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-500">Category</p>
                <p className="font-medium">{product.category}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Sub Category</p>
                <p className="font-medium">{product.subCategory}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Price</p>
                <p className="font-medium text-gold-500">₹{product.price}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Availability</p>
                <p className="font-medium text-green-500">In Stock</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
