import React, { useState, useEffect, useRef } from 'react';
import { 
  Menu, X, MapPin, Phone, Clock, Star, 
  ChevronRight, Calendar, MessageCircle, 
  Instagram, Facebook, Twitter, Quote,
  UtensilsCrossed
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
  phone: "+971524877613",
  displayPhone: "+971 52 487 7613",
  whatsapp: "971524877613",
  address: "Deira Old Souk, Bur Dubai, Dubai, UAE",
  hours: "Mon - Sun: 12:00 PM - 2:00 AM"
};

const MENU_DATA = {
  "BBQ Specials": [
    { name: "Sultani Malai Boti", price: "AED 95", desc: "Melt-in-mouth chicken infused with green cardamom, cream, and white pepper, char-grilled to perfection.", img: "https://images.unsplash.com/photo-1599487405702-3e58ffaeea2e?auto=format&fit=crop&q=80&w=800" },
    { name: "Peshawari Lamb Chops", price: "AED 140", desc: "Premium lamb chops marinated in raw papaya, rawal spices, and smoked over wood charcoal.", img: "https://images.unsplash.com/photo-1603360946369-dc9bb6258143?auto=format&fit=crop&q=80&w=800" },
    { name: "Shahi Seekh Kebab", price: "AED 85", desc: "Minced wagyu beef mixed with royal spices, roasted coriander, and saffron, finished with silver leaf.", img: "https://images.unsplash.com/photo-1610057099443-fde8c4d50f91?auto=format&fit=crop&q=80&w=800" },
    { name: "Royal Mix Grill Platter", price: "AED 280", desc: "An opulent assortment of our finest char-grilled meats, served with saffron rice and mint chutney.", img: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&q=80&w=800" }
  ],
  "Traditional Dishes": [
    { name: "Nalli Nihari", price: "AED 110", desc: "Slow-cooked prime beef shank stew, infused with marrow and 18 aromatic spices over 12 hours.", img: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&q=80&w=800" },
    { name: "Lahori Mutton Karahi", price: "AED 160", desc: "Fresh mutton cooked in a traditional wok with pure ghee, crushed tomatoes, and black pepper.", img: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?auto=format&fit=crop&q=80&w=800" },
    { name: "Dum Pukht Biryani", price: "AED 130", desc: "Fragrant basmati rice layered with tender mutton, saffron strands, and sealed with dough to lock in the royal aroma.", img: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&q=80&w=800" },
    { name: "Mughlai Butter Chicken", price: "AED 95", desc: "Charcoal-smoked chicken tikka simmered in a rich, velvety tomato and cashew nut gravy.", img: "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?auto=format&fit=crop&q=80&w=800" }
  ],
  "Desserts": [
    { name: "Zafrani Shahi Tukda", price: "AED 65", desc: "Crispy bread fried in ghee, soaked in saffron-infused rabri, topped with 24k gold leaf and pistachios.", img: "https://images.unsplash.com/photo-1551024506-0bc4a2cb1cbf?auto=format&fit=crop&q=80&w=800" },
    { name: "Pistachio Gulab Jamun", price: "AED 55", desc: "Warm, milk-solid dumplings stuffed with pistachio and cardamom, served in a rose-scented syrup.", img: "https://images.unsplash.com/photo-1488477181946-6428a0291777?auto=format&fit=crop&q=80&w=800" },
    { name: "Royal Matka Kulfi", price: "AED 75", desc: "Traditional unchurned ice cream with almonds, saffron, and clotted cream served in a clay pot.", img: "https://images.unsplash.com/photo-1563805042-7684c8e9e533?auto=format&fit=crop&q=80&w=800" }
  ],
  "Drinks": [
    { name: "Peshawari Kahwa", price: "AED 40", desc: "Traditional green tea brewed with cardamom and crushed almonds, aiding digestion elegantly.", img: "https://images.unsplash.com/photo-1595955331584-635c24d9c742?auto=format&fit=crop&q=80&w=800" },
    { name: "Mango Lassi Gold", price: "AED 45", desc: "Alphonso mangoes blended with rich homemade yogurt, finished with silver flakes and saffron.", img: "https://images.unsplash.com/photo-1546171753-97d7676e4602?auto=format&fit=crop&q=80&w=800" },
    { name: "Rooh Afza Mojito", price: "AED 50", desc: "A modern twist on the classic rose syrup, muddling fresh mint, lime, and sparkling water.", img: "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&q=80&w=800" }
  ]
};

const REVIEWS = [
  { name: "Ahmed Al Maktoum", text: "The most authentic and opulent Pakistani dining experience in Dubai. The Dum Pukht Biryani is unparalleled, transporting you straight to the royal courts of Lahore.", rating: 5 },
  { name: "Sarah K.", text: "A truly magnificent ambiance. The emerald and gold decor paired with the sensational Nalli Nihari made for an unforgettable evening. Easily a 5-star establishment.", rating: 5 },
  { name: "Omar Tariq", text: "Exceptional service and extraordinary flavors. The Shahi Tukda with 24k gold leaf is a masterpiece. Tasty Dine sets a new standard for luxury dining in Deira.", rating: 5 }
];

const GALLERY = [
  "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&q=80&w=800", // Interior 1
  "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&q=80&w=800", // Food BBQ
  "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&q=80&w=800", // Luxury plate
  "https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&q=80&w=800", // Interior 2
  "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?auto=format&fit=crop&q=80&w=800", // Traditional Curry
  "https://images.unsplash.com/photo-1578474846511-04ba529f0b88?auto=format&fit=crop&q=80&w=800", // Ambiance
];

// --- MAIN COMPONENT ---
export default function App() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeMenuCategory, setActiveMenuCategory] = useState("Traditional Dishes");
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
    const message = `*👑 VIP Reservation - Tasty Dine Restaurant 👑*%0A%0A*Name:* ${formData.name}%0A*Phone:* ${formData.phone}%0A*Date:* ${formData.date}%0A*Time:* ${formData.time}%0A*Guests:* ${formData.guests}%0A%0A_Awaiting confirmation for a royal dining experience!_`;
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
    <div className="min-h-screen bg-[#050505] text-gray-200 font-sans selection:bg-[#10b981] selection:text-black overflow-x-hidden">
      {/* GLOBAL STYLES & FONTS */}
      <style dangerouslySetInnerHTML={{__html: `
        @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;500;600;700&family=Plus+Jakarta+Sans:wght@300;400;500;600&display=swap');
        
        .font-serif { font-family: 'Cinzel', serif; }
        .font-sans { font-family: 'Plus Jakarta Sans', sans-serif; }
        
        .glass-panel {
          background: rgba(10, 10, 10, 0.6);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          border: 1px solid rgba(16, 185, 129, 0.15); /* Emerald tint */
          box-shadow: 0 30px 60px -12px rgba(0, 0, 0, 0.7), inset 0 0 20px rgba(16, 185, 129, 0.05);
        }
        
        .text-gold { color: #D4AF37; }
        .bg-gold { background-color: #D4AF37; }
        .border-gold { border-color: #D4AF37; }

        .text-emerald-glow {
          text-shadow: 0 0 20px rgba(16, 185, 129, 0.4);
        }
        
        /* Custom Scrollbar */
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: #050505; }
        ::-webkit-scrollbar-thumb { background: #064e3b; border-radius: 4px; }
        ::-webkit-scrollbar-thumb:hover { background: #10b981; }

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
        <a href={`tel:${CONTACT.phone}`} className="w-14 h-14 bg-gradient-to-br from-[#1a1a1a] to-[#0a0a0a] rounded-full flex items-center justify-center text-emerald-500 shadow-[0_0_20px_rgba(16,185,129,0.2)] hover:scale-110 transition-all duration-300 border border-emerald-500/30 group">
          <Phone className="w-6 h-6 group-hover:text-gold transition-colors" />
        </a>
        <a href={`https://wa.me/${CONTACT.whatsapp}`} target="_blank" rel="noreferrer" className="w-14 h-14 bg-gradient-to-br from-[#25D366] to-[#128C7E] rounded-full flex items-center justify-center text-white shadow-[0_0_25px_rgba(37,211,102,0.4)] hover:scale-110 transition-all duration-300 group">
          <MessageCircle className="w-7 h-7 group-hover:rotate-12 transition-transform" />
        </a>
      </div>

      {/* NAVBAR */}
      <nav className={`fixed w-full z-40 transition-all duration-700 ${isScrolled ? 'glass-panel py-4' : 'bg-gradient-to-b from-black/80 to-transparent py-6'}`}>
        <div className="max-w-7xl mx-auto px-6 lg:px-12 flex justify-between items-center">
          <div className="flex flex-col cursor-pointer group" onClick={() => scrollToSection('hero')}>
            <h1 className="font-serif text-2xl md:text-3xl font-bold tracking-wider text-white flex items-center gap-2">
              <span className="text-emerald-500">TASTY</span> DINE
            </h1>
            <span className="text-[9px] tracking-[0.4em] text-gold uppercase group-hover:text-emerald-400 transition-colors">
              Taste of Pakistan
            </span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-10">
            {['About', 'Menu', 'Gallery', 'Reviews'].map((item) => (
              <button 
                key={item} 
                onClick={() => scrollToSection(item.toLowerCase())}
                className="text-xs font-semibold tracking-[0.2em] uppercase text-gray-300 hover:text-emerald-400 transition-colors relative after:content-[''] after:absolute after:-bottom-2 after:left-0 after:w-0 after:h-[1px] after:bg-emerald-500 hover:after:w-full after:transition-all after:duration-300"
              >
                {item}
              </button>
            ))}
            <button 
              onClick={() => scrollToSection('reservation')}
              className="px-7 py-3 bg-transparent border border-emerald-600/50 text-emerald-400 text-xs tracking-widest uppercase hover:bg-emerald-600/10 hover:border-gold hover:text-gold transition-all duration-500 rounded-sm shadow-[inset_0_0_0_rgba(16,185,129,0)] hover:shadow-[inset_0_0_20px_rgba(212,175,55,0.2)]"
            >
              VIP Booking
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <button className="md:hidden text-emerald-500" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            {isMobileMenuOpen ? <X className="w-8 h-8" /> : <Menu className="w-8 h-8" />}
          </button>
        </div>

        {/* Mobile Menu Dropdown */}
        <div className={`absolute top-full left-0 w-full glass-panel flex flex-col items-center py-10 space-y-8 transition-all duration-500 origin-top ${isMobileMenuOpen ? 'scale-y-100 opacity-100' : 'scale-y-0 opacity-0'}`}>
          {['About', 'Menu', 'Gallery', 'Reviews'].map((item) => (
            <button 
              key={item} 
              onClick={() => scrollToSection(item.toLowerCase())}
              className="text-lg tracking-[0.2em] uppercase text-gray-200 hover:text-emerald-400 transition-colors"
            >
              {item}
            </button>
          ))}
          <button 
            onClick={() => scrollToSection('reservation')}
            className="px-10 py-4 bg-gradient-to-r from-emerald-800 to-emerald-600 text-white text-sm tracking-widest uppercase mt-4 shadow-[0_0_20px_rgba(16,185,129,0.3)]"
          >
            VIP Booking
          </button>
        </div>
      </nav>

      {/* HERO SECTION */}
      <section id="hero" className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-black/60 z-10" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-black/20 to-black/60 z-10" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(16,185,129,0.1)_0%,transparent_60%)] z-10" />
          
          <img 
            src="https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&q=80&w=2000" 
            alt="Luxury Cinematic Dining" 
            className="w-full h-full object-cover scale-110 animate-[pulse_30s_ease-in-out_infinite_alternate] filter contrast-125 brightness-75"
          />
        </div>

        <div className="relative z-20 text-center px-4 mt-24">
          <RevealOnScroll delay={100}>
            <div className="flex items-center justify-center gap-4 mb-8">
              <span className="w-16 h-[1px] bg-gradient-to-r from-transparent to-gold block"></span>
              <p className="text-gold tracking-[0.4em] uppercase text-xs md:text-sm font-semibold">
                Deira Old Souk, Dubai
              </p>
              <span className="w-16 h-[1px] bg-gradient-to-l from-transparent to-gold block"></span>
            </div>
          </RevealOnScroll>
          
          <RevealOnScroll delay={300}>
            <h2 className="font-serif text-5xl md:text-7xl lg:text-8xl text-white mb-6 leading-[1.1] drop-shadow-2xl">
              A Royal Taste of <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-gold to-emerald-400 text-emerald-glow">
                Pakistan
              </span>
            </h2>
          </RevealOnScroll>

          <RevealOnScroll delay={500}>
            <p className="text-gray-300 max-w-2xl mx-auto text-lg md:text-xl font-light mb-14 tracking-wide">
              Where centuries of majestic tradition meet the pinnacle of modern luxury dining.
            </p>
          </RevealOnScroll>

          <RevealOnScroll delay={700} className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <button 
              onClick={() => scrollToSection('reservation')}
              className="w-64 sm:w-auto px-10 py-5 bg-gradient-to-r from-emerald-800 to-emerald-600 text-white uppercase tracking-[0.2em] text-xs font-bold hover:from-gold hover:to-yellow-600 transition-all duration-500 flex items-center justify-center gap-3 group shadow-[0_10px_30px_rgba(16,185,129,0.3)] hover:shadow-[0_10px_30px_rgba(212,175,55,0.4)]"
            >
              Book a Table
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
            <button 
              onClick={() => scrollToSection('menu')}
              className="w-64 sm:w-auto px-10 py-5 bg-transparent border border-white/20 text-white uppercase tracking-[0.2em] text-xs font-bold hover:border-emerald-500 hover:text-emerald-400 transition-all duration-500 backdrop-blur-sm"
            >
              Explore Menu
            </button>
          </RevealOnScroll>
        </div>
        
        {/* Scroll Indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 animate-bounce text-emerald-500/50">
          <div className="w-[1px] h-16 bg-gradient-to-b from-transparent via-emerald-500 to-transparent" />
        </div>
      </section>

      {/* ABOUT SECTION */}
      <section id="about" className="py-32 relative overflow-hidden">
        {/* Decorative Gradients */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-emerald-900/10 rounded-full blur-[150px] -z-10 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-gold/5 rounded-full blur-[120px] -z-10 pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <div className="space-y-10 relative">
              <RevealOnScroll direction="right">
                <div className="flex items-center gap-4 mb-6">
                  <UtensilsCrossed className="w-5 h-5 text-emerald-500" />
                  <span className="text-emerald-500 uppercase tracking-[0.2em] text-xs font-bold">Our Heritage</span>
                </div>
                <h2 className="font-serif text-4xl lg:text-6xl text-white leading-tight">
                  The Crown Jewel <br/>
                  <span className="text-gold italic">of Deira</span>
                </h2>
              </RevealOnScroll>

              <RevealOnScroll delay={200} direction="right">
                <p className="text-gray-400 font-light leading-relaxed text-lg">
                  Located in the historic Deira Old Souk, Tasty Dine reimagines the culinary splendor of the Mughal era for Dubai’s elite. We do not just serve food; we narrate the rich cultural tapestry of Pakistan through authentic flavors, rare spices, and masterful techniques.
                </p>
              </RevealOnScroll>

              <RevealOnScroll delay={400} direction="right">
                <div className="grid grid-cols-2 gap-10 pt-10 border-t border-emerald-900/30">
                  <div className="group">
                    <h4 className="text-white font-serif text-xl mb-3 group-hover:text-gold transition-colors">Authentic Flavors</h4>
                    <p className="text-sm text-gray-500 leading-relaxed">Sourced directly from the spice markets of Lahore and Peshawar, ensuring an uncompromised royal taste.</p>
                  </div>
                  <div className="group">
                    <h4 className="text-white font-serif text-xl mb-3 group-hover:text-emerald-400 transition-colors">Premium Chefs</h4>
                    <p className="text-sm text-gray-500 leading-relaxed">Generations of culinary mastery brought to your table by our esteemed Ustads (Master Chefs).</p>
                  </div>
                </div>
              </RevealOnScroll>
            </div>

            <RevealOnScroll delay={300} direction="left" className="relative">
              <div className="relative z-10 group">
                <div className="absolute inset-0 bg-emerald-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-700 z-20" />
                <img 
                  src="https://images.unsplash.com/photo-1585937421612-70a008356fbe?auto=format&fit=crop&q=80&w=800" 
                  alt="Master Chef Preparation" 
                  className="w-full rounded-sm object-cover h-[700px] shadow-[0_20px_50px_rgba(0,0,0,0.5)] filter grayscale-[20%] group-hover:grayscale-0 transition-all duration-700"
                />
                <div className="absolute -bottom-10 -left-10 w-full h-full border border-gold/20 -z-10 hidden md:block group-hover:border-gold/50 transition-colors duration-700" />
              </div>
              
              {/* Floating Glass Element */}
              <div className="absolute top-16 -right-12 glass-panel p-6 max-w-[220px] hidden md:block animate-[bounce_5s_infinite]">
                <div className="flex gap-1 text-gold mb-3">
                  {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-current" />)}
                </div>
                <p className="text-sm text-gray-200 font-serif italic">"A paradigm of high-end Pakistani cuisine in Dubai."</p>
              </div>
            </RevealOnScroll>
          </div>
        </div>
      </section>

      {/* MENU SECTION */}
      <section id="menu" className="py-32 relative border-t border-white/5 bg-[#0a0a0a]">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <RevealOnScroll className="text-center mb-20">
            <span className="text-emerald-500 uppercase tracking-[0.2em] text-xs font-bold">Signature Experience</span>
            <h2 className="font-serif text-4xl lg:text-6xl text-white mt-4 mb-12">The Royal Menus</h2>
            
            {/* Menu Tabs */}
            <div className="flex flex-wrap justify-center gap-4 lg:gap-10">
              {Object.keys(MENU_DATA).map((category) => (
                <button
                  key={category}
                  onClick={() => setActiveMenuCategory(category)}
                  className={`text-xs md:text-sm font-semibold tracking-[0.15em] uppercase transition-all duration-500 pb-3 border-b-2 ${
                    activeMenuCategory === category 
                      ? "text-gold border-gold shadow-[0_4px_10px_-4px_rgba(212,175,55,0.5)]" 
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
                <div className="glass-panel p-6 rounded-sm flex gap-6 items-center hover:bg-white/[0.02] transition-colors duration-500">
                  <div className="w-28 h-28 rounded-full overflow-hidden shrink-0 border-2 border-emerald-900 group-hover:border-gold transition-colors duration-700 relative">
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500 z-10" />
                    <img 
                      src={item.img} 
                      alt={item.name} 
                      className="w-full h-full object-cover group-hover:scale-110 group-hover:rotate-3 transition-transform duration-[1.5s]"
                    />
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-baseline mb-3 border-b border-white/10 pb-2 border-dashed group-hover:border-gold/30 transition-colors duration-500">
                      <h3 className="font-serif text-xl text-white group-hover:text-gold transition-colors duration-500">{item.name}</h3>
                      <span className="text-emerald-400 font-semibold ml-4 shrink-0 tracking-wider">{item.price}</span>
                    </div>
                    <p className="text-sm text-gray-400 font-light leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              </RevealOnScroll>
            ))}
          </div>

          <RevealOnScroll delay={400} className="text-center mt-20">
            <button className="px-10 py-4 border border-gold text-gold uppercase tracking-[0.2em] text-xs font-bold hover:bg-gold hover:text-black transition-all duration-500 shadow-[0_0_20px_rgba(212,175,55,0.1)] hover:shadow-[0_0_30px_rgba(212,175,55,0.4)]">
              Download Full PDF Menu
            </button>
          </RevealOnScroll>
        </div>
      </section>

      {/* GALLERY SECTION */}
      <section id="gallery" className="py-32 relative bg-[#050505] border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <RevealOnScroll className="text-center mb-20">
            <span className="text-emerald-500 uppercase tracking-[0.2em] text-xs font-bold">Visual Splendor</span>
            <h2 className="font-serif text-4xl lg:text-6xl text-white mt-4">Luxury Unveiled</h2>
          </RevealOnScroll>

          <div className="masonry-grid">
            {GALLERY.map((src, index) => (
              <RevealOnScroll key={index} delay={index * 100} direction="up" className="masonry-item">
                <div className="relative overflow-hidden group rounded-sm cursor-zoom-in">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-20 transition-all duration-700 z-10" />
                  <img 
                    src={src} 
                    alt={`Luxury Dining ${index + 1}`} 
                    className="w-full h-auto object-cover group-hover:scale-[1.05] transition-transform duration-[2s] ease-out"
                  />
                  <div className="absolute inset-0 border border-emerald-500/0 group-hover:border-emerald-500/40 transition-all duration-700 z-20 m-4 pointer-events-none" />
                </div>
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* REVIEWS SECTION */}
      <section id="reviews" className="py-32 relative bg-gradient-to-b from-[#0a0a0a] to-[#050505] overflow-hidden">
        {/* Background Decorative Rings */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] border border-emerald-900/20 rounded-full z-0 animate-[spin_60s_linear_infinite]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border border-gold/10 rounded-full z-0 animate-[spin_40s_linear_infinite_reverse]" />
        
        <div className="max-w-5xl mx-auto px-6 text-center relative z-10">
          <RevealOnScroll>
            <Quote className="w-20 h-20 text-emerald-900/50 mx-auto mb-10" />
            
            <div className="min-h-[250px] flex flex-col justify-center glass-panel p-10 lg:p-16 rounded-sm">
              <p className="font-serif text-2xl md:text-3xl lg:text-4xl text-white leading-relaxed italic mb-10 transition-opacity duration-700">
                "{REVIEWS[activeReviewIndex].text}"
              </p>
              
              <div className="flex flex-col items-center">
                <div className="flex gap-2 mb-4">
                  {[...Array(REVIEWS[activeReviewIndex].rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-gold fill-current drop-shadow-[0_0_10px_rgba(212,175,55,0.5)]" />
                  ))}
                </div>
                <h4 className="text-emerald-400 tracking-[0.2em] uppercase text-xs font-bold">{REVIEWS[activeReviewIndex].name}</h4>
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
                    idx === activeReviewIndex ? 'bg-gold w-10 shadow-[0_0_10px_rgba(212,175,55,0.8)]' : 'bg-gray-700 hover:bg-emerald-500'
                  }`}
                  aria-label={`Go to review ${idx + 1}`}
                />
              ))}
            </div>
          </RevealOnScroll>
        </div>
      </section>

      {/* RESERVATION & LOCATION SECTION */}
      <section id="reservation" className="py-32 relative bg-[#050505] border-t border-emerald-900/30">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gold to-transparent opacity-20" />
        
        <div className="max-w-7xl mx-auto px-6 lg:px-12 grid lg:grid-cols-12 gap-16">
          
          {/* Booking Form */}
          <RevealOnScroll direction="right" className="lg:col-span-7">
            <div className="glass-panel p-10 md:p-14 relative overflow-hidden">
              <div className="absolute -top-20 -right-20 w-64 h-64 bg-emerald-600/10 blur-[60px] rounded-full pointer-events-none" />
              <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-gold/5 blur-[60px] rounded-full pointer-events-none" />
              
              <div className="mb-12 relative z-10">
                <span className="text-emerald-500 uppercase tracking-[0.2em] text-xs font-bold">VIP Reservation</span>
                <h2 className="font-serif text-4xl lg:text-5xl text-white mt-3">Secure Your Table</h2>
              </div>

              <form onSubmit={handleReservationSubmit} className="space-y-8 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-3">
                    <label className="text-[10px] text-gray-400 uppercase tracking-[0.2em] font-semibold">Distinguished Guest Name</label>
                    <input 
                      type="text" required
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      className="w-full bg-transparent border-b border-white/20 pb-3 text-white focus:outline-none focus:border-gold transition-colors text-lg"
                      placeholder="Your Full Name"
                    />
                  </div>
                  <div className="space-y-3">
                    <label className="text-[10px] text-gray-400 uppercase tracking-[0.2em] font-semibold">Contact Number</label>
                    <input 
                      type="tel" required
                      value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                      className="w-full bg-transparent border-b border-white/20 pb-3 text-white focus:outline-none focus:border-gold transition-colors text-lg"
                      placeholder="+971 50 000 0000"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  <div className="space-y-3 relative">
                    <label className="text-[10px] text-gray-400 uppercase tracking-[0.2em] font-semibold">Date</label>
                    <div className="relative">
                      <Calendar className="absolute right-0 bottom-3 w-5 h-5 text-emerald-500 pointer-events-none" />
                      <input 
                        type="date" required
                        value={formData.date}
                        onChange={(e) => setFormData({...formData, date: e.target.value})}
                        className="w-full bg-transparent border-b border-white/20 pb-3 text-white focus:outline-none focus:border-gold transition-colors appearance-none [&::-webkit-calendar-picker-indicator]:opacity-0 text-lg"
                      />
                    </div>
                  </div>
                  <div className="space-y-3">
                    <label className="text-[10px] text-gray-400 uppercase tracking-[0.2em] font-semibold">Time</label>
                    <select 
                      required
                      value={formData.time}
                      onChange={(e) => setFormData({...formData, time: e.target.value})}
                      className="w-full bg-transparent border-b border-white/20 pb-3 text-white focus:outline-none focus:border-gold transition-colors appearance-none text-lg"
                    >
                      <option value="" disabled className="bg-[#111] text-gray-400">Select Time</option>
                      <option value="19:00" className="bg-[#111]">7:00 PM</option>
                      <option value="20:00" className="bg-[#111]">8:00 PM</option>
                      <option value="21:00" className="bg-[#111]">9:00 PM</option>
                      <option value="22:00" className="bg-[#111]">10:00 PM</option>
                      <option value="23:00" className="bg-[#111]">11:00 PM</option>
                    </select>
                  </div>
                  <div className="space-y-3">
                    <label className="text-[10px] text-gray-400 uppercase tracking-[0.2em] font-semibold">Party Size</label>
                    <select 
                      value={formData.guests}
                      onChange={(e) => setFormData({...formData, guests: e.target.value})}
                      className="w-full bg-transparent border-b border-white/20 pb-3 text-white focus:outline-none focus:border-gold transition-colors appearance-none text-lg"
                    >
                      {[1,2,3,4,5,6,7,8,"VIP Room (8+)"].map(num => (
                        <option key={num} value={num} className="bg-[#111]">{num} {typeof num === 'number' ? 'Guests' : ''}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <button type="submit" className="w-full mt-10 py-5 bg-gradient-to-r from-[#D4AF37] to-[#B8860B] text-black uppercase tracking-[0.2em] text-xs font-bold hover:from-[#F3E5AB] hover:to-[#D4AF37] transition-all duration-500 flex items-center justify-center gap-3 group shadow-[0_10px_20px_rgba(212,175,55,0.3)]">
                  Request Booking via WhatsApp
                  <MessageCircle className="w-5 h-5 group-hover:scale-110 transition-transform" />
                </button>
              </form>
            </div>
          </RevealOnScroll>

          {/* Location & Map */}
          <RevealOnScroll direction="left" className="lg:col-span-5 flex flex-col justify-between">
            <div className="space-y-8 mb-10 lg:mb-0">
              <h3 className="font-serif text-3xl text-white border-l-4 border-emerald-500 pl-4">Location Details</h3>
              
              <div className="space-y-6 glass-panel p-8">
                <div className="flex items-start gap-5">
                  <div className="w-10 h-10 rounded-full bg-emerald-900/50 flex items-center justify-center shrink-0 border border-emerald-500/30">
                    <MapPin className="w-4 h-4 text-emerald-400" />
                  </div>
                  <div>
                    <h5 className="text-white mb-1 uppercase tracking-widest text-xs font-bold">Address</h5>
                    <p className="text-gray-400 font-light text-sm">{CONTACT.address}</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-5">
                  <div className="w-10 h-10 rounded-full bg-emerald-900/50 flex items-center justify-center shrink-0 border border-emerald-500/30">
                    <Phone className="w-4 h-4 text-emerald-400" />
                  </div>
                  <div>
                    <h5 className="text-white mb-1 uppercase tracking-widest text-xs font-bold">Direct Line</h5>
                    <p className="text-gray-400 font-light text-sm">{CONTACT.displayPhone}</p>
                  </div>
                </div>

                <div className="flex items-start gap-5">
                  <div className="w-10 h-10 rounded-full bg-emerald-900/50 flex items-center justify-center shrink-0 border border-emerald-500/30">
                    <Clock className="w-4 h-4 text-emerald-400" />
                  </div>
                  <div>
                    <h5 className="text-white mb-1 uppercase tracking-widest text-xs font-bold">Opening Hours</h5>
                    <p className="text-gray-400 font-light text-sm">{CONTACT.hours}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Map Frame */}
            <div className="w-full h-64 bg-[#111] rounded-sm border border-emerald-900/50 overflow-hidden relative group shadow-2xl">
              <div className="absolute inset-0 bg-emerald-900/20 mix-blend-overlay pointer-events-none z-10" />
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3608.38466179373!2d55.29528731501052!3d25.26435348386561!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f4340e4abf16b%3A0xc6829b5b2a0c6a51!2sDeira%20Old%20Souq!5e0!3m2!1sen!2sae!4v1680123456789!5m2!1sen!2sae" 
                className="w-full h-full filter invert-[100%] hue-rotate-180 contrast-[1.1] grayscale-[30%]"
                style={{ border: 0 }} 
                allowFullScreen="" 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                title="Tasty Dine Location Map"
              />
            </div>
          </RevealOnScroll>

        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-black pt-24 pb-12 border-t border-emerald-900/30 relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-px bg-gradient-to-r from-transparent via-emerald-500 to-transparent opacity-30" />
        
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-8 mb-20">
            
            {/* Brand */}
            <div className="md:col-span-5 space-y-8">
              <div>
                <h1 className="font-serif text-3xl font-bold tracking-wider text-white flex items-center gap-2">
                  <span className="text-emerald-500">TASTY</span> DINE
                </h1>
                <span className="text-[10px] tracking-[0.4em] text-gold uppercase">Taste of Pakistan</span>
              </div>
              <p className="text-gray-400 font-light max-w-sm text-sm leading-relaxed">
                Elevating the standard of fine dining in Dubai. Experience a curated journey of authentic Pakistani flavors in an atmosphere of unparalleled luxury.
              </p>
              <div className="flex gap-4">
                <a href="#" className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-gray-400 hover:text-emerald-400 hover:border-emerald-500 transition-all duration-300 bg-white/5 hover:bg-emerald-900/20">
                  <Instagram className="w-5 h-5" />
                </a>
                <a href="#" className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-gray-400 hover:text-emerald-400 hover:border-emerald-500 transition-all duration-300 bg-white/5 hover:bg-emerald-900/20">
                  <Facebook className="w-5 h-5" />
                </a>
                <a href="#" className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-gray-400 hover:text-emerald-400 hover:border-emerald-500 transition-all duration-300 bg-white/5 hover:bg-emerald-900/20">
                  <Twitter className="w-5 h-5" />
                </a>
              </div>
            </div>

            {/* Links */}
            <div className="md:col-span-3 lg:col-start-7">
              <h4 className="text-white uppercase tracking-[0.2em] text-xs font-bold mb-8">Navigation</h4>
              <ul className="space-y-4">
                {['Home', 'About Heritage', 'Royal Menu', 'Visuals', 'VIP Booking'].map(link => (
                  <li key={link}>
                    <a href="#" onClick={(e) => { e.preventDefault(); scrollToSection(link.toLowerCase() === 'home' ? 'hero' : link.split(' ')[1] ? link.split(' ')[1].toLowerCase() : link.toLowerCase()); }} className="text-gray-400 hover:text-emerald-400 transition-colors text-sm font-light flex items-center gap-2 group">
                      <ChevronRight className="w-3 h-3 text-emerald-600 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Newsletter */}
            <div className="md:col-span-4">
              <h4 className="text-white uppercase tracking-[0.2em] text-xs font-bold mb-8">Elite Newsletter</h4>
              <p className="text-gray-400 font-light text-sm mb-6 leading-relaxed">Subscribe to receive exclusive invitations to our seasonal tasting menus and private events.</p>
              <form className="flex border-b border-white/20 pb-3 focus-within:border-emerald-500 transition-colors">
                <input 
                  type="email" 
                  placeholder="Enter your email" 
                  className="bg-transparent w-full text-white text-sm focus:outline-none placeholder:text-gray-600"
                />
                <button type="button" className="text-emerald-500 uppercase text-xs tracking-[0.2em] font-bold hover:text-white transition-colors pl-4">
                  Subscribe
                </button>
              </form>
            </div>
          </div>

          {/* Copyright */}
          <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-600 font-light uppercase tracking-widest">
            <p>&copy; {new Date().getFullYear()} Tasty Dine Restaurant. All rights reserved.</p>
            <div className="flex gap-8">
              <a href="#" className="hover:text-emerald-400 transition-colors">Privacy</a>
              <a href="#" className="hover:text-emerald-400 transition-colors">Terms</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}