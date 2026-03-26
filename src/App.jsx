import React, { useState, useEffect, useRef } from 'react';
import { 
  Volume2, VolumeX, Phone, MapPin, Clock, 
  Instagram, Facebook, Twitter, MessageCircle, 
  Star, Quote, ChevronRight
} from 'lucide-react';

// --- Custom Hooks ---
const useIntersectionObserver = (options) => {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const targetRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsIntersecting(true);
        observer.unobserve(entry.target);
      }
    }, options);

    if (targetRef.current) observer.observe(targetRef.current);
    return () => { if (targetRef.current) observer.unobserve(targetRef.current); };
  }, [options]);

  return [targetRef, isIntersecting];
};

// --- Custom Cursor ---
const CustomCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const updatePosition = (e) => setPosition({ x: e.clientX, y: e.clientY });
    const handleMouseOver = (e) => {
      if (e.target.closest('button') || e.target.closest('a') || e.target.closest('input') || e.target.closest('textarea')) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener('mousemove', updatePosition);
    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', updatePosition);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, []);

  return (
    <div 
      className="fixed pointer-events-none z-[9999] mix-blend-difference transition-all duration-300 ease-out hidden md:block"
      style={{
        left: position.x,
        top: position.y,
        width: isHovering ? '60px' : '12px',
        height: isHovering ? '60px' : '12px',
        transform: 'translate(-50%, -50%)',
        border: isHovering ? '1px solid #D4AF37' : 'none',
        backgroundColor: isHovering ? 'transparent' : '#fff',
        borderRadius: '50%',
      }}
    />
  );
};

