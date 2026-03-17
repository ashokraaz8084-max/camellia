import React, { useState, useEffect, useRef } from 'react';
import { 
  Menu, X, MapPin, Phone, Clock, Star, 
  ChevronRight, Calendar, MessageCircle, 
  Instagram, Facebook, Twitter, Quote,
  Crown
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
      case "up": return "translate-y-16";
      case "down": return "-translate-y-16";
      case "left": return "-translate-x-16";
      case "right": return "translate-x-16";
      case "scale": return "scale-90";
      default: return "translate-y-16";
    }
  };

  return (
    <div
      ref={ref}
      className={`transition-all duration-[1200ms] cubic-bezier(0.16, 1, 0.3, 1) ${
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
  phone: "+971509867110",
  displayPhone: "+971 50 986 7110",
  whatsapp: "971509867110",
  address: "Al Fahidi St, Bur Dubai, Dubai, UAE",
  hours: "Mon - Sun: 1:00 PM - 2:00 AM"
};

const MENU_DATA = {
  "Starters": [
    { name: "Gold-Leaf Burrata", price: "AED 125", desc: "Fresh Italian burrata, heirloom tomatoes, white truffle oil, wrapped in 24k edible gold.", img: "https://images.unsplash.com/photo-1608897013039-887f214b9833?auto=format&fit=crop&q=80&w=800" },
    { name: "Wagyu Beef Tartare", price: "AED 180", desc: "A5 Wagyu hand-cut, quail egg yolk, black caviar, served with artisanal crostini.", img: "https://images.unsplash.com/photo-1595295333158-4742f28fbd85?auto=format&fit=crop&q=80&w=800" },
    { name: "Saffron Scallops", price: "AED 145", desc: "Pan-seared Hokkaido scallops atop a bed of rich Iranian saffron infused puree.", img: "https://images.unsplash.com/photo-1626804475297-41609ea084eb?auto=format&fit=crop&q=80&w=800" },
    { name: "Truffle Mushroom Velouté", price: "AED 95", desc: "Wild forest mushrooms, light cream, finished with freshly shaved black winter truffle.", img: "https://images.unsplash.com/photo-1548943487-a2e4d43b4850?auto=format&fit=crop&q=80&w=800" }
  ],
  "Main Course": [
    { name: "Royal Rack of Lamb", price: "AED 290", desc: "Pistachio-crusted prime lamb, rosemary jus, served with smoked dauphinoise potatoes.", img: "https://images.unsplash.com/photo-1600891964092-4316c288032e?auto=format&fit=crop&q=80&w=800" },
    { name: "Butter Poached Lobster", price: "AED 340", desc: "Maine lobster tail slow-poached in Beurre Blanc, accompanied by asparagus and caviar.", img: "https://images.unsplash.com/photo-1559742811-822873691df8?auto=format&fit=crop&q=80&w=800" },
    { name: "Wagyu Tomahawk (1.2kg)", price: "AED 950", desc: "MB9+ Wagyu ribeye, smoked tableside over cherry wood, roasted garlic and Himalayan salt.", img: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&q=80&w=800" },
    { name: "Black Truffle Risotto", price: "AED 210", desc: "Aged Acquerello rice, parmesan crisps, gold flakes, and tableside truffle shaving.", img: "https://images.unsplash.com/photo-1633964913295-ceb43826e7cf?auto=format&fit=crop&q=80&w=800" }
  ],
  "Specials": [
    { name: "The Sultan's Feast", price: "AED 1200", desc: "An opulent multi-course journey curated personally by our Executive Chef for the table.", img: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&q=80&w=800" },
    { name: "24K Gold Royal Biryani", price: "AED 350", desc: "Slow-cooked saffron rice, tender lamb, sealed with dough and adorned with pure gold leaf.", img: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&q=80&w=800" },
    { name: "Crown Roast & Caviar", price: "AED 850", desc: "A majestic centerpiece of prime meats paired with Royal Beluga Caviar and blinis.", img: "https://images.unsplash.com/photo-1615870216519-2f9fa575fa5c?auto=format&fit=crop&q=80&w=800" }
  ],
  "Desserts": [
    { name: "Valrhona Chocolate Dome", price: "AED 110", desc: "Dark chocolate sphere melted tableside with hot spiced caramel, revealing hazelnut praline.", img: "https://images.unsplash.com/photo-1551024506-0bc4a2cb1cbf?auto=format&fit=crop&q=80&w=800" },
    { name: "Saffron Rose Panna Cotta", price: "AED 90", desc: "Silky cream infused with Iranian saffron, rose water gel, and edible flower petals.", img: "https://images.unsplash.com/photo-1488477181946-6428a0291777?auto=format&fit=crop&q=80&w=800" },
    { name: "Gold Dusted Baklava", price: "AED 130", desc: "Layers of crisp phyllo, premium pistachios, honey syrup, and a dusting of 24k gold.", img: "https://images.unsplash.com/photo-1519671282429-b44660ead0a7?auto=format&fit=crop&q=80&w=800" }
  ]
};

const REVIEWS = [
  { name: "H.E. Sheikh Majid", text: "A dining experience that redefines luxury. The ambiance is incredibly regal, and the Wagyu Tomahawk was an absolute masterpiece.", rating: 5 },
  { name: "Victoria S.", text: "The attention to detail is astonishing. From the deep maroon velvet seating to the gold-leaf accents on the food. Easily a world-class 5-star establishment.", rating: 5 },
  { name: "Khalid Al Amiri", text: "Impeccable service that makes you feel like royalty. The Sultan's Feast is a culinary journey you must experience while in Dubai.", rating: 5 }
];

const GALLERY = [
  "https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?auto=format&fit=crop&q=80&w=800", // Elegant interior
  "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&q=80&w=800", // Luxury plate
  "https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&q=80&w=800", // Interior chandelier
  "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&q=80&w=800", // Tomahawk
  "https://images.unsplash.com/photo-1578474846511-04ba529f0b88?auto=format&fit=crop&q=80&w=800", // Ambiance
  "https://images.unsplash.com/photo-1600891964092-4316c288032e?auto=format&fit=crop&q=80&w=800", // Lamb rack
];

// --- MAIN COMPONENT ---
export default function App() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeMenuCategory, setActiveMenuCategory] = useState("Main Course");
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
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  const handleReservationSubmit = (e) => {
    e.preventDefault();
    const message = `*👑 Royal Reservation Request 👑*%0A%0A*Name:* ${formData.name}%0A*Phone:* ${formData.phone}%0A*Date:* ${formData.date}%0A*Time:* ${formData.time}%0A*Guests:* ${formData.guests}%0A%0A_Awaiting confirmation for a premium dining experience!_`;
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
    <div className="min-h-screen bg-[#030303] text-gray-200 font-sans selection:bg-[#D4AF37] selection:text-black overflow-x-hidden">
      {/* GLOBAL STYLES & FONTS */}
      <style dangerouslySetInnerHTML={{__html: `
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400&family=Montserrat:wght@300;400;500;600&display=swap');
        
        .font-serif { font-family: 'Cormorant Garamond', serif; }
        .font-sans { font-family: 'Montserrat', sans-serif; }
        
        .glass-panel {
          background: rgba(15, 5, 5, 0.6);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border: 1px solid rgba(212, 175, 55, 0.15); /* Gold tint */
          box-shadow: 0 30px 60px -12px rgba(0, 0, 0, 0.8), inset 0 0 20px rgba(107, 5, 5, 0.1);
        }
        
        .text-gold { color: #D4AF37; }
        .bg-gold { background-color: #D4AF37; }
        .border-gold { border-color: #D4AF37; }

        .text-maroon { color: #8B0000; }
        .bg-maroon { background-color: #4A0404; }

        .glow-maroon {
          text-shadow: 0 0 25px rgba(139, 0, 0, 0.6);
        }
        
        /* Custom Scrollbar */
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: #030303; }
        ::-webkit-scrollbar-thumb { background: #4A0404; border-radius: 4px; }
        ::-webkit-scrollbar-thumb:hover { background: #D4AF37; }

        .masonry-grid {
          column-count: 1;
          column-gap: 1.5rem;
        }
        @media (min-width: 768px) { .masonry-grid { column-count: 2; } }
        @media (min-width: 1024px) { .masonry-grid { column-count: 3; } }
        .masonry-item {
          break-inside: avoid;
          margin-bottom: 1.5rem;
        }
      `}} />

      {/* FLOATING ACTION BUTTONS */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-4">
        <a href={`tel:${CONTACT.phone}`} className="w-14 h-14 bg-gradient-to-br from-[#2A0202] to-[#0A0000] rounded-full flex items-center justify-center text-gold shadow-[0_0_20px_rgba(212,175,55,0.2)] hover:scale-110 transition-all duration-300 border border-gold/30 group">
          <Phone className="w-6 h-6 group-hover:text-white transition-colors" />
        </a>
        <a href={`https://wa.me/${CONTACT.whatsapp}`} target="_blank" rel="noreferrer" className="w-14 h-14 bg-gradient-to-br from-[#25D366] to-[#128C7E] rounded-full flex items-center justify-center text-white shadow-[0_0_25px_rgba(37,211,102,0.4)] hover:scale-110 transition-all duration-300 group">
          <MessageCircle className="w-7 h-7 group-hover:rotate-12 transition-transform" />
        </a>
      </div>

      {/* NAVBAR */}
      <nav className={`fixed w-full z-40 transition-all duration-700 ${isScrolled ? 'glass-panel py-4' : 'bg-gradient-to-b from-black/90 to-transparent py-6'}`}>
        <div className="max-w-7xl mx-auto px-6 lg:px-12 flex justify-between items-center">
          <div className="flex flex-col cursor-pointer group" onClick={() => scrollToSection('hero')}>
            <h1 className="font-serif text-3xl md:text-4xl font-bold tracking-widest text-white flex items-center gap-3">
              <Crown className="w-6 h-6 text-gold" />
              ROYAL DINE
            </h1>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-12">
            {['Story', 'Menu', 'Gallery', 'Reviews'].map((item) => (
              <button 
                key={item} 
                onClick={() => scrollToSection(item.toLowerCase())}
                className="text-xs font-medium tracking-[0.25em] uppercase text-gray-300 hover:text-gold transition-colors relative after:content-[''] after:absolute after:-bottom-2 after:left-0 after:w-0 after:h-[1px] after:bg-gold hover:after:w-full after:transition-all after:duration-500"
              >
                {item}
              </button>
            ))}
            <button 
              onClick={() => scrollToSection('reservation')}
              className="px-8 py-3 bg-transparent border border-gold/50 text-gold text-xs tracking-[0.2em] uppercase hover:bg-gold hover:text-black transition-all duration-500 shadow-[inset_0_0_0_rgba(212,175,55,0)] hover:shadow-[inset_0_0_20px_rgba(212,175,55,0.4)]"
            >
              Reserve Table
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <button className="md:hidden text-gold" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            {isMobileMenuOpen ? <X className="w-8 h-8" /> : <Menu className="w-8 h-8" />}
          </button>
        </div>

        {/* Mobile Menu Dropdown */}
        <div className={`absolute top-full left-0 w-full glass-panel flex flex-col items-center py-10 space-y-8 transition-all duration-500 origin-top ${isMobileMenuOpen ? 'scale-y-100 opacity-100' : 'scale-y-0 opacity-0'}`}>
          {['Story', 'Menu', 'Gallery', 'Reviews'].map((item) => (
            <button 
              key={item} 
              onClick={() => scrollToSection(item.toLowerCase())}
              className="text-lg tracking-[0.2em] uppercase text-gray-200 hover:text-gold transition-colors font-serif"
            >
              {item}
            </button>
          ))}
          <button 
            onClick={() => scrollToSection('reservation')}
            className="px-10 py-4 bg-gradient-to-r from-[#D4AF37] to-[#B8860B] text-black font-bold text-sm tracking-widest uppercase mt-4 shadow-[0_0_20px_rgba(212,175,55,0.3)]"
          >
            Reserve Table
          </button>
        </div>
      </nav>

      {/* HERO SECTION */}
      <section id="hero" className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-black/60 z-10" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#030303] via-black/30 to-black/70 z-10" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(139,0,0,0.15)_0%,transparent_60%)] z-10" />
          
          <img 
            src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&q=80&w=2000" 
            alt="Luxury Royal Dining" 
            className="w-full h-full object-cover scale-110 animate-[pulse_30s_ease-in-out_infinite_alternate] filter contrast-[1.15] brightness-75"
          />
        </div>

        <div className="relative z-20 text-center px-4 mt-24">
          <RevealOnScroll delay={100}>
            <div className="flex items-center justify-center gap-4 mb-8">
              <span className="w-20 h-[1px] bg-gradient-to-r from-transparent to-gold block"></span>
              <Crown className="w-5 h-5 text-gold" />
              <span className="w-20 h-[1px] bg-gradient-to-l from-transparent to-gold block"></span>
            </div>
          </RevealOnScroll>
          
          <RevealOnScroll delay={300}>
            <h2 className="font-serif text-5xl md:text-7xl lg:text-[5.5rem] text-white mb-6 leading-[1.1] drop-shadow-2xl font-medium">
              Experience Royal Dining <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D4AF37] via-[#FFF8DC] to-[#D4AF37]">
                Like Never Before
              </span>
            </h2>
          </RevealOnScroll>

          <RevealOnScroll delay={500}>
            <p className="text-gray-300 max-w-2xl mx-auto text-lg md:text-xl font-light mb-14 tracking-wider uppercase text-sm">
              A premium culinary journey in the heart of Dubai
            </p>
          </RevealOnScroll>

          <RevealOnScroll delay={700} className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <button 
              onClick={() => scrollToSection('reservation')}
              className="w-64 sm:w-auto px-12 py-5 bg-gradient-to-r from-[#D4AF37] to-[#B8860B] text-black uppercase tracking-[0.25em] text-xs font-bold hover:from-white hover:to-gray-200 transition-all duration-500 flex items-center justify-center gap-3 group shadow-[0_10px_30px_rgba(212,175,55,0.3)] hover:shadow-[0_10px_30px_rgba(255,255,255,0.4)]"
            >
              Book a Table
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
            <button 
              onClick={() => scrollToSection('menu')}
              className="w-64 sm:w-auto px-12 py-5 bg-transparent border border-white/20 text-white uppercase tracking-[0.25em] text-xs font-bold hover:border-gold hover:text-gold transition-all duration-500 backdrop-blur-sm"
            >
              Explore Menu
            </button>
          </RevealOnScroll>
        </div>
        
        {/* Scroll Indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 animate-bounce text-gold/50">
          <div className="w-[1px] h-20 bg-gradient-to-b from-transparent via-gold to-transparent" />
        </div>
      </section>

      {/* ABOUT / STORY SECTION */}
      <section id="story" className="py-32 relative overflow-hidden">
        {/* Decorative Gradients */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#4A0404]/10 rounded-full blur-[150px] -z-10 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-gold/5 rounded-full blur-[120px] -z-10 pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <div className="space-y-10 relative">
              <RevealOnScroll direction="right">
                <div className="flex items-center gap-4 mb-6">
                  <span className="text-gold uppercase tracking-[0.3em] text-xs font-bold">The Heritage</span>
                  <div className="w-12 h-[1px] bg-gold"></div>
                </div>
                <h2 className="font-serif text-4xl lg:text-[3.5rem] text-white leading-tight">
                  A Legacy of <br/>
                  <span className="text-gold italic glow-maroon">Culinary Excellence</span>
                </h2>
              </RevealOnScroll>

              <RevealOnScroll delay={200} direction="right">
                <p className="text-gray-400 font-light leading-relaxed text-lg font-sans">
                  Nestled gracefully in Al Fahidi, our brand resurrects the forgotten opulent feasts of royalty. Every ingredient is sourced with absolute precision, every dish crafted as a piece of art. We offer an atmosphere veiled in elegance—where deep maroon velvets meet golden chandeliers, creating an unforgettable 5-star haven.
                </p>
              </RevealOnScroll>

              <RevealOnScroll delay={400} direction="right">
                <div className="grid grid-cols-2 gap-10 pt-10 border-t border-[#4A0404]/40">
                  <div className="group">
                    <h4 className="text-white font-serif text-2xl mb-3 group-hover:text-gold transition-colors">Authentic Cuisine</h4>
                    <p className="text-sm text-gray-500 leading-relaxed font-light">Recipes passed down through centuries, elevated with a modern gastronomic touch.</p>
                  </div>
                  <div className="group">
                    <h4 className="text-white font-serif text-2xl mb-3 group-hover:text-gold transition-colors">Premium Chefs</h4>
                    <p className="text-sm text-gray-500 leading-relaxed font-light">Michelin-trained artisans dedicated to perfecting your dining experience.</p>
                  </div>
                </div>
              </RevealOnScroll>
            </div>

            <RevealOnScroll delay={300} direction="left" className="relative">
              <div className="relative z-10 group">
                <div className="absolute inset-0 bg-[#4A0404]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-700 z-20" />
                <img 
                  src="https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?auto=format&fit=crop&q=80&w=800" 
                  alt="Elegant Atmosphere" 
                  className="w-full rounded-sm object-cover h-[700px] shadow-[0_30px_60px_rgba(0,0,0,0.8)] filter contrast-125 transition-all duration-700"
                />
                <div className="absolute -bottom-10 -left-10 w-full h-full border border-gold/30 -z-10 hidden md:block group-hover:translate-x-4 group-hover:translate-y-4 transition-transform duration-700" />
              </div>
              
              {/* Floating Glass Element */}
              <div className="absolute top-16 -right-12 glass-panel p-8 max-w-[240px] hidden md:block animate-[bounce_6s_infinite]">
                <div className="flex gap-1 text-gold mb-4 justify-center">
                  {[...Array(5)].map((_, i) => <Star key={i} className="w-5 h-5 fill-current" />)}
                </div>
                <p className="text-sm text-gray-200 font-serif italic text-center">"The pinnacle of high-end dining in the heart of Dubai."</p>
              </div>
            </RevealOnScroll>
          </div>
        </div>
      </section>

      {/* MENU SECTION */}
      <section id="menu" className="py-32 relative border-t border-white/5 bg-[#080202]">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-20 pointer-events-none"></div>
        <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
          <RevealOnScroll className="text-center mb-20">
            <span className="text-gold uppercase tracking-[0.3em] text-xs font-bold">Gastronomy</span>
            <h2 className="font-serif text-4xl lg:text-6xl text-white mt-4 mb-16">Signature Menu</h2>
            
            {/* Menu Tabs */}
            <div className="flex flex-wrap justify-center gap-6 lg:gap-12">
              {Object.keys(MENU_DATA).map((category) => (
                <button
                  key={category}
                  onClick={() => setActiveMenuCategory(category)}
                  className={`text-xs md:text-sm font-semibold tracking-[0.2em] uppercase transition-all duration-500 pb-3 border-b-2 ${
                    activeMenuCategory === category 
                      ? "text-gold border-gold shadow-[0_4px_15px_-4px_rgba(212,175,55,0.6)]" 
                      : "text-gray-500 border-transparent hover:text-white"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </RevealOnScroll>

          {/* Menu Items Grid */}
          <div className="grid md:grid-cols-2 gap-x-16 gap-y-12">
            {MENU_DATA[activeMenuCategory].map((item, index) => (
              <RevealOnScroll key={index} delay={index * 150} className="group cursor-pointer">
                <div className="glass-panel p-6 rounded-sm flex gap-6 items-center hover:bg-white/[0.03] transition-colors duration-500 border-l-4 border-l-transparent hover:border-l-gold">
                  <div className="w-28 h-28 rounded-full overflow-hidden shrink-0 border border-gold/20 group-hover:border-gold transition-colors duration-700 relative shadow-[0_0_20px_rgba(0,0,0,0.5)]">
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500 z-10" />
                    <img 
                      src={item.img} 
                      alt={item.name} 
                      className="w-full h-full object-cover group-hover:scale-110 group-hover:rotate-3 transition-transform duration-[1.5s]"
                    />
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-baseline mb-3 border-b border-white/5 pb-2 border-dashed group-hover:border-gold/30 transition-colors duration-500">
                      <h3 className="font-serif text-2xl text-white group-hover:text-gold transition-colors duration-500">{item.name}</h3>
                      <span className="text-gold font-serif text-xl ml-4 shrink-0 tracking-wider">{item.price}</span>
                    </div>
                    <p className="text-sm text-gray-400 font-light leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              </RevealOnScroll>
            ))}
          </div>

          <RevealOnScroll delay={400} className="text-center mt-24">
            <button className="px-12 py-5 border border-gold text-gold uppercase tracking-[0.25em] text-xs font-bold hover:bg-gold hover:text-black transition-all duration-500 shadow-[0_0_20px_rgba(212,175,55,0.1)] hover:shadow-[0_0_40px_rgba(212,175,55,0.5)]">
              Discover Full Menu
            </button>
          </RevealOnScroll>
        </div>
      </section>

      {/* GALLERY SECTION */}
      <section id="gallery" className="py-32 relative bg-[#030303] border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <RevealOnScroll className="text-center mb-20">
            <span className="text-gold uppercase tracking-[0.3em] text-xs font-bold">Visuals</span>
            <h2 className="font-serif text-4xl lg:text-6xl text-white mt-4">The Ambiance</h2>
          </RevealOnScroll>

          <div className="masonry-grid">
            {GALLERY.map((src, index) => (
              <RevealOnScroll key={index} delay={index * 100} direction="up" className="masonry-item">
                <div className="relative overflow-hidden group rounded-sm cursor-zoom-in shadow-[0_10px_30px_rgba(0,0,0,0.8)]">
                  <div className="absolute inset-0 bg-gradient-to-t from-[#4A0404]/80 via-black/20 to-transparent opacity-40 group-hover:opacity-10 transition-all duration-700 z-10" />
                  <img 
                    src={src} 
                    alt={`Luxury Dining ${index + 1}`} 
                    className="w-full h-auto object-cover group-hover:scale-[1.05] transition-transform duration-[2s] ease-out"
                  />
                  <div className="absolute inset-0 border border-gold/0 group-hover:border-gold/30 transition-all duration-700 z-20 m-4 pointer-events-none" />
                </div>
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* REVIEWS SECTION */}
      <section id="reviews" className="py-32 relative bg-gradient-to-b from-[#080202] to-[#030303] overflow-hidden">
        {/* Background Decorative Rings */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] border border-[#4A0404]/30 rounded-full z-0 animate-[spin_60s_linear_infinite]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border border-gold/10 rounded-full z-0 animate-[spin_40s_linear_infinite_reverse]" />
        
        <div className="max-w-5xl mx-auto px-6 text-center relative z-10">
          <RevealOnScroll>
            <Quote className="w-20 h-20 text-gold/30 mx-auto mb-10" />
            
            <div className="min-h-[250px] flex flex-col justify-center glass-panel p-10 lg:p-16 rounded-sm border-t-2 border-t-gold">
              <p className="font-serif text-2xl md:text-3xl lg:text-4xl text-white leading-relaxed italic mb-10 transition-opacity duration-700">
                "{REVIEWS[activeReviewIndex].text}"
              </p>
              
              <div className="flex flex-col items-center">
                <div className="flex gap-2 mb-4">
                  {[...Array(REVIEWS[activeReviewIndex].rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-gold fill-current drop-shadow-[0_0_15px_rgba(212,175,55,0.7)]" />
                  ))}
                </div>
                <h4 className="text-white tracking-[0.2em] uppercase text-sm font-bold mt-2">{REVIEWS[activeReviewIndex].name}</h4>
                <p className="text-gray-500 text-xs mt-2 uppercase tracking-widest">VIP Guest</p>
              </div>
            </div>

            {/* Slider Dots */}
            <div className="flex justify-center gap-4 mt-12">
              {REVIEWS.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveReviewIndex(idx)}
                  className={`w-2.5 h-2.5 rounded-full transition-all duration-500 ${
                    idx === activeReviewIndex ? 'bg-gold w-12 shadow-[0_0_15px_rgba(212,175,55,0.8)]' : 'bg-gray-800 hover:bg-[#4A0404]'
                  }`}
                  aria-label={`Go to review ${idx + 1}`}
                />
              ))}
            </div>
          </RevealOnScroll>
        </div>
      </section>

      {/* RESERVATION & LOCATION SECTION */}
      <section id="reservation" className="py-32 relative bg-[#030303] border-t border-[#4A0404]/50">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gold to-transparent opacity-30" />
        
        <div className="max-w-7xl mx-auto px-6 lg:px-12 grid lg:grid-cols-12 gap-16">
          
          {/* Booking Form */}
          <RevealOnScroll direction="right" className="lg:col-span-7">
            <div className="glass-panel p-10 md:p-14 relative overflow-hidden">
              <div className="absolute -top-20 -right-20 w-64 h-64 bg-[#4A0404]/30 blur-[70px] rounded-full pointer-events-none" />
              <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-gold/10 blur-[70px] rounded-full pointer-events-none" />
              
              <div className="mb-12 relative z-10">
                <span className="text-gold uppercase tracking-[0.3em] text-xs font-bold">VIP Reservation</span>
                <h2 className="font-serif text-4xl lg:text-5xl text-white mt-4">Secure Your Table</h2>
              </div>

              <form onSubmit={handleReservationSubmit} className="space-y-8 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-3">
                    <label className="text-[10px] text-gray-400 uppercase tracking-[0.2em] font-semibold">Distinguished Guest Name</label>
                    <input 
                      type="text" required
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      className="w-full bg-transparent border-b border-white/20 pb-3 text-white focus:outline-none focus:border-gold transition-colors text-lg font-serif"
                      placeholder="Your Full Name"
                    />
                  </div>
                  <div className="space-y-3">
                    <label className="text-[10px] text-gray-400 uppercase tracking-[0.2em] font-semibold">Contact Number</label>
                    <input 
                      type="tel" required
                      value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                      className="w-full bg-transparent border-b border-white/20 pb-3 text-white focus:outline-none focus:border-gold transition-colors text-lg font-serif"
                      placeholder="+971 50 000 0000"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  <div className="space-y-3 relative">
                    <label className="text-[10px] text-gray-400 uppercase tracking-[0.2em] font-semibold">Date</label>
                    <div className="relative">
                      <Calendar className="absolute right-0 bottom-3 w-5 h-5 text-gold pointer-events-none" />
                      <input 
                        type="date" required
                        value={formData.date}
                        onChange={(e) => setFormData({...formData, date: e.target.value})}
                        className="w-full bg-transparent border-b border-white/20 pb-3 text-white focus:outline-none focus:border-gold transition-colors appearance-none [&::-webkit-calendar-picker-indicator]:opacity-0 text-lg font-serif"
                      />
                    </div>
                  </div>
                  <div className="space-y-3">
                    <label className="text-[10px] text-gray-400 uppercase tracking-[0.2em] font-semibold">Time</label>
                    <select 
                      required
                      value={formData.time}
                      onChange={(e) => setFormData({...formData, time: e.target.value})}
                      className="w-full bg-transparent border-b border-white/20 pb-3 text-white focus:outline-none focus:border-gold transition-colors appearance-none text-lg font-serif"
                    >
                      <option value="" disabled className="bg-[#0f0505] text-gray-400">Select Time</option>
                      <option value="19:00" className="bg-[#0f0505]">7:00 PM</option>
                      <option value="20:00" className="bg-[#0f0505]">8:00 PM</option>
                      <option value="21:00" className="bg-[#0f0505]">9:00 PM</option>
                      <option value="22:00" className="bg-[#0f0505]">10:00 PM</option>
                      <option value="23:00" className="bg-[#0f0505]">11:00 PM</option>
                    </select>
                  </div>
                  <div className="space-y-3">
                    <label className="text-[10px] text-gray-400 uppercase tracking-[0.2em] font-semibold">Party Size</label>
                    <select 
                      value={formData.guests}
                      onChange={(e) => setFormData({...formData, guests: e.target.value})}
                      className="w-full bg-transparent border-b border-white/20 pb-3 text-white focus:outline-none focus:border-gold transition-colors appearance-none text-lg font-serif"
                    >
                      {[1,2,3,4,5,6,7,8,"VIP Room (8+)"].map(num => (
                        <option key={num} value={num} className="bg-[#0f0505]">{num} {typeof num === 'number' ? 'Guests' : ''}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <button type="submit" className="w-full mt-10 py-5 bg-gradient-to-r from-[#D4AF37] to-[#B8860B] text-black uppercase tracking-[0.25em] text-xs font-bold hover:from-[#F3E5AB] hover:to-[#D4AF37] transition-all duration-500 flex items-center justify-center gap-3 group shadow-[0_10px_20px_rgba(212,175,55,0.3)]">
                  Request Booking via WhatsApp
                  <MessageCircle className="w-5 h-5 group-hover:scale-110 transition-transform" />
                </button>
              </form>
            </div>
          </RevealOnScroll>

          {/* Location & Map */}
          <RevealOnScroll direction="left" className="lg:col-span-5 flex flex-col justify-between">
            <div className="space-y-8 mb-10 lg:mb-0">
              <h3 className="font-serif text-4xl text-white border-l-4 border-gold pl-5">Location Details</h3>
              
              <div className="space-y-6 glass-panel p-8">
                <div className="flex items-start gap-5 group">
                  <div className="w-12 h-12 rounded-full bg-[#4A0404]/50 flex items-center justify-center shrink-0 border border-gold/30 group-hover:bg-gold transition-colors duration-500">
                    <MapPin className="w-5 h-5 text-gold group-hover:text-black transition-colors" />
                  </div>
                  <div className="mt-1">
                    <h5 className="text-white mb-1 uppercase tracking-[0.2em] text-xs font-bold">Address</h5>
                    <p className="text-gray-400 font-light text-sm">{CONTACT.address}</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-5 group">
                  <div className="w-12 h-12 rounded-full bg-[#4A0404]/50 flex items-center justify-center shrink-0 border border-gold/30 group-hover:bg-gold transition-colors duration-500">
                    <Phone className="w-5 h-5 text-gold group-hover:text-black transition-colors" />
                  </div>
                  <div className="mt-1">
                    <h5 className="text-white mb-1 uppercase tracking-[0.2em] text-xs font-bold">Direct Line</h5>
                    <p className="text-gray-400 font-light text-sm">{CONTACT.displayPhone}</p>
                  </div>
                </div>

                <div className="flex items-start gap-5 group">
                  <div className="w-12 h-12 rounded-full bg-[#4A0404]/50 flex items-center justify-center shrink-0 border border-gold/30 group-hover:bg-gold transition-colors duration-500">
                    <Clock className="w-5 h-5 text-gold group-hover:text-black transition-colors" />
                  </div>
                  <div className="mt-1">
                    <h5 className="text-white mb-1 uppercase tracking-[0.2em] text-xs font-bold">Opening Hours</h5>
                    <p className="text-gray-400 font-light text-sm">{CONTACT.hours}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Map Frame */}
            <div className="w-full h-64 bg-[#111] rounded-sm border border-gold/20 overflow-hidden relative group shadow-2xl mt-8 lg:mt-0">
              <div className="absolute inset-0 bg-[#4A0404]/20 mix-blend-overlay pointer-events-none z-10 group-hover:bg-transparent transition-colors duration-700" />
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3608.236162381395!2d55.298287!3d25.262615!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f4340e4abf16b%3A0xc6829b5b2a0c6a51!2sAl%20Fahidi%20St%20-%20Dubai!5e0!3m2!1sen!2sae!4v1680123456789!5m2!1sen!2sae" 
                className="w-full h-full filter invert-[90%] hue-rotate-[160deg] contrast-[1.2] grayscale-[40%]"
                style={{ border: 0 }} 
                allowFullScreen="" 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                title="Royal Dine Location Map"
              />
            </div>
          </RevealOnScroll>

        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-black pt-24 pb-12 border-t border-gold/20 relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-px bg-gradient-to-r from-transparent via-gold to-transparent opacity-40" />
        
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-8 mb-20">
            
            {/* Brand */}
            <div className="md:col-span-5 space-y-8">
              <div>
                <h1 className="font-serif text-3xl font-bold tracking-widest text-white flex items-center gap-3">
                  <Crown className="w-6 h-6 text-gold" />
                  ROYAL DINE
                </h1>
                <span className="text-[10px] tracking-[0.4em] text-gold uppercase mt-2 block">Dubai Premium Lifestyle</span>
              </div>
              <p className="text-gray-400 font-light max-w-sm text-sm leading-relaxed font-sans">
                Elevating the standard of fine dining in Dubai. Experience a curated journey of royal flavors in an atmosphere of unparalleled, 5-star luxury.
              </p>
              <div className="flex gap-4">
                <a href="#" className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-gray-400 hover:text-gold hover:border-gold transition-all duration-300 bg-white/5 hover:bg-gold/10">
                  <Instagram className="w-5 h-5" />
                </a>
                <a href="#" className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-gray-400 hover:text-gold hover:border-gold transition-all duration-300 bg-white/5 hover:bg-gold/10">
                  <Facebook className="w-5 h-5" />
                </a>
                <a href="#" className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-gray-400 hover:text-gold hover:border-gold transition-all duration-300 bg-white/5 hover:bg-gold/10">
                  <Twitter className="w-5 h-5" />
                </a>
              </div>
            </div>

            {/* Links */}
            <div className="md:col-span-3 lg:col-start-8">
              <h4 className="text-white uppercase tracking-[0.3em] text-xs font-bold mb-8">Navigation</h4>
              <ul className="space-y-4">
                {['Home', 'Our Story', 'Royal Menu', 'Visuals', 'Reserve Table'].map(link => (
                  <li key={link}>
                    <a href="#" onClick={(e) => { e.preventDefault(); scrollToSection(link.toLowerCase() === 'home' ? 'hero' : link.split(' ')[1] ? link.split(' ')[1].toLowerCase() : link.toLowerCase()); }} className="text-gray-400 hover:text-gold transition-colors text-sm font-light flex items-center gap-2 group">
                      <ChevronRight className="w-3 h-3 text-gold opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Newsletter */}
            <div className="md:col-span-4 lg:col-span-2">
              <h4 className="text-white uppercase tracking-[0.3em] text-xs font-bold mb-8">Newsletter</h4>
              <p className="text-gray-400 font-light text-sm mb-6 leading-relaxed">Exclusive invitations to seasonal tasting menus.</p>
              <form className="flex border-b border-white/20 pb-3 focus-within:border-gold transition-colors">
                <input 
                  type="email" 
                  placeholder="Your email" 
                  className="bg-transparent w-full text-white text-sm focus:outline-none placeholder:text-gray-600"
                />
                <button type="button" className="text-gold uppercase text-xs tracking-[0.2em] font-bold hover:text-white transition-colors pl-4">
                  Join
                </button>
              </form>
            </div>
          </div>

          {/* Copyright */}
          <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-600 font-light uppercase tracking-widest">
            <p>&copy; {new Date().getFullYear()} Royal Dine Dubai. All rights reserved.</p>
            <div className="flex gap-8">
              <a href="#" className="hover:text-gold transition-colors">Privacy</a>
              <a href="#" className="hover:text-gold transition-colors">Terms</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}