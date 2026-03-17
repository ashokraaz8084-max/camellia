import React, { useState, useEffect, useRef } from 'react';
import { 
  Menu as MenuIcon, X, MapPin, Phone, Clock, ChevronRight, 
  Star, Quote, Instagram, Facebook, MessageCircle, Flame
} from 'lucide-react';

// --- STYLES INJECTION ---
const customStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;1,400&family=Outfit:wght@300;400;500;600&display=swap');

  :root {
    --bg-dark: #0A0202; /* Very Dark Red / Black */
    --red-royal: #2A0404; /* Deep Royal Chettinad Red */
    --red-accent: #5C0A0A; /* Rich Spice Red */
    --gold: #D4AF37; /* Antique Temple Gold */
    --wood: #1F110B; /* Dark Wood Brown */
    --ivory: #FDFBF7; /* Warm Ivory */
  }

  body {
    background-color: var(--bg-dark);
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
    background: var(--bg-dark);
  }
  ::-webkit-scrollbar-thumb {
    background: var(--red-accent);
    border-radius: 10px;
  }
  ::-webkit-scrollbar-thumb:hover {
    background: var(--gold);
  }

  .font-playfair {
    font-family: 'Playfair Display', serif;
  }

  /* Traditional Texture Overlay */
  .bg-chettinad {
    background-color: var(--bg-dark);
    background-image: url("https://www.transparenttextures.com/patterns/arabesque.png"); /* Acts as a subtle Kolam/heritage pattern */
    background-blend-mode: overlay;
    opacity: 0.98;
  }

  /* Animations */
  @keyframes kenburns {
    0% { transform: scale(1); }
    100% { transform: scale(1.12); }
  }
  .animate-kenburns {
    animation: kenburns 40s ease-in-out infinite alternate;
  }

  @keyframes float {
    0% { transform: translateY(0px); }
    50% { transform: translateY(-10px); }
    100% { transform: translateY(0px); }
  }
  .animate-float {
    animation: float 6s ease-in-out infinite;
  }

  /* Glassmorphism & Luxury Utilities */
  .glass {
    background: rgba(10, 2, 2, 0.8);
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
    border-bottom: 1px solid rgba(212, 175, 55, 0.1);
  }

  .glass-card {
    background: linear-gradient(145deg, rgba(42, 4, 4, 0.6) 0%, rgba(10, 2, 2, 0.95) 100%);
    backdrop-filter: blur(16px);
    border: 1px solid rgba(212, 175, 55, 0.15);
    box-shadow: 0 10px 40px 0 rgba(0, 0, 0, 0.8);
    transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
  }
  
  .glass-card:hover {
    border-color: rgba(212, 175, 55, 0.5); /* Gold glow on hover */
    box-shadow: 0 15px 50px 0 rgba(212, 175, 55, 0.15);
    transform: translateY(-6px);
  }

  .gold-gradient-text {
    background: linear-gradient(to right, #D4AF37, #FFF2CD, #AA8222, #FFF2CD, #D4AF37);
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
    text-shadow: 0 0 30px rgba(212, 175, 55, 0.4);
  }

  /* Dark Luxury Map */
  .map-dark {
    filter: invert(100%) hue-rotate(180deg) brightness(80%) contrast(130%) sepia(50%) hue-rotate(-20deg);
  }

  .spice-glow {
    background: radial-gradient(circle, rgba(212,175,55,0.08) 0%, rgba(0,0,0,0) 65%);
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
  const [activeMenuTab, setActiveMenuTab] = useState('Main Course');
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
      const phone = "971551346057";
      const message = `*Royal Reservation - Karaikudi Aachi* 👑\n\n*Name:* ${formData.name}\n*Contact:* ${formData.phone}\n*Guests:* ${formData.guests}\n*Date:* ${formData.date}\n*Time:* ${formData.time}\n\nI would like to request a table for an authentic Chettinad dining experience.`;
      const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
      window.open(url, "_blank");
      setIsSubmitting(false);
      
      setFormData({name: '', phone: '', guests: '2', date: '', time: ''});
    }, 1200);
  };

  // --- MENU DATA ---
  const menuData = {
    "Starters": [
      { name: 'Aachi Pepper Quail', desc: 'Farm-raised quail, marinated in freshly ground black pepper, fennel, and curry leaves, pan-roasted to perfection.', price: 'AED 85', img: 'https://image2url.com/r2/default/images/1773770086296-8ec9a49a-fca7-4a5c-8929-66200cba760e.jpg' },
      { name: 'Kola Urundai', desc: 'Melt-in-the-mouth spiced minced mutton meatballs, deep-fried until golden, served with coconut chutney.', price: 'AED 75', img: 'https://image2url.com/r2/default/images/1773770014780-126cca91-0011-4b23-86c7-26c1e6c7c1b6.jpg' },
      { name: 'Nethili Meen Varuval', desc: 'Crispy anchovies marinated in fiery Karaikudi red chilies and dusted with rice flour.', price: 'AED 65', img: 'https://image2url.com/r2/default/images/1773770053567-e878c456-1837-4987-8b4a-f582d464c8d2.jpg' }
    ],
    "Main Course": [
      { name: 'Authentic Chettinad Chicken', desc: 'Our signature dish. Tender chicken simmered in a complex gravy of 18 hand-pounded spices, star anise, and kalpasi.', price: 'AED 95', img: 'https://image2url.com/r2/default/images/1773770014780-126cca91-0011-4b23-86c7-26c1e6c7c1b6.jpg' },
      { name: 'Karaikudi Mutton Chukka', desc: 'Premium cuts of mutton slow-roasted with shallots, garlic, and copious amounts of fresh black pepper.', price: 'AED 120', img: 'https://image2url.com/r2/default/images/1773770053567-e878c456-1837-4987-8b4a-f582d464c8d2.jpg' },
      { name: 'Prawn Thokku', desc: 'Fresh tiger prawns tossed in a thick, tangy, and spicy onion-tomato masala reduction.', price: 'AED 140', img: 'https://image2url.com/r2/default/images/1773770086296-8ec9a49a-fca7-4a5c-8929-66200cba760e.jpg' }
    ],
    "South Indian Specials": [
      { name: 'Meen Kuzhambu', desc: 'A tangy, earthy fish curry prepared in a clay pot with tamarind, fenugreek, and fresh coconut milk.', price: 'AED 110', img: 'https://image2url.com/r2/default/images/1773770086296-8ec9a49a-fca7-4a5c-8929-66200cba760e.jpg' },
      { name: 'Ennai Kathirikai', desc: 'Baby eggplants stuffed with roasted peanuts, sesame, and spices, simmered in a rich tamarind gravy.', price: 'AED 75', img: 'https://image2url.com/r2/default/images/1773770053567-e878c456-1837-4987-8b4a-f582d464c8d2.jpg' }
    ],
    "Breads": [
      { name: 'Veechu Parotta', desc: 'Extraordinarily thin, flaky, and layered flatbread, hand-tossed and cooked on a hot griddle.', price: 'AED 20', img: 'https://image2url.com/r2/default/images/1773770014780-126cca91-0011-4b23-86c7-26c1e6c7c1b6.jpg' },
      { name: 'Kal Dosa', desc: 'Soft, spongy, and thick rice crepes, perfect for soaking up rich Chettinad gravies.', price: 'AED 25', img: 'https://image2url.com/r2/default/images/1773770053567-e878c456-1837-4987-8b4a-f582d464c8d2.jpg' }
    ],
    "Desserts": [
      { name: 'Kavuni Arisi Payasam', desc: 'A royal dessert made from black glutinous rice, coconut milk, jaggery, and roasted cashews.', price: 'AED 45', img: 'https://image2url.com/r2/default/images/1773770086296-8ec9a49a-fca7-4a5c-8929-66200cba760e.jpg' },
      { name: 'Elaneer Payasam', desc: 'A delicate, cooling dessert blending tender coconut flesh, coconut water, and condensed milk.', price: 'AED 50', img: 'https://image2url.com/r2/default/images/1773770014780-126cca91-0011-4b23-86c7-26c1e6c7c1b6.jpg' }
    ]
  };

  const galleryImages = [
    'https://image2url.com/r2/default/images/1773770014780-126cca91-0011-4b23-86c7-26c1e6c7c1b6.jpg', 
    'https://image2url.com/r2/default/images/1773770053567-e878c456-1837-4987-8b4a-f582d464c8d2.jpg', 
    'https://image2url.com/r2/default/images/1773770086296-8ec9a49a-fca7-4a5c-8929-66200cba760e.jpg', 
    'https://image2url.com/r2/default/images/1773770053567-e878c456-1837-4987-8b4a-f582d464c8d2.jpg', 
    'https://image2url.com/r2/default/images/1773770086296-8ec9a49a-fca7-4a5c-8929-66200cba760e.jpg', 
    'https://image2url.com/r2/default/images/1773770014780-126cca91-0011-4b23-86c7-26c1e6c7c1b6.jpg', 
  ];

  if (isLoading) {
    return (
      <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#0A0202] bg-chettinad">
        <div className="relative flex items-center justify-center mb-10">
           <div className="absolute w-36 h-36 border-2 border-[#D4AF37] border-dashed rounded-full animate-[spin_6s_linear_infinite] opacity-60"></div>
           <div className="absolute w-28 h-28 border border-[#D4AF37] rounded-full animate-[spin_4s_linear_infinite_reverse] opacity-40"></div>
           <Flame className="text-[#D4AF37] w-10 h-10 opacity-0 animate-[fadeIn_1s_ease-out_0.5s_forwards]" />
        </div>
        <div className="text-center relative z-10">
          <h1 className="font-playfair text-3xl md:text-5xl text-[#D4AF37] tracking-[0.2em] mb-4 opacity-0 animate-[fadeIn_1s_ease-out_1s_forwards]">KARAIKUDI AACHI</h1>
          <div className="h-[1px] w-0 bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent mx-auto animate-[expand_1.5s_ease-out_1.5s_forwards]"></div>
          <p className="uppercase tracking-[0.4em] text-[0.65rem] mt-5 text-[#FDFBF7]/60 opacity-0 animate-[fadeIn_1s_ease-out_2s_forwards]">Cultural Luxury • Dubai</p>
          <style>{`
            @keyframes expand { to { w-full; max-width: 250px; width: 250px; } }
            @keyframes fadeIn { to { opacity: 1; } }
          `}</style>
        </div>
      </div>
    );
  }

  return (
    <div className="relative bg-[#0A0202] bg-chettinad min-h-screen text-[#FDFBF7] selection:bg-[#D4AF37] selection:text-black">
      
      {/* Navigation */}
      <nav className={`fixed w-full z-50 transition-all duration-700 ${scrolled ? 'glass py-5' : 'bg-transparent py-8'}`}>
        <div className="container mx-auto px-6 md:px-14 flex justify-between items-center">
          <div className="flex flex-col">
            <a href="#" className="font-playfair text-xl md:text-2xl tracking-[0.2em] text-[#D4AF37] font-semibold leading-none">
              KARAIKUDI AACHI
            </a>
          </div>
          
          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center space-x-12">
            {[
              { id: 'story', label: 'Heritage' },
              { id: 'signatures', label: 'Signatures' },
              { id: 'menu', label: 'Menu' },
              { id: 'gallery', label: 'Gallery' }
            ].map((item) => (
              <a key={item.id} href={`#${item.id}`} className="text-xs uppercase tracking-[0.2em] text-[#FDFBF7]/80 hover:text-[#D4AF37] transition-all duration-300 relative group font-medium">
                {item.label}
                <span className="absolute -bottom-2 left-1/2 w-0 h-[1px] bg-[#D4AF37] transition-all duration-300 group-hover:w-full group-hover:left-0"></span>
              </a>
            ))}
            <a href="#book" className="px-8 py-3 bg-transparent border border-[#D4AF37]/50 text-[#D4AF37] text-xs uppercase tracking-widest hover:bg-[#D4AF37] hover:text-[#0A0202] transition-all duration-500 shadow-[0_0_15px_rgba(212,175,55,0)] hover:shadow-[0_0_25px_rgba(212,175,55,0.3)] font-medium">
              Reserve Table
            </a>
          </div>

          {/* Mobile Nav Toggle */}
          <button className="lg:hidden text-[#D4AF37]" onClick={() => setIsNavOpen(!isNavOpen)}>
            {isNavOpen ? <X size={28} strokeWidth={1.5} /> : <MenuIcon size={28} strokeWidth={1.5} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div className={`fixed inset-0 z-40 bg-gradient-to-b from-[#0A0202] to-[#2A0404] flex flex-col items-center justify-center space-y-10 transition-all duration-700 ${isNavOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`}>
        {[
          { id: 'story', label: 'Heritage' },
          { id: 'signatures', label: 'Signatures' },
          { id: 'menu', label: 'Menu' },
          { id: 'gallery', label: 'Gallery' }
        ].map((item) => (
          <a key={item.id} href={`#${item.id}`} onClick={() => setIsNavOpen(false)} className="font-playfair text-3xl text-white hover:text-[#D4AF37] transition-colors">
            {item.label}
          </a>
        ))}
        <a href="#book" onClick={() => setIsNavOpen(false)} className="mt-8 px-12 py-4 bg-[#D4AF37] text-[#0A0202] font-medium tracking-[0.2em] uppercase text-xs">
          Reserve Table
        </a>
      </div>

      {/* 1. Hero Section */}
      <section className="relative h-screen w-full flex items-center justify-center overflow-hidden">
        {/* Cinematic Background */}
        <div className="absolute inset-0 z-0">
          <img 
            src="https://image2url.com/r2/default/images/1773770053567-e878c456-1837-4987-8b4a-f582d464c8d2.jpg" 
            alt="Chettinad Cuisine" 
            className="w-full h-full object-cover animate-kenburns opacity-50"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0A0202]/90 via-[#2A0404]/60 to-[#0A0202]"></div>
          
          {/* Subtle Warm Glow Effect */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none mix-blend-screen">
             <div className="absolute top-1/3 left-1/4 w-[30rem] h-[30rem] bg-[#D4AF37]/10 rounded-full blur-[150px] animate-float"></div>
          </div>
        </div>

        <div className="relative z-10 text-center px-4 max-w-5xl mx-auto flex flex-col items-center mt-16">
          <RevealOnScroll delay={100}>
            <div className="flex items-center justify-center space-x-4 mb-6">
              <span className="w-12 h-[1px] bg-[#D4AF37]"></span>
              <p className="uppercase tracking-[0.4em] text-[#D4AF37] text-[0.65rem] md:text-xs font-medium">Dubai, United Arab Emirates</p>
              <span className="w-12 h-[1px] bg-[#D4AF37]"></span>
            </div>
          </RevealOnScroll>
          <RevealOnScroll delay={300}>
            <h1 className="font-playfair text-5xl md:text-7xl lg:text-[6.5rem] text-white mb-6 leading-[1.1]">
              Authentic Chettinad Flavors, <br/>
              <span className="gold-gradient-text text-glow italic">Crafted in Luxury</span>
            </h1>
          </RevealOnScroll>
          <RevealOnScroll delay={500}>
            <p className="text-[#FDFBF7]/80 text-base md:text-lg font-light max-w-2xl mx-auto mb-14 leading-relaxed">
              Step into an era of majestic mansions and secret spice blends. We elevate the rich, emotional heritage of Tamil Nadu into a world-class premium dining experience.
            </p>
          </RevealOnScroll>
          <RevealOnScroll delay={700}>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <a href="#book" className="px-12 py-4 bg-[#D4AF37] text-[#0A0202] text-xs uppercase tracking-[0.2em] font-semibold hover:bg-white transition-all duration-500 shadow-[0_0_20px_rgba(212,175,55,0.4)] hover:shadow-[0_0_30px_rgba(255,255,255,0.5)]">
                Reserve Your Table
              </a>
              <a href="#menu" className="px-12 py-4 border border-[#D4AF37]/50 text-[#D4AF37] text-xs uppercase tracking-[0.2em] font-medium hover:border-[#D4AF37] hover:bg-[#D4AF37]/10 glass transition-all duration-500">
                Explore Menu
              </a>
            </div>
          </RevealOnScroll>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 z-10 animate-float">
          <div className="w-[1px] h-20 bg-gradient-to-b from-[#D4AF37] to-transparent mx-auto opacity-70"></div>
        </div>
      </section>

      {/* 2. About / Story Section */}
      <section id="story" className="py-24 md:py-32 relative bg-[#0A0202]">
        <div className="container mx-auto px-6 md:px-14">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 lg:gap-24 items-center">
            <RevealOnScroll direction="right">
              <div className="relative group">
                <div className="absolute -inset-2 border border-[#D4AF37]/20 translate-x-4 translate-y-4 transition-transform duration-700 group-hover:translate-x-2 group-hover:translate-y-2"></div>
                <img 
                  src="https://image2url.com/r2/default/images/1773770014780-126cca91-0011-4b23-86c7-26c1e6c7c1b6.jpg" 
                  alt="Chettinad Heritage" 
                  className="relative z-10 w-full h-[650px] object-cover grayscale-[20%] hover:grayscale-0 transition-all duration-1000 shadow-[0_20px_50px_rgba(0,0,0,0.8)]"
                />
                <div className="absolute bottom-12 -left-8 bg-[#1F110B]/95 backdrop-blur-md p-10 border border-[#D4AF37]/20 z-20 shadow-2xl hidden md:block">
                  <p className="font-playfair text-4xl text-[#D4AF37] mb-2">Heritage</p>
                  <p className="text-[0.65rem] uppercase tracking-[0.3em] text-[#FDFBF7]/70">The Aachi's Secret</p>
                </div>
              </div>
            </RevealOnScroll>
            
            <RevealOnScroll direction="left" delay={200}>
              <div className="max-w-xl pl-0 md:pl-8">
                <h3 className="uppercase tracking-[0.3em] text-[#D4AF37] text-[0.65rem] mb-6 flex items-center font-medium">
                  <span className="w-10 h-[1px] bg-[#D4AF37] mr-4"></span> The Tradition
                </h3>
                <h2 className="font-playfair text-4xl md:text-5xl lg:text-6xl mb-10 leading-[1.2] text-white">
                  A Legacy of <br/><span className="italic text-[#D4AF37]">Spices & Royalty</span>
                </h2>
                <p className="text-[#FDFBF7]/70 leading-relaxed font-light mb-6 text-sm md:text-base">
                  Karaikudi Aachi is an ode to the grandiose mansions and masterful culinary matriarchs (Aachis) of the Chettinad region. We have painstakingly preserved recipes passed down through generations, ensuring every dish resonates with the warmth of a traditional South Indian home.
                </p>
                <p className="text-[#FDFBF7]/70 leading-relaxed font-light mb-12 text-sm md:text-base">
                  From sun-dried red chilies and hand-ground kalpasi (black stone flower) to the slow-cooking in brass vessels, our meticulous process guarantees an emotional, royal, and highly luxurious dining experience in the heart of Dubai.
                </p>
                <div className="flex items-center space-x-6 border-t border-[#D4AF37]/10 pt-10">
                  <div className="w-16 h-16 rounded-full border border-[#D4AF37]/30 flex items-center justify-center bg-[#D4AF37]/5">
                    <span className="font-playfair italic text-xl text-[#D4AF37]">KA</span>
                  </div>
                  <div>
                    <p className="text-xs tracking-[0.2em] uppercase text-[#D4AF37] font-medium">Authentic Masterchefs</p>
                    <p className="text-[0.65rem] tracking-widest text-[#FDFBF7]/50 mt-1">Culinary Heritage</p>
                  </div>
                </div>
              </div>
            </RevealOnScroll>
          </div>
        </div>
      </section>

      {/* 3. Signature Dishes Highlight */}
      <section id="signatures" className="py-24 md:py-32 relative border-y border-[#D4AF37]/10 bg-[#0A0202]">
        <div className="spice-glow absolute inset-0 opacity-40 pointer-events-none"></div>
        <div className="container mx-auto px-6 md:px-14 text-center relative z-10">
          <RevealOnScroll>
            <h3 className="uppercase tracking-[0.3em] text-[#D4AF37] text-[0.65rem] mb-4 font-medium">The Crown Jewels</h3>
            <h2 className="font-playfair text-4xl md:text-5xl lg:text-6xl mb-6 text-white">Signature Creations</h2>
            <div className="w-16 h-[1px] bg-[#D4AF37] mx-auto mb-20"></div>
          </RevealOnScroll>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
            {[
              { title: "Authentic Chettinad Chicken", desc: "Tender chicken simmered in a complex gravy of 18 hand-pounded spices, star anise, and kalpasi.", img: "https://image2url.com/r2/default/images/1773770014780-126cca91-0011-4b23-86c7-26c1e6c7c1b6.jpg" },
              { title: "Karaikudi Mutton Chukka", desc: "Premium cuts of mutton slow-roasted with shallots, garlic, and copious amounts of fresh black pepper.", img: "https://image2url.com/r2/default/images/1773770053567-e878c456-1837-4987-8b4a-f582d464c8d2.jpg" },
              { title: "Meen Kuzhambu", desc: "A tangy, earthy fish curry prepared in a clay pot with tamarind, fenugreek, and fresh coconut milk.", img: "https://image2url.com/r2/default/images/1773770086296-8ec9a49a-fca7-4a5c-8929-66200cba760e.jpg" }
            ].map((dish, idx) => (
              <RevealOnScroll key={idx} delay={idx * 200}>
                <div className="glass-card h-full flex flex-col group overflow-hidden p-3 border border-[#D4AF37]/20 rounded-sm">
                  <div className="w-full h-72 overflow-hidden relative rounded-sm">
                     <div className="absolute inset-0 bg-[#2A0404]/30 group-hover:bg-transparent transition-all duration-700 z-10 mix-blend-overlay"></div>
                     <img src={dish.img} alt={dish.title} className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-1000 grayscale-[15%]" />
                  </div>
                  <div className="p-8 text-center flex-grow flex flex-col justify-center">
                    <h4 className="font-playfair text-2xl text-[#D4AF37] mb-4 group-hover:text-white transition-colors">{dish.title}</h4>
                    <p className="text-[#FDFBF7]/60 font-light leading-relaxed text-sm">{dish.desc}</p>
                  </div>
                </div>
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Full Menu Section */}
      <section id="menu" className="py-24 md:py-32 relative overflow-hidden bg-gradient-to-b from-[#0A0202] via-[#1F110B] to-[#0A0202]">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#5C0A0A] rounded-full blur-[250px] opacity-[0.08] pointer-events-none"></div>
        
        <div className="container mx-auto px-6 md:px-14 relative z-10">
          <div className="text-center mb-16">
            <RevealOnScroll>
              <h3 className="uppercase tracking-[0.3em] text-[#D4AF37] text-[0.65rem] mb-4 font-medium">A Symphony of Spice</h3>
              <h2 className="font-playfair text-4xl md:text-5xl lg:text-6xl mb-6 text-white">The Menu</h2>
              <div className="w-16 h-[1px] bg-[#D4AF37] mx-auto"></div>
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
                    activeMenuTab === category ? 'border-[#D4AF37] text-white' : 'border-transparent text-[#FDFBF7]/50 hover:text-[#D4AF37]'
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
                <div className="group flex flex-col gap-4 border-b border-[#D4AF37]/10 pb-6 hover:border-[#D4AF37]/50 transition-colors duration-500 cursor-pointer">
                  <div className="flex justify-between items-baseline">
                    <h4 className="font-playfair text-xl md:text-2xl text-white group-hover:text-[#D4AF37] transition-colors">{item.name}</h4>
                    <span className="text-[#D4AF37] font-medium tracking-widest text-sm border-b border-[#D4AF37] pb-1">{item.price}</span>
                  </div>
                  <p className="text-[#FDFBF7]/60 font-light text-sm leading-relaxed max-w-md">{item.desc}</p>
                </div>
              </RevealOnScroll>
            ))}
          </div>
          
          <div className="mt-24 text-center">
             <RevealOnScroll>
               <a href="#book" className="inline-flex items-center text-[#D4AF37] text-xs uppercase tracking-[0.2em] hover:text-white transition-colors group font-medium">
                 <span className="border-b border-transparent group-hover:border-white pb-1 transition-all">Download Full Experience Menu</span>
                 <ChevronRight className="ml-2 w-4 h-4 transform group-hover:translate-x-2 transition-transform"/>
               </a>
             </RevealOnScroll>
          </div>
        </div>
      </section>

      {/* 5. Cultural Gallery Section */}
      <section id="gallery" className="py-24 md:py-32 bg-[#0A0202]">
        <div className="container mx-auto px-6 md:px-14">
           <RevealOnScroll>
            <div className="flex flex-col md:flex-row justify-between items-end mb-20 border-b border-[#D4AF37]/10 pb-10">
              <div>
                <h3 className="uppercase tracking-[0.3em] text-[#D4AF37] text-[0.65rem] mb-4 font-medium">Visual Aesthetics</h3>
                <h2 className="font-playfair text-4xl md:text-5xl lg:text-6xl text-white">The Royal Ambiance</h2>
              </div>
              <p className="text-[#FDFBF7]/60 max-w-sm font-light mt-6 md:mt-0 text-sm md:text-base">
                Discover the architectural grandeur, dark wooden carvings, and flawless presentation that define Karaikudi Aachi.
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
                   <div className="absolute inset-0 bg-[#0A0202]/50 group-hover:bg-[#2A0404]/10 transition-colors duration-700 z-10 mix-blend-overlay"></div>
                   <img 
                     src={src} 
                     alt="Gallery" 
                     className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-[2s] grayscale-[15%]"
                     loading="lazy"
                   />
                   <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-700 z-20">
                     <span className="bg-[#0A0202]/90 backdrop-blur-md text-[#D4AF37] px-8 py-3 uppercase tracking-[0.2em] text-[0.65rem] border border-[#D4AF37]/40 shadow-[0_0_20px_rgba(212,175,55,0.2)] font-medium">View Details</span>
                   </div>
                 </div>
               </RevealOnScroll>
             ))}
           </div>
        </div>
      </section>

      {/* Lightbox */}
      {lightboxImg && (
        <div className="fixed inset-0 z-[100] bg-[#0A0202]/95 backdrop-blur-2xl flex items-center justify-center p-4" onClick={() => setLightboxImg(null)}>
          <button className="absolute top-10 right-10 text-white/50 hover:text-[#D4AF37] transition-colors" onClick={() => setLightboxImg(null)}>
            <X size={44} strokeWidth={1.5}/>
          </button>
          <img src={lightboxImg} alt="Enlarged" className="max-w-full max-h-[90vh] object-contain shadow-2xl border border-[#D4AF37]/20" />
        </div>
      )}

      {/* 6. Testimonials */}
      <section id="testimonials" className="py-24 md:py-32 relative border-t border-[#D4AF37]/10 bg-[#0A0202]">
         <div className="container mx-auto px-6 md:px-14 text-center">
            <RevealOnScroll>
              <div className="flex justify-center mb-8">
                 <div className="w-12 h-12 rounded-full border border-[#D4AF37]/40 flex items-center justify-center">
                   <Quote className="w-4 h-4 text-[#D4AF37]" />
                 </div>
              </div>
              <h2 className="font-playfair text-4xl md:text-5xl text-white mb-24">Eminent Reviews</h2>
            </RevealOnScroll>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
              {[
                { name: "Arjun K.", role: "Culinary Editor", text: "A breathtaking descent into culinary perfection. The Chettinad Chicken is a revelation, and the ambiance is unmatched in Dubai's fine dining scene." },
                { name: "Priya S.", role: "Global Gourmand", text: "Karaikudi Aachi feels like an exclusive, royal secret. The heritage-inspired aesthetic paired with flawless execution makes this a masterpiece." },
                { name: "Julian H.", role: "Lifestyle Curator", text: "From the dramatic spice presentation to the melt-in-mouth Mutton Chukka, every second here is absolute luxury." }
              ].map((review, idx) => (
                <RevealOnScroll key={idx} delay={idx * 200}>
                  <div className="glass-card p-12 text-left h-full flex flex-col justify-between hover:-translate-y-3 transition-transform duration-700 rounded-sm">
                    <div>
                      <div className="flex text-[#D4AF37] mb-8 space-x-1">
                        {[...Array(5)].map((_, i) => <Star key={i} size={14} fill="currentColor" />)}
                      </div>
                      <p className="text-[#FDFBF7]/80 font-light leading-loose mb-10 text-sm">"{review.text}"</p>
                    </div>
                    <div className="border-t border-[#D4AF37]/10 pt-8 flex items-center">
                      <div>
                        <h4 className="font-playfair text-lg text-white">{review.name}</h4>
                        <p className="text-[#D4AF37] text-[0.6rem] uppercase tracking-[0.2em] mt-2 font-medium">{review.role}</p>
                      </div>
                    </div>
                  </div>
                </RevealOnScroll>
              ))}
            </div>
         </div>
      </section>

      {/* 8 & 7. Booking & Map Section */}
      <section id="book" className="py-0 flex flex-col md:flex-row bg-[#0A0202] border-t border-[#D4AF37]/10">
        
        {/* Reservation Form */}
        <div className="w-full md:w-1/2 p-8 md:p-24 flex items-center justify-center relative bg-[#1F110B]/30">
          <div className="w-full max-w-lg relative z-10">
            <RevealOnScroll>
              <h3 className="uppercase tracking-[0.3em] text-[#D4AF37] text-[0.65rem] mb-4 font-medium">Reservations</h3>
              <h2 className="font-playfair text-4xl md:text-5xl lg:text-6xl mb-8 text-white">Secure Your Table</h2>
              <p className="text-[#FDFBF7]/60 font-light mb-14 text-sm leading-relaxed">Due to our exclusive capacity, reservations are highly recommended. For private dining inquiries, utilize our direct concierge.</p>
            </RevealOnScroll>

            <RevealOnScroll delay={200}>
              <form onSubmit={handleBookTable} className="space-y-12">
                <div className="group relative">
                  <input type="text" required value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} placeholder="Distinguished Guest Name" className="w-full bg-transparent border-b border-[#D4AF37]/30 pb-4 text-white focus:outline-none focus:border-[#D4AF37] transition-colors font-light placeholder-[#FDFBF7]/40 text-sm" />
                </div>
                <div className="group relative">
                  <input type="tel" required value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})} placeholder="Contact Telephone" className="w-full bg-transparent border-b border-[#D4AF37]/30 pb-4 text-white focus:outline-none focus:border-[#D4AF37] transition-colors font-light placeholder-[#FDFBF7]/40 text-sm" />
                </div>
                <div className="grid grid-cols-2 gap-10">
                  <div className="group relative">
                    <select value={formData.guests} onChange={(e) => setFormData({...formData, guests: e.target.value})} className="w-full bg-transparent border-b border-[#D4AF37]/30 pb-4 text-white focus:outline-none focus:border-[#D4AF37] transition-colors font-light appearance-none cursor-pointer text-sm">
                      <option value="1" className="bg-[#0A0202] text-white">1 Guest</option>
                      <option value="2" className="bg-[#0A0202] text-white">2 Guests</option>
                      <option value="3" className="bg-[#0A0202] text-white">3 Guests</option>
                      <option value="4" className="bg-[#0A0202] text-white">4 Guests</option>
                      <option value="5" className="bg-[#0A0202] text-white">5 Guests</option>
                      <option value="6" className="bg-[#0A0202] text-white">6+ Guests (Private)</option>
                    </select>
                  </div>
                  <div className="group relative">
                    <input type="date" required value={formData.date} onChange={(e) => setFormData({...formData, date: e.target.value})} className="w-full bg-transparent border-b border-[#D4AF37]/30 pb-4 text-[#FDFBF7] focus:outline-none focus:border-[#D4AF37] transition-colors font-light [color-scheme:dark] text-sm" />
                  </div>
                </div>
                <div className="group relative">
                  <input type="time" required value={formData.time} onChange={(e) => setFormData({...formData, time: e.target.value})} className="w-full bg-transparent border-b border-[#D4AF37]/30 pb-4 text-[#FDFBF7] focus:outline-none focus:border-[#D4AF37] transition-colors font-light [color-scheme:dark] text-sm" />
                </div>
                <button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="w-full mt-16 py-5 bg-[#D4AF37] text-[#0A0202] uppercase tracking-[0.2em] font-semibold hover:bg-white transition-all duration-500 disabled:opacity-70 flex justify-center items-center group shadow-[0_0_20px_rgba(212,175,55,0.3)] text-xs"
                >
                  {isSubmitting ? 'Finalizing Details...' : 'Confirm Reservation'}
                  {!isSubmitting && <ChevronRight className="ml-3 w-4 h-4 transform group-hover:translate-x-2 transition-transform"/>}
                </button>
              </form>
            </RevealOnScroll>
          </div>
        </div>

        {/* 7. Google Map Integration */}
        <div className="w-full md:w-1/2 h-[600px] md:h-auto relative grayscale-[40%] hover:grayscale-0 transition-all duration-1000 border-l border-[#D4AF37]/10">
           {/* Exact Location: Dubai (Centered generally for high-end aesthetic) */}
           <iframe 
             src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d115456.96417757966!2d55.19503461718501!3d25.267888768370123!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f43496ad9c645%3A0xbde66e5084295162!2sDubai%20-%20United%20Arab%20Emirates!5e0!3m2!1sen!2sus!4v1710000000000!5m2!1sen!2sus" 
             className="w-full h-full border-0 map-dark" 
             allowFullScreen="" 
             loading="lazy" 
             referrerPolicy="no-referrer-when-downgrade"
             title="Karaikudi Aachi Location"
           ></iframe>
           <div className="absolute inset-0 bg-[#0A0202]/40 pointer-events-none mix-blend-overlay"></div>
        </div>

      </section>

      {/* 10. Footer */}
      <footer className="bg-[#050101] pt-24 pb-12 border-t border-[#D4AF37]/20 relative overflow-hidden bg-chettinad">
        
        <div className="container mx-auto px-6 md:px-14 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 lg:gap-16 mb-24">
            <div className="md:col-span-1">
              <h2 className="font-playfair text-2xl text-[#D4AF37] tracking-[0.2em] mb-4 leading-none">KARAIKUDI AACHI</h2>
              <p className="text-[#FDFBF7]/50 font-light text-xs leading-relaxed mb-8 pr-4">
                Redefining the essence of Chettinad heritage and modern South Indian fine dining in the heart of Dubai.
              </p>
              <div className="flex space-x-6 text-[#D4AF37]">
                <a href="#" className="hover:text-white transition-colors hover:scale-110 transform duration-300"><Instagram size={18} strokeWidth={1.5} /></a>
                <a href="#" className="hover:text-white transition-colors hover:scale-110 transform duration-300"><Facebook size={18} strokeWidth={1.5} /></a>
              </div>
            </div>
            
            <div>
              <h4 className="text-white uppercase tracking-[0.2em] text-[0.65rem] mb-8 font-medium">Contact & Location</h4>
              <ul className="space-y-6 text-[#FDFBF7]/60 font-light text-xs">
                <li className="flex items-center"><Phone size={14} className="mr-4 text-[#D4AF37]"/> +971 55 134 6057</li>
                <li className="flex items-start">
                  <MapPin size={14} className="mr-4 mt-1 shrink-0 text-[#D4AF37]"/> 
                  Dubai,<br/>United Arab Emirates
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-white uppercase tracking-[0.2em] text-[0.65rem] mb-8 font-medium">Dining Hours</h4>
              <ul className="space-y-6 text-[#FDFBF7]/60 font-light text-xs">
                <li className="flex items-start"><Clock size={14} className="mr-4 mt-1 shrink-0 text-[#D4AF37]"/> 
                  <div>
                    <span className="block text-white mb-2">Dinner Service</span>
                    Monday - Sunday<br/>
                    18:30 - 23:30
                  </div>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-white uppercase tracking-[0.2em] text-[0.65rem] mb-8 font-medium">The Society</h4>
              <p className="text-[#FDFBF7]/60 font-light text-xs mb-6 leading-relaxed">Subscribe for private event access and seasonal tasting menu reveals.</p>
              <div className="flex border-b border-[#D4AF37]/30 pb-3 group">
                <input type="email" placeholder="Email Address" className="bg-transparent w-full focus:outline-none text-xs font-light text-white placeholder-[#FDFBF7]/40" />
                <button className="text-[#D4AF37] group-hover:text-white transition-colors"><ChevronRight size={18} strokeWidth={1.5}/></button>
              </div>
            </div>
          </div>

          <div className="border-t border-[#D4AF37]/20 pt-8 flex flex-col md:flex-row justify-between items-center text-[0.65rem] text-[#FDFBF7]/40 tracking-[0.15em] uppercase font-light">
            <p>&copy; {new Date().getFullYear()} Karaikudi Aachi. All rights reserved.</p>
            <div className="flex space-x-8 mt-6 md:mt-0">
              <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>

      {/* 9. Floating WhatsApp Button */}
      <a 
        href="https://wa.me/971551346057?text=Hello%20Karaikudi%20Aachi%2C%20I%20would%20like%20to%20reserve%20a%20table%20for%20an%20authentic%20dining%20experience." 
        target="_blank" 
        rel="noopener noreferrer"
        className="fixed bottom-10 right-10 z-[90] bg-transparent border border-[#D4AF37]/50 text-[#D4AF37] p-4 rounded-full shadow-[0_0_20px_rgba(212,175,55,0.3)] hover:scale-110 hover:bg-[#D4AF37] hover:text-[#0A0202] transition-all duration-500 glass group flex items-center justify-center"
      >
        <MessageCircle size={24} strokeWidth={1.5} />
        <span className="absolute right-full mr-6 top-1/2 -translate-y-1/2 bg-[#0A0202]/90 backdrop-blur-xl border border-[#D4AF37]/30 text-[#FDFBF7] text-[0.65rem] uppercase tracking-widest whitespace-nowrap px-6 py-3 rounded-sm shadow-2xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none font-light">
          Private Concierge
        </span>
      </a>

    </div>
  );
}