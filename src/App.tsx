import React, { useState,useRef } from 'react';
import { ShoppingBag, Clock, Package, Phone, Instagram, Facebook, Twitter, ShoppingCart, User } from 'lucide-react';
import { Star, Gem, Users } from "lucide-react";
import { Cart } from './components/Cart';
import { ProductCard } from './components/ProductCard';
import { AuthModal } from './components/AuthModal';
import { useStore } from './store';
import { Product } from './types';
import { Toaster } from 'react-hot-toast';
import Pro1 from "../pro1.jpg"
import Pro2 from "../pro2.jpg"
import Pro3 from "../pro3.jpg"
import Pro4 from "../pro4.jpg"
import Pro5 from "../pro5.jpg"
import Pro6 from "../pro6.jpg"

// Sample products data
const products: Product[] = [
  {
    id: 1,
    name: "Summer Dress Collection",
    price: 299.99,
    category: "Summer",
    image: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    description: "Elegant summer dress perfect for any occasion"
  },
  {
    id: 2,
    name: "Evening Gown",
    price: 499.99,
    category: "Evening",
    image: "https://images.unsplash.com/photo-1485230895905-ec40ba36b9bc?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    description: "Stunning evening gown for special events"
  },
  {
    id: 3,
    name: "Designer Accessories",
    price: 199.99,
    category: "Accessories",
    image: "https://images.unsplash.com/photo-1495121605193-b116b5b9c5fe?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    description: "Luxurious accessories to complete your look"
  },
  {
    id: 4,
    name: "Vintage Leather Bag",
    price: 399.99,
    category: "Accessories",
    image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    description: "Classic leather bag with modern touches"
  },
  {
    id: 5,
    name: "Silk Blouse Collection",
    price: 249.99,
    category: "Tops",
    image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    description: "Luxurious silk blouses for any occasion"
  },
  {
    id: 6,
    name: "Designer Sunglasses",
    price: 179.99,
    category: "Accessories",
    image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    description: "Premium sunglasses with UV protection"
  },
  {
    id: 7,
    name: "Cocktail Dress",
    price: 349.99,
    category: "Evening",
    image: "https://images.unsplash.com/photo-1539008835657-9e8e9680c956?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    description: "Elegant cocktail dress for special occasions"
  },
  {
    id: 8,
    name: "Winter Coat Collection",
    price: 599.99,
    category: "Winter",
    image: "https://images.unsplash.com/photo-1539533113208-f6df8cc8b543?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    description: "Warm and stylish winter coats"
  },
  {
    id: 9,
    name: "Designer Shoes",
    price: 449.99,
    category: "Shoes",
    image: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    description: "Premium designer shoes for any occasion"
  }
];

const showcaseProducts = [
  { id: 1, name: "Premium Fabric", image:Pro1, description: "High-quality fabric for custom designs." },
  { id: 2, name: "Designer Clothes", image: Pro2, description: "Trendy and stylish apparel for every occasion." },
  { id: 3, name: "Luxury Accessories", image: Pro3, description: "Enhance your look with exclusive accessories." },
  { id: 4, name: "Handcrafted Jewelry", image: Pro4, description: "Unique and elegant handcrafted jewelry pieces." },
  { id: 5, name: "Custom Footwear", image: Pro5, description: "Stylish and comfortable custom-made shoes." },
  { id: 6, name: "Fashionable Handbags", image:Pro6, description: "Chic and trendy handbags for all occasions." }
];

