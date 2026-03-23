const AboutUs = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <h1 className="font-serif text-4xl text-dark font-bold mb-8 text-center">About Saloni's Adornments</h1>
          
          <div className="prose prose-lg">
            <p className="text-gray-600 mb-6">
              Welcome to Saloni's Adornments, where tradition meets modern elegance. We are passionate about creating exquisite jewelry pieces that adorn and empower women.
            </p>

            <h2 className="text-2xl font-bold text-dark mb-4">Our Story</h2>
            <p className="text-gray-600 mb-6">
              Founded with a vision to bring authentic, handcrafted jewelry to modern women, Saloni's Adornments has grown into a trusted name in the jewelry industry. Every piece tells a story of craftsmanship, quality, and timeless beauty.
            </p>

            <h2 className="text-2xl font-bold text-dark mb-4">Our Mission</h2>
            <p className="text-gray-600 mb-6">
              To provide women with authentic, high-quality jewelry that enhances their natural beauty while celebrating traditional craftsmanship.
            </p>

            <h2 className="text-2xl font-bold text-dark mb-4">Why Choose Us?</h2>
            <ul className="list-disc list-inside text-gray-600 space-y-2 mb-6">
              <li>100% Authentic Products</li>
              <li>Handcrafted with Care</li>
              <li>Secure Payment Options</li>
              <li>Free Shipping on Orders Above ₹5000</li>
              <li>24/7 Customer Support</li>
            </ul>

            <h2 className="text-2xl font-bold text-dark mb-4">Contact Us</h2>
            <p className="text-gray-600">
              Have questions? We'd love to hear from you! Reach out to us at info@saloniadornments.com or call us at +91 98765 43210.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;