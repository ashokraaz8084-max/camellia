import React, { useState, useEffect, useRef } from 'react';
import { 
  Menu as MenuIcon, X, MapPin, Phone, Clock, ChevronRight, 
  Star, Quote, Instagram, Facebook, MessageCircle, Play
} from 'lucide-react';

// --- STYLES INJECTION ---
const customStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500&family=Poppins:wght@300;400;500;600&display=swap');

  :root {
    --gold: #D4AF37;
    --dark: #050505;
    --darker: #020202;
    --gray: #1a1a1a;
  }

  body {
    background-color: var(--dark);
    color: #ffffff;
    font-family: 'Poppins', sans-serif;
    overflow-x: hidden;
    scroll-behavior: smooth;
  }

  /* Custom Scrollbar for a premium feel */
  ::-webkit-scrollbar {
    width: 6px;
  }
  ::-webkit-scrollbar-track {
    background: var(--darker);
  }
  ::-webkit-scrollbar-thumb {
    background: #333;
    border-radius: 10px;
  }
  ::-webkit-scrollbar-thumb:hover {
    background: var(--gold);
  }

  .font-playfair {
    font-family: 'Playfair Display', serif;
  }

  /* Animations */
  @keyframes kenburns {
    0% { transform: scale(1); }
    100% { transform: scale(1.15); }
  }
  .animate-kenburns {
    animation: kenburns 25s ease-in-out infinite alternate;
  }

  @keyframes float {
    0% { transform: translateY(0px); }
    50% { transform: translateY(-10px); }
    100% { transform: translateY(0px); }
  }
  .animate-float {
    animation: float 4s ease-in-out infinite;
  }

  /* Glassmorphism Utilities */
  .glass {
    background: rgba(10, 10, 10, 0.4);
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
    border: 1px solid rgba(255, 255, 255, 0.05);
  }

  .glass-card {
    background: linear-gradient(145deg, rgba(26,26,26,0.6) 0%, rgba(10,10,10,0.8) 100%);
    backdrop-filter: blur(10px);
    border: 1px solid rgba(212, 175, 55, 0.1);
    box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.5);
  }

  .gold-gradient-text {
    background: linear-gradient(to right, #BF953F, #FCF6BA, #B38728, #FBF5B7, #AA771C);
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
  }

  .text-glow {
    text-shadow: 0 0 20px rgba(212, 175, 55, 0.4);
  }

  /* Map Styling - Turns Google Maps Dark/Gold */
  .map-dark {
    filter: invert(100%) hue-rotate(180deg) brightness(90%) contrast(110%) sepia(20%);
  }
`;

// --- CUSTOM COMPONENTS ---

const RevealOnScroll = ({ children, delay = 0, direction = 'up' }) => {
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
    if (isVisible) return 'translate-y-0 translate-x-0 opacity-100';
    switch (direction) {
      case 'up': return 'translate-y-16 opacity-0';
      case 'down': return '-translate-y-16 opacity-0';
      case 'left': return 'translate-x-16 opacity-0';
      case 'right': return '-translate-x-16 opacity-0';
      default: return 'translate-y-16 opacity-0';
    }
  };

  return (
    <div
      ref={ref}
      className={`transition-all duration-1000 ease-out ${getTransform()}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};

