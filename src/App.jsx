import React, { useState, useEffect, useRef } from 'react';
import { 
  Menu as MenuIcon, X, MapPin, Phone, Clock, ChevronRight, 
  Star, Quote, Instagram, Facebook, MessageCircle, Flame
} from 'lucide-react';

// --- STYLES INJECTION ---
const customStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500&family=Outfit:wght@300;400;500;600&display=swap');

  :root {
    --gold: #C5A059; /* Antique Gold */
    --gold-light: #E8CBA3;
    --dark: #0D0A08; /* Matte Black / Very Dark Brown */
    --earth: #2A1810; /* Dark Earth Brown */
    --earth-light: #3D2314;
    --orange: #D9772F; /* Warm Fire Orange */
    --ivory: #F4ECE4; /* Warm Ivory */
  }

  body {
    background-color: var(--dark);
    color: var(--ivory);
    font-family: 'Outfit', sans-serif;
    overflow-x: hidden;
    scroll-behavior: smooth;
  }

  /* Custom Scrollbar */
  ::-webkit-scrollbar {
    width: 6px;
  }
  ::-webkit-scrollbar-track {
    background: var(--dark);
  }
  ::-webkit-scrollbar-thumb {
    background: var(--earth-light);
    border-radius: 10px;
  }
  ::-webkit-scrollbar-thumb:hover {
    background: var(--orange);
  }

  .font-playfair {
    font-family: 'Playfair Display', serif;
  }

  /* Rustic Textures & Overlays */
  .bg-rustic {
    background-color: var(--dark);
    background-image: url("https://www.transparenttextures.com/patterns/wood-pattern.png"); 
    background-blend-mode: multiply;
  }

  .bg-gradient-earth {
    background: radial-gradient(circle at 50% 50%, var(--earth) 0%, var(--dark) 100%);
  }

  /* Animations */
  @keyframes kenburns {
    0% { transform: scale(1); }
    100% { transform: scale(1.12); }
  }
  .animate-kenburns {
    animation: kenburns 30s ease-in-out infinite alternate;
  }

  @keyframes smoke-drift {
    0% { transform: translateY(0) scale(1) opacity(0.3); }
    50% { transform: translateY(-20px) scale(1.05) opacity(0.5); }
    100% { transform: translateY(0) scale(1) opacity(0.3); }
  }
  .animate-smoke {
    animation: smoke-drift 8s ease-in-out infinite;
  }

  /* Glassmorphism & Luxury Utilities */
  .glass {
    background: rgba(13, 10, 8, 0.75);
    backdrop-filter: blur(16px);
    -webkit-backdrop-filter: blur(16px);
    border-bottom: 1px solid rgba(197, 160, 89, 0.1);
  }

  .glass-card {
    background: linear-gradient(145deg, rgba(61, 35, 20, 0.4) 0%, rgba(13, 10, 8, 0.9) 100%);
    backdrop-filter: blur(12px);
    border: 1px solid rgba(197, 160, 89, 0.15);
    box-shadow: 0 10px 30px 0 rgba(0, 0, 0, 0.8);
    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  }
  
  .glass-card:hover {
    border-color: rgba(217, 119, 47, 0.5); /* Orange glow on hover */
    box-shadow: 0 15px 40px 0 rgba(217, 119, 47, 0.15);
    transform: translateY(-5px);
  }

  .gold-gradient-text {
    background: linear-gradient(to right, #C5A059, #F4ECE4, #D9772F, #C5A059);
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
    background-size: 200% auto;
    animation: shine 6s linear infinite;
  }

  @keyframes shine {
    to { background-position: 200% center; }
  }

  .text-glow {
    text-shadow: 0 0 25px rgba(217, 119, 47, 0.5);
  }

  .map-dark {
    filter: invert(100%) hue-rotate(180deg) brightness(75%) contrast(140%) sepia(50%) hue-rotate(-30deg);
  }

  .lantern-glow {
    background: radial-gradient(circle, rgba(217,119,47,0.15) 0%, rgba(0,0,0,0) 70%);
  }
`;

// --- CUSTOM COMPONENTS ---

const RevealOnScroll = ({ children, delay = 0, direction = 'up', duration = 1000 }) => {
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
    return () => { if (ref.current) observer.unobserve(ref.current); };
  }, []);

  const getTransform = () => {
    if (isVisible) return 'translate-y-0 translate-x-0 opacity-100 scale-100';
    switch (direction) {
      case 'up': return 'translate-y-12 opacity-0 scale-95';
      case 'down': return '-translate-y-12 opacity-0 scale-95';
      case 'left': return 'translate-x-12 opacity-0 scale-95';
      case 'right': return '-translate-x-12 opacity-0 scale-95';
      default: return 'translate-y-12 opacity-0 scale-95';
    }
  };

  return (
    <div
      ref={ref}
      className={`transition-all ease-out ${getTransform()}`}
      style={{ transitionDelay: `${delay}ms`, transitionDuration: `${duration}ms` }}
    >
      {children}
    </div>
  );
};

// --- MAIN APP COMPONENT ---

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [activeMenuTab, setActiveMenuTab] = useState('Signature Tandoor');
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [lightboxImg, setLightboxImg] = useState(null);

  // Form State
  const [formData, setFormData] = useState({
    name: '', phone: '', guests: '2', date: '', time: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    // Inject Styles
    const styleSheet = document.createElement("style");
    styleSheet.type = "text/css";
    styleSheet.innerText = customStyles;
    document.head.appendChild(styleSheet);

    // Cinematic Loading Screen
    setTimeout(() => setIsLoading(false), 3500);

    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);

    return () => {
      document.head.removeChild(styleSheet);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleBookTable = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    setTimeout(() => {
      const phone = "971556327277";
      const message = `*Premium Reservation - Desi Dhaba Burdubai* 🔥\n\n*Name:* ${formData.name}\n*Contact:* ${formData.phone}\n*Guests:* ${formData.guests} Guests\n*Date:* ${formData.date}\n*Time:* ${formData.time}\n\nLooking forward to a luxurious rustic dining experience.`;
      const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
      window.open(url, "_blank");
      setIsSubmitting(false);
      
      setFormData({name: '', phone: '', guests: '2', date: '', time: ''});
    }, 1200);
  };

  // --- MENU DATA ---
  const menuData = {
    "Signature Tandoor": [
      { name: '24K Gold Vark Tikka', desc: 'Charcoal-smoked chicken thighs marinated in saffron cream, finished with edible 24K gold leaf.', price: 'AED 145', img: 'https://image2url.com/r2/default/images/1773770014780-126cca91-0011-4b23-86c7-26c1e6c7c1b6.jpg' },
      { name: 'Smoked Lamb Chops', desc: 'New Zealand lamb chops steeped in dark rum and rustic Indian spices, flash-grilled in the clay oven.', price: 'AED 185', img: 'https://image2url.com/r2/default/images/1773770053567-e878c456-1837-4987-8b4a-f582d464c8d2.jpg' },
      { name: 'Tandoori Lobster', desc: 'Whole Omani lobster glazed with mustard oil, Kashmiri chili, and roasted garlic butter.', price: 'AED 295', img: 'https://image2url.com/r2/default/images/1773770086296-8ec9a49a-fca7-4a5c-8929-66200cba760e.jpg' }
    ],
    "The Main Course": [
      { name: 'Heirloom Dal Makhani', desc: 'Black lentils slow-cooked over wood fire for 36 hours, finished with churned white butter and truffle oil.', price: 'AED 85', img: 'https://image2url.com/r2/default/images/1773770014780-126cca91-0011-4b23-86c7-26c1e6c7c1b6.jpg' },
      { name: 'Dhaba Butter Chicken', desc: 'Our re-imagined highway classic. Pulled tandoori chicken in a velvety, smoked heirloom tomato gravy.', price: 'AED 110', img: 'https://image2url.com/r2/default/images/1773770053567-e878c456-1837-4987-8b4a-f582d464c8d2.jpg' },
      { name: 'Nalli Nihari', desc: 'Melt-in-the-mouth lamb shanks braised overnight in bone marrow and royal Awadhi spices.', price: 'AED 140', img: 'https://image2url.com/r2/default/images/1773770086296-8ec9a49a-fca7-4a5c-8929-66200cba760e.jpg' }
    ],
    "Artisan Breads": [
      { name: 'Truffle Garlic Naan', desc: 'Hand-stretched clay oven bread brushed with black truffle butter and roasted garlic.', price: 'AED 35', img: 'https://image2url.com/r2/default/images/1773770053567-e878c456-1837-4987-8b4a-f582d464c8d2.jpg' },
      { name: 'Chur Chur Paratha', desc: 'Crispy, flaky, crushed multi-layered bread served with a dollop of spiced butter.', price: 'AED 25', img: 'https://image2url.com/r2/default/images/1773770014780-126cca91-0011-4b23-86c7-26c1e6c7c1b6.jpg' }
    ],
    "Rustic Desserts": [
      { name: 'Sizzling Malpua & Rabdi', desc: 'Traditional Indian pancakes served on a hot sizzler platter, drowned in cold saffron rabdi.', price: 'AED 65', img: 'https://image2url.com/r2/default/images/1773770086296-8ec9a49a-fca7-4a5c-8929-66200cba760e.jpg' },
      { name: 'Smoked Jalebi Caviar', desc: 'Molecular jalebi spheres served over a bed of condensed milk foam with pistachio dust.', price: 'AED 75', img: 'https://image2url.com/r2/default/images/1773770014780-126cca91-0011-4b23-86c7-26c1e6c7c1b6.jpg' }
    ]
  };

  const galleryImages = [
    'https://image2url.com/r2/default/images/1773770014780-126cca91-0011-4b23-86c7-26c1e6c7c1b6.jpg', 
    'https://image2url.com/r2/default/images/1773770053567-e878c456-1837-4987-8b4a-f582d464c8d2.jpg', 
    'https://image2url.com/r2/default/images/1773770086296-8ec9a49a-fca7-4a5c-8929-66200cba760e.jpg', 
    'https://image2url.com/r2/default/images/1773770053567-e878c456-1837-4987-8b4a-f582d464c8d2.jpg', 
    'https://image2url.com/r2/default/images/1773770014780-126cca91-0011-4b23-86c7-26c1e6c7c1b6.jpg', 
    'https://image2url.com/r2/default/images/1773770086296-8ec9a49a-fca7-4a5c-8929-66200cba760e.jpg', 
  ];

  if (isLoading) {
    return (
      <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#0D0A08] bg-rustic">
        <div className="relative flex items-center justify-center mb-8">
           <Flame className="text-[#D9772F] w-12 h-12 animate-pulse opacity-0 animate-[fadeIn_1s_ease-out_0.5s_forwards]" />
           <div className="absolute w-32 h-32 bg-[#D9772F]/20 rounded-full blur-xl animate-pulse"></div>
        </div>
        <div className="text-center relative z-10">
          <h1 className="font-playfair text-3xl md:text-5xl text-[#C5A059] tracking-[0.2em] mb-3 opacity-0 animate-[fadeIn_1s_ease-out_1s_forwards]">DESI DHABA</h1>
          <div className="h-[1px] w-0 bg-gradient-to-r from-transparent via-[#D9772F] to-transparent mx-auto animate-[expand_1.5s_ease-out_1.5s_forwards]"></div>
          <p className="uppercase tracking-[0.4em] text-xs mt-4 text-[#F4ECE4]/60 opacity-0 animate-[fadeIn_1s_ease-out_2s_forwards]">Premium Dining • Bur Dubai</p>
          <style>{`
            @keyframes expand { to { w-full; max-width: 200px; width: 200px; } }
            @keyframes fadeIn { to { opacity: 1; } }
          `}</style>
        </div>
      </div>
    );
  }

  return (
    <div className="relative bg-[#0D0A08] bg-rustic min-h-screen text-[#F4ECE4] selection:bg-[#D9772F] selection:text-black">
      
      {/* Navigation */}
      <nav className={`fixed w-full z-50 transition-all duration-700 ${scrolled ? 'glass py-4' : 'bg-transparent py-6'}`}>
        <div className="container mx-auto px-6 md:px-12 flex justify-between items-center">
          <div className="flex flex-col">
            <a href="#" className="font-playfair text-2xl tracking-[0.15em] text-[#C5A059] font-semibold leading-none">
              DESI DHABA
            </a>
            <span className="font-playfair text-[0.65rem] tracking-[0.4em] text-[#F4ECE4]/60 mt-1 uppercase">Dubai</span>
          </div>
          
          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center space-x-12">
            {[
              { id: 'story', label: 'Our Story' },
              { id: 'signatures', label: 'Signatures' },
              { id: 'menu', label: 'The Menu' },
              { id: 'experience', label: 'Experience' }
            ].map((item) => (
              <a key={item.id} href={`#${item.id}`} className="text-xs uppercase tracking-[0.2em] text-[#F4ECE4]/80 hover:text-[#D9772F] transition-all duration-300 relative group">
                {item.label}
                <span className="absolute -bottom-2 left-0 w-0 h-[1px] bg-[#D9772F] transition-all duration-300 group-hover:w-full"></span>
              </a>
            ))}
            <a href="#book" className="px-8 py-3 bg-[#C5A059]/10 border border-[#C5A059] text-[#C5A059] text-xs uppercase tracking-widest hover:bg-[#C5A059] hover:text-[#0D0A08] transition-all duration-500 shadow-[0_0_15px_rgba(197,160,89,0.1)] hover:shadow-[0_0_25px_rgba(197,160,89,0.4)]">
              Book a Table
            </a>
          </div>

          {/* Mobile Nav Toggle */}
          <button className="lg:hidden text-[#C5A059]" onClick={() => setIsNavOpen(!isNavOpen)}>
            {isNavOpen ? <X size={28} /> : <MenuIcon size={28} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div className={`fixed inset-0 z-40 bg-gradient-to-b from-[#0D0A08] to-[#2A1810] flex flex-col items-center justify-center space-y-8 transition-all duration-500 ${isNavOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`}>
        {[
          { id: 'story', label: 'Our Story' },
          { id: 'signatures', label: 'Signatures' },
          { id: 'menu', label: 'The Menu' },
          { id: 'experience', label: 'Experience' }
        ].map((item) => (
          <a key={item.id} href={`#${item.id}`} onClick={() => setIsNavOpen(false)} className="font-playfair text-3xl text-[#F4ECE4] hover:text-[#D9772F] transition-colors">
            {item.label}
          </a>
        ))}
        <a href="#book" onClick={() => setIsNavOpen(false)} className="mt-8 px-10 py-4 bg-[#C5A059] text-[#0D0A08] font-medium tracking-widest uppercase text-sm">
          Book a Table
        </a>
      </div>

      {/* 1. Hero Section */}
      <section className="relative h-screen w-full flex items-center justify-center overflow-hidden">
        {/* Background Image Replace */}
        <div className="absolute inset-0 z-0">
          <img 
            src="https://image2url.com/r2/default/images/1773770014780-126cca91-0011-4b23-86c7-26c1e6c7c1b6.jpg" 
            alt="Cinematic Grill" 
            className="w-full h-full object-cover animate-kenburns opacity-50"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0D0A08]/90 via-[#2A1810]/60 to-[#0D0A08]"></div>
          
          {/* Subtle Smoke Effect */}
          <div className="absolute inset-0 opacity-40 mix-blend-screen pointer-events-none">
             <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#D9772F]/10 rounded-full blur-[100px] animate-smoke"></div>
             <div className="absolute bottom-1/4 right-1/4 w-[30rem] h-[30rem] bg-[#C5A059]/10 rounded-full blur-[120px] animate-smoke" style={{animationDelay: '2s'}}></div>
          </div>
        </div>

        <div className="relative z-10 text-center px-4 max-w-5xl mx-auto flex flex-col items-center mt-16">
          <RevealOnScroll delay={100}>
            <div className="flex items-center justify-center space-x-4 mb-6">
              <span className="w-16 h-[1px] bg-[#C5A059]"></span>
              <p className="uppercase tracking-[0.4em] text-[#C5A059] text-xs md:text-sm font-medium">Burdubai's Premier Destination</p>
              <span className="w-16 h-[1px] bg-[#C5A059]"></span>
            </div>
          </RevealOnScroll>
          <RevealOnScroll delay={300}>
            <h1 className="font-playfair text-5xl md:text-7xl lg:text-[5.5rem] text-white mb-6 leading-[1.1] drop-shadow-2xl">
              From the Streets of India <br/>
              <span className="gold-gradient-text text-glow italic">to the Heart of Dubai</span>
            </h1>
          </RevealOnScroll>
          <RevealOnScroll delay={500}>
            <p className="text-[#F4ECE4]/80 text-lg md:text-xl font-light max-w-2xl mx-auto mb-12 leading-relaxed">
              We have reimagined the rustic charm of a traditional Indian Dhaba into an ultra-luxury culinary journey. Experience heritage flavors elevated to absolute perfection.
            </p>
          </RevealOnScroll>
          <RevealOnScroll delay={700}>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <a href="#book" className="px-12 py-4 bg-gradient-to-r from-[#C5A059] to-[#D9772F] text-[#0D0A08] text-xs uppercase tracking-[0.2em] font-bold hover:scale-105 transition-all duration-500 shadow-[0_0_20px_rgba(217,119,47,0.4)]">
                Book Your Table
              </a>
              <a href="#menu" className="px-12 py-4 border border-[#C5A059]/50 text-[#C5A059] text-xs uppercase tracking-[0.2em] font-medium hover:border-[#D9772F] hover:text-[#D9772F] hover:bg-[#D9772F]/10 glass transition-all duration-500">
                Explore Menu
              </a>
            </div>
          </RevealOnScroll>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 animate-float">
          <div className="w-[1px] h-20 bg-gradient-to-b from-[#D9772F] to-transparent mx-auto"></div>
        </div>
      </section>

      {/* 2. About / Story Section */}
      <section id="story" className="py-24 md:py-32 relative bg-gradient-earth">
        <div className="container mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 lg:gap-24 items-center">
            <RevealOnScroll direction="right">
              <div className="relative group">
                <div className="absolute -inset-4 border border-[#C5A059]/30 translate-x-4 translate-y-4 rounded-sm transition-transform duration-700 group-hover:translate-x-2 group-hover:translate-y-2"></div>
                <img 
                  src="https://image2url.com/r2/default/images/1773770053567-e878c456-1837-4987-8b4a-f582d464c8d2.jpg" 
                  alt="Rustic Spices" 
                  className="relative z-10 w-full h-[650px] object-cover grayscale-[30%] hover:grayscale-0 transition-all duration-1000 rounded-sm shadow-2xl"
                />
                <div className="absolute bottom-12 -left-10 bg-[#0D0A08] p-8 border-l-4 border-[#D9772F] z-20 shadow-[0_20px_50px_rgba(0,0,0,0.8)]">
                  <p className="font-playfair text-3xl md:text-4xl text-[#C5A059] mb-2">Heritage</p>
                  <p className="text-xs uppercase tracking-widest text-[#F4ECE4]/70">Redefined in Dubai</p>
                </div>
              </div>
            </RevealOnScroll>
            
            <RevealOnScroll direction="left" delay={200}>
              <div className="max-w-xl pl-0 md:pl-6">
                <h3 className="uppercase tracking-[0.4em] text-[#D9772F] text-xs mb-4 flex items-center">
                  <span className="w-8 h-[1px] bg-[#D9772F] mr-4"></span> The Legend Lives
                </h3>
                <h2 className="font-playfair text-4xl md:text-5xl lg:text-6xl mb-8 leading-[1.1] text-white">
                  Nostalgia Meets <br/><span className="italic text-[#C5A059] text-glow">Modern Luxury</span>
                </h2>
                <p className="text-[#F4ECE4]/70 leading-relaxed font-light mb-6 text-base md:text-lg">
                  The Indian Highway Dhaba is an institution—a symbol of hearty, soulful food cooked over open flames. At Desi Dhaba Burdubai, we have taken this raw, emotional culinary heritage and wrapped it in unparalleled luxury.
                </p>
                <p className="text-[#F4ECE4]/70 leading-relaxed font-light mb-10 text-base md:text-lg">
                  Every dish tells a story of clay ovens, rustic wooden benches, and lantern-lit nights, now presented with the finesse and premium aesthetic of Dubai's high-end dining scene. Our food is authentic; our experience is elite.
                </p>
                <div className="flex items-center space-x-6 border-t border-[#C5A059]/20 pt-8">
                  <div className="w-16 h-16 rounded-full border border-[#D9772F]/50 flex items-center justify-center bg-[#D9772F]/10">
                    <Flame className="text-[#D9772F] w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-sm tracking-[0.1em] uppercase text-[#C5A059] font-medium">Wood-Fired Perfection</p>
                    <p className="text-xs tracking-widest text-[#F4ECE4]/50 mt-1">Slow-cooked authenticity</p>
                  </div>
                </div>
              </div>
            </RevealOnScroll>
          </div>
        </div>
      </section>

      {/* 3. Signature Dishes Highlight */}
      <section id="signatures" className="py-24 md:py-32 relative border-y border-[#C5A059]/10 bg-[#0D0A08]">
        <div className="lantern-glow absolute inset-0 opacity-40 pointer-events-none"></div>
        <div className="container mx-auto px-6 md:px-12 text-center relative z-10">
          <RevealOnScroll>
            <h3 className="uppercase tracking-[0.4em] text-[#D9772F] text-xs mb-4">The Crown Jewels</h3>
            <h2 className="font-playfair text-4xl md:text-5xl lg:text-6xl mb-6 text-white">Signature Masterpieces</h2>
            <div className="w-24 h-[1px] bg-[#C5A059] mx-auto mb-16"></div>
          </RevealOnScroll>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10">
            {[
              { title: "Dhaba Butter Chicken", desc: "Smoked tandoori chicken pulled into a rich, buttery heirloom tomato reduction.", img: "https://image2url.com/r2/default/images/1773770086296-8ec9a49a-fca7-4a5c-8929-66200cba760e.jpg" },
              { title: "36-Hour Dal Makhani", desc: "Our legendary black lentils simmered overnight over hot coals, finished with truffle oil.", img: "https://image2url.com/r2/default/images/1773770014780-126cca91-0011-4b23-86c7-26c1e6c7c1b6.jpg" },
              { title: "Smoked Lamb Chops", desc: "Premium cuts steeped in dark rum and rustic spices, served on a sizzling hot stone.", img: "https://image2url.com/r2/default/images/1773770053567-e878c456-1837-4987-8b4a-f582d464c8d2.jpg" }
            ].map((dish, idx) => (
              <RevealOnScroll key={idx} delay={idx * 200}>
                <div className="glass-card h-full flex flex-col group overflow-hidden rounded-t-full p-2 border border-[#C5A059]/20">
                  <div className="w-full h-64 rounded-t-full overflow-hidden relative">
                     <div className="absolute inset-0 bg-[#0D0A08]/30 group-hover:bg-transparent transition-all z-10"></div>
                     <img src={dish.img} alt={dish.title} className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-1000" />
                  </div>
                  <div className="p-8 text-center">
                    <h4 className="font-playfair text-2xl text-[#C5A059] mb-4 group-hover:text-[#D9772F] transition-colors">{dish.title}</h4>
                    <p className="text-[#F4ECE4]/60 font-light leading-relaxed text-sm">{dish.desc}</p>
                  </div>
                </div>
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Full Menu Section */}
      <section id="menu" className="py-24 md:py-32 relative overflow-hidden bg-gradient-to-b from-[#0D0A08] via-[#2A1810] to-[#0D0A08]">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#D9772F] rounded-full blur-[200px] opacity-[0.03]"></div>
        
        <div className="container mx-auto px-6 md:px-12 relative z-10">
          <div className="text-center mb-16">
            <RevealOnScroll>
              <h3 className="uppercase tracking-[0.4em] text-[#C5A059] text-xs mb-4">Culinary Excellence</h3>
              <h2 className="font-playfair text-4xl md:text-5xl lg:text-6xl mb-6 text-white">The Menu</h2>
              <div className="w-24 h-[1px] bg-[#C5A059] mx-auto"></div>
            </RevealOnScroll>
          </div>

          {/* Menu Categories */}
          <RevealOnScroll delay={200}>
            <div className="flex flex-wrap justify-center gap-6 md:gap-12 mb-20">
              {Object.keys(menuData).map((category) => (
                <button
                  key={category}
                  onClick={() => setActiveMenuTab(category)}
                  className={`text-xs md:text-sm uppercase tracking-[0.15em] pb-3 transition-all duration-300 border-b-2 ${
                    activeMenuTab === category ? 'border-[#D9772F] text-[#D9772F]' : 'border-transparent text-[#F4ECE4]/40 hover:text-[#F4ECE4]'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </RevealOnScroll>

          {/* Menu Items Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-12">
            {menuData[activeMenuTab].map((item, index) => (
              <RevealOnScroll key={index} delay={index * 150}>
                <div className="group flex flex-col sm:flex-row gap-8 items-center sm:items-start p-6 rounded-lg hover:bg-white/[0.02] border border-transparent hover:border-[#C5A059]/10 transition-all duration-500 cursor-pointer">
                  <div className="w-full sm:w-40 h-40 shrink-0 overflow-hidden rounded-md relative border border-[#C5A059]/30 shadow-lg">
                    <div className="absolute inset-0 bg-[#0D0A08]/40 group-hover:bg-transparent transition-all z-10"></div>
                    <img 
                      src={item.img} 
                      alt={item.name} 
                      className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-1000"
                    />
                  </div>
                  <div className="flex-1 w-full text-center sm:text-left mt-2 sm:mt-0">
                    <div className="flex flex-col sm:flex-row justify-between items-baseline mb-4 border-b border-[#C5A059]/20 pb-3">
                      <h4 className="font-playfair text-2xl text-white group-hover:text-[#D9772F] transition-colors">{item.name}</h4>
                      <span className="text-[#C5A059] font-medium tracking-widest mt-2 sm:mt-0 text-lg">{item.price}</span>
                    </div>
                    <p className="text-[#F4ECE4]/60 font-light text-sm md:text-base leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Experience Gallery Section */}
      <section id="experience" className="py-24 bg-[#0D0A08]">
        <div className="container mx-auto px-6 md:px-12">
           <RevealOnScroll>
            <div className="flex flex-col md:flex-row justify-between items-end mb-16">
              <div>
                <h3 className="uppercase tracking-[0.4em] text-[#D9772F] text-xs mb-4">Visual Aesthetics</h3>
                <h2 className="font-playfair text-4xl md:text-5xl lg:text-6xl text-white">The Atmosphere</h2>
              </div>
              <p className="text-[#F4ECE4]/60 max-w-sm font-light mt-6 md:mt-0 text-base">
                Immerse yourself in our premium setup featuring warm lantern lighting, dark wood textures, and elegant plating.
              </p>
            </div>
           </RevealOnScroll>

           {/* Masonry-style Grid */}
           <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[350px]">
             {galleryImages.map((src, idx) => (
               <RevealOnScroll key={idx} delay={idx * 150}>
                 <div 
                  className={`relative w-full h-full overflow-hidden group cursor-pointer border border-[#C5A059]/10 ${idx === 0 ? 'md:col-span-2 md:row-span-2' : ''} ${idx === 3 ? 'md:col-span-2' : ''}`}
                  onClick={() => setLightboxImg(src)}
                 >
                   <div className="absolute inset-0 bg-[#0D0A08]/50 group-hover:bg-[#2A1810]/20 transition-colors duration-700 z-10"></div>
                   <img 
                     src={src} 
                     alt="Gallery" 
                     className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-[1.5s]"
                     loading="lazy"
                   />
                   <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-700 z-20">
                     <span className="bg-[#0D0A08]/90 backdrop-blur-md text-[#C5A059] px-10 py-4 uppercase tracking-[0.2em] text-xs border border-[#C5A059]/50 shadow-[0_0_20px_rgba(197,160,89,0.2)]">Expand View</span>
                   </div>
                 </div>
               </RevealOnScroll>
             ))}
           </div>
        </div>
      </section>

      {/* Lightbox */}
      {lightboxImg && (
        <div className="fixed inset-0 z-[100] bg-[#0D0A08]/95 backdrop-blur-2xl flex items-center justify-center p-4" onClick={() => setLightboxImg(null)}>
          <button className="absolute top-10 right-10 text-white/50 hover:text-[#D9772F] transition-colors" onClick={() => setLightboxImg(null)}>
            <X size={44} strokeWidth={1}/>
          </button>
          <img src={lightboxImg} alt="Enlarged" className="max-w-full max-h-[90vh] object-contain shadow-2xl border border-[#C5A059]/30" />
        </div>
      )}

      {/* 6. Testimonials */}
      <section id="testimonials" className="py-24 md:py-32 relative border-y border-[#C5A059]/10 bg-gradient-to-t from-[#2A1810] to-transparent">
         <div className="container mx-auto px-6 md:px-12 text-center">
            <RevealOnScroll>
              <Quote className="w-14 h-14 text-[#D9772F]/40 mx-auto mb-8" />
              <h2 className="font-playfair text-4xl md:text-5xl text-white mb-20">Words of Praise</h2>
            </RevealOnScroll>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
              {[
                { name: "Alisha K.", role: "Culinary Editor", text: "They have completely transformed the idea of a Dhaba. The Butter Chicken is velvety perfection, and the ambiance screams luxury while keeping its soul intact." },
                { name: "Omar F.", role: "Global Gourmand", text: "The Truffle Garlic Naan and 36-hour Dal Makhani paired with their premium service make this the absolute best Indian dining experience in Bur Dubai." },
                { name: "Rajiv M.", role: "Food Critic", text: "Nostalgic flavors presented with Michelin-level finesse. The smoked lamb chops were a revelation. Desi Dhaba is a masterclass in high-end ethnic dining." }
              ].map((review, idx) => (
                <RevealOnScroll key={idx} delay={idx * 200}>
                  <div className="glass-card p-12 text-left h-full flex flex-col justify-between hover:-translate-y-3 transition-transform duration-500">
                    <div>
                      <div className="flex text-[#D9772F] mb-8 space-x-1">
                        {[...Array(5)].map((_, i) => <Star key={i} size={18} fill="currentColor" />)}
                      </div>
                      <p className="text-[#F4ECE4]/70 font-light leading-loose mb-10 text-lg">"{review.text}"</p>
                    </div>
                    <div className="border-t border-[#C5A059]/20 pt-6 flex items-center">
                      <div className="w-10 h-10 rounded-full bg-[#D9772F]/10 border border-[#D9772F]/30 flex items-center justify-center mr-4">
                        <span className="text-[#C5A059] font-playfair">{review.name.charAt(0)}</span>
                      </div>
                      <div>
                        <h4 className="font-playfair text-xl text-white">{review.name}</h4>
                        <p className="text-[#D9772F] text-[0.65rem] uppercase tracking-[0.2em] mt-1">{review.role}</p>
                      </div>
                    </div>
                  </div>
                </RevealOnScroll>
              ))}
            </div>
         </div>
      </section>

      {/* 8 & 7. Booking & Map Section */}
      <section id="book" className="py-0 flex flex-col md:flex-row bg-[#0D0A08]">
        
        {/* Reservation Form */}
        <div className="w-full md:w-1/2 p-8 md:p-24 flex items-center justify-center relative bg-gradient-to-r from-[#2A1810] to-transparent">
          <div className="w-full max-w-lg relative z-10">
            <RevealOnScroll>
              <h3 className="uppercase tracking-[0.4em] text-[#D9772F] text-xs mb-4">Reservations</h3>
              <h2 className="font-playfair text-4xl md:text-5xl lg:text-6xl mb-8 text-white">Book Your Experience</h2>
              <p className="text-[#F4ECE4]/50 font-light mb-12 text-sm leading-relaxed">Ensure your table is prepared for a night of indulgence. For VIP setups, please use the instant chat feature.</p>
            </RevealOnScroll>

            <RevealOnScroll delay={200}>
              <form onSubmit={handleBookTable} className="space-y-10">
                <div className="group relative">
                  <input type="text" required value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} placeholder="Full Name" className="w-full bg-transparent border-b border-[#C5A059]/30 pb-4 text-white focus:outline-none focus:border-[#D9772F] transition-colors font-light placeholder-[#F4ECE4]/30 text-lg" />
                </div>
                <div className="group relative">
                  <input type="tel" required value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})} placeholder="Phone Number" className="w-full bg-transparent border-b border-[#C5A059]/30 pb-4 text-white focus:outline-none focus:border-[#D9772F] transition-colors font-light placeholder-[#F4ECE4]/30 text-lg" />
                </div>
                <div className="grid grid-cols-2 gap-10">
                  <div className="group relative">
                    <select value={formData.guests} onChange={(e) => setFormData({...formData, guests: e.target.value})} className="w-full bg-transparent border-b border-[#C5A059]/30 pb-4 text-white focus:outline-none focus:border-[#D9772F] transition-colors font-light appearance-none cursor-pointer text-lg">
                      <option value="1" className="bg-[#0D0A08] text-white">1 Guest</option>
                      <option value="2" className="bg-[#0D0A08] text-white">2 Guests</option>
                      <option value="3" className="bg-[#0D0A08] text-white">3 Guests</option>
                      <option value="4" className="bg-[#0D0A08] text-white">4 Guests</option>
                      <option value="5" className="bg-[#0D0A08] text-white">5 Guests</option>
                      <option value="6" className="bg-[#0D0A08] text-white">6+ Guests</option>
                    </select>
                  </div>
                  <div className="group relative">
                    <input type="date" required value={formData.date} onChange={(e) => setFormData({...formData, date: e.target.value})} className="w-full bg-transparent border-b border-[#C5A059]/30 pb-4 text-[#F4ECE4]/80 focus:outline-none focus:border-[#D9772F] transition-colors font-light [color-scheme:dark] text-lg" />
                  </div>
                </div>
                <div className="group relative">
                  <input type="time" required value={formData.time} onChange={(e) => setFormData({...formData, time: e.target.value})} className="w-full bg-transparent border-b border-[#C5A059]/30 pb-4 text-[#F4ECE4]/80 focus:outline-none focus:border-[#D9772F] transition-colors font-light [color-scheme:dark] text-lg" />
                </div>
                <button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="w-full mt-12 py-6 bg-gradient-to-r from-[#C5A059] to-[#D9772F] text-[#0D0A08] uppercase tracking-[0.2em] font-bold hover:from-[#F4ECE4] hover:to-[#F4ECE4] transition-all duration-500 disabled:opacity-70 flex justify-center items-center group shadow-[0_0_20px_rgba(217,119,47,0.3)] hover:shadow-[0_0_30px_rgba(217,119,47,0.6)]"
                >
                  {isSubmitting ? 'Confirming Reservation...' : 'Complete Booking'}
                  {!isSubmitting && <ChevronRight className="ml-3 w-5 h-5 transform group-hover:translate-x-2 transition-transform"/>}
                </button>
              </form>
            </RevealOnScroll>
          </div>
        </div>

        {/* 7. Google Map Integration */}
        <div className="w-full md:w-1/2 h-[600px] md:h-auto relative grayscale-[50%] hover:grayscale-0 transition-all duration-1000 border-l border-[#C5A059]/10">
           {/* Exact Location: Bur Dubai area */}
           <iframe 
             src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14434.908070929283!2d55.281898150000005!3d25.253818300000004!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f4337bc1df43d%3A0xc6c76db3642ba5!2sBur%20Dubai%20-%20Dubai!5e0!3m2!1sen!2sae!4v1710000000000!5m2!1sen!2sae" 
             className="w-full h-full border-0 map-dark" 
             allowFullScreen="" 
             loading="lazy" 
             referrerPolicy="no-referrer-when-downgrade"
             title="Desi Dhaba Location"
           ></iframe>
           <div className="absolute inset-0 bg-[#0D0A08]/30 pointer-events-none"></div>
        </div>

      </section>

      {/* 10. Footer */}
      <footer className="bg-[#080605] pt-24 pb-12 border-t border-[#C5A059]/20 relative overflow-hidden bg-rustic">
        {/* Decorative corner accents */}
        <div className="absolute top-0 left-0 w-40 h-40 border-t-2 border-l-2 border-[#C5A059]/10 opacity-50 rounded-tl-3xl"></div>
        <div className="absolute top-0 right-0 w-40 h-40 border-t-2 border-r-2 border-[#C5A059]/10 opacity-50 rounded-tr-3xl"></div>

        <div className="container mx-auto px-6 md:px-12 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 lg:gap-16 mb-20">
            <div className="md:col-span-1">
              <h2 className="font-playfair text-3xl text-[#C5A059] tracking-[0.15em] mb-2 leading-none">DESI DHABA</h2>
              <p className="font-playfair text-sm text-[#F4ECE4]/70 tracking-[0.4em] mb-8 uppercase">Dubai</p>
              <p className="text-[#F4ECE4]/50 font-light text-sm leading-relaxed mb-8">
                Elevating the vibrant street food and rustic dhaba culture of India into an elite culinary destination in Bur Dubai.
              </p>
              <div className="flex space-x-6 text-[#C5A059]">
                <a href="#" className="hover:text-white transition-colors hover:scale-110 transform duration-300"><Instagram size={22} /></a>
                <a href="#" className="hover:text-white transition-colors hover:scale-110 transform duration-300"><Facebook size={22} /></a>
              </div>
            </div>
            
            <div>
              <h4 className="text-white uppercase tracking-[0.2em] text-xs mb-8 font-medium">Contact & Location</h4>
              <ul className="space-y-6 text-[#F4ECE4]/60 font-light text-sm">
                <li className="flex items-center"><Phone size={18} className="mr-4 text-[#D9772F]"/> +971 55 632 7277</li>
                <li className="flex items-start">
                  <MapPin size={18} className="mr-4 mt-1 shrink-0 text-[#D9772F]"/> 
                  Bur Dubai,<br/>Dubai,<br/>United Arab Emirates
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-white uppercase tracking-[0.2em] text-xs mb-8 font-medium">Opening Hours</h4>
              <ul className="space-y-6 text-[#F4ECE4]/60 font-light text-sm">
                <li className="flex items-start"><Clock size={18} className="mr-4 mt-1 shrink-0 text-[#D9772F]"/> 
                  <div>
                    <span className="block text-white mb-1">Lunch Service</span>
                    12:30 PM - 03:30 PM<br/><br/>
                    <span className="block text-white mb-1">Dinner Service</span>
                    07:00 PM - 01:00 AM
                  </div>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-white uppercase tracking-[0.2em] text-xs mb-8 font-medium">The VIP List</h4>
              <p className="text-[#F4ECE4]/60 font-light text-sm mb-6 leading-relaxed">Join our mailing list for private culinary events and exclusive chef's tables.</p>
              <div className="flex border-b border-[#C5A059]/40 pb-3 group">
                <input type="email" placeholder="Email Address" className="bg-transparent w-full focus:outline-none text-sm font-light text-white placeholder-[#F4ECE4]/30" />
                <button className="text-[#D9772F] group-hover:text-white transition-colors"><ChevronRight size={22}/></button>
              </div>
            </div>
          </div>

          <div className="border-t border-[#C5A059]/10 pt-10 flex flex-col md:flex-row justify-between items-center text-xs text-[#F4ECE4]/40 tracking-[0.15em] uppercase">
            <p>&copy; {new Date().getFullYear()} Desi Dhaba Restaurant. All rights reserved.</p>
            <div className="flex space-x-8 mt-6 md:mt-0">
              <a href="#" className="hover:text-[#D9772F] transition-colors">Privacy</a>
              <a href="#" className="hover:text-[#D9772F] transition-colors">Terms</a>
            </div>
          </div>
        </div>
      </footer>

      {/* 9. Floating WhatsApp Button */}
      <a 
        href="https://wa.me/971556327277?text=Hello%20Desi%20Dhaba%2C%20I%20would%20like%20to%20book%20a%20table%20for%20a%20premium%20dining%20experience." 
        target="_blank" 
        rel="noopener noreferrer"
        className="fixed bottom-10 right-10 z-[90] bg-[#25D366] text-white p-4 rounded-full shadow-[0_0_25px_rgba(37,211,102,0.4)] hover:scale-110 transition-transform duration-300 animate-bounce group"
      >
        <MessageCircle size={32} />
        <span className="absolute right-full mr-6 top-1/2 -translate-y-1/2 bg-[#0D0A08]/95 backdrop-blur-xl border border-[#C5A059]/30 text-[#F4ECE4] text-xs uppercase tracking-widest whitespace-nowrap px-6 py-3 rounded shadow-2xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
          Instant Concierge
        </span>
      </a>

    </div>
  );
}