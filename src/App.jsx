import React, { useState, useEffect } from 'react';
import { 
  MapPin, 
  Phone, 
  Clock, 
  Star, 
  Menu as MenuIcon, 
  X, 
  Instagram, 
  Facebook, 
  ChevronRight,
  Utensils,
  Quote,
  Car,
  MoveUpRight,
  ShoppingCart,
  Trash2,
  Plus,
  Minus,
  Mail,
  Send
} from 'lucide-react';

export default function App() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cart, setCart] = useState([]);

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    date: '',
    guests: '2 People'
  });

  // I've set this to a default link. Paste your real Instagram URL here!
  const INSTAGRAM_URL = "https://instagram.com/";

  const menuItems = [
    { id: 1, title: "Peking Duck", price: 185, category: "Main", img: "https://images.unsplash.com/photo-1563379926898-05f4575a45d8?auto=format&fit=crop&q=80&w=800" },
    { id: 2, title: "Crystal Dim Sum", price: 68, category: "Starter", img: "https://images.unsplash.com/photo-1496116218417-1a781b1c416c?auto=format&fit=crop&q=80&w=800" },
    { id: 3, title: "Kung Pao Chicken", price: 75, category: "Main", img: "https://images.unsplash.com/photo-1585032226651-759b368d7246?auto=format&fit=crop&q=80&w=800" },
    { id: 4, title: "Szechuan Prawns", price: 95, category: "Main", img: "https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&q=80&w=800" },
    { id: 5, title: "Egg Fried Rice", price: 45, category: "Sides", img: "https://images.unsplash.com/photo-1603133872878-684f208fb84b?auto=format&fit=crop&q=80&w=800" },
    { id: 6, title: "Spring Rolls", price: 40, category: "Starter", img: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&q=80&w=800" }
  ];

  const reviews = [
    { name: "Sarah Ahmed", rating: 5, comment: "Absolutely fantastic flavors! Impeccable service.", date: "2 days ago" },
    { name: "Rajesh Kumar", rating: 5, comment: "The food is a must-try. Reminds me of home.", date: "1 week ago" },
    { name: "Michael Chen", rating: 4, comment: "Great ambiance and very friendly staff.", date: "3 days ago" }
  ];

  // Cart Logic
  const addToCart = (product) => {
    const existing = cart.find(item => item.id === product.id);
    if (existing) {
      setCart(cart.map(item => item.id === product.id ? { ...item, qty: item.qty + 1 } : item));
    } else {
      setCart([...cart, { ...product, qty: 1 }]);
    }
    setIsCartOpen(true);
  };

  const updateQty = (id, delta) => {
    setCart(cart.map(item => {
      if (item.id === id) {
        const newQty = Math.max(0, item.qty + delta);
        return newQty === 0 ? null : { ...item, qty: newQty };
      }
      return item;
    }).filter(Boolean));
  };

  const cartTotal = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);

  // WhatsApp Order Submission
  const handleOrderSubmit = () => {
    let orderText = `*Burley's Restaurant - New Food Order*\n\n`;
    cart.forEach(item => {
      orderText += `• ${item.title} x${item.qty} = AED ${item.price * item.qty}\n`;
    });
    orderText += `\n*Total Amount: AED ${cartTotal}*\n\nPlease confirm my order.`;
    const whatsappUrl = `https://wa.me/971565114077?text=${encodeURIComponent(orderText)}`;
    window.open(whatsappUrl, '_blank');
  };

  // WhatsApp Booking Submission
  const handleBookingSubmit = (e) => {
    e.preventDefault();
    const { name, phone, date, guests } = formData;
    const message = `*Burley's Restaurant - Table Reservation*\n\n*Name:* ${name}\n*Phone:* ${phone}\n*Date:* ${date}\n*Guests:* ${guests}\n\nPlease confirm my reservation.`;
    const whatsappUrl = `https://wa.me/971565114077?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  const scrollToSection = (id) => {
    setIsMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-neutral-50 font-sans text-neutral-800 selection:bg-red-900 selection:text-white text-[15px]">
      
      {/* Navigation */}
      <nav className="fixed w-full z-50 bg-white/95 backdrop-blur-md border-b border-neutral-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex-shrink-0 flex items-center cursor-pointer" onClick={() => scrollToSection('home')}>
              <div className="text-2xl font-bold tracking-tighter text-red-900 flex flex-col">
                <span>BURLEY'S</span>
                <span className="text-[10px] font-medium tracking-[0.3em] text-neutral-500 uppercase text-center">Restaurant</span>
              </div>
            </div>

            <div className="hidden md:flex items-center space-x-6">
              {['Home', 'About', 'Menu', 'Gallery', 'Reviews', 'Contact'].map((item) => (
                <button key={item} onClick={() => scrollToSection(item.toLowerCase())} className="text-neutral-600 hover:text-red-700 font-medium transition-colors">
                  {item}
                </button>
              ))}
              <div className="h-6 w-[1px] bg-neutral-200"></div>
              <button onClick={() => setIsCartOpen(true)} className="relative p-2 text-neutral-700 hover:text-red-900 transition-colors">
                <ShoppingCart size={24} />
                {cart.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-600 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full ring-2 ring-white">
                    {cart.reduce((a, b) => a + b.qty, 0)}
                  </span>
                )}
              </button>
              <button onClick={() => scrollToSection('booking')} className="bg-red-900 text-white px-6 py-2.5 rounded-full font-medium hover:bg-red-800 transition-colors shadow-lg">
                Book a Table
              </button>
            </div>

            <div className="md:hidden flex items-center space-x-4">
               <button onClick={() => setIsCartOpen(true)} className="relative p-2 text-neutral-700">
                <ShoppingCart size={24} />
                {cart.length > 0 && <span className="absolute top-0 right-0 bg-red-600 text-white text-[10px] px-1.5 rounded-full">{cart.reduce((a, b) => a + b.qty, 0)}</span>}
              </button>
              <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="text-neutral-600">
                {isMobileMenuOpen ? <X size={28} /> : <MenuIcon size={28} />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Cart Drawer */}
      {isCartOpen && (
        <div className="fixed inset-0 z-[100] overflow-hidden">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setIsCartOpen(false)}></div>
          <div className="absolute right-0 top-0 h-full w-full max-w-md bg-white shadow-2xl flex flex-col transform transition-transform animate-slide-in">
            <div className="p-6 border-b flex justify-between items-center bg-neutral-50">
              <h2 className="text-xl font-bold flex items-center gap-2"><ShoppingCart className="text-red-900" /> Your Order</h2>
              <button onClick={() => setIsCartOpen(false)} className="p-2 hover:bg-neutral-200 rounded-full"><X /></button>
            </div>
            
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {cart.length === 0 ? (
                <div className="text-center py-20">
                  <div className="w-20 h-20 bg-neutral-100 rounded-full flex items-center justify-center mx-auto mb-4 text-neutral-400">
                    <ShoppingCart size={40} />
                  </div>
                  <p className="text-neutral-500 font-medium">Your cart is empty.</p>
                  <button onClick={() => { setIsCartOpen(false); scrollToSection('menu'); }} className="mt-4 text-red-900 font-bold underline">Start Ordering</button>
                </div>
              ) : (
                cart.map(item => (
                  <div key={item.id} className="flex gap-4">
                    <img src={item.img} alt={item.title} className="w-20 h-20 rounded-xl object-cover" />
                    <div className="flex-1">
                      <div className="flex justify-between font-bold text-neutral-900">
                        <h3>{item.title}</h3>
                        <span>AED {item.price * item.qty}</span>
                      </div>
                      <p className="text-xs text-neutral-400 mb-3">{item.category}</p>
                      <div className="flex items-center gap-4">
                        <div className="flex items-center border border-neutral-200 rounded-lg overflow-hidden">
                          <button onClick={() => updateQty(item.id, -1)} className="px-2 py-1 hover:bg-neutral-100"><Minus size={14}/></button>
                          <span className="px-3 py-1 font-bold text-sm border-x border-neutral-200">{item.qty}</span>
                          <button onClick={() => updateQty(item.id, 1)} className="px-2 py-1 hover:bg-neutral-100"><Plus size={14}/></button>
                        </div>
                        <button onClick={() => updateQty(item.id, -item.qty)} className="text-red-600 hover:text-red-800"><Trash2 size={18}/></button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {cart.length > 0 && (
              <div className="p-6 bg-neutral-50 border-t">
                <div className="flex justify-between items-center mb-6 text-xl font-bold">
                  <span>Subtotal</span>
                  <span className="text-red-900 font-black">AED {cartTotal}</span>
                </div>
                <button onClick={handleOrderSubmit} className="w-full bg-green-600 text-white py-4 rounded-2xl font-bold text-lg hover:bg-green-700 transition-all shadow-xl shadow-green-900/20 flex items-center justify-center gap-2">
                  <img src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg" alt="WhatsApp" className="w-6 h-6 invert" />
                  Order on WhatsApp
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Hero Section */}
      <section id="home" className="relative h-screen flex items-center justify-center overflow-hidden pt-20">
        <div className="absolute inset-0">
          <img src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&q=80&w=2000" alt="Restaurant Interior" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-black/60"></div>
        </div>
        <div className="relative z-10 text-center px-4 max-w-4xl animate-fade-in">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">An Exquisite Culinary Experience</h1>
          <p className="text-xl text-neutral-200 mb-8 italic">Authentic flavors located in the vibrant heart of the Gold Souq.</p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button onClick={() => scrollToSection('menu')} className="bg-red-900 text-white px-8 py-4 rounded-full text-lg font-bold hover:scale-105 transition-all shadow-xl">Order Now</button>
            <button onClick={() => scrollToSection('booking')} className="bg-white/10 backdrop-blur-md text-white border border-white/30 px-8 py-4 rounded-full text-lg font-bold hover:bg-white/20 transition-all">Reserve Table</button>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
             <div className="relative">
                <img src="https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&q=80&w=1200" alt="About Burley's" className="rounded-3xl shadow-2xl h-[500px] w-full object-cover" />
                <div className="absolute -bottom-6 -right-6 bg-red-900 text-white p-8 rounded-2xl hidden md:block">
                   <p className="text-4xl font-bold">15+</p>
                   <p className="text-sm opacity-80">Master Chefs</p>
                </div>
             </div>
             <div>
                <h4 className="text-red-900 font-bold uppercase tracking-widest text-sm mb-4">Our Heritage</h4>
                <h2 className="text-4xl font-bold mb-6">Traditional Recipes, Modern Ambience</h2>
                <p className="text-neutral-600 text-lg mb-6">Burley's Restaurant brings an exquisite dining experience to the vibrant heart of the Gold Souq, Dubai.</p>
                <ul className="space-y-4 text-neutral-700">
                   <li className="flex items-center gap-3"><div className="h-2 w-2 bg-red-900 rounded-full"></div> Unforgettable Culinary Flavors</li>
                   <li className="flex items-center gap-3"><div className="h-2 w-2 bg-red-900 rounded-full"></div> Hand-crafted Signature Dishes</li>
                   <li className="flex items-center gap-3"><div className="h-2 w-2 bg-red-900 rounded-full"></div> Premium Dining Experience</li>
                </ul>
             </div>
          </div>
        </div>
      </section>

      {/* Menu & Cart System */}
      <section id="menu" className="py-24 bg-neutral-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Explore Our Menu</h2>
            <p className="text-neutral-500">Add your favorites to cart and order via WhatsApp</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {menuItems.map((item) => (
              <div key={item.id} className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all group flex flex-col h-full">
                <div className="relative overflow-hidden h-64">
                  <img src={item.img} alt={item.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-xs font-bold text-red-900">{item.category}</div>
                </div>
                <div className="p-6 flex-1 flex flex-col">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-xl font-bold text-neutral-900">{item.title}</h3>
                    <span className="text-red-900 font-black">AED {item.price}</span>
                  </div>
                  <p className="text-neutral-500 text-sm mb-6 line-clamp-2">Authentic flavor prepared with the freshest ingredients by our specialty chefs.</p>
                  <button 
                    onClick={() => addToCart(item)}
                    className="mt-auto w-full border-2 border-red-900 text-red-900 py-3 rounded-xl font-bold hover:bg-red-900 hover:text-white transition-all flex items-center justify-center gap-2"
                  >
                    <Plus size={18} /> Add to Order
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Visual Journey (Gallery) */}
      <section id="gallery" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
             <h2 className="text-4xl font-bold text-neutral-900 mb-4">Visual Journey</h2>
             <p className="text-neutral-600">Peek inside the soul of Burley's Restaurant</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 auto-rows-[250px]">
            <div className="md:col-span-2 md:row-span-2 rounded-2xl overflow-hidden shadow-lg group">
              <img src="https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&q=80&w=1200" alt="Gallery 1" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
            </div>
            <div className="rounded-2xl overflow-hidden shadow-lg group">
              <img src="https://images.unsplash.com/photo-1555126634-323283e090fa?auto=format&fit=crop&q=80&w=800" alt="Gallery 2" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
            </div>
            <div className="rounded-2xl overflow-hidden shadow-lg group">
              <img src="https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&q=80&w=1000" alt="Gallery 3" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
            </div>
            <div className="md:col-span-2 rounded-2xl overflow-hidden shadow-lg group">
              <img src="https://images.unsplash.com/photo-1552566626-52f8b828add9?auto=format&fit=crop&q=80&w=1200" alt="Gallery 4" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
            </div>
          </div>
        </div>
      </section>

      {/* Reviews Section */}
      <section id="reviews" className="py-24 bg-neutral-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-16">What Our Guests Say</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {reviews.map((r, i) => (
              <div key={i} className="bg-white p-10 rounded-3xl shadow-sm">
                <div className="flex justify-center mb-6">
                  {[...Array(r.rating)].map((_, i) => <Star key={i} className="text-yellow-500 fill-current" size={20} />)}
                </div>
                <p className="text-lg italic text-neutral-600 mb-8 leading-relaxed">"{r.comment}"</p>
                <p className="font-bold text-neutral-900">{r.name}</p>
                <p className="text-xs text-neutral-400 mt-1 uppercase tracking-tighter">{r.date}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Directions & Location */}
      <section id="location" className="py-24 bg-white border-t">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
           <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div>
                 <h2 className="text-3xl font-bold mb-8">How to reach us</h2>
                 <div className="space-y-8">
                    <div className="flex gap-4">
                       <div className="p-4 bg-red-100 text-red-900 rounded-2xl h-fit"><Car /></div>
                       <div>
                          <h4 className="font-bold text-lg">Nearby Parking</h4>
                          <p className="text-neutral-600 mt-1">Convenient parking options are available throughout the <strong>Gold Souq</strong> area.</p>
                       </div>
                    </div>
                    <div className="flex gap-4">
                       <div className="p-4 bg-red-100 text-red-900 rounded-2xl h-fit"><MoveUpRight /></div>
                       <div>
                          <h4 className="font-bold text-lg">Central Location</h4>
                          <p className="text-neutral-600 mt-1">Easily accessible within the bustling <strong>Gold Souq</strong> commercial district.</p>
                       </div>
                    </div>
                    <div className="flex gap-4">
                       <div className="p-4 bg-red-100 text-red-900 rounded-2xl h-fit"><MapPin /></div>
                       <div>
                          <h4 className="font-bold text-lg">Burley's Restaurant</h4>
                          <p className="text-neutral-600 mt-1">4a Gold Souq, Dubai, UAE.</p>
                       </div>
                    </div>
                 </div>
              </div>
              <div className="h-[400px] rounded-3xl overflow-hidden shadow-2xl relative bg-neutral-100">
                <iframe 
                  title="Burley's Restaurant Location Map"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3608.28383827552!2d55.29525497605175!3d25.267746929114357!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f433f08988a6d%3A0x8e83b4b8f368c741!2sDubai%20Gold%20Souk!5e0!3m2!1sen!2sae!4v1709633000000!5m2!1sen!2sae" 
                  className="w-full h-full border-0 grayscale hover:grayscale-0 transition-all duration-700"
                  allowFullScreen="" 
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
           </div>
        </div>
      </section>

      {/* Booking Form - Time Selection Removed */}
      <section id="booking" className="py-24 bg-neutral-900 text-white">
        <div className="max-w-3xl mx-auto px-4 text-center">
           <h2 className="text-4xl font-bold mb-6">Book a Table</h2>
           <p className="text-neutral-400 mb-12">Confirm your reservation instantly via WhatsApp.</p>
           <form onSubmit={handleBookingSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
              <input 
                type="text" placeholder="Full Name" required 
                className="bg-white/10 border border-white/20 p-4 rounded-xl outline-none focus:border-red-500 transition-all"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
              />
              <input 
                type="tel" placeholder="Phone Number" required 
                className="bg-white/10 border border-white/20 p-4 rounded-xl outline-none focus:border-red-500 transition-all"
                value={formData.phone}
                onChange={(e) => setFormData({...formData, phone: e.target.value})}
              />
              <input 
                type="date" required 
                className="bg-white/10 border border-white/20 p-4 rounded-xl outline-none focus:border-red-500 transition-all [&::-webkit-calendar-picker-indicator]:invert"
                value={formData.date}
                onChange={(e) => setFormData({...formData, date: e.target.value})}
              />
              <select 
                className="bg-white/10 border border-white/20 p-4 rounded-xl outline-none focus:border-red-500 transition-all [&>option]:text-black"
                value={formData.guests}
                onChange={(e) => setFormData({...formData, guests: e.target.value})}
              >
                <option value="1 Person">1 Person</option>
                <option value="2 People">2 People</option>
                <option value="3 People">3 People</option>
                <option value="4+ People">4+ People</option>
              </select>
              <button className="md:col-span-2 bg-red-900 py-4 rounded-xl font-bold text-lg hover:bg-red-800 transition-all shadow-xl shadow-red-900/40">Request Booking</button>
           </form>
        </div>
      </section>

      {/* Premium Footer */}
      <footer id="contact" className="bg-[#0a0a0a] text-white pt-20 pb-10 border-t border-neutral-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
            
            {/* Brand Section */}
            <div className="space-y-6">
              <div className="text-3xl font-bold tracking-tighter text-white flex flex-col">
                <span>BURLEY'S</span>
                <span className="text-[10px] font-medium tracking-[0.4em] text-neutral-500 uppercase">Restaurant</span>
              </div>
              <p className="text-neutral-400 leading-relaxed text-sm">
                Experience the pinnacle of culinary artistry in the heart of Dubai's Gold Souq. We blend tradition with luxury to serve you an unforgettable dining experience.
              </p>
              <div className="flex gap-4">
                <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" className="p-2.5 bg-neutral-900 rounded-full text-neutral-400 hover:text-white hover:bg-red-900 transition-all duration-300">
                  <Instagram size={20} />
                </a>
                <a href="#" className="p-2.5 bg-neutral-900 rounded-full text-neutral-400 hover:text-white hover:bg-red-900 transition-all duration-300">
                  <Facebook size={20} />
                </a>
                <a href={`https://wa.me/971565114077`} className="p-2.5 bg-neutral-900 rounded-full text-neutral-400 hover:text-white hover:bg-green-600 transition-all duration-300">
                  <Phone size={20} />
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-lg font-bold mb-8 relative inline-block">
                Quick Links
                <span className="absolute -bottom-2 left-0 w-12 h-1 bg-red-900 rounded-full"></span>
              </h3>
              <ul className="space-y-4">
                {['Home', 'About', 'Menu', 'Gallery', 'Reviews'].map((item) => (
                  <li key={item}>
                    <button 
                      onClick={() => scrollToSection(item.toLowerCase())}
                      className="text-neutral-400 hover:text-white hover:translate-x-2 transition-all duration-300 flex items-center gap-2"
                    >
                      <ChevronRight size={14} className="text-red-900" /> {item}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h3 className="text-lg font-bold mb-8 relative inline-block">
                Reach Us
                <span className="absolute -bottom-2 left-0 w-12 h-1 bg-red-900 rounded-full"></span>
              </h3>
              <ul className="space-y-6 text-sm">
                <li className="flex gap-4 group cursor-pointer">
                  <div className="p-3 bg-neutral-900 rounded-xl group-hover:bg-red-900/20 group-hover:text-red-500 transition-colors">
                    <MapPin size={18} />
                  </div>
                  <div>
                    <p className="font-bold text-neutral-200">Our Address</p>
                    <p className="text-neutral-400 mt-1">4a Gold Souq, Dubai, UAE</p>
                  </div>
                </li>
                <li className="flex gap-4 group cursor-pointer">
                  <div className="p-3 bg-neutral-900 rounded-xl group-hover:bg-red-900/20 group-hover:text-red-500 transition-colors">
                    <Phone size={18} />
                  </div>
                  <div>
                    <p className="font-bold text-neutral-200">Call/WhatsApp</p>
                    <p className="text-neutral-400 mt-1">+971 56 511 4077</p>
                  </div>
                </li>
                <li className="flex gap-4 group cursor-pointer">
                  <div className="p-3 bg-neutral-900 rounded-xl group-hover:bg-red-900/20 group-hover:text-red-500 transition-colors">
                    <Clock size={18} />
                  </div>
                  <div>
                    <p className="font-bold text-neutral-200">Opening Hours</p>
                    <p className="text-neutral-400 mt-1">Mon - Sun: 11 AM - 12 AM</p>
                  </div>
                </li>
              </ul>
            </div>

            {/* Newsletter */}
            <div>
              <h3 className="text-lg font-bold mb-8 relative inline-block">
                Stay Updated
                <span className="absolute -bottom-2 left-0 w-12 h-1 bg-red-900 rounded-full"></span>
              </h3>
              <p className="text-neutral-400 text-sm mb-6 leading-relaxed">
                Subscribe to get latest updates on our signature seasonal menus and exclusive events.
              </p>
              <div className="relative group">
                <input 
                  type="email" 
                  placeholder="Your Email Address" 
                  className="w-full bg-neutral-900 border border-neutral-800 p-4 rounded-xl outline-none focus:border-red-900 transition-all text-sm"
                />
                <button className="absolute right-2 top-2 p-2.5 bg-red-900 hover:bg-red-800 rounded-lg transition-all duration-300">
                  <Send size={18} />
                </button>
              </div>
            </div>
          </div>

          {/* Copyright Section */}
          <div className="pt-10 border-t border-neutral-900 flex flex-col md:flex-row justify-between items-center gap-6">
            <p className="text-neutral-500 text-xs">
              © {new Date().getFullYear()} <span className="text-neutral-300 font-bold">Burley's Restaurant</span>. All Rights Reserved.
            </p>
            <div className="flex gap-8 text-[10px] uppercase tracking-widest font-bold text-neutral-600">
              <a href="#" className="hover:text-red-900 transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-red-900 transition-colors">Terms of Service</a>
              <a href="#" className="hover:text-red-900 transition-colors">Cookies</a>
            </div>
          </div>
        </div>
      </footer>

      {/* Mobile Menu Backdrop */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-[60] bg-white md:hidden p-8 flex flex-col items-center justify-center space-y-8 animate-fade-in">
           <button onClick={() => setIsMobileMenuOpen(false)} className="absolute top-8 right-8"><X size={32} /></button>
           {['Home', 'About', 'Menu', 'Gallery', 'Reviews', 'Contact'].map((item) => (
              <button key={item} onClick={() => scrollToSection(item.toLowerCase())} className="text-3xl font-bold text-neutral-900">
                {item}
              </button>
            ))}
            <div className="flex gap-8 mt-4">
               <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" className="text-neutral-900 hover:text-red-900">
                 <Instagram size={32} />
               </a>
            </div>
            <button onClick={() => scrollToSection('booking')} className="bg-red-900 text-white px-10 py-4 rounded-full text-xl font-bold">Book a Table</button>
        </div>
      )}

      {/* Custom Styles for Animation */}
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes slideIn {
          from { transform: translateX(100%); }
          to { transform: translateX(0); }
        }
        .animate-slide-in {
          animation: slideIn 0.3s ease-out forwards;
        }
        .animate-fade-in {
          animation: fadeIn 0.4s ease-out forwards;
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
      `}} />
    </div>
  );
}