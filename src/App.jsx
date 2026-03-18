import React, { useState, useEffect, useRef } from 'react';
import { 
  Menu, X, MapPin, Phone, Clock, ChevronRight, 
  Star, Quote, Instagram, Facebook, Twitter, MessageCircle, Play, Navigation
} from 'lucide-react';

// --- CUSTOM CSS & ANIMATIONS ---
const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400&family=Manrope:wght@300;400;500;600&display=swap');

  :root {
    --gold: #D4AF37;
    --gold-light: #F3E5AB;
    --black: #050505;
    --surface: #121212;
  }

  body {
    font-family: 'Manrope', sans-serif;
    background-color: var(--black);
    color: white;
    overflow-x: hidden;
    scroll-behavior: smooth;
  }

  h1, h2, h3, h4, h5, h6, .font-serif {
    font-family: 'Playfair Display', serif;
  }

  .text-gold { color: var(--gold); }
  .bg-gold { background-color: var(--gold); }
  .border-gold { border-color: var(--gold); }

  /* Unique Egg & Oval Shapes */
  .egg-shape {
    border-radius: 50% 50% 50% 50% / 60% 60% 40% 40%;
  }
  
  .egg-shape-inverse {
    border-radius: 50% 50% 50% 50% / 40% 40% 60% 60%;
  }

  .oval-shape {
    border-radius: 50%;
  }

  /* Soft Golden Glows */
  .glow-gold {
    box-shadow: 0 0 40px rgba(212, 175, 55, 0.15);
  }
  .glow-gold-hover:hover {
    box-shadow: 0 0 50px rgba(212, 175, 55, 0.25);
  }

  /* Cinematic Pan Animation */
  @keyframes panImage {
    0% { transform: scale(1.05) translate(0, 0); }
    50% { transform: scale(1.1) translate(-1%, -1%); }
    100% { transform: scale(1.05) translate(0, 0); }
  }
  .animate-pan {
    animation: panImage 30s infinite ease-in-out;
  }

  /* Custom Scrollbar */
  ::-webkit-scrollbar { width: 8px; }
  ::-webkit-scrollbar-track { background: var(--black); }
  ::-webkit-scrollbar-thumb { background: #333; border-radius: 10px; }
  ::-webkit-scrollbar-thumb:hover { background: var(--gold); }

  /* Floating Pill Nav */
  .glass-nav {
    background: rgba(18, 18, 18, 0.85);
    backdrop-filter: blur(16px);
    border: 1px solid rgba(212, 175, 55, 0.2);
    border-radius: 100px;
  }
`;

// --- SMOOTH REVEAL ANIMATION COMPONENT ---
const Reveal = ({ children, delay = 0, direction = 'up', className = '' }) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.15, rootMargin: '0px 0px -50px 0px' }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const getTransform = () => {
    if (isVisible) return 'translate-x-0 translate-y-0 scale-100';
    switch (direction) {
      case 'up': return 'translate-y-16';
      case 'down': return '-translate-y-16';
      case 'left': return 'translate-x-16';
      case 'right': return '-translate-x-16';
      case 'scale': return 'scale-90';
      default: return 'translate-y-16';
    }
  };

  return (
    <div
      ref={ref}
      className={`transition-all duration-1000 ease-out ${className} ${
        isVisible ? 'opacity-100' : 'opacity-0'
      } ${getTransform()}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};

