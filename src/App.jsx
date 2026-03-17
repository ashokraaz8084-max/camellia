import React, { useState, useEffect, useRef } from 'react';
import { 
  Menu as MenuIcon, X, MapPin, Phone, Clock, ChevronRight, 
  Star, Quote, Instagram, Facebook, MessageCircle, Flame, Shield
} from 'lucide-react';

// --- STYLES INJECTION (Styles yahan lagaye gaye hain) ---
const customStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;500;600;700&family=Outfit:wght@300;400;500;600&display=swap');

  :root {
    --gold: #D4AF37; /* Shahi Sona */
    --gold-light: #F3E5AB;
    --saffron: #E65100; /* Gehra Shahi Bhagwa */
    --saffron-light: #FF9800;
    --dark: #050505; /* Gehra Kala */
    --brown: #24140E; /* Qile Jaisa Bhura */
    --ivory: #FDFBF7; /* Halka Cream */
  }

  body {
    background-color: var(--dark);
    color: var(--ivory);
    font-family: 'Outfit', sans-serif;
    overflow-x: hidden;
    scroll-behavior: smooth;
  }

  /* Custom Scrollbar (Apna Scrollbar) */
  ::-webkit-scrollbar {
    width: 6px;
  }
  ::-webkit-scrollbar-track {
    background: var(--dark);
  }
  ::-webkit-scrollbar-thumb {
    background: var(--brown);
    border-radius: 10px;
  }
  ::-webkit-scrollbar-thumb:hover {
    background: var(--saffron);
  }

  .font-royal {
    font-family: 'Cinzel', serif;
  }

  /* Royal Textures & Overlays (Shahi Textures) */
  .bg-fort {
    background-color: var(--dark);
    background-image: url("https://www.transparenttextures.com/patterns/dark-matter.png"); 
    background-blend-mode: multiply;
  }

  .bg-gradient-royal {
    background: radial-gradient(circle at 50% 50%, var(--brown) 0%, var(--dark) 100%);
  }

  /* Animations (Harkatein) */
  @keyframes kenburns {
    0% { transform: scale(1); }
    100% { transform: scale(1.15); }
  }
  .animate-kenburns {
    animation: kenburns 35s ease-in-out infinite alternate;
  }

  @keyframes embers-drift {
    0% { transform: translateY(0) scale(1) opacity(0); }
    50% { transform: translateY(-30px) scale(1.2) opacity(0.6); }
    100% { transform: translateY(-60px) scale(0.8) opacity(0); }
  }
  .animate-ember {
    animation: embers-drift 6s ease-in infinite;
  }

  /* Glassmorphism & Luxury Utilities */
  .glass {
    background: rgba(5, 5, 5, 0.85);
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
    border-bottom: 1px solid rgba(212, 175, 55, 0.15);
  }

  .glass-card {
    background: linear-gradient(145deg, rgba(36, 20, 14, 0.6) 0%, rgba(5, 5, 5, 0.95) 100%);
    backdrop-filter: blur(12px);
    border: 1px solid rgba(212, 175, 55, 0.2);
    box-shadow: 0 10px 40px 0 rgba(0, 0, 0, 0.9);
    transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
  }
  
  .glass-card:hover {
    border-color: rgba(230, 81, 0, 0.6); /* Hover par Bhagwa chamak */
    box-shadow: 0 15px 50px 0 rgba(230, 81, 0, 0.2);
    transform: translateY(-5px);
  }

  .gold-gradient-text {
    background: linear-gradient(to right, #D4AF37, #FDFBF7, #E65100, #D4AF37);
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
    background-size: 200% auto;
    animation: shine 7s linear infinite;
  }

  @keyframes shine {
    to { background-position: 200% center; }
  }

  .text-glow {
    text-shadow: 0 0 30px rgba(230, 81, 0, 0.6);
  }

  .map-dark {
    filter: invert(100%) hue-rotate(180deg) brightness(80%) contrast(130%) sepia(40%) hue-rotate(-15deg);
  }

  .fire-glow {
    background: radial-gradient(circle, rgba(230,81,0,0.15) 0%, rgba(0,0,0,0) 70%);
  }
`;

// --- CUSTOM COMPONENTS (Apne Components) ---

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
  const [activeMenuTab, setActiveMenuTab] = useState('Shahi Pakwan');
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [lightboxImg, setLightboxImg] = useState(null);

  // Form State (Form ka Data)
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
      const phone = "971525265001";
      const message = `*Shahi Reservation - Maratha Darbar* 🛡️\n\n*Naam:* ${formData.name}\n*Sampark:* ${formData.phone}\n*Mehmaan:* ${formData.guests}\n*Tareekh:* ${formData.date}\n*Samay:* ${formData.time}\n\nEk shandaar Maratha dining anubhav ka intezaar hai.`;
      const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
      window.open(url, "_blank");
      setIsSubmitting(false);
      
      setFormData({name: '', phone: '', guests: '2', date: '', time: ''});
    }, 1200);
  };

  // --- MENU DATA (Images replaced with provided URLs) ---
  const menuData = {
    "Shahi Pakwan": [
      { name: 'Kolhapuri Tambda Rassa', desc: 'Ek mashhoor aur teekha laal mutton rassa, jismein haath se peese gaye paramparik Kolhapuri masale hain. Yoddhao ki asli dawat.', price: 'AED 95', img: 'https://image2url.com/r2/default/images/1773770014780-126cca91-0011-4b23-86c7-26c1e6c7c1b6.jpg' },
      { name: 'Peshwai Mutton Sukka', desc: 'Dheemi aanch par bhuna hua naram mutton, kaali mirch, nariyal aur shahi kesar ke sath.', price: 'AED 110', img: 'https://image2url.com/r2/default/images/1773770053567-e878c456-1837-4987-8b4a-f582d464c8d2.jpg' },
      { name: 'Shahi Pandhra Rassa', desc: 'Nariyal ke doodh, kaju paste aur khade masalon mein paka hua ek shaandaar safed mutton stew.', price: 'AED 95', img: 'https://image2url.com/r2/default/images/1773770086296-8ec9a49a-fca7-4a5c-8929-66200cba760e.jpg' }
    ],
    "Shuruvaat": [
      { name: 'Kothimbir Vadi Gold', desc: 'Kurkure hara dhaniya aur besan ke pakode, jismein 24K khane wale sone ka warq hai, pudina chutney ke sath.', price: 'AED 45', img: 'https://image2url.com/r2/default/images/1773770053567-e878c456-1837-4987-8b4a-f582d464c8d2.jpg' },
      { name: 'Konkani Solkadhi Shots', desc: 'Nariyal ke doodh aur kokum ka ek taazgi bhara appetizer, bhune jeere ke tadke ke sath.', price: 'AED 35', img: 'https://image2url.com/r2/default/images/1773770014780-126cca91-0011-4b23-86c7-26c1e6c7c1b6.jpg' },
      { name: 'Surmai Rawa Fry', desc: 'Rawa aur coastal masalon mein lipti hui premium Kingfish, sunhari hone tak tali hui.', price: 'AED 85', img: 'https://image2url.com/r2/default/images/1773770086296-8ec9a49a-fca7-4a5c-8929-66200cba760e.jpg' }
    ],
    "Tandoor": [
      { name: 'Shivneri Tandoori Raan', desc: 'Dark rum aur shahi Maratha masalon mein raat bhar marinated lamb shanks, mitti ke tandoor mein dheemi aanch par paki hui.', price: 'AED 185', img: 'https://image2url.com/r2/default/images/1773770014780-126cca91-0011-4b23-86c7-26c1e6c7c1b6.jpg' },
      { name: 'Murgh Rajwada Tikka', desc: 'Kesar, dahi aur qile ke gupt masalon mein bana hua smoked chicken tikka.', price: 'AED 75', img: 'https://image2url.com/r2/default/images/1773770053567-e878c456-1837-4987-8b4a-f582d464c8d2.jpg' }
    ],
    "Rotiyaan": [
      { name: 'Jowar Bhakri', desc: 'Paramparik jowar ki roti, hathon se banakar khuli aanch par bhuni hui.', price: 'AED 15', img: 'https://image2url.com/r2/default/images/1773770086296-8ec9a49a-fca7-4a5c-8929-66200cba760e.jpg' },
      { name: 'Ghadichi Poli', desc: 'Naram, partedaar gehu ki roti jispar shuddh A2 Desi Ghee lagaya gaya hai.', price: 'AED 20', img: 'https://image2url.com/r2/default/images/1773770014780-126cca91-0011-4b23-86c7-26c1e6c7c1b6.jpg' }
    ],
    "Meetha": [
      { name: 'Shahi Puran Poli', desc: 'Meethi daal se bhari roti jise garam-garam shuddh ghee aur elaichi ke sath parosa jata hai.', price: 'AED 55', img: 'https://image2url.com/r2/default/images/1773770053567-e878c456-1837-4987-8b4a-f582d464c8d2.jpg' },
      { name: 'Ukadiche Modak', desc: 'Bhaap mein pake chawal ke aate ke modak, jisme taza nariyal, gur aur jaiphal bhara hota hai.', price: 'AED 65', img: 'https://image2url.com/r2/default/images/1773770086296-8ec9a49a-fca7-4a5c-8929-66200cba760e.jpg' }
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
      <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#050505] bg-fort">
        <div className="relative flex items-center justify-center mb-10">
           <Shield className="text-[#E65100] w-14 h-14 animate-pulse opacity-0 animate-[fadeIn_1s_ease-out_0.5s_forwards]" />
           <div className="absolute w-36 h-36 bg-[#E65100]/20 rounded-full blur-2xl animate-pulse"></div>
        </div>
        <div className="text-center relative z-10">
          <h1 className="font-royal text-4xl md:text-6xl text-[#D4AF37] tracking-[0.25em] mb-4 opacity-0 animate-[fadeIn_1s_ease-out_1s_forwards]">MARATHA DARBAR</h1>
          <div className="h-[1px] w-0 bg-gradient-to-r from-transparent via-[#E65100] to-transparent mx-auto animate-[expand_1.5s_ease-out_1.5s_forwards]"></div>
          <p className="uppercase tracking-[0.5em] text-xs mt-5 text-[#FDFBF7]/60 opacity-0 animate-[fadeIn_1s_ease-out_2s_forwards]">Shahi Dining • Dubai</p>
          <style>{`
            @keyframes expand { to { w-full; max-width: 250px; width: 250px; } }
            @keyframes fadeIn { to { opacity: 1; } }
          `}</style>
        </div>
      </div>
    );
  }

  return (
    <div className="relative bg-[#050505] bg-fort min-h-screen text-[#FDFBF7] selection:bg-[#E65100] selection:text-white">
      
      {/* Navigation (Menu Bar) */}
      <nav className={`fixed w-full z-50 transition-all duration-700 ${scrolled ? 'glass py-4' : 'bg-transparent py-6'}`}>
        <div className="container mx-auto px-6 md:px-12 flex justify-between items-center">
          <div className="flex flex-col">
            <a href="#" className="font-royal text-2xl tracking-[0.2em] text-[#D4AF37] font-bold leading-none">
              MARATHA DARBAR
            </a>
            <span className="font-royal text-[0.65rem] tracking-[0.5em] text-[#FDFBF7]/60 mt-1 uppercase">Dubai</span>
          </div>
          
          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center space-x-12">
            {[
              { id: 'heritage', label: 'Virasat' },
              { id: 'signatures', label: 'Shahi Dawat' },
              { id: 'menu', label: 'Menu' },
              { id: 'gallery', label: 'Tasveerein' }
            ].map((item) => (
              <a key={item.id} href={`#${item.id}`} className="text-xs uppercase tracking-[0.2em] text-[#FDFBF7]/80 hover:text-[#E65100] transition-all duration-300 relative group font-medium">
                {item.label}
                <span className="absolute -bottom-2 left-0 w-0 h-[1px] bg-[#E65100] transition-all duration-300 group-hover:w-full"></span>
              </a>
            ))}
            <a href="#book" className="px-8 py-3 bg-[#D4AF37]/10 border border-[#D4AF37] text-[#D4AF37] text-xs uppercase tracking-widest hover:bg-[#D4AF37] hover:text-[#050505] transition-all duration-500 shadow-[0_0_15px_rgba(212,175,55,0.1)] hover:shadow-[0_0_25px_rgba(212,175,55,0.4)] font-bold">
              Table Book Karein
            </a>
          </div>

          {/* Mobile Nav Toggle */}
          <button className="lg:hidden text-[#D4AF37]" onClick={() => setIsNavOpen(!isNavOpen)}>
            {isNavOpen ? <X size={28} /> : <MenuIcon size={28} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div className={`fixed inset-0 z-40 bg-gradient-to-b from-[#050505] to-[#24140E] flex flex-col items-center justify-center space-y-8 transition-all duration-500 ${isNavOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`}>
        {[
          { id: 'heritage', label: 'Virasat' },
          { id: 'signatures', label: 'Shahi Dawat' },
          { id: 'menu', label: 'Menu' },
          { id: 'gallery', label: 'Tasveerein' }
        ].map((item) => (
          <a key={item.id} href={`#${item.id}`} onClick={() => setIsNavOpen(false)} className="font-royal text-3xl text-[#FDFBF7] hover:text-[#E65100] transition-colors">
            {item.label}
          </a>
        ))}
        <a href="#book" onClick={() => setIsNavOpen(false)} className="mt-8 px-10 py-4 bg-[#D4AF37] text-[#050505] font-bold tracking-widest uppercase text-sm font-royal">
          Table Book Karein
        </a>
      </div>

      {/* 1. Hero Section */}
      <section className="relative h-screen w-full flex items-center justify-center overflow-hidden">
        {/* Cinematic Background (Image Replaced) */}
        <div className="absolute inset-0 z-0">
          <img 
            src="https://image2url.com/r2/default/images/1773770014780-126cca91-0011-4b23-86c7-26c1e6c7c1b6.jpg" 
            alt="Royal Cooking Flames" 
            className="w-full h-full object-cover animate-kenburns opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#050505]/95 via-[#24140E]/70 to-[#050505]"></div>
          
          {/* Subtle Flame / Embers Effect */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {[...Array(6)].map((_, i) => (
              <div key={i} 
                   className="absolute bottom-0 w-2 h-2 bg-[#E65100] rounded-full blur-[2px] animate-ember"
                   style={{ left: `${Math.random() * 100}%`, animationDelay: `${Math.random() * 5}s`, animationDuration: `${4 + Math.random() * 4}s` }}>
              </div>
            ))}
             <div className="absolute top-1/4 left-1/4 w-[40rem] h-[40rem] bg-[#E65100]/10 rounded-full blur-[150px]"></div>
          </div>
        </div>

        <div className="relative z-10 text-center px-4 max-w-5xl mx-auto flex flex-col items-center mt-16">
          <RevealOnScroll delay={100}>
            <div className="flex items-center justify-center space-x-4 mb-6">
              <span className="w-16 h-[1px] bg-[#D4AF37]"></span>
              <p className="uppercase tracking-[0.4em] text-[#D4AF37] text-xs md:text-sm font-semibold">Meena Bazaar, Dubai</p>
              <span className="w-16 h-[1px] bg-[#D4AF37]"></span>
            </div>
          </RevealOnScroll>
          <RevealOnScroll delay={300}>
            <h1 className="font-royal text-5xl md:text-7xl lg:text-[6rem] text-white mb-6 leading-[1.1] drop-shadow-2xl">
              Maratha Samrajya Ke Shahi <br/>
              <span className="gold-gradient-text text-glow italic">Swad Ka Anubhav Karein</span>
            </h1>
          </RevealOnScroll>
          <RevealOnScroll delay={500}>
            <p className="text-[#FDFBF7]/80 text-lg md:text-xl font-light max-w-2xl mx-auto mb-12 leading-relaxed">
              Ek aisi duniya mein qadam rakhein jahan shaurya aur shaan ka anokha sangam hai. Hum Maharashtra ke shahi qilon ka pakwan Dubai ki behtareen luxury ke sath pesh karte hain.
            </p>
          </RevealOnScroll>
          <RevealOnScroll delay={700}>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <a href="#book" className="px-12 py-4 bg-gradient-to-r from-[#D4AF37] to-[#E65100] text-[#050505] text-xs uppercase tracking-[0.2em] font-bold hover:scale-105 transition-all duration-500 shadow-[0_0_20px_rgba(230,81,0,0.4)]">
                Table Book Karein
              </a>
              <a href="#menu" className="px-12 py-4 border border-[#D4AF37]/50 text-[#D4AF37] text-xs uppercase tracking-[0.2em] font-bold hover:border-[#E65100] hover:text-[#E65100] hover:bg-[#E65100]/10 glass transition-all duration-500">
                Menu Dekhein
              </a>
            </div>
          </RevealOnScroll>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 animate-float">
          <div className="w-[1px] h-20 bg-gradient-to-b from-[#E65100] to-transparent mx-auto"></div>
        </div>
      </section>

      {/* 2. About / Story Section */}
      <section id="heritage" className="py-24 md:py-32 relative bg-gradient-royal">
        <div className="container mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 lg:gap-24 items-center">
            <RevealOnScroll direction="right">
              <div className="relative group">
                <div className="absolute -inset-4 border border-[#D4AF37]/30 translate-x-4 translate-y-4 rounded-sm transition-transform duration-700 group-hover:translate-x-2 group-hover:translate-y-2"></div>
                {/* Image Replaced */}
                <img 
                  src="https://image2url.com/r2/default/images/1773770053567-e878c456-1837-4987-8b4a-f582d464c8d2.jpg" 
                  alt="Royal Heritage Spices" 
                  className="relative z-10 w-full h-[650px] object-cover grayscale-[20%] hover:grayscale-0 transition-all duration-1000 rounded-sm shadow-[0_20px_50px_rgba(0,0,0,0.9)]"
                />
                <div className="absolute bottom-12 -left-10 bg-[#050505] p-8 border-l-4 border-[#E65100] z-20 shadow-[0_20px_50px_rgba(0,0,0,0.9)]">
                  <p className="font-royal text-3xl md:text-4xl text-[#D4AF37] mb-2">Virasat</p>
                  <p className="text-xs uppercase tracking-widest text-[#FDFBF7]/70">Qilon Aur Dawaton Ki Kahani</p>
                </div>
              </div>
            </RevealOnScroll>
            
            <RevealOnScroll direction="left" delay={200}>
              <div className="max-w-xl pl-0 md:pl-6">
                <h3 className="uppercase tracking-[0.4em] text-[#E65100] text-xs mb-4 flex items-center font-semibold">
                  <span className="w-8 h-[1px] bg-[#E65100] mr-4"></span> Parampara Zinda Hai
                </h3>
                <h2 className="font-royal text-4xl md:text-5xl lg:text-6xl mb-8 leading-[1.1] text-white">
                  Taqat, Garv, Aur <br/><span className="italic text-[#D4AF37] text-glow">Parampara</span>
                </h2>
                <p className="text-[#FDFBF7]/70 leading-relaxed font-light mb-6 text-base md:text-lg">
                  Maratha Samrajya apni bahaduri aur shaan ke liye jana jata tha. Unke shandar qilon ki rasoiyan bhi isse alag nahi thi—rajaon aur yoddhao ke layaq mazboot aur masaledar dawat banai jati thi.
                </p>
                <p className="text-[#FDFBF7]/70 leading-relaxed font-light mb-10 text-base md:text-lg">
                  Maratha Darbar mein, hum inhi purani aur shahi recipes ko phir se zinda karte hain. Kolhapur ke teekhe Tambda Rassa se lekar Puran Poli ki mithas tak, har dish Maharashtra ke shandar itihas ki ek jhalak hai, jo Dubai ki modern luxury ke sath pesh ki jati hai.
                </p>
                <div className="flex items-center space-x-6 border-t border-[#D4AF37]/20 pt-8">
                  <div className="w-16 h-16 rounded-full border border-[#E65100]/50 flex items-center justify-center bg-[#E65100]/10">
                    <Shield className="text-[#E65100] w-7 h-7" />
                  </div>
                  <div>
                    <p className="text-sm tracking-[0.1em] uppercase text-[#D4AF37] font-bold">Shuddh Maharashtrian</p>
                    <p className="text-xs tracking-widest text-[#FDFBF7]/50 mt-1">Pak Kala Ki Virasat</p>
                  </div>
                </div>
              </div>
            </RevealOnScroll>
          </div>
        </div>
      </section>

      {/* 3. Signature Dishes Highlight */}
      <section id="signatures" className="py-24 md:py-32 relative border-y border-[#D4AF37]/10 bg-[#050505]">
        <div className="fire-glow absolute inset-0 opacity-30 pointer-events-none"></div>
        <div className="container mx-auto px-6 md:px-12 text-center relative z-10">
          <RevealOnScroll>
            <h3 className="uppercase tracking-[0.4em] text-[#E65100] text-xs mb-4 font-semibold">Shahi Khazana</h3>
            <h2 className="font-royal text-4xl md:text-5xl lg:text-6xl mb-6 text-white">Khas Pakwan</h2>
            <div className="w-24 h-[1px] bg-[#D4AF37] mx-auto mb-16"></div>
          </RevealOnScroll>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10">
            {[
              { title: "Kolhapuri Tambda Rassa", desc: "Ek mashhoor aur teekha laal mutton rassa, jismein haath se peese gaye masale hain. Yoddhao ka asli khana.", img: "https://image2url.com/r2/default/images/1773770086296-8ec9a49a-fca7-4a5c-8929-66200cba760e.jpg" },
              { title: "Shahi Pandhra Rassa", desc: "Nariyal ke doodh aur khade masalon mein paka hua ek shaandaar safed mutton stew.", img: "https://image2url.com/r2/default/images/1773770014780-126cca91-0011-4b23-86c7-26c1e6c7c1b6.jpg" },
              { title: "Peshwai Mutton Sukka", desc: "Dheemi aanch par bhuna hua naram mutton, kaali mirch aur shahi kesar ke sath.", img: "https://image2url.com/r2/default/images/1773770053567-e878c456-1837-4987-8b4a-f582d464c8d2.jpg" }
            ].map((dish, idx) => (
              <RevealOnScroll key={idx} delay={idx * 200}>
                <div className="glass-card h-full flex flex-col group overflow-hidden rounded-t-full p-2 border border-[#D4AF37]/20">
                  <div className="w-full h-64 rounded-t-full overflow-hidden relative">
                     <div className="absolute inset-0 bg-[#050505]/40 group-hover:bg-transparent transition-all z-10"></div>
                     <img src={dish.img} alt={dish.title} className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-1000" />
                  </div>
                  <div className="p-8 text-center">
                    <h4 className="font-royal text-2xl text-[#D4AF37] mb-4 group-hover:text-[#E65100] transition-colors">{dish.title}</h4>
                    <p className="text-[#FDFBF7]/60 font-light leading-relaxed text-sm">{dish.desc}</p>
                  </div>
                </div>
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Full Menu Section */}
      <section id="menu" className="py-24 md:py-32 relative overflow-hidden bg-gradient-to-b from-[#050505] via-[#24140E] to-[#050505]">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#E65100] rounded-full blur-[250px] opacity-[0.05]"></div>
        
        <div className="container mx-auto px-6 md:px-12 relative z-10">
          <div className="text-center mb-16">
            <RevealOnScroll>
              <h3 className="uppercase tracking-[0.4em] text-[#D4AF37] text-xs mb-4 font-semibold">Swad Ki Duniya</h3>
              <h2 className="font-royal text-4xl md:text-5xl lg:text-6xl mb-6 text-white">Shahi Menu</h2>
              <div className="w-24 h-[1px] bg-[#D4AF37] mx-auto"></div>
            </RevealOnScroll>
          </div>

          {/* Menu Categories */}
          <RevealOnScroll delay={200}>
            <div className="flex flex-wrap justify-center gap-6 md:gap-12 mb-20">
              {Object.keys(menuData).map((category) => (
                <button
                  key={category}
                  onClick={() => setActiveMenuTab(category)}
                  className={`text-xs md:text-sm uppercase tracking-[0.15em] pb-3 transition-all duration-300 border-b-2 font-semibold ${
                    activeMenuTab === category ? 'border-[#E65100] text-[#E65100]' : 'border-transparent text-[#FDFBF7]/40 hover:text-[#FDFBF7]'
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
                <div className="group flex flex-col sm:flex-row gap-8 items-center sm:items-start p-6 rounded-lg hover:bg-white/[0.02] border border-transparent hover:border-[#D4AF37]/15 transition-all duration-500 cursor-pointer">
                  <div className="w-full sm:w-40 h-40 shrink-0 overflow-hidden rounded-md relative border border-[#D4AF37]/30 shadow-lg">
                    <div className="absolute inset-0 bg-[#050505]/40 group-hover:bg-transparent transition-all z-10"></div>
                    <img 
                      src={item.img} 
                      alt={item.name} 
                      className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-1000"
                    />
                  </div>
                  <div className="flex-1 w-full text-center sm:text-left mt-2 sm:mt-0">
                    <div className="flex flex-col sm:flex-row justify-between items-baseline mb-4 border-b border-[#D4AF37]/20 pb-3">
                      <h4 className="font-royal text-2xl text-white group-hover:text-[#E65100] transition-colors">{item.name}</h4>
                      <span className="text-[#D4AF37] font-bold tracking-widest mt-2 sm:mt-0 text-lg">{item.price}</span>
                    </div>
                    <p className="text-[#FDFBF7]/60 font-light text-sm md:text-base leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Royal Gallery Section */}
      <section id="gallery" className="py-24 bg-[#050505]">
        <div className="container mx-auto px-6 md:px-12">
           <RevealOnScroll>
            <div className="flex flex-col md:flex-row justify-between items-end mb-16">
              <div>
                <h3 className="uppercase tracking-[0.4em] text-[#E65100] text-xs mb-4 font-semibold">Khoobsurat Nazare</h3>
                <h2 className="font-royal text-4xl md:text-5xl lg:text-6xl text-white">Darbar Ka Mahaul</h2>
              </div>
              <p className="text-[#FDFBF7]/60 max-w-sm font-light mt-6 md:mt-0 text-base">
                Hamare premium setup ka anubhav karein, jo Maratha qilon ki shaan aur elegant shahi dining ko darshata hai.
              </p>
            </div>
           </RevealOnScroll>

           {/* Masonry-style Grid */}
           <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[350px]">
             {galleryImages.map((src, idx) => (
               <RevealOnScroll key={idx} delay={idx * 150}>
                 <div 
                  className={`relative w-full h-full overflow-hidden group cursor-pointer border border-[#D4AF37]/10 ${idx === 0 ? 'md:col-span-2 md:row-span-2' : ''} ${idx === 3 ? 'md:col-span-2' : ''}`}
                  onClick={() => setLightboxImg(src)}
                 >
                   <div className="absolute inset-0 bg-[#050505]/60 group-hover:bg-[#24140E]/20 transition-colors duration-700 z-10"></div>
                   <img 
                     src={src} 
                     alt="Gallery" 
                     className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-[1.5s]"
                     loading="lazy"
                   />
                   <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-700 z-20">
                     <span className="bg-[#050505]/90 backdrop-blur-md text-[#D4AF37] px-10 py-4 uppercase tracking-[0.2em] text-xs border border-[#D4AF37]/50 shadow-[0_0_20px_rgba(212,175,55,0.2)] font-bold">Bada Karein</span>
                   </div>
                 </div>
               </RevealOnScroll>
             ))}
           </div>
        </div>
      </section>

      {/* Lightbox */}
      {lightboxImg && (
        <div className="fixed inset-0 z-[100] bg-[#050505]/95 backdrop-blur-2xl flex items-center justify-center p-4" onClick={() => setLightboxImg(null)}>
          <button className="absolute top-10 right-10 text-white/50 hover:text-[#E65100] transition-colors" onClick={() => setLightboxImg(null)}>
            <X size={44} strokeWidth={1}/>
          </button>
          <img src={lightboxImg} alt="Enlarged" className="max-w-full max-h-[90vh] object-contain shadow-2xl border border-[#D4AF37]/30" />
        </div>
      )}

      {/* 6. Testimonials */}
      <section id="testimonials" className="py-24 md:py-32 relative border-y border-[#D4AF37]/10 bg-gradient-to-t from-[#24140E] to-transparent">
         <div className="container mx-auto px-6 md:px-12 text-center">
            <RevealOnScroll>
              <Quote className="w-14 h-14 text-[#E65100]/40 mx-auto mb-8" />
              <h2 className="font-royal text-4xl md:text-5xl text-white mb-20">Mehmaano Ki Raay</h2>
            </RevealOnScroll>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
              {[
                { name: "Aditya S.", role: "Culinary Editor", text: "Tambda Rassa ne mujhe seedhe Kolhapur ke shahi darbar mein pahuncha diya. Dubai mein is swad ka koi muqabla nahi. Ek $10,000 ka anubhav." },
                { name: "Fatima A.", role: "Global Gourmand", text: "Har mayne mein shandaar. Shivneri Tandoori Raan sach mein dheemi aanch par paki ek masterpiece thi. Qile jaisa mahaul is luxury bhojan ko aur bhi khas banata hai." },
                { name: "Kunal M.", role: "Food Critic", text: "Virasat ke swad ko Michelin-level ki khoobsurti ke sath pesh kiya gaya hai. Maratha Darbar sirf ek restaurant nahi, balki itihas ka ek shahi safar hai." }
              ].map((review, idx) => (
                <RevealOnScroll key={idx} delay={idx * 200}>
                  <div className="glass-card p-12 text-left h-full flex flex-col justify-between hover:-translate-y-3 transition-transform duration-500">
                    <div>
                      <div className="flex text-[#E65100] mb-8 space-x-1">
                        {[...Array(5)].map((_, i) => <Star key={i} size={18} fill="currentColor" />)}
                      </div>
                      <p className="text-[#FDFBF7]/70 font-light leading-loose mb-10 text-lg">"{review.text}"</p>
                    </div>
                    <div className="border-t border-[#D4AF37]/20 pt-6 flex items-center">
                      <div className="w-10 h-10 rounded-full bg-[#E65100]/10 border border-[#E65100]/30 flex items-center justify-center mr-4">
                        <span className="text-[#D4AF37] font-royal font-bold">{review.name.charAt(0)}</span>
                      </div>
                      <div>
                        <h4 className="font-royal text-xl text-white font-bold">{review.name}</h4>
                        <p className="text-[#E65100] text-[0.65rem] uppercase tracking-[0.2em] mt-1 font-semibold">{review.role}</p>
                      </div>
                    </div>
                  </div>
                </RevealOnScroll>
              ))}
            </div>
         </div>
      </section>

      {/* 8 & 7. Booking & Map Section */}
      <section id="book" className="py-0 flex flex-col md:flex-row bg-[#050505]">
        
        {/* Reservation Form */}
        <div className="w-full md:w-1/2 p-8 md:p-24 flex items-center justify-center relative bg-gradient-to-r from-[#24140E] to-transparent">
          <div className="w-full max-w-lg relative z-10">
            <RevealOnScroll>
              <h3 className="uppercase tracking-[0.4em] text-[#E65100] text-xs mb-4 font-semibold">Booking</h3>
              <h2 className="font-royal text-4xl md:text-5xl lg:text-6xl mb-8 text-white">Apna Darbar Book Karein</h2>
              <p className="text-[#FDFBF7]/50 font-light mb-12 text-sm leading-relaxed">Shahi table par apni jagah pakki karein. Exclusive private dining ke liye, kripya hamare WhatsApp concierge ka istemal karein.</p>
            </RevealOnScroll>

            <RevealOnScroll delay={200}>
              <form onSubmit={handleBookTable} className="space-y-10">
                <div className="group relative">
                  <input type="text" required value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} placeholder="Pura Naam" className="w-full bg-transparent border-b border-[#D4AF37]/30 pb-4 text-white focus:outline-none focus:border-[#E65100] transition-colors font-light placeholder-[#FDFBF7]/30 text-lg" />
                </div>
                <div className="group relative">
                  <input type="tel" required value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})} placeholder="Phone Number" className="w-full bg-transparent border-b border-[#D4AF37]/30 pb-4 text-white focus:outline-none focus:border-[#E65100] transition-colors font-light placeholder-[#FDFBF7]/30 text-lg" />
                </div>
                <div className="grid grid-cols-2 gap-10">
                  <div className="group relative">
                    <select value={formData.guests} onChange={(e) => setFormData({...formData, guests: e.target.value})} className="w-full bg-transparent border-b border-[#D4AF37]/30 pb-4 text-white focus:outline-none focus:border-[#E65100] transition-colors font-light appearance-none cursor-pointer text-lg">
                      <option value="1" className="bg-[#050505] text-white">1 Mehmaan</option>
                      <option value="2" className="bg-[#050505] text-white">2 Mehmaan</option>
                      <option value="3" className="bg-[#050505] text-white">3 Mehmaan</option>
                      <option value="4" className="bg-[#050505] text-white">4 Mehmaan</option>
                      <option value="5" className="bg-[#050505] text-white">5 Mehmaan</option>
                      <option value="6" className="bg-[#050505] text-white">6+ Mehmaan</option>
                    </select>
                  </div>
                  <div className="group relative">
                    <input type="date" required value={formData.date} onChange={(e) => setFormData({...formData, date: e.target.value})} className="w-full bg-transparent border-b border-[#D4AF37]/30 pb-4 text-[#FDFBF7]/80 focus:outline-none focus:border-[#E65100] transition-colors font-light [color-scheme:dark] text-lg" />
                  </div>
                </div>
                <div className="group relative">
                  <input type="time" required value={formData.time} onChange={(e) => setFormData({...formData, time: e.target.value})} className="w-full bg-transparent border-b border-[#D4AF37]/30 pb-4 text-[#FDFBF7]/80 focus:outline-none focus:border-[#E65100] transition-colors font-light [color-scheme:dark] text-lg" />
                </div>
                <button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="w-full mt-12 py-6 bg-gradient-to-r from-[#D4AF37] to-[#E65100] text-[#050505] uppercase tracking-[0.2em] font-bold hover:from-[#FDFBF7] hover:to-[#FDFBF7] transition-all duration-500 disabled:opacity-70 flex justify-center items-center group shadow-[0_0_20px_rgba(230,81,0,0.3)] hover:shadow-[0_0_30px_rgba(230,81,0,0.6)]"
                >
                  {isSubmitting ? 'Table Confirm Ho Raha Hai...' : 'Table Confirm Karein'}
                  {!isSubmitting && <ChevronRight className="ml-3 w-5 h-5 transform group-hover:translate-x-2 transition-transform"/>}
                </button>
              </form>
            </RevealOnScroll>
          </div>
        </div>

        {/* 7. Google Map Integration */}
        <div className="w-full md:w-1/2 h-[600px] md:h-auto relative grayscale-[60%] hover:grayscale-0 transition-all duration-1000 border-l border-[#D4AF37]/10">
           {/* Exact Location: Meena Bazaar area */}
           <iframe 
             src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14434.908070929283!2d55.281898150000005!3d25.253818300000004!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f4337bc1df43d%3A0xc6c76db3642ba5!2sBur%20Dubai%20-%20Dubai!5e0!3m2!1sen!2sae!4v1710000000000!5m2!1sen!2sae" 
             className="w-full h-full border-0 map-dark" 
             allowFullScreen="" 
             loading="lazy" 
             referrerPolicy="no-referrer-when-downgrade"
             title="Maratha Darbar Location"
           ></iframe>
           <div className="absolute inset-0 bg-[#050505]/40 pointer-events-none"></div>
        </div>

      </section>

      {/* 10. Footer */}
      <footer className="bg-[#030303] pt-24 pb-12 border-t border-[#D4AF37]/20 relative overflow-hidden bg-fort">
        {/* Decorative corner accents */}
        <div className="absolute top-0 left-0 w-40 h-40 border-t-2 border-l-2 border-[#D4AF37]/15 opacity-50 rounded-tl-3xl"></div>
        <div className="absolute top-0 right-0 w-40 h-40 border-t-2 border-r-2 border-[#D4AF37]/15 opacity-50 rounded-tr-3xl"></div>

        <div className="container mx-auto px-6 md:px-12 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 lg:gap-16 mb-20">
            <div className="md:col-span-1">
              <h2 className="font-royal text-3xl text-[#D4AF37] tracking-[0.15em] mb-2 leading-none font-bold">MARATHA DARBAR</h2>
              <p className="font-royal text-sm text-[#FDFBF7]/70 tracking-[0.4em] mb-8 uppercase">Dubai</p>
              <p className="text-[#FDFBF7]/50 font-light text-sm leading-relaxed mb-8">
                Maratha Samrajya ke shaktishali aur virasat se bhare pakwanon ko Dubai ke sabse shandar dining experience mein badalna.
              </p>
              <div className="flex space-x-6 text-[#D4AF37]">
                <a href="#" className="hover:text-white transition-colors hover:scale-110 transform duration-300"><Instagram size={22} /></a>
                <a href="#" className="hover:text-white transition-colors hover:scale-110 transform duration-300"><Facebook size={22} /></a>
              </div>
            </div>
            
            <div>
              <h4 className="text-white uppercase tracking-[0.2em] text-xs mb-8 font-semibold">Sampark Aur Pata</h4>
              <ul className="space-y-6 text-[#FDFBF7]/60 font-light text-sm">
                <li className="flex items-center"><Phone size={18} className="mr-4 text-[#E65100]"/> +971 52 526 5001</li>
                <li className="flex items-start">
                  <MapPin size={18} className="mr-4 mt-1 shrink-0 text-[#E65100]"/> 
                  Meena Bazaar,<br/>Bur Dubai, Dubai,<br/>United Arab Emirates
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-white uppercase tracking-[0.2em] text-xs mb-8 font-semibold">Shahi Samay</h4>
              <ul className="space-y-6 text-[#FDFBF7]/60 font-light text-sm">
                <li className="flex items-start"><Clock size={18} className="mr-4 mt-1 shrink-0 text-[#E65100]"/> 
                  <div>
                    <span className="block text-white mb-1">Dopahar Ka Khana</span>
                    12:30 PM - 03:30 PM<br/><br/>
                    <span className="block text-white mb-1">Raat Ka Khana</span>
                    07:00 PM - 12:00 AM
                  </div>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-white uppercase tracking-[0.2em] text-xs mb-8 font-semibold">Shahi Farmaan</h4>
              <p className="text-[#FDFBF7]/60 font-light text-sm mb-6 leading-relaxed">Private dawat aur khas khabron ke liye hamari list mein shamil hon.</p>
              <div className="flex border-b border-[#D4AF37]/40 pb-3 group">
                <input type="email" placeholder="Email Pata" className="bg-transparent w-full focus:outline-none text-sm font-light text-white placeholder-[#FDFBF7]/30" />
                <button className="text-[#E65100] group-hover:text-white transition-colors"><ChevronRight size={22}/></button>
              </div>
            </div>
          </div>

          <div className="border-t border-[#D4AF37]/10 pt-10 flex flex-col md:flex-row justify-between items-center text-xs text-[#FDFBF7]/40 tracking-[0.15em] uppercase font-medium">
            <p>&copy; {new Date().getFullYear()} Maratha Darbar Restaurant. All rights reserved.</p>
            <div className="flex space-x-8 mt-6 md:mt-0">
              <a href="#" className="hover:text-[#E65100] transition-colors">Privacy</a>
              <a href="#" className="hover:text-[#E65100] transition-colors">Terms</a>
            </div>
          </div>
        </div>
      </footer>

      {/* 9. Floating WhatsApp Button */}
      <a 
        href="https://wa.me/971525265001?text=Namaste%20Maratha%20Darbar%2C%20mujhe%20ek%20shahi%20dining%20anubhav%20ke%20liye%20table%20book%20karna%20hai." 
        target="_blank" 
        rel="noopener noreferrer"
        className="fixed bottom-10 right-10 z-[90] bg-[#25D366] text-white p-4 rounded-full shadow-[0_0_25px_rgba(37,211,102,0.4)] hover:scale-110 transition-transform duration-300 animate-bounce group"
      >
        <MessageCircle size={32} />
        <span className="absolute right-full mr-6 top-1/2 -translate-y-1/2 bg-[#050505]/95 backdrop-blur-xl border border-[#D4AF37]/30 text-[#FDFBF7] text-xs uppercase tracking-widest whitespace-nowrap px-6 py-3 rounded shadow-2xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none font-bold">
          Shahi Concierge
        </span>
      </a>

    </div>
  );
}