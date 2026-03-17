import React, { useState, useEffect, useRef } from 'react';
import { 
  Menu as MenuIcon, X, MapPin, Phone, Clock, ChevronRight, 
  Star, Quote, Instagram, Facebook, MessageCircle, Droplet, Anchor
} from 'lucide-react';

// --- STYLES INJECTION ---
const customStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;1,400&family=Montserrat:wght@300;400;500;600&display=swap');

  :root {
    --bg-dark: #02040A; /* Midnight Black */
    --blue-royal: #061124; /* Deep Royal Blue Base */
    --blue-accent: #0F326E; /* Bright Royal Blue */
    --blue-glow: #1A56B5; /* Ocean Depth Glow */
    --silver: #C2CEDA; /* Silver Accents */
    --white-soft: #F0F4F8; /* Soft White */
  }

  body {
    background-color: var(--bg-dark);
    color: var(--white-soft);
    font-family: 'Montserrat', sans-serif;
    overflow-x: hidden;
    scroll-behavior: smooth;
  }

  /* Custom Scrollbar */
  ::-webkit-scrollbar {
    width: 4px;
  }
  ::-webkit-scrollbar-track {
    background: var(--bg-dark);
  }
  ::-webkit-scrollbar-thumb {
    background: var(--blue-accent);
    border-radius: 10px;
  }
  ::-webkit-scrollbar-thumb:hover {
    background: var(--silver);
  }

  .font-playfair {
    font-family: 'Playfair Display', serif;
  }

  /* Ocean Depth Overlays */
  .bg-ocean-depth {
    background: radial-gradient(circle at 50% 0%, var(--blue-royal) 0%, var(--bg-dark) 80%);
  }

  /* Animations */
  @keyframes kenburns {
    0% { transform: scale(1); }
    100% { transform: scale(1.12); }
  }
  .animate-kenburns {
    animation: kenburns 40s ease-in-out infinite alternate;
  }

  @keyframes wave-drift {
    0% { transform: translateY(0) scale(1) opacity(0); }
    50% { transform: translateY(-20px) scale(1.1) opacity(0.3); }
    100% { transform: translateY(-40px) scale(0.9) opacity(0); }
  }
  .animate-wave {
    animation: wave-drift 8s ease-in-out infinite;
  }

  /* Glassmorphism & Luxury Utilities */
  .glass {
    background: rgba(2, 4, 10, 0.7);
    backdrop-filter: blur(24px);
    -webkit-backdrop-filter: blur(24px);
    border-bottom: 1px solid rgba(194, 206, 218, 0.05);
  }

  .glass-card {
    background: linear-gradient(145deg, rgba(15, 50, 110, 0.15) 0%, rgba(2, 4, 10, 0.8) 100%);
    backdrop-filter: blur(16px);
    border: 1px solid rgba(194, 206, 218, 0.1);
    box-shadow: 0 10px 40px 0 rgba(0, 0, 0, 0.9);
    transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
  }
  
  .glass-card:hover {
    border-color: rgba(26, 86, 181, 0.4); /* Blue glow on hover */
    box-shadow: 0 20px 50px 0 rgba(26, 86, 181, 0.15);
    transform: translateY(-8px);
  }

  .silver-gradient-text {
    background: linear-gradient(to right, #ffffff, #C2CEDA, #8598AA, #C2CEDA, #ffffff);
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
    background-size: 200% auto;
    animation: shine 8s linear infinite;
  }

  @keyframes shine {
    to { background-position: 200% center; }
  }

  .text-glow {
    text-shadow: 0 0 40px rgba(26, 86, 181, 0.5);
  }

  /* Deep Blue Dark Map */
  .map-dark {
    filter: invert(100%) hue-rotate(210deg) brightness(85%) contrast(120%) sepia(30%);
  }

  .ocean-glow {
    background: radial-gradient(circle, rgba(26,86,181,0.08) 0%, rgba(0,0,0,0) 60%);
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
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
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
  const [activeMenuTab, setActiveMenuTab] = useState('Seafood');
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
    setTimeout(() => setIsLoading(false), 3800);

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
      const phone = "971586785717";
      const message = `*Exclusive Reservation - The Blue Carte* 🌊\n\n*Name:* ${formData.name}\n*Contact:* ${formData.phone}\n*Guests:* ${formData.guests}\n*Date:* ${formData.date}\n*Time:* ${formData.time}\n\nI would like to request a table for a premium dining experience.`;
      const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
      window.open(url, "_blank");
      setIsSubmitting(false);
      
      setFormData({name: '', phone: '', guests: '2', date: '', time: ''});
    }, 1200);
  };

  // --- MENU DATA ---
  const menuData = {
    "Starters": [
      { name: 'Bluefin Tuna Tartare', desc: 'Avocado emulsion, black truffle ponzu, and sterling caviar on a delicate squid ink crisp.', price: 'AED 165', img: 'https://image2url.com/r2/default/images/1773770014780-126cca91-0011-4b23-86c7-26c1e6c7c1b6.jpg' },
      { name: 'Wagyu Beef Carpaccio', desc: 'Grade A5 Wagyu, shaved white truffle, aged parmesan, and cold-pressed olive oil.', price: 'AED 185', img: 'https://image2url.com/r2/default/images/1773770053567-e878c456-1837-4987-8b4a-f582d464c8d2.jpg' },
      { name: 'Oysters on the Half Shell', desc: 'Fine de Claire oysters, champagne mignonette, and fresh lemon pearls.', price: 'AED 220', img: 'https://image2url.com/r2/default/images/1773770086296-8ec9a49a-fca7-4a5c-8929-66200cba760e.jpg' }
    ],
    "Seafood": [
      { name: 'Deep Ocean Lobster', desc: 'Gently poached Atlantic lobster tail resting in a rich vanilla butter bisque with wild asparagus.', price: 'AED 340', img: 'https://image2url.com/r2/default/images/1773770014780-126cca91-0011-4b23-86c7-26c1e6c7c1b6.jpg' },
      { name: 'Pan-Seared Chilean Sea Bass', desc: 'Served over saffron risotto, wilted samphire, and a delicate white wine foam.', price: 'AED 280', img: 'https://image2url.com/r2/default/images/1773770053567-e878c456-1837-4987-8b4a-f582d464c8d2.jpg' }
    ],
    "Main Course": [
      { name: 'The Blue Carte Filet Mignon', desc: '250g Black Angus beef, pommes purée, roasted bone marrow, finished with a rich bordelaise jus.', price: 'AED 310', img: 'https://image2url.com/r2/default/images/1773770086296-8ec9a49a-fca7-4a5c-8929-66200cba760e.jpg' },
      { name: 'Truffle & Gold Risotto', desc: 'Acquerello rice, wild forest mushrooms, 24-month Parmigiano-Reggiano, and 24K gold leaf.', price: 'AED 240', img: 'https://image2url.com/r2/default/images/1773770014780-126cca91-0011-4b23-86c7-26c1e6c7c1b6.jpg' }
    ],
    "Desserts": [
      { name: 'Ocean Pearl Sphere', desc: 'White chocolate dome hiding a core of Tahitian vanilla mousse and passionfruit coulis.', price: 'AED 110', img: 'https://image2url.com/r2/default/images/1773770053567-e878c456-1837-4987-8b4a-f582d464c8d2.jpg' },
      { name: 'Midnight Lava Cake', desc: 'Dark Valrhona chocolate, sea salt caramel center, served with clotted cream ice cream.', price: 'AED 95', img: 'https://image2url.com/r2/default/images/1773770086296-8ec9a49a-fca7-4a5c-8929-66200cba760e.jpg' }
    ],
    "Beverages": [
      { name: 'The Abyssal Blue Signature', desc: 'A theatrical dry-ice presentation featuring blue curacao, elderflower, and edible silver dust.', price: 'AED 85', img: 'https://image2url.com/r2/default/images/1773770014780-126cca91-0011-4b23-86c7-26c1e6c7c1b6.jpg' },
      { name: 'Smoked Oak Old Fashioned', desc: 'Premium aged bourbon, Madagascar vanilla bitters, smoked tableside with oak wood.', price: 'AED 95', img: 'https://image2url.com/r2/default/images/1773770053567-e878c456-1837-4987-8b4a-f582d464c8d2.jpg' }
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
      <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#02040A] bg-ocean-depth">
        <div className="relative flex items-center justify-center mb-10">
           <div className="absolute w-40 h-40 border-t border-b border-[#1A56B5] rounded-full animate-[spin_4s_linear_infinite] opacity-50"></div>
           <div className="absolute w-32 h-32 border-r border-l border-[#C2CEDA] rounded-full animate-[spin_3s_linear_infinite_reverse] opacity-30"></div>
           <div className="absolute w-24 h-24 bg-[#0F326E]/40 rounded-full blur-xl animate-pulse"></div>
        </div>
        <div className="text-center relative z-10">
          <h1 className="font-playfair text-3xl md:text-5xl text-[#ffffff] tracking-[0.3em] mb-4 opacity-0 animate-[fadeIn_1s_ease-out_1s_forwards] font-light">
            THE BLUE CARTE
          </h1>
          <div className="h-[1px] w-0 bg-gradient-to-r from-transparent via-[#1A56B5] to-transparent mx-auto animate-[expand_1.5s_ease-out_1.5s_forwards]"></div>
          <p className="uppercase tracking-[0.5em] text-[0.65rem] mt-5 text-[#C2CEDA]/70 opacity-0 animate-[fadeIn_1s_ease-out_2s_forwards]">Fine Dining • Dubai</p>
          <style>{`
            @keyframes expand { to { w-full; max-width: 200px; width: 200px; } }
            @keyframes fadeIn { to { opacity: 1; } }
          `}</style>
        </div>
      </div>
    );
  }

  return (
    <div className="relative bg-[#02040A] min-h-screen text-[#F0F4F8] selection:bg-[#1A56B5] selection:text-white">
      
      {/* Navigation */}
      <nav className={`fixed w-full z-50 transition-all duration-700 ${scrolled ? 'glass py-5' : 'bg-transparent py-8'}`}>
        <div className="container mx-auto px-6 md:px-14 flex justify-between items-center">
          <div className="flex flex-col">
            <a href="#" className="font-playfair text-xl md:text-2xl tracking-[0.25em] text-white font-light leading-none">
              THE BLUE CARTE
            </a>
          </div>
          
          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center space-x-12">
            {[
              { id: 'story', label: 'Our Story' },
              { id: 'signatures', label: 'Chef Specials' },
              { id: 'menu', label: 'Menu' },
              { id: 'gallery', label: 'Atmosphere' }
            ].map((item) => (
              <a key={item.id} href={`#${item.id}`} className="text-xs uppercase tracking-[0.2em] text-[#C2CEDA] hover:text-white transition-all duration-300 relative group font-light">
                {item.label}
                <span className="absolute -bottom-2 left-1/2 w-0 h-[1px] bg-[#1A56B5] transition-all duration-300 group-hover:w-full group-hover:left-0"></span>
              </a>
            ))}
            <a href="#book" className="px-8 py-3 bg-transparent border border-[#C2CEDA]/40 text-[#C2CEDA] text-xs uppercase tracking-widest hover:bg-[#1A56B5] hover:border-[#1A56B5] hover:text-white transition-all duration-500 shadow-[0_0_15px_rgba(26,86,181,0)] hover:shadow-[0_0_25px_rgba(26,86,181,0.4)] font-medium">
              Reserve a Table
            </a>
          </div>

          {/* Mobile Nav Toggle */}
          <button className="lg:hidden text-[#C2CEDA]" onClick={() => setIsNavOpen(!isNavOpen)}>
            {isNavOpen ? <X size={28} strokeWidth={1} /> : <MenuIcon size={28} strokeWidth={1} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div className={`fixed inset-0 z-40 bg-gradient-to-b from-[#02040A] to-[#061124] flex flex-col items-center justify-center space-y-10 transition-all duration-700 ${isNavOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`}>
        {[
          { id: 'story', label: 'Our Story' },
          { id: 'signatures', label: 'Chef Specials' },
          { id: 'menu', label: 'Menu' },
          { id: 'gallery', label: 'Atmosphere' }
        ].map((item) => (
          <a key={item.id} href={`#${item.id}`} onClick={() => setIsNavOpen(false)} className="font-playfair text-3xl text-white hover:text-[#1A56B5] transition-colors font-light">
            {item.label}
          </a>
        ))}
        <a href="#book" onClick={() => setIsNavOpen(false)} className="mt-8 px-12 py-4 bg-[#1A56B5] text-white font-medium tracking-[0.2em] uppercase text-xs">
          Reserve a Table
        </a>
      </div>

      {/* 1. Hero Section */}
      <section className="relative h-screen w-full flex items-center justify-center overflow-hidden">
        {/* Cinematic Background */}
        <div className="absolute inset-0 z-0">
          <img 
            src="https://image2url.com/r2/default/images/1773770014780-126cca91-0011-4b23-86c7-26c1e6c7c1b6.jpg" 
            alt="Fine Dining Experience" 
            className="w-full h-full object-cover animate-kenburns opacity-50"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#02040A]/90 via-[#061124]/60 to-[#02040A]"></div>
          
          {/* Soft Blue Glow Effect */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none mix-blend-screen">
             <div className="absolute top-1/4 right-1/4 w-[40rem] h-[40rem] bg-[#0F326E]/20 rounded-full blur-[120px]"></div>
             <div className="absolute bottom-1/4 left-1/4 w-[30rem] h-[30rem] bg-[#1A56B5]/10 rounded-full blur-[150px] animate-wave"></div>
          </div>
        </div>

        <div className="relative z-10 text-center px-4 max-w-5xl mx-auto flex flex-col items-center mt-16">
          <RevealOnScroll delay={100}>
            <p className="uppercase tracking-[0.5em] text-[#C2CEDA] text-[0.65rem] md:text-xs font-medium mb-6">Dubai, United Arab Emirates</p>
          </RevealOnScroll>
          <RevealOnScroll delay={300}>
            <h1 className="font-playfair text-5xl md:text-7xl lg:text-[6.5rem] text-white mb-6 leading-[1.1] font-light">
              A New Standard of <br/>
              <span className="silver-gradient-text text-glow italic font-medium">Fine Dining</span>
            </h1>
          </RevealOnScroll>
          <RevealOnScroll delay={500}>
            <p className="text-[#C2CEDA]/80 text-base md:text-lg font-light max-w-2xl mx-auto mb-14 leading-relaxed">
              Immerse yourself in a world where the enigmatic depth of the ocean meets unparalleled culinary sophistication and exclusivity.
            </p>
          </RevealOnScroll>
          <RevealOnScroll delay={700}>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <a href="#book" className="px-12 py-4 bg-[#1A56B5] text-white text-xs uppercase tracking-[0.2em] font-medium hover:bg-white hover:text-[#02040A] transition-all duration-500 shadow-[0_0_20px_rgba(26,86,181,0.3)] hover:shadow-[0_0_30px_rgba(255,255,255,0.2)]">
                Reserve Your Table
              </a>
              <a href="#menu" className="px-12 py-4 border border-[#C2CEDA]/30 text-white text-xs uppercase tracking-[0.2em] font-medium hover:border-white glass transition-all duration-500">
                Explore Menu
              </a>
            </div>
          </RevealOnScroll>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 z-10 animate-pulse">
          <div className="w-[1px] h-16 bg-gradient-to-b from-[#C2CEDA] to-transparent mx-auto opacity-50"></div>
        </div>
      </section>

      {/* 2. About / Story Section */}
      <section id="story" className="py-24 md:py-32 relative bg-ocean-depth">
        <div className="container mx-auto px-6 md:px-14">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 lg:gap-24 items-center">
            <RevealOnScroll direction="right">
              <div className="relative group">
                <div className="absolute -inset-1 border border-[#1A56B5]/20 translate-x-4 translate-y-4 transition-transform duration-700 group-hover:translate-x-2 group-hover:translate-y-2"></div>
                <img 
                  src="https://image2url.com/r2/default/images/1773770053567-e878c456-1837-4987-8b4a-f582d464c8d2.jpg" 
                  alt="Elegant Ambience" 
                  className="relative z-10 w-full h-[700px] object-cover grayscale-[30%] hover:grayscale-0 transition-all duration-1000 shadow-[0_20px_50px_rgba(0,0,0,0.6)]"
                />
                <div className="absolute bottom-12 -right-8 bg-[#02040A]/90 backdrop-blur-md p-10 border border-[#C2CEDA]/10 z-20 shadow-2xl hidden md:block">
                  <p className="font-playfair text-4xl text-white mb-2">Exclusivity</p>
                  <p className="text-[0.65rem] uppercase tracking-[0.3em] text-[#C2CEDA]/70">Redefined</p>
                </div>
              </div>
            </RevealOnScroll>
            
            <RevealOnScroll direction="left" delay={200}>
              <div className="max-w-xl pl-0 md:pl-8">
                <h3 className="uppercase tracking-[0.3em] text-[#C2CEDA] text-[0.65rem] mb-6 flex items-center font-medium">
                  <span className="w-10 h-[1px] bg-[#1A56B5] mr-4"></span> Our Philosophy
                </h3>
                <h2 className="font-playfair text-4xl md:text-5xl lg:text-6xl mb-10 leading-[1.2] text-white font-light">
                  An Ode to the <br/><span className="italic text-[#C2CEDA]">Deep Ocean</span>
                </h2>
                <p className="text-[#C2CEDA]/70 leading-relaxed font-light mb-6 text-sm md:text-base">
                  The Blue Carte was born from a desire to combine the tranquil, mysterious allure of the ocean with the precision of European fine dining. Every detail, from the ambient midnight lighting to the silver-accented plating, is designed to transport you.
                </p>
                <p className="text-[#C2CEDA]/70 leading-relaxed font-light mb-12 text-sm md:text-base">
                  Our ingredients are globally sourced with an uncompromising demand for excellence. We cater to the discerning palate, offering an intimate, highly exclusive sanctuary away from the vibrant rush of Dubai.
                </p>
                <div className="flex items-center space-x-6 border-t border-[#C2CEDA]/10 pt-10">
                  <div className="w-16 h-16 rounded-full border border-[#1A56B5]/30 flex items-center justify-center">
                    <span className="font-playfair italic text-xl text-white">BC</span>
                  </div>
                  <div>
                    <p className="text-xs tracking-[0.2em] uppercase text-white font-medium">Master Culinary Arts</p>
                    <p className="text-[0.65rem] tracking-widest text-[#C2CEDA]/50 mt-1">Est. Dubai</p>
                  </div>
                </div>
              </div>
            </RevealOnScroll>
          </div>
        </div>
      </section>

      {/* 3. Signature Dishes Highlight */}
      <section id="signatures" className="py-24 md:py-32 relative border-y border-[#C2CEDA]/5 bg-[#02040A]">
        <div className="ocean-glow absolute inset-0 opacity-40 pointer-events-none"></div>
        <div className="container mx-auto px-6 md:px-14 text-center relative z-10">
          <RevealOnScroll>
            <h3 className="uppercase tracking-[0.3em] text-[#C2CEDA] text-[0.65rem] mb-4 font-medium">The Chef's Canvas</h3>
            <h2 className="font-playfair text-4xl md:text-5xl lg:text-6xl mb-6 text-white font-light">Signature Selection</h2>
            <div className="w-16 h-[1px] bg-[#1A56B5] mx-auto mb-20"></div>
          </RevealOnScroll>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
            {[
              { title: "Bluefin Tuna Tartare", desc: "Avocado emulsion, black truffle ponzu, and sterling caviar on a delicate squid ink crisp.", img: "https://image2url.com/r2/default/images/1773770086296-8ec9a49a-fca7-4a5c-8929-66200cba760e.jpg" },
              { title: "Deep Ocean Lobster", desc: "Gently poached Atlantic lobster tail resting in a rich vanilla butter bisque with wild asparagus.", img: "https://image2url.com/r2/default/images/1773770014780-126cca91-0011-4b23-86c7-26c1e6c7c1b6.jpg" },
              { title: "The Blue Carte Filet", desc: "250g Black Angus beef, pommes purée, roasted bone marrow, finished with a rich bordelaise jus.", img: "https://image2url.com/r2/default/images/1773770053567-e878c456-1837-4987-8b4a-f582d464c8d2.jpg" }
            ].map((dish, idx) => (
              <RevealOnScroll key={idx} delay={idx * 200}>
                <div className="glass-card h-full flex flex-col group overflow-hidden p-3 border border-[#C2CEDA]/10 rounded-sm">
                  <div className="w-full h-72 overflow-hidden relative rounded-sm">
                     <div className="absolute inset-0 bg-[#0F326E]/20 group-hover:bg-transparent transition-all duration-700 z-10 mix-blend-overlay"></div>
                     <img src={dish.img} alt={dish.title} className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-1000 grayscale-[10%]" />
                  </div>
                  <div className="p-8 text-center flex-grow flex flex-col justify-center">
                    <h4 className="font-playfair text-2xl text-white mb-4 group-hover:text-[#C2CEDA] transition-colors font-light">{dish.title}</h4>
                    <p className="text-[#C2CEDA]/60 font-light leading-relaxed text-sm">{dish.desc}</p>
                  </div>
                </div>
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Full Menu Section */}
      <section id="menu" className="py-24 md:py-32 relative overflow-hidden bg-gradient-to-b from-[#02040A] via-[#061124] to-[#02040A]">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#0F326E] rounded-full blur-[250px] opacity-[0.08] pointer-events-none"></div>
        
        <div className="container mx-auto px-6 md:px-14 relative z-10">
          <div className="text-center mb-16">
            <RevealOnScroll>
              <h3 className="uppercase tracking-[0.3em] text-[#C2CEDA] text-[0.65rem] mb-4 font-medium">A Symphony of Taste</h3>
              <h2 className="font-playfair text-4xl md:text-5xl lg:text-6xl mb-6 text-white font-light">The Menu</h2>
              <div className="w-16 h-[1px] bg-[#1A56B5] mx-auto"></div>
            </RevealOnScroll>
          </div>

          {/* Menu Categories */}
          <RevealOnScroll delay={200}>
            <div className="flex flex-wrap justify-center gap-8 md:gap-14 mb-24">
              {Object.keys(menuData).map((category) => (
                <button
                  key={category}
                  onClick={() => setActiveMenuTab(category)}
                  className={`text-[0.65rem] md:text-xs uppercase tracking-[0.25em] pb-3 transition-all duration-500 border-b relative font-medium ${
                    activeMenuTab === category ? 'border-[#1A56B5] text-white' : 'border-transparent text-[#C2CEDA]/50 hover:text-[#C2CEDA]'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </RevealOnScroll>

          {/* Menu Items Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-20 gap-y-16 max-w-6xl mx-auto">
            {menuData[activeMenuTab].map((item, index) => (
              <RevealOnScroll key={index} delay={index * 150}>
                <div className="group flex flex-col gap-4 border-b border-[#C2CEDA]/10 pb-6 hover:border-[#1A56B5]/50 transition-colors duration-500 cursor-pointer">
                  <div className="flex justify-between items-baseline">
                    <h4 className="font-playfair text-xl md:text-2xl text-white group-hover:text-[#C2CEDA] transition-colors font-light">{item.name}</h4>
                    <span className="text-white font-medium tracking-widest text-sm border-b border-[#1A56B5] pb-1">{item.price}</span>
                  </div>
                  <p className="text-[#C2CEDA]/60 font-light text-sm leading-relaxed max-w-md">{item.desc}</p>
                </div>
              </RevealOnScroll>
            ))}
          </div>
          
          <div className="mt-24 text-center">
             <RevealOnScroll>
               <a href="#book" className="inline-flex items-center text-[#C2CEDA] text-xs uppercase tracking-[0.2em] hover:text-white transition-colors group font-light">
                 <span className="border-b border-transparent group-hover:border-white pb-1 transition-all">Download Full Wine List</span>
                 <ChevronRight className="ml-2 w-4 h-4 transform group-hover:translate-x-2 transition-transform"/>
               </a>
             </RevealOnScroll>
          </div>
        </div>
      </section>

      {/* 5. Royal Gallery Section */}
      <section id="gallery" className="py-24 md:py-32 bg-[#02040A]">
        <div className="container mx-auto px-6 md:px-14">
           <RevealOnScroll>
            <div className="flex flex-col md:flex-row justify-between items-end mb-20 border-b border-[#C2CEDA]/10 pb-10">
              <div>
                <h3 className="uppercase tracking-[0.3em] text-[#C2CEDA] text-[0.65rem] mb-4 font-medium">Visual Aesthetics</h3>
                <h2 className="font-playfair text-4xl md:text-5xl lg:text-6xl text-white font-light">The Atmosphere</h2>
              </div>
              <p className="text-[#C2CEDA]/60 max-w-sm font-light mt-6 md:mt-0 text-sm md:text-base">
                Discover the minimal elegance, dark oceanic tones, and flawless presentation that define The Blue Carte experience.
              </p>
            </div>
           </RevealOnScroll>

           {/* Masonry-style Grid */}
           <div className="grid grid-cols-1 md:grid-cols-3 gap-4 auto-rows-[400px]">
             {galleryImages.map((src, idx) => (
               <RevealOnScroll key={idx} delay={idx * 150}>
                 <div 
                  className={`relative w-full h-full overflow-hidden group cursor-pointer ${idx === 0 ? 'md:col-span-2 md:row-span-2' : ''} ${idx === 3 ? 'md:col-span-2' : ''}`}
                  onClick={() => setLightboxImg(src)}
                 >
                   <div className="absolute inset-0 bg-[#02040A]/40 group-hover:bg-[#061124]/10 transition-colors duration-700 z-10 mix-blend-overlay"></div>
                   <img 
                     src={src} 
                     alt="Gallery" 
                     className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-[2s] grayscale-[15%]"
                     loading="lazy"
                   />
                   <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-700 z-20">
                     <span className="bg-[#02040A]/80 backdrop-blur-md text-white px-8 py-3 uppercase tracking-[0.2em] text-[0.65rem] border border-[#C2CEDA]/20 shadow-[0_0_20px_rgba(26,86,181,0.2)] font-light">View Details</span>
                   </div>
                 </div>
               </RevealOnScroll>
             ))}
           </div>
        </div>
      </section>

      {/* Lightbox */}
      {lightboxImg && (
        <div className="fixed inset-0 z-[100] bg-[#02040A]/95 backdrop-blur-2xl flex items-center justify-center p-4" onClick={() => setLightboxImg(null)}>
          <button className="absolute top-10 right-10 text-white/50 hover:text-white transition-colors" onClick={() => setLightboxImg(null)}>
            <X size={44} strokeWidth={1}/>
          </button>
          <img src={lightboxImg} alt="Enlarged" className="max-w-full max-h-[90vh] object-contain shadow-2xl border border-[#1A56B5]/20" />
        </div>
      )}

      {/* 6. Testimonials */}
      <section id="testimonials" className="py-24 md:py-32 relative border-t border-[#C2CEDA]/5 bg-ocean-depth">
         <div className="container mx-auto px-6 md:px-14 text-center">
            <RevealOnScroll>
              <div className="flex justify-center mb-8">
                 <div className="w-12 h-12 rounded-full border border-[#1A56B5]/40 flex items-center justify-center">
                   <Quote className="w-4 h-4 text-[#C2CEDA]/60" />
                 </div>
              </div>
              <h2 className="font-playfair text-4xl md:text-5xl text-white mb-24 font-light">Eminent Reviews</h2>
            </RevealOnScroll>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
              {[
                { name: "Alexander V.", role: "Michelin Guide Reviewer", text: "A breathtaking descent into culinary perfection. The Wagyu Carpaccio is a revelation, and the ambiance is unmatched in Dubai's fine dining scene." },
                { name: "Eleanor C.", role: "Global Gourmand", text: "The Blue Carte feels like an exclusive secret. The ocean-inspired aesthetic paired with flawless European execution makes this a $10,000 masterpiece." },
                { name: "Julian H.", role: "Lifestyle Curator", text: "From the dramatic presentation of The Abyssal Blue cocktail to the melt-in-mouth Filet Mignon, every second here is absolute luxury." }
              ].map((review, idx) => (
                <RevealOnScroll key={idx} delay={idx * 200}>
                  <div className="glass-card p-12 text-left h-full flex flex-col justify-between hover:-translate-y-3 transition-transform duration-700 rounded-sm">
                    <div>
                      <div className="flex text-[#1A56B5] mb-8 space-x-1">
                        {[...Array(5)].map((_, i) => <Star key={i} size={14} fill="currentColor" />)}
                      </div>
                      <p className="text-[#C2CEDA]/80 font-light leading-loose mb-10 text-sm">"{review.text}"</p>
                    </div>
                    <div className="border-t border-[#C2CEDA]/10 pt-8 flex items-center">
                      <div>
                        <h4 className="font-playfair text-lg text-white font-light">{review.name}</h4>
                        <p className="text-[#C2CEDA]/50 text-[0.6rem] uppercase tracking-[0.2em] mt-2 font-medium">{review.role}</p>
                      </div>
                    </div>
                  </div>
                </RevealOnScroll>
              ))}
            </div>
         </div>
      </section>

      {/* 8 & 7. Booking & Map Section */}
      <section id="book" className="py-0 flex flex-col md:flex-row bg-[#02040A] border-t border-[#C2CEDA]/5">
        
        {/* Reservation Form */}
        <div className="w-full md:w-1/2 p-8 md:p-24 flex items-center justify-center relative bg-[#061124]/30">
          <div className="w-full max-w-lg relative z-10">
            <RevealOnScroll>
              <h3 className="uppercase tracking-[0.3em] text-[#C2CEDA] text-[0.65rem] mb-4 font-medium">Reservations</h3>
              <h2 className="font-playfair text-4xl md:text-5xl lg:text-6xl mb-8 text-white font-light">Secure Your Table</h2>
              <p className="text-[#C2CEDA]/50 font-light mb-14 text-sm leading-relaxed">Due to our exclusive capacity, reservations are highly recommended. For private dining inquiries, utilize our direct concierge.</p>
            </RevealOnScroll>

            <RevealOnScroll delay={200}>
              <form onSubmit={handleBookTable} className="space-y-12">
                <div className="group relative">
                  <input type="text" required value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} placeholder="Distinguished Guest Name" className="w-full bg-transparent border-b border-[#C2CEDA]/20 pb-4 text-white focus:outline-none focus:border-[#1A56B5] transition-colors font-light placeholder-[#C2CEDA]/30 text-sm" />
                </div>
                <div className="group relative">
                  <input type="tel" required value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})} placeholder="Contact Telephone" className="w-full bg-transparent border-b border-[#C2CEDA]/20 pb-4 text-white focus:outline-none focus:border-[#1A56B5] transition-colors font-light placeholder-[#C2CEDA]/30 text-sm" />
                </div>
                <div className="grid grid-cols-2 gap-10">
                  <div className="group relative">
                    <select value={formData.guests} onChange={(e) => setFormData({...formData, guests: e.target.value})} className="w-full bg-transparent border-b border-[#C2CEDA]/20 pb-4 text-white focus:outline-none focus:border-[#1A56B5] transition-colors font-light appearance-none cursor-pointer text-sm">
                      <option value="1" className="bg-[#02040A] text-white">1 Guest</option>
                      <option value="2" className="bg-[#02040A] text-white">2 Guests</option>
                      <option value="3" className="bg-[#02040A] text-white">3 Guests</option>
                      <option value="4" className="bg-[#02040A] text-white">4 Guests</option>
                      <option value="5" className="bg-[#02040A] text-white">5 Guests</option>
                      <option value="6" className="bg-[#02040A] text-white">6+ Guests (Private)</option>
                    </select>
                  </div>
                  <div className="group relative">
                    <input type="date" required value={formData.date} onChange={(e) => setFormData({...formData, date: e.target.value})} className="w-full bg-transparent border-b border-[#C2CEDA]/20 pb-4 text-[#C2CEDA]/80 focus:outline-none focus:border-[#1A56B5] transition-colors font-light [color-scheme:dark] text-sm" />
                  </div>
                </div>
                <div className="group relative">
                  <input type="time" required value={formData.time} onChange={(e) => setFormData({...formData, time: e.target.value})} className="w-full bg-transparent border-b border-[#C2CEDA]/20 pb-4 text-[#C2CEDA]/80 focus:outline-none focus:border-[#1A56B5] transition-colors font-light [color-scheme:dark] text-sm" />
                </div>
                <button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="w-full mt-16 py-5 bg-[#1A56B5] text-white uppercase tracking-[0.2em] font-medium hover:bg-white hover:text-[#02040A] transition-all duration-500 disabled:opacity-70 flex justify-center items-center group shadow-[0_0_20px_rgba(26,86,181,0.3)] text-xs"
                >
                  {isSubmitting ? 'Finalizing Details...' : 'Confirm Reservation'}
                  {!isSubmitting && <ChevronRight className="ml-3 w-4 h-4 transform group-hover:translate-x-2 transition-transform"/>}
                </button>
              </form>
            </RevealOnScroll>
          </div>
        </div>

        {/* 7. Google Map Integration */}
        <div className="w-full md:w-1/2 h-[600px] md:h-auto relative grayscale-[40%] hover:grayscale-0 transition-all duration-1000 border-l border-[#C2CEDA]/5">
           {/* Exact Location: Dubai (Centered generally for high-end aesthetic) */}
           <iframe 
             src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d115456.96417757966!2d55.19503461718501!3d25.267888768370123!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f43496ad9c645%3A0xbde66e5084295162!2sDubai%20-%20United%20Arab%20Emirates!5e0!3m2!1sen!2sus!4v1710000000000!5m2!1sen!2sus" 
             className="w-full h-full border-0 map-dark" 
             allowFullScreen="" 
             loading="lazy" 
             referrerPolicy="no-referrer-when-downgrade"
             title="The Blue Carte Location"
           ></iframe>
           <div className="absolute inset-0 bg-[#02040A]/40 pointer-events-none mix-blend-overlay"></div>
        </div>

      </section>

      {/* 10. Footer */}
      <footer className="bg-[#010205] pt-24 pb-12 border-t border-[#C2CEDA]/10 relative overflow-hidden">
        
        <div className="container mx-auto px-6 md:px-14 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 lg:gap-16 mb-24">
            <div className="md:col-span-1">
              <h2 className="font-playfair text-2xl text-white tracking-[0.2em] mb-4 leading-none font-light">THE BLUE CARTE</h2>
              <p className="text-[#C2CEDA]/40 font-light text-xs leading-relaxed mb-8 pr-4">
                Redefining the essence of ocean-inspired luxury and modern European fine dining in the heart of Dubai.
              </p>
              <div className="flex space-x-6 text-[#C2CEDA]/70">
                <a href="#" className="hover:text-white transition-colors hover:scale-110 transform duration-300"><Instagram size={18} strokeWidth={1.5} /></a>
                <a href="#" className="hover:text-white transition-colors hover:scale-110 transform duration-300"><Facebook size={18} strokeWidth={1.5} /></a>
              </div>
            </div>
            
            <div>
              <h4 className="text-white uppercase tracking-[0.2em] text-[0.65rem] mb-8 font-medium">Contact & Location</h4>
              <ul className="space-y-6 text-[#C2CEDA]/60 font-light text-xs">
                <li className="flex items-center"><Phone size={14} className="mr-4 text-[#1A56B5]"/> +971 58 678 5717</li>
                <li className="flex items-start">
                  <MapPin size={14} className="mr-4 mt-1 shrink-0 text-[#1A56B5]"/> 
                  Financial Center Road,<br/>Dubai,<br/>United Arab Emirates
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-white uppercase tracking-[0.2em] text-[0.65rem] mb-8 font-medium">Dining Hours</h4>
              <ul className="space-y-6 text-[#C2CEDA]/60 font-light text-xs">
                <li className="flex items-start"><Clock size={14} className="mr-4 mt-1 shrink-0 text-[#1A56B5]"/> 
                  <div>
                    <span className="block text-white mb-2">Dinner Service</span>
                    Monday - Sunday<br/>
                    19:00 - 23:30
                  </div>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-white uppercase tracking-[0.2em] text-[0.65rem] mb-8 font-medium">The Society</h4>
              <p className="text-[#C2CEDA]/60 font-light text-xs mb-6 leading-relaxed">Subscribe for private event access and seasonal tasting menu reveals.</p>
              <div className="flex border-b border-[#C2CEDA]/20 pb-3 group">
                <input type="email" placeholder="Email Address" className="bg-transparent w-full focus:outline-none text-xs font-light text-white placeholder-[#C2CEDA]/30" />
                <button className="text-[#1A56B5] group-hover:text-white transition-colors"><ChevronRight size={18} strokeWidth={1.5}/></button>
              </div>
            </div>
          </div>

          <div className="border-t border-[#C2CEDA]/10 pt-8 flex flex-col md:flex-row justify-between items-center text-[0.65rem] text-[#C2CEDA]/30 tracking-[0.15em] uppercase font-light">
            <p>&copy; {new Date().getFullYear()} The Blue Carte. All rights reserved.</p>
            <div className="flex space-x-8 mt-6 md:mt-0">
              <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>

      {/* 9. Floating WhatsApp Button */}
      <a 
        href="https://wa.me/971586785717?text=Hello%20The%20Blue%20Carte%2C%20I%20would%20like%20to%20reserve%20a%20table%20for%20a%20fine%20dining%20experience." 
        target="_blank" 
        rel="noopener noreferrer"
        className="fixed bottom-10 right-10 z-[90] bg-transparent border border-[#C2CEDA]/30 text-white p-4 rounded-full shadow-[0_0_20px_rgba(26,86,181,0.3)] hover:scale-110 hover:bg-[#1A56B5] hover:border-[#1A56B5] transition-all duration-500 glass group flex items-center justify-center"
      >
        <MessageCircle size={24} strokeWidth={1.5} />
        <span className="absolute right-full mr-6 top-1/2 -translate-y-1/2 bg-[#02040A]/90 backdrop-blur-xl border border-[#C2CEDA]/20 text-[#white] text-[0.65rem] uppercase tracking-widest whitespace-nowrap px-6 py-3 rounded-sm shadow-2xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none font-light">
          Private Concierge
        </span>
      </a>

    </div>
  );
}