import React, { useState, useEffect, useRef } from 'react';
import { 
  Menu, X, MapPin, Phone, Clock, ChevronRight, 
  Star, Quote, Instagram, Facebook, Twitter, MessageCircle, Play, Navigation
} from 'lucide-react';

// --- CUSTOM CSS & ANIMATIONS ---
const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400&family=Inter:wght@300;400;500;600&display=swap');

  :root {
    --gold: #D4AF37;
    --black: #0A0A0A;
    --maroon: #3A0012; /* Deep Maroon */
    --ivory: #FFFFF0;
  }

  body {
    font-family: 'Inter', sans-serif;
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
  
  .bg-ivory { background-color: var(--ivory); color: var(--black); }
  .bg-maroon { background-color: var(--maroon); color: white; }
  .text-maroon { color: var(--maroon); }

  /* Subtle Indian Mandala/Floral Pattern */
  .indian-pattern {
    background-image: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23d4af37' fill-opacity='0.04'%3E%3Cpath d='M30 30c0-8.284 6.716-15 15-15 8.284 0 15 6.716 15 15s-6.716 15-15 15c-8.284 0-15-6.716-15-15zm0 0c0-8.284-6.716-15-15-15-8.284 0-15 6.716-15 15s6.716 15 15 15c8.284 0 15-6.716 15-15zm0 0c8.284 0 15-6.716 15-15 0-8.284-6.716-15-15-15-8.284 0-15 6.716-15 15 0 8.284 6.716 15 15 15zm0 0c-8.284 0-15-6.716-15-15 0-8.284 6.716-15 15-15 8.284 0 15 6.716 15 15 0 8.284-6.716 15-15 15z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
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
  ::-webkit-scrollbar-thumb { background: #2A000D; border-radius: 4px; }
  ::-webkit-scrollbar-thumb:hover { background: var(--gold); }

  .glass-nav {
    background: rgba(10, 10, 10, 0.9);
    backdrop-filter: blur(12px);
    border-bottom: 1px solid rgba(212, 175, 55, 0.1);
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
      case 'up': return 'translate-y-12';
      case 'down': return '-translate-y-12';
      case 'left': return 'translate-x-12';
      case 'right': return '-translate-x-12';
      case 'scale': return 'scale-95';
      default: return 'translate-y-12';
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
  const [activeMenuCategory, setActiveMenuCategory] = useState('Starters');

  // --- DATA ---
  const menuCategories = ['Starters', 'North Indian', 'South Indian', 'Thali Specials', 'Desserts'];
  const menuData = {
    Starters: [
      { name: 'Saffron Paneer Tikka', desc: 'Cottage cheese marinated in saffron, rich yogurt, and royal spices, char-grilled to perfection.', price: 'AED 45' },
      { name: 'Tandoori Malai Broccoli', desc: 'Broccoli florets infused with cardamom, cheese, and cream, roasted in the tandoor.', price: 'AED 42' },
      { name: 'Shikari Lamb Chops', desc: 'Tender lamb chops slow-cooked with roasted spices and smoked with cloves.', price: 'AED 85' },
      { name: 'Karavali Prawns', desc: 'Coastal style spicy prawns tossed in curry leaves, mustard seeds, and coconut.', price: 'AED 75' },
    ],
    'North Indian': [
      { name: 'Dal Makhani Bukhara', desc: 'Black lentils simmered overnight on a slow charcoal fire, finished with churned butter and cream.', price: 'AED 50' },
      { name: 'Murgh Makhani (Butter Chicken)', desc: 'Classic tandoori chicken cooked in a luscious tomato and fenugreek gravy.', price: 'AED 65' },
      { name: 'Nawabi Lamb Rogan Josh', desc: 'Slow-cooked lamb delicacy from Kashmir, infused with fennel and dry ginger.', price: 'AED 78' },
      { name: 'Awadhi Vegetable Biryani', desc: 'Fragrant basmati rice cooked on dum with seasonal vegetables and saffron.', price: 'AED 55' },
    ],
    'South Indian': [
      { name: 'Chettinad Chicken Curry', desc: 'Spicy and aromatic chicken curry made with 18 freshly ground spices from Tamil Nadu.', price: 'AED 60' },
      { name: 'Alleppey Fish Curry', desc: 'Fresh catch of the day simmered in a tangy raw mango and coconut milk sauce.', price: 'AED 72' },
      { name: 'Ghee Roast Dosa', desc: 'Crispy, paper-thin fermented crepe roasted in pure clarified butter, served with trio of chutneys.', price: 'AED 35' },
    ],
    'Thali Specials': [
      { name: 'The Royal Maharaja Thali', desc: 'A grand feast featuring 3 appetizers, 4 curries, dal, rice, assorted breads, and 2 desserts on a silver platter.', price: 'AED 120' },
      { name: 'Satvik Vegetarian Thali', desc: 'A pure, wholesome spiritual meal crafted without onion or garlic, balancing all six flavors.', price: 'AED 85' },
    ],
    Desserts: [
      { name: 'Gold Leaf Rasmalai', desc: 'Soft cottage cheese dumplings soaked in saffron-infused milk, garnished with 24k edible gold.', price: 'AED 45' },
      { name: 'Moong Dal Halwa', desc: 'Rich and warm lentil pudding cooked in pure ghee and garnished with roasted almonds.', price: 'AED 38' },
      { name: 'Shahi Tukda', desc: 'Crispy fried bread soaked in rose syrup and topped with reduced milk rabdi.', price: 'AED 40' },
    ]
  };

  const galleryImages = [
    "https://image2url.com/r2/default/images/1773855721582-25a57dca-2657-4948-9c6e-ddf9f1241aad.jpg",
    "https://image2url.com/r2/default/images/1773855765776-56e36d5e-3b5e-4c5c-a682-6c960033362b.jpg",
    "https://image2url.com/r2/default/images/1773855814066-7d308432-cd99-43e2-aea8-43bf80410213.jpg",
    "https://image2url.com/r2/default/images/1773855844207-94da55ee-3ef4-4bfa-a806-d6ca09afce72.jpg"
  ];

  const reviews = [
    { name: "Vikram Sharma", text: "The Maharaja Thali took me straight back to the palaces of Rajasthan. The spiritual ambiance is unparalleled in Dubai.", rating: 5 },
    { name: "Elena Rodriguez", text: "An exquisite blend of tradition and modern luxury. The Dal Makhani is an absolute masterpiece.", rating: 5 },
    { name: "Rahul Deshmukh", text: "GuruKrupa offers more than just food; it offers grace. A dining experience that touches the soul.", rating: 5 }
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
    
    const message = `Hello, I want to reserve a table at GuruKrupa Restaurant.%0A%0A*Name:* ${data.name}%0A*Phone:* ${data.phone}%0A*Guests:* ${data.guests}%0A*Date:* ${data.date}%0A*Time:* ${data.time}`;
    
    window.open(`https://wa.me/971504708716?text=${message}`, '_blank');
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
      <div className={`fixed inset-0 z-[100] bg-black flex flex-col items-center justify-center transition-opacity duration-1000 ${isLoading ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
        <div className="relative w-32 h-32 flex items-center justify-center">
          <div className="absolute inset-0 border-t-2 border-r-2 border-[#D4AF37] rounded-full animate-spin" style={{ animationDuration: '3s' }}></div>
          <div className="absolute inset-2 border-b-2 border-l-2 border-[#D4AF37] opacity-50 rounded-full animate-spin animate-reverse" style={{ animationDuration: '2s', animationDirection: 'reverse' }}></div>
          <span className="font-serif text-3xl text-[#D4AF37] tracking-widest">GK</span>
        </div>
        <div className="mt-8 text-sm tracking-[0.3em] text-[#D4AF37] uppercase">Divine Grace</div>
      </div>

      {/* --- NAVIGATION --- */}
      <nav className={`fixed w-full z-50 transition-all duration-500 ${isScrolled ? 'glass-nav py-4' : 'bg-transparent py-6'}`}>
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <div className="text-2xl font-serif text-white flex items-center gap-2 cursor-pointer" onClick={() => window.scrollTo(0,0)}>
            <span className="text-[#D4AF37]">Guru</span>Krupa
          </div>
          
          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-10 text-sm tracking-widest uppercase">
            {['About', 'Menu', 'Gallery', 'Location'].map((item) => (
              <button key={item} onClick={() => scrollTo(item.toLowerCase())} className="text-white hover:text-[#D4AF37] transition-colors relative group">
                {item}
                <span className="absolute -bottom-2 left-0 w-0 h-[1px] bg-[#D4AF37] transition-all duration-300 group-hover:w-full"></span>
              </button>
            ))}
            <button onClick={() => scrollTo('reservation')} className="bg-[#D4AF37] text-black px-6 py-2.5 rounded hover:bg-[#FFFFF0] transition-colors duration-300 font-medium">
              Reserve
            </button>
          </div>

          {/* Mobile Toggle */}
          <button className="md:hidden text-white hover:text-[#D4AF37] transition-colors" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div className={`fixed inset-0 bg-[#0A0A0A] z-40 transition-transform duration-500 ease-in-out md:hidden flex flex-col items-center justify-center gap-8 ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="absolute inset-0 indian-pattern opacity-10 pointer-events-none"></div>
        {['About', 'Menu', 'Gallery', 'Location', 'Reservation'].map((item) => (
          <button 
            key={item} 
            onClick={() => scrollTo(item.toLowerCase())}
            className="text-2xl font-serif text-white hover:text-[#D4AF37] transition-colors relative z-10"
          >
            {item}
          </button>
        ))}
      </div>

      {/* --- HERO SECTION --- */}
      <header className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Background Video/Image */}
        <div className="absolute inset-0 w-full h-full z-0">
          <img 
            src="https://image2url.com/r2/default/images/1773855611849-0dd9ee94-a03e-4919-b2d9-f9e9d0b9eeb1.jpg" 
            alt="Royal Indian Dining" 
            className="w-full h-full object-cover animate-pan opacity-60"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-[#0A0A0A]"></div>
          <div className="absolute inset-0 indian-pattern mix-blend-overlay opacity-30"></div>
        </div>

        <div className="relative z-10 text-center px-6 max-w-5xl mx-auto mt-20">
          <Reveal delay={100}>
            <p className="text-[#D4AF37] tracking-[0.3em] text-sm md:text-base uppercase mb-6 flex items-center justify-center gap-4">
              <span className="w-12 h-[1px] bg-[#D4AF37]"></span>
              Authentic Flavors in the Heart of Dubai
              <span className="w-12 h-[1px] bg-[#D4AF37]"></span>
            </p>
          </Reveal>
          
          <Reveal delay={300}>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif text-white leading-tight mb-8 drop-shadow-lg">
              Experience the Taste of <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D4AF37] to-[#F3E5AB]">
                Royal Indian Luxury
              </span>
            </h1>
          </Reveal>
          
          <Reveal delay={500}>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mt-12">
              <button 
                onClick={() => scrollTo('reservation')}
                className="w-full sm:w-auto px-10 py-4 bg-[#D4AF37] text-black hover:bg-[#FFFFF0] transition-all duration-300 font-medium tracking-wider uppercase text-sm shadow-xl"
              >
                Reserve Table
              </button>
              <button 
                onClick={() => scrollTo('menu')}
                className="w-full sm:w-auto px-10 py-4 bg-black/40 backdrop-blur-sm text-white border border-[#D4AF37]/50 hover:border-[#D4AF37] hover:text-[#D4AF37] transition-all duration-300 font-medium tracking-wider uppercase text-sm flex items-center justify-center gap-2"
              >
                Explore Menu
                <Play size={14} className="fill-current" />
              </button>
            </div>
          </Reveal>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center animate-bounce">
          <span className="text-[10px] tracking-widest text-[#D4AF37] uppercase mb-2">Scroll</span>
          <div className="w-[1px] h-12 bg-gradient-to-b from-[#D4AF37] to-transparent"></div>
        </div>
      </header>

      {/* --- ABOUT SECTION --- */}
      <section id="about" className="py-24 md:py-32 bg-ivory text-black relative overflow-hidden">
        <div className="absolute top-0 left-0 w-96 h-96 bg-[#D4AF37]/10 rounded-full blur-3xl -translate-y-1/2 -translate-x-1/2"></div>
        
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Image Side */}
            <Reveal direction="left" className="relative">
              <div className="aspect-[4/5] relative overflow-hidden rounded-t-full rounded-b-md shadow-2xl">
                <img 
                  src="https://image2url.com/r2/default/images/1773855646363-1b3921bd-151e-4bda-a338-803ae44b926c.jpg" 
                  alt="Authentic Indian Spices & Tradition" 
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-1000"
                />
              </div>
              <div className="absolute -bottom-8 -right-4 w-48 h-48 bg-maroon p-8 hidden md:flex flex-col justify-center text-white rounded-tl-3xl shadow-xl">
                <span className="text-4xl font-serif text-[#D4AF37] mb-2">100%</span>
                <span className="text-sm tracking-wider uppercase leading-snug">Authentic<br/>Recipes</span>
              </div>
            </Reveal>

            {/* Text Side */}
            <Reveal direction="right">
              <h2 className="text-maroon tracking-[0.2em] text-sm uppercase mb-4 font-semibold">The Divine Grace</h2>
              <h3 className="text-4xl md:text-5xl font-serif text-black leading-tight mb-8">
                Where Tradition Meets <span className="text-maroon italic">Spirituality</span>
              </h3>
              <p className="text-gray-700 mb-6 leading-relaxed text-lg">
                "GuruKrupa" translates to the Divine Grace of the Guru. Located prominently near the Sharaf DG Metro Station, we are dedicated to curating an experience that honors India's deep-rooted culinary spirituality and royal heritage.
              </p>
              <p className="text-gray-700 mb-10 leading-relaxed text-lg">
                Our kitchen is a temple of flavor. Every dish is crafted meticulously using sacred, time-honored techniques and the finest spices sourced directly from the Indian subcontinent, offering you a royal feast designed to nourish both body and soul.
              </p>
              
              <div className="flex items-center gap-6 border-l-4 border-[#D4AF37] pl-6 py-2">
                <div className="w-12 h-12 rounded-full border border-maroon flex items-center justify-center text-maroon">
                  <span className="font-serif font-bold">OM</span>
                </div>
                <div>
                  <h4 className="font-serif font-bold text-lg text-black">A Journey of Flavors</h4>
                  <p className="text-sm text-gray-600">From the North's rich gravies to the South's coastal spices.</p>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* --- MENU SECTION --- */}
      <section id="menu" className="py-24 md:py-32 bg-[#0A0A0A] relative">
        <div className="absolute inset-0 indian-pattern opacity-10 pointer-events-none"></div>
        
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="text-center mb-16">
            <Reveal delay={100}>
              <h2 className="text-[#D4AF37] tracking-[0.2em] text-sm uppercase mb-4">Epicurean Delights</h2>
              <h3 className="text-4xl md:text-5xl font-serif text-white">The Royal Menu</h3>
            </Reveal>
          </div>

          {/* Category Tabs */}
          <Reveal delay={200} className="flex flex-wrap justify-center gap-4 md:gap-8 mb-16">
            {menuCategories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveMenuCategory(category)}
                className={`text-sm md:text-base tracking-widest uppercase pb-2 transition-all duration-300 border-b-2 ${
                  activeMenuCategory === category 
                    ? 'border-[#D4AF37] text-[#D4AF37]' 
                    : 'border-transparent text-white/50 hover:text-white'
                }`}
              >
                {category}
              </button>
            ))}
          </Reveal>

          {/* Menu Items Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-12">
            {menuData[activeMenuCategory].map((item, index) => (
              <Reveal key={item.name} delay={index * 100} direction="up">
                <div className="group cursor-pointer">
                  <div className="flex justify-between items-baseline border-b border-white/10 pb-4 mb-3 group-hover:border-[#D4AF37]/50 transition-colors duration-300">
                    <h4 className="text-xl font-serif text-white group-hover:text-[#D4AF37] transition-colors">{item.name}</h4>
                    <span className="text-[#D4AF37] font-medium tracking-wider pl-4 whitespace-nowrap">{item.price}</span>
                  </div>
                  <p className="text-white/60 text-sm leading-relaxed pr-8">{item.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
          
          <div className="text-center mt-20">
            <Reveal delay={300}>
              <button onClick={() => scrollTo('reservation')} className="inline-flex items-center gap-3 text-[#D4AF37] hover:text-white transition-colors duration-300 tracking-widest uppercase text-sm border-b border-[#D4AF37] pb-1">
                Reserve to Taste <ChevronRight size={16} />
              </button>
            </Reveal>
          </div>
        </div>
      </section>

      {/* --- GALLERY SECTION --- */}
      <section id="gallery" className="py-24 bg-ivory">
        <div className="max-w-[1400px] mx-auto px-6">
          <Reveal className="text-center mb-16">
            <h2 className="text-maroon tracking-[0.2em] text-sm uppercase mb-4 font-semibold">Visual Feast</h2>
            <h3 className="text-4xl md:text-5xl font-serif text-black">The Ambience</h3>
          </Reveal>

          {/* Masonry-style Elegant Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {galleryImages.map((src, index) => (
              <Reveal key={index} delay={index * 100} direction="scale" className={`group overflow-hidden relative shadow-lg ${index === 0 || index === 3 ? 'aspect-[4/3]' : 'aspect-square'}`}>
                <img 
                  src={src} 
                  alt={`Gallery Image ${index + 1}`} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-maroon/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                  <div className="w-14 h-14 rounded-full border border-[#D4AF37] flex items-center justify-center text-[#D4AF37] transform translate-y-4 group-hover:translate-y-0 transition-all duration-500">
                    <span className="font-serif italic text-xl font-bold">GK</span>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* --- REVIEWS SECTION --- */}
      <section className="py-24 bg-maroon text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://image2url.com/r2/default/images/1773855879123-3c090c06-ff80-4ba5-8fb4-1d494e2686c3.jpg')] opacity-10 bg-cover bg-fixed bg-center mix-blend-luminosity"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-maroon/80 to-maroon/95"></div>
        
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <Reveal className="text-center mb-16">
            <h2 className="text-[#D4AF37] tracking-[0.2em] text-sm uppercase mb-4">Testimonials</h2>
            <h3 className="text-4xl font-serif text-white">Words of Grace</h3>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {reviews.map((review, index) => (
              <Reveal key={index} delay={index * 200} direction="up" className="bg-white/5 backdrop-blur-md p-8 border border-[#D4AF37]/20 hover:border-[#D4AF37]/60 transition-colors duration-300 rounded-sm">
                <Quote className="text-[#D4AF37] mb-6 opacity-70" size={40} />
                <p className="text-lg leading-relaxed text-white/90 font-serif italic mb-6">"{review.text}"</p>
                <div className="flex items-center justify-between border-t border-white/10 pt-4">
                  <div>
                    <h4 className="font-medium tracking-wide uppercase text-xs">{review.name}</h4>
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
      <section id="reservation" className="bg-[#0A0A0A] py-24 relative border-t border-white/5">
        <div className="absolute top-0 right-0 w-1/3 h-full indian-pattern opacity-5 pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            
            {/* Reservation Form */}
            <Reveal direction="left">
              <div className="bg-[#111] p-10 md:p-14 border border-[#D4AF37]/20 rounded-sm relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent"></div>
                <h3 className="text-3xl font-serif text-white mb-2">Reserve Your Table</h3>
                <p className="text-white/50 mb-10 text-sm">Secure your royal dining experience instantly via WhatsApp.</p>
                
                <form onSubmit={handleReservation} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-xs tracking-widest uppercase text-white/70 mb-2">Full Name</label>
                      <input required name="name" type="text" className="w-full bg-transparent border-b border-white/20 pb-3 text-white focus:outline-none focus:border-[#D4AF37] transition-colors" placeholder="e.g. Rahul Sharma" />
                    </div>
                    <div>
                      <label className="block text-xs tracking-widest uppercase text-white/70 mb-2">Phone Number</label>
                      <input required name="phone" type="tel" className="w-full bg-transparent border-b border-white/20 pb-3 text-white focus:outline-none focus:border-[#D4AF37] transition-colors" placeholder="+971 50 000 0000" />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                      <label className="block text-xs tracking-widest uppercase text-white/70 mb-2">Guests</label>
                      <select required name="guests" className="w-full bg-transparent border-b border-white/20 pb-3 text-white focus:outline-none focus:border-[#D4AF37] transition-colors appearance-none">
                        {[1,2,3,4,5,6,7,8].map(num => <option key={num} value={num} className="bg-[#111]">{num} Person{num > 1 ? 's' : ''}</option>)}
                        <option value="9+" className="bg-[#111]">9+ Persons</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs tracking-widest uppercase text-white/70 mb-2">Date</label>
                      <input required name="date" type="date" className="w-full bg-transparent border-b border-white/20 pb-3 text-white focus:outline-none focus:border-[#D4AF37] transition-colors [color-scheme:dark]" />
                    </div>
                    <div>
                      <label className="block text-xs tracking-widest uppercase text-white/70 mb-2">Time</label>
                      <input required name="time" type="time" className="w-full bg-transparent border-b border-white/20 pb-3 text-white focus:outline-none focus:border-[#D4AF37] transition-colors [color-scheme:dark]" />
                    </div>
                  </div>

                  <button type="submit" className="w-full mt-8 bg-[#D4AF37] text-black py-4 font-bold tracking-widest uppercase text-sm hover:bg-[#FFFFF0] transition-colors duration-300 flex items-center justify-center gap-2 shadow-lg">
                    Book via WhatsApp <MessageCircle size={18} />
                  </button>
                </form>
              </div>
            </Reveal>

            {/* Location & Map */}
            <Reveal direction="right" id="location" className="flex flex-col justify-between">
              <div className="mb-10">
                <h3 className="text-3xl font-serif text-white mb-8">Location & Hours</h3>
                
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <MapPin className="text-[#D4AF37] shrink-0 mt-1" />
                    <div>
                      <h4 className="text-white font-medium mb-1 tracking-wider uppercase text-sm">Address</h4>
                      <p className="text-white/60 text-sm leading-relaxed">
                        Shop 04, 1st Floor, Souq Al Fahidi<br/>
                        Near Sharaf DG Metro Station Exit<br/>
                        Dubai, United Arab Emirates
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <Phone className="text-[#D4AF37] shrink-0 mt-1" />
                    <div>
                      <h4 className="text-white font-medium mb-1 tracking-wider uppercase text-sm">Contact</h4>
                      <p className="text-white/60 text-sm">+971 50 470 8716</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <Clock className="text-[#D4AF37] shrink-0 mt-1" />
                    <div>
                      <h4 className="text-white font-medium mb-1 tracking-wider uppercase text-sm">Opening Hours</h4>
                      <p className="text-white/60 text-sm">Daily: 11:30 AM – 11:30 PM</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Styled Map Image */}
              <div className="relative h-64 w-full bg-[#111] overflow-hidden group rounded-sm border border-white/10">
                <img 
                  src="https://image2url.com/r2/default/images/1773855914103-338ffd19-feea-4251-a3c6-2740918527a4.jpg" 
                  alt="Map Location" 
                  className="w-full h-full object-cover opacity-60 mix-blend-luminosity group-hover:scale-105 transition-transform duration-1000"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] to-transparent"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <a href="https://maps.google.com/?q=Souq+Al+Fahidi+Near+Sharaf+DG+Metro+Station+Dubai" target="_blank" rel="noreferrer" className="bg-[#D4AF37] text-black px-6 py-3 rounded-full text-xs font-bold tracking-widest uppercase shadow-xl hover:scale-105 transition-transform flex items-center gap-2">
                    <Navigation size={14} fill="currentColor" /> Get Directions
                  </a>
                </div>
              </div>
            </Reveal>

          </div>
        </div>
      </section>

      {/* --- FOOTER --- */}
      <footer className="bg-black pt-20 pb-10 border-t border-[#D4AF37]/20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
            
            <div className="col-span-1 md:col-span-2">
              <div className="text-3xl font-serif text-white mb-6">
                <span className="text-[#D4AF37]">Guru</span>Krupa
              </div>
              <p className="text-white/50 text-sm leading-relaxed max-w-sm">
                Redefining the art of royal Indian dining. Experience the perfect harmony of tradition, deep spirituality, and modern elegance in the heart of Dubai.
              </p>
            </div>

            <div>
              <h4 className="text-white font-medium mb-6 tracking-widest uppercase text-sm">Quick Links</h4>
              <ul className="space-y-4 text-white/50 text-sm">
                <li><a href="#about" className="hover:text-[#D4AF37] transition-colors">The Heritage</a></li>
                <li><a href="#menu" className="hover:text-[#D4AF37] transition-colors">Royal Menu</a></li>
                <li><a href="#gallery" className="hover:text-[#D4AF37] transition-colors">Ambience</a></li>
                <li><a href="#reservation" className="hover:text-[#D4AF37] transition-colors">Reservations</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-medium mb-6 tracking-widest uppercase text-sm">Connect</h4>
              <div className="flex gap-4">
                <a href="#" className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-white/70 hover:text-black hover:bg-[#D4AF37] hover:border-[#D4AF37] transition-all"><Instagram size={18} /></a>
                <a href="#" className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-white/70 hover:text-black hover:bg-[#D4AF37] hover:border-[#D4AF37] transition-all"><Facebook size={18} /></a>
                <a href="#" className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-white/70 hover:text-black hover:bg-[#D4AF37] hover:border-[#D4AF37] transition-all"><Twitter size={18} /></a>
              </div>
            </div>

          </div>
          
          <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between text-xs text-white/40 tracking-wider">
            <p>&copy; {new Date().getFullYear()} GuruKrupa Restaurant. All rights reserved.</p>
            <div className="flex gap-4 mt-4 md:mt-0">
              <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>

      {/* --- FLOATING WHATSAPP BUTTON --- */}
      <a 
        href="https://wa.me/971504708716?text=Hello,%20I%20want%20to%20reserve%20a%20table%20at%20GuruKrupa%20Restaurant" 
        target="_blank" 
        rel="noreferrer"
        className="fixed bottom-6 right-6 z-50 bg-[#25D366] text-white p-4 rounded-full shadow-2xl hover:scale-110 hover:shadow-[#25D366]/50 transition-all duration-300 group flex items-center gap-0 overflow-hidden border-2 border-transparent hover:border-white"
        aria-label="Chat on WhatsApp"
      >
        <MessageCircle size={28} />
        <span className="max-w-0 overflow-hidden whitespace-nowrap group-hover:max-w-xs transition-all duration-500 ease-in-out font-medium tracking-wide text-sm pl-0 group-hover:pl-3">
          Book Table
        </span>
      </a>

    </>
  );
}