function App() {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const { totalItems, isAuthenticated, user, logout } = useStore();

  const latestCollectionRef = useRef(null);

  const scrollToLatestCollection = () => {
    if (latestCollectionRef.current) {
      latestCollectionRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Toast Container */}
      <Toaster />

      {/* Navigation */}
      <nav className="fixed w-full bg-white z-40 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-light">BOTIQUE</h1>
          <div className="flex items-center space-x-4">
            {isAuthenticated ? (
              <div className="flex items-center space-x-4">
                <span className="text-sm">Welcome, {user?.name}</span>
                <button
                  onClick={logout}
                  className="text-sm hover:underline"
                >
                  Logout
                </button>
              </div>
            ) : (
              <button
                onClick={() => setIsAuthOpen(true)}
                className="flex items-center space-x-1 hover:text-gray-600"
              >
                <User className="w-5 h-5" />
                <span>Sign In</span>
              </button>
            )}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative p-2 hover:bg-gray-100 rounded-full"
            >
              <ShoppingCart className="w-6 h-6" />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-black text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div 
        className="h-screen bg-cover bg-center relative"
        style={{
          backgroundImage: 'url("https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80")'
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        <div className="absolute inset-0 flex flex-col justify-center items-center text-white px-4">
          <h1 className="text-5xl md:text-7xl font-light mb-6 text-center">BOTIQUE</h1>
          <p className="text-xl md:text-2xl mb-8 text-center max-w-2xl">Where luxury meets contemporary fashion. Discover our curated collection of designer pieces.</p>
          <button className="bg-white text-black px-8 py-3 rounded-sm hover:bg-gray-100 transition duration-300" onClick={scrollToLatestCollection}>
            EXPLORE COLLECTION
          </button>
        </div>
      </div>

       {/* Showcase Products Section */}
       <div className="py-20 bg-gray-50">
        <h2 className="text-4xl text-center mb-12">Our Featured Products</h2>
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 px-4">
          {showcaseProducts.map((product) => (
            <div key={product.id} className="text-center p-6 bg-white shadow-lg rounded-lg">
              <img src={product.image} alt={product.name} className="w-full h-56 object-cover rounded" />
              <h3 className="text-xl font-semibold mt-4">{product.name}</h3>
              <p className="text-gray-600 mt-2">{product.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* WhatsApp Contact */}
      <div className="fixed bottom-5 right-5">
        <a
          href="https://wa.me/1234567890"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-green-500 text-white p-4 rounded-full shadow-lg flex items-center justify-center hover:bg-green-600 transition"
        >
          <Phone className="w-6 h-6" />
        </a>
      </div>

      {/* Features Section */}
      <div className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 px-4">
          <div className="text-center">
            <ShoppingBag className="w-12 h-12 mx-auto mb-4 text-gray-800" />
            <h3 className="text-xl font-semibold mb-2">Curated Selection</h3>
            <p className="text-gray-600">Handpicked designer pieces from around the world</p>
          </div>
          <div className="text-center">
            <Clock className="w-12 h-12 mx-auto mb-4 text-gray-800" />
            <h3 className="text-xl font-semibold mb-2">Personal Shopping</h3>
            <p className="text-gray-600">Private appointments with our style experts</p>
          </div>
          <div className="text-center">
            <Package className="w-12 h-12 mx-auto mb-4 text-gray-800" />
            <h3 className="text-xl font-semibold mb-2">Worldwide Shipping</h3>
            <p className="text-gray-600">Express delivery to your doorstep</p>
          </div>
        </div>
      </div>

      {/* Why Choose Us Section */}
      <div className="py-20 bg-gray-50">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-4xl font-bold text-center mb-16 ">Why Choose Our Boutique?</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          
          <div className="text-center p-6 bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300">
            <Star className="w-14 h-14 mx-auto mb-4 " />
            <h3 className="text-xl font-semibold mb-3">Exquisite Quality</h3>
            <p className="text-gray-600">Handpicked premium fabrics crafted by skilled artisans.</p>
          </div>

          <div className="text-center p-6 bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300">
            <ShoppingBag className="w-14 h-14 mx-auto mb-4 " />
            <h3 className="text-xl font-semibold mb-3">Exclusive Collections</h3>
            <p className="text-gray-600">Limited edition boutique designs, curated for trendsetters.</p>
          </div>

          <div className="text-center p-6 bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300">
            <Gem className="w-14 h-14 mx-auto mb-4 " />
            <h3 className="text-xl font-semibold mb-3">Luxury Accessories</h3>
            <p className="text-gray-600">Elegant handbags, jewelry, and accessories to match your style.</p>
          </div>

          <div className="text-center p-6 bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300">
            <Users className="w-14 h-14 mx-auto mb-4 " />
            <h3 className="text-xl font-semibold mb-3">Personalized Styling</h3>
            <p className="text-gray-600">One-on-one fashion consultation to elevate your wardrobe.</p>
          </div>

        </div>
      </div>
    </div>


      {/* Collection Preview */}
      <div ref={latestCollectionRef}  className="py-20 px-4">
        <h2 className="text-4xl text-center mb-16">Latest Collection</h2>
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      <p className='text-center mt-10 text-blue-500 hover:text-blue-700 hover:bg-gray-100'>View More</p>
      </div>

      {/* Contact Section */}
      <div className="bg-gray-900 text-white py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl mb-6">Visit Our Boutique</h2>
              <p className="mb-4">123 Fashion Avenue</p>
              <p className="mb-4">New York, NY 10001</p>
              <div className="flex items-center mb-4">
                <Phone className="w-5 h-5 mr-2" />
                <p>+1 (555) 123-4567</p>
              </div>
              <div className="flex space-x-4 mt-8">
                <Instagram className="w-6 h-6 cursor-pointer hover:text-gray-300" />
                <Facebook className="w-6 h-6 cursor-pointer hover:text-gray-300" />
                <Twitter className="w-6 h-6 cursor-pointer hover:text-gray-300" />
              </div>
            </div>
            <div>
              <h2 className="text-3xl mb-6">Book an Appointment</h2>
              <form className="space-y-4">
                <input
                  type="text"
                  placeholder="Name"
                  className="w-full p-2 bg-gray-800 border border-gray-700 text-white"
                />
                <input
                  type="email"
                  placeholder="Email"
                  className="w-full p-2 bg-gray-800 border border-gray-700 text-white"
                />
                <textarea
                  placeholder="Message"
                  rows={4}
                  className="w-full p-2 bg-gray-800 border border-gray-700 text-white"
                ></textarea>
                <button className="bg-white text-black px-8 py-3 hover:bg-gray-200 transition duration-300">
                  SEND MESSAGE
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Shopping Cart */}
      <Cart isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />

      {/* Auth Modal */}
      <AuthModal isOpen={isAuthOpen} onClose={() => setIsAuthOpen(false)} />
    </div>
  );
}

export default App;