import { useState, useEffect, useContext } from "react";
import axios from "axios";
import ProductCard from "../components/ProductCard";
import { Filter, Search, SlidersHorizontal } from "lucide-react";

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState("");
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("default");
  const [showFilters, setShowFilters] = useState(false);

  const categories = [
    "Stud Earrings",
    "Hoop Earrings",
    "Jhumka Earrings",
    "Dangle Earrings",
    "Drop Earrings",
    "Chandbali Earrings",
    "Pearl Earrings",
    "Chandelier Earrings",
    "Ear Cuffs",
    "Ear Climbers",
    "Threader Earrings",
    "Tassel Earrings",
    "Huggie Earrings",
  ];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const params = new URLSearchParams({ category, search });
        const { data } = await axios.get(`/api/products?${params}`);
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [category, search]);

  const filteredProducts = [...products].sort((a, b) => {
    if (sortBy === "price-low") return a.price - b.price;
    if (sortBy === "price-high") return b.price - a.price;
    if (sortBy === "name") return a.name.localeCompare(b.name);
    return 0;
  });

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="font-serif text-4xl text-dark font-bold mb-2">
            Shop All Earrings
          </h1>
          <p className="text-gray-500">Discover our exquisite collection</p>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="flex flex-wrap gap-4 items-center">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center gap-2 text-gold-500 font-medium"
              >
                <Filter size={20} />
                Filters
              </button>

              {showFilters && (
                <select
                  className="border border-gray-300 rounded-lg px-4 py-2"
                  onChange={(e) => setCategory(e.target.value)}
                  value={category}
                >
                  <option value="">All Categories</option>
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              )}

              <div className="relative">
                <input
                  type="text"
                  placeholder="Search products..."
                  className="border border-gray-300 rounded-lg pl-10 pr-4 py-2 w-64"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
                <Search
                  className="absolute left-3 top-2.5 text-gray-400"
                  size={18}
                />
              </div>

              <select
                className="border border-gray-300 rounded-lg px-4 py-2"
                onChange={(e) => setSortBy(e.target.value)}
                value={sortBy}
              >
                <option value="default">Sort By</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="name">Name: A to Z</option>
              </select>
            </div>
          </div>
        </div>

        {/* Products Grid */}
        {loading ? (
          <div className="text-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gold-500 mx-auto"></div>
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-gray-500 text-lg">No products found</p>
            <button
              onClick={() => {
                setCategory("");
                setSearch("");
              }}
              className="mt-4 text-gold-500 underline"
            >
              Clear Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        )}

        {/* Results Count */}
        <div className="mt-8 text-center text-gray-500">
          Showing {filteredProducts.length} product
          {filteredProducts.length !== 1 ? "s" : ""}
        </div>
      </div>
    </div>
  );
};

export default Shop;
