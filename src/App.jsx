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
  Send,
  Youtube,
  Share2
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

  // UPDATED RESTAURANT DETAILS
  const RESTAURANT_NAME = "PLOYS ZAAB";
  const PHONE_NUMBER = "+971 52 401 9988";
  const WHATSAPP_NUMBER = "971524019988"; 
  const ADDRESS = "Souk Al Marfa, Deira Islands, Dubai, UAE";
  const MAPS_URL = "https://www.google.com/maps/search/?api=1&query=Ploys+Zaab+Souk+Al+Marfa+Dubai";
  const MAP_EMBED_URL = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3606.843641321487!2d55.2946253!3d25.3111406!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f430043534b41%3A0x8e87d0c36b8e66e8!2sSouk%20Al%20Marfa!5e0!3m2!1sen!2sae!4v1710000000000!5m2!1sen!2sae";

  const SOCIAL_LINKS = {
    facebook: "https://facebook.com/ployszaab.dubai",
    instagram: "https://instagram.com/ployszaab_uae",
    youtube: "https://youtube.com/@ployszaab",
    tiktok: "https://tiktok.com/@ployszaab"
  };

  const menuItems = [
    { 
      id: 1, 
      title: "Zaab Special Fried Rice", 
      price: 35, 
      category: "Main", 
      img: "https://images.unsplash.com/photo-1512058564366-18510be2db19?q=80&w=800&auto=format&fit=crop" 
    },
    { 
      id: 2, 
      title: "Spicy Kalasan Chicken", 
      price: 38, 
      category: "Main", 
      img: "https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?q=80&w=800&auto=format&fit=crop" 
    },
    { id: 3, title: "Signature Satay Platter", price: 28, category: "Grill", img: "https://images.unsplash.com/photo-1512058564366-18510be2db19?q=80&w=800&auto=format&fit=crop" },
    { id: 4, title: "Thai-Indo Fusion Salad", price: 25, category: "Salad", img: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=800&auto=format&fit=crop" },
    { id: 5, title: "Ploys Zaab Beef Soup", price: 32, category: "Soup", img: "https://images.unsplash.com/photo-1547592166-23ac45744acd?q=80&w=800&auto=format&fit=crop" },
    { id: 6, title: "Mango Sticky Rice", price: 15, category: "Dessert", img: "https://images.unsplash.com/photo-1563805042-7684c019e1cb?q=80&w=800&auto=format&fit=crop" }
  ];

  const reviews = [
    { id: 1, name: "Aisha M.", rating: 5, comment: "The most authentic spicy flavors in Souk Al Marfa! A hidden gem.", date: "2 days ago" },
    { id: 2, name: "Kevin L.", rating: 5, comment: "Ploys Zaab never disappoints. The service is fast and the food is always fresh.", date: "1 week ago" },
    { id: 3, name: "Sarah J.", rating: 4, comment: "Great location and even better food. The spicy chicken is a must-try!", date: "3 weeks ago" }
  ];

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

  const handleOrderSubmit = () => {
    let orderText = `*${RESTAURANT_NAME} - New Order*\n\n`;
    cart.forEach(item => {
      orderText += `• ${item.title} x${item.qty} = AED ${item.price * item.qty}\n`;
    });
    orderText += `\n*Total Amount: AED ${cartTotal}*\n\nPlease confirm my order.`;
    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(orderText)}`;
    window.open(whatsappUrl, '_blank');
  };

  const handleBookingSubmit = (e) => {
    e.preventDefault();
    const { name, phone, date, guests } = formData;
    const message = `*${RESTAURANT_NAME} - Table Reservation*\n\n*Name:* ${name}\n*Phone:* ${phone}\n*Date:* ${date}\n*Guests:* ${guests}\n\nPlease confirm my booking at Souk Al Marfa branch.`;
    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
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
    <div className="min-h-screen bg-neutral-50 font-sans text-neutral-800 selection:bg-red-600 selection:text-white text-[15px]">
      
      {/* Navigation */}
      <nav className="fixed w-full z-50 bg-white/95 backdrop-blur-md border-b border-neutral-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex-shrink-0 flex items-center cursor-pointer" onClick={() => scrollToSection('home')}>
              <div className="text-xl sm:text-2xl font-black tracking-tighter text-red-700 flex flex-col uppercase">
                <span>{RESTAURANT_NAME}</span>
                <span className="text-[10px] font-medium tracking-[0.1em] text-neutral-500 uppercase text-center">Souk Al Marfa · Dubai</span>
              </div>
            </div>

            <div className="hidden lg:flex items-center space-x-6">
              {['Home', 'About', 'Menu', 'Gallery', 'Reviews', 'Contact'].map((item) => (
                <button key={item} onClick={() => scrollToSection(item.toLowerCase())} className="text-neutral-600 hover:text-red-700 font-medium transition-colors">
                  {item}
                </button>
              ))}
              <div className="h-6 w-[1px] bg-neutral-200"></div>
              
              <div className="flex items-center gap-3 mr-2">
                <a href={SOCIAL_LINKS.facebook} target="_blank" rel="noreferrer" className="text-neutral-400 hover:text-blue-600 transition-colors">
                  <Facebook size={20} />
                </a>
                <a href={SOCIAL_LINKS.instagram} target="_blank" rel="noreferrer" className="text-neutral-400 hover:text-pink-600 transition-colors">
                  <Instagram size={20} />
                </a>
              </div>

              <button onClick={() => setIsCartOpen(true)} className="relative p-2 text-neutral-700 hover:text-red-700 transition-colors">
                <ShoppingCart size={24} />
                {cart.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-600 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full ring-2 ring-white">
                    {cart.reduce((a, b) => a + b.qty, 0)}
                  </span>
                )}
              </button>
              <button onClick={() => scrollToSection('booking')} className="bg-red-700 text-white px-6 py-2.5 rounded-full font-medium hover:bg-red-800 transition-colors shadow-lg">
                Book a Table
              </button>
            </div>

            <div className="lg:hidden flex items-center space-x-4">
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
              <h2 className="text-xl font-bold flex items-center gap-2"><ShoppingCart className="text-red-700" /> Your Order</h2>
              <button onClick={() => setIsCartOpen(false)} className="p-2 hover:bg-neutral-200 rounded-full"><X /></button>
            </div>
            
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {cart.length === 0 ? (
                <div className="text-center py-20">
                  <div className="w-20 h-20 bg-neutral-100 rounded-full flex items-center justify-center mx-auto mb-4 text-neutral-400">
                    <ShoppingCart size={40} />
                  </div>
                  <p className="text-neutral-500 font-medium">Your cart is empty.</p>
                  <button onClick={() => { setIsCartOpen(false); scrollToSection('menu'); }} className="mt-4 text-red-700 font-bold underline">Order Food Now</button>
                </div>
              ) : (
                cart.map(item => (
                  <div key={item.id} className="flex gap-4">
                    <img src={item.img} alt={item.title} className="w-20 h-20 rounded-xl object-cover" />
                    <div className="flex-1">
                      <div className="flex justify-between font-bold text-neutral-900">
                        <h3 className="text-sm">{item.title}</h3>
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
                  <span className="text-red-700 font-black">AED {cartTotal}</span>
                </div>
                <button onClick={handleOrderSubmit} className="w-full bg-green-600 text-white py-4 rounded-2xl font-bold text-lg hover:bg-green-700 transition-all shadow-xl flex items-center justify-center gap-2">
                  Order via WhatsApp
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Hero Section */}
      <section id="home" className="relative h-screen flex items-center justify-center overflow-hidden pt-20">
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=2000&auto=format&fit=crop" 
            alt="Ploys Zaab Authentic Cuisine" 
            className="w-full h-full object-cover" 
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/40 to-neutral-900/95"></div>
        </div>
        <div className="relative z-10 text-center px-4 max-w-4xl animate-fade-in">
          <div className="mb-6 inline-block bg-red-700/20 backdrop-blur-sm border border-red-700/30 px-4 py-1.5 rounded-full text-red-400 text-sm font-bold uppercase tracking-widest">
            Experience the Zaab Lifestyle
          </div>
          <h1 className="text-5xl md:text-8xl font-black text-white mb-6 tracking-tighter uppercase leading-[0.9]">
            {RESTAURANT_NAME}
          </h1>
          <p className="text-lg md:text-2xl text-neutral-300 mb-10 italic font-light max-w-2xl mx-auto leading-relaxed">
            Authentic spices, vibrant flavors, and true hospitality at the heart of Souk Al Marfa.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-5">
            <button onClick={() => scrollToSection('menu')} className="bg-red-700 text-white px-10 py-4 rounded-full text-lg font-bold hover:bg-red-600 hover:scale-105 transition-all shadow-2xl">
              Explore Menu
            </button>
            <button onClick={() => scrollToSection('booking')} className="bg-white/10 backdrop-blur-md text-white border border-white/20 px-10 py-4 rounded-full text-lg font-bold hover:bg-white/20 transition-all">
              Reservation
            </button>
          </div>
          
          <div className="mt-12 flex justify-center gap-6">
             <a href={SOCIAL_LINKS.instagram} target="_blank" rel="noreferrer" className="flex items-center gap-2 text-white/60 hover:text-white transition-colors">
               <Instagram size={20} /> <span className="text-xs font-bold uppercase tracking-widest">Instagram</span>
             </a>
             <a href={SOCIAL_LINKS.facebook} target="_blank" rel="noreferrer" className="flex items-center gap-2 text-white/60 hover:text-white transition-colors">
               <Facebook size={20} /> <span className="text-xs font-bold uppercase tracking-widest">Facebook</span>
             </a>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
             <div className="relative">
                <img src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=1200&auto=format&fit=crop" alt="Ploys Zaab Kitchen" className="rounded-3xl shadow-2xl h-[500px] w-full object-cover" />
                <div className="absolute -bottom-6 -right-6 bg-red-700 text-white p-8 rounded-2xl hidden md:block text-center shadow-2xl">
                   <p className="text-4xl font-bold">SPICY</p>
                   <p className="text-sm opacity-80 uppercase tracking-widest">True Zaab Flavor</p>
                </div>
             </div>
             <div>
                <h4 className="text-red-700 font-bold uppercase tracking-widest text-sm mb-4">Our Story</h4>
                <h2 className="text-4xl font-bold mb-6">Thai-Indo Fusion at Souk Al Marfa</h2>
                <p className="text-neutral-600 text-lg mb-6 leading-relaxed">Located in the vibrant Souk Al Marfa, {RESTAURANT_NAME} brings you an explosion of "Zaab" flavors—a perfect blend of spicy, sour, and savory dishes that define Southeast Asian soul food.</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8">
                  <div className="flex items-center gap-3 p-4 bg-neutral-50 rounded-2xl border border-neutral-100">
                    <div className="h-10 w-10 bg-red-100 text-red-700 rounded-full flex items-center justify-center"><Utensils size={20}/></div>
                    <span className="font-bold text-neutral-700">Fresh Ingredients</span>
                  </div>
                  <div className="flex items-center gap-3 p-4 bg-neutral-50 rounded-2xl border border-neutral-100">
                    <div className="h-10 w-10 bg-red-100 text-red-700 rounded-full flex items-center justify-center"><Clock size={20}/></div>
                    <span className="font-bold text-neutral-700">Waterfront Dining</span>
                  </div>
                </div>
             </div>
          </div>
        </div>
      </section>

      {/* Menu Section */}
      <section id="menu" className="py-24 bg-neutral-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">The Zaab Menu</h2>
            <p className="text-neutral-500">Hand-picked favorites for a flavorful journey</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {menuItems.map((item) => (
              <div key={item.id} className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all group flex flex-col h-full border border-neutral-200/50">
                <div className="relative overflow-hidden h-64">
                  <img src={item.img} alt={item.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                  <div className="absolute top-4 right-4 bg-red-600/90 backdrop-blur px-3 py-1 rounded-full text-xs font-bold text-white uppercase tracking-wider">{item.category}</div>
                </div>
                <div className="p-6 flex-1 flex flex-col">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-lg font-bold text-neutral-900 leading-tight">{item.title}</h3>
                    <span className="text-red-700 font-black whitespace-nowrap ml-2">AED {item.price}</span>
                  </div>
                  <p className="text-neutral-500 text-sm mb-6 line-clamp-2">The signature Ploys Zaab taste that everyone in Souk Al Marfa is talking about.</p>
                  <button 
                    onClick={() => addToCart(item)}
                    className="mt-auto w-full border-2 border-red-700 text-red-700 py-3 rounded-xl font-bold hover:bg-red-700 hover:text-white transition-all flex items-center justify-center gap-2"
                  >
                    <Plus size={18} /> Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Social Media Highlight */}
      <section className="py-24 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
            <div className="max-w-xl">
               <h4 className="text-red-700 font-bold uppercase tracking-widest text-sm mb-4 flex items-center gap-2">
                 <Share2 size={16}/> Join the Community
               </h4>
               <h2 className="text-4xl font-bold text-neutral-900 tracking-tight">Stay Updated on @ployszaab_uae</h2>
               <p className="text-neutral-600 mt-4 italic">Tag us in your stories to get featured!</p>
            </div>
            <a href={SOCIAL_LINKS.instagram} target="_blank" rel="noreferrer" className="bg-neutral-900 text-white px-8 py-3 rounded-full font-bold flex items-center gap-3 hover:bg-red-700 transition-all">
               <Instagram size={20} /> @ployszaab_uae
            </a>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=400&auto=format&fit=crop",
              "https://images.unsplash.com/photo-1512058564366-18510be2db19?q=80&w=400&auto=format&fit=crop",
              "https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=400&auto=format&fit=crop",
              "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=400&auto=format&fit=crop"
            ].map((url, i) => (
              <a key={i} href={SOCIAL_LINKS.instagram} target="_blank" rel="noreferrer" className="relative aspect-square group overflow-hidden rounded-2xl">
                <img src={url} alt="Ploys Zaab feed" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                <div className="absolute inset-0 bg-red-700/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                   <Instagram className="text-white" size={32} />
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Reviews Section */}
      <section id="reviews" className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-neutral-900"></div>
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h4 className="text-red-500 font-bold uppercase tracking-widest text-sm mb-2">Guest Testimonials</h4>
            <h2 className="text-4xl font-bold text-white">Why They Love {RESTAURANT_NAME}</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {reviews.map((rev) => (
              <div key={rev.id} className="bg-white/5 backdrop-blur-md border border-white/10 p-8 rounded-3xl hover:bg-white/10 transition-all group">
                <div className="flex gap-1 text-red-500 mb-6">
                  {[...Array(rev.rating)].map((_, i) => <Star key={i} size={18} fill="currentColor" />)}
                </div>
                <p className="text-neutral-300 text-lg mb-8 italic leading-relaxed">"{rev.comment}"</p>
                <div className="flex justify-between items-center border-t border-white/10 pt-6">
                  <div>
                    <h5 className="font-bold text-white text-base">{rev.name}</h5>
                    <p className="text-neutral-500 text-xs mt-1">{rev.date}</p>
                  </div>
                  <div className="text-red-500 opacity-30 group-hover:opacity-100 transition-opacity">
                    <Quote size={32} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section id="gallery" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
             <h2 className="text-4xl font-bold text-neutral-900 mb-4 tracking-tight">Vibes of {RESTAURANT_NAME}</h2>
             <p className="text-neutral-600">Fresh dishes and cozy atmosphere at Souk Al Marfa</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 auto-rows-[250px]">
            <div className="md:col-span-2 md:row-span-2 rounded-2xl overflow-hidden shadow-lg group">
              <img src="https://image2url.com/r2/default/images/1773545952370-735e5c02-ed88-4939-87d3-f2fa350ae97c.jpg" alt="Ploys Zaab Signature" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
            </div>
            <div className="rounded-2xl overflow-hidden shadow-lg group">
              <img src="https://images.unsplash.com/photo-1582878826629-29b7ad1cdc43?q=80&w=800&auto=format&fit=crop" alt="Thai Spices" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
            </div>
            <div className="rounded-2xl overflow-hidden shadow-lg group">
              <img src="https://image2url.com/r2/default/images/1773554566958-e658efeb-fe3c-434b-93d7-014867c6bf66.jpeg" alt="Waterfront View" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
            </div>
            <div className="md:col-span-2 rounded-2xl overflow-hidden shadow-lg group">
              <img src="https://images.unsplash.com/photo-1625398407796-82650a8c135f?q=80&w=1200&auto=format&fit=crop" alt="Spicy Food Dubai" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
            </div>
          </div>
        </div>
      </section>

      {/* Booking Form */}
      <section id="booking" className="py-24 bg-neutral-900 text-white">
        <div className="max-w-3xl mx-auto px-4 text-center">
           <div className="mb-4 text-red-500 flex justify-center"><Utensils size={40} /></div>
           <h2 className="text-4xl font-bold mb-6">Reserve Your Table</h2>
           <p className="text-neutral-400 mb-12">Dine with us at Souk Al Marfa branch. Quick confirmation via WhatsApp.</p>
           <form onSubmit={handleBookingSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-left">
              <div className="w-full">
                <input 
                  type="text" placeholder="Your Name" required 
                  className="w-full bg-white/5 border border-white/10 p-4 rounded-xl outline-none focus:border-red-500 transition-all text-white placeholder:text-neutral-600"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                />
              </div>
              <div className="w-full">
                <input 
                  type="tel" placeholder="Phone Number" required 
                  className="w-full bg-white/5 border border-white/10 p-4 rounded-xl outline-none focus:border-red-500 transition-all text-white placeholder:text-neutral-600"
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                />
              </div>
              <div className="w-full">
                <input 
                  type="date" required 
                  className="w-full bg-white/5 border border-white/10 p-4 rounded-xl outline-none focus:border-red-500 transition-all text-white [&::-webkit-calendar-picker-indicator]:invert"
                  value={formData.date}
                  onChange={(e) => setFormData({...formData, date: e.target.value})}
                />
              </div>
              <div className="w-full">
                <select 
                  className="w-full bg-white/5 border border-white/10 p-4 rounded-xl outline-none focus:border-red-500 transition-all text-white [&>option]:text-black"
                  value={formData.guests}
                  onChange={(e) => setFormData({...formData, guests: e.target.value})}
                >
                  <option value="1 Guest">1 Guest</option>
                  <option value="2 Guests">2 Guests</option>
                  <option value="3 Guests">3 Guests</option>
                  <option value="4+ Guests">4 or more</option>
                </select>
              </div>
              <button className="sm:col-span-2 bg-red-700 py-4 rounded-xl font-bold text-lg hover:bg-red-600 transition-all shadow-xl shadow-red-900/40 uppercase tracking-widest flex items-center justify-center gap-2 text-white">
                <Mail size={20} /> Request Reservation
              </button>
           </form>
        </div>
      </section>

      {/* Map */}
      <section id="location" className="w-full h-[400px] bg-neutral-200">
        <iframe 
          title="Restaurant Location"
          src={MAP_EMBED_URL}
          width="100%" 
          height="100%" 
          style={{ border: 0 }} 
          allowFullScreen="" 
          loading="lazy" 
          className="grayscale contrast-125 hover:grayscale-0 transition-all duration-700"
        ></iframe>
      </section>

      {/* Footer */}
      <footer id="contact" className="bg-[#0a0a0a] text-white pt-20 pb-10 border-t border-neutral-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
            
            <div className="space-y-6">
              <div className="text-2xl font-black tracking-tighter text-white flex flex-col uppercase">
                <span>{RESTAURANT_NAME}</span>
                <span className="text-[10px] font-medium tracking-[0.2em] text-neutral-500 uppercase">Souk Al Marfa · Dubai</span>
              </div>
              <p className="text-neutral-400 leading-relaxed text-sm font-light">
                Discover the best "Zaab" flavors at Souk Al Marfa. A fusion of tradition and spice in every bite.
              </p>
              
              <div className="flex flex-wrap gap-4 pt-2">
                <a href={SOCIAL_LINKS.facebook} target="_blank" rel="noreferrer" className="w-10 h-10 bg-neutral-900 flex items-center justify-center rounded-full text-white hover:bg-blue-600 transition-all">
                  <Facebook size={18} />
                </a>
                <a href={SOCIAL_LINKS.instagram} target="_blank" rel="noreferrer" className="w-10 h-10 bg-neutral-900 flex items-center justify-center rounded-full text-white hover:bg-gradient-to-tr hover:from-yellow-400 hover:via-red-500 hover:to-purple-600 transition-all">
                  <Instagram size={18} />
                </a>
                <a href={SOCIAL_LINKS.tiktok} target="_blank" rel="noreferrer" className="w-10 h-10 bg-neutral-900 flex items-center justify-center rounded-full text-white hover:bg-black hover:ring-2 hover:ring-cyan-400 transition-all">
                  <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1.04-.1z"/></svg>
                </a>
                <a href={SOCIAL_LINKS.youtube} target="_blank" rel="noreferrer" className="w-10 h-10 bg-neutral-900 flex items-center justify-center rounded-full text-white hover:bg-red-600 transition-all">
                  <Youtube size={18} />
                </a>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-bold mb-8 relative inline-block uppercase tracking-wider">
                Explore
                <span className="absolute -bottom-2 left-0 w-12 h-1 bg-red-700 rounded-full"></span>
              </h3>
              <ul className="space-y-4">
                {['Home', 'About', 'Menu', 'Gallery', 'Reviews', 'Contact'].map((item) => (
                  <li key={item}>
                    <button 
                      onClick={() => scrollToSection(item.toLowerCase())}
                      className="text-neutral-400 hover:text-white hover:translate-x-2 transition-all duration-300 flex items-center gap-2"
                    >
                      <ChevronRight size={14} className="text-red-700" /> {item}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            <div className="lg:col-span-2">
              <h3 className="text-lg font-bold mb-8 relative inline-block uppercase tracking-wider">
                Visit Us
                <span className="absolute -bottom-2 left-0 w-12 h-1 bg-red-700 rounded-full"></span>
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="flex gap-4">
                  <div className="p-3 bg-neutral-900 rounded-xl text-red-500 shadow-inner h-fit"><MapPin size={18} /></div>
                  <div>
                    <p className="font-bold text-neutral-200 uppercase tracking-tighter text-xs">Branch Address</p>
                    <a href={MAPS_URL} target="_blank" rel="noopener noreferrer" className="text-neutral-400 mt-1 text-sm leading-relaxed hover:text-red-500 transition-colors block">
                      {ADDRESS}
                    </a>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="p-3 bg-neutral-900 rounded-xl text-red-500 shadow-inner h-fit"><Phone size={18} /></div>
                  <div>
                    <p className="font-bold text-neutral-200 uppercase tracking-tighter text-xs">Order / Support</p>
                    <p className="text-neutral-400 mt-1 text-sm font-bold tracking-widest">{PHONE_NUMBER}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-10 border-t border-neutral-900 flex flex-col md:flex-row justify-between items-center gap-6">
            <p className="text-neutral-500 text-xs text-center md:text-left">
              © {new Date().getFullYear()} <span className="text-neutral-300 font-bold uppercase">{RESTAURANT_NAME}</span>. All Rights Reserved.
            </p>
            <div className="flex items-center gap-4">
               <button onClick={() => window.open(`https://wa.me/${WHATSAPP_NUMBER}`, '_blank')} className="text-neutral-400 hover:text-green-500 transition-colors text-xs uppercase tracking-widest font-bold">
                  Connect via WhatsApp
               </button>
            </div>
          </div>
        </div>
      </footer>

      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-[60] bg-neutral-900 md:hidden p-8 flex flex-col items-center justify-center space-y-8 animate-fade-in text-center">
           <button onClick={() => setIsMobileMenuOpen(false)} className="absolute top-8 right-8 text-white"><X size={32} /></button>
           {['Home', 'About', 'Menu', 'Gallery', 'Reviews', 'Contact'].map((item) => (
              <button key={item} onClick={() => scrollToSection(item.toLowerCase())} className="text-3xl font-bold text-white uppercase tracking-tighter hover:text-red-500 transition-colors">
                {item}
              </button>
            ))}
            <div className="flex gap-6 py-4">
                <a href={SOCIAL_LINKS.facebook} target="_blank" rel="noreferrer" className="text-white hover:text-blue-500"><Facebook size={32} /></a>
                <a href={SOCIAL_LINKS.instagram} target="_blank" rel="noreferrer" className="text-white hover:text-pink-500"><Instagram size={32} /></a>
            </div>
            <button onClick={() => scrollToSection('booking')} className="bg-red-700 text-white px-10 py-4 rounded-full text-xl font-bold uppercase tracking-widest shadow-xl">Reserve Now</button>
        </div>
      )}

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes slideIn { from { transform: translateX(100%); } to { transform: translateX(0); } }
        .animate-slide-in { animation: slideIn 0.3s ease-out forwards; }
        .animate-fade-in { animation: fadeIn 0.4s ease-out forwards; }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
      `}} />
    </div>
  );
}