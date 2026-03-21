import React, { useState, useEffect } from 'react';
import { 
  ShoppingCart, X, Plus, Minus, Phone, MapPin, 
  Clock, Star, ChevronRight, Menu as MenuIcon, Instagram, Facebook, Twitter
} from 'lucide-react';

// --- STYLES & FONTS INJECTION ---
const globalStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;1,400&family=Lato:wght@300;400;700&display=swap');

  html {
    scroll-behavior: smooth;
    background-color: #000;
  }

  body {
    font-family: 'Lato', sans-serif;
    background-color: #000;
    color: #fff;
    overflow-x: hidden;
  }

  h1, h2, h3, h4, h5, h6, .font-serif {
    font-family: 'Playfair Display', serif;
  }

  .text-gold {
    color: #D4AF37;
  }
  
  .bg-gold {
    background-color: #D4AF37;
  }

  .border-gold {
    border-color: #D4AF37;
  }

  .gold-gradient-text {
    background: linear-gradient(to right, #BF953F, #FCF6BA, #B38728, #FBF5B7, #AA771C);
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
  }

  .gold-gradient-bg {
    background: linear-gradient(to right, #BF953F, #FCF6BA, #B38728);
  }

  .gold-glow {
    box-shadow: 0 0 20px rgba(212, 175, 55, 0.2);
  }

  .glass-panel {
    background: rgba(15, 15, 15, 0.7);
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
    border: 1px solid rgba(212, 175, 55, 0.15);
  }

  /* Custom Scrollbar */
  ::-webkit-scrollbar {
    width: 8px;
  }
  ::-webkit-scrollbar-track {
    background: #0a0a0a;
  }
  ::-webkit-scrollbar-thumb {
    background: #D4AF37;
    border-radius: 4px;
  }
  ::-webkit-scrollbar-thumb:hover {
    background: #b5952f;
  }
`;

// --- MOCK DATA ---
const MENU_ITEMS = [
  {
    id: 1,
    name: "Truffle & Gold Arancini",
    description: "Wild mushroom risotto spheres, black truffle center, 24k gold leaf garnish.",
    price: 120,
    category: "Starters",
    image: "https://image2url.com/r2/default/images/1774110672578-310d0899-046c-4c12-85fc-b51ba6ceef10.jpg"
  },
  {
    id: 2,
    name: "Wagyu Beef Tartare",
    description: "Grade A5 Wagyu, quail egg yolk, beluga caviar, charcoal crisps.",
    price: 185,
    category: "Starters",
    image: "https://image2url.com/r2/default/images/1774110709609-0cf13fe4-c2ea-4e13-8547-66765f8c02df.jpg"
  },
  {
    id: 3,
    name: "Golden Tomahawk Steak",
    description: "1.2kg Prime Tomahawk, fully encased in edible 24-karat gold, served with signature sides.",
    price: 1250,
    category: "Main Course",
    image: "https://image2url.com/r2/default/images/1774110745040-e3060498-012b-4731-918b-618ec3040e69.jpg"
  },
  {
    id: 4,
    name: "Saffron Lobster Thermidor",
    description: "Fresh Omani lobster, creamy saffron & cognac sauce, gruyere crust.",
    price: 450,
    category: "Main Course",
    image: "https://image2url.com/r2/default/images/1774110784939-c135172d-afc7-49d9-aae9-78c69e8fab26.jpg"
  },
  {
    id: 5,
    name: "Royal Black Cod",
    description: "Miso-glazed black cod, yuzu infused asparagus, edible flowers.",
    price: 320,
    category: "Main Course",
    image: "https://image2url.com/r2/default/images/1774110824941-bde0d96b-7e53-4488-ac4e-2a3e8e34f887.jpg"
  },
  {
    id: 6,
    name: "24K Chocolate Sphere",
    description: "Valrhona dark chocolate, hot caramel pour, hazelnut praline core.",
    price: 150,
    category: "Desserts",
    image: "https://image2url.com/r2/default/images/1774110672578-310d0899-046c-4c12-85fc-b51ba6ceef10.jpg"
  },
  {
    id: 7,
    name: "Pistachio & Rose Baklava",
    description: "Deconstructed premium baklava, Iranian pistachio ice cream, rose nectar.",
    price: 95,
    category: "Desserts",
    image: "https://image2url.com/r2/default/images/1774110709609-0cf13fe4-c2ea-4e13-8547-66765f8c02df.jpg"
  },
  {
    id: 8,
    name: "The Emirati Elixir",
    description: "Signature mocktail with saffron, gold dust, fresh lemon, and smoked rosemary.",
    price: 65,
    category: "Drinks",
    image: "https://image2url.com/r2/default/images/1774110745040-e3060498-012b-4731-918b-618ec3040e69.jpg"
  }
];

const REVIEWS = [
  { name: "Sheikh H.", text: "An absolute masterpiece of culinary art. The gold tomahawk was an unforgettable experience.", rating: 5 },
  { name: "Elena R.", text: "The epitome of Dubai luxury dining. Impeccable service and the truffle arancini are divine.", rating: 5 },
  { name: "James T.", text: "From the ambiance to the final dessert, everything screams perfection. 10/10.", rating: 5 }
];

const GALLERY = [
  "https://image2url.com/r2/default/images/1774110784939-c135172d-afc7-49d9-aae9-78c69e8fab26.jpg",
  "https://image2url.com/r2/default/images/1774110824941-bde0d96b-7e53-4488-ac4e-2a3e8e34f887.jpg",
  "https://image2url.com/r2/default/images/1774110672578-310d0899-046c-4c12-85fc-b51ba6ceef10.jpg",
  "https://image2url.com/r2/default/images/1774110709609-0cf13fe4-c2ea-4e13-8547-66765f8c02df.jpg",
];


export default function App() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cart, setCart] = useState([]);
  const [activeCategory, setActiveCategory] = useState("Starters");
  const [reservationData, setReservationData] = useState({ name: '', phone: '', date: '' });

  // Handle Scroll for Navbar
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Cart Functions
  const addToCart = (item) => {
    setCart(prev => {
      const existing = prev.find(i => i.id === item.id);
      if (existing) {
        return prev.map(i => i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i);
      }
      return [...prev, { ...item, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  const updateQuantity = (id, delta) => {
    setCart(prev => prev.map(item => {
      if (item.id === id) {
        const newQuantity = item.quantity + delta;
        return newQuantity > 0 ? { ...item, quantity: newQuantity } : null;
      }
      return item;
    }).filter(Boolean));
  };

  const cartTotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const cartItemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  // WhatsApp Checkout Function
  const handleWhatsAppOrder = () => {
    if (cart.length === 0) return;

    const phoneNumber = "971523385425";
    let message = `*Hello Kitchen Shate AlHamriah, I would like to place an order:*\n\n`;
    
    message += `*Items:*\n`;
    cart.forEach(item => {
      message += `- ${item.name} x${item.quantity} (AED ${item.price * item.quantity})\n`;
    });
    
    message += `\n*Total: AED ${cartTotal}*\n\n`;
    message += `*Customer Details:*\n`;
    message += `Name: \n`;
    message += `Delivery Address / Table No: \n`;
    message += `Special Instructions: `;

    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/${phoneNumber}?text=${encodedMessage}`, '_blank');
  };

  // WhatsApp Reservation Function
  const handleReservation = (e) => {
    e.preventDefault();
    const phoneNumber = "971523385425";
    const message = `*Luxury Dining Reservation Request* 🍽️\n\n*Name:* ${reservationData.name}\n*Phone:* ${reservationData.phone}\n*Date:* ${reservationData.date}\n\nPlease confirm availability.`;
    
    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/${phoneNumber}?text=${encodedMessage}`, '_blank');
    
    // Clear form after submitting
    setReservationData({ name: '', phone: '', date: '' });
  };

  const categories = ["Starters", "Main Course", "Desserts", "Drinks"];

  return (
    <div className="relative min-h-screen bg-black text-white selection:bg-[#D4AF37] selection:text-black">
      <style>{globalStyles}</style>

      {/* --- NAVBAR --- */}
      <nav className={`fixed w-full z-50 transition-all duration-500 ${isScrolled ? 'bg-black/90 backdrop-blur-md py-4 border-b border-[#D4AF37]/30 shadow-[0_10px_40px_rgba(212,175,55,0.15)]' : 'bg-transparent py-6'}`}>
        <div className="container mx-auto px-6 flex justify-between items-center">
          
          {/* Logo */}
          <div className="flex flex-col">
            <h1 className="font-serif text-2xl md:text-3xl font-bold tracking-wider gold-gradient-text uppercase">
              Kitchen Shate
            </h1>
            <span className="text-[10px] md:text-xs tracking-[0.3em] text-gray-400 uppercase mt-1">Al Hamriah</span>
          </div>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center space-x-10">
            {['Home', 'About', 'Menu', 'Gallery', 'Reservation'].map((item) => (
              <a key={item} href={`#${item.toLowerCase()}`} className="text-sm uppercase tracking-widest hover:text-[#D4AF37] transition-colors duration-300">
                {item}
              </a>
            ))}
          </div>

          {/* Icons (Cart & Mobile Menu) */}
          <div className="flex items-center space-x-6">
            <button onClick={() => setIsCartOpen(true)} className="relative group p-2">
              <ShoppingCart className="w-6 h-6 text-white group-hover:text-[#D4AF37] transition-colors" />
              {cartItemCount > 0 && (
                <span className="absolute top-0 right-0 bg-[#D4AF37] text-black text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  {cartItemCount}
                </span>
              )}
            </button>
            <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="md:hidden text-white">
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        {isMobileMenuOpen && (
          <div className="md:hidden absolute top-full left-0 w-full bg-black/95 backdrop-blur-xl border-b border-[#D4AF37]/20 py-6 px-6 flex flex-col space-y-6">
            {['Home', 'About', 'Menu', 'Gallery', 'Reservation'].map((item) => (
              <a 
                key={item} 
                href={`#${item.toLowerCase()}`} 
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-lg uppercase tracking-widest font-serif border-b border-zinc-800 pb-2 hover:text-[#D4AF37]"
              >
                {item}
              </a>
            ))}
          </div>
        )}
      </nav>

      {/* --- CART SIDEBAR --- */}
      <div className={`fixed inset-0 z-[60] transition-opacity duration-300 ${isCartOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
        {/* Backdrop */}
        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setIsCartOpen(false)} />
        
        {/* Sidebar */}
        <div className={`absolute top-0 right-0 h-full w-full sm:w-[400px] glass-panel border-l border-[#D4AF37]/40 shadow-[-20px_0_50px_rgba(212,175,55,0.15)] transform transition-transform duration-500 ease-in-out flex flex-col ${isCartOpen ? 'translate-x-0' : 'translate-x-full'}`}>
          <div className="flex justify-between items-center p-6 border-b border-[#D4AF37]/20">
            <h2 className="font-serif text-2xl text-gold">Your Order</h2>
            <button onClick={() => setIsCartOpen(false)} className="text-gray-400 hover:text-white transition-colors">
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {cart.length === 0 ? (
              <div className="text-center text-gray-400 mt-20 font-serif italic text-lg">
                Your culinary journey has not yet begun.
              </div>
            ) : (
              cart.map(item => (
                <div key={item.id} className="flex gap-4 items-center bg-black/40 p-4 rounded-2xl border border-white/5">
                  <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded-xl" />
                  <div className="flex-1">
                    <h4 className="font-serif text-sm text-gold">{item.name}</h4>
                    <p className="text-xs text-gray-400 mt-1">AED {item.price}</p>
                    <div className="flex items-center gap-3 mt-3">
                      <button onClick={() => updateQuantity(item.id, -1)} className="p-1 hover:bg-[#D4AF37]/20 rounded-full transition-colors"><Minus className="w-3 h-3" /></button>
                      <span className="text-sm w-4 text-center">{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.id, 1)} className="p-1 hover:bg-[#D4AF37]/20 rounded-full transition-colors"><Plus className="w-3 h-3" /></button>
                    </div>
                  </div>
                  <div className="text-right font-serif text-gold">
                    AED {item.price * item.quantity}
                  </div>
                </div>
              ))
            )}
          </div>

          {cart.length > 0 && (
            <div className="p-6 border-t border-[#D4AF37]/20 bg-black/80">
              <div className="flex justify-between items-center mb-6">
                <span className="font-serif text-lg text-gray-300">Total</span>
                <span className="font-serif text-2xl text-gold">AED {cartTotal}</span>
              </div>
              <button 
                onClick={handleWhatsAppOrder}
                className="w-full py-4 gold-gradient-bg text-black font-bold uppercase tracking-widest text-sm rounded-full hover:shadow-[0_0_20px_rgba(212,175,55,0.4)] transition-all duration-300 flex justify-center items-center gap-2"
              >
                Checkout via WhatsApp
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </div>

      {/* --- HERO SECTION --- */}
      <section id="home" className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0">
          <img 
            src="https://image2url.com/r2/default/images/1774110824941-bde0d96b-7e53-4488-ac4e-2a3e8e34f887.jpg" 
            alt="Luxury Dining Background" 
            className="w-full h-full object-cover object-center transform scale-105 animate-pulse-slow opacity-60"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/50 to-black"></div>
        </div>

        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto flex flex-col items-center mt-16">
          <span className="text-[#D4AF37] tracking-[0.5em] text-xs md:text-sm uppercase mb-6 block font-medium">Dubai's Premier Culinary Destination</span>
          
          <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl mb-6 leading-tight font-bold drop-shadow-2xl">
            <span className="text-white tracking-wide">KITCHEN SHATE</span><br/>
            <span className="gold-gradient-text italic pr-2">AL HAMRIAH</span>
          </h1>
          
          <p className="text-gray-300 text-lg md:text-xl font-light mb-12 max-w-2xl mx-auto">
            Experience the zenith of fine dining. Indulge in our masterfully crafted 
            menu, surrounded by unparalleled opulence.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center w-full sm:w-auto">
            <a href="#menu" className="px-10 py-4 bg-transparent border border-[#D4AF37] text-[#D4AF37] uppercase tracking-widest text-sm hover:bg-[#D4AF37] hover:text-black hover:shadow-[0_0_20px_rgba(212,175,55,0.4)] transition-all duration-500 rounded-full text-center">
              View Menu
            </a>
            <a href="#reservation" className="px-10 py-4 gold-gradient-bg text-black uppercase tracking-widest text-sm font-bold shadow-[0_0_20px_rgba(212,175,55,0.4)] hover:shadow-[0_0_40px_rgba(212,175,55,0.8)] transition-all duration-500 rounded-full flex items-center justify-center gap-2">
              Book a Table
            </a>
          </div>
        </div>
      </section>

      {/* --- ABOUT SECTION --- */}
      <section id="about" className="py-24 md:py-32 relative">
        <div className="container mx-auto px-6">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <div className="lg:w-1/2 relative">
              <div className="absolute -inset-4 border border-[#D4AF37]/30 transform translate-x-4 translate-y-4"></div>
              <img 
                src="https://image2url.com/r2/default/images/1774110745040-e3060498-012b-4731-918b-618ec3040e69.jpg" 
                alt="Restaurant Interior" 
                className="relative z-10 w-full h-[500px] object-cover grayscale-[20%] hover:grayscale-0 transition-all duration-700"
              />
            </div>
            <div className="lg:w-1/2 space-y-8">
              <div className="flex items-center gap-4">
                <div className="h-[1px] w-12 bg-[#D4AF37]"></div>
                <span className="text-[#D4AF37] uppercase tracking-widest text-sm">Our Story</span>
              </div>
              <h2 className="font-serif text-4xl md:text-5xl leading-snug">
                A Symphony of <span className="text-[#D4AF37] italic">Taste & Elegance</span>
              </h2>
              <p className="text-gray-400 leading-relaxed font-light text-lg">
                Nestled in the heart of Dubai on Al Hamriya St, Kitchen Shate AlHamriah redefines 
                the luxury dining landscape. We blend traditional culinary artistry with modern 
                opulence, offering an exclusive menu where every dish is adorned with passion, 
                precision, and a touch of gold.
              </p>
              <p className="text-gray-400 leading-relaxed font-light text-lg">
                Our world-renowned chefs curate experiences that tantalize the palate and 
                mesmerize the senses, ensuring every visit is an unforgettable occasion.
              </p>
              <div className="pt-6">
                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/ca/Signature_of_Gordon_Ramsay.svg/1200px-Signature_of_Gordon_Ramsay.svg.png" alt="Chef Signature" className="h-12 opacity-50 filter invert" />
                <p className="text-[#D4AF37] font-serif mt-2 italic">Executive Chef</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- MENU SECTION --- */}
      <section id="menu" className="py-24 md:py-32 bg-zinc-950 relative border-t border-b border-white/5">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="font-serif text-4xl md:text-5xl mb-4">The <span className="gold-gradient-text italic">Collection</span></h2>
            <div className="h-[1px] w-24 bg-[#D4AF37] mx-auto opacity-50 mb-8"></div>
            
            {/* Categories */}
            <div className="flex flex-wrap justify-center gap-4 md:gap-8">
              {categories.map(category => (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`text-sm uppercase tracking-widest px-8 py-3 rounded-full border transition-all duration-300 ${
                    activeCategory === category 
                      ? 'border-[#D4AF37] bg-[#D4AF37]/10 text-[#D4AF37] shadow-[0_0_20px_rgba(212,175,55,0.3)]' 
                      : 'border-white/10 text-gray-400 hover:border-[#D4AF37]/50 hover:text-white hover:shadow-[0_0_15px_rgba(212,175,55,0.1)]'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          {/* Menu Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 lg:gap-12 max-w-6xl mx-auto">
            {MENU_ITEMS.filter(item => item.category === activeCategory).map(item => (
              <div key={item.id} className="group flex flex-col sm:flex-row gap-6 p-5 rounded-3xl bg-black/40 border border-white/5 hover:border-[#D4AF37]/50 hover:shadow-[0_10px_40px_rgba(212,175,55,0.15)] transition-all duration-500">
                <div className="w-full sm:w-40 h-40 overflow-hidden rounded-2xl shrink-0 shadow-[0_0_20px_rgba(0,0,0,0.8)] group-hover:shadow-[0_0_25px_rgba(212,175,55,0.4)] transition-all duration-500">
                  <img 
                    src={item.image} 
                    alt={item.name} 
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                  />
                </div>
                <div className="flex-1 flex flex-col justify-center">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-serif text-xl md:text-2xl text-white group-hover:text-[#D4AF37] transition-colors">
                      {item.name}
                    </h3>
                    <span className="font-serif text-xl text-[#D4AF37]">AED {item.price}</span>
                  </div>
                  <p className="text-gray-400 text-sm font-light leading-relaxed mb-6">
                    {item.description}
                  </p>
                  <div className="mt-auto">
                    <button 
                      onClick={() => addToCart(item)}
                      className="text-xs uppercase tracking-widest border border-white/20 px-6 py-3 hover:border-[#D4AF37] hover:text-[#D4AF37] hover:shadow-[0_0_15px_rgba(212,175,55,0.3)] transition-all rounded-full flex items-center gap-2 w-fit"
                    >
                      <Plus className="w-3 h-3" /> Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- GALLERY SECTION --- */}
      <section id="gallery" className="py-24">
        <div className="container mx-auto px-6">
          <div className="flex items-center gap-4 mb-16 justify-center">
            <div className="h-[1px] w-12 bg-[#D4AF37]"></div>
            <h2 className="font-serif text-3xl uppercase tracking-widest text-[#D4AF37]">Gallery</h2>
            <div className="h-[1px] w-12 bg-[#D4AF37]"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {GALLERY.map((img, idx) => (
              <div key={idx} className="relative group overflow-hidden h-80 rounded-3xl cursor-pointer">
                <div className="absolute inset-0 bg-black/40 group-hover:bg-transparent transition-colors duration-500 z-10"></div>
                <img 
                  src={img} 
                  alt="Gallery Item" 
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 border border-[#D4AF37]/0 group-hover:border-[#D4AF37]/50 transition-colors duration-500 z-20 m-4 rounded-2xl"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- REVIEWS SECTION --- */}
      <section className="py-24 bg-zinc-950 border-t border-b border-[#D4AF37]/10 relative overflow-hidden">
        {/* Subtle background glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#D4AF37]/5 rounded-full blur-[100px]"></div>
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center mb-16">
            <h2 className="font-serif text-4xl mb-4">Guest <span className="text-[#D4AF37] italic">Reflections</span></h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {REVIEWS.map((review, idx) => (
              <div key={idx} className="glass-panel p-10 rounded-3xl text-center hover:-translate-y-2 hover:shadow-[0_15px_50px_rgba(212,175,55,0.2)] hover:border-[#D4AF37]/40 transition-all duration-500">
                <div className="flex justify-center gap-1 mb-6">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-[#D4AF37] fill-[#D4AF37]" />
                  ))}
                </div>
                <p className="text-gray-300 font-serif italic text-lg mb-6">"{review.text}"</p>
                <h4 className="uppercase tracking-widest text-xs text-[#D4AF37]">{review.name}</h4>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- RESERVATION SECTION --- */}
      <section id="reservation" className="py-24 relative">
        <div className="container mx-auto px-6 max-w-4xl">
          <div className="glass-panel p-8 md:p-16 rounded-[2.5rem] relative overflow-hidden shadow-[0_0_50px_rgba(212,175,55,0.15)] border border-[#D4AF37]/20">
            {/* Decorative corner borders */}
            <div className="absolute top-0 left-0 w-16 h-16 border-t-2 border-l-2 border-[#D4AF37] opacity-50 m-8 rounded-tl-2xl shadow-[-5px_-5px_15px_rgba(212,175,55,0.2)]"></div>
            <div className="absolute bottom-0 right-0 w-16 h-16 border-b-2 border-r-2 border-[#D4AF37] opacity-50 m-8 rounded-br-2xl shadow-[5px_5px_15px_rgba(212,175,55,0.2)]"></div>

            <div className="text-center mb-12 relative z-10">
              <h2 className="font-serif text-4xl mb-4">Reserve Your <span className="text-[#D4AF37] italic">Table</span></h2>
              <p className="text-gray-400 font-light">Secure your place for an unforgettable dining experience.</p>
            </div>

            <form onSubmit={handleReservation} className="relative z-10 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <input 
                  type="text" 
                  required
                  value={reservationData.name}
                  onChange={(e) => setReservationData({...reservationData, name: e.target.value})}
                  placeholder="Full Name" 
                  className="w-full bg-black/50 border border-white/10 px-6 py-4 text-white focus:border-[#D4AF37] focus:shadow-[0_0_20px_rgba(212,175,55,0.2)] focus:outline-none transition-all duration-300 rounded-full" 
                />
                <input 
                  type="tel" 
                  required
                  value={reservationData.phone}
                  onChange={(e) => setReservationData({...reservationData, phone: e.target.value})}
                  placeholder="Phone Number" 
                  className="w-full bg-black/50 border border-white/10 px-6 py-4 text-white focus:border-[#D4AF37] focus:shadow-[0_0_20px_rgba(212,175,55,0.2)] focus:outline-none transition-all duration-300 rounded-full" 
                />
                <input 
                  type="date" 
                  required
                  value={reservationData.date}
                  onChange={(e) => setReservationData({...reservationData, date: e.target.value})}
                  className="w-full bg-black/50 border border-white/10 px-6 py-4 text-white focus:border-[#D4AF37] focus:shadow-[0_0_20px_rgba(212,175,55,0.2)] focus:outline-none transition-all duration-300 rounded-full md:col-span-2" 
                  style={{colorScheme: 'dark'}} 
                />
              </div>
              <button type="submit" className="w-full py-5 gold-gradient-bg text-black uppercase tracking-widest font-bold mt-4 shadow-[0_0_20px_rgba(212,175,55,0.3)] hover:shadow-[0_0_40px_rgba(212,175,55,0.7)] transition-all duration-300 rounded-full">
                Request Reservation
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* --- LOCATION & MAP SECTION --- */}
      <section className="relative h-[400px] md:h-[500px] w-full border-t border-[#D4AF37]/20 grayscale-[80%] hover:grayscale-0 transition-all duration-1000">
        <iframe 
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3608.26189912061!2d55.3341113!3d25.2618991!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f5cc11451dc05%3A0x88f58b191c0e3ea6!2sAl%20Hamriya%20St%2C%20Dubai%2C%20United%20Arab%20Emirates!5e0!3m2!1sen!2sus!4v1700000000000!5m2!1sen!2sus" 
          width="100%" 
          height="100%" 
          style={{ border: 0 }} 
          allowFullScreen="" 
          loading="lazy" 
          referrerPolicy="no-referrer-when-downgrade"
          title="Kitchen Shate Location"
          className="absolute inset-0"
        ></iframe>
        {/* Luxury dark overlay that fades on hover */}
        <div className="absolute inset-0 bg-black/50 pointer-events-none transition-opacity duration-1000 hover:opacity-0"></div>
        
        {/* Floating Address Badge */}
        <div className="absolute top-8 left-1/2 -translate-x-1/2 glass-panel px-6 py-3 rounded-full flex items-center gap-3 shadow-[0_0_30px_rgba(212,175,55,0.25)] border-[#D4AF37]/30 z-10 hover:shadow-[0_0_40px_rgba(212,175,55,0.5)] transition-all duration-500 cursor-default">
          <MapPin className="w-4 h-4 text-[#D4AF37]" />
          <span className="text-sm tracking-widest uppercase font-medium">Al Hamriya St, Dubai</span>
        </div>
      </section>

      {/* --- FOOTER --- */}
      <footer id="contact" className="bg-zinc-950 pt-24 pb-12 border-t border-[#D4AF37]/20">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16 text-center md:text-left">
            
            {/* Brand */}
            <div>
              <h1 className="font-serif text-2xl font-bold tracking-wider gold-gradient-text uppercase mb-4">
                Kitchen Shate
              </h1>
              <p className="text-gray-400 font-light text-sm leading-relaxed mb-6">
                Where luxury meets culinary excellence. Experience the finest dining in the heart of Dubai.
              </p>
              <div className="flex gap-4 justify-center md:justify-start">
                <a href="#" className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center hover:border-[#D4AF37] hover:text-[#D4AF37] transition-all"><Instagram className="w-4 h-4" /></a>
                <a href="#" className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center hover:border-[#D4AF37] hover:text-[#D4AF37] transition-all"><Facebook className="w-4 h-4" /></a>
                <a href="#" className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center hover:border-[#D4AF37] hover:text-[#D4AF37] transition-all"><Twitter className="w-4 h-4" /></a>
              </div>
            </div>

            {/* Contact Info */}
            <div className="flex flex-col items-center md:items-start space-y-4">
              <h3 className="font-serif text-xl text-white mb-2">Contact Us</h3>
              <a href="tel:+971523385425" className="flex items-center gap-3 text-gray-400 hover:text-[#D4AF37] transition-colors group">
                <Phone className="w-5 h-5 group-hover:text-[#D4AF37]" />
                <span className="font-light">+971 52 338 5425</span>
              </a>
              <div className="flex items-center gap-3 text-gray-400 group">
                <MapPin className="w-5 h-5 group-hover:text-[#D4AF37]" />
                <span className="font-light">Al Hamriya St - Hor Al Anz St, Dubai</span>
              </div>
              <div className="flex items-center gap-3 text-gray-400 group">
                <Clock className="w-5 h-5 group-hover:text-[#D4AF37]" />
                <span className="font-light">Open Daily: 11:00 AM – 11:00 PM</span>
              </div>
            </div>

            {/* Newsletter/Quick Action */}
            <div className="flex flex-col items-center md:items-start">
              <h3 className="font-serif text-xl text-white mb-6">Direct Order</h3>
              <p className="text-gray-400 font-light text-sm mb-6">Experience our luxury menu from the comfort of your home.</p>
              <button 
                onClick={() => window.open('https://wa.me/971523385425', '_blank')}
                className="px-8 py-4 bg-transparent border border-[#D4AF37] text-[#D4AF37] uppercase tracking-widest text-sm hover:bg-[#D4AF37] hover:text-black transition-all duration-300 rounded-full flex items-center gap-2"
              >
                <Phone className="w-4 h-4" />
                WhatsApp Us
              </button>
            </div>
          </div>

          <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-600 text-xs tracking-widest uppercase">
              © {new Date().getFullYear()} Kitchen Shate AlHamriah. All rights reserved.
            </p>
            <div className="flex gap-6 text-gray-600 text-xs tracking-widest uppercase">
              <a href="#" className="hover:text-[#D4AF37] transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-[#D4AF37] transition-colors">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}