// --- MAIN APP COMPONENT ---
export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeMenuCategory, setActiveMenuCategory] = useState('Indian Main Course');

  // --- DATA ---
  const menuCategories = ['Indian Main Course', 'Street Food Specials', 'Thali', 'Desserts'];
  const menuData = {
    'Indian Main Course': [
      { name: 'Paneer Butter Masala', desc: 'Cottage cheese cubes simmered in a velvety tomato and cashew gravy, finished with gold leaf.', price: 'AED 42' },
      { name: 'Dal Makhani Signature', desc: 'Slow-cooked black lentils overnight over charcoal, infused with premium butter and cream.', price: 'AED 38' },
      { name: 'Malai Kofta', desc: 'Soft cottage cheese and potato dumplings in a rich, creamy golden gravy.', price: 'AED 45' },
      { name: 'Kadai Subz Milan', desc: 'Mixed seasonal vegetables tossed with roasted spices in a traditional iron wok.', price: 'AED 35' },
    ],
    'Street Food Specials': [
      { name: 'Raj Kachori Royal', desc: 'Crispy oversized puri filled with spiced lentils, yogurt, and golden sev.', price: 'AED 28' },
      { name: 'Mumbai Vada Pav', desc: 'The classic street food elevated with premium brioche buns and artisanal chutneys.', price: 'AED 22' },
      { name: 'Pani Puri Platter', desc: 'Crispy spheres served with three infused waters: mint, tamarind, and saffron.', price: 'AED 25' },
      { name: 'Aloo Tikki Chaat', desc: 'Golden fried potato patties topped with sweet yogurt and pomegranate.', price: 'AED 26' },
    ],
    'Thali': [
      { name: 'The Maruti Grand Thali', desc: 'An opulent feast served on a golden platter featuring 3 curries, dal, farsan, rice, breads, and premium sweets.', price: 'AED 65' },
      { name: 'Executive Mini Thali', desc: 'A perfectly portioned meal for the discerning diner, balancing all flavor profiles perfectly.', price: 'AED 45' },
    ],
    'Desserts': [
      { name: 'Saffron Rasmalai', desc: 'Spongy cottage cheese discs soaked in thickened, sweetened saffron milk.', price: 'AED 32' },
      { name: 'Gulab Jamun Flambé', desc: 'Warm milk dumplings served with a dramatic rose-syrup flambé table-side.', price: 'AED 28' },
      { name: 'Moong Dal Halwa', desc: 'Rich, warm lentil pudding cooked in pure ghee, garnished with gold dust.', price: 'AED 35' },
    ]
  };

  const galleryImages = [
    "https://image2url.com/r2/default/images/1773855721582-25a57dca-2657-4948-9c6e-ddf9f1241aad.jpg",
    "https://image2url.com/r2/default/images/1773855765776-56e36d5e-3b5e-4c5c-a682-6c960033362b.jpg",
    "https://image2url.com/r2/default/images/1773855814066-7d308432-cd99-43e2-aea8-43bf80410213.jpg",
    "https://image2url.com/r2/default/images/1773855844207-94da55ee-3ef4-4bfa-a806-d6ca09afce72.jpg"
  ];

  const reviews = [
    { name: "Aisha Sultan", text: "A breathtaking experience. The egg-shaped layout of the restaurant perfectly matches the futuristic luxury of Dubai.", rating: 5 },
    { name: "Rohan Mehta", text: "The Maruti Grand Thali is the best I have ever had. The flavors are as premium as the gold decor.", rating: 5 },
    { name: "Sarah Williams", text: "Flawless ambiance. Not a single sharp edge in sight, making for a smooth, calming, and highly luxurious dining experience.", rating: 5 }
  ];

  // --- EFFECTS ---
  useEffect(() => {
    // Premium Loading Screen
    const timer = setTimeout(() => setIsLoading(false), 2800);
    
    // Scroll tracking for Navbar
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      clearTimeout(timer);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // --- HANDLERS ---
  const handleReservation = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());
    
    const message = `Hello, I want to reserve a table at Milan Maruti Restaurant.%0A%0A*Name:* ${data.name}%0A*Phone:* ${data.phone}%0A*Guests:* ${data.guests}%0A*Date:* ${data.date}%0A*Time:* ${data.time}`;
    
    window.open(`https://wa.me/971564731116?text=${message}`, '_blank');
  };

  const scrollTo = (id) => {
    setIsMobileMenuOpen(false);
    const el = document.getElementById(id);
    if (el) {
      window.scrollTo({
        top: el.offsetTop - 80,
        behavior: 'smooth'
      });
    }
  };

  // --- RENDER ---
  return (
    <>
      <style>{styles}</style>

      {/* --- LOADING SCREEN --- */}
      <div className={`fixed inset-0 z-[100] bg-[#050505] flex flex-col items-center justify-center transition-opacity duration-1000 ${isLoading ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
        <div className="relative w-32 h-40 flex items-center justify-center egg-shape border border-[#D4AF37] glow-gold">
          <div className="absolute inset-2 border-b-2 border-l-2 border-[#F3E5AB] opacity-50 egg-shape animate-spin" style={{ animationDuration: '3s' }}></div>
          <span className="font-serif text-3xl text-[#D4AF37] tracking-widest">MM</span>
        </div>
        <div className="mt-8 text-sm tracking-[0.4em] text-[#D4AF37] uppercase font-light">Shaping Luxury</div>
      </div>

      {/* --- NAVIGATION --- */}
      <div className="fixed w-full z-50 flex justify-center top-0 pt-6 px-4 transition-all duration-500 pointer-events-none">
        <nav className={`pointer-events-auto transition-all duration-500 px-8 py-4 flex justify-between items-center w-full max-w-5xl ${isScrolled ? 'glass-nav glow-gold' : 'bg-transparent border border-transparent'}`}>
          <div className="text-xl md:text-2xl font-serif text-white flex items-center gap-2 cursor-pointer" onClick={() => window.scrollTo(0,0)}>
            <span className="text-[#D4AF37]">Milan</span> Maruti
          </div>
          
          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8 text-xs tracking-[0.2em] uppercase font-medium">
            {['About', 'Menu', 'Gallery', 'Location'].map((item) => (
              <button key={item} onClick={() => scrollTo(item.toLowerCase())} className="text-white/80 hover:text-[#D4AF37] transition-colors relative group">
                {item}
                <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-[#D4AF37] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
              </button>
            ))}
            <button onClick={() => scrollTo('reservation')} className="bg-[#D4AF37] text-black px-6 py-3 rounded-[50px] hover:bg-[#F3E5AB] transition-colors duration-300 font-bold ml-4">
              Reserve
            </button>
          </div>

          {/* Mobile Toggle */}
          <button className="md:hidden text-white hover:text-[#D4AF37] transition-colors" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </nav>
      </div>

      {/* Mobile Menu Overlay */}
      <div className={`fixed inset-0 bg-[#0A0A0A]/95 backdrop-blur-xl z-40 transition-transform duration-500 ease-in-out md:hidden flex flex-col items-center justify-center gap-8 ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        {['About', 'Menu', 'Gallery', 'Location', 'Reservation'].map((item) => (
          <button 
            key={item} 
            onClick={() => scrollTo(item.toLowerCase())}
            className="text-3xl font-serif text-white hover:text-[#D4AF37] transition-colors relative z-10"
          >
            {item}
          </button>
        ))}
      </div>

      {/* --- HERO SECTION --- */}
      <header className="relative h-screen flex items-center justify-center overflow-hidden bg-[#050505] pt-20">
        <div className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none p-4 md:p-10">
          <div className="w-full max-w-lg md:max-w-3xl h-[85vh] egg-shape overflow-hidden relative glow-gold border border-[#D4AF37]/30">
            <img 
              src="https://image2url.com/r2/default/images/1773855611849-0dd9ee94-a03e-4919-b2d9-f9e9d0b9eeb1.jpg" 
              alt="Luxury Dining" 
              className="w-full h-full object-cover animate-pan opacity-50"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent"></div>
          </div>
        </div>

        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto mt-10">
          <Reveal delay={100}>
            <div className="inline-flex items-center gap-4 bg-[#121212]/80 backdrop-blur-md px-6 py-2 rounded-[50px] border border-[#D4AF37]/30 mb-8">
              <span className="w-2 h-2 rounded-full bg-[#D4AF37] animate-pulse"></span>
              <p className="text-[#D4AF37] tracking-[0.2em] text-xs font-semibold uppercase">
                Premium Indian Flavors in Dubai
              </p>
            </div>
          </Reveal>
          
          <Reveal delay={300}>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif text-white leading-[1.15] mb-8 drop-shadow-2xl">
              Experience Dining in a <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D4AF37] via-[#F3E5AB] to-[#D4AF37]">
                New Shape of Luxury
              </span>
            </h1>
          </Reveal>
          
          <Reveal delay={500}>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mt-12">
              <button 
                onClick={() => scrollTo('reservation')}
                className="w-full sm:w-auto px-10 py-4 bg-[#D4AF37] text-black rounded-[50px] hover:bg-[#F3E5AB] transition-all duration-300 font-bold tracking-widest uppercase text-xs shadow-[0_0_20px_rgba(212,175,55,0.4)]"
              >
                Reserve Table
              </button>
              <button 
                onClick={() => scrollTo('menu')}
                className="w-full sm:w-auto px-10 py-4 bg-[#121212]/60 backdrop-blur-sm text-white rounded-[50px] border border-[#D4AF37]/50 hover:border-[#D4AF37] hover:bg-[#121212] transition-all duration-300 font-bold tracking-widest uppercase text-xs flex items-center justify-center gap-2"
              >
                Explore Menu
                <Play size={14} className="fill-current text-[#D4AF37]" />
              </button>
            </div>
          </Reveal>
        </div>
      </header>

      {/* --- ABOUT SECTION --- */}
      <section id="about" className="py-24 md:py-32 bg-[#0A0A0A] text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#D4AF37]/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
        
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            {/* Curved Text Side */}
            <Reveal direction="right" className="order-2 lg:order-1 bg-[#121212] p-10 md:p-16 rounded-[60px] border border-white/5 glow-gold-hover transition-shadow duration-500">
              <h2 className="text-[#D4AF37] tracking-[0.2em] text-xs uppercase mb-4 font-bold flex items-center gap-3">
                <span className="w-8 h-[1px] bg-[#D4AF37]"></span> Our Story
              </h2>
              <h3 className="text-4xl md:text-5xl font-serif text-white leading-tight mb-8">
                Authenticity Shaped by <span className="text-[#D4AF37] italic">Elegance</span>
              </h3>
              <p className="text-white/60 mb-6 leading-relaxed font-light">
                Milan Maruti represents a paradigm shift in Indian fine dining. Located near the iconic Royal Sweets in Dubai, our philosophy is built around the concept of curves—no sharp edges in our flavors, our hospitality, or our architecture.
              </p>
              <p className="text-white/60 mb-10 leading-relaxed font-light">
                Every recipe is a seamless loop of tradition and modern luxury, bringing you the authentic soul of India wrapped in an ultra-modern, golden dining experience.
              </p>
              
              <div className="flex items-center gap-6 bg-black/50 p-6 rounded-[40px] border border-white/5">
                <div className="w-14 h-14 rounded-full border border-[#D4AF37] flex items-center justify-center text-[#D4AF37] bg-[#D4AF37]/10 shrink-0">
                  <Star size={24} fill="currentColor" />
                </div>
                <div>
                  <h4 className="font-serif font-bold text-lg text-white">5-Star Excellence</h4>
                  <p className="text-xs text-white/50 tracking-wider uppercase mt-1">Award-winning Indian cuisine</p>
                </div>
              </div>
            </Reveal>

            {/* Egg Image Side */}
            <Reveal direction="left" className="order-1 lg:order-2 relative flex justify-center">
              <div className="w-full max-w-[400px] aspect-[3/4] egg-shape relative overflow-hidden border border-[#D4AF37]/20 glow-gold p-2 bg-[#121212]">
                <div className="w-full h-full egg-shape overflow-hidden">
                  <img 
                    src="https://image2url.com/r2/default/images/1773855646363-1b3921bd-151e-4bda-a338-803ae44b926c.jpg" 
                    alt="Authentic Indian Spices" 
                    className="w-full h-full object-cover hover:scale-110 transition-transform duration-1000"
                  />
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* --- MENU SECTION --- */}
      <section id="menu" className="py-24 md:py-32 bg-[#050505] relative border-y border-[#D4AF37]/10">
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="text-center mb-16">
            <Reveal delay={100}>
              <h2 className="text-[#D4AF37] tracking-[0.2em] text-xs uppercase mb-4 font-bold">A Rounded Palette</h2>
              <h3 className="text-4xl md:text-5xl font-serif text-white">The Golden Menu</h3>
            </Reveal>
          </div>

          {/* Pill Tabs */}
          <Reveal delay={200} className="flex flex-wrap justify-center gap-4 mb-16">
            {menuCategories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveMenuCategory(category)}
                className={`text-xs md:text-sm tracking-widest uppercase px-6 py-3 rounded-[50px] transition-all duration-300 border ${
                  activeMenuCategory === category 
                    ? 'border-[#D4AF37] bg-[#D4AF37]/10 text-[#D4AF37] shadow-[0_0_15px_rgba(212,175,55,0.2)]' 
                    : 'border-white/10 text-white/50 hover:text-white hover:border-white/30 bg-[#121212]'
                }`}
              >
                {category}
              </button>
            ))}
          </Reveal>

          {/* Menu Items Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {menuData[activeMenuCategory].map((item, index) => (
              <Reveal key={item.name} delay={index * 100} direction="up">
                <div className="bg-[#121212] p-8 rounded-[40px] border border-white/5 hover:border-[#D4AF37]/50 transition-colors duration-500 group cursor-pointer glow-gold-hover h-full flex flex-col justify-center">
                  <div className="flex justify-between items-start mb-4">
                    <h4 className="text-xl font-serif text-white group-hover:text-[#D4AF37] transition-colors">{item.name}</h4>
                    <span className="text-black bg-[#D4AF37] px-4 py-1 rounded-[50px] font-bold tracking-wider text-xs whitespace-nowrap ml-4">{item.price}</span>
                  </div>
                  <p className="text-white/50 text-sm leading-relaxed font-light">{item.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
          
          <div className="text-center mt-16">
            <Reveal delay={300}>
              <button onClick={() => scrollTo('reservation')} className="inline-flex items-center gap-3 text-[#D4AF37] hover:text-[#F3E5AB] transition-colors duration-300 tracking-widest uppercase text-xs font-bold bg-[#D4AF37]/10 px-8 py-4 rounded-[50px] border border-[#D4AF37]/30">
                Reserve to Taste <ChevronRight size={16} />
              </button>
            </Reveal>
          </div>
        </div>
      </section>

      {/* --- GALLERY SECTION --- */}
      <section id="gallery" className="py-24 bg-[#0A0A0A]">
        <div className="max-w-[1400px] mx-auto px-6">
          <Reveal className="text-center mb-16">
            <h2 className="text-[#D4AF37] tracking-[0.2em] text-xs uppercase mb-4 font-bold">Visual Feast</h2>
            <h3 className="text-4xl md:text-5xl font-serif text-white">Shaped by Design</h3>
          </Reveal>

          {/* Oval Grid Layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {galleryImages.map((src, index) => (
              <Reveal key={index} delay={index * 100} direction="scale" className="group flex justify-center">
                <div className={`w-full max-w-[300px] relative overflow-hidden border border-[#D4AF37]/20 glow-gold p-2 bg-[#121212] transition-transform duration-500 hover:-translate-y-4 ${index % 2 === 0 ? 'egg-shape aspect-[3/4]' : 'oval-shape aspect-square mt-0 lg:mt-16'}`}>
                  <div className={`w-full h-full overflow-hidden ${index % 2 === 0 ? 'egg-shape' : 'oval-shape'}`}>
                    <img 
                      src={src} 
                      alt={`Gallery Image ${index + 1}`} 
                      className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-125"
                    />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center backdrop-blur-sm">
                      <div className="w-12 h-12 rounded-full bg-[#D4AF37] flex items-center justify-center text-black transform scale-50 opacity-0 group-hover:scale-100 group-hover:opacity-100 transition-all duration-500">
                        <Play size={20} fill="currentColor" />
                      </div>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* --- REVIEWS SECTION --- */}
      <section className="py-24 bg-[#050505] text-white relative overflow-hidden border-t border-[#D4AF37]/10">
        <div className="absolute inset-0 bg-[url('https://image2url.com/r2/default/images/1773855879123-3c090c06-ff80-4ba5-8fb4-1d494e2686c3.jpg')] opacity-[0.03] bg-cover bg-fixed bg-center"></div>
        
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <Reveal className="text-center mb-16">
            <h2 className="text-[#D4AF37] tracking-[0.2em] text-xs uppercase mb-4 font-bold">Testimonials</h2>
            <h3 className="text-4xl font-serif text-white">Golden Words</h3>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {reviews.map((review, index) => (
              <Reveal key={index} delay={index * 200} direction="up" className="bg-[#121212] p-10 rounded-[50px] border border-[#D4AF37]/20 hover:border-[#D4AF37] glow-gold-hover transition-all duration-500 flex flex-col justify-between">
                <div>
                  <Quote className="text-[#D4AF37] mb-6 opacity-70" size={36} />
                  <p className="text-base leading-relaxed text-white/80 font-serif italic mb-8">"{review.text}"</p>
                </div>
                <div className="flex items-center justify-between border-t border-white/10 pt-6">
                  <div>
                    <h4 className="font-bold tracking-wide uppercase text-xs text-white">{review.name}</h4>
                  </div>
                  <div className="flex gap-1 text-[#D4AF37]">
                    {[...Array(review.rating)].map((_, i) => <Star key={i} size={14} fill="currentColor" />)}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* --- RESERVATION & LOCATION SECTION --- */}
      <section id="reservation" className="bg-[#0A0A0A] py-24 relative border-t border-[#D4AF37]/10">
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
            
            {/* Reservation Form (Curved) */}
            <Reveal direction="left">
              <div className="bg-[#121212] p-10 md:p-16 rounded-[60px] border border-[#D4AF37]/30 glow-gold relative overflow-hidden">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-1 bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent"></div>
                
                <h3 className="text-3xl font-serif text-white mb-2 text-center">Reserve Your Oval</h3>
                <p className="text-white/50 mb-10 text-xs tracking-wider uppercase text-center font-bold">Secure your luxury dining experience.</p>
                
                <form onSubmit={handleReservation} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <input required name="name" type="text" className="w-full bg-[#050505] border border-white/10 rounded-[50px] px-6 py-4 text-white text-sm focus:outline-none focus:border-[#D4AF37] transition-colors" placeholder="Full Name" />
                    </div>
                    <div>
                      <input required name="phone" type="tel" className="w-full bg-[#050505] border border-white/10 rounded-[50px] px-6 py-4 text-white text-sm focus:outline-none focus:border-[#D4AF37] transition-colors" placeholder="Phone Number" />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                      <select required name="guests" className="w-full bg-[#050505] border border-white/10 rounded-[50px] px-6 py-4 text-white text-sm focus:outline-none focus:border-[#D4AF37] transition-colors appearance-none">
                        <option value="" disabled selected className="text-white/50">Guests</option>
                        {[1,2,3,4,5,6,7,8].map(num => <option key={num} value={num}>{num} Person{num > 1 ? 's' : ''}</option>)}
                        <option value="9+">9+ Persons</option>
                      </select>
                    </div>
                    <div>
                      <input required name="date" type="date" className="w-full bg-[#050505] border border-white/10 rounded-[50px] px-6 py-4 text-white text-sm focus:outline-none focus:border-[#D4AF37] transition-colors [color-scheme:dark]" />
                    </div>
                    <div>
                      <input required name="time" type="time" className="w-full bg-[#050505] border border-white/10 rounded-[50px] px-6 py-4 text-white text-sm focus:outline-none focus:border-[#D4AF37] transition-colors [color-scheme:dark]" />
                    </div>
                  </div>

                  <button type="submit" className="w-full mt-6 bg-[#D4AF37] text-black py-5 rounded-[50px] font-bold tracking-widest uppercase text-xs hover:bg-[#F3E5AB] transition-colors duration-300 flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(212,175,55,0.3)] hover:shadow-[0_0_30px_rgba(212,175,55,0.6)]">
                    Book via WhatsApp <MessageCircle size={16} />
                  </button>
                </form>
              </div>
            </Reveal>

            {/* Location & Curved Map */}
            <Reveal direction="right" id="location" className="flex flex-col justify-between">
              <div className="mb-10 bg-[#121212] p-10 rounded-[50px] border border-white/5">
                <h3 className="text-3xl font-serif text-white mb-8">Location & Hours</h3>
                
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-[#D4AF37]/10 flex items-center justify-center shrink-0 border border-[#D4AF37]/30">
                      <MapPin className="text-[#D4AF37]" size={18} />
                    </div>
                    <div>
                      <h4 className="text-white font-bold mb-1 tracking-wider uppercase text-xs">Address</h4>
                      <p className="text-white/60 text-sm leading-relaxed font-light">
                        Mussalah Street, Opp. Paratha Express<br/>
                        Near Royal Sweets, Dubai, UAE
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-[#D4AF37]/10 flex items-center justify-center shrink-0 border border-[#D4AF37]/30">
                      <Phone className="text-[#D4AF37]" size={18} />
                    </div>
                    <div>
                      <h4 className="text-white font-bold mb-1 tracking-wider uppercase text-xs">Contact</h4>
                      <p className="text-white/60 text-sm font-light">+971 56 473 1116</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-[#D4AF37]/10 flex items-center justify-center shrink-0 border border-[#D4AF37]/30">
                      <Clock className="text-[#D4AF37]" size={18} />
                    </div>
                    <div>
                      <h4 className="text-white font-bold mb-1 tracking-wider uppercase text-xs">Opening Hours</h4>
                      <p className="text-white/60 text-sm font-light">Daily: 12:00 PM – 12:00 AM</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Styled Oval Map Image */}
              <div className="relative h-48 w-full bg-[#111] overflow-hidden group rounded-[100px] border border-[#D4AF37]/30 p-2 glow-gold">
                <div className="w-full h-full rounded-[100px] overflow-hidden relative">
                  <img 
                    src="https://image2url.com/r2/default/images/1773855914103-338ffd19-feea-4251-a3c6-2740918527a4.jpg" 
                    alt="Map Location" 
                    className="w-full h-full object-cover opacity-50 mix-blend-luminosity group-hover:scale-105 transition-transform duration-1000"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#050505] to-transparent opacity-80"></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <a href="https://maps.google.com/?q=Milan+Maruti+Restaurant+Mussalah+Street+Near+Royal+Sweets+Dubai" target="_blank" rel="noreferrer" className="bg-black/80 backdrop-blur-md text-[#D4AF37] px-8 py-4 rounded-[50px] border border-[#D4AF37]/50 text-xs font-bold tracking-widest uppercase hover:bg-[#D4AF37] hover:text-black transition-colors flex items-center gap-2">
                      <Navigation size={14} fill="currentColor" /> Get Directions
                    </a>
                  </div>
                </div>
              </div>
            </Reveal>

          </div>
        </div>
      </section>

      {/* --- FOOTER --- */}
      <footer className="bg-[#050505] pt-24 pb-10 rounded-t-[50px] md:rounded-t-[100px] border-t border-[#D4AF37]/20 relative mt-[-20px] z-20 shadow-[0_-10px_30px_rgba(212,175,55,0.05)]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16 text-center md:text-left">
            
            <div className="col-span-1 md:col-span-2 flex flex-col items-center md:items-start">
              <div className="text-3xl font-serif text-white mb-6">
                <span className="text-[#D4AF37]">Milan</span> Maruti
              </div>
              <p className="text-white/50 text-sm leading-relaxed max-w-xs font-light">
                The intersection of culinary tradition and ultra-modern luxury. Dining beautifully shaped for the discerning palate in Dubai.
              </p>
            </div>

            <div className="flex flex-col items-center md:items-start">
              <h4 className="text-[#D4AF37] font-bold mb-6 tracking-widest uppercase text-xs">Explore</h4>
              <ul className="space-y-4 text-white/50 text-sm font-light">
                <li><a href="#about" className="hover:text-[#D4AF37] transition-colors">Our Story</a></li>
                <li><a href="#menu" className="hover:text-[#D4AF37] transition-colors">Golden Menu</a></li>
                <li><a href="#gallery" className="hover:text-[#D4AF37] transition-colors">Gallery</a></li>
                <li><a href="#reservation" className="hover:text-[#D4AF37] transition-colors">Reservations</a></li>
              </ul>
            </div>

            <div className="flex flex-col items-center md:items-start">
              <h4 className="text-[#D4AF37] font-bold mb-6 tracking-widest uppercase text-xs">Socials</h4>
              <div className="flex gap-4">
                <a href="#" className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-white/70 hover:text-black hover:bg-[#D4AF37] hover:border-[#D4AF37] transition-all"><Instagram size={18} /></a>
                <a href="#" className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-white/70 hover:text-black hover:bg-[#D4AF37] hover:border-[#D4AF37] transition-all"><Facebook size={18} /></a>
                <a href="#" className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-white/70 hover:text-black hover:bg-[#D4AF37] hover:border-[#D4AF37] transition-all"><Twitter size={18} /></a>
              </div>
            </div>

          </div>
          
          <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row items-center justify-between text-xs text-white/30 tracking-wider font-light">
            <p>&copy; {new Date().getFullYear()} Milan Maruti Restaurant. All rights reserved.</p>
            <div className="flex gap-4 mt-4 md:mt-0">
              <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>

      {/* --- FLOATING WHATSAPP BUTTON --- */}
      <a 
        href="https://wa.me/971564731116?text=Hello,%20I%20want%20to%20reserve%20a%20table%20at%20Milan%20Maruti%20Restaurant" 
        target="_blank" 
        rel="noreferrer"
        className="fixed bottom-6 right-6 z-50 bg-[#25D366] text-white p-4 rounded-full shadow-[0_0_20px_rgba(37,211,102,0.4)] hover:scale-110 transition-transform duration-300 group flex items-center gap-0 overflow-hidden"
        aria-label="Chat on WhatsApp"
      >
        <MessageCircle size={28} />
        <span className="max-w-0 overflow-hidden whitespace-nowrap group-hover:max-w-xs transition-all duration-500 ease-in-out font-bold tracking-wide text-xs pl-0 group-hover:pl-3 uppercase">
          Book Table
        </span>
      </a>

    </>
  );
}