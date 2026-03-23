import { Link } from "react-router-dom";
import {
  Instagram,
  Facebook,
  Twitter,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-dark text-gold-100 py-12 mt-12">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Brand */}
        <div>
          <h3 className="font-serif text-2xl mb-4">Saloni's Adornments</h3>
          <p className="text-gray-400 text-sm">
            Exquisite jewelry designed for the modern woman. Quality, elegance,
            and tradition in every piece.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="font-bold mb-4">Quick Links</h4>
          <ul className="space-y-2 text-sm text-gray-400">
            <li>
              <Link to="/shop" className="hover:text-gold-500">
                Shop All
              </Link>
            </li>
            <li>
              <Link to="/about" className="hover:text-gold-500">
                About Us
              </Link>
            </li>
            <li>
              <Link to="/contact" className="hover:text-gold-500">
                Contact
              </Link>
            </li>
            <li>
              <Link to="/my-orders" className="hover:text-gold-500">
                My Orders
              </Link>
            </li>
          </ul>
        </div>

        {/* Categories */}
        <div>
          <h4 className="font-bold mb-4">Categories</h4>
          <ul className="space-y-2 text-sm text-gray-400">
            <li>
              <Link
                to="/shop?category=Stud Earrings"
                className="hover:text-gold-500"
              >
                Stud Earrings
              </Link>
            </li>
            <li>
              <Link
                to="/shop?category=Hoop Earrings"
                className="hover:text-gold-500"
              >
                Hoop Earrings
              </Link>
            </li>
            <li>
              <Link
                to="/shop?category=Jhumka Earrings"
                className="hover:text-gold-500"
              >
                Jhumka Earrings
              </Link>
            </li>
            <li>
              <Link
                to="/shop?category=Chandbali Earrings"
                className="hover:text-gold-500"
              >
                Chandbali Earrings
              </Link>
            </li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 className="font-bold mb-4">Contact Us</h4>
          <ul className="space-y-2 text-sm text-gray-400">
            <li className="flex items-center gap-2">
              <Mail size={16} /> info@saloniadornments.com
            </li>
            <li className="flex items-center gap-2">
              <Phone size={16} /> +91 98765 43210
            </li>
            <li className="flex items-center gap-2">
              <MapPin size={16} /> Mumbai, Maharashtra, India
            </li>
          </ul>
          <div className="flex gap-4 mt-4">
            <Instagram
              className="cursor-pointer hover:text-gold-500"
              size={20}
            />
            <Facebook
              className="cursor-pointer hover:text-gold-500"
              size={20}
            />
            <Twitter className="cursor-pointer hover:text-gold-500" size={20} />
          </div>
        </div>
      </div>
      <div className="text-center text-gray-600 text-xs mt-8 border-t border-gray-800 pt-8">
        © 2026 Saloni Adornments. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