// --- MAIN APP COMPONENT ---

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [activeMenuTab, setActiveMenuTab] = useState('Starters');
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

    // Simulate Premium Loading
    setTimeout(() => setIsLoading(false), 2500);

    // Scroll listener for Navbar
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
      const phone = "971506475980";
      const message = `*Exclusive Reservation Request - Al Safrah* 🌟\n\n*Guest Name:* ${formData.name}\n*Contact:* ${formData.phone}\n*Party Size:* ${formData.guests} Guests\n*Date:* ${formData.date}\n*Time:* ${formData.time}\n\nLooking forward to an exquisite experience.`;
      const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
      window.open(url, "_blank");
      setIsSubmitting(false);
      
      // Reset Form
      setFormData({name: '', phone: '', guests: '2', date: '', time: ''});
    }, 1000);
  };

  // --- DATA ---
  const menuData = {
    Starters: [
      { name: 'Wagyu Beef Tartare', desc: 'Truffle aioli, confit quail egg, 24k gold leaf, brioche', price: 'AED 185', img: 'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=800&auto=format&fit=crop' },
      { name: 'Beluga Caviar Blinis', desc: 'Premium Royal Beluga, crème fraîche, chives', price: 'AED 450', img: 'https://images.unsplash.com/photo-1626844131082-256783844137?w=800&auto=format&fit=crop' },
      { name: 'Lobster Bisque', desc: 'Maine lobster, cognac cream, fennel pollen', price: 'AED 145', img: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=800&auto=format&fit=crop' },
      { name: 'Burrata & Heirloom', desc: 'Truffle honey, basil emulsion, aged balsamic', price: 'AED 120', img: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800&auto=format&fit=crop' }
    ],
    Mains: [
      { name: 'Signature 24k Tomahawk', desc: 'MB9+ Wagyu, smoked garlic puree, bordelaise sauce', price: 'AED 950', img: 'https://images.unsplash.com/photo-1551218808-94e220e084d2?w=800&auto=format&fit=crop' },
      { name: 'Chilean Sea Bass', desc: 'Miso glaze, wild mushrooms, dashi broth', price: 'AED 280', img: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=800&auto=format&fit=crop' },
      { name: 'Truffle Risotto', desc: 'Acquerello rice, aged parmesan, fresh shaved black truffle', price: 'AED 220', img: 'https://images.unsplash.com/photo-1633337474564-1d94fa46a1df?w=800&auto=format&fit=crop' },
      { name: 'Roasted Lamb Rack', desc: 'Herb crusted, pistachio mint pesto, fondant potatoes', price: 'AED 310', img: 'https://images.unsplash.com/photo-1600891964092-4316c288032e?w=800&auto=format&fit=crop' }
    ],
    Desserts: [
      { name: 'The Golden Sphere', desc: 'Valrhona chocolate, hazelnut praline, hot caramel pour', price: 'AED 150', img: 'https://images.unsplash.com/photo-1551024506-0bccd828d307?w=800&auto=format&fit=crop' },
      { name: 'Saffron Panna Cotta', desc: 'Iranian saffron, rose water, pistachio crumble', price: 'AED 95', img: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?w=800&auto=format&fit=crop' },
      { name: 'Madagascar Vanilla Mille-Feuille', desc: 'Caramelized puff pastry, vanilla bean diplomat cream', price: 'AED 110', img: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=800&auto=format&fit=crop' }
    ]
  };

  const galleryImages = [
    'https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=1200&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?w=1200&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1200&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1600891964092-4316c288032e?w=1200&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1551218808-94e220e084d2?w=1200&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1544025162-d76694265947?w=1200&auto=format&fit=crop',
  ];

  if (isLoading) {
    return (
      <div className="fixed inset-0 z-[100] flex items-center justify-center bg-[#050505]">
        <div className="text-center animate-pulse">
          <h1 className="font-playfair text-4xl md:text-6xl text-[#D4AF37] tracking-widest mb-4">AL SAFRAH</h1>
          <div className="h-[1px] w-0 bg-[#D4AF37] mx-auto animate-[expand_1.5s_ease-out_forwards]"></div>
          <p className="uppercase tracking-[0.3em] text-xs mt-4 text-white/50">Dubai</p>
          <style>{`@keyframes expand { to { width: 100px; } }`}</style>
        </div>
      </div>
    );
  }

  return (
    <div className="relative bg-[#050505] min-h-screen text-white selection:bg-[#D4AF37] selection:text-black">
      
      {/* Navigation */}
      <nav className={`fixed w-full z-50 transition-all duration-500 ${scrolled ? 'glass py-4' : 'bg-transparent py-6'}`}>
        <div className="container mx-auto px-6 md:px-12 flex justify-between items-center">
          <a href="#" className="font-playfair text-2xl tracking-widest text-[#D4AF37] font-semibold">
            AL SAFRAH
          </a>
          
          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-10">
            {['About', 'Menu', 'Gallery', 'Reviews'].map((item) => (
              <a key={item} href={`#${item.toLowerCase()}`} className="text-sm uppercase tracking-widest text-gray-300 hover:text-[#D4AF37] transition-colors">
                {item}
              </a>
            ))}
            <a href="#book" className="px-6 py-2 border border-[#D4AF37] text-[#D4AF37] text-sm uppercase tracking-widest hover:bg-[#D4AF37] hover:text-black transition-all duration-300">
              Book a Table
            </a>
          </div>

          {/* Mobile Nav Toggle */}
          <button className="md:hidden text-[#D4AF37]" onClick={() => setIsNavOpen(!isNavOpen)}>
            {isNavOpen ? <X size={28} /> : <MenuIcon size={28} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div className={`fixed inset-0 z-40 bg-[#050505] flex flex-col items-center justify-center space-y-8 transition-all duration-500 ${isNavOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`}>
        {['About', 'Menu', 'Gallery', 'Reviews'].map((item) => (
          <a key={item} href={`#${item.toLowerCase()}`} onClick={() => setIsNavOpen(false)} className="font-playfair text-3xl text-white hover:text-[#D4AF37] transition-colors">
            {item}
          </a>
        ))}
        <a href="#book" onClick={() => setIsNavOpen(false)} className="mt-8 px-8 py-3 bg-[#D4AF37] text-black font-medium tracking-widest uppercase">
          Book a Table
        </a>
      </div>

      {/* 1. Hero Section */}
      <section className="relative h-screen w-full flex items-center justify-center overflow-hidden">
        {/* Background Video/Image fallback */}
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1559339352-11d035aa65de?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80" 
            alt="Fine Dining" 
            className="w-full h-full object-cover animate-kenburns opacity-60"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-[#050505]"></div>
        </div>

        <div className="relative z-10 text-center px-4 max-w-5xl mx-auto flex flex-col items-center">
          <RevealOnScroll delay={100}>
            <p className="uppercase tracking-[0.4em] text-[#D4AF37] text-sm md:text-base font-medium mb-6">Al Raffa Street, Dubai</p>
          </RevealOnScroll>
          <RevealOnScroll delay={300}>
            <h1 className="font-playfair text-5xl md:text-8xl text-white mb-6 leading-tight">
              Experience the Taste of <br/>
              <span className="gold-gradient-text text-glow italic">Authentic Luxury</span>
            </h1>
          </RevealOnScroll>
          <RevealOnScroll delay={500}>
            <p className="text-gray-300 text-lg md:text-xl font-light max-w-2xl mx-auto mb-10">
              Where culinary artistry meets the pinnacle of elegant dining. An unforgettable Michelin-level journey awaits.
            </p>
          </RevealOnScroll>
          <RevealOnScroll delay={700}>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <a href="#book" className="px-10 py-4 bg-[#D4AF37] text-black text-sm uppercase tracking-[0.2em] font-medium hover:bg-white transition-colors duration-300">
                Reserve Your Table
              </a>
              <a href="#menu" className="px-10 py-4 border border-white/30 text-white text-sm uppercase tracking-[0.2em] font-medium hover:border-[#D4AF37] hover:text-[#D4AF37] glass transition-all duration-300">
                Discover the Menu
              </a>
            </div>
          </RevealOnScroll>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 animate-float">
          <div className="w-[1px] h-16 bg-gradient-to-b from-[#D4AF37] to-transparent mx-auto"></div>
        </div>
      </section>

      {/* 2. About Section */}
      <section id="about" className="py-24 md:py-32 relative bg-[#0a0a0a]">
        <div className="container mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <RevealOnScroll direction="right">
              <div className="relative">
                <div className="absolute -inset-4 border border-[#D4AF37]/30 translate-x-4 translate-y-4"></div>
                <img 
                  src="https://images.unsplash.com/photo-1600891964092-4316c288032e?q=80&w=2070&auto=format&fit=crop" 
                  alt="Chef plating" 
                  className="relative z-10 w-full h-[600px] object-cover grayscale-[20%] hover:grayscale-0 transition-all duration-700"
                />
                <div className="absolute bottom-8 -left-8 bg-[#050505] p-6 border border-[#D4AF37]/20 z-20 glass-card">
                  <p className="font-playfair text-4xl text-[#D4AF37]">15+</p>
                  <p className="text-sm uppercase tracking-widest text-gray-400 mt-1">Years of Excellence</p>
                </div>
              </div>
            </RevealOnScroll>
            
            <RevealOnScroll direction="left" delay={200}>
              <div className="max-w-lg">
                <h3 className="uppercase tracking-[0.3em] text-[#D4AF37] text-sm mb-4">Our Heritage</h3>
                <h2 className="font-playfair text-4xl md:text-5xl mb-8 leading-tight">
                  A Symphony of <br/><span className="italic text-gray-400">Flavors & Elegance</span>
                </h2>
                <div className="w-16 h-[1px] bg-[#D4AF37] mb-8"></div>
                <p className="text-gray-400 leading-relaxed font-light mb-6">
                  Nestled in the heart of Al Raffa Street, Al Safrah represents the zenith of Dubai's fine dining scene. Our philosophy is rooted in sourcing the world's most exclusive ingredients and transforming them into edible masterpieces.
                </p>
                <p className="text-gray-400 leading-relaxed font-light mb-10">
                  Led by our award-winning Executive Chef, every dish is a meticulously crafted narrative, designed to awaken the senses and redefine luxury gastronomy.
                </p>
                <img src="https://upload.wikimedia.org/wikipedia/commons/f/fa/Signature_of_John_Hancock.svg" className="h-12 opacity-50 invert" alt="Chef Signature"/>
                <p className="mt-4 text-sm tracking-widest uppercase text-[#D4AF37]">Executive Chef</p>
              </div>
            </RevealOnScroll>
          </div>
        </div>
      </section>

      {/* 3. Signature Menu */}
      <section id="menu" className="py-24 md:py-32 bg-[#050505] relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#D4AF37] rounded-full blur-[150px] opacity-[0.03]"></div>
        
        <div className="container mx-auto px-6 md:px-12 relative z-10">
          <div className="text-center mb-16">
            <RevealOnScroll>
              <h3 className="uppercase tracking-[0.3em] text-[#D4AF37] text-sm mb-4">The Epikurean Journey</h3>
              <h2 className="font-playfair text-4xl md:text-5xl mb-6">Signature Menu</h2>
              <div className="w-24 h-[1px] bg-[#D4AF37] mx-auto"></div>
            </RevealOnScroll>
          </div>

          {/* Menu Categories */}
          <RevealOnScroll delay={200}>
            <div className="flex justify-center space-x-8 mb-16">
              {Object.keys(menuData).map((category) => (
                <button
                  key={category}
                  onClick={() => setActiveMenuTab(category)}
                  className={`text-sm uppercase tracking-widest pb-2 transition-all duration-300 border-b-2 ${
                    activeMenuTab === category ? 'border-[#D4AF37] text-[#D4AF37]' : 'border-transparent text-gray-500 hover:text-white'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </RevealOnScroll>

          {/* Menu Items Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-16">
            {menuData[activeMenuTab].map((item, index) => (
              <RevealOnScroll key={index} delay={index * 150}>
                <div className="group flex flex-col sm:flex-row gap-6 items-start p-4 hover:bg-white/[0.02] rounded-xl transition-all duration-500 cursor-pointer border border-transparent hover:border-white/5">
                  <div className="w-full sm:w-32 h-32 shrink-0 overflow-hidden rounded-lg relative">
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-all z-10"></div>
                    <img 
                      src={item.img} 
                      alt={item.name} 
                      className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                    />
                  </div>
                  <div className="flex-1 w-full">
                    <div className="flex justify-between items-baseline mb-2 border-b border-white/10 pb-2">
                      <h4 className="font-playfair text-xl text-white group-hover:text-[#D4AF37] transition-colors">{item.name}</h4>
                      <span className="text-[#D4AF37] font-medium tracking-wider pl-4">{item.price}</span>
                    </div>
                    <p className="text-gray-400 font-light text-sm leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              </RevealOnScroll>
            ))}
          </div>

          <div className="mt-20 text-center">
             <RevealOnScroll>
               <a href="#book" className="inline-flex items-center text-[#D4AF37] text-sm uppercase tracking-widest hover:text-white transition-colors group">
                 Download Full Menu <ChevronRight className="ml-2 w-4 h-4 transform group-hover:translate-x-2 transition-transform"/>
               </a>
             </RevealOnScroll>
          </div>
        </div>
      </section>

      {/* 4. Gallery Section */}
      <section id="gallery" className="py-24 bg-[#0a0a0a]">
        <div className="container mx-auto px-6 md:px-12">
           <RevealOnScroll>
            <div className="flex flex-col md:flex-row justify-between items-end mb-16">
              <div>
                <h3 className="uppercase tracking-[0.3em] text-[#D4AF37] text-sm mb-4">Visual Aesthetics</h3>
                <h2 className="font-playfair text-4xl md:text-5xl">The Atmosphere</h2>
              </div>
              <p className="text-gray-400 max-w-sm font-light mt-6 md:mt-0">
                Immerse yourself in an environment designed for absolute comfort and unparalleled luxury.
              </p>
            </div>
           </RevealOnScroll>

           {/* Masonry-style Grid */}
           <div className="grid grid-cols-1 md:grid-cols-3 gap-4 auto-rows-[300px]">
             {galleryImages.map((src, idx) => (
               <RevealOnScroll key={idx} delay={idx * 100}>
                 <div 
                  className={`relative w-full h-full overflow-hidden group cursor-pointer ${idx === 0 ? 'md:col-span-2 md:row-span-2' : ''} ${idx === 3 ? 'md:col-span-2' : ''}`}
                  onClick={() => setLightboxImg(src)}
                 >
                   <div className="absolute inset-0 bg-black/40 group-hover:bg-black/10 transition-colors duration-500 z-10"></div>
                   <img 
                     src={src} 
                     alt="Gallery" 
                     className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-1000"
                     loading="lazy"
                   />
                   <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-20">
                     <span className="bg-black/50 backdrop-blur-sm text-white px-6 py-2 uppercase tracking-widest text-xs border border-white/20">View</span>
                   </div>
                 </div>
               </RevealOnScroll>
             ))}
           </div>
        </div>
      </section>

      {/* Lightbox */}
      {lightboxImg && (
        <div className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-xl flex items-center justify-center p-4" onClick={() => setLightboxImg(null)}>
          <button className="absolute top-10 right-10 text-white/50 hover:text-white transition-colors" onClick={() => setLightboxImg(null)}>
            <X size={40} strokeWidth={1}/>
          </button>
          <img src={lightboxImg} alt="Enlarged" className="max-w-full max-h-[90vh] object-contain shadow-2xl" />
        </div>
      )}

      {/* 5. Customer Reviews */}
      <section id="reviews" className="py-24 md:py-32 bg-[#050505] relative border-y border-white/5">
         <div className="container mx-auto px-6 md:px-12 text-center">
            <RevealOnScroll>
              <Quote className="w-12 h-12 text-[#D4AF37]/30 mx-auto mb-8" />
              <h2 className="font-playfair text-4xl mb-16">Words of Esteem</h2>
            </RevealOnScroll>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { name: "James L.", role: "Food Critic", text: "A transcendent dining experience. The 24k Tomahawk is an absolute masterpiece. Al Safrah has redefined luxury dining in Dubai." },
                { name: "Sarah & David", role: "Anniversary Guests", text: "From the moment we stepped in, we were treated like royalty. The ambiance, the service, and the flavors are purely exquisite." },
                { name: "Mohammed A.", role: "Local Connoisseur", text: "The Wagyu Beef Tartare is the best I've had globally. A phenomenal addition to Al Raffa Street. Highly recommended for special occasions." }
              ].map((review, idx) => (
                <RevealOnScroll key={idx} delay={idx * 200}>
                  <div className="glass-card p-10 text-left h-full flex flex-col justify-between hover:-translate-y-2 transition-transform duration-500">
                    <div>
                      <div className="flex text-[#D4AF37] mb-6">
                        {[...Array(5)].map((_, i) => <Star key={i} size={16} fill="currentColor" />)}
                      </div>
                      <p className="text-gray-300 font-light leading-relaxed mb-8">"{review.text}"</p>
                    </div>
                    <div>
                      <h4 className="font-playfair text-xl text-white">{review.name}</h4>
                      <p className="text-[#D4AF37] text-xs uppercase tracking-widest mt-1">{review.role}</p>
                    </div>
                  </div>
                </RevealOnScroll>
              ))}
            </div>
         </div>
      </section>

      {/* 6 & 7. Booking & Map Section */}
      <section id="book" className="py-0 flex flex-col md:flex-row bg-[#0a0a0a]">
        
        {/* Reservation Form */}
        <div className="w-full md:w-1/2 p-8 md:p-20 flex items-center justify-center relative">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-10 pointer-events-none"></div>
          <div className="w-full max-w-md relative z-10">
            <RevealOnScroll>
              <h3 className="uppercase tracking-[0.3em] text-[#D4AF37] text-sm mb-4">Reservations</h3>
              <h2 className="font-playfair text-4xl md:text-5xl mb-8">Secure Your Table</h2>
              <p className="text-gray-400 font-light mb-10 text-sm">For parties larger than 6, please contact us directly via WhatsApp.</p>
            </RevealOnScroll>

            <RevealOnScroll delay={200}>
              <form onSubmit={handleBookTable} className="space-y-6">
                <div className="group">
                  <input type="text" required value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} placeholder="Full Name" className="w-full bg-transparent border-b border-white/20 pb-3 text-white focus:outline-none focus:border-[#D4AF37] transition-colors font-light placeholder-gray-600" />
                </div>
                <div className="group">
                  <input type="tel" required value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})} placeholder="Phone Number" className="w-full bg-transparent border-b border-white/20 pb-3 text-white focus:outline-none focus:border-[#D4AF37] transition-colors font-light placeholder-gray-600" />
                </div>
                <div className="grid grid-cols-2 gap-6">
                  <div className="group">
                    <select value={formData.guests} onChange={(e) => setFormData({...formData, guests: e.target.value})} className="w-full bg-transparent border-b border-white/20 pb-3 text-white focus:outline-none focus:border-[#D4AF37] transition-colors font-light appearance-none cursor-pointer">
                      <option value="1" className="bg-[#0a0a0a]">1 Guest</option>
                      <option value="2" className="bg-[#0a0a0a]">2 Guests</option>
                      <option value="3" className="bg-[#0a0a0a]">3 Guests</option>
                      <option value="4" className="bg-[#0a0a0a]">4 Guests</option>
                      <option value="5" className="bg-[#0a0a0a]">5 Guests</option>
                      <option value="6" className="bg-[#0a0a0a]">6 Guests</option>
                    </select>
                  </div>
                  <div className="group">
                    <input type="date" required value={formData.date} onChange={(e) => setFormData({...formData, date: e.target.value})} className="w-full bg-transparent border-b border-white/20 pb-3 text-white focus:outline-none focus:border-[#D4AF37] transition-colors font-light [color-scheme:dark]" />
                  </div>
                </div>
                <div className="group">
                  <input type="time" required value={formData.time} onChange={(e) => setFormData({...formData, time: e.target.value})} className="w-full bg-transparent border-b border-white/20 pb-3 text-white focus:outline-none focus:border-[#D4AF37] transition-colors font-light [color-scheme:dark]" />
                </div>
                <button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="w-full mt-8 py-4 bg-[#D4AF37] text-black uppercase tracking-[0.2em] font-medium hover:bg-white transition-all duration-300 disabled:opacity-70 flex justify-center items-center group"
                >
                  {isSubmitting ? 'Processing...' : 'Request Reservation'}
                  {!isSubmitting && <ChevronRight className="ml-2 w-4 h-4 transform group-hover:translate-x-1 transition-transform"/>}
                </button>
              </form>
            </RevealOnScroll>
          </div>
        </div>

        {/* Google Map Integration */}
        <div className="w-full md:w-1/2 h-[500px] md:h-auto relative grayscale hover:grayscale-0 transition-all duration-1000">
           <iframe 
             src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14434.931891963283!2d55.281144!3d25.253684!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f43254924a445%3A0x6b8c8d8c2e6f4977!2sAl%20Raffa%20Street%2C%20Dubai!5e0!3m2!1sen!2sae!4v1710000000000!5m2!1sen!2sae" 
             className="w-full h-full border-0 map-dark" 
             allowFullScreen="" 
             loading="lazy" 
             referrerPolicy="no-referrer-when-downgrade"
             title="Al Safrah Location"
           ></iframe>
           <div className="absolute inset-0 bg-black/20 pointer-events-none"></div>
        </div>

      </section>

      {/* Footer */}
      <footer className="bg-[#020202] pt-24 pb-12 border-t border-white/5">
        <div className="container mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
            <div className="md:col-span-1">
              <h2 className="font-playfair text-3xl text-[#D4AF37] tracking-widest mb-6">AL SAFRAH</h2>
              <p className="text-gray-400 font-light text-sm leading-relaxed mb-6">
                The pinnacle of luxury dining in Dubai. An authentic experience curated for the elite.
              </p>
              <div className="flex space-x-4 text-gray-400">
                <a href="#" className="hover:text-[#D4AF37] transition-colors"><Instagram size={20} /></a>
                <a href="#" className="hover:text-[#D4AF37] transition-colors"><Facebook size={20} /></a>
              </div>
            </div>
            
            <div>
              <h4 className="text-white uppercase tracking-widest text-sm mb-6 font-medium">Contact</h4>
              <ul className="space-y-4 text-gray-400 font-light text-sm">
                <li className="flex items-center"><Phone size={16} className="mr-3 text-[#D4AF37]"/> +971 50 647 5980</li>
                <li className="flex items-start"><MapPin size={16} className="mr-3 mt-1 shrink-0 text-[#D4AF37]"/> Al Raffa Street, <br/>Dubai, UAE</li>
              </ul>
            </div>

            <div>
              <h4 className="text-white uppercase tracking-widest text-sm mb-6 font-medium">Hours</h4>
              <ul className="space-y-4 text-gray-400 font-light text-sm">
                <li className="flex items-start"><Clock size={16} className="mr-3 mt-1 shrink-0 text-[#D4AF37]"/> Mon - Sun<br/>18:00 - 01:00</li>
              </ul>
            </div>

            <div>
              <h4 className="text-white uppercase tracking-widest text-sm mb-6 font-medium">Newsletter</h4>
              <p className="text-gray-400 font-light text-sm mb-4">Subscribe for exclusive invites and secret menu drops.</p>
              <div className="flex border-b border-white/20 pb-2">
                <input type="email" placeholder="Email Address" className="bg-transparent w-full focus:outline-none text-sm font-light text-white" />
                <button className="text-[#D4AF37] hover:text-white transition-colors"><ChevronRight size={20}/></button>
              </div>
            </div>
          </div>

          <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-gray-600 tracking-widest uppercase">
            <p>&copy; {new Date().getFullYear()} Al Safrah Restaurant. All rights reserved.</p>
            <div className="flex space-x-4 mt-4 md:mt-0">
              <a href="#" className="hover:text-[#D4AF37] transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-[#D4AF37] transition-colors">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>

      {/* Floating WhatsApp Button */}
      <a 
        href="https://wa.me/971506475980?text=Hello%20Al%20Safrah%2C%20I%20would%20like%20to%20make%20an%20inquiry." 
        target="_blank" 
        rel="noopener noreferrer"
        className="fixed bottom-8 right-8 z-[90] bg-[#25D366] text-white p-4 rounded-full shadow-2xl hover:scale-110 transition-transform duration-300 animate-bounce group"
      >
        <MessageCircle size={28} />
        <span className="absolute right-full mr-4 top-1/2 -translate-y-1/2 bg-black/80 backdrop-blur-sm text-white text-xs whitespace-nowrap px-3 py-2 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none border border-white/10">
          Chat with Concierge
        </span>
      </a>

    </div>
  );
}