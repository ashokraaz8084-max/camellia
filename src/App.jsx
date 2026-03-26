import React, { useState, useEffect, useRef } from 'react';
import { 
  Play, Pause, Volume2, VolumeX, Phone, MapPin, Clock, 
  Instagram, Facebook, Twitter, MessageCircle, X, 
  ChevronRight, Star, GlassWater, Music, Calendar
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

    if (targetRef.current) {
      observer.observe(targetRef.current);
    }

    return () => {
      if (targetRef.current) observer.unobserve(targetRef.current);
    };
  }, [options]);

  return [targetRef, isIntersecting];
};

// --- Components ---

const FadeIn = ({ children, delay = 0, className = '' }) => {
  const [ref, isVisible] = useIntersectionObserver({ threshold: 0.1 });
  return (
    <div
      ref={ref}
      className={`transition-all duration-1000 ease-out ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      } ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};

const GlassCard = ({ children, className = '', hoverEffect = true }) => (
  <div className={`bg-white/[0.03] backdrop-blur-md border border-white/[0.05] rounded-2xl p-6 md:p-8 
    ${hoverEffect ? 'hover:bg-white/[0.05] hover:border-gold/30 hover:shadow-[0_0_30px_rgba(212,175,55,0.1)] transition-all duration-500' : ''} 
    ${className}`}>
    {children}
  </div>
);

const GoldText = ({ children, className = '' }) => (
  <span className={`text-transparent bg-clip-text bg-gradient-to-r from-[#BF953F] via-[#FCF6BA] to-[#B38728] ${className}`}>
    {children}
  </span>
);

export default function App() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);
  const [bookingStatus, setBookingStatus] = useState(null);
  const audioRef = useRef(null);

  // Scroll effect for navbar
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // VIP Popup timer
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowPopup(true);
    }, 5000);
    return () => clearTimeout(timer);
  }, []);

  const toggleMusic = () => {
    if (isMusicPlaying) {
      audioRef.current?.pause();
    } else {
      audioRef.current?.play().catch(e => console.log("Audio play blocked by browser:", e));
    }
    setIsMusicPlaying(!isMusicPlaying);
  };

  const handleBookingSubmit = (e) => {
    e.preventDefault();
    setBookingStatus('submitting');
    setTimeout(() => {
      setBookingStatus('success');
      setTimeout(() => setBookingStatus(null), 5000);
      e.target.reset();
    }, 1500);
  };

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] text-gray-200 font-sans selection:bg-purple-900 selection:text-white overflow-x-hidden">
      {/* Injecting Fonts and Custom Animations */}
      <style dangerouslySetInnerHTML={{__html: `
        @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;600;700&family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400&family=Outfit:wght@300;400;500&display=swap');
        
        .font-playfair { font-family: 'Playfair Display', serif; }
        .font-cinzel { font-family: 'Cinzel', serif; }
        .font-outfit { font-family: 'Outfit', sans-serif; }
        
        .bg-gold { background: linear-gradient(to right, #BF953F, #FCF6BA, #B38728); }
        .text-gold { color: #D4AF37; }
        .border-gold { border-color: #D4AF37; }
        
        @keyframes kenBurns {
          0% { transform: scale(1); }
          100% { transform: scale(1.1); }
        }
        .animate-ken-burns {
          animation: kenBurns 20s ease-out infinite alternate;
        }

        .purple-glow {
          box-shadow: 0 0 40px rgba(75, 0, 130, 0.4);
        }
        
        /* Smooth scrolling */
        html { scroll-behavior: smooth; }
      `}} />

      {/* Background Audio (Hidden) */}
      <audio 
        ref={audioRef} 
        loop 
        src="https://cdn.pixabay.com/download/audio/2022/11/22/audio_febc508520.mp3?filename=smooth-waters-115977.mp3" 
      />

      {/* Floating Action Buttons */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-4">
        <a 
          href="https://wa.me/971505287736" 
          target="_blank" 
          rel="noopener noreferrer"
          className="bg-green-500 text-white p-4 rounded-full shadow-[0_0_20px_rgba(34,197,94,0.4)] hover:scale-110 transition-transform duration-300 flex items-center justify-center group relative"
        >
          <MessageCircle size={24} />
          <span className="absolute right-full mr-4 bg-black/80 text-white text-sm py-2 px-4 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap backdrop-blur-sm border border-white/10">
            Book via WhatsApp
          </span>
        </a>
      </div>

      <div className="fixed bottom-6 left-6 z-50">
        <button 
          onClick={toggleMusic}
          className="bg-black/50 backdrop-blur-md border border-white/10 text-white p-4 rounded-full hover:bg-white/10 transition-colors duration-300 flex items-center justify-center purple-glow"
        >
          {isMusicPlaying ? <Volume2 size={20} className="text-[#D4AF37]" /> : <VolumeX size={20} />}
        </button>
      </div>

      {/* Navigation */}
      <nav className={`fixed w-full z-40 transition-all duration-500 ${isScrolled ? 'bg-black/80 backdrop-blur-lg py-4 border-b border-white/5 shadow-2xl' : 'bg-transparent py-6'}`}>
        <div className="container mx-auto px-6 md:px-12 flex justify-between items-center">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => scrollToSection('home')}>
            <div className="w-8 h-8 rounded-full border border-[#D4AF37] flex items-center justify-center">
              <span className="font-cinzel font-bold text-[#D4AF37] text-lg">R</span>
            </div>
            <h1 className="font-cinzel text-2xl tracking-widest text-white uppercase hidden sm:block">
              Rasputin <span className="text-[#D4AF37]">Bar</span>
            </h1>
          </div>
          
          <div className="hidden md:flex items-center gap-8 font-outfit text-sm tracking-widest uppercase">
            {['About', 'Menu', 'Events', 'Gallery'].map((item) => (
              <button 
                key={item} 
                onClick={() => scrollToSection(item.toLowerCase())}
                className="text-gray-300 hover:text-[#D4AF37] transition-colors duration-300"
              >
                {item}
              </button>
            ))}
          </div>

          <button 
            onClick={() => scrollToSection('reservations')}
            className="bg-transparent border border-[#D4AF37] text-[#D4AF37] px-6 py-2 uppercase tracking-widest text-xs font-outfit hover:bg-[#D4AF37] hover:text-black transition-all duration-300 rounded-sm"
          >
            Reserve Table
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="relative h-screen w-full overflow-hidden flex items-center justify-center">
        {/* Cinematic Background */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-[#050505] z-10" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(75,0,130,0.2)_0%,transparent_70%)] z-10" />
          <img 
            src="https://images.unsplash.com/photo-1566737236500-c8ac43014a67?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80" 
            alt="Luxury Nightclub" 
            className="w-full h-full object-cover animate-ken-burns opacity-70"
          />
        </div>

        <div className="relative z-20 text-center px-4 max-w-5xl mx-auto mt-20">
          <FadeIn delay={200}>
            <p className="font-outfit uppercase tracking-[0.3em] text-[#D4AF37] text-sm md:text-base mb-6">
              Exclusive. Elite. Rasputin.
            </p>
          </FadeIn>
          <FadeIn delay={400}>
            <h2 className="font-playfair text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-6 leading-tight drop-shadow-2xl">
              Dubai's Exclusive <br/>
              <span className="italic font-light">Nightlife</span> <GoldText>Experience</GoldText>
            </h2>
          </FadeIn>
          <FadeIn delay={600}>
            <p className="font-outfit text-gray-300 text-lg md:text-xl max-w-2xl mx-auto mb-10 font-light">
              Enter the world of luxury nights where cinematic ambiance meets world-class service.
            </p>
          </FadeIn>
          <FadeIn delay={800} className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <button 
              onClick={() => scrollToSection('reservations')}
              className="bg-gold text-black px-8 py-4 uppercase tracking-widest text-sm font-bold w-full sm:w-auto hover:shadow-[0_0_30px_rgba(212,175,55,0.4)] transition-all duration-300"
            >
              Book VIP Experience
            </button>
            <button 
              onClick={() => scrollToSection('about')}
              className="text-white border-b border-white/30 pb-1 uppercase tracking-widest text-sm font-outfit hover:border-[#D4AF37] hover:text-[#D4AF37] transition-all duration-300 flex items-center gap-2"
            >
              Discover More <ChevronRight size={16} />
            </button>
          </FadeIn>
        </div>
        
        {/* Scroll Indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 animate-bounce">
          <div className="w-[1px] h-16 bg-gradient-to-b from-[#D4AF37] to-transparent"></div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-24 md:py-32 relative">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-[radial-gradient(circle_at_top_right,rgba(75,0,130,0.1)_0%,transparent_50%)] pointer-events-none" />
        
        <div className="container mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <FadeIn>
              <div className="relative group">
                <div className="absolute -inset-4 border border-[#D4AF37]/20 rounded-lg transform translate-x-4 translate-y-4 group-hover:translate-x-2 group-hover:translate-y-2 transition-transform duration-500"></div>
                <img 
                  src="https://images.unsplash.com/photo-1514933651103-005eec06c04b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1934&q=80" 
                  alt="Bartender crafting a cocktail" 
                  className="relative z-10 w-full rounded-lg shadow-2xl brightness-90 group-hover:brightness-100 transition-all duration-500"
                />
              </div>
            </FadeIn>
            
            <FadeIn delay={200}>
              <h3 className="font-outfit text-[#D4AF37] tracking-[0.2em] uppercase text-sm mb-4 flex items-center gap-4">
                <span className="w-12 h-[1px] bg-[#D4AF37]"></span> The Story
              </h3>
              <h2 className="font-playfair text-4xl md:text-5xl text-white mb-8 leading-tight">
                Where Dubai Nightlife <br/> <GoldText className="italic">Becomes Legendary</GoldText>
              </h2>
              <div className="font-outfit text-gray-400 space-y-6 font-light leading-relaxed">
                <p>
                  Nestled in the heart of Dubai, Rasputin Bar is a sanctuary for the elite. We blend the opulence of royal heritage with the pulsing energy of modern nightlife, creating an atmosphere that is both intimate and electric.
                </p>
                <p>
                  From our signature mixology to our world-renowned resident DJs, every detail is curated for those who demand nothing but the absolute best. Experience VIP service that anticipates your every need in an environment of unparalleled luxury.
                </p>
              </div>
              
              <div className="mt-12 grid grid-cols-2 gap-8 border-t border-white/10 pt-8">
                <div>
                  <h4 className="font-cinzel text-3xl text-white mb-2">Exclusive</h4>
                  <p className="font-outfit text-sm text-gray-500 uppercase tracking-wider">VIP Lounges</p>
                </div>
                <div>
                  <h4 className="font-cinzel text-3xl text-white mb-2">Curated</h4>
                  <p className="font-outfit text-sm text-gray-500 uppercase tracking-wider">Mixology</p>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Menu Section */}
      <section id="menu" className="py-24 bg-[#080808] relative border-y border-white/[0.02]">
        <div className="container mx-auto px-6 md:px-12">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <FadeIn>
              <h3 className="font-outfit text-[#D4AF37] tracking-[0.2em] uppercase text-sm mb-4">Signature Offerings</h3>
              <h2 className="font-playfair text-4xl md:text-5xl text-white mb-6">A Taste of <GoldText>Opulence</GoldText></h2>
              <p className="font-outfit text-gray-400 font-light">
                Our master mixologists craft liquid art, while our culinary team delivers fine dining bites that elevate your evening.
              </p>
            </FadeIn>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: "The Imperial Gold", desc: "Beluga Gold Line, edible 24k gold leaf, rare vermouth, subtle citrus oils.", price: "AED 350", icon: <GlassWater size={24}/> },
              { title: "Siberian Night", desc: "Premium dark rum, espresso extraction, vanilla caviar, smoked oak.", price: "AED 280", icon: <Star size={24}/> },
              { title: "Tsar's Reserve", desc: "Aged cognac, black truffle infusion, bitter chocolate rim, served over an ice sphere.", price: "AED 420", icon: <GlassWater size={24}/> }
            ].map((item, idx) => (
              <FadeIn key={idx} delay={idx * 150}>
                <GlassCard className="h-full flex flex-col group">
                  <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center text-[#D4AF37] mb-6 group-hover:scale-110 transition-transform">
                    {item.icon}
                  </div>
                  <h4 className="font-playfair text-2xl text-white mb-3">{item.title}</h4>
                  <p className="font-outfit text-gray-400 font-light text-sm mb-8 flex-grow">
                    {item.desc}
                  </p>
                  <div className="flex justify-between items-center border-t border-white/10 pt-4">
                    <span className="font-outfit text-sm text-gray-500 uppercase tracking-wider">Signature</span>
                    <span className="font-cinzel text-[#D4AF37]">{item.price}</span>
                  </div>
                </GlassCard>
              </FadeIn>
            ))}
          </div>
          
          <div className="text-center mt-16">
            <FadeIn delay={400}>
              <button className="text-white border border-white/20 px-8 py-3 uppercase tracking-widest text-sm font-outfit hover:bg-white hover:text-black transition-all duration-300">
                View Full Menu
              </button>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* VIP Reservations Section */}
      <section id="reservations" className="py-24 md:py-32 relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-96 h-96 bg-[#4b0082] rounded-full blur-[150px] opacity-20 pointer-events-none"></div>
        <div className="absolute right-0 top-0 w-64 h-64 bg-[#D4AF37] rounded-full blur-[150px] opacity-10 pointer-events-none"></div>

        <div className="container mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
            <FadeIn>
              <h3 className="font-outfit text-[#D4AF37] tracking-[0.2em] uppercase text-sm mb-4">Secure Your Spot</h3>
              <h2 className="font-playfair text-4xl md:text-5xl text-white mb-8">
                Reserve Your <br/> <GoldText className="italic">VIP Experience</GoldText>
              </h2>
              <p className="font-outfit text-gray-400 font-light mb-10 leading-relaxed">
                Elevate your night with our exclusive bottle service and private lounge access. Tables are highly limited to ensure an uncompromised experience for our guests.
              </p>
              
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="mt-1 text-[#D4AF37]"><Phone size={20} /></div>
                  <div>
                    <h5 className="font-outfit text-white uppercase tracking-wider text-sm mb-1">Direct VIP Line & WhatsApp</h5>
                    <p className="font-outfit text-gray-400 font-light">+971 50 528 7736</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="mt-1 text-[#D4AF37]"><Clock size={20} /></div>
                  <div>
                    <h5 className="font-outfit text-white uppercase tracking-wider text-sm mb-1">Operating Hours</h5>
                    <p className="font-outfit text-gray-400 font-light">Everyday: 10:00 PM – 4:00 AM</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="mt-1 text-[#D4AF37]"><MapPin size={20} /></div>
                  <div>
                    <h5 className="font-outfit text-white uppercase tracking-wider text-sm mb-1">Location</h5>
                    <p className="font-outfit text-gray-400 font-light">Street # 45C, Dubai, UAE</p>
                  </div>
                </div>
              </div>
            </FadeIn>

            <FadeIn delay={200}>
              <GlassCard className="relative overflow-hidden">
                {bookingStatus === 'success' ? (
                  <div className="absolute inset-0 bg-[#0a0a0a] z-10 flex flex-col items-center justify-center p-8 text-center animate-fade-in">
                    <div className="w-16 h-16 rounded-full border-2 border-[#D4AF37] flex items-center justify-center mb-6 text-[#D4AF37]">
                      <Star size={32} />
                    </div>
                    <h3 className="font-playfair text-2xl text-white mb-2">Request Received</h3>
                    <p className="font-outfit text-gray-400 font-light">
                      Our VIP concierge will contact you shortly to confirm your reservation.
                    </p>
                  </div>
                ) : null}

                <form onSubmit={handleBookingSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="font-outfit text-xs uppercase tracking-widest text-gray-400">Full Name</label>
                      <input required type="text" className="w-full bg-black/50 border border-white/10 rounded-none px-4 py-3 text-white font-outfit focus:outline-none focus:border-[#D4AF37] transition-colors" placeholder="John Doe" />
                    </div>
                    <div className="space-y-2">
                      <label className="font-outfit text-xs uppercase tracking-widest text-gray-400">Phone / WhatsApp</label>
                      <input required type="tel" className="w-full bg-black/50 border border-white/10 rounded-none px-4 py-3 text-white font-outfit focus:outline-none focus:border-[#D4AF37] transition-colors" placeholder="+971 50..." />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="font-outfit text-xs uppercase tracking-widest text-gray-400">Date</label>
                      <input required type="date" className="w-full bg-black/50 border border-white/10 rounded-none px-4 py-3 text-white font-outfit focus:outline-none focus:border-[#D4AF37] transition-colors [color-scheme:dark]" />
                    </div>
                    <div className="space-y-2">
                      <label className="font-outfit text-xs uppercase tracking-widest text-gray-400">Guests</label>
                      <select className="w-full bg-black/50 border border-white/10 rounded-none px-4 py-3 text-white font-outfit focus:outline-none focus:border-[#D4AF37] transition-colors appearance-none">
                        <option value="2">2 Guests</option>
                        <option value="4">4 Guests</option>
                        <option value="6">6 Guests</option>
                        <option value="8+">8+ Guests (VIP Section)</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="font-outfit text-xs uppercase tracking-widest text-gray-400">Special Requests / Bottle Preference</label>
                    <textarea rows="3" className="w-full bg-black/50 border border-white/10 rounded-none px-4 py-3 text-white font-outfit focus:outline-none focus:border-[#D4AF37] transition-colors resize-none" placeholder="Let us know how we can make your night special..."></textarea>
                  </div>

                  <button 
                    disabled={bookingStatus === 'submitting'}
                    type="submit" 
                    className="w-full bg-gold text-black px-8 py-4 uppercase tracking-widest text-sm font-bold hover:shadow-[0_0_20px_rgba(212,175,55,0.3)] transition-all duration-300 disabled:opacity-70"
                  >
                    {bookingStatus === 'submitting' ? 'Processing...' : 'Request Reservation'}
                  </button>
                </form>
              </GlassCard>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section id="gallery" className="py-24 bg-black">
        <div className="container mx-auto px-6 md:px-12 mb-12 flex justify-between items-end">
          <FadeIn>
            <h3 className="font-outfit text-[#D4AF37] tracking-[0.2em] uppercase text-sm mb-2">The Atmosphere</h3>
            <h2 className="font-playfair text-4xl text-white">Visual <GoldText>Journey</GoldText></h2>
          </FadeIn>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-1">
          {[
            "https://images.unsplash.com/photo-1572116469696-31de0f17cc34?ixlib=rb-4.0.3&auto=format&fit=crop&w=1074&q=80",
            "https://images.unsplash.com/photo-1545128485-c400e7702796?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80",
            "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80",
            "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80"
          ].map((src, idx) => (
            <div key={idx} className="relative aspect-[4/5] overflow-hidden group">
              <img 
                src={src} 
                alt="Nightclub Vibe" 
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 opacity-70 group-hover:opacity-100"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-6">
                <span className="font-outfit uppercase tracking-widest text-xs text-white">Rasputin Experience</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Events Section */}
      <section id="events" className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1558204694-84518428172c?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80')] bg-cover bg-center opacity-10 mix-blend-overlay"></div>
        <div className="container mx-auto px-6 md:px-12 relative z-10">
          <div className="text-center mb-16">
            <FadeIn>
              <h3 className="font-outfit text-[#D4AF37] tracking-[0.2em] uppercase text-sm mb-2">Upcoming</h3>
              <h2 className="font-playfair text-4xl text-white">Legendary <GoldText>Nights</GoldText></h2>
            </FadeIn>
          </div>

          <div className="max-w-4xl mx-auto space-y-4">
            {[
              { date: "FRI, OCT 12", title: "Midnight Illusion w/ DJ Kross", type: "Guest DJ" },
              { date: "SAT, OCT 13", title: "The Royal Masquerade", type: "Themed Event" },
              { date: "THU, OCT 18", title: "Caviar & Champagne Night", type: "VIP Exclusive" }
            ].map((event, idx) => (
              <FadeIn key={idx} delay={idx * 100}>
                <div className="flex flex-col md:flex-row items-center justify-between p-6 border border-white/10 hover:border-[#D4AF37]/50 bg-white/[0.02] backdrop-blur-sm transition-all duration-300 group cursor-pointer">
                  <div className="flex items-center gap-8 w-full md:w-auto mb-4 md:mb-0">
                    <div className="text-center md:text-left min-w-[120px]">
                      <span className="font-outfit text-[#D4AF37] uppercase tracking-widest text-sm font-bold block">{event.date.split(',')[0]}</span>
                      <span className="font-playfair text-white text-xl">{event.date.split(',')[1]}</span>
                    </div>
                    <div className="hidden md:block w-[1px] h-12 bg-white/10"></div>
                    <div>
                      <h4 className="font-playfair text-2xl text-white group-hover:text-[#D4AF37] transition-colors">{event.title}</h4>
                      <p className="font-outfit text-gray-400 text-sm mt-1">{event.type}</p>
                    </div>
                  </div>
                  <button className="w-full md:w-auto border border-white/20 text-white px-6 py-2 uppercase tracking-widest text-xs font-outfit hover:bg-white hover:text-black transition-all">
                    Guestlist
                  </button>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Footer / Contact */}
      <footer className="bg-[#020202] pt-24 pb-12 border-t border-white/5 relative">
        <div className="container mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
            
            <div className="lg:col-span-2">
              <div className="flex items-center gap-2 mb-6">
                <div className="w-10 h-10 rounded-full border border-[#D4AF37] flex items-center justify-center">
                  <span className="font-cinzel font-bold text-[#D4AF37] text-xl">R</span>
                </div>
                <h1 className="font-cinzel text-3xl tracking-widest text-white uppercase">
                  Rasputin
                </h1>
              </div>
              <p className="font-outfit text-gray-400 font-light max-w-sm mb-8 leading-relaxed">
                Dubai's premier destination for high-end nightlife, blending opulent design with world-class entertainment and unparalleled VIP service.
              </p>
              <div className="flex gap-4">
                {[Instagram, Facebook, Twitter].map((Icon, i) => (
                  <a key={i} href="#" className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-gray-400 hover:text-[#D4AF37] hover:border-[#D4AF37] transition-all">
                    <Icon size={18} />
                  </a>
                ))}
              </div>
            </div>

            <div>
              <h4 className="font-outfit text-white uppercase tracking-widest text-sm mb-6 font-bold">Contact</h4>
              <ul className="space-y-4 font-outfit text-gray-400 font-light text-sm">
                <li>Street # 45C, Dubai, UAE</li>
                <li>+971 50 528 7736</li>
                <li>reservations@rasputindubai.com</li>
                <li className="pt-2 text-[#D4AF37]">Open Daily: 10PM - 4AM</li>
              </ul>
            </div>

            <div>
              <h4 className="font-outfit text-white uppercase tracking-widest text-sm mb-6 font-bold">Quick Links</h4>
              <ul className="space-y-3 font-outfit text-gray-400 font-light text-sm">
                <li><a href="#about" className="hover:text-white transition-colors">The Story</a></li>
                <li><a href="#menu" className="hover:text-white transition-colors">Signature Menu</a></li>
                <li><a href="#events" className="hover:text-white transition-colors">Events & DJs</a></li>
                <li><a href="#gallery" className="hover:text-white transition-colors">Gallery</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Dress Code Policy</a></li>
              </ul>
            </div>

          </div>

          <div className="w-full h-64 mb-16 rounded-lg overflow-hidden border border-white/10 grayscale opacity-70 hover:grayscale-0 hover:opacity-100 transition-all duration-700">
             <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d115408.09799732733!2d55.1979469!3d25.0750095!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f43496ad9c645%3A0xbde66e5084295162!2sDubai%20-%20United%20Arab%20Emirates!5e0!3m2!1sen!2sus!4v1700000000000!5m2!1sen!2sus" 
                width="100%" 
                height="100%" 
                style={{border:0}} 
                allowFullScreen="" 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                title="Rasputin Bar Location"
              ></iframe>
          </div>

          <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="font-outfit text-gray-600 text-xs tracking-wider uppercase">
              &copy; {new Date().getFullYear()} Rasputin Bar Dubai. All Rights Reserved.
            </p>
            <div className="flex gap-6 font-outfit text-gray-600 text-xs tracking-wider uppercase">
              <a href="#" className="hover:text-gray-300">Privacy Policy</a>
              <a href="#" className="hover:text-gray-300">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>

      {/* VIP Membership Popup */}
      {showPopup && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div 
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            onClick={() => setShowPopup(false)}
          ></div>
          <div className="relative w-full max-w-md bg-[#0a0a0a] border border-[#D4AF37]/30 shadow-[0_0_50px_rgba(75,0,130,0.3)] rounded-xl overflow-hidden animate-fade-in-up">
            <button 
              onClick={() => setShowPopup(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-white z-10"
            >
              <X size={20} />
            </button>
            
            <div className="p-8 text-center relative">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent"></div>
              
              <div className="w-16 h-16 mx-auto border border-[#D4AF37] rounded-full flex items-center justify-center mb-6">
                <Star className="text-[#D4AF37]" size={24} />
              </div>
              
              <h3 className="font-playfair text-3xl text-white mb-2">The Inner Circle</h3>
              <p className="font-outfit text-gray-400 text-sm mb-6 leading-relaxed">
                Join our exclusive guestlist for priority table bookings, secret menu access, and invites to private events.
              </p>
              
              <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); setShowPopup(false); }}>
                <input 
                  type="email" 
                  required
                  placeholder="Enter your email address" 
                  className="w-full bg-white/5 border border-white/10 px-4 py-3 text-white font-outfit text-sm focus:outline-none focus:border-[#D4AF37]"
                />
                <button 
                  type="submit"
                  className="w-full bg-gold text-black px-4 py-3 uppercase tracking-widest text-sm font-bold hover:shadow-[0_0_15px_rgba(212,175,55,0.4)] transition-all"
                >
                  Request Access
                </button>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Global styles for popup animation */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in-up {
          animation: fadeInUp 0.5s ease-out forwards;
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .animate-fade-in {
          animation: fadeIn 0.3s ease-out forwards;
        }
      `}} />
    </div>
  );
}