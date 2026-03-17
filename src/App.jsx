import React, { useState, useEffect, useRef } from 'react';
import { 
  Menu, X, MapPin, Phone, Clock, Star, 
  ChevronRight, Calendar, Users, MessageCircle, 
  Instagram, Facebook, Twitter, Quote
} from 'lucide-react';

// --- CUSTOM HOOK FOR SCROLL ANIMATIONS ---
const RevealOnScroll = ({ children, className = "", delay = 0, direction = "up" }) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(ref.current);
        }
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const getTransform = () => {
    if (isVisible) return "translate-x-0 translate-y-0 scale-100";
    switch (direction) {
      case "up": return "translate-y-12";
      case "down": return "-translate-y-12";
      case "left": return "-translate-x-12";
      case "right": return "translate-x-12";
      case "scale": return "scale-95";
      default: return "translate-y-12";
    }
  };

  return (
    <div
      ref={ref}
      className={`transition-all duration-1000 ease-out ${
        isVisible ? "opacity-100" : "opacity-0"
      } ${getTransform()} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};

// --- DATA CONSTANTS ---
const CONTACT = {
  phone: "+971582005853",
  displayPhone: "+971 58 200 5853",
  whatsapp: "971582005853",
  address: "Al Seef St, Dubai, UAE",
  hours: "Mon - Sun: 6:00 PM - 2:00 AM"
};

const MENU_DATA = {
  Starters: [
    { name: "Wagyu Beef Carpaccio", price: "AED 185", desc: "Black truffle, parmesan crisps, 24k gold leaf, aged balsamic.", img: "https://images.unsplash.com/photo-1595295333158-4742f28fbd85?auto=format&fit=crop&q=80&w=800" },
    { name: "Royal Beluga Caviar", price: "AED 450", desc: "Served with traditional blinis, crème fraîche, and quail egg.", img: "https://images.unsplash.com/photo-1615870216519-2f9fa575fa5c?auto=format&fit=crop&q=80&w=800" },
    { name: "Lobster Bisque", price: "AED 140", desc: "Rich cognac-infused Maine lobster broth, herb croutons.", img: "https://images.unsplash.com/photo-1548943487-a2e4d43b4850?auto=format&fit=crop&q=80&w=800" },
    { name: "Truffle Burrata", price: "AED 125", desc: "Heirloom tomatoes, fresh basil, white truffle oil, balsamic caviar.", img: "https://images.unsplash.com/photo-1608897013039-887f214b9833?auto=format&fit=crop&q=80&w=800" }
  ],
  "Main Course": [
    { name: "Gold Leaf Tomahawk", price: "AED 950", desc: "1.2kg MB9+ Wagyu, wrapped in 24k edible gold, roasted garlic.", img: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&q=80&w=800" },
    { name: "Chilean Sea Bass", price: "AED 280", desc: "Miso-glazed, saffron risotto, asparagus, yuzu beurre blanc.", img: "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&q=80&w=800" },
    { name: "Truffle Risotto", price: "AED 210", desc: "Acquerello rice, wild mushrooms, freshly shaved black truffle.", img: "https://images.unsplash.com/photo-1633964913295-ceb43826e7cf?auto=format&fit=crop&q=80&w=800" },
    { name: "Lamb Crown Roast", price: "AED 320", desc: "Pistachio-crusted, rosemary jus, dauphinoise potatoes.", img: "https://images.unsplash.com/photo-1600891964092-4316c288032e?auto=format&fit=crop&q=80&w=800" }
  ],
  Drinks: [
    { name: "Sabaa Signature Smoked", price: "AED 110", desc: "Aged bourbon, maple, angostura bitters, hickory smoke.", img: "https://images.unsplash.com/photo-1514361892635-6b07e31e75f9?auto=format&fit=crop&q=80&w=800" },
    { name: "Desert Rose", price: "AED 95", desc: "Gin, rose water, lychee liqueur, fresh lemon, prosecco.", img: "https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&q=80&w=800" },
    { name: "Gold Dusted Martini", price: "AED 130", desc: "Premium vodka, dry vermouth, olive dust, 24k gold flakes.", img: "https://images.unsplash.com/photo-1575037614876-c3852d282ee0?auto=format&fit=crop&q=80&w=800" }
  ],
  Desserts: [
    { name: "The Dubai Diamond", price: "AED 190", desc: "Valrhona chocolate sphere, hazelnut praline, hot caramel pour.", img: "https://images.unsplash.com/photo-1551024506-0bc4a2cb1cbf?auto=format&fit=crop&q=80&w=800" },
    { name: "Saffron Panna Cotta", price: "AED 110", desc: "Iranian saffron, pistachio crumble, rose water gel.", img: "https://images.unsplash.com/photo-1488477181946-6428a0291777?auto=format&fit=crop&q=80&w=800" }
  ]
};

const REVIEWS = [
  { name: "Sheikh R.", text: "An absolute masterpiece of culinary art. The gold tomahawk was cooked to perfection. The ambiance is unmatched in Dubai.", rating: 5 },
  { name: "Elena M.", text: "A truly 5-star experience from the moment you step in. The glassmorphism decor and deep brown velvet seating create a stunning vibe.", rating: 5 },
  { name: "James T.", text: "Sabaa redefines luxury dining. The Truffle Burrata and Signature Smoked cocktail are a must-try. Impeccable service.", rating: 5 }
];

const GALLERY = [
  "https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?auto=format&fit=crop&q=80&w=800",
  "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&q=80&w=800",
  "https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&q=80&w=800",
  "https://images.unsplash.com/photo-1578474846511-04ba529f0b88?auto=format&fit=crop&q=80&w=800",
  "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&q=80&w=800",
  "https://images.unsplash.com/photo-1600891964092-4316c288032e?auto=format&fit=crop&q=80&w=800"
];

// --- MAIN COMPONENT ---
export default function App() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeMenuCategory, setActiveMenuCategory] = useState("Starters");
  const [activeReviewIndex, setActiveReviewIndex] = useState(0);
  
  const [formData, setFormData] = useState({
    name: "", phone: "", date: "", time: "", guests: "2"
  });

  // Handle Navbar Background on Scroll
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Review Auto-Slider
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveReviewIndex((prev) => (prev + 1) % REVIEWS.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleReservationSubmit = (e) => {
    e.preventDefault();
    const message = `*✨ New Reservation Request - Sabaa ✨*%0A%0A*Name:* ${formData.name}%0A*Phone:* ${formData.phone}%0A*Date:* ${formData.date}%0A*Time:* ${formData.time}%0A*Guests:* ${formData.guests}%0A%0A_Looking forward to a luxurious experience!_`;
    window.open(`https://wa.me/${CONTACT.whatsapp}?text=${message}`, "_blank");
  };

  const scrollToSection = (id) => {
    setIsMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-gray-200 font-sans selection:bg-[#D4AF37] selection:text-black overflow-x-hidden">
      {/* GLOBAL STYLES & FONTS */}
      <style dangerouslySetInnerHTML={{__html: `
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400&family=Outfit:wght@300;400;500&display=swap');
        
        .font-serif { font-family: 'Playfair Display', serif; }
        .font-sans { font-family: 'Outfit', sans-serif; }
        
        .glass-panel {
          background: rgba(20, 20, 20, 0.4);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          border: 1px solid rgba(212, 175, 55, 0.15);
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
        }
        
        .text-gold { color: #D4AF37; }
        .bg-gold { background-color: #D4AF37; }
        .border-gold { border-color: #D4AF37; }
        
        /* Custom Scrollbar */
        ::-webkit-scrollbar { width: 8px; }
        ::-webkit-scrollbar-track { background: #0a0a0a; }
        ::-webkit-scrollbar-thumb { background: #3e2723; border-radius: 4px; }
        ::-webkit-scrollbar-thumb:hover { background: #D4AF37; }
      `}} />

      {/* FLOATING ACTION BUTTONS */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-4">
        <a href={`tel:${CONTACT.phone}`} className="w-14 h-14 bg-[#3e2723] rounded-full flex items-center justify-center text-[#D4AF37] shadow-[0_0_20px_rgba(212,175,55,0.2)] hover:scale-110 transition-transform duration-300 border border-[#D4AF37]/30">
          <Phone className="w-6 h-6" />
        </a>
        <a href={`https://wa.me/${CONTACT.whatsapp}`} target="_blank" rel="noreferrer" className="w-14 h-14 bg-[#25D366] rounded-full flex items-center justify-center text-white shadow-[0_0_20px_rgba(37,211,102,0.4)] hover:scale-110 transition-transform duration-300">
          <MessageCircle className="w-7 h-7" />
        </a>
      </div>

      {/* NAVBAR */}
      <nav className={`fixed w-full z-40 transition-all duration-500 ${isScrolled ? 'glass-panel py-4' : 'bg-transparent py-6'}`}>
        <div className="max-w-7xl mx-auto px-6 lg:px-12 flex justify-between items-center">
          <div className="flex flex-col cursor-pointer" onClick={() => scrollToSection('hero')}>
            <h1 className="font-serif text-2xl md:text-3xl font-bold tracking-wider text-white">
              SABAA
            </h1>
            <span className="text-[10px] tracking-[0.3em] text-gold uppercase">Restaurant & Bar</span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-10">
            {['About', 'Menu', 'Gallery', 'Reviews'].map((item) => (
              <button 
                key={item} 
                onClick={() => scrollToSection(item.toLowerCase())}
                className="text-sm font-medium tracking-widest uppercase hover:text-gold transition-colors"
              >
                {item}
              </button>
            ))}
            <button 
              onClick={() => scrollToSection('reservation')}
              className="px-6 py-2.5 bg-transparent border border-[#D4AF37] text-gold text-sm tracking-widest uppercase hover:bg-gold hover:text-black transition-all duration-300"
            >
              Book Table
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <button className="md:hidden text-white" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            {isMobileMenuOpen ? <X className="w-8 h-8" /> : <Menu className="w-8 h-8" />}
          </button>
        </div>

        {/* Mobile Menu Dropdown */}
        <div className={`absolute top-full left-0 w-full glass-panel flex flex-col items-center py-8 space-y-6 transition-all duration-300 origin-top ${isMobileMenuOpen ? 'scale-y-100 opacity-100' : 'scale-y-0 opacity-0'}`}>
          {['About', 'Menu', 'Gallery', 'Reviews'].map((item) => (
            <button 
              key={item} 
              onClick={() => scrollToSection(item.toLowerCase())}
              className="text-lg tracking-widest uppercase hover:text-gold transition-colors"
            >
              {item}
            </button>
          ))}
          <button 
            onClick={() => scrollToSection('reservation')}
            className="px-8 py-3 bg-gold text-black text-sm tracking-widest uppercase mt-4"
          >
            Book Table
          </button>
        </div>
      </nav>

      {/* HERO SECTION */}
      <section id="hero" className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-black/50 z-10" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent z-10" />
          <img 
            src="https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&q=80&w=1920" 
            alt="Luxury Interior" 
            className="w-full h-full object-cover scale-105 animate-[pulse_20s_ease-in-out_infinite_alternate]"
          />
        </div>

        <div className="relative z-20 text-center px-4 mt-20">
          <RevealOnScroll delay={100}>
            <p className="text-gold tracking-[0.4em] uppercase text-xs md:text-sm mb-6 flex items-center justify-center gap-4">
              <span className="w-12 h-[1px] bg-gold block"></span>
              Dubai's Crown Jewel
              <span className="w-12 h-[1px] bg-gold block"></span>
            </p>
          </RevealOnScroll>
          
          <RevealOnScroll delay={300}>
            <h2 className="font-serif text-5xl md:text-7xl lg:text-8xl text-white mb-6 leading-tight drop-shadow-2xl">
              Experience Luxury <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D4AF37] to-[#F3E5AB]">
                Dining in Dubai
              </span>
            </h2>
          </RevealOnScroll>

          <RevealOnScroll delay={500}>
            <p className="text-gray-300 max-w-2xl mx-auto text-lg md:text-xl font-light mb-12">
              Premium gastronomy, an elegant ambiance, and unforgettable moments curated for the elite.
            </p>
          </RevealOnScroll>

          <RevealOnScroll delay={700} className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <button 
              onClick={() => scrollToSection('reservation')}
              className="w-64 sm:w-auto px-10 py-4 bg-gold text-black uppercase tracking-widest text-sm font-semibold hover:bg-white transition-all duration-300 flex items-center justify-center gap-2 group"
            >
              Book a Table
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
            <button 
              onClick={() => scrollToSection('menu')}
              className="w-64 sm:w-auto px-10 py-4 bg-transparent border border-white/30 text-white uppercase tracking-widest text-sm hover:border-gold hover:text-gold transition-all duration-300"
            >
              View Menu
            </button>
          </RevealOnScroll>
        </div>
      </section>

      {/* ABOUT SECTION */}
      <section id="about" className="py-24 lg:py-32 relative">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#3e2723]/20 rounded-full blur-[120px] -z-10 mix-blend-screen pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8 relative">
              <RevealOnScroll direction="right">
                <div className="flex items-center gap-4 mb-4">
                  <span className="w-16 h-[1px] bg-gold block"></span>
                  <span className="text-gold uppercase tracking-[0.2em] text-sm">Our Story</span>
                </div>
                <h2 className="font-serif text-4xl lg:text-5xl text-white leading-tight">
                  A Symphony of Taste <br/> & Elegance
                </h2>
              </RevealOnScroll>

              <RevealOnScroll delay={200} direction="right">
                <p className="text-gray-400 font-light leading-relaxed text-lg">
                  Nestled in the heart of Al Seef Street, Sabaa represents the pinnacle of luxury dining. We blend traditional opulence with modern culinary artistry. Every dish is a masterpiece, crafted using the world's most premium ingredients sourced by our Michelin-trained chefs.
                </p>
              </RevealOnScroll>

              <RevealOnScroll delay={400} direction="right">
                <div className="grid grid-cols-2 gap-8 pt-8 border-t border-white/10">
                  <div>
                    <h4 className="text-white font-serif text-xl mb-2">Premium Quality</h4>
                    <p className="text-sm text-gray-500">From 24k gold leaf to imported Wagyu, we compromise on nothing.</p>
                  </div>
                  <div>
                    <h4 className="text-white font-serif text-xl mb-2">Expert Chefs</h4>
                    <p className="text-sm text-gray-500">Culinary masters dedicated to perfecting every flavor profile.</p>
                  </div>
                </div>
              </RevealOnScroll>
            </div>

            <RevealOnScroll delay={300} direction="left" className="relative">
              <div className="relative z-10">
                <img 
                  src="https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?auto=format&fit=crop&q=80&w=800" 
                  alt="Chef plating food" 
                  className="w-full rounded-sm object-cover h-[600px] shadow-2xl"
                />
                <div className="absolute -bottom-10 -left-10 w-64 h-64 border-2 border-gold/30 -z-10 hidden md:block" />
              </div>
              
              {/* Floating Glass Element */}
              <div className="absolute top-10 -right-8 glass-panel p-6 max-w-[200px] hidden md:block animate-[bounce_4s_infinite]">
                <div className="flex gap-1 text-gold mb-2">
                  {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-current" />)}
                </div>
                <p className="text-xs text-gray-300 font-serif italic">"The finest dining experience in the Emirates."</p>
              </div>
            </RevealOnScroll>
          </div>
        </div>
      </section>

      {/* MENU SECTION */}
      <section id="menu" className="py-24 bg-[#111] relative">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <RevealOnScroll className="text-center mb-16">
            <span className="text-gold uppercase tracking-[0.2em] text-sm">Culinary Masterpieces</span>
            <h2 className="font-serif text-4xl lg:text-5xl text-white mt-4 mb-8">The Menus</h2>
            
            {/* Menu Tabs */}
            <div className="flex flex-wrap justify-center gap-4 lg:gap-8">
              {Object.keys(MENU_DATA).map((category) => (
                <button
                  key={category}
                  onClick={() => setActiveMenuCategory(category)}
                  className={`text-sm lg:text-base tracking-widest uppercase transition-all duration-300 pb-2 border-b-2 ${
                    activeMenuCategory === category 
                      ? "text-gold border-gold" 
                      : "text-gray-500 border-transparent hover:text-white"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </RevealOnScroll>

          {/* Menu Items Grid */}
          <div className="grid md:grid-cols-2 gap-x-12 gap-y-16">
            {MENU_DATA[activeMenuCategory].map((item, index) => (
              <RevealOnScroll key={index} delay={index * 100} className="group cursor-pointer">
                <div className="flex gap-6 items-center">
                  <div className="w-24 h-24 rounded-full overflow-hidden shrink-0 border border-gold/20 group-hover:border-gold transition-colors duration-500">
                    <img 
                      src={item.img} 
                      alt={item.name} 
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-baseline mb-2 border-b border-white/10 pb-2 border-dashed">
                      <h3 className="font-serif text-xl text-white group-hover:text-gold transition-colors duration-300">{item.name}</h3>
                      <span className="text-gold font-medium ml-4 shrink-0">{item.price}</span>
                    </div>
                    <p className="text-sm text-gray-400 font-light">{item.desc}</p>
                  </div>
                </div>
              </RevealOnScroll>
            ))}
          </div>

          <RevealOnScroll delay={400} className="text-center mt-16">
            <button className="px-8 py-3 border border-[#D4AF37] text-gold uppercase tracking-widest text-sm hover:bg-gold hover:text-black transition-all duration-300">
              Download Full PDF Menu
            </button>
          </RevealOnScroll>
        </div>
      </section>

      {/* GALLERY SECTION */}
      <section id="gallery" className="py-24 relative bg-[#0a0a0a]">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <RevealOnScroll className="text-center mb-16">
            <span className="text-gold uppercase tracking-[0.2em] text-sm">Visual Journey</span>
            <h2 className="font-serif text-4xl lg:text-5xl text-white mt-4">The Atmosphere</h2>
          </RevealOnScroll>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {GALLERY.map((src, index) => (
              <RevealOnScroll key={index} delay={index * 100} direction="scale">
                <div className="relative h-80 overflow-hidden group rounded-sm">
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-all duration-500 z-10" />
                  <img 
                    src={src} 
                    alt={`Gallery Image ${index + 1}`} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 border border-gold/0 group-hover:border-gold/50 transition-all duration-500 z-20 m-4 pointer-events-none" />
                </div>
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* REVIEWS SECTION */}
      <section id="reviews" className="py-24 relative bg-[#141414] overflow-hidden">
        {/* Background Decorative Element */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] border border-gold/5 rounded-full z-0" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border border-gold/10 rounded-full z-0" />
        
        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <RevealOnScroll>
            <Quote className="w-16 h-16 text-gold/30 mx-auto mb-8" />
            
            <div className="min-h-[200px] flex flex-col justify-center">
              <p className="font-serif text-2xl md:text-3xl lg:text-4xl text-white leading-relaxed italic mb-8 transition-opacity duration-500">
                "{REVIEWS[activeReviewIndex].text}"
              </p>
              
              <div className="flex flex-col items-center">
                <div className="flex gap-1 mb-3">
                  {[...Array(REVIEWS[activeReviewIndex].rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-gold fill-current" />
                  ))}
                </div>
                <h4 className="text-gold tracking-widest uppercase text-sm">{REVIEWS[activeReviewIndex].name}</h4>
              </div>
            </div>

            {/* Slider Dots */}
            <div className="flex justify-center gap-3 mt-12">
              {REVIEWS.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveReviewIndex(idx)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    idx === activeReviewIndex ? 'bg-gold w-8' : 'bg-gray-600'
                  }`}
                  aria-label={`Go to review ${idx + 1}`}
                />
              ))}
            </div>
          </RevealOnScroll>
        </div>
      </section>

      {/* RESERVATION & LOCATION SECTION */}
      <section id="reservation" className="py-24 relative bg-[#0a0a0a]">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 grid lg:grid-cols-2 gap-16">
          
          {/* Booking Form */}
          <RevealOnScroll direction="right">
            <div className="glass-panel p-8 md:p-12 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gold/10 blur-[50px] rounded-full" />
              
              <div className="mb-10">
                <span className="text-gold uppercase tracking-[0.2em] text-sm">Reserve Your Table</span>
                <h2 className="font-serif text-4xl text-white mt-2">Book a Premium Experience</h2>
              </div>

              <form onSubmit={handleReservationSubmit} className="space-y-6 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs text-gray-400 uppercase tracking-widest">Full Name</label>
                    <input 
                      type="text" required
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      className="w-full bg-transparent border-b border-white/20 pb-2 text-white focus:outline-none focus:border-gold transition-colors"
                      placeholder="John Doe"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs text-gray-400 uppercase tracking-widest">Phone Number</label>
                    <input 
                      type="tel" required
                      value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                      className="w-full bg-transparent border-b border-white/20 pb-2 text-white focus:outline-none focus:border-gold transition-colors"
                      placeholder="+971 50 000 0000"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="space-y-2 relative">
                    <label className="text-xs text-gray-400 uppercase tracking-widest">Date</label>
                    <div className="relative">
                      <Calendar className="absolute right-0 bottom-2 w-4 h-4 text-gray-400 pointer-events-none" />
                      <input 
                        type="date" required
                        value={formData.date}
                        onChange={(e) => setFormData({...formData, date: e.target.value})}
                        className="w-full bg-transparent border-b border-white/20 pb-2 text-white focus:outline-none focus:border-gold transition-colors appearance-none [&::-webkit-calendar-picker-indicator]:opacity-0"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs text-gray-400 uppercase tracking-widest">Time</label>
                    <select 
                      value={formData.time}
                      onChange={(e) => setFormData({...formData, time: e.target.value})}
                      className="w-full bg-transparent border-b border-white/20 pb-2 text-white focus:outline-none focus:border-gold transition-colors appearance-none"
                    >
                      <option value="" disabled className="bg-[#141414] text-gray-400">Select Time</option>
                      <option value="18:00" className="bg-[#141414]">6:00 PM</option>
                      <option value="19:00" className="bg-[#141414]">7:00 PM</option>
                      <option value="20:00" className="bg-[#141414]">8:00 PM</option>
                      <option value="21:00" className="bg-[#141414]">9:00 PM</option>
                      <option value="22:00" className="bg-[#141414]">10:00 PM</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs text-gray-400 uppercase tracking-widest">Guests</label>
                    <select 
                      value={formData.guests}
                      onChange={(e) => setFormData({...formData, guests: e.target.value})}
                      className="w-full bg-transparent border-b border-white/20 pb-2 text-white focus:outline-none focus:border-gold transition-colors appearance-none"
                    >
                      {[1,2,3,4,5,6,7,8,"8+"].map(num => (
                        <option key={num} value={num} className="bg-[#141414]">{num} People</option>
                      ))}
                    </select>
                  </div>
                </div>

                <button type="submit" className="w-full mt-8 py-4 bg-gold text-black uppercase tracking-widest text-sm font-semibold hover:bg-white transition-all duration-300 flex items-center justify-center gap-2 group">
                  Confirm via WhatsApp
                  <MessageCircle className="w-4 h-4 group-hover:scale-110 transition-transform" />
                </button>
              </form>
            </div>
          </RevealOnScroll>

          {/* Location & Map */}
          <RevealOnScroll direction="left" className="space-y-8 flex flex-col">
            <div className="space-y-6 flex-1">
              <h3 className="font-serif text-3xl text-white">Visit Us</h3>
              
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <MapPin className="w-6 h-6 text-gold shrink-0 mt-1" />
                  <div>
                    <h5 className="text-white mb-1 uppercase tracking-widest text-sm">Location</h5>
                    <p className="text-gray-400 font-light">{CONTACT.address}</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <Phone className="w-6 h-6 text-gold shrink-0 mt-1" />
                  <div>
                    <h5 className="text-white mb-1 uppercase tracking-widest text-sm">Contact</h5>
                    <p className="text-gray-400 font-light">{CONTACT.displayPhone}</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <Clock className="w-6 h-6 text-gold shrink-0 mt-1" />
                  <div>
                    <h5 className="text-white mb-1 uppercase tracking-widest text-sm">Hours</h5>
                    <p className="text-gray-400 font-light">{CONTACT.hours}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Map Frame */}
            <div className="w-full h-64 md:h-[280px] bg-white/5 rounded-sm border border-white/10 overflow-hidden relative group">
              <div className="absolute inset-0 bg-black/40 group-hover:bg-transparent transition-colors duration-500 pointer-events-none z-10" />
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3608.236162381395!2d55.30948951501061!3d25.262615483866164!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f433f4a3e7a6b%3A0xc3b5fa777c5ab350!2sAl%20Seef%20St%20-%20Dubai%20-%20United%20Arab%20Emirates!5e0!3m2!1sen!2sus!4v1680123456789!5m2!1sen!2sus" 
                className="w-full h-full filter invert-[90%] hue-rotate-180 contrast-125"
                style={{ border: 0 }} 
                allowFullScreen="" 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                title="Sabaa Location Map"
              />
            </div>
          </RevealOnScroll>

        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-[#050505] pt-20 pb-10 border-t border-white/5 relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-1 bg-gradient-to-r from-transparent via-gold to-transparent opacity-20" />
        
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
            
            {/* Brand */}
            <div className="md:col-span-2 space-y-6">
              <div>
                <h1 className="font-serif text-3xl font-bold tracking-wider text-white">SABAA</h1>
                <span className="text-xs tracking-[0.3em] text-gold uppercase">Restaurant & Bar</span>
              </div>
              <p className="text-gray-400 font-light max-w-sm text-sm leading-relaxed">
                Elevating the standard of fine dining in Dubai. Experience a curated journey of flavors in an atmosphere of unparalleled luxury.
              </p>
              <div className="flex gap-4">
                <a href="#" className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-gray-400 hover:text-gold hover:border-gold transition-all">
                  <Instagram className="w-4 h-4" />
                </a>
                <a href="#" className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-gray-400 hover:text-gold hover:border-gold transition-all">
                  <Facebook className="w-4 h-4" />
                </a>
                <a href="#" className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-gray-400 hover:text-gold hover:border-gold transition-all">
                  <Twitter className="w-4 h-4" />
                </a>
              </div>
            </div>

            {/* Links */}
            <div>
              <h4 className="text-white uppercase tracking-widest text-sm mb-6">Explore</h4>
              <ul className="space-y-3">
                {['Home', 'About Us', 'Menu', 'Gallery', 'Reservations'].map(link => (
                  <li key={link}>
                    <a href="#" onClick={(e) => { e.preventDefault(); scrollToSection(link.toLowerCase() === 'home' ? 'hero' : link.toLowerCase().replace(' ', '')); }} className="text-gray-400 hover:text-gold transition-colors text-sm font-light">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Newsletter */}
            <div>
              <h4 className="text-white uppercase tracking-widest text-sm mb-6">Newsletter</h4>
              <p className="text-gray-400 font-light text-sm mb-4">Subscribe for exclusive event invitations and seasonal menu updates.</p>
              <form className="flex border-b border-white/20 pb-2 focus-within:border-gold transition-colors">
                <input 
                  type="email" 
                  placeholder="Your Email" 
                  className="bg-transparent w-full text-white text-sm focus:outline-none"
                />
                <button type="button" className="text-gold uppercase text-xs tracking-widest hover:text-white transition-colors">
                  Join
                </button>
              </form>
            </div>
          </div>

          {/* Copyright */}
          <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-500 font-light">
            <p>&copy; {new Date().getFullYear()} Sabaa Restaurant & Bar. All rights reserved.</p>
            <div className="flex gap-6">
              <a href="#" className="hover:text-gold transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-gold transition-colors">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}