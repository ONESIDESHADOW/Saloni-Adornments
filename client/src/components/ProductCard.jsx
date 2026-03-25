import { Link } from "react-router-dom";
import { Heart, Eye } from "lucide-react";
import { getImageUrl } from "../utils/config";

const ProductCard = ({ product }) => {
  return (
    <div className="group relative bg-white rounded-xl shadow-md hover:shadow-2xl transition-all duration-300 overflow-hidden">
      {/* Image */}
      <div className="relative h-72 overflow-hidden bg-gray-100">
        <Link to={`/product/${product._id}`}>
          <img
            src={getImageUrl(product.images?.[0])}
            // src={`http://localhost:5000${product.images[0]}`}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />
        </Link>

        {/* Quick Actions */}
        <div className="absolute top-4 right-4 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <button className="bg-white p-2 rounded-full shadow hover:bg-gold-500 hover:text-white transition">
            <Heart size={18} />
          </button>
          <button className="bg-white p-2 rounded-full shadow hover:bg-gold-500 hover:text-white transition">
            <Eye size={18} />
          </button>
        </div>

        {/* Badge */}
        <div className="absolute top-4 left-4 bg-gold-500 text-white text-xs px-2 py-1 rounded">
          {product.category}
        </div>
      </div>

      {/* Details */}
      <div className="p-4">
        <Link to={`/product/${product._id}`}>
          <h3 className="font-serif text-lg text-gray-800 font-bold truncate">
            {product.name}
          </h3>
          <p className="text-gray-500 text-sm mt-1">{product.subCategory}</p>
        </Link>
        <div className="flex justify-between items-center mt-3">
          <span className="text-gold-500 font-bold text-xl">
            ₹{product.price}
          </span>
          <span className="text-xs text-green-500 font-medium">In Stock</span>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