// --- Components ---
const FadeIn = ({ children, delay = 0, className = '' }) => {
  const [ref, isVisible] = useIntersectionObserver({ threshold: 0.1 });
  return (
    <div
      ref={ref}
      className={`transition-all duration-[1500ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-16'
      } ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};

// 40px Rounded Luxury Card with Gold Shadow
const LuxuryCard = ({ children, className = '', hoverEffect = true }) => (
  <div className={`bg-gradient-to-br from-[#000000] via-[#0A0A0A] to-[#D4AF37]/20 border border-[#D4AF37]/40 rounded-[40px] p-10 md:p-14 shadow-[0_0_25px_rgba(212,175,55,0.2)]
    ${hoverEffect ? 'hover:border-[#D4AF37] hover:shadow-[0_0_50px_rgba(212,175,55,0.5)] transition-all duration-700' : ''} 
    ${className}`}>
    {children}
  </div>
);

const GoldText = ({ children, className = '' }) => (
  <span className={`text-transparent bg-clip-text bg-gradient-to-r from-[#D4AF37] via-[#FFF3B0] to-[#AA7C11] ${className}`}>
    {children}
  </span>
);

export default function App() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);
  const [bookingStatus, setBookingStatus] = useState(null);
  const audioRef = useRef(null);

  // Navbar Scroll
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMusic = () => {
    if (isMusicPlaying) audioRef.current?.pause();
    else audioRef.current?.play().catch(e => console.log("Audio play blocked", e));
    setIsMusicPlaying(!isMusicPlaying);
  };

  // --- WHATSAPP BOOKING LOGIC ---
  const handleBookingSubmit = (e) => {
    e.preventDefault();
    setBookingStatus('submitting');

    const formData = new FormData(e.target);
    const name = formData.get('name');
    const phone = formData.get('phone');
    const date = formData.get('date');
    const requests = formData.get('requests') || 'None';

    const message = `✨ *New VIP Reservation Request* ✨\n\n*Name:* ${name}\n*Contact:* ${phone}\n*Date:* ${date}\n*Special Requests:* ${requests}\n\nPlease confirm my luxury VIP experience.`;
    const whatsappUrl = `https://wa.me/971505287736?text=${encodeURIComponent(message)}`;

    setTimeout(() => {
      setBookingStatus('success');
      window.open(whatsappUrl, '_blank');
      setTimeout(() => setBookingStatus(null), 5000);
      e.target.reset();
    }, 1500);
  };

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#000000] text-[#E5E5E5] font-sans selection:bg-[#D4AF37] selection:text-[#000000] overflow-x-hidden cursor-none">
      <CustomCursor />
      
      <style dangerouslySetInnerHTML={{__html: `
        @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;600;700&family=Playfair+Display:ital,wght@0,300;0,400;0,600;1,300;1,400&family=Montserrat:wght@200;300;400;500&display=swap');
        .font-playfair { font-family: 'Playfair Display', serif; }
        .font-cinzel { font-family: 'Cinzel', serif; }
        .font-sans { font-family: 'Montserrat', sans-serif; }
        .film-grain {
          position: fixed; top: 0; left: 0; width: 100vw; height: 100vh;
          pointer-events: none; z-index: 9998; opacity: 0.04;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E");
        }
        @keyframes slowPan { 0% { transform: scale(1); } 100% { transform: scale(1.1); } }
        .animate-slow-pan { animation: slowPan 30s linear infinite alternate; }
        html { scroll-behavior: smooth; }
        /* Hide scrollbar for gallery */
        .hide-scrollbar::-webkit-scrollbar { display: none; }
        .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}} />

      <div className="film-grain" />

      <audio ref={audioRef} loop src="https://cdn.pixabay.com/download/audio/2022/11/22/audio_febc508520.mp3?filename=smooth-waters-115977.mp3" />

      {/* Quick Action Buttons */}
      <div className="fixed bottom-8 right-8 z-50 flex flex-col gap-4">
        <a 
          href="https://wa.me/971505287736" target="_blank" rel="noopener noreferrer"
          className="bg-[#25D366] text-white p-4 rounded-full shadow-[0_0_20px_rgba(37,211,102,0.3)] hover:scale-110 transition-transform duration-500 flex items-center justify-center group relative"
        >
          <MessageCircle size={28} />
          <span className="absolute right-full mr-6 bg-[#000] text-white border border-[#D4AF37]/30 text-xs tracking-widest py-3 px-5 uppercase opacity-0 group-hover:opacity-100 transition-all duration-500 whitespace-nowrap pointer-events-none rounded-full">
            Book via WhatsApp
          </span>
        </a>
      </div>
      <div className="fixed bottom-8 left-8 z-50">
        <button onClick={toggleMusic} className="bg-[#0A0A0A] border border-[#D4AF37]/30 text-white p-4 rounded-full hover:bg-[#D4AF37]/10 transition-colors duration-500 flex items-center justify-center">
          {isMusicPlaying ? <Volume2 size={20} className="text-[#D4AF37]" /> : <VolumeX size={20} />}
        </button>
      </div>

      {/* --- NAVIGATION --- */}
      <nav className={`fixed w-full z-40 transition-all duration-1000 ${isScrolled ? 'bg-[#000000]/95 backdrop-blur-3xl py-6 border-b border-[#D4AF37]/20' : 'bg-transparent py-10'}`}>
        <div className="max-w-[1400px] mx-auto px-8 lg:px-16 flex justify-between items-center">
          <div className="flex items-center gap-4 cursor-pointer group" onClick={() => scrollTo('home')}>
            <div className="w-12 h-12 border border-[#D4AF37]/50 rounded-full flex items-center justify-center group-hover:border-[#D4AF37] transition-all duration-500 bg-[#0A0A0A]">
              <span className="font-cinzel text-[#D4AF37] text-2xl">R</span>
            </div>
            <h1 className="font-cinzel text-xl tracking-[0.3em] text-white uppercase hidden sm:block">
              Rasputin
            </h1>
          </div>
          
          {/* Added 'Entertainment' to Navigation */}
          <div className="hidden lg:flex items-center gap-12 text-[10px] tracking-[0.3em] uppercase text-gray-400">
            {['About', 'Opulence', 'Entertainment', 'Gallery', 'Reviews'].map((item) => (
              <button key={item} onClick={() => scrollTo(item.toLowerCase())} className="hover:text-[#D4AF37] transition-colors duration-500 relative group">
                {item}
                <span className="absolute -bottom-2 left-1/2 w-0 h-[1px] bg-[#D4AF37] group-hover:w-full group-hover:left-0 transition-all duration-500"></span>
              </button>
            ))}
          </div>

          <button onClick={() => scrollTo('reservations')} className="text-[#000] bg-[#D4AF37] px-8 py-3 rounded-full text-[10px] tracking-[0.2em] uppercase font-bold hover:bg-white transition-all duration-500 shadow-[0_0_15px_rgba(212,175,55,0.4)]">
            Reserve Table
          </button>
        </div>
      </nav>

      {/* --- 1. HERO SECTION --- */}
      <section id="home" className="relative h-screen w-full overflow-hidden flex items-center justify-center">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-[#000]/60 z-10" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#000]/80 via-transparent to-[#000] z-10" />
          {/* Background Image Update ki gayi hai */}
          <img 
            src="https://image2url.com/r2/default/images/1774552066415-8ad3ff14-41d2-406c-a427-94ef1b26f19f.jpg" 
            alt="Ultra Luxury Bar" 
            className="w-full h-full object-cover animate-slow-pan opacity-80"
          />
        </div>

        <div className="relative z-20 text-center px-4 w-full flex flex-col items-center mt-10">
          <FadeIn delay={200}>
            <div className="flex items-center gap-6 mb-8">
              <span className="w-16 h-[1px] bg-gradient-to-r from-transparent to-[#D4AF37]"></span>
              <p className="font-sans uppercase tracking-[0.6em] text-[#D4AF37] text-[10px] md:text-xs drop-shadow-md flex items-center gap-4">
                <Star size={10} className="text-[#D4AF37]" /> Dubai's Elite Nightlife <Star size={10} className="text-[#D4AF37]" />
              </p>
              <span className="w-16 h-[1px] bg-gradient-to-l from-transparent to-[#D4AF37]"></span>
            </div>
          </FadeIn>
          <FadeIn delay={400}>
            {/* Sirf Bar ka naam, ultra luxury font style */}
            <h1 className="font-playfair text-7xl md:text-[140px] lg:text-[160px] font-extralight text-white mb-6 leading-[0.8] tracking-tight drop-shadow-2xl">
              Rasputin <br/>
              <span className="italic"><GoldText>Bar</GoldText></span>
            </h1>
          </FadeIn>
          <FadeIn delay={600}>
            {/* Paragraph about the bar, clean and minimal */}
            <p className="font-sans text-gray-300 text-xs md:text-sm max-w-xl mx-auto mb-14 font-light tracking-[0.2em] uppercase leading-loose">
              Immerse yourself in Dubai's most exclusive nightlife destination.
            </p>
          </FadeIn>
          <FadeIn delay={800} className="flex flex-col sm:flex-row items-center justify-center gap-6 md:gap-8 w-full px-8">
            {/* Primary Button - Reserve Table */}
            <button onClick={() => scrollTo('reservations')} className="relative overflow-hidden group bg-gradient-to-r from-[#D4AF37] via-[#FFF3B0] to-[#D4AF37] bg-[length:200%_auto] hover:bg-[position:right_center] text-[#000] rounded-[40px] px-12 md:px-14 py-5 uppercase tracking-[0.4em] text-[10px] font-bold transition-all duration-700 shadow-[0_0_25px_rgba(212,175,55,0.4)] hover:shadow-[0_0_50px_rgba(212,175,55,0.7)] w-full sm:w-auto">
              Reserve Table
            </button>

            {/* Secondary Button - Discover More */}
            <button onClick={() => scrollTo('about')} className="relative overflow-hidden group border border-white/30 text-white rounded-[40px] px-12 md:px-14 py-5 uppercase tracking-[0.4em] text-[10px] font-bold transition-all duration-700 hover:border-[#D4AF37] hover:text-[#D4AF37] hover:bg-[#D4AF37]/10 w-full sm:w-auto backdrop-blur-sm">
              Discover More
            </button>
          </FadeIn>
        </div>
        
        {/* Scroll Indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-4 animate-bounce">
          <span className="text-[8px] font-sans text-[#D4AF37] uppercase tracking-widest opacity-70">Scroll</span>
          <div className="w-[1px] h-12 bg-gradient-to-b from-[#D4AF37] to-transparent"></div>
        </div>
      </section>

      {/* --- 2. ABOUT SECTION --- */}
      <section id="about" className="py-32 md:py-48 relative bg-[#000000]">
        <div className="max-w-[1400px] mx-auto px-8 lg:px-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 lg:gap-32 items-center">
            <FadeIn>
              <div className="relative group p-4">
                <div className="absolute inset-0 border border-[#D4AF37]/40 rounded-[40px] transform translate-x-6 translate-y-6 transition-transform duration-700 group-hover:translate-x-2 group-hover:translate-y-2 shadow-[0_0_30px_rgba(212,175,55,0.15)]"></div>
                {/* Bar/Mixology Image Update */}
                <img 
                  src="https://image2url.com/r2/default/images/1774552141688-e5d7f9b6-80e1-4ea4-88ad-b68a5ca824f4.jpg" 
                  alt="Luxury Bartender" 
                  className="relative z-10 w-full aspect-[4/5] object-cover rounded-[40px] grayscale-[20%] group-hover:grayscale-0 transition-all duration-[2000ms]"
                />
              </div>
            </FadeIn>
            
            <FadeIn delay={200} className="lg:pr-12">
              <h3 className="font-sans text-[#D4AF37] tracking-[0.3em] uppercase text-[10px] mb-8">Our Heritage</h3>
              <h2 className="font-playfair text-5xl md:text-7xl text-white mb-10 leading-tight font-light">
                Redefining the <br/> <GoldText className="italic">Art of Dining.</GoldText>
              </h2>
              <div className="font-sans text-gray-400 space-y-8 font-light text-sm md:text-base tracking-wide leading-relaxed">
                <p>
                  Nestled in the heart of Dubai, Rasputin is a sanctuary for the world's most discerning palates. We blend regal traditions with avant-garde culinary techniques to curate a dining experience that transcends the ordinary.
                </p>
                <p>
                  From our exclusive 24K gold-leaf signatures to our world-class mixology, every detail is meticulously crafted. Here, dining is not merely a meal; it is a grand theatrical performance of taste and elegance.
                </p>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* --- 3. A TASTE OF OPULENCE (MENU) --- */}
      <section id="opulence" className="py-32 md:py-48 bg-[#050505] relative border-y border-[#D4AF37]/10">
        <div className="max-w-[1400px] mx-auto px-8 lg:px-16">
          <div className="text-center max-w-3xl mx-auto mb-24">
            <FadeIn>
              <h3 className="font-sans text-[#D4AF37] tracking-[0.3em] uppercase text-[10px] mb-6">Signature Collection</h3>
              <h2 className="font-playfair text-5xl md:text-7xl text-white mb-8 font-light">A Taste of <GoldText className="italic">Opulence</GoldText></h2>
              <p className="font-sans text-gray-400 font-light tracking-wide text-sm md:text-base">
                Indulge in our masterfully curated masterpieces, crafted with the world's rarest and most exquisite spirits.
              </p>
            </FadeIn>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {/* Menu Items changed to Bar/Spirits Theme */}
            {[
              { title: "The Imperial Gold", desc: "Beluga Gold Line Vodka, rare vermouth, and fresh citrus oils, elegantly garnished with 24K edible gold leaf.", price: "AED 350" },
              { title: "Dom Pérignon Luminous", desc: "Exclusive VIP bottle service featuring the iconic illuminated vintage Champagne, served with sparklers.", price: "AED 4,500" },
              { title: "Louis XIII Cognac", desc: "A century in a glass. Served in bespoke Baccarat crystal glasses for the ultimate connoisseur.", price: "AED 1,800" }
            ].map((item, idx) => (
              <FadeIn key={idx} delay={idx * 200}>
                <LuxuryCard className="h-full flex flex-col">
                  <h4 className="font-playfair text-3xl text-white mb-6 font-light">{item.title}</h4>
                  <p className="font-sans text-gray-400 font-light text-sm tracking-wide leading-relaxed mb-12 flex-grow">
                    {item.desc}
                  </p>
                  <div className="flex justify-between items-center border-t border-white/10 pt-8">
                    <span className="font-sans text-[10px] text-[#D4AF37] uppercase tracking-[0.2em]">Signature</span>
                    <span className="font-cinzel text-white text-xl tracking-wider">{item.price}</span>
                  </div>
                </LuxuryCard>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* --- NEW SECTION: ENTERTAINMENT & VIP BOTTLE SERVICE --- */}
      <section id="entertainment" className="py-32 md:py-48 bg-[#0A0A0A] relative border-y border-[#D4AF37]/10 overflow-hidden">
        {/* Abstract Gold Glow Background */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#D4AF37]/5 rounded-full blur-[120px] pointer-events-none"></div>

        <div className="max-w-[1400px] mx-auto px-8 lg:px-16 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <FadeIn className="order-2 lg:order-1">
              <h3 className="font-sans text-[#D4AF37] tracking-[0.3em] uppercase text-[10px] mb-6">Sonic Landscape</h3>
              <h2 className="font-playfair text-5xl md:text-7xl text-white mb-10 leading-tight font-light">
                The Rhythm of <br/> <GoldText className="italic">Rasputin</GoldText>
              </h2>
              <div className="font-sans text-gray-400 space-y-8 font-light text-sm md:text-base tracking-wide leading-relaxed mb-12">
                <p>
                  Elevate your senses with our state-of-the-art acoustic architecture. Our resident international DJs curate a bespoke sonic journey every night, transitioning seamlessly from deep lounge house to high-energy anthems.
                </p>
                <p>
                  Experience the pinnacle of exclusivity with our <strong className="text-[#D4AF37] font-normal">VIP Bottle Service</strong>. Enjoy priority entry, a dedicated luxury host, spectacular sparkler presentations, and private security for your elite entourage.
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-12 border-t border-white/10 pt-10">
                <div>
                  <h4 className="font-cinzel text-3xl text-white mb-2">Resident DJs</h4>
                  <p className="font-sans text-[10px] text-[#D4AF37] uppercase tracking-[0.2em]">International Roster</p>
                </div>
                <div>
                  <h4 className="font-cinzel text-3xl text-white mb-2">Bottle Service</h4>
                  <p className="font-sans text-[10px] text-[#D4AF37] uppercase tracking-[0.2em]">Elite VIP Hosting</p>
                </div>
              </div>
            </FadeIn>

            <FadeIn delay={200} className="order-1 lg:order-2">
              <div className="relative group">
                <div className="absolute inset-0 border border-[#D4AF37]/40 rounded-[40px] transform translate-x-6 -translate-y-6 transition-transform duration-700 group-hover:translate-x-2 group-hover:-translate-y-2 shadow-[0_0_30px_rgba(212,175,55,0.15)]"></div>
                {/* Premium DJ / Nightclub Image */}
                <img 
                  src="https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?q=80&w=2070&auto=format&fit=crop" 
                  alt="DJ and VIP Party" 
                  className="relative z-10 w-full aspect-[4/5] object-cover rounded-[40px] grayscale-[20%] group-hover:grayscale-0 transition-all duration-[2000ms]"
                />
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* --- 4. GALLERY --- */}
      <section id="gallery" className="py-32 md:py-48 bg-[#000000]">
        <div className="max-w-[1400px] mx-auto px-8 lg:px-16">
          <FadeIn className="text-center mb-24">
            <h3 className="font-sans text-[#D4AF37] tracking-[0.3em] uppercase text-[10px] mb-6">Visual Symphony</h3>
            <h2 className="font-playfair text-5xl md:text-7xl text-white font-light">The <GoldText className="italic">Gallery</GoldText></h2>
          </FadeIn>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Gallery Images updated with new URLs and Gold Shadows */}
            <FadeIn delay={100} className="lg:col-span-2">
              <img src="https://image2url.com/r2/default/images/1774552179759-70d3afbd-9b1a-4c67-8064-d9471f038803.jpg" alt="Luxury Bar Counter" className="w-full h-[400px] object-cover rounded-[40px] border border-[#D4AF37]/40 shadow-[0_0_25px_rgba(212,175,55,0.2)] hover:shadow-[0_0_50px_rgba(212,175,55,0.5)] hover:border-[#D4AF37] transition-all duration-500" />
            </FadeIn>
            <FadeIn delay={200}>
              <img src="https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?q=80&w=2000&auto=format&fit=crop" alt="Signature Cocktail" className="w-full h-[400px] object-cover rounded-[40px] border border-[#D4AF37]/40 shadow-[0_0_25px_rgba(212,175,55,0.2)] hover:shadow-[0_0_50px_rgba(212,175,55,0.5)] hover:border-[#D4AF37] transition-all duration-500" />
            </FadeIn>
            <FadeIn delay={300}>
              <img src="https://image2url.com/r2/default/images/1774552212687-4e708d65-6db8-400b-b089-43e773cd2ff2.jpg" alt="Pouring Drink" className="w-full h-[400px] object-cover rounded-[40px] border border-[#D4AF37]/40 shadow-[0_0_25px_rgba(212,175,55,0.2)] hover:shadow-[0_0_50px_rgba(212,175,55,0.5)] hover:border-[#D4AF37] transition-all duration-500" />
            </FadeIn>
            <FadeIn delay={400} className="lg:col-span-2">
              <img src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=2000&auto=format&fit=crop" alt="VIP Lounge" className="w-full h-[400px] object-cover rounded-[40px] border border-[#D4AF37]/40 shadow-[0_0_25px_rgba(212,175,55,0.2)] hover:shadow-[0_0_50px_rgba(212,175,55,0.5)] hover:border-[#D4AF37] transition-all duration-500" />
            </FadeIn>
          </div>
        </div>
      </section>

      {/* --- 5. CUSTOMER REVIEWS --- */}
      <section id="reviews" className="py-32 md:py-48 bg-[#050505] border-y border-[#D4AF37]/10">
        <div className="max-w-[1400px] mx-auto px-8 lg:px-16">
          <FadeIn className="text-center mb-24">
            <h3 className="font-sans text-[#D4AF37] tracking-[0.3em] uppercase text-[10px] mb-6">Testimonials</h3>
            <h2 className="font-playfair text-5xl md:text-7xl text-white font-light">Voices of <GoldText className="italic">Excellence</GoldText></h2>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {[
              { name: "Alexander Pierce", role: "Elite Member", text: "An absolute triumph in fine dining. The attention to detail, from the gold-leaf to the flawless service, makes Rasputin peerless in Dubai." },
              { name: "Sophia Laurent", role: "Food Critic", text: "The Beluga Caviar experience was nothing short of cinematic. It is rare to find a place that matches its breathtaking ambiance with such culinary perfection." },
              { name: "Sheikh H.A.", role: "VIP Guest", text: "Unquestionably the most luxurious lounge in the city. The private reservation process was seamless, and the evening was an absolute masterpiece." }
            ].map((review, idx) => (
              <FadeIn key={idx} delay={idx * 200}>
                <LuxuryCard className="h-full flex flex-col relative">
                  <Quote className="absolute top-10 right-10 text-[#D4AF37]/20" size={60} />
                  <div className="flex gap-1 text-[#D4AF37] mb-8">
                    {[1,2,3,4,5].map(star => <Star key={star} size={16} fill="#D4AF37" />)}
                  </div>
                  <p className="font-playfair text-xl text-gray-300 italic mb-10 flex-grow leading-relaxed">
                    "{review.text}"
                  </p>
                  <div>
                    <h5 className="font-cinzel text-white text-lg tracking-wider">{review.name}</h5>
                    <span className="font-sans text-[10px] text-[#D4AF37] uppercase tracking-[0.2em]">{review.role}</span>
                  </div>
                </LuxuryCard>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* --- 6. BOOK A TABLE (WHATSAPP FORM) --- */}
      <section id="reservations" className="py-32 md:py-48 relative overflow-hidden bg-[#000000]">
        <div className="absolute inset-0 z-0 opacity-30">
          <img src="https://images.unsplash.com/photo-1544148103-0773bf10d330?q=80&w=2070&auto=format&fit=crop" className="w-full h-full object-cover" alt="Background" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#000] via-[#000]/90 to-transparent" />
        </div>

        <div className="max-w-[1400px] mx-auto px-8 lg:px-16 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 lg:gap-32 items-center">
            <FadeIn>
              <h3 className="font-sans text-[#D4AF37] tracking-[0.3em] uppercase text-[10px] mb-6">Secure Your Experience</h3>
              <h2 className="font-playfair text-5xl md:text-7xl text-white mb-10 font-light leading-tight">
                Reserve Your <br/> <GoldText className="italic">Table</GoldText>
              </h2>
              <p className="font-sans text-gray-400 font-light text-sm md:text-base tracking-wide leading-relaxed mb-10 max-w-lg">
                For a flawless and personalized experience, all reservations are handled directly by our VIP Concierge via WhatsApp. Fill out your details, and allow us to orchestrate your perfect evening.
              </p>
              
              {/* NEW SECTION: House Rules / Door Policy for Exclusivity */}
              <div className="mb-14 bg-white/[0.02] border border-white/10 rounded-[20px] p-8 backdrop-blur-sm max-w-lg">
                <h4 className="font-cinzel text-[#D4AF37] text-lg mb-6 tracking-widest uppercase">House Policies</h4>
                <ul className="space-y-4 font-sans text-gray-300 font-light text-sm tracking-wide">
                  <li className="flex items-start gap-4">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37] mt-1.5 shrink-0"></span> 
                    <span><strong className="text-white">Dress Code:</strong> Strictly Smart Elegant. No sportswear, shorts, or open shoes for gentlemen.</span>
                  </li>
                  <li className="flex items-start gap-4">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37] mt-1.5 shrink-0"></span> 
                    <span><strong className="text-white">Age Limit:</strong> 21+ Only. Original physical ID or Passport required at the door.</span>
                  </li>
                  <li className="flex items-start gap-4">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37] mt-1.5 shrink-0"></span> 
                    <span><strong className="text-white">Entry:</strong> Management reserves the right of admission to maintain the elite atmosphere.</span>
                  </li>
                </ul>
              </div>

              <div className="space-y-10">
                <div className="flex items-center gap-6">
                  <div className="w-14 h-14 rounded-full border border-[#D4AF37] flex items-center justify-center text-[#D4AF37]"><Phone size={20} /></div>
                  <div>
                    <h5 className="font-sans text-white uppercase tracking-[0.2em] text-[10px] mb-1">VIP Concierge</h5>
                    <p className="font-cinzel text-[#D4AF37] text-lg tracking-widest">+971 50 528 7736</p>
                  </div>
                </div>
              </div>
            </FadeIn>

            <FadeIn delay={200}>
              <LuxuryCard hoverEffect={false} className="bg-[#0A0A0A]/90 backdrop-blur-xl border-[#D4AF37]/40 shadow-2xl relative overflow-hidden">
                {bookingStatus === 'success' && (
                  <div className="absolute inset-0 bg-[#0A0A0A] z-20 flex flex-col items-center justify-center p-10 text-center animate-fade-in rounded-[40px]">
                    <div className="w-20 h-20 rounded-full border border-[#D4AF37] flex items-center justify-center mb-8 text-[#D4AF37]">
                      <Star size={32} />
                    </div>
                    <h3 className="font-playfair text-4xl text-white mb-4 font-light">Request Sent</h3>
                    <p className="font-sans text-gray-400 font-light tracking-wide leading-relaxed">
                      Your luxurious evening awaits. Our concierge will contact you on WhatsApp shortly to confirm your table.
                    </p>
                  </div>
                )}

                <form onSubmit={handleBookingSubmit} className="space-y-8 relative z-10">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-2 group">
                      <label className="font-sans text-[10px] uppercase tracking-[0.2em] text-[#D4AF37] ml-6">Full Name</label>
                      <input name="name" required type="text" className="w-full bg-[#111111]/80 border border-white/10 rounded-[30px] px-6 py-4 text-white font-sans text-sm focus:outline-none focus:border-[#D4AF37] focus:bg-[#000] focus:shadow-[0_0_20px_rgba(212,175,55,0.15)] transition-all duration-500 placeholder-white/20" placeholder="e.g. James Bond" />
                    </div>
                    <div className="space-y-2 group">
                      <label className="font-sans text-[10px] uppercase tracking-[0.2em] text-[#D4AF37] ml-6">WhatsApp Number</label>
                      <input name="phone" required type="tel" className="w-full bg-[#111111]/80 border border-white/10 rounded-[30px] px-6 py-4 text-white font-sans text-sm focus:outline-none focus:border-[#D4AF37] focus:bg-[#000] focus:shadow-[0_0_20px_rgba(212,175,55,0.15)] transition-all duration-500 placeholder-white/20" placeholder="+971 50..." />
                    </div>
                  </div>
                  
                  <div className="space-y-2 group">
                    <label className="font-sans text-[10px] uppercase tracking-[0.2em] text-[#D4AF37] ml-6">Date</label>
                    <input name="date" required type="date" className="w-full bg-[#111111]/80 border border-white/10 rounded-[30px] px-6 py-4 text-white font-sans text-sm focus:outline-none focus:border-[#D4AF37] focus:bg-[#000] focus:shadow-[0_0_20px_rgba(212,175,55,0.15)] transition-all duration-500 [color-scheme:dark]" />
                  </div>

                  <div className="space-y-2 group">
                    <label className="font-sans text-[10px] uppercase tracking-[0.2em] text-[#D4AF37] ml-6">Special Requests</label>
                    <textarea name="requests" rows="3" className="w-full bg-[#111111]/80 border border-white/10 rounded-[30px] px-6 py-4 text-white font-sans text-sm focus:outline-none focus:border-[#D4AF37] focus:bg-[#000] focus:shadow-[0_0_20px_rgba(212,175,55,0.15)] transition-all duration-500 resize-none placeholder-white/20" placeholder="Allergies, celebrations, specific table preferences..."></textarea>
                  </div>

                  <button 
                    disabled={bookingStatus === 'submitting'}
                    type="submit" 
                    className="w-full bg-gradient-to-r from-[#D4AF37] via-[#FFF3B0] to-[#D4AF37] bg-[length:200%_auto] hover:bg-[position:right_center] text-[#000] rounded-[40px] px-8 py-5 uppercase tracking-[0.3em] text-[10px] font-bold shadow-[0_0_20px_rgba(212,175,55,0.3)] hover:shadow-[0_0_40px_rgba(212,175,55,0.6)] transition-all duration-700 disabled:opacity-50 mt-8 flex justify-center items-center gap-4"
                  >
                    {bookingStatus === 'submitting' ? 'Connecting to Concierge...' : 'Send VIP Request'}
                  </button>
                </form>
              </LuxuryCard>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* --- LOCATION MAP --- */}
      <section id="location" className="py-32 md:py-48 bg-[#050505] border-t border-[#D4AF37]/10">
        <div className="max-w-[1400px] mx-auto px-8 lg:px-16">
          <FadeIn className="text-center mb-16">
            <h3 className="font-sans text-[#D4AF37] tracking-[0.3em] uppercase text-[10px] mb-6">Visit Us</h3>
            <h2 className="font-playfair text-5xl md:text-7xl text-white font-light">Our <GoldText className="italic">Location</GoldText></h2>
          </FadeIn>
          <FadeIn delay={200}>
            {/* Added Gold Shadow to Map */}
            <div className="w-full h-[400px] md:h-[500px] rounded-[40px] overflow-hidden border border-[#D4AF37]/40 shadow-[0_0_30px_rgba(212,175,55,0.25)] hover:shadow-[0_0_50px_rgba(212,175,55,0.5)] transition-shadow duration-700">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3610.178653926922!2d55.270782815006!3d25.197197083896135!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f43348a67e24b%3A0xff45e502e1ceb7e2!2sBurj%20Khalifa!5e0!3m2!1sen!2sae!4v1683620392341!5m2!1sen!2sae" 
                width="100%" 
                height="100%" 
                style={{ border: 0, filter: 'grayscale(0.6) contrast(1.1)' }} 
                allowFullScreen="" 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                title="Rasputin Location Map"
              ></iframe>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* --- 7. FOOTER --- */}
      <footer className="bg-[#000000] pt-32 pb-16 border-t border-[#D4AF37]/20 relative">
        <div className="max-w-[1400px] mx-auto px-8 lg:px-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-24">
            
            <div className="lg:col-span-2">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-14 h-14 border border-[#D4AF37] rounded-full flex items-center justify-center">
                  <span className="font-cinzel text-[#D4AF37] text-2xl">R</span>
                </div>
                <h1 className="font-cinzel text-3xl tracking-[0.3em] text-white uppercase">
                  Rasputin
                </h1>
              </div>
              <p className="font-sans text-gray-400 font-light text-sm tracking-wide max-w-sm mb-10 leading-relaxed">
                Dubai's most exclusive destination for fine dining, luxury aesthetics, and world-class service.
              </p>
              
              {/* Original Brand Colors for Social Media */}
              <div className="flex gap-6 items-center">
                {/* Instagram Filled Original */}
                <a href="#" className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center hover:scale-110 transition-transform duration-500 overflow-hidden relative group bg-white/5 hover:border-transparent">
                  <svg viewBox="0 0 512 512" width="22" height="22" className="z-10">
                    <defs>
                      <linearGradient id="ig-grad" x1="0%" y1="100%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#f09433" />
                        <stop offset="25%" stopColor="#e6683c" />
                        <stop offset="50%" stopColor="#dc2743" />
                        <stop offset="75%" stopColor="#cc2366" />
                        <stop offset="100%" stopColor="#bc1888" />
                      </linearGradient>
                    </defs>
                    <path fill="url(#ig-grad)" d="M256,49.471c67.266,0,75.233.257,101.8,1.469,24.562,1.121,37.9,5.224,46.778,8.674a78.052,78.052,0,0,1,28.966,18.845,78.052,78.052,0,0,1,18.845,28.966c3.45,8.877,7.554,22.216,8.674,46.778,1.212,26.565,1.469,34.532,1.469,101.8s-0.257,75.233-1.469,101.8c-1.121,24.562-5.225,37.9-8.674,46.778a83.427,83.427,0,0,1-47.811,47.811c-8.877,3.45-22.216,7.554-46.778,8.674-26.56,1.212-34.527,1.469-101.8,1.469s-75.237-.257-101.8-1.469c-24.562-1.121-37.9-5.225-46.778-8.674a78.051,78.051,0,0,1-28.966-18.845,78.053,78.053,0,0,1-18.845-28.966c-3.45-8.877-7.554-22.216-8.674-46.778-1.212-26.564-1.469-34.531-1.469-101.8s0.257-75.233,1.469-101.8c1.12-24.562,5.224-37.9,8.674-46.778A78.052,78.052,0,0,1,78.458,78.458a78.053,78.053,0,0,1,28.966-18.845c8.877-3.45,22.216-7.554,46.778-8.674,26.565-1.212,34.532-1.469,101.8-1.469m0-45.391c-68.418,0-77,.29-103.866,1.516-26.815,1.224-45.127,5.482-61.151,11.71a123.488,123.488,0,0,0-44.62,29.053A123.488,123.488,0,0,0,17.31,90.982C11.082,107.006,6.824,125.318,5.6,152.134,4.37,179,4.08,187.582,4.08,256S4.37,333,5.6,359.866c1.224,26.815,5.482,45.127,11.71,61.151a123.489,123.489,0,0,0,29.053,44.62,123.486,123.486,0,0,0,44.62,29.053c16.025,6.228,34.337,10.486,61.151,11.71,26.87,1.226,35.449,1.516,103.866,1.516s77-.29,103.866-1.516c26.815-1.224,45.127-5.482,61.151-11.71a128.817,128.817,0,0,0,73.673-73.673c6.228-16.025,10.486-34.337,11.71-61.151,1.226-26.87,1.516-35.449,1.516-103.866s-0.29-77-1.516-103.866c-1.224-26.815-5.482-45.127-11.71-61.151a123.486,123.486,0,0,0-29.053-44.62A123.487,123.487,0,0,0,421.018,17.31C404.994,11.082,386.682,6.824,359.866,5.6,333,4.37,324.418,4.08,256,4.08Z"/>
                    <path fill="url(#ig-grad)" d="M256,123.536A132.464,132.464,0,1,0,388.464,256,132.464,132.464,0,0,0,256,123.536Zm0,219.537A87.072,87.072,0,1,1,343.072,256,87.072,87.072,0,0,1,256,343.073Z"/>
                    <circle fill="url(#ig-grad)" cx="390.476" cy="121.524" r="30.23"/>
                  </svg>
                </a>
                
                {/* Facebook Filled Original */}
                <a href="#" className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center hover:scale-110 transition-transform duration-500 overflow-hidden group bg-white/5 hover:border-transparent">
                  <svg viewBox="0 0 512 512" width="22" height="22">
                    <path fill="#1877F2" d="M512,257.555c0,-141.385 -114.615,-256 -256,-256c-141.385,0 -256,114.615 -256,256c0,127.777 93.616,233.685 216,252.89l0,-178.89l-65,0l0,-74l65,0l0,-56.4c0,-64.16 38.219,-99.6 96.695,-99.6c28.009,0 57.305,5 57.305,5l0,63l-32.281,0c-31.801,0 -41.719,19.733 -41.719,39.976l0,48.024l71,0l-11.35,74l-59.65,0l0,178.89c122.385,-19.205 216,-125.113 216,-252.89Z"/>
                    <path fill="#FFFFFF" d="M352.65,331.555l11.35,-74l-71,0l0,-48.024c0,-20.243 9.918,-39.976 41.719,-39.976l32.281,0l0,-63s-29.296,-5 -57.305,-5c-58.476,0 -96.695,35.44 -96.695,99.6l0,56.4l-65,0l0,74l65,0l0,178.89c12.553,1.968 25.404,3.006 38.45,3.006c13.045,0 25.897,-1.038 38.45,-3.006l0,-178.89l59.65,0Z"/>
                  </svg>
                </a>
                
                {/* X (Twitter) Filled Original */}
                <a href="#" className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center hover:scale-110 transition-transform duration-500 overflow-hidden group bg-white hover:border-transparent">
                  <svg viewBox="0 0 24 24" width="18" height="18">
                    <path fill="#000000" d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                  </svg>
                </a>
              </div>
            </div>

            <div>
              <h4 className="font-sans text-[#D4AF37] uppercase tracking-[0.2em] text-[10px] mb-8">Contact Us</h4>
              <ul className="space-y-6 font-sans text-gray-400 font-light text-sm tracking-wide">
                <li className="flex items-center gap-3"><MapPin size={16} className="text-[#D4AF37]" /> Street # 45C, Dubai, UAE</li>
                <li className="flex items-center gap-3"><Phone size={16} className="text-[#D4AF37]" /> +971 50 528 7736</li>
                <li className="flex items-center gap-3"><Clock size={16} className="text-[#D4AF37]" /> Daily: 10:00 PM - 04:00 AM</li>
              </ul>
            </div>

            <div>
              <h4 className="font-sans text-[#D4AF37] uppercase tracking-[0.2em] text-[10px] mb-8">Discover</h4>
              <ul className="space-y-6 font-sans text-gray-400 font-light text-sm tracking-wide">
                <li><button onClick={() => scrollTo('about')} className="hover:text-white transition-colors">Our Heritage</button></li>
                <li><button onClick={() => scrollTo('opulence')} className="hover:text-white transition-colors">Taste of Opulence</button></li>
                <li><button onClick={() => scrollTo('gallery')} className="hover:text-white transition-colors">Visual Gallery</button></li>
                <li><button onClick={() => scrollTo('reviews')} className="hover:text-white transition-colors">VIP Testimonials</button></li>
              </ul>
            </div>

          </div>

          <div className="border-t border-white/10 pt-10 flex flex-col md:flex-row justify-between items-center gap-6">
            <p className="font-sans text-gray-500 text-[10px] tracking-[0.2em] uppercase">
              &copy; {new Date().getFullYear()} Rasputin Dubai. All Rights Reserved.
            </p>
            <div className="flex gap-8 font-sans text-gray-500 text-[10px] tracking-[0.2em] uppercase">
              <a href="#" className="hover:text-[#D4AF37] transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-[#D4AF37] transition-colors">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>

    </div>
  );
}