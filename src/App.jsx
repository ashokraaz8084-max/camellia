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
  Utensils,
  ShoppingCart,
  Trash2,
  Plus,
  Minus,
  Youtube,
  Share2,
  Navigation,
  CalendarDays,
  ArrowRight,
  Maximize2,
  CheckCircle,
  Home,
  Waves,
  Quote
} from 'lucide-react';

export default function App() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cart, setCart] = useState([]);
  const [activeGalleryTab, setActiveGalleryTab] = useState('All');

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    date: '',
    guests: '2 People'
  });

  // RESTAURANT DATA
  const RESTAURANT_NAME = "Arabian Fish House";
  const SUB_NAME = "Restaurant & Cafe";
  const PHONE_NUMBER = "+971 54 993 0057";
  const WHATSAPP_NUMBER = "971549930057"; 
  const ADDRESS = "Creek Street Exit 3, Al Fahidi, Dubai, UAE";
  const MAPS_URL = "https://www.google.com/maps/search/?api=1&query=Arabian+Fish+House+Al+Fahidi+Dubai";
  const MAP_EMBED_URL = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3608.2036734164287!2d55.2934575!3d25.2638848!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f433939e65e6d%3A0x6a0f0d9e83f8b0!2sAl%20Fahidi!5e0!3m2!1sen!2sae!4v1710000000000!5m2!1sen!2sae";

  // IMAGES
  const imgHero = "https://image2url.com/r2/default/images/1773545952370-735e5c02-ed88-4939-87d3-f2fa350ae97c.jpg";
  const imgPlatter = "https://image2url.com/r2/default/images/1773554566958-e658efeb-fe3c-434b-93d7-014867c6bf66.jpeg";
  const imgCafe = "https://image2url.com/r2/default/images/1773560236712-ea56b7ad-8112-4e54-9c1d-dcac839117e2.jpeg";
  const imgInterior = "https://image2url.com/r2/default/images/1773560294694-77c5082f-4c2c-481e-b483-73e47c55fda5.jpeg";

  const menuItems = [
    { id: 1, title: "Grilled Sea Bream", price: 85, category: "Fresh Catch", img: imgPlatter },
    { id: 2, title: "Emirati Fish Machboos", price: 65, category: "Traditional", img: imgHero },
    { id: 3, title: "Shrimp Scampi", price: 75, category: "Signature", img: imgInterior },
    { id: 4, title: "Arabic Cold Mezze", price: 45, category: "Starters", img: imgCafe },
    { id: 5, title: "Seafood Pasta", price: 70, category: "Main", img: imgPlatter },
    { id: 6, title: "Speciality Arabic Coffee", price: 25, category: "Cafe", img: imgCafe }
  ];

  const galleryImages = [
    { id: 1, category: "Seafood", url: imgPlatter },
    { id: 2, category: "Interior", url: imgInterior },
    { id: 3, category: "Creek View", url: imgHero },
    { id: 4, category: "Cafe", url: imgCafe },
    { id: 5, category: "Dining", url: imgInterior },
    { id: 6, category: "Desserts", url: imgPlatter },
  ];

  const reviews = [
    {
      id: 1,
      name: "Sarah Johnson",
      rating: 5,
      comment: "The freshest seafood I've had in Dubai. The view of the creek during sunset is absolutely breathtaking. Highly recommend the Grilled Sea Bream!",
      date: "2 weeks ago"
    },
    {
      id: 2,
      name: "Ahmed Al Mansoori",
      rating: 5,
      comment: "Authentic Emirati flavors. The Machboos tasted like a home-cooked meal. Great service and very welcoming atmosphere.",
      date: "1 month ago"
    },
    {
      id: 3,
      name: "Elena Rodriguez",
      rating: 4,
      comment: "A hidden gem in Al Fahidi. Perfect place to relax with a specialty coffee after exploring the historical district.",
      date: "3 days ago"
    }
  ];

  const filteredGallery = activeGalleryTab === 'All' 
    ? galleryImages 
    : galleryImages.filter(img => img.category === activeGalleryTab);

  const addToCart = (product) => {
    const existing = cart.find(item => item.id === product.id);
    if (existing) {
      setCart(cart.map(item => item.id === product.id ? { ...item, qty: item.qty + 1 } : item));
    } else {
      setCart([...cart, { ...product, qty: 1 }]);
    }
    if (window.innerWidth > 768) setIsCartOpen(true);
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
    const message = `*${RESTAURANT_NAME} - Booking Request*\n*Name:* ${formData.name}\n*Phone:* ${formData.phone}\n*Date:* ${formData.date}\n*Guests:* ${formData.guests}`;
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`, '_blank');
  };

  const scrollToSection = (id) => {
    setIsMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const offset = 80; 
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="min-h-screen bg-[#faf9f6] font-serif text-[#1a2e26] selection:bg-[#2c5282] selection:text-white pb-20 md:pb-0">
      
      {/* Navigation */}
      <nav className="fixed w-full z-50 bg-white/95 backdrop-blur-md border-b border-[#e5e1da] shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16 md:h-24">
            <div className="flex-shrink-0 flex items-center cursor-pointer gap-2 md:gap-3" onClick={() => scrollToSection('home')}>
              <div className="w-10 h-10 md:w-14 md:h-14 bg-[#1a2e26] rounded-full flex items-center justify-center text-[#4299e1]">
                <Waves size={20} className="md:w-6 md:h-6" />
              </div>
              <div className="flex flex-col">
                <span className="text-sm md:text-xl font-bold tracking-tight text-[#1a2e26] uppercase leading-none">{RESTAURANT_NAME}</span>
                <span className="text-[9px] md:text-[10px] font-medium tracking-[0.1em] text-[#2c5282] uppercase mt-1">{SUB_NAME}</span>
              </div>
            </div>

            <div className="hidden lg:flex items-center space-x-8">
              {['Home', 'About', 'Menu', 'Gallery', 'Reviews', 'Location'].map((item) => (
                <button key={item} onClick={() => scrollToSection(item.toLowerCase())} className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#1a2e26] hover:text-[#2c5282] transition-colors">
                  {item}
                </button>
              ))}
              <div className="h-6 w-[1px] bg-[#e5e1da]"></div>
              
              <button onClick={() => setIsCartOpen(true)} className="relative p-2 text-[#1a2e26] hover:text-[#2c5282] transition-colors">
                <ShoppingCart size={20} />
                {cart.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-[#2c5282] text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full ring-2 ring-white">
                    {cart.reduce((a, b) => a + b.qty, 0)}
                  </span>
                )}
              </button>
              <button onClick={() => scrollToSection('booking')} className="bg-[#1a2e26] text-white px-8 py-3 rounded-full text-[10px] font-bold uppercase tracking-widest hover:bg-[#2c5282] transition-all shadow-lg">
                Reservations
              </button>
            </div>

            <div className="lg:hidden flex items-center space-x-2">
               <button onClick={() => setIsCartOpen(true)} className="relative p-2 h-10 w-10 flex items-center justify-center">
                <ShoppingCart size={20} />
                {cart.length > 0 && <span className="absolute top-1 right-1 bg-[#2c5282] text-white text-[9px] min-w-[16px] h-4 flex items-center justify-center rounded-full font-bold">{cart.reduce((a, b) => a + b.qty, 0)}</span>}
              </button>
              <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="p-2 h-10 w-10 flex items-center justify-center text-[#1a2e26]">
                {isMobileMenuOpen ? <X size={24} /> : <MenuIcon size={24} />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Nav Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-[60] bg-white animate-fade-in lg:hidden">
          <div className="p-4 flex justify-end h-16 items-center">
            <button onClick={() => setIsMobileMenuOpen(false)}><X size={28}/></button>
          </div>
          <div className="flex flex-col items-center justify-center h-[calc(100vh-64px)] space-y-8 pb-20">
            {['Home', 'About', 'Menu', 'Gallery', 'Reviews', 'Location'].map((item) => (
              <button 
                key={item} 
                onClick={() => scrollToSection(item.toLowerCase())} 
                className="text-2xl font-bold uppercase tracking-widest text-[#1a2e26]"
              >
                {item}
              </button>
            ))}
            <button 
              onClick={() => scrollToSection('booking')}
              className="bg-[#1a2e26] text-white px-12 py-4 rounded-full text-sm font-bold uppercase tracking-widest"
            >
              Book Table
            </button>
          </div>
        </div>
      )}

      {/* Mobile Bottom Bar */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-t border-[#e5e1da] px-6 py-3 flex justify-between items-center shadow-[0_-4px_10px_rgba(0,0,0,0.05)]">
        <button onClick={() => scrollToSection('home')} className="flex flex-col items-center gap-1 text-[#1a2e26]">
          <Home size={20} />
          <span className="text-[9px] font-bold uppercase tracking-tighter">Home</span>
        </button>
        <button onClick={() => scrollToSection('menu')} className="flex flex-col items-center gap-1 text-[#1a2e26]">
          <MenuIcon size={20} />
          <span className="text-[9px] font-bold uppercase tracking-tighter">Menu</span>
        </button>
        <button onClick={() => setIsCartOpen(true)} className="relative flex flex-col items-center gap-1 -mt-8 bg-[#1a2e26] p-4 rounded-full text-white shadow-xl">
          <ShoppingCart size={24} />
          {cart.length > 0 && <span className="absolute top-0 right-0 bg-[#2c5282] text-white text-[10px] w-5 h-5 flex items-center justify-center rounded-full font-bold ring-2 ring-white">{cart.reduce((a, b) => a + b.qty, 0)}</span>}
        </button>
        <button onClick={() => scrollToSection('booking')} className="flex flex-col items-center gap-1 text-[#1a2e26]">
          <CalendarDays size={20} />
          <span className="text-[9px] font-bold uppercase tracking-tighter">Book</span>
        </button>
        <button onClick={() => window.open(`tel:${PHONE_NUMBER}`)} className="flex flex-col items-center gap-1 text-[#1a2e26]">
          <Phone size={20} />
          <span className="text-[9px] font-bold uppercase tracking-tighter">Call</span>
        </button>
      </div>

      {/* Cart Drawer */}
      {isCartOpen && (
        <div className="fixed inset-0 z-[100]">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setIsCartOpen(false)}></div>
          <div className="absolute right-0 top-0 h-full w-full max-w-md bg-white shadow-2xl flex flex-col transform animate-slide-in">
            <div className="p-6 border-b flex justify-between items-center bg-[#1a2e26] text-white">
              <h2 className="text-xl font-serif font-bold flex items-center gap-2"><ShoppingCart className="text-[#4299e1]" /> Your Selection</h2>
              <button onClick={() => setIsCartOpen(false)} className="p-2 hover:bg-white/10 rounded-full"><X /></button>
            </div>
            
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {cart.length === 0 ? (
                <div className="text-center py-20 opacity-50">
                  <ShoppingCart size={48} className="mx-auto mb-4" />
                  <p className="font-serif italic text-lg">Your tray is empty.</p>
                </div>
              ) : (
                cart.map(item => (
                  <div key={item.id} className="flex gap-4 items-center">
                    <img src={item.img} alt={item.title} className="w-16 h-16 rounded-lg object-cover shadow-sm" />
                    <div className="flex-1">
                      <div className="flex justify-between font-bold text-[#1a2e26] text-sm mb-1">
                        <h3 className="font-serif">{item.title}</h3>
                        <span className="text-[#2c5282]">AED {item.price * item.qty}</span>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="flex items-center border border-[#e5e1da] rounded-full overflow-hidden h-8">
                          <button onClick={() => updateQty(item.id, -1)} className="px-2 py-1 hover:bg-[#faf9f6]"><Minus size={10}/></button>
                          <span className="px-2 py-1 font-bold text-xs">{item.qty}</span>
                          <button onClick={() => updateQty(item.id, 1)} className="px-2 py-1 hover:bg-[#faf9f6]"><Plus size={10}/></button>
                        </div>
                        <button onClick={() => updateQty(item.id, -item.qty)} className="text-red-800"><Trash2 size={16}/></button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {cart.length > 0 && (
              <div className="p-6 bg-[#faf9f6] border-t border-[#e5e1da] mb-16 md:mb-0">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-neutral-500 uppercase tracking-widest text-[10px] font-bold">Estimated Total</span>
                  <span className="text-xl font-bold text-[#1a2e26]">AED {cartTotal}</span>
                </div>
                <button onClick={handleOrderSubmit} className="w-full bg-[#1a2e26] text-white py-4 rounded-full font-bold uppercase tracking-widest text-xs hover:bg-[#2c5282] transition-all shadow-xl flex items-center justify-center gap-3">
                  <CheckCircle size={18} /> Order on WhatsApp
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Hero Section */}
      <section id="home" className="relative h-[85vh] md:h-[90vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src={imgHero} 
            alt="Arabian Fish House Hero View" 
            className="w-full h-full object-cover" 
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#1a2e26]/80 to-[#1a2e26]/30"></div>
        </div>
        <div className="relative z-10 w-full max-w-7xl mx-auto px-6">
          <div className="max-w-3xl">
            <div className="mb-4 md:mb-6 inline-flex items-center gap-2 md:gap-3 bg-white/10 backdrop-blur-md border border-white/20 px-3 py-1.5 md:px-4 md:py-2 rounded-full text-[#4299e1] text-[8px] md:text-[10px] font-bold uppercase tracking-[0.3em]">
              <MapPin size={10} className="animate-pulse" /> Creek Street Exit 3, Al Fahidi
            </div>
            <h1 className="text-4xl md:text-8xl font-bold text-white mb-4 md:mb-8 tracking-tighter leading-[0.9] font-serif">
              Fresh From <br/> <span className="text-[#4299e1] italic">The Creek</span>
            </h1>
            <p className="text-sm md:text-2xl text-neutral-300 mb-6 md:mb-10 italic max-w-sm md:max-w-lg leading-relaxed font-serif opacity-90">
              Dubai's finest seafood destination and cafe. Experience tradition served with a panoramic view of the historic waterway.
            </p>
            <div className="flex flex-col xs:flex-row gap-3 md:gap-5">
              <button onClick={() => scrollToSection('menu')} className="bg-[#4299e1] text-white px-6 py-4 md:px-10 md:py-5 rounded-full text-[10px] md:text-[11px] font-bold uppercase tracking-widest hover:bg-white hover:text-[#1a2e26] transition-all shadow-2xl">
                View Menu
              </button>
              <button onClick={() => scrollToSection('booking')} className="bg-transparent text-white border border-white/30 px-6 py-4 md:px-10 md:py-5 rounded-full text-[10px] md:text-[11px] font-bold uppercase tracking-widest hover:bg-white/10 transition-all flex items-center justify-center gap-2 backdrop-blur-sm">
                <CalendarDays size={14} /> Reservation
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
           <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-16 items-center">
              <div className="relative order-2 lg:order-1">
                 <div className="relative z-10 rounded-3xl md:rounded-[40px] overflow-hidden shadow-2xl aspect-[4/3] md:aspect-[4/5]">
                    <img src={imgInterior} alt="Arabian Fish House Ambience" className="w-full h-full object-cover" />
                 </div>
                 <div className="absolute -bottom-6 -right-4 md:-bottom-10 md:-right-10 w-32 h-32 md:w-48 md:h-48 bg-[#4299e1] rounded-full z-0 flex items-center justify-center p-4 text-center">
                    <p className="text-white font-bold text-[8px] md:text-xs uppercase tracking-widest leading-tight">Fresh Daily Catch</p>
                 </div>
              </div>
              <div className="space-y-6 md:order-2">
                 <h4 className="text-[#2c5282] font-bold uppercase tracking-[0.4em] text-[10px]">The Concept</h4>
                 <h2 className="text-3xl md:text-5xl font-bold font-serif leading-tight">Seafood & Serenity at Al Fahidi</h2>
                 <p className="text-neutral-500 font-serif text-base md:text-lg italic leading-relaxed">
                   Located at the historic Exit 3 of Al Fahidi, Arabian Fish House brings the bounty of the Arabian Gulf to your table. 
                 </p>
                 <p className="text-neutral-500 text-sm leading-relaxed hidden md:block">
                   Whether you're looking for a traditional Emirati seafood feast or a quiet specialty coffee with a view of the dhows passing by, we provide an atmosphere that bridges Dubai's past and present.
                 </p>
                 <div className="grid grid-cols-2 gap-4 md:gap-8 pt-2">
                    <div className="bg-[#faf9f6] p-4 rounded-2xl md:bg-transparent md:p-0">
                       <h3 className="text-2xl md:text-3xl font-bold text-[#1a2e26]">Premium</h3>
                       <p className="text-[8px] md:text-xs uppercase tracking-widest text-[#2c5282] font-bold mt-1">Quality Fish</p>
                    </div>
                    <div className="bg-[#faf9f6] p-4 rounded-2xl md:bg-transparent md:p-0">
                       <h3 className="text-2xl md:text-3xl font-bold text-[#1a2e26]">Scenic</h3>
                       <p className="text-[8px] md:text-xs uppercase tracking-widest text-[#2c5282] font-bold mt-1">Creek View</p>
                    </div>
                 </div>
              </div>
           </div>
        </div>
      </section>

      {/* Menu Section */}
      <section id="menu" className="py-16 md:py-24 bg-[#faf9f6]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-10 md:mb-16">
            <h4 className="text-[#2c5282] font-bold uppercase tracking-[0.4em] text-[10px] mb-2">Our Menu</h4>
            <h2 className="text-3xl md:text-5xl font-bold font-serif text-[#1a2e26]">House Specialties</h2>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-10">
            {menuItems.map((item) => (
              <div key={item.id} className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all group flex flex-col h-full border border-[#e5e1da]/50">
                <div className="relative overflow-hidden h-48 md:h-72">
                  <img src={item.img} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                  <div className="absolute top-4 left-4 bg-[#1a2e26]/90 backdrop-blur-sm px-3 py-1 rounded-full text-[8px] font-bold text-[#4299e1] uppercase tracking-[0.2em]">{item.category}</div>
                </div>
                <div className="p-6 md:p-8 flex-1 flex flex-col">
                  <div className="flex justify-between items-start mb-2 md:mb-4">
                    <h3 className="text-lg md:text-xl font-bold text-[#1a2e26] font-serif">{item.title}</h3>
                    <span className="text-base md:text-lg font-bold text-[#2c5282] ml-2">AED {item.price}</span>
                  </div>
                  <p className="text-neutral-500 text-xs md:text-sm mb-6 font-serif italic line-clamp-2">Seasoned with local spices and prepared to your liking.</p>
                  
                  <button 
                    onClick={() => addToCart(item)}
                    className="mt-auto w-full bg-[#1a2e26] text-[#4299e1] py-3.5 md:py-4 rounded-full font-bold text-[10px] md:text-[11px] uppercase tracking-[0.2em] hover:bg-[#2c5282] hover:text-white transition-all flex items-center justify-center gap-2 shadow-lg active:scale-95"
                  >
                    <Plus size={14} strokeWidth={3} /> Add To Order
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section id="gallery" className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="text-center mb-10 md:mb-16">
            <h4 className="text-[#2c5282] font-bold uppercase tracking-[0.4em] text-[10px] mb-2">Visuals</h4>
            <h2 className="text-3xl md:text-5xl font-bold font-serif mb-8 text-[#1a2e26]">The Experience</h2>
            
            <div className="flex flex-wrap justify-center gap-2 md:gap-3">
              {['All', 'Seafood', 'Interior', 'Creek View', 'Cafe'].map(tab => (
                <button 
                  key={tab}
                  onClick={() => setActiveGalleryTab(tab)}
                  className={`px-4 py-2 rounded-full text-[9px] md:text-[10px] font-bold uppercase tracking-widest transition-all border ${
                    activeGalleryTab === tab 
                    ? 'bg-[#1a2e26] text-white border-[#1a2e26]' 
                    : 'bg-transparent text-neutral-400 border-[#e5e1da]'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-8">
            {filteredGallery.map((img, index) => (
              <div key={img.id} className={`group relative overflow-hidden rounded-2xl md:rounded-[40px] cursor-pointer shadow-lg aspect-square ${index % 3 === 0 ? 'md:row-span-2 md:aspect-auto' : ''}`}>
                <img 
                  src={img.url} 
                  alt={img.category} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                />
                <div className="absolute inset-0 bg-[#1a2e26]/60 opacity-0 group-hover:opacity-100 transition-all flex flex-col items-center justify-center p-2">
                   <Maximize2 size={16} className="text-[#4299e1] mb-1" />
                   <p className="text-white text-[8px] font-bold uppercase tracking-widest">{img.category}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Reviews Section */}
      <section id="reviews" className="py-16 md:py-24 bg-[#faf9f6] border-y border-[#e5e1da]/50 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-12 gap-6">
            <div className="max-w-xl text-left">
              <h4 className="text-[#2c5282] font-bold uppercase tracking-[0.4em] text-[10px] mb-2">Guest Feedback</h4>
              <h2 className="text-3xl md:text-5xl font-bold font-serif text-[#1a2e26]">What Our Visitors Say</h2>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1 text-[#2c5282]">
                {[...Array(5)].map((_, i) => <Star key={i} size={20} fill="currentColor" />)}
              </div>
              <span className="font-bold text-lg text-[#1a2e26]">4.9 / 5.0</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {reviews.map((review) => (
              <div key={review.id} className="bg-white p-8 md:p-10 rounded-[30px] shadow-sm hover:shadow-xl transition-all duration-500 group border border-[#e5e1da]/30 flex flex-col h-full relative">
                <Quote className="absolute top-8 right-8 text-[#e5e1da] group-hover:text-[#4299e1] transition-colors" size={40} strokeWidth={1} />
                <div className="flex gap-1 mb-6 text-[#2c5282]">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={14} fill={i < review.rating ? "currentColor" : "none"} stroke="currentColor" />
                  ))}
                </div>
                <p className="text-neutral-600 font-serif italic text-base leading-relaxed mb-8 flex-1">
                  "{review.comment}"
                </p>
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-[#1a2e26] rounded-full flex items-center justify-center text-[#4299e1] font-bold text-sm uppercase">
                    {review.name.charAt(0)}
                  </div>
                  <div>
                    <h5 className="font-bold text-[#1a2e26] text-sm uppercase tracking-wide">{review.name}</h5>
                    <p className="text-[10px] text-neutral-400 font-bold uppercase tracking-widest">{review.date}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <button className="inline-flex items-center gap-2 text-[#2c5282] font-bold uppercase tracking-[0.2em] text-[10px] hover:gap-4 transition-all">
              Write a Review <ArrowRight size={14} />
            </button>
          </div>
        </div>
      </section>

      {/* Booking Form */}
      <section id="booking" className="py-16 md:py-24 bg-[#1a2e26]">
        <div className="max-w-4xl mx-auto px-6">
           <div className="text-center mb-10 md:mb-16">
              <h4 className="text-[#4299e1] font-bold uppercase tracking-[0.4em] text-[10px] mb-2">Reservations</h4>
              <h2 className="text-3xl md:text-5xl font-bold mb-4 font-serif text-white">Secure Your Table</h2>
              <p className="text-white/40 text-[10px] font-bold uppercase tracking-[0.3em]">Creek-side seating available</p>
           </div>
           <form onSubmit={handleBookingSubmit} className="bg-white p-8 md:p-16 rounded-3xl md:rounded-[40px] shadow-2xl">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 text-left">
                  <div className="space-y-1">
                    <label className="text-[9px] font-bold uppercase tracking-widest text-[#1a2e26]">Full Name</label>
                    <input 
                      type="text" placeholder="Enter your name" required 
                      className="w-full bg-transparent border-b border-[#e5e1da] py-2 outline-none focus:border-[#4299e1] transition-all text-[#1a2e26] font-serif text-sm"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[9px] font-bold uppercase tracking-widest text-[#1a2e26]">Phone Number</label>
                    <input 
                      type="tel" placeholder="+971 -- --- ----" required 
                      className="w-full bg-transparent border-b border-[#e5e1da] py-2 outline-none focus:border-[#4299e1] transition-all text-[#1a2e26] font-serif text-sm"
                      value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[9px] font-bold uppercase tracking-widest text-[#1a2e26]">Visit Date</label>
                    <input 
                      type="date" required 
                      className="w-full bg-transparent border-b border-[#e5e1da] py-2 outline-none focus:border-[#4299e1] transition-all text-[#1a2e26] font-serif text-sm"
                      value={formData.date}
                      onChange={(e) => setFormData({...formData, date: e.target.value})}
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[9px] font-bold uppercase tracking-widest text-[#1a2e26]">Number of Guests</label>
                    <select 
                      className="w-full bg-transparent border-b border-[#e5e1da] py-2 outline-none focus:border-[#4299e1] transition-all text-[#1a2e26] font-serif text-sm"
                      value={formData.guests}
                      onChange={(e) => setFormData({...formData, guests: e.target.value})}
                    >
                      <option value="1 Person">1 Person</option>
                      <option value="2 People">2 People</option>
                      <option value="3 People">3 People</option>
                      <option value="4+ People">Large Group (4+)</option>
                    </select>
                  </div>
                  <button className="md:col-span-2 mt-4 bg-[#1a2e26] text-white py-4 rounded-full font-bold text-[10px] uppercase tracking-[0.3em] hover:bg-[#4299e1] transition-all flex items-center justify-center gap-3">
                    <CalendarDays size={14} /> Request Booking
                  </button>
              </div>
           </form>
        </div>
      </section>

      {/* Location Section */}
      <section id="location" className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 md:gap-12">
            <div className="lg:col-span-1 space-y-8 md:space-y-10">
              <h2 className="text-3xl md:text-4xl font-bold font-serif leading-tight text-[#1a2e26]">Visit the <br className="hidden md:block" /> Creek House</h2>
              
              <div className="space-y-6 md:space-y-8">
                <div className="flex gap-4 md:gap-5">
                  <div className="h-10 w-10 md:h-12 md:w-12 bg-[#faf9f6] text-[#4299e1] rounded-full flex items-center justify-center border border-[#e5e1da] shrink-0"><MapPin size={18}/></div>
                  <div>
                    <h5 className="font-bold text-[10px] uppercase tracking-widest text-[#1a2e26]">Our Address</h5>
                    <p className="text-neutral-500 text-xs md:text-sm mt-1 leading-relaxed font-serif italic">{ADDRESS}</p>
                    <a href={MAPS_URL} target="_blank" rel="noreferrer" className="text-[#2c5282] text-[9px] font-bold uppercase tracking-widest mt-2 flex items-center gap-1">
                      Get Directions <Navigation size={8} />
                    </a>
                  </div>
                </div>

                <div className="flex gap-4 md:gap-5">
                  <div className="h-10 w-10 md:h-12 md:w-12 bg-[#faf9f6] text-[#4299e1] rounded-full flex items-center justify-center border border-[#e5e1da] shrink-0"><Phone size={18}/></div>
                  <div>
                    <h5 className="font-bold text-[10px] uppercase tracking-widest text-[#1a2e26]">Call Us</h5>
                    <p className="text-neutral-500 text-xs md:text-sm mt-1 font-bold tracking-[0.1em]">{PHONE_NUMBER}</p>
                  </div>
                </div>

                <div className="flex gap-4 md:gap-5">
                  <div className="h-10 w-10 md:h-12 md:w-12 bg-[#faf9f6] text-[#4299e1] rounded-full flex items-center justify-center border border-[#e5e1da] shrink-0"><Clock size={18}/></div>
                  <div>
                    <h5 className="font-bold text-[10px] uppercase tracking-widest text-[#1a2e26]">Hours</h5>
                    <p className="text-neutral-500 text-xs md:text-sm mt-1 font-serif italic">10:00 AM - 12:00 AM Daily</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-2 h-[350px] md:h-[550px] rounded-3xl md:rounded-[40px] overflow-hidden shadow-2xl border border-[#e5e1da]">
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

      {/* Footer */}
      <footer className="bg-[#1a2e26] text-white pt-16 md:pt-24 pb-8 md:pb-12">
        <div className="max-w-7xl mx-auto px-6 text-center md:text-left">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 md:gap-12 mb-12 md:mb-20">
            <div className="space-y-6">
              <div className="flex flex-col gap-2">
                <div className="flex items-center justify-center md:justify-start gap-2">
                  <Waves className="text-[#4299e1]" size={24} />
                  <span className="text-xl font-bold tracking-tighter uppercase font-serif">{RESTAURANT_NAME}</span>
                </div>
                <p className="text-white/30 text-xs font-serif italic leading-relaxed max-w-[250px] mx-auto md:mx-0">
                  Authentic seafood and specialty coffee overlooking the heart of old Dubai.
                </p>
              </div>
              <div className="flex justify-center md:justify-start gap-3">
                {[Instagram, Facebook, Youtube, Share2].map((Icon, i) => (
                  <button key={i} className="h-8 w-8 rounded-full border border-white/10 flex items-center justify-center text-white/60 hover:text-[#4299e1] hover:border-[#4299e1] transition-all">
                    <Icon size={14} />
                  </button>
                ))}
              </div>
            </div>

            <div className="hidden md:block">
              <h5 className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#4299e1] mb-6">Explore</h5>
              <ul className="space-y-3">
                {['Home', 'About', 'Menu', 'Gallery', 'Reviews', 'Location'].map((link) => (
                  <li key={link}>
                    <button 
                      onClick={() => scrollToSection(link.toLowerCase())}
                      className="text-white/40 hover:text-white transition-colors font-serif text-sm"
                    >
                      {link}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h5 className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#4299e1] mb-4 md:mb-6">Visit Us</h5>
              <ul className="space-y-4 md:space-y-6">
                <li className="flex justify-center md:justify-start gap-3">
                  <MapPin className="text-[#4299e1] shrink-0" size={16} />
                  <span className="text-white/40 text-xs font-serif">{ADDRESS}</span>
                </li>
                <li className="flex justify-center md:justify-start gap-3">
                  <Phone className="text-[#4299e1] shrink-0" size={16} />
                  <span className="text-white/40 text-xs font-serif">{PHONE_NUMBER}</span>
                </li>
              </ul>
            </div>

            <div>
              <h5 className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#4299e1] mb-4 md:mb-6">Newsletter</h5>
              <div className="relative max-w-[280px] mx-auto md:mx-0">
                <input 
                  type="email" 
                  placeholder="Your Email" 
                  className="w-full bg-white/5 border border-white/10 rounded-full py-3 px-5 outline-none focus:border-[#4299e1] text-xs font-serif italic"
                />
                <button className="absolute right-1 top-1 h-8 w-8 bg-[#4299e1] text-white rounded-full flex items-center justify-center">
                  <ArrowRight size={14} />
                </button>
              </div>
            </div>
          </div>
          <div className="pt-8 border-t border-white/5 text-center">
             <p className="text-[10px] text-white/20 uppercase tracking-widest">© 2024 {RESTAURANT_NAME} {SUB_NAME}. All Rights Reserved.</p>
          </div>
        </div>
      </footer>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes slideIn { from { transform: translateX(100%); } to { transform: translateX(0); } }
        .animate-slide-in { animation: slideIn 0.3s cubic-bezier(0.4, 0, 0.2, 1) forwards; }
        .animate-fade-in { animation: fadeIn 0.3s ease-out forwards; }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        
        html { scroll-behavior: smooth; }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: #faf9f6; }
        ::-webkit-scrollbar-thumb { background: #1a2e26; border-radius: 10px; }

        @media (max-width: 768px) {
          input, select, textarea { font-size: 16px !important; }
        }
      `}} />
    </div>
  );
}