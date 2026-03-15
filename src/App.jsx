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
  Leaf,
  ShoppingCart,
  Trash2,
  Plus,
  Minus,
  Mail,
  Youtube,
  Share2,
  Navigation,
  CalendarDays,
  Send,
  ArrowRight
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

  // RESTAURANT DATA
  const RESTAURANT_NAME = "The Spice Tree";
  const PHONE_NUMBER = "+971 50 387 2085";
  const WHATSAPP_NUMBER = "971503872085"; 
  const ADDRESS = "68X2+X7H - 1st Floor - Sheikh Khalifa Bin Zayed St, Ajman, UAE";
  const MAPS_URL = "https://www.google.com/maps/search/?api=1&query=The+Spice+Tree+Sheikh+Khalifa+Bin+Zayed+St";
  const MAP_EMBED_URL = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3604.28822080352!2d55.4526!3d25.4053!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjXCsDI0JzE5LjEiTiA1NcKwMjcnMDkuNCJF!5e0!3m2!1sen!2sae!4v1710000000000!5m2!1sen!2sae";

  // Updated menu items with working image URLs provided by the user
  const menuItems = [
    { id: 1, title: "Signature Butter Chicken", price: 45, category: "Signature", img: "https://image2url.com/r2/default/images/1773545952370-735e5c02-ed88-4939-87d3-f2fa350ae97c.jpg" },
    { id: 2, title: "Lamb Rogan Josh", price: 52, category: "Main", img: "https://image2url.com/r2/default/images/1773554566958-e658efeb-fe3c-434b-93d7-014867c6bf66.jpeg" },
    { id: 3, title: "Tandoori Spice Platter", price: 65, category: "Grill", img: "https://image2url.com/r2/default/images/1773545952370-735e5c02-ed88-4939-87d3-f2fa350ae97c.jpg" },
    { id: 4, title: "Dal Makhani (Slow Cooked)", price: 35, category: "Veg", img: "https://image2url.com/r2/default/images/1773554566958-e658efeb-fe3c-434b-93d7-014867c6bf66.jpeg" },
    { id: 5, title: "Saffron Vegetable Biryani", price: 38, category: "Rice", img: "https://image2url.com/r2/default/images/1773545952370-735e5c02-ed88-4939-87d3-f2fa350ae97c.jpg" },
    { id: 6, title: "Gulab Jamun with Generic", price: 22, category: "Dessert", img: "https://image2url.com/r2/default/images/1773554566958-e658efeb-fe3c-434b-93d7-014867c6bf66.jpeg" }
  ];

  const reviews = [
    {
      id: 1,
      name: "Sarah Ahmed",
      rating: 5,
      comment: "The best Butter Chicken I've had in Ajman! The atmosphere is incredibly elegant and perfect for family dinners.",
      date: "2 weeks ago"
    },
    {
      id: 2,
      name: "Michael Chen",
      rating: 5,
      comment: "Outstanding service. The Tandoori platter was cooked to perfection. Highly recommend the Saffron Biryani as well!",
      date: "1 month ago"
    },
    {
      id: 3,
      name: "Fatima Al-Zahra",
      rating: 4,
      comment: "Beautiful interior and very authentic flavors. The Dal Makhani is a must-try. We will definitely be coming back.",
      date: "3 days ago"
    }
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
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(orderText)}`, '_blank');
  };

  const handleBookingSubmit = (e) => {
    e.preventDefault();
    const message = `*${RESTAURANT_NAME} - Booking*\n*Name:* ${formData.name}\n*Phone:* ${formData.phone}\n*Date:* ${formData.date}\n*Guests:* ${formData.guests}`;
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`, '_blank');
  };

  const scrollToSection = (id) => {
    setIsMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#faf9f6] font-serif text-[#1a2e26] selection:bg-[#c49a6c] selection:text-white">
      
      {/* Navigation */}
      <nav className="fixed w-full z-50 bg-white/90 backdrop-blur-lg border-b border-[#e5e1da] shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-24">
            <div className="flex-shrink-0 flex items-center cursor-pointer gap-3" onClick={() => scrollToSection('home')}>
              <div className="w-12 h-12 bg-[#1a2e26] rounded-full flex items-center justify-center text-[#c49a6c]">
                <Leaf size={24} />
              </div>
              <div className="flex flex-col">
                <span className="text-2xl font-bold tracking-tight text-[#1a2e26] leading-none uppercase">{RESTAURANT_NAME}</span>
                <span className="text-[10px] font-medium tracking-[0.2em] text-[#c49a6c] uppercase mt-1">Authentic Spice Kitchen</span>
              </div>
            </div>

            <div className="hidden lg:flex items-center space-x-10">
              {['Home', 'About', 'Menu', 'Location'].map((item) => (
                <button key={item} onClick={() => scrollToSection(item.toLowerCase())} className="text-sm font-medium uppercase tracking-widest text-[#1a2e26] hover:text-[#c49a6c] transition-colors">
                  {item}
                </button>
              ))}
              <div className="h-6 w-[1px] bg-[#e5e1da]"></div>
              
              <button onClick={() => setIsCartOpen(true)} className="relative p-2 text-[#1a2e26] hover:text-[#c49a6c] transition-colors">
                <ShoppingCart size={22} />
                {cart.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-[#c49a6c] text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full ring-2 ring-white">
                    {cart.reduce((a, b) => a + b.qty, 0)}
                  </span>
                )}
              </button>
              <button onClick={() => scrollToSection('booking')} className="bg-[#1a2e26] text-[#c49a6c] px-8 py-3 rounded-full text-xs font-bold uppercase tracking-widest hover:bg-[#2a4539] transition-all shadow-xl">
                Reservation
              </button>
            </div>

            <div className="lg:hidden flex items-center space-x-4">
               <button onClick={() => setIsCartOpen(true)} className="relative p-2">
                <ShoppingCart size={24} />
                {cart.length > 0 && <span className="absolute top-0 right-0 bg-[#c49a6c] text-white text-[10px] px-1.5 rounded-full">{cart.reduce((a, b) => a + b.qty, 0)}</span>}
              </button>
              <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="text-[#1a2e26]">
                {isMobileMenuOpen ? <X size={28} /> : <MenuIcon size={28} />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Cart Drawer */}
      {isCartOpen && (
        <div className="fixed inset-0 z-[100]">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setIsCartOpen(false)}></div>
          <div className="absolute right-0 top-0 h-full w-full max-w-md bg-white shadow-2xl flex flex-col transform animate-slide-in">
            <div className="p-8 border-b flex justify-between items-center bg-[#1a2e26] text-white">
              <h2 className="text-xl font-serif font-bold flex items-center gap-2"><ShoppingCart className="text-[#c49a6c]" /> Your Selection</h2>
              <button onClick={() => setIsCartOpen(false)} className="p-2 hover:bg-white/10 rounded-full transition-colors"><X /></button>
            </div>
            
            <div className="flex-1 overflow-y-auto p-8 space-y-8">
              {cart.length === 0 ? (
                <div className="text-center py-20 opacity-50">
                  <ShoppingCart size={48} className="mx-auto mb-4" />
                  <p className="font-serif italic">Your cart is empty.</p>
                </div>
              ) : (
                cart.map(item => (
                  <div key={item.id} className="flex gap-4">
                    <img src={item.img} alt={item.title} className="w-24 h-24 rounded-lg object-cover shadow-md" />
                    <div className="flex-1">
                      <div className="flex justify-between font-bold text-[#1a2e26]">
                        <h3 className="text-sm font-serif">{item.title}</h3>
                        <span className="text-[#c49a6c]">AED {item.price * item.qty}</span>
                      </div>
                      <p className="text-[10px] uppercase tracking-widest text-neutral-400 mb-4">{item.category}</p>
                      <div className="flex items-center gap-4">
                        <div className="flex items-center border border-[#e5e1da] rounded-full overflow-hidden">
                          <button onClick={() => updateQty(item.id, -1)} className="px-3 py-1 hover:bg-[#faf9f6]"><Minus size={12}/></button>
                          <span className="px-3 py-1 font-bold text-xs">{item.qty}</span>
                          <button onClick={() => updateQty(item.id, 1)} className="px-3 py-1 hover:bg-[#faf9f6]"><Plus size={12}/></button>
                        </div>
                        <button onClick={() => updateQty(item.id, -item.qty)} className="text-red-800 hover:text-red-600 transition-colors"><Trash2 size={16}/></button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {cart.length > 0 && (
              <div className="p-8 bg-[#faf9f6] border-t border-[#e5e1da]">
                <div className="flex justify-between items-center mb-6">
                  <span className="text-neutral-500 uppercase tracking-widest text-xs">Subtotal</span>
                  <span className="text-2xl font-bold text-[#1a2e26]">AED {cartTotal}</span>
                </div>
                <button onClick={handleOrderSubmit} className="w-full bg-[#1a2e26] text-[#c49a6c] py-5 rounded-full font-bold uppercase tracking-widest text-sm hover:bg-[#2a4539] transition-all shadow-xl">
                  Proceed to WhatsApp
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Hero Section */}
      <section id="home" className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=2000&auto=format&fit=crop" 
            alt="The Spice Tree Interior" 
            className="w-full h-full object-cover" 
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#1a2e26]/90 to-transparent"></div>
        </div>
        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl text-left">
            <div className="mb-6 inline-flex items-center gap-3 bg-white/10 backdrop-blur-md border border-white/20 px-4 py-2 rounded-full text-[#c49a6c] text-xs font-bold uppercase tracking-[0.3em]">
              <Leaf size={14} /> Culinary Excellence in Ajman
            </div>
            <h1 className="text-6xl md:text-8xl font-bold text-white mb-8 tracking-tighter leading-tight font-serif">
              Rooted in <span className="text-[#c49a6c] italic">Flavor</span>
            </h1>
            <p className="text-lg md:text-xl text-neutral-300 mb-10 italic max-w-lg leading-relaxed font-serif">
              A journey through traditional spices reimagined with modern culinary artistry.
            </p>
            <div className="flex flex-col sm:flex-row gap-5">
              <button onClick={() => scrollToSection('menu')} className="bg-[#c49a6c] text-[#1a2e26] px-10 py-5 rounded-full text-xs font-bold uppercase tracking-widest hover:bg-white transition-all shadow-2xl">
                Discover Menu
              </button>
              <button onClick={() => scrollToSection('booking')} className="bg-transparent text-white border border-white/30 px-10 py-5 rounded-full text-xs font-bold uppercase tracking-widest hover:bg-white/10 transition-all flex items-center justify-center gap-2">
                <CalendarDays size={16} /> Book a Table
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
             <div className="relative">
                <div className="aspect-[4/5] rounded-[40px] overflow-hidden shadow-2xl relative z-10">
                   <img src="https://images.unsplash.com/photo-1588166524941-3bf61a9c41db?q=80&w=1200&auto=format&fit=crop" alt="Spice Spices" className="w-full h-full object-cover" />
                </div>
                <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-[#faf9f6] rounded-[40px] -z-0 border border-[#e5e1da] hidden md:block"></div>
                <div className="absolute -top-10 -left-10 bg-[#c49a6c] text-[#1a2e26] p-10 rounded-[40px] hidden md:block text-center shadow-xl">
                   <p className="text-5xl font-bold font-serif">1st</p>
                   <p className="text-[10px] font-bold uppercase tracking-widest mt-2">Floor - Sheikh Khalifa St</p>
                </div>
             </div>
             <div>
                <h4 className="text-[#c49a6c] font-bold uppercase tracking-[0.4em] text-xs mb-6">The Legacy</h4>
                <h2 className="text-5xl font-bold mb-8 font-serif leading-tight">Elevated Dining on <br/> Sheikh Khalifa St</h2>
                <p className="text-[#4a5a54] text-lg mb-8 leading-relaxed font-serif italic">
                  At The Spice Tree, we believe every meal should tell a story. From the hand-ground spices to the traditional slow-cooking methods, our kitchen is a sanctuary for authentic flavors.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mt-12">
                  <div className="space-y-4">
                    <div className="h-14 w-14 bg-[#faf9f6] text-[#c49a6c] rounded-2xl flex items-center justify-center border border-[#e5e1da]"><Utensils size={24}/></div>
                    <h5 className="font-bold uppercase tracking-widest text-sm">Gourmet Selection</h5>
                    <p className="text-neutral-500 text-sm font-serif">Finest ingredients sourced globally to create local masterpieces.</p>
                  </div>
                  <div className="space-y-4">
                    <div className="h-14 w-14 bg-[#faf9f6] text-[#c49a6c] rounded-2xl flex items-center justify-center border border-[#e5e1da]"><Clock size={24}/></div>
                    <h5 className="font-bold uppercase tracking-widest text-sm">Fine Atmosphere</h5>
                    <p className="text-neutral-500 text-sm font-serif">Elegant interiors designed for memorable family gatherings.</p>
                  </div>
                </div>
             </div>
          </div>
        </div>
      </section>

      {/* Menu Section */}
      <section id="menu" className="py-32 bg-[#faf9f6]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h4 className="text-[#c49a6c] font-bold uppercase tracking-[0.4em] text-xs mb-4">Our Kitchen</h4>
            <h2 className="text-5xl font-bold font-serif">Chef's Recommendations</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {menuItems.map((item) => (
              <div key={item.id} className="bg-white rounded-[32px] overflow-hidden shadow-md hover:shadow-2xl transition-all group flex flex-col h-full border border-[#e5e1da]/50">
                <div className="relative overflow-hidden h-72">
                  <img src={item.img} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                  <div className="absolute top-6 left-6 bg-[#1a2e26]/90 backdrop-blur px-4 py-1.5 rounded-full text-[10px] font-bold text-[#c49a6c] uppercase tracking-[0.2em]">{item.category}</div>
                </div>
                <div className="p-8 flex-1 flex flex-col">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-xl font-bold text-[#1a2e26] font-serif">{item.title}</h3>
                    <span className="text-lg font-bold text-[#c49a6c] ml-4">AED {item.price}</span>
                  </div>
                  <p className="text-neutral-500 text-sm mb-8 font-serif italic line-clamp-2">Exquisite spices blended perfectly to deliver an authentic taste of tradition.</p>
                  <button 
                    onClick={() => addToCart(item)}
                    className="mt-auto w-full bg-[#faf9f6] text-[#1a2e26] py-4 rounded-full font-bold text-[10px] uppercase tracking-widest hover:bg-[#1a2e26] hover:text-[#c49a6c] transition-all border border-[#e5e1da]"
                  >
                    Add to Selection
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Reviews Section */}
      <section className="py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
            <div className="text-left">
              <h4 className="text-[#c49a6c] font-bold uppercase tracking-[0.4em] text-xs mb-4">Testimonials</h4>
              <h2 className="text-5xl font-bold font-serif leading-tight">Guest Experiences</h2>
            </div>
            <div className="flex items-center gap-2 text-[#c49a6c]">
              <div className="flex">
                {[...Array(5)].map((_, i) => <Star key={i} size={20} fill="#c49a6c" />)}
              </div>
              <span className="text-sm font-bold uppercase tracking-widest text-[#1a2e26]">4.9 Average Rating</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {reviews.map((review) => (
              <div key={review.id} className="bg-[#faf9f6] p-10 rounded-[40px] border border-[#e5e1da] flex flex-col h-full hover:bg-white hover:shadow-xl transition-all group">
                <Quote className="text-[#c49a6c] mb-6 opacity-40 group-hover:opacity-100 transition-opacity" size={40} />
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      size={14} 
                      fill={i < review.rating ? "#c49a6c" : "transparent"} 
                      className={i < review.rating ? "text-[#c49a6c]" : "text-[#e5e1da]"}
                    />
                  ))}
                </div>
                <p className="text-[#1a2e26] font-serif italic text-lg leading-relaxed mb-8 flex-1">"{review.comment}"</p>
                <div className="pt-6 border-t border-[#e5e1da]">
                  <p className="font-bold uppercase tracking-widest text-xs">{review.name}</p>
                  <p className="text-[10px] text-neutral-400 uppercase tracking-widest mt-1">{review.date}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Booking Form */}
      <section id="booking" className="py-32 bg-[#1a2e26] relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-full opacity-5 pointer-events-none">
           <Leaf size={400} />
        </div>
        <div className="max-w-4xl mx-auto px-4 relative z-10">
           <div className="text-center mb-16">
              <h2 className="text-5xl font-bold mb-6 font-serif text-white underline decoration-[#c49a6c] decoration-1 underline-offset-8">Table Reservation</h2>
              <p className="text-[#c49a6c]/80 text-sm uppercase tracking-[0.3em]">Experience the art of spices</p>
           </div>
           <form onSubmit={handleBookingSubmit} className="bg-white/5 backdrop-blur-md p-10 md:p-16 rounded-[40px] border border-white/10 shadow-2xl">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-[#c49a6c]">Guest Name</label>
                    <input 
                      type="text" placeholder="John Doe" required 
                      className="w-full bg-transparent border-b border-white/20 py-3 outline-none focus:border-[#c49a6c] transition-all text-white placeholder:text-white/20 font-serif"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-[#c49a6c]">Phone Number</label>
                    <input 
                      type="tel" placeholder="+971 -- --- ----" required 
                      className="w-full bg-transparent border-b border-white/20 py-3 outline-none focus:border-[#c49a6c] transition-all text-white placeholder:text-white/20 font-serif"
                      value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-[#c49a6c]">Date of Visit</label>
                    <input 
                      type="date" required 
                      className="w-full bg-transparent border-b border-white/20 py-3 outline-none focus:border-[#c49a6c] transition-all text-white [&::-webkit-calendar-picker-indicator]:invert font-serif"
                      value={formData.date}
                      onChange={(e) => setFormData({...formData, date: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-[#c49a6c]">Number of Guests</label>
                    <select 
                      className="w-full bg-transparent border-b border-white/20 py-3 outline-none focus:border-[#c49a6c] transition-all text-white [&>option]:text-black font-serif"
                      value={formData.guests}
                      onChange={(e) => setFormData({...formData, guests: e.target.value})}
                    >
                      <option value="1 Person">1 Person</option>
                      <option value="2 People">2 People</option>
                      <option value="3 People">3 People</option>
                      <option value="4+ People">4 or more</option>
                    </select>
                  </div>
                  <button className="md:col-span-2 mt-8 bg-[#c49a6c] text-[#1a2e26] py-5 rounded-full font-bold text-xs uppercase tracking-[0.3em] hover:bg-white transition-all shadow-xl shadow-black/20 flex items-center justify-center gap-3">
                    <Mail size={16} /> Request Confirmation
                  </button>
              </div>
           </form>
        </div>
      </section>

      {/* Location Section */}
      <section id="location" className="py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-1 space-y-10">
              <h2 className="text-4xl font-bold font-serif leading-tight">Find Us in the <br/> Heart of Ajman</h2>
              
              <div className="space-y-8">
                <div className="flex gap-5">
                  <div className="h-12 w-12 bg-[#faf9f6] text-[#c49a6c] rounded-full flex items-center justify-center border border-[#e5e1da] shrink-0"><MapPin size={20}/></div>
                  <div>
                    <h5 className="font-bold text-xs uppercase tracking-widest text-[#1a2e26]">Our Address</h5>
                    <p className="text-neutral-500 text-sm mt-2 leading-relaxed font-serif italic">{ADDRESS}</p>
                    <a href={MAPS_URL} target="_blank" rel="noreferrer" className="text-[#c49a6c] text-[10px] font-bold uppercase tracking-widest mt-4 flex items-center gap-1 hover:gap-2 transition-all">
                      Open in Maps <Navigation size={10} />
                    </a>
                  </div>
                </div>

                <div className="flex gap-5">
                  <div className="h-12 w-12 bg-[#faf9f6] text-[#c49a6c] rounded-full flex items-center justify-center border border-[#e5e1da] shrink-0"><Phone size={20}/></div>
                  <div>
                    <h5 className="font-bold text-xs uppercase tracking-widest text-[#1a2e26]">Call or WhatsApp</h5>
                    <p className="text-neutral-500 text-sm mt-2 font-bold tracking-[0.2em]">{PHONE_NUMBER}</p>
                  </div>
                </div>

                <div className="flex gap-5">
                  <div className="h-12 w-12 bg-[#faf9f6] text-[#c49a6c] rounded-full flex items-center justify-center border border-[#e5e1da] shrink-0"><Clock size={20}/></div>
                  <div>
                    <h5 className="font-bold text-xs uppercase tracking-widest text-[#1a2e26]">Opening Hours</h5>
                    <p className="text-neutral-500 text-sm mt-2 font-serif italic">Mon - Sun: 12:00 PM - 12:00 AM</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-2 h-[500px] rounded-[40px] overflow-hidden shadow-2xl border border-[#e5e1da]">
               <iframe 
                title="Restaurant Location"
                src={MAP_EMBED_URL}
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen="" 
                loading="lazy" 
                className="grayscale opacity-90 contrast-125"
              ></iframe>
            </div>
          </div>
        </div>
      </section>

      {/* Footer Redesign */}
      <footer className="bg-[#1a2e26] text-white pt-24 pb-12 overflow-hidden relative">
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#c49a6c]/5 rounded-full blur-3xl -mr-32 -mt-32"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#c49a6c]/5 rounded-full blur-3xl -ml-48 -mb-48"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-20">
            {/* Brand Section */}
            <div className="space-y-8">
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-3">
                  <Leaf className="text-[#c49a6c]" size={32} />
                  <span className="text-2xl font-bold tracking-tighter uppercase font-serif">{RESTAURANT_NAME}</span>
                </div>
                <p className="text-neutral-500 text-sm font-serif italic leading-relaxed max-w-xs">
                  Celebrating the rich heritage of Asian cuisine with hand-picked spices and modern elegance in the heart of Ajman.
                </p>
              </div>
              <div className="flex gap-4">
                {[Instagram, Facebook, Youtube, Share2].map((Icon, i) => (
                  <button key={i} className="h-10 w-10 rounded-full border border-white/10 flex items-center justify-center text-white/60 hover:text-[#c49a6c] hover:border-[#c49a6c] transition-all">
                    <Icon size={18} />
                  </button>
                ))}
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h5 className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#c49a6c] mb-8">Navigation</h5>
              <ul className="space-y-4">
                {['Home', 'About', 'Menu', 'Location', 'Reservation'].map((link) => (
                  <li key={link}>
                    <button 
                      onClick={() => scrollToSection(link.toLowerCase())}
                      className="text-white/60 hover:text-white transition-colors font-serif text-sm flex items-center group"
                    >
                      <ChevronRight size={14} className="opacity-0 group-hover:opacity-100 -ml-4 group-hover:ml-0 transition-all mr-2 text-[#c49a6c]" />
                      {link}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Details */}
            <div>
              <h5 className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#c49a6c] mb-8">Get In Touch</h5>
              <ul className="space-y-6">
                <li className="flex gap-4 group cursor-pointer" onClick={() => window.open(MAPS_URL)}>
                  <MapPin className="text-[#c49a6c] shrink-0" size={18} />
                  <span className="text-white/60 text-sm font-serif group-hover:text-white transition-colors">{ADDRESS}</span>
                </li>
                <li className="flex gap-4">
                  <Phone className="text-[#c49a6c] shrink-0" size={18} />
                  <span className="text-white/60 text-sm font-serif">{PHONE_NUMBER}</span>
                </li>
                <li className="flex gap-4">
                  <Mail className="text-[#c49a6c] shrink-0" size={18} />
                  <span className="text-white/60 text-sm font-serif">hello@thespicetree.ae</span>
                </li>
              </ul>
            </div>

            {/* Newsletter */}
            <div>
              <h5 className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#c49a6c] mb-8">Newsletter</h5>
              <p className="text-white/60 text-sm font-serif italic mb-6">Subscribe to receive exclusive offers and event invites.</p>
              <div className="relative">
                <input 
                  type="email" 
                  placeholder="Your Email Address" 
                  className="w-full bg-white/5 border border-white/10 rounded-full py-4 px-6 outline-none focus:border-[#c49a6c] transition-all text-sm font-serif italic"
                />
                <button className="absolute right-2 top-2 h-10 w-10 bg-[#c49a6c] text-[#1a2e26] rounded-full flex items-center justify-center hover:bg-white transition-colors">
                  <ArrowRight size={18} />
                </button>
              </div>
            </div>
          </div>

          <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="flex flex-col items-center md:items-start">
              <p className="text-[10px] uppercase tracking-[0.2em] text-white/30">
                &copy; {new Date().getFullYear()} {RESTAURANT_NAME} Fine Dining.
              </p>
              <p className="text-[9px] uppercase tracking-[0.2em] text-[#c49a6c]/50 mt-1 font-sans">
                Crafted for Excellence • Ajman, UAE
              </p>
            </div>
            
            <div className="flex items-center gap-8">
              <button className="text-[10px] uppercase tracking-[0.2em] text-white/30 hover:text-white transition-colors">Privacy Policy</button>
              <button className="text-[10px] uppercase tracking-[0.2em] text-white/30 hover:text-white transition-colors">Terms of Service</button>
              <button 
                onClick={() => scrollToSection('home')}
                className="h-12 w-12 rounded-full border border-white/10 flex items-center justify-center text-[#c49a6c] hover:bg-white hover:text-[#1a2e26] transition-all group"
              >
                <ChevronRight size={20} className="-rotate-90 group-hover:-translate-y-1 transition-transform" />
              </button>
            </div>
          </div>
        </div>
      </footer>

      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-[60] bg-[#1a2e26] md:hidden p-8 flex flex-col items-center justify-center space-y-10 animate-fade-in">
           <button onClick={() => setIsMobileMenuOpen(false)} className="absolute top-8 right-8 text-[#c49a6c]"><X size={32} /></button>
           {['Home', 'About', 'Menu', 'Location'].map((item) => (
              <button key={item} onClick={() => scrollToSection(item.toLowerCase())} className="text-4xl font-serif font-bold text-white hover:text-[#c49a6c] transition-colors">
                {item}
              </button>
            ))}
            <button onClick={() => scrollToSection('booking')} className="bg-[#c49a6c] text-[#1a2e26] px-12 py-5 rounded-full text-xs font-bold uppercase tracking-widest shadow-2xl">Book Now</button>
        </div>
      )}

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes slideIn { from { transform: translateX(100%); } to { transform: translateX(0); } }
        .animate-slide-in { animation: slideIn 0.4s cubic-bezier(0.4, 0, 0.2, 1) forwards; }
        .animate-fade-in { animation: fadeIn 0.5s ease-out forwards; }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
      `}} />
    </div>
  );
}