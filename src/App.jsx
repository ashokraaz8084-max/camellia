import React, { useState, useEffect, useRef } from 'react';
import { 
  Menu as MenuIcon, X, MapPin, Phone, Clock, ChevronRight, 
  Star, Quote, Instagram, Facebook, MessageCircle, Info
} from 'lucide-react';

// --- STYLES INJECTION (Styles yahan inject kiye gaye hain) ---
const customStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500&family=Outfit:wght@300;400;500;600&display=swap');

  :root {
    --gold: #D4AF37;
    --gold-light: #F3E5AB;
    --dark: #0A0505; /* Bahut gehra kala rang */
    --maroon: #3A0B0B; /* Gehra shahi maroon */
    --maroon-dark: #1F0404;
    --ivory: #FFF8E7; /* Cream Ivory */
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
    width: 8px;
  }
  ::-webkit-scrollbar-track {
    background: var(--maroon-dark);
  }
  ::-webkit-scrollbar-thumb {
    background: var(--maroon);
    border-radius: 10px;
  }
  ::-webkit-scrollbar-thumb:hover {
    background: var(--gold);
  }

  .font-playfair {
    font-family: 'Playfair Display', serif;
  }

  /* Shahi Gujarati Mandala Pattern Overlay */
  .bg-mandala {
    background-color: var(--dark);
    background-image: url("https://www.transparenttextures.com/patterns/black-scales.png"); 
    background-blend-mode: overlay;
  }

  .bg-gradient-royal {
    background: radial-gradient(circle at 50% 50%, var(--maroon-dark) 0%, var(--dark) 100%);
  }

  /* Animations (Harkatein) */
  @keyframes kenburns {
    0% { transform: scale(1); }
    100% { transform: scale(1.15); }
  }
  .animate-kenburns {
    animation: kenburns 35s ease-in-out infinite alternate;
  }

  @keyframes float {
    0% { transform: translateY(0px); }
    50% { transform: translateY(-12px); }
    100% { transform: translateY(0px); }
  }
  .animate-float {
    animation: float 5s ease-in-out infinite;
  }

  @keyframes spin-slow {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
  .animate-spin-slow {
    animation: spin-slow 20s linear infinite;
  }

  /* Glassmorphism aur Luxury Utilities */
  .glass {
    background: rgba(10, 5, 5, 0.7);
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
    border-bottom: 1px solid rgba(212, 175, 55, 0.15);
  }

  .glass-card {
    background: linear-gradient(145deg, rgba(58,11,11,0.3) 0%, rgba(10,5,5,0.95) 100%);
    backdrop-filter: blur(12px);
    border: 1px solid rgba(212, 175, 55, 0.2);
    box-shadow: 0 10px 40px 0 rgba(0, 0, 0, 0.8);
    transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
  }
  
  .glass-card:hover {
    border-color: rgba(212, 175, 55, 0.6);
    box-shadow: 0 15px 50px 0 rgba(212, 175, 55, 0.15);
    transform: translateY(-5px);
  }

  .gold-gradient-text {
    background: linear-gradient(to right, #C59341, #F6DE9A, #C59341, #F6DE9A, #A67527);
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
    background-size: 200% auto;
    animation: shine 5s linear infinite;
  }

  @keyframes shine {
    to { background-position: 200% center; }
  }

  .text-glow {
    text-shadow: 0 0 30px rgba(212, 175, 55, 0.4);
  }

  .map-dark {
    filter: invert(100%) hue-rotate(180deg) brightness(80%) contrast(130%) sepia(40%) hue-rotate(-20deg);
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
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );
    if (ref.current) observer.observe(ref.current);
    return () => { if (ref.current) observer.unobserve(ref.current); };
  }, []);

  const getTransform = () => {
    if (isVisible) return 'translate-y-0 translate-x-0 opacity-100 scale-100';
    switch (direction) {
      case 'up': return 'translate-y-16 opacity-0 scale-95';
      case 'down': return '-translate-y-16 opacity-0 scale-95';
      case 'left': return 'translate-x-16 opacity-0 scale-95';
      case 'right': return '-translate-x-16 opacity-0 scale-95';
      default: return 'translate-y-16 opacity-0 scale-95';
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

// --- MAIN APP COMPONENT (Mukhya App Component) ---

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [activeMenuTab, setActiveMenuTab] = useState('Shahi Thali');
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [lightboxImg, setLightboxImg] = useState(null);

  // Form State (Form ka Data)
  const [formData, setFormData] = useState({
    name: '', phone: '', guests: '2', date: '', time: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    // Inject Styles (Styles lagana)
    const styleSheet = document.createElement("style");
    styleSheet.type = "text/css";
    styleSheet.innerText = customStyles;
    document.head.appendChild(styleSheet);

    // Simulate Premium Loading (Loading dikhana)
    setTimeout(() => setIsLoading(false), 3200);

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
      const phone = "971551204628";
      const message = `*Shahi Reservation Request - Gujarati Thal* 👑\n\n*Mehmaan Ka Naam:* ${formData.name}\n*Sampark:* ${formData.phone}\n*Mehmaan ki Sankhya:* ${formData.guests} Guests\n*Tareekh:* ${formData.date}\n*Samay:* ${formData.time}\n\nEk shandaar Gujarati dining anubhav ka intezaar hai.`;
      const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
      window.open(url, "_blank");
      setIsSubmitting(false);
      
      setFormData({name: '', phone: '', guests: '2', date: '', time: ''});
    }, 1200);
  };

  // --- MENU DATA (Naye Images ke sath) ---
  const menuData = {
    "Shahi Thali": [
      { name: 'Maharaja Gujarati Thali', desc: 'Ek anant shahi daawat jismein 3 Farsan, 4 Shaak, Kathol, Dal, Kadhi, Phulka, Puri, Chawal, Khichdi aur 2 khas Meetha shamil hain.', price: 'AED 120', img: 'https://image2url.com/r2/default/images/1773770014780-126cca91-0011-4b23-86c7-26c1e6c7c1b6.jpg' },
      { name: 'Rajwadi Jain Thali', desc: 'Puri tarah se shuddh Jain thali, bina zameen ke neeche ugane wali sabziyon ke, asli swad aur shuddhata ke sath.', price: 'AED 120', img: 'https://image2url.com/r2/default/images/1773770053567-e878c456-1837-4987-8b4a-f582d464c8d2.jpg' }
    ],
    "Khas Farsan": [
      { name: 'Saffron Khandvi', desc: 'Muh mein pighal jane wali besan ki khandvi, sarson ke tadke aur behtareen kesar ke swad ke sath.', price: 'AED 45', img: 'https://image2url.com/r2/default/images/1773770086296-8ec9a49a-fca7-4a5c-8929-66200cba760e.jpg' },
      { name: 'Surti Locho', desc: 'Garam aur masaledaar daal ka cake, pighle hue makkhan, sev aur hamari khas hari chutney ke sath.', price: 'AED 50', img: 'https://image2url.com/r2/default/images/1773770014780-126cca91-0011-4b23-86c7-26c1e6c7c1b6.jpg' },
      { name: 'Rajkot Patra', desc: 'Arbi ke patton par masaledar besan ka lep, bhap mein paka kar aur kurkura hone tak bhuna hua.', price: 'AED 45', img: 'https://image2url.com/r2/default/images/1773770053567-e878c456-1837-4987-8b4a-f582d464c8d2.jpg' }
    ],
    "Meetha": [
      { name: 'Alphonso Aam Ras', desc: 'Premium Alphonso aam ka shuddh aur meetha ras, thanda parosa jata hai (Mausami).', price: 'AED 55', img: 'https://image2url.com/r2/default/images/1773770086296-8ec9a49a-fca7-4a5c-8929-66200cba760e.jpg' },
      { name: 'Kesar Pista Shrikhand', desc: 'Gadha dahi jise fenta gaya hai, Kashmiri kesar aur Irani piste se bharpoor ek shandaar meetha.', price: 'AED 45', img: 'https://image2url.com/r2/default/images/1773770014780-126cca91-0011-4b23-86c7-26c1e6c7c1b6.jpg' },
      { name: 'Rajwadi Basundi', desc: 'Dheemi aanch par ghanton tak paka hua gadha doodh, chironji, badam aur sone ke warq ke sath.', price: 'AED 50', img: 'https://image2url.com/r2/default/images/1773770053567-e878c456-1837-4987-8b4a-f582d464c8d2.jpg' }
    ],
    "Peya (Beverages)": [
      { name: 'Smoked Masala Chaas', desc: 'Paramparik chaas jismein bhuna jeera, taza hara dhaniya aur koyele ka smoky flavor hai.', price: 'AED 25', img: 'https://image2url.com/r2/default/images/1773770086296-8ec9a49a-fca7-4a5c-8929-66200cba760e.jpg' },
      { name: 'Maharani Rose Milk', desc: 'Taze gulab ki pankhudiyon, chia seeds aur elaichi ki mehak ke sath thanda doodh.', price: 'AED 35', img: 'https://image2url.com/r2/default/images/1773770014780-126cca91-0011-4b23-86c7-26c1e6c7c1b6.jpg' }
    ]
  };

  const galleryImages = [
    'https://image2url.com/r2/default/images/1773770014780-126cca91-0011-4b23-86c7-26c1e6c7c1b6.jpg', 
    'https://image2url.com/r2/default/images/1773770053567-e878c456-1837-4987-8b4a-f582d464c8d2.jpg', 
    'https://image2url.com/r2/default/images/1773770086296-8ec9a49a-fca7-4a5c-8929-66200cba760e.jpg', 
    'https://image2url.com/r2/default/images/1773770014780-126cca91-0011-4b23-86c7-26c1e6c7c1b6.jpg', 
    'https://image2url.com/r2/default/images/1773770053567-e878c456-1837-4987-8b4a-f582d464c8d2.jpg', 
    'https://image2url.com/r2/default/images/1773770086296-8ec9a49a-fca7-4a5c-8929-66200cba760e.jpg', 
  ];

  if (isLoading) {
    return (
      <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#0A0505] bg-mandala">
        <div className="relative flex items-center justify-center mb-8">
           {/* Mandala Loading Animation */}
           <div className="w-32 h-32 border-t-2 border-b-2 border-[#D4AF37] rounded-full animate-spin-slow absolute"></div>
           <div className="w-24 h-24 border-r-2 border-l-2 border-[#FDF5E6]/30 rounded-full animate-[spin-slow_15s_reverse_infinite] absolute"></div>
           <Star className="text-[#D4AF37] w-8 h-8 opacity-0 animate-[fadeIn_1s_ease-out_0.5s_forwards]" />
        </div>
        <div className="text-center">
          <h1 className="font-playfair text-3xl md:text-5xl text-[#D4AF37] tracking-[0.2em] mb-3 opacity-0 animate-[fadeIn_1s_ease-out_1s_forwards]">GUJARATI THAL</h1>
          <div className="h-[1px] w-0 bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent mx-auto animate-[expand_1.5s_ease-out_1.5s_forwards]"></div>
          <p className="uppercase tracking-[0.4em] text-xs mt-4 text-[#FFF8E7]/60 opacity-0 animate-[fadeIn_1s_ease-out_2s_forwards]">Shahi Dining • Dubai</p>
          <style>{`
            @keyframes expand { to { w-full; max-width: 150px; width: 150px; } }
            @keyframes fadeIn { to { opacity: 1; } }
          `}</style>
        </div>
      </div>
    );
  }

  return (
    <div className="relative bg-[#0A0505] bg-mandala min-h-screen text-[#FFF8E7] selection:bg-[#D4AF37] selection:text-black">
      
      {/* Navigation (Menu Bar) */}
      <nav className={`fixed w-full z-50 transition-all duration-700 ${scrolled ? 'glass py-4' : 'bg-transparent py-6'}`}>
        <div className="container mx-auto px-6 md:px-12 flex justify-between items-center">
          <div className="flex flex-col">
            <a href="#" className="font-playfair text-2xl tracking-[0.15em] text-[#D4AF37] font-semibold leading-none">
              GUJARATI THAL
            </a>
            <span className="font-playfair text-[0.65rem] tracking-[0.4em] text-[#FFF8E7]/60 mt-1 uppercase">Dubai</span>
          </div>
          
          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center space-x-12">
            {[
              { id: 'heritage', label: 'Virasat' },
              { id: 'experience', label: 'Anubhav' },
              { id: 'menu', label: 'Menu' },
              { id: 'gallery', label: 'Tasveerein' }
            ].map((item) => (
              <a key={item.id} href={`#${item.id}`} className="text-xs uppercase tracking-[0.2em] text-[#FFF8E7]/80 hover:text-[#D4AF37] transition-all duration-300 relative group">
                {item.label}
                <span className="absolute -bottom-2 left-0 w-0 h-[1px] bg-[#D4AF37] transition-all duration-300 group-hover:w-full"></span>
              </a>
            ))}
            <a href="#book" className="px-8 py-3 bg-[#D4AF37]/10 border border-[#D4AF37] text-[#D4AF37] text-xs uppercase tracking-widest hover:bg-[#D4AF37] hover:text-[#0A0505] transition-all duration-500 shadow-[0_0_15px_rgba(212,175,55,0.1)] hover:shadow-[0_0_25px_rgba(212,175,55,0.4)]">
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
      <div className={`fixed inset-0 z-40 bg-gradient-to-b from-[#0A0505] to-[#3A0B0B] flex flex-col items-center justify-center space-y-8 transition-all duration-500 ${isNavOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`}>
        {[
          { id: 'heritage', label: 'Virasat' },
          { id: 'experience', label: 'Anubhav' },
          { id: 'menu', label: 'Menu' },
          { id: 'gallery', label: 'Tasveerein' }
        ].map((item) => (
          <a key={item.id} href={`#${item.id}`} onClick={() => setIsNavOpen(false)} className="font-playfair text-3xl text-[#FFF8E7] hover:text-[#D4AF37] transition-colors">
            {item.label}
          </a>
        ))}
        <a href="#book" onClick={() => setIsNavOpen(false)} className="mt-8 px-10 py-4 bg-[#D4AF37] text-[#0A0505] font-medium tracking-widest uppercase text-sm">
          Table Book Karein
        </a>
      </div>

      {/* 1. Hero Section */}
      <section className="relative h-screen w-full flex items-center justify-center overflow-hidden">
        {/* Background Cinematic Image (Nayi Image) */}
        <div className="absolute inset-0 z-0">
          <img 
            src="https://image2url.com/r2/default/images/1773770014780-126cca91-0011-4b23-86c7-26c1e6c7c1b6.jpg" 
            alt="Royal Gujarati Feast" 
            className="w-full h-full object-cover animate-kenburns opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0A0505]/80 via-[#3A0B0B]/40 to-[#0A0505]"></div>
          {/* Subtle vignette */}
          <div className="absolute inset-0 shadow-[inset_0_0_150px_rgba(0,0,0,0.9)]"></div>
        </div>

        <div className="relative z-10 text-center px-4 max-w-5xl mx-auto flex flex-col items-center mt-20">
          <RevealOnScroll delay={100}>
            <div className="flex items-center justify-center space-x-4 mb-6">
              <span className="w-16 h-[1px] bg-[#D4AF37]"></span>
              <p className="uppercase tracking-[0.4em] text-[#D4AF37] text-xs md:text-sm font-medium">Meena Bazar, Bur Dubai</p>
              <span className="w-16 h-[1px] bg-[#D4AF37]"></span>
            </div>
          </RevealOnScroll>
          <RevealOnScroll delay={300}>
            <h1 className="font-playfair text-5xl md:text-7xl lg:text-[5.5rem] text-white mb-6 leading-[1.1] drop-shadow-2xl">
              Dubai Ke Dil Mein <br/>
              <span className="gold-gradient-text text-glow italic">Shahi Gujarati Daawat</span>
            </h1>
          </RevealOnScroll>
          <RevealOnScroll delay={500}>
            <p className="text-[#FFF8E7]/80 text-lg md:text-xl font-light max-w-2xl mx-auto mb-12 leading-relaxed">
              "Atithi Devo Bhava" ki sachhi shaan ka anubhav karein. Hum Gujarat ki shahi parampara ko Dubai ki modern luxury ke sath laate hain.
            </p>
          </RevealOnScroll>
          <RevealOnScroll delay={700}>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <a href="#book" className="px-12 py-4 bg-[#D4AF37] text-[#0A0505] text-xs uppercase tracking-[0.2em] font-medium hover:bg-[#FFF8E7] transition-all duration-500 shadow-[0_0_20px_rgba(212,175,55,0.3)]">
                Apna Table Book Karein
              </a>
              <a href="#experience" className="px-12 py-4 border border-[#D4AF37]/50 text-[#D4AF37] text-xs uppercase tracking-[0.2em] font-medium hover:border-[#D4AF37] hover:bg-[#D4AF37]/10 glass transition-all duration-500">
                Thali Ka Anubhav Dekhein
              </a>
            </div>
          </RevealOnScroll>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 animate-float">
          <div className="w-[1px] h-20 bg-gradient-to-b from-[#D4AF37] to-transparent mx-auto"></div>
        </div>
      </section>

      {/* 2. About / Heritage Section */}
      <section id="heritage" className="py-24 md:py-32 relative bg-gradient-royal">
        <div className="container mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 lg:gap-24 items-center">
            <RevealOnScroll direction="right">
              <div className="relative group">
                <div className="absolute -inset-4 border border-[#D4AF37]/30 translate-x-4 translate-y-4 rounded-sm transition-transform duration-700 group-hover:translate-x-2 group-hover:translate-y-2"></div>
                <div className="absolute -inset-4 border border-[#D4AF37]/10 -translate-x-4 -translate-y-4 rounded-sm transition-transform duration-700 group-hover:-translate-x-2 group-hover:-translate-y-2"></div>
                <img 
                  src="https://image2url.com/r2/default/images/1773770053567-e878c456-1837-4987-8b4a-f582d464c8d2.jpg" 
                  alt="Gujarati Spices & Culture" 
                  className="relative z-10 w-full h-[650px] object-cover grayscale-[20%] hover:grayscale-0 transition-all duration-1000 rounded-sm shadow-2xl"
                />
                <div className="absolute bottom-12 -left-10 bg-[#1F0404] p-8 border-l-4 border-[#D4AF37] z-20 shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
                  <p className="font-playfair text-3xl md:text-4xl text-[#D4AF37] mb-2">Atithi</p>
                  <p className="text-xs uppercase tracking-widest text-[#FFF8E7]/70">Devo Bhava<br/>(Mehmaan Bhagwan Hai)</p>
                </div>
              </div>
            </RevealOnScroll>
            
            <RevealOnScroll direction="left" delay={200}>
              <div className="max-w-xl pl-0 md:pl-6">
                <h3 className="uppercase tracking-[0.4em] text-[#D4AF37] text-xs mb-4 flex items-center">
                  <span className="w-8 h-[1px] bg-[#D4AF37] mr-4"></span> Hamari Virasat
                </h3>
                <h2 className="font-playfair text-4xl md:text-5xl lg:text-6xl mb-8 leading-[1.1] text-white">
                  Parampara Aur <br/><span className="italic text-[#D4AF37] text-glow">Shaan Ka Sangam</span>
                </h2>
                <p className="text-[#FFF8E7]/70 leading-relaxed font-light mb-6 text-base md:text-lg">
                  Meena Bazar ki chamakti galiyon mein sthit, Gujarati Thal sirf ek restaurant nahi, balki ek sanskritik anubhav hai. Humne Gujarat ki haveliyon ke dining halls ko yahan zinda kiya hai, jahan har bhojan zindagi aur khushhali ka jashn hota tha.
                </p>
                <p className="text-[#FFF8E7]/70 leading-relaxed font-light mb-10 text-base md:text-lg">
                  Hamari recipes peedhiyon se chali aa rahi hain, jo shuddh desi ghee, hath se peese gaye masalon aur asli swad ki maang karti hain. Yahan, luxury ka matlab hamara apnapan aur hamari behtareen mehmaan-nawazi hai.
                </p>
                <div className="flex items-center space-x-6 border-t border-[#D4AF37]/20 pt-8">
                  <div className="w-16 h-16 rounded-full border border-[#D4AF37]/30 flex items-center justify-center bg-[#D4AF37]/5">
                    <Star className="text-[#D4AF37] w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-sm tracking-[0.1em] uppercase text-[#D4AF37] font-medium">100% Shuddh Shakahari</p>
                    <p className="text-xs tracking-widest text-[#FFF8E7]/50 mt-1">Sattvic Cuisine Excellence</p>
                  </div>
                </div>
              </div>
            </RevealOnScroll>
          </div>
        </div>
      </section>

      {/* 3. The Thali Experience (USP Section) */}
      <section id="experience" className="py-24 md:py-32 relative border-y border-[#D4AF37]/10 bg-[#0A0505]">
        <div className="container mx-auto px-6 md:px-12 text-center">
          <RevealOnScroll>
            <h3 className="uppercase tracking-[0.4em] text-[#D4AF37] text-xs mb-4">Hamari Khas Baat</h3>
            <h2 className="font-playfair text-4xl md:text-5xl lg:text-6xl mb-6 text-white">Unlimited Shahi Thali</h2>
            <div className="w-24 h-[1px] bg-[#D4AF37] mx-auto mb-16"></div>
          </RevealOnScroll>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
            {[
              { title: "Anant Mehmaan-nawazi", desc: "Gujarati hospitality ka asli matlab samjhein. Hamare servers aapki chandi ki thali ko tab tak garam aur taze pakwanon se bharte rahenge jab tak aap puri tarah santusht na ho jayein.", icon: "♾️" },
              { title: "Swad Ka Sangam", desc: "Meetha, teekha, namkeen aur khatta swad ka ek behtareen balance. Teekhe Kathiyawadi shaak se lekar meethi Kadhi tak, har bite ek naya safar hai.", icon: "🎭" },
              { title: "Chandi Ki Thali", desc: "Ek Maharaja ki tarah khana khayein. Aapka bhojan premium, paramparik thaliyon mein bahut sari katoriyon ke sath parosa jata hai, jo ek shahi nazara pesh karta hai.", icon: "👑" }
            ].map((feature, idx) => (
              <RevealOnScroll key={idx} delay={idx * 200}>
                <div className="glass-card p-10 h-full flex flex-col items-center text-center group">
                  <div className="text-4xl mb-6 grayscale group-hover:grayscale-0 transition-all duration-500">{feature.icon}</div>
                  <h4 className="font-playfair text-2xl text-[#D4AF37] mb-4">{feature.title}</h4>
                  <p className="text-[#FFF8E7]/60 font-light leading-relaxed">{feature.desc}</p>
                </div>
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Signature Menu */}
      <section id="menu" className="py-24 md:py-32 relative overflow-hidden bg-gradient-to-b from-[#0A0505] via-[#1F0404] to-[#0A0505]">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#D4AF37] rounded-full blur-[200px] opacity-[0.02]"></div>
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-[#3A0B0B] rounded-full blur-[200px] opacity-[0.1]"></div>
        
        <div className="container mx-auto px-6 md:px-12 relative z-10">
          <div className="text-center mb-16">
            <RevealOnScroll>
              <h3 className="uppercase tracking-[0.4em] text-[#D4AF37] text-xs mb-4">Behtareen Pakwan</h3>
              <h2 className="font-playfair text-4xl md:text-5xl lg:text-6xl mb-6 text-white">Hamara Menu</h2>
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
                  className={`text-xs md:text-sm uppercase tracking-[0.15em] pb-3 transition-all duration-300 border-b-2 ${
                    activeMenuTab === category ? 'border-[#D4AF37] text-[#D4AF37]' : 'border-transparent text-[#FFF8E7]/40 hover:text-[#FFF8E7]'
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
                <div className="group flex flex-col sm:flex-row gap-8 items-center sm:items-start p-6 rounded-lg hover:bg-white/[0.02] border border-transparent hover:border-[#D4AF37]/10 transition-all duration-500 cursor-pointer">
                  <div className="w-full sm:w-40 h-40 shrink-0 overflow-hidden rounded-md relative border border-[#D4AF37]/30 shadow-lg">
                    <div className="absolute inset-0 bg-[#3A0B0B]/20 group-hover:bg-transparent transition-all z-10"></div>
                    <img 
                      src={item.img} 
                      alt={item.name} 
                      className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-1000"
                    />
                  </div>
                  <div className="flex-1 w-full text-center sm:text-left mt-2 sm:mt-0">
                    <div className="flex flex-col sm:flex-row justify-between items-baseline mb-4 border-b border-[#D4AF37]/20 pb-3">
                      <h4 className="font-playfair text-2xl text-white group-hover:text-[#D4AF37] transition-colors">{item.name}</h4>
                      <span className="text-[#D4AF37] font-medium tracking-widest mt-2 sm:mt-0 text-lg">{item.price}</span>
                    </div>
                    <p className="text-[#FFF8E7]/60 font-light text-sm md:text-base leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              </RevealOnScroll>
            ))}
          </div>

          <div className="mt-24 text-center">
             <RevealOnScroll>
               <a href="#book" className="inline-flex items-center text-[#D4AF37] text-xs uppercase tracking-[0.2em] hover:text-white transition-colors group">
                 <span className="border-b border-[#D4AF37] pb-1">Pura Menu Dekhein</span>
                 <ChevronRight className="ml-2 w-4 h-4 transform group-hover:translate-x-2 transition-transform"/>
               </a>
             </RevealOnScroll>
          </div>
        </div>
      </section>

      {/* 5. Cultural Gallery Section */}
      <section id="gallery" className="py-24 bg-[#0A0505]">
        <div className="container mx-auto px-6 md:px-12">
           <RevealOnScroll>
            <div className="flex flex-col md:flex-row justify-between items-end mb-16">
              <div>
                <h3 className="uppercase tracking-[0.4em] text-[#D4AF37] text-xs mb-4">Visual Aesthetics</h3>
                <h2 className="font-playfair text-4xl md:text-5xl lg:text-6xl text-white">Mahal Ka Mahaul</h2>
              </div>
              <p className="text-[#FFF8E7]/60 max-w-sm font-light mt-6 md:mt-0 text-base">
                Hamare shahi interiors, rang-birange pakwanon aur khushnuma mahaul ki ek jhalak.
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
                   <div className="absolute inset-0 bg-black/50 group-hover:bg-[#3A0B0B]/20 transition-colors duration-700 z-10"></div>
                   <img 
                     src={src} 
                     alt="Gallery" 
                     className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-[1.5s]"
                     loading="lazy"
                   />
                   <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-700 z-20">
                     <span className="bg-[#0A0505]/90 backdrop-blur-md text-[#D4AF37] px-10 py-4 uppercase tracking-[0.2em] text-xs border border-[#D4AF37]/50 shadow-[0_0_20px_rgba(212,175,55,0.2)]">Bada Karein</span>
                   </div>
                 </div>
               </RevealOnScroll>
             ))}
           </div>
        </div>
      </section>

      {/* Lightbox */}
      {lightboxImg && (
        <div className="fixed inset-0 z-[100] bg-[#0A0505]/95 backdrop-blur-2xl flex items-center justify-center p-4" onClick={() => setLightboxImg(null)}>
          <button className="absolute top-10 right-10 text-white/50 hover:text-[#D4AF37] transition-colors" onClick={() => setLightboxImg(null)}>
            <X size={44} strokeWidth={1}/>
          </button>
          <img src={lightboxImg} alt="Enlarged" className="max-w-full max-h-[90vh] object-contain shadow-2xl border border-[#D4AF37]/30" />
        </div>
      )}

      {/* 6. Customer Testimonials */}
      <section id="testimonials" className="py-24 md:py-32 relative border-y border-[#D4AF37]/10 bg-gradient-to-t from-[#1F0404] to-transparent">
         <div className="container mx-auto px-6 md:px-12 text-center">
            <RevealOnScroll>
              <Quote className="w-14 h-14 text-[#D4AF37]/30 mx-auto mb-8" />
              <h2 className="font-playfair text-4xl md:text-5xl text-white mb-20">Mehmaano Ki Raay</h2>
            </RevealOnScroll>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
              {[
                { name: "Meera D.", role: "Food Connoisseur", text: "India ke bahar sabse authentic Gujarati Thali. Dal ki mithas aur Shrikhand ka swad lajawab hai. Dubai mein sach mein ek premium anubhav." },
                { name: "Tariq A.", role: "Luxury Lifestyle Blogger", text: "Behtareen service! Staff aapko bilkul royalty ki tarah treat karta hai. Woh bahut pyar se khana paroste hain. Meena Bazar mein yeh jagah miss nahi karni chahiye." },
                { name: "Priya & Rahul", role: "Anniversary Celebration", text: "Humne apni anniversary yahan manayi. Mahaul, classical music aur unlimited swadisht khane ne ishe hamari zindagi ka sabse yaadgaar dinner bana diya." }
              ].map((review, idx) => (
                <RevealOnScroll key={idx} delay={idx * 200}>
                  <div className="glass-card p-12 text-left h-full flex flex-col justify-between hover:-translate-y-3 transition-transform duration-500">
                    <div>
                      <div className="flex text-[#D4AF37] mb-8 space-x-1">
                        {[...Array(5)].map((_, i) => <Star key={i} size={18} fill="currentColor" />)}
                      </div>
                      <p className="text-[#FFF8E7]/70 font-light leading-loose mb-10 text-lg">"{review.text}"</p>
                    </div>
                    <div className="border-t border-[#D4AF37]/20 pt-6 flex items-center">
                      <div className="w-10 h-10 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/30 flex items-center justify-center mr-4">
                        <span className="text-[#D4AF37] font-playfair">{review.name.charAt(0)}</span>
                      </div>
                      <div>
                        <h4 className="font-playfair text-xl text-white">{review.name}</h4>
                        <p className="text-[#D4AF37] text-[0.65rem] uppercase tracking-[0.2em] mt-1">{review.role}</p>
                      </div>
                    </div>
                  </div>
                </RevealOnScroll>
              ))}
            </div>
         </div>
      </section>

      {/* 7 & 8. Booking & Map Section */}
      <section id="book" className="py-0 flex flex-col md:flex-row bg-[#0A0505]">
        
        {/* Reservation Form */}
        <div className="w-full md:w-1/2 p-8 md:p-24 flex items-center justify-center relative bg-gradient-to-r from-[#1F0404] to-transparent">
          <div className="w-full max-w-lg relative z-10">
            <RevealOnScroll>
              <h3 className="uppercase tracking-[0.4em] text-[#D4AF37] text-xs mb-4">Booking</h3>
              <h2 className="font-playfair text-4xl md:text-5xl lg:text-6xl mb-8 text-white">Apni Daawat Book Karein</h2>
              <p className="text-[#FFF8E7]/50 font-light mb-12 text-sm leading-relaxed">Bade family events ya private dining ke liye, kripya hamare host se sidhe WhatsApp par sampark karein.</p>
            </RevealOnScroll>

            <RevealOnScroll delay={200}>
              <form onSubmit={handleBookTable} className="space-y-10">
                <div className="group relative">
                  <input type="text" required value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} placeholder="Mehmaan Ka Naam" className="w-full bg-transparent border-b border-[#D4AF37]/30 pb-4 text-white focus:outline-none focus:border-[#D4AF37] transition-colors font-light placeholder-[#FFF8E7]/30 text-lg" />
                </div>
                <div className="group relative">
                  <input type="tel" required value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})} placeholder="Phone Number" className="w-full bg-transparent border-b border-[#D4AF37]/30 pb-4 text-white focus:outline-none focus:border-[#D4AF37] transition-colors font-light placeholder-[#FFF8E7]/30 text-lg" />
                </div>
                <div className="grid grid-cols-2 gap-10">
                  <div className="group relative">
                    <select value={formData.guests} onChange={(e) => setFormData({...formData, guests: e.target.value})} className="w-full bg-transparent border-b border-[#D4AF37]/30 pb-4 text-white focus:outline-none focus:border-[#D4AF37] transition-colors font-light appearance-none cursor-pointer text-lg">
                      <option value="1" className="bg-[#0A0505] text-white">1 Mehmaan</option>
                      <option value="2" className="bg-[#0A0505] text-white">2 Mehmaan</option>
                      <option value="3" className="bg-[#0A0505] text-white">3 Mehmaan</option>
                      <option value="4" className="bg-[#0A0505] text-white">4 Mehmaan</option>
                      <option value="5" className="bg-[#0A0505] text-white">5 Mehmaan</option>
                      <option value="6" className="bg-[#0A0505] text-white">6+ Mehmaan</option>
                    </select>
                  </div>
                  <div className="group relative">
                    <input type="date" required value={formData.date} onChange={(e) => setFormData({...formData, date: e.target.value})} className="w-full bg-transparent border-b border-[#D4AF37]/30 pb-4 text-[#FFF8E7]/80 focus:outline-none focus:border-[#D4AF37] transition-colors font-light [color-scheme:dark] text-lg" />
                  </div>
                </div>
                <div className="group relative">
                  <input type="time" required value={formData.time} onChange={(e) => setFormData({...formData, time: e.target.value})} className="w-full bg-transparent border-b border-[#D4AF37]/30 pb-4 text-[#FFF8E7]/80 focus:outline-none focus:border-[#D4AF37] transition-colors font-light [color-scheme:dark] text-lg" />
                </div>
                <button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="w-full mt-12 py-6 bg-gradient-to-r from-[#D4AF37] to-[#B38728] text-[#0A0505] uppercase tracking-[0.2em] font-semibold hover:from-[#FFF8E7] hover:to-[#FFF8E7] transition-all duration-500 disabled:opacity-70 flex justify-center items-center group shadow-[0_0_20px_rgba(212,175,55,0.2)] hover:shadow-[0_0_30px_rgba(212,175,55,0.6)]"
                >
                  {isSubmitting ? 'Table Confirm Ho Raha Hai...' : 'Reservation Confirm Karein'}
                  {!isSubmitting && <ChevronRight className="ml-3 w-5 h-5 transform group-hover:translate-x-2 transition-transform"/>}
                </button>
              </form>
            </RevealOnScroll>
          </div>
        </div>

        {/* Google Map Integration */}
        <div className="w-full md:w-1/2 h-[600px] md:h-auto relative grayscale-[60%] hover:grayscale-0 transition-all duration-1000 border-l border-[#D4AF37]/10">
           {/* Exact Location: Meena Bazar, Bur Dubai */}
           <iframe 
             src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3608.358210350485!2d55.29294211501053!3d25.258485983867623!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f4337bc1df43d%3A0xc6c76db3642ba5!2sMeena%20Bazaar%20-%20Dubai!5e0!3m2!1sen!2sae!4v1710000000000!5m2!1sen!2sae" 
             className="w-full h-full border-0 map-dark" 
             allowFullScreen="" 
             loading="lazy" 
             referrerPolicy="no-referrer-when-downgrade"
             title="Gujarati Thal Location"
           ></iframe>
           <div className="absolute inset-0 bg-[#0A0505]/20 pointer-events-none"></div>
        </div>

      </section>

      {/* Footer */}
      <footer className="bg-[#050202] pt-24 pb-12 border-t border-[#D4AF37]/20 relative overflow-hidden bg-mandala">
        {/* Decorative corner accents */}
        <div className="absolute top-0 left-0 w-40 h-40 border-t-2 border-l-2 border-[#D4AF37]/20 opacity-50 rounded-tl-3xl"></div>
        <div className="absolute top-0 right-0 w-40 h-40 border-t-2 border-r-2 border-[#D4AF37]/20 opacity-50 rounded-tr-3xl"></div>

        <div className="container mx-auto px-6 md:px-12 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 lg:gap-16 mb-20">
            <div className="md:col-span-1">
              <h2 className="font-playfair text-3xl text-[#D4AF37] tracking-[0.15em] mb-2 leading-none">GUJARATI</h2>
              <p className="font-playfair text-sm text-[#FFF8E7]/70 tracking-[0.4em] mb-8 uppercase">THAL</p>
              <p className="text-[#FFF8E7]/50 font-light text-sm leading-relaxed mb-8">
                Shuddh shakahari aur premium dining ka ek anokha anubhav, Dubai ke dil mein Gujarat ke shahi swad ke sath.
              </p>
              <div className="flex space-x-6 text-[#D4AF37]">
                <a href="#" className="hover:text-white transition-colors hover:scale-110 transform duration-300"><Instagram size={22} /></a>
                <a href="#" className="hover:text-white transition-colors hover:scale-110 transform duration-300"><Facebook size={22} /></a>
              </div>
            </div>
            
            <div>
              <h4 className="text-white uppercase tracking-[0.2em] text-xs mb-8 font-medium">Sampark Aur Pata</h4>
              <ul className="space-y-6 text-[#FFF8E7]/60 font-light text-sm">
                <li className="flex items-center"><Phone size={18} className="mr-4 text-[#D4AF37]"/> +971 55 120 4628</li>
                <li className="flex items-start">
                  <MapPin size={18} className="mr-4 mt-1 shrink-0 text-[#D4AF37]"/> 
                  Meena Bazar,<br/>Bur Dubai,<br/>Dubai, United Arab Emirates
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-white uppercase tracking-[0.2em] text-xs mb-8 font-medium">Shahi Samay</h4>
              <ul className="space-y-6 text-[#FFF8E7]/60 font-light text-sm">
                <li className="flex items-start"><Clock size={18} className="mr-4 mt-1 shrink-0 text-[#D4AF37]"/> 
                  <div>
                    <span className="block text-white mb-1">Dopahar Ka Khana</span>
                    12:00 PM - 04:00 PM<br/><br/>
                    <span className="block text-white mb-1">Raat Ka Khana</span>
                    07:00 PM - 11:30 PM
                  </div>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-white uppercase tracking-[0.2em] text-xs mb-8 font-medium">Nayi Updates</h4>
              <p className="text-[#FFF8E7]/60 font-light text-sm mb-6 leading-relaxed">Hamari khas thal aur offers ki jankari ke liye subscribe karein.</p>
              <div className="flex border-b border-[#D4AF37]/40 pb-3 group">
                <input type="email" placeholder="Email Pata" className="bg-transparent w-full focus:outline-none text-sm font-light text-white placeholder-[#FFF8E7]/30" />
                <button className="text-[#D4AF37] group-hover:text-white transition-colors"><ChevronRight size={22}/></button>
              </div>
            </div>
          </div>

          <div className="border-t border-[#D4AF37]/10 pt-10 flex flex-col md:flex-row justify-between items-center text-xs text-[#FFF8E7]/40 tracking-[0.15em] uppercase">
            <p>&copy; {new Date().getFullYear()} Gujarati Thal Restaurant. All rights reserved.</p>
            <div className="flex space-x-8 mt-6 md:mt-0">
              <a href="#" className="hover:text-[#D4AF37] transition-colors">Privacy</a>
              <a href="#" className="hover:text-[#D4AF37] transition-colors">Terms</a>
            </div>
          </div>
        </div>
      </footer>

      {/* Floating WhatsApp Button */}
      <a 
        href="https://wa.me/971551204628?text=Namaste%20Gujarati%20Thal%2C%20mujhe%20shahi%20daawat%20ke%20liye%20table%20reserve%20karna%20hai." 
        target="_blank" 
        rel="noopener noreferrer"
        className="fixed bottom-10 right-10 z-[90] bg-[#25D366] text-white p-4 rounded-full shadow-[0_0_25px_rgba(37,211,102,0.4)] hover:scale-110 transition-transform duration-300 animate-bounce group"
      >
        <MessageCircle size={32} />
        <span className="absolute right-full mr-6 top-1/2 -translate-y-1/2 bg-[#0A0505]/95 backdrop-blur-xl border border-[#D4AF37]/30 text-[#FFF8E7] text-xs uppercase tracking-widest whitespace-nowrap px-6 py-3 rounded shadow-2xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
          Message Bhejein
        </span>
      </a>

    </div>
  );
}