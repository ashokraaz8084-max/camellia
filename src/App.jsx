import React, { useState, useEffect, useRef } from 'react';
import { 
  Menu, X, MapPin, Phone, Clock, ChevronRight, 
  Star, Quote, Instagram, Facebook, Twitter, MessageCircle, Play, Navigation
} from 'lucide-react';

// --- KOSTOM CSS AN ANIMESHON DEM ---
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

  /* Spɛshal Eg an Ovalu Shep Dem */
  .egg-shape {
    border-radius: 50% 50% 50% 50% / 60% 60% 40% 40%;
  }
  
  .egg-shape-inverse {
    border-radius: 50% 50% 50% 50% / 40% 40% 60% 60%;
  }

  .oval-shape {
    border-radius: 50%;
  }

  /* Sof Gol Layt Dem */
  .glow-gold {
    box-shadow: 0 0 40px rgba(212, 175, 55, 0.15);
  }
  .glow-gold-hover:hover {
    box-shadow: 0 0 50px rgba(212, 175, 55, 0.25);
  }

  /* Sinimatik Pan Animeshon */
  @keyframes panImage {
    0% { transform: scale(1.05) translate(0, 0); }
    50% { transform: scale(1.1) translate(-1%, -1%); }
    100% { transform: scale(1.05) translate(0, 0); }
  }
  .animate-pan {
    animation: panImage 30s infinite ease-in-out;
  }

  /* Kostom Skrolba */
  ::-webkit-scrollbar { width: 8px; }
  ::-webkit-scrollbar-track { background: var(--black); }
  ::-webkit-scrollbar-thumb { background: #333; border-radius: 10px; }
  ::-webkit-scrollbar-thumb:hover { background: var(--gold); }

  /* Nav we de Flot */
  .glass-nav {
    background: rgba(18, 18, 18, 0.85);
    backdrop-filter: blur(16px);
    border: 1px solid rgba(212, 175, 55, 0.2);
    border-radius: 100px;
  }
`;

// --- KOMPONENT FO SMUT ANIMESHON WE I DE SHO ---
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

// --- MEN APP KOMPONENT ---
export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeMenuCategory, setActiveMenuCategory] = useState('Fas Fud');

  // --- DATA DEM ---
  const menuCategories = ['Fas Fud', 'Indyan It', 'Snaks', 'Dringk Dem'];
  const menuData = {
    'Fas Fud': [
      { name: 'Signecha Gol Baga', desc: 'Fos klas bif pati, trufil mayo, an anyan insay fresh bred.', price: 'AED 45', image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=400&q=80' },
      { name: 'Trufil Pamizan Frayz', desc: 'Krinspi frayz wit trufil oyl an pamizan chiz.', price: 'AED 28', image: 'https://images.unsplash.com/photo-1576107232684-1279f390859f?auto=format&fit=crop&w=400&q=80' },
      { name: 'Krinspi Chikn Slayda', desc: 'Fray chikn, spaysi slaw, an wi sikrit gol sos.', price: 'AED 35', image: 'https://images.unsplash.com/photo-1520072959219-c595dc870360?auto=format&fit=crop&w=400&q=80' },
      { name: 'Gome Klob Sandwij', desc: 'Tripul bred wit rosted toki, bif bekon, an grin lif dem.', price: 'AED 40', image: 'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?auto=format&fit=crop&w=400&q=80' },
    ],
    'Indyan It': [
      { name: 'Bota Chikn Royal', desc: 'Soff chikn na tomati an kashu grevi, wit gol lif.', price: 'AED 42', image: 'https://images.unsplash.com/photo-1588166524941-3bf61a9c41db?auto=format&fit=crop&w=400&q=80' },
      { name: 'Klassik Briyani Dom', desc: 'Basmati rays we dɔn kuk wit spays an mit.', price: 'AED 48', image: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=400&q=80' },
      { name: 'Dal Makhani Signecha', desc: 'Blak lentil we dɔn kuk smol smol wit bota an krim.', price: 'AED 38', image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=400&q=80' },
      { name: 'Paniir Tikka Sizla', desc: 'Chiz we dɔn ros wit spays, na hot plet.', price: 'AED 35', image: 'https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?auto=format&fit=crop&w=400&q=80' },
    ],
    'Snaks': [
      { name: 'Gol Samosa Chat', desc: 'Krinspi samosa wit poteto, yogot, an mint sos.', price: 'AED 22', image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=400&q=80' },
      { name: 'Nacho we get boku tin', desc: 'Korn chips wit chiz, jalapeño, an salsa.', price: 'AED 30', image: 'https://images.unsplash.com/photo-1513456852971-30c0b8199d4d?auto=format&fit=crop&w=400&q=80' },
      { name: 'Peri Peri Wing Dem', desc: 'Chikn wing dem na wi spaysi an sawar peri peri sos.', price: 'AED 32', image: 'https://images.unsplash.com/photo-1569691899455-88464f6d3318?auto=format&fit=crop&w=400&q=80' },
      { name: 'Stof Dynabayt', desc: 'Chiz an jalapeño bol dem wit swit chili sos.', price: 'AED 26', image: 'https://images.unsplash.com/photo-1628840042765-356cda07504e?auto=format&fit=crop&w=400&q=80' },
    ],
    'Dringk Dem': [
      { name: '24k Gol Kapuchino', desc: 'Fos klas Arabik kofi we get 24k gol lif na tap.', price: 'AED 35', image: 'https://images.unsplash.com/photo-1534687941688-60dcbfafdba4?auto=format&fit=crop&w=400&q=80' },
      { name: 'Roz Safron Milk', desc: 'Wam milk we get safron an roz wata.', price: 'AED 25', image: 'https://images.unsplash.com/photo-1558024920-b41e1887dc32?auto=format&fit=crop&w=400&q=80' },
      { name: 'Signecha Mohito', desc: 'Fresh mint, laym, an wi sikrit sirɔp.', price: 'AED 28', image: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=400&q=80' },
      { name: 'Fresh Jus Dem', desc: 'Fruk dem we wi jus pres tide.', price: 'AED 24', image: 'https://images.unsplash.com/photo-1600271886742-f049cd451bba?auto=format&fit=crop&w=400&q=80' },
    ]
  };

  const galleryImages = [
    "https://image2url.com/r2/default/images/1773855721582-25a57dca-2657-4948-9c6e-ddf9f1241aad.jpg",
    "https://image2url.com/r2/default/images/1773855765776-56e36d5e-3b5e-4c5c-a682-6c960033362b.jpg",
    "https://image2url.com/r2/default/images/1773855814066-7d308432-cd99-43e2-aea8-43bf80410213.jpg",
    "https://image2url.com/r2/default/images/1773855844207-94da55ee-3ef4-4bfa-a806-d6ca09afce72.jpg"
  ];

  const reviews = [
    { name: "Aisha Sultan", text: "I fyn pas mak. Di ovalu shep na Fud Spot de mach di lokziri na Dubay.", rating: 5 },
    { name: "Rohan Mehta", text: "Di Indyan It na di bɛst we a dɔn ɛva it. I tes fyn lek aw i luk wit di gol.", rating: 5 },
    { name: "Sarah Williams", text: "Na rili fyn say na Al Ain Center. Nɔto wan shap ɛj nɔ de, i mek yu fil rili gud fo it de.", rating: 5 }
  ];

  // --- IFFƐKT DEM ---
  useEffect(() => {
    // Fos Klas Lodin Skrin
    const timer = setTimeout(() => setIsLoading(false), 2800);
    
    // Luk skrol fo Nav
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      clearTimeout(timer);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // --- HANDLA DEM ---
  const handleReservation = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());
    
    const message = `Adu,%20A%20want%20fo%20buk%20tebu%20na%20Fud%20Spot%20Rɛstɔrant%20&%20Kafitiria.%0A%0A*Nem:* ${data.name}%0A*Fon:* ${data.phone}%0A*Gɛst dem:* ${data.guests}%0A*Det:* ${data.date}%0A*Tem:* ${data.time}`;
    
    window.open(`https://wa.me/971581467575?text=${message}`, '_blank');
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

  // --- RƐNDA ---
  return (
    <>
      <style>{styles}</style>

      {/* --- LODIN SKRIN --- */}
      <div className={`fixed inset-0 z-[100] bg-[#050505] flex flex-col items-center justify-center transition-opacity duration-1000 ${isLoading ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
        <div className="relative w-32 h-40 flex items-center justify-center egg-shape border border-[#D4AF37] glow-gold">
          <div className="absolute inset-2 border-b-2 border-l-2 border-[#F3E5AB] opacity-50 egg-shape animate-spin" style={{ animationDuration: '3s' }}></div>
          <span className="font-serif text-3xl text-[#D4AF37] tracking-widest">FS</span>
        </div>
        <div className="mt-8 text-sm tracking-[0.4em] text-[#D4AF37] uppercase font-light">Mek Loksiri</div>
      </div>

      {/* --- NAVIGESHON --- */}
      <div className="fixed w-full z-50 flex justify-center top-0 pt-6 px-4 transition-all duration-500 pointer-events-none">
        <nav className={`pointer-events-auto transition-all duration-500 px-8 py-4 flex justify-between items-center w-full max-w-5xl ${isScrolled ? 'glass-nav glow-gold' : 'bg-transparent border border-transparent'}`}>
          <div className="text-xl md:text-2xl font-serif text-white flex items-center gap-2 cursor-pointer" onClick={() => window.scrollTo(0,0)}>
            <span className="text-[#D4AF37]">Fud</span> Spot
          </div>
          
          {/* Dɛkstɔp Menyoo */}
          <div className="hidden md:flex items-center gap-8 text-xs tracking-[0.2em] uppercase font-medium">
            {['Bawt Wi', 'Menyoo', 'Galari', 'Say we wi de'].map((item) => (
              <button key={item} onClick={() => scrollTo(item === 'Say we wi de' ? 'location' : item === 'Bawt Wi' ? 'about' : item.toLowerCase())} className="text-white/80 hover:text-[#D4AF37] transition-colors relative group">
                {item}
                <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-[#D4AF37] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
              </button>
            ))}
            <button onClick={() => scrollTo('reservation')} className="bg-[#D4AF37] text-black px-6 py-3 rounded-[50px] hover:bg-[#F3E5AB] transition-colors duration-300 font-bold ml-4">
              Buk Naw
            </button>
          </div>

          {/* Mobayl Tɔgul */}
          <button className="md:hidden text-white hover:text-[#D4AF37] transition-colors" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </nav>
      </div>

      {/* Mobayl Menyoo Ovale */}
      <div className={`fixed inset-0 bg-[#0A0A0A]/95 backdrop-blur-xl z-40 transition-transform duration-500 ease-in-out md:hidden flex flex-col items-center justify-center gap-8 ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        {['Bawt Wi', 'Menyoo', 'Galari', 'Say we wi de', 'Buk Tebu'].map((item) => (
          <button 
            key={item} 
            onClick={() => scrollTo(item === 'Say we wi de' ? 'location' : item === 'Bawt Wi' ? 'about' : item === 'Buk Tebu' ? 'reservation' : item.toLowerCase())}
            className="text-3xl font-serif text-white hover:text-[#D4AF37] transition-colors relative z-10"
          >
            {item}
          </button>
        ))}
      </div>

      {/* --- HIRO SƐKSHON --- */}
      <header className="relative h-screen flex items-center justify-center overflow-hidden bg-[#050505] pt-20">
        <div className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none p-4 md:p-10">
          <div className="w-full max-w-lg md:max-w-3xl h-[85vh] egg-shape overflow-hidden relative glow-gold border border-[#D4AF37]/30">
            <img 
              src="https://image2url.com/r2/default/images/1773855611849-0dd9ee94-a03e-4919-b2d9-f9e9d0b9eeb1.jpg" 
              alt="Fos klas it say" 
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
                Fos klas tin na Dubay
              </p>
            </div>
          </Reveal>
          
          <Reveal delay={300}>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif text-white leading-[1.15] mb-8 drop-shadow-2xl">
              Wan Nyu Shep <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D4AF37] via-[#F3E5AB] to-[#D4AF37]">
                fo It Loksiri
              </span>
            </h1>
          </Reveal>
          
          <Reveal delay={500}>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mt-12">
              <button 
                onClick={() => scrollTo('reservation')}
                className="w-full sm:w-auto px-10 py-4 bg-[#D4AF37] text-black rounded-[50px] hover:bg-[#F3E5AB] transition-all duration-300 font-bold tracking-widest uppercase text-xs shadow-[0_0_20px_rgba(212,175,55,0.4)]"
              >
                Buk Tebu
              </button>
              <button 
                onClick={() => scrollTo('menu')}
                className="w-full sm:w-auto px-10 py-4 bg-[#121212]/60 backdrop-blur-sm text-white rounded-[50px] border border-[#D4AF37]/50 hover:border-[#D4AF37] hover:bg-[#121212] transition-all duration-300 font-bold tracking-widest uppercase text-xs flex items-center justify-center gap-2"
              >
                Luk Di Menyoo
                <Play size={14} className="fill-current text-[#D4AF37]" />
              </button>
            </div>
          </Reveal>
        </div>
      </header>

      {/* --- BAWT WI SƐKSHON --- */}
      <section id="about" className="py-24 md:py-32 bg-[#0A0A0A] text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#D4AF37]/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
        
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            {/* Tekst Na Di Say */}
            <Reveal direction="right" className="order-2 lg:order-1 bg-[#121212] p-10 md:p-16 rounded-[60px] border border-white/5 glow-gold-hover transition-shadow duration-500">
              <h2 className="text-[#D4AF37] tracking-[0.2em] text-xs uppercase mb-4 font-bold flex items-center gap-3">
                <span className="w-8 h-[1px] bg-[#D4AF37]"></span> Wi Tori
              </h2>
              <h3 className="text-4xl md:text-5xl font-serif text-white leading-tight mb-8">
                Gud Kwanliti <span className="text-[#D4AF37] italic">we Fyn</span>
              </h3>
              <p className="text-white/60 mb-6 leading-relaxed font-light">
                Fud Spot Rɛstɔrant an Kafitiria na nyu we fo it. I de na Al Ain Center, Al Mankhool Rd, wi mɛk mɔ i get pɔm-pɔm shep, nɔto ɛni shap ɛj nɔ de na wi it, na aw wi de tritim pipul, ɔ na wi bil.
              </p>
              <p className="text-white/60 mb-10 leading-relaxed font-light">
                Evri tin we wi de mek na gud kwanliti. Wi de mek fas fud an Indyan it fo bi fyn an lokziri na wan de.
              </p>
              
              <div className="flex items-center gap-6 bg-black/50 p-6 rounded-[40px] border border-white/5">
                <div className="w-14 h-14 rounded-full border border-[#D4AF37] flex items-center justify-center text-[#D4AF37] bg-[#D4AF37]/10 shrink-0">
                  <Star size={24} fill="currentColor" />
                </div>
                <div>
                  <h4 className="font-serif font-bold text-lg text-white">5-Sta Bɛst</h4>
                  <p className="text-xs text-white/50 tracking-wider uppercase mt-1">Fos klas it say an kafitiria</p>
                </div>
              </div>
            </Reveal>

            {/* Pikcho Say */}
            <Reveal direction="left" className="order-1 lg:order-2 relative flex justify-center">
              <div className="w-full max-w-[400px] aspect-[3/4] egg-shape relative overflow-hidden border border-[#D4AF37]/20 glow-gold p-2 bg-[#121212]">
                <div className="w-full h-full egg-shape overflow-hidden">
                  <img 
                    src="https://image2url.com/r2/default/images/1773855646363-1b3921bd-151e-4bda-a338-803ae44b926c.jpg" 
                    alt="Fos klas tin dem" 
                    className="w-full h-full object-cover hover:scale-110 transition-transform duration-1000"
                  />
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* --- MENYOO SƐKSHON --- */}
      <section id="menu" className="py-24 md:py-32 bg-[#050505] relative border-y border-[#D4AF37]/10">
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="text-center mb-16">
            <Reveal delay={100}>
              <h2 className="text-[#D4AF37] tracking-[0.2em] text-xs uppercase mb-4 font-bold">Wan Rawn Palet</h2>
              <h3 className="text-4xl md:text-5xl font-serif text-white">Di Gol Menyoo</h3>
            </Reveal>
          </div>

          {/* Bɔtin Dem */}
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

          {/* Menyoo Aytɛm Dem */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {menuData[activeMenuCategory].map((item, index) => (
              <Reveal key={item.name} delay={index * 100} direction="up">
                <div className="bg-[#121212] p-6 rounded-[50px] border border-white/5 hover:border-[#D4AF37]/50 transition-colors duration-500 group cursor-pointer glow-gold-hover h-full flex flex-col sm:flex-row items-center gap-6">
                  {/* Pikcho fo di It */}
                  <div className="w-32 h-32 shrink-0 egg-shape overflow-hidden border border-[#D4AF37]/30 p-1 glow-gold">
                    <div className="w-full h-full egg-shape overflow-hidden">
                      <img 
                        src={item.image} 
                        alt={item.name} 
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                      />
                    </div>
                  </div>
                  {/* Tɛkst Dem */}
                  <div className="flex-1 w-full text-center sm:text-left">
                    <div className="flex flex-col sm:flex-row justify-between items-center sm:items-start mb-2 gap-2">
                      <h4 className="text-xl font-serif text-white group-hover:text-[#D4AF37] transition-colors">{item.name}</h4>
                      <span className="text-black bg-[#D4AF37] px-4 py-1 rounded-[50px] font-bold tracking-wider text-xs whitespace-nowrap">{item.price}</span>
                    </div>
                    <p className="text-white/50 text-sm leading-relaxed font-light">{item.desc}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
          
          <div className="text-center mt-16">
            <Reveal delay={300}>
              <button onClick={() => scrollTo('reservation')} className="inline-flex items-center gap-3 text-[#D4AF37] hover:text-[#F3E5AB] transition-colors duration-300 tracking-widest uppercase text-xs font-bold bg-[#D4AF37]/10 px-8 py-4 rounded-[50px] border border-[#D4AF37]/30">
                Buk fo Tes <ChevronRight size={16} />
              </button>
            </Reveal>
          </div>
        </div>
      </section>

      {/* --- GALARI SƐKSHON --- */}
      <section id="gallery" className="py-24 bg-[#0A0A0A]">
        <div className="max-w-[1400px] mx-auto px-6">
          <Reveal className="text-center mb-16">
            <h2 className="text-[#D4AF37] tracking-[0.2em] text-xs uppercase mb-4 font-bold">Fyn Pikcho Dem</h2>
            <h3 className="text-4xl md:text-5xl font-serif text-white">Mek Fyn bay Dizayn</h3>
          </Reveal>

          {/* Ovalu Layawt */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {galleryImages.map((src, index) => (
              <Reveal key={index} delay={index * 100} direction="scale" className="group flex justify-center">
                <div className={`w-full max-w-[300px] relative overflow-hidden border border-[#D4AF37]/20 glow-gold p-2 bg-[#121212] transition-transform duration-500 hover:-translate-y-4 ${index % 2 === 0 ? 'egg-shape aspect-[3/4]' : 'oval-shape aspect-square mt-0 lg:mt-16'}`}>
                  <div className={`w-full h-full overflow-hidden ${index % 2 === 0 ? 'egg-shape' : 'oval-shape'}`}>
                    <img 
                      src={src} 
                      alt={`Galari Pikcho ${index + 1}`} 
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

      {/* --- TƐSTIMONIALS SƐKSHON --- */}
      <section className="py-24 bg-[#050505] text-white relative overflow-hidden border-t border-[#D4AF37]/10">
        <div className="absolute inset-0 bg-[url('https://image2url.com/r2/default/images/1773855879123-3c090c06-ff80-4ba5-8fb4-1d494e2686c3.jpg')] opacity-[0.03] bg-cover bg-fixed bg-center"></div>
        
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <Reveal className="text-center mb-16">
            <h2 className="text-[#D4AF37] tracking-[0.2em] text-xs uppercase mb-4 font-bold">Wetn Pipul Se</h2>
            <h3 className="text-4xl font-serif text-white">Gol Wod Dem</h3>
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

      {/* --- BUKIN & LOKESHON SƐKSHON --- */}
      <section id="reservation" className="bg-[#0A0A0A] py-24 relative border-t border-[#D4AF37]/10">
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
            
            {/* Bukin Fɔm */}
            <Reveal direction="left">
              <div className="bg-[#121212] p-10 md:p-16 rounded-[60px] border border-[#D4AF37]/30 glow-gold relative overflow-hidden">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-1 bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent"></div>
                
                <h3 className="text-3xl font-serif text-white mb-2 text-center">Buk Yu Tebu</h3>
                <p className="text-white/50 mb-10 text-xs tracking-wider uppercase text-center font-bold">Buk wi fyn it say nw.</p>
                
                <form onSubmit={handleReservation} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <input required name="name" type="text" className="w-full bg-[#050505] border border-white/10 rounded-[50px] px-6 py-4 text-white text-sm focus:outline-none focus:border-[#D4AF37] transition-colors" placeholder="Ful Nem" />
                    </div>
                    <div>
                      <input required name="phone" type="tel" className="w-full bg-[#050505] border border-white/10 rounded-[50px] px-6 py-4 text-white text-sm focus:outline-none focus:border-[#D4AF37] transition-colors" placeholder="Fon Nomba" />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                      <select required name="guests" className="w-full bg-[#050505] border border-white/10 rounded-[50px] px-6 py-4 text-white text-sm focus:outline-none focus:border-[#D4AF37] transition-colors appearance-none">
                        <option value="" disabled selected className="text-white/50">Gɛst dem</option>
                        {[1,2,3,4,5,6,7,8].map(num => <option key={num} value={num}>{num} Pɔsin</option>)}
                        <option value="9+">9+ Pɔsin dem</option>
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
                    Buk pan WhatsApp <MessageCircle size={16} />
                  </button>
                </form>
              </div>
            </Reveal>

            {/* Lokeshon & Map */}
            <Reveal direction="right" id="location" className="flex flex-col justify-between">
              <div className="mb-10 bg-[#121212] p-10 rounded-[50px] border border-white/5">
                <h3 className="text-3xl font-serif text-white mb-8">Say we wi de an Tem</h3>
                
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-[#D4AF37]/10 flex items-center justify-center shrink-0 border border-[#D4AF37]/30">
                      <MapPin className="text-[#D4AF37]" size={18} />
                    </div>
                    <div>
                      <h4 className="text-white font-bold mb-1 tracking-wider uppercase text-xs">Adres</h4>
                      <p className="text-white/60 text-sm leading-relaxed font-light">
                        Shop #G14, Al Ain Center<br/>
                        Al Mankhool Rd, Dubai, UAE
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-[#D4AF37]/10 flex items-center justify-center shrink-0 border border-[#D4AF37]/30">
                      <Phone className="text-[#D4AF37]" size={18} />
                    </div>
                    <div>
                      <h4 className="text-white font-bold mb-1 tracking-wider uppercase text-xs">Kɔntakt</h4>
                      <p className="text-white/60 text-sm font-light">+971 58 146 7575</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-[#D4AF37]/10 flex items-center justify-center shrink-0 border border-[#D4AF37]/30">
                      <Clock className="text-[#D4AF37]" size={18} />
                    </div>
                    <div>
                      <h4 className="text-white font-bold mb-1 tracking-wider uppercase text-xs">Tem we wi de Opin</h4>
                      <p className="text-white/60 text-sm font-light">Evri De: 11:00 AM - 1:00 AM</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Map Pikcho */}
              <div className="relative h-48 w-full bg-[#111] overflow-hidden group rounded-[100px] border border-[#D4AF37]/30 p-2 glow-gold">
                <div className="w-full h-full rounded-[100px] overflow-hidden relative">
                  <img 
                    src="https://image2url.com/r2/default/images/1773855914103-338ffd19-feea-4251-a3c6-2740918527a4.jpg" 
                    alt="Map we sho de lokeshon" 
                    className="w-full h-full object-cover opacity-50 mix-blend-luminosity group-hover:scale-105 transition-transform duration-1000"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#050505] to-transparent opacity-80"></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <a href="https://maps.google.com/?q=Food+Spot+Restaurant+Al+Ain+Center+Dubai" target="_blank" rel="noreferrer" className="bg-black/80 backdrop-blur-md text-[#D4AF37] px-8 py-4 rounded-[50px] border border-[#D4AF37]/50 text-xs font-bold tracking-widest uppercase hover:bg-[#D4AF37] hover:text-black transition-colors flex items-center gap-2">
                      <Navigation size={14} fill="currentColor" /> Gɛt Darɛkshɔn
                    </a>
                  </div>
                </div>
              </div>
            </Reveal>

          </div>
        </div>
      </section>

      {/* --- FUTA --- */}
      <footer className="bg-[#050505] pt-24 pb-10 rounded-t-[50px] md:rounded-t-[100px] border-t border-[#D4AF37]/20 relative mt-[-20px] z-20 shadow-[0_-10px_30px_rgba(212,175,55,0.05)]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16 text-center md:text-left">
            
            <div className="col-span-1 md:col-span-2 flex flex-col items-center md:items-start">
              <div className="text-3xl font-serif text-white mb-6">
                <span className="text-[#D4AF37]">Fud</span> Spot
              </div>
              <p className="text-white/50 text-sm leading-relaxed max-w-xs font-light">
                Di fayn it an di fos klas tin dem we i mɛk fo wi pipul we de na Dubay.
              </p>
            </div>

            <div className="flex flex-col items-center md:items-start">
              <h4 className="text-[#D4AF37] font-bold mb-6 tracking-widest uppercase text-xs">Luk Arawn</h4>
              <ul className="space-y-4 text-white/50 text-sm font-light">
                <li><a href="#about" className="hover:text-[#D4AF37] transition-colors">Wi Tori</a></li>
                <li><a href="#menu" className="hover:text-[#D4AF37] transition-colors">Gol Menyoo</a></li>
                <li><a href="#gallery" className="hover:text-[#D4AF37] transition-colors">Pikcho Dem</a></li>
                <li><a href="#reservation" className="hover:text-[#D4AF37] transition-colors">Buk Naw</a></li>
              </ul>
            </div>

            <div className="flex flex-col items-center md:items-start">
              <h4 className="text-[#D4AF37] font-bold mb-6 tracking-widest uppercase text-xs">Soshial Dem</h4>
              <div className="flex gap-4">
                <a href="#" className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-white/70 hover:text-black hover:bg-[#D4AF37] hover:border-[#D4AF37] transition-all"><Instagram size={18} /></a>
                <a href="#" className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-white/70 hover:text-black hover:bg-[#D4AF37] hover:border-[#D4AF37] transition-all"><Facebook size={18} /></a>
                <a href="#" className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-white/70 hover:text-black hover:bg-[#D4AF37] hover:border-[#D4AF37] transition-all"><Twitter size={18} /></a>
              </div>
            </div>

          </div>
          
          <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row items-center justify-between text-xs text-white/30 tracking-wider font-light">
            <p>&copy; {new Date().getFullYear()} Fud Spot Rɛstɔrant & Kafitiria. All rights reserved.</p>
            <div className="flex gap-4 mt-4 md:mt-0">
              <a href="#" className="hover:text-white transition-colors">Prayvesi Pɔlisi</a>
              <a href="#" className="hover:text-white transition-colors">Tams of Savis</a>
            </div>
          </div>
        </div>
      </footer>

      {/* --- WHATSAPP BƆTIN --- */}
      <a 
        href="https://wa.me/971581467575?text=Adu,%20A%20want%20fo%20buk%20tebu%20na%20Fud%20Spot%20Rɛstɔrant%20&%20Kafitiria" 
        target="_blank" 
        rel="noreferrer"
        className="fixed bottom-6 right-6 z-50 bg-[#25D366] text-white p-4 rounded-full shadow-[0_0_20px_rgba(37,211,102,0.4)] hover:scale-110 transition-transform duration-300 group flex items-center gap-0 overflow-hidden"
        aria-label="Chat pan WhatsApp"
      >
        <MessageCircle size={28} />
        <span className="max-w-0 overflow-hidden whitespace-nowrap group-hover:max-w-xs transition-all duration-500 ease-in-out font-bold tracking-wide text-xs pl-0 group-hover:pl-3 uppercase">
          Buk Tebu
        </span>
      </a>

    </>
  );
}