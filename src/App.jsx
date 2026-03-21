import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { 
  MapPin, Phone, Clock, Instagram, Facebook, Twitter, 
  ChevronRight, Star, X, Check, ArrowRight, Send, Globe
} from 'lucide-react';

// --- BRAND CONFIGURATION ---
const BRAND = {
  name: 'Aswar',
  surname: 'Al Qaryat',
  address: '55 25th St, Dubai, UAE',
  phone: '+971 55 452 5166',
  hours: 'Mon - Sun: 6:00 PM - 2:00 AM'
};

const customEase = [0.25, 1, 0.5, 1]; 

const fadeInUp = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 1.8, ease: customEase } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
};

// --- GLOBAL COMPONENTS ---

const CinematicGrain = () => (
  <div 
    className="fixed inset-0 pointer-events-none opacity-[0.025] z-[9999] mix-blend-overlay" 
    style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.9%22 numOctaves=%224%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }}
  />
);

const CustomCursor = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const updateMouse = (e) => setMousePos({ x: e.clientX, y: e.clientY });
    const handleHover = (e) => {
      const target = e.target.tagName.toLowerCase();
      setIsHovering(target === 'button' || target === 'a' || !!e.target.closest('button') || !!e.target.closest('a'));
    };
    window.addEventListener('mousemove', updateMouse);
    window.addEventListener('mouseover', handleHover);
    return () => {
      window.removeEventListener('mousemove', updateMouse);
      window.removeEventListener('mouseover', handleHover);
    };
  }, []);

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 w-10 h-10 rounded-full border pointer-events-none z-[9999] mix-blend-difference hidden md:flex items-center justify-center transition-colors duration-300"
        animate={{
          x: mousePos.x - 20,
          y: mousePos.y - 20,
          scale: isHovering ? 1.8 : 1,
          borderColor: isHovering ? 'rgba(212, 175, 55, 0.8)' : 'rgba(212, 175, 55, 0.2)',
        }}
        transition={{ type: 'tween', ease: "easeOut", duration: 0.1 }}
      />
      <div 
        className="fixed top-0 left-0 w-1 h-1 bg-[#F7E7CE] rounded-full pointer-events-none z-[9999] mix-blend-difference hidden md:block shadow-[0_0_8px_#F7E7CE]"
        style={{ transform: `translate(${mousePos.x - 2}px, ${mousePos.y - 2}px)` }}
      />
    </>
  );
};

const Loader = ({ setLoading }) => {
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 4000); 
    return () => clearTimeout(timer);
  }, [setLoading]);

  return (
    <motion.div
      className="fixed inset-0 z-[2000] flex flex-col items-center justify-center bg-[#020202]"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 1.5, ease: customEase } }}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0, filter: 'blur(10px)' }}
        animate={{ scale: 1, opacity: 1, filter: 'blur(0px)' }}
        transition={{ duration: 2.5, ease: customEase }}
        className="flex flex-col items-center relative"
      >
        <h1 
          className="text-transparent bg-clip-text bg-gradient-to-b from-[#FFF380] via-[#D4AF37] to-[#000000] font-serif text-6xl md:text-8xl tracking-[0.25em] text-center font-bold uppercase"
          style={{ WebkitTextStroke: '1px rgba(212,175,55,0.8)' }}
        >
          {BRAND.name}
        </h1>
        <span className="text-[10px] md:text-xs tracking-[0.8em] font-bold text-[#D4AF37] mt-6 block uppercase ml-2 drop-shadow-[0_0_15px_rgba(212,175,55,0.8)]">
          {BRAND.surname}
        </span>
      </motion.div>
      <motion.div 
        className="w-[1px] h-0 bg-gradient-to-b from-[#D4AF37] to-transparent mt-20 absolute bottom-1/4"
        animate={{ height: "150px" }}
        transition={{ duration: 2.5, delay: 0.8, ease: customEase }}
      />
    </motion.div>
  );
};

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Experience', id: 'about' }, 
    { name: 'The Menu', id: 'menu' }, 
    { name: 'Gallery', id: 'gallery' }, 
    { name: 'Reservations', id: 'reservation' }
  ];

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 1.5, delay: 0.5, ease: customEase }}
      className={`fixed top-0 w-full z-50 transition-all duration-1000 ${
        scrolled 
          ? 'bg-[#020202]/80 backdrop-blur-2xl border-b border-[#D4AF37]/10 py-6' 
          : 'bg-gradient-to-b from-black/90 to-transparent py-10'
      }`}
    >
      <div className="container mx-auto px-8 lg:px-20 flex justify-between items-center">
        <a href="#" className="flex flex-col items-center group">
          <span className="font-serif text-[#D4AF37] text-xl md:text-2xl tracking-[0.25em] uppercase group-hover:text-[#FFF380] transition-colors duration-700">
            {BRAND.name}
          </span>
        </a>

        <div className="hidden md:flex items-center space-x-14">
          {navLinks.map((link) => (
            <a 
              key={link.id} 
              href={`#${link.id}`}
              className="text-[9px] uppercase tracking-[0.4em] text-white/60 hover:text-[#D4AF37] transition-colors duration-700 relative group"
            >
              {link.name}
              <span className="absolute -bottom-4 left-1/2 w-0 h-[1px] bg-[#D4AF37] group-hover:w-full transition-all duration-700 transform -translate-x-1/2 ease-in-out"></span>
            </a>
          ))}
          <div className="w-[1px] h-4 bg-white/10"></div>
          <a 
            href="#reservation"
            className="text-[9px] uppercase tracking-[0.4em] text-[#D4AF37] hover:text-[#F7E7CE] transition-colors duration-700 font-bold border border-[#D4AF37]/30 px-6 py-2 rounded-full"
          >
            Book Now
          </a>
        </div>

        <button className="md:hidden text-[#D4AF37] flex flex-col space-y-2 z-50" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          <span className={`block w-8 h-[1px] bg-[#D4AF37] transition-transform duration-700 ${mobileMenuOpen ? 'rotate-45 translate-y-[9px]' : ''}`}></span>
          <span className={`block w-8 h-[1px] bg-[#D4AF37] transition-opacity duration-700 ${mobileMenuOpen ? 'opacity-0' : ''}`}></span>
          <span className={`block w-8 h-[1px] bg-[#D4AF37] transition-transform duration-700 ${mobileMenuOpen ? '-rotate-45 -translate-y-[9px]' : ''}`}></span>
        </button>
      </div>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1, ease: customEase }}
            className="fixed inset-0 w-full h-screen bg-[#020202]/98 backdrop-blur-3xl flex flex-col items-center justify-center space-y-12 z-40"
          >
            {navLinks.map((link) => (
              <a key={link.id} href={`#${link.id}`} onClick={() => setMobileMenuOpen(false)} className="text-3xl font-serif font-light text-[#F7E7CE]/80 hover:text-[#D4AF37] transition-colors tracking-widest uppercase">
                {link.name}
              </a>
            ))}
            <div className="w-12 h-[1px] bg-[#D4AF37]/30 my-8"></div>
            <a href="#reservation" onClick={() => setMobileMenuOpen(false)} className="text-[10px] tracking-[0.5em] uppercase text-[#D4AF37]">Secure a Table</a>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

const Hero = () => {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 1000], [0, 350]);
  const opacity = useTransform(scrollY, [0, 600], [1, 0]);

  const heroImages = [
    'https://image2url.com/r2/default/images/1774110672578-310d0899-046c-4c12-85fc-b51ba6ceef10.jpg',
    'https://image2url.com/r2/default/images/1774110709609-0cf13fe4-c2ea-4e13-8547-66765f8c02df.jpg',
    'https://image2url.com/r2/default/images/1774110745040-e3060498-012b-4731-918b-618ec3040e69.jpg',
    'https://image2url.com/r2/default/images/1774110784939-c135172d-afc7-49d9-aae9-78c69e8fab26.jpg',
    'https://image2url.com/r2/default/images/1774110824941-bde0d96b-7e53-4488-ac4e-2a3e8e34f887.jpg'
  ];

  const [currentImg, setCurrentImg] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImg((prev) => (prev + 1) % heroImages.length);
    }, 6000); 
    return () => clearInterval(interval);
  }, [heroImages.length]);

  const scrollToReservation = (e) => {
    e.preventDefault();
    const el = document.getElementById('reservation');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="home" className="relative h-screen flex items-center justify-center overflow-hidden bg-[#020202]">
      <motion.div style={{ y, opacity }} className="absolute inset-0 w-full h-full">
        <div className="absolute inset-0 bg-[#020202]/60 z-10 mix-blend-multiply"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#020202] via-transparent to-[#020202]/80 z-10"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(212,175,55,0.15)_0%,rgba(0,0,0,0.9)_100%)] z-10 pointer-events-none"></div>
        
        {heroImages.map((src, index) => (
          <motion.img
            key={src}
            src={src}
            alt="Luxury Dining"
            initial={{ opacity: 0, scale: 1 }}
            animate={{ 
              opacity: index === currentImg ? 0.7 : 0,
              scale: index === currentImg ? 1.05 : 1
            }}
            transition={{ 
              opacity: { duration: 2.5, ease: "easeInOut" },
              scale: { duration: 10, ease: "linear" }
            }}
            className="absolute inset-0 w-full h-full object-cover filter contrast-[1.1] saturate-[0.6]"
          />
        ))}
      </motion.div>

      <div className="relative z-20 text-center px-4 w-full flex flex-col items-center mt-20 md:mt-28">
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] md:w-[700px] md:h-[700px] bg-[#D4AF37] opacity-10 blur-[150px] rounded-full pointer-events-none z-0"></div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 2, delay: 3.5, ease: customEase }}
          className="mb-12 md:mb-16 flex items-center space-x-6 relative z-10"
        >
          <div className="w-8 md:w-16 h-[1px] bg-gradient-to-r from-transparent to-[#D4AF37]/50"></div>
          <span className="text-[#D4AF37]/90 uppercase tracking-[0.6em] md:tracking-[0.8em] text-[8px] md:text-[9px] font-bold">The Royal Gastronomy • Dubai</span>
          <div className="w-8 md:w-16 h-[1px] bg-gradient-to-l from-transparent to-[#D4AF37]/50"></div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 2, delay: 3.8, ease: customEase }}
          className="flex flex-col items-center justify-center font-serif relative z-10 w-full"
        >
          <span className="text-7xl md:text-[10rem] lg:text-[14rem] leading-[0.8] tracking-[0.02em] font-bold text-transparent bg-clip-text bg-gradient-to-b from-[#FFF380] via-[#D4AF37] to-[#000000] uppercase" style={{ WebkitTextStroke: '1px rgba(212,175,55,0.4)' }}>
            {BRAND.name}
          </span>
          <span className="text-2xl md:text-5xl lg:text-[4.5rem] leading-none tracking-[0.4em] ml-[0.4em] mt-8 md:mt-12 font-bold text-[#020202] uppercase drop-shadow-[0_0_20px_rgba(212,175,55,0.8)]" style={{ WebkitTextStroke: '2px #D4AF37' }}>
            {BRAND.surname}
          </span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5, delay: 4.5, ease: customEase }}
          className="mt-20 md:mt-24 z-30"
        >
          <a 
            href="#reservation"
            onClick={scrollToReservation}
            className="group relative inline-flex items-center space-x-6 px-14 py-6 bg-transparent border border-[#D4AF37]/50 overflow-hidden transition-all duration-700 rounded-sm shadow-[0_0_30px_rgba(212,175,55,0.15)]"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-[#B58E34] via-[#F7E7CE] to-[#B58E34] translate-y-[100%] group-hover:translate-y-0 transition-transform duration-700 ease-out"></div>
            <span className="relative z-10 text-[11px] uppercase tracking-[0.6em] font-bold text-[#D4AF37] group-hover:text-black transition-colors duration-500">Secure Your Private Table</span>
            <div className="relative z-10 w-8 h-[1px] bg-[#D4AF37]/50 group-hover:bg-black group-hover:w-12 transition-all duration-500"></div>
          </a>
        </motion.div>
      </div>

      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 5.5, duration: 2 }}
        className="absolute bottom-0 left-1/2 transform -translate-x-1/2 z-20 flex flex-col items-center"
      >
        <div className="w-[1px] h-24 md:h-32 bg-white/10 overflow-hidden relative">
          <motion.div animate={{ y: [0, 128] }} transition={{ repeat: Infinity, duration: 2.5, ease: "linear" }} className="w-full h-1/3 bg-[#D4AF37] absolute top-0" />
        </div>
      </motion.div>
    </section>
  );
};

const About = () => {
  return (
    <section id="about" className="py-40 md:py-56 bg-[#020202] relative text-[#F7E7CE] overflow-hidden border-t border-white/5">
      <div className="absolute top-1/2 left-0 transform -translate-y-1/2 text-[18vw] font-serif font-black text-[#D4AF37]/[0.02] whitespace-nowrap pointer-events-none select-none z-0 tracking-tighter uppercase">
        ART OF TASTE
      </div>

      <div className="container mx-auto px-6 lg:px-20 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.8, ease: customEase }}
          className="bg-gradient-to-br from-black via-[#0a0600] to-[#1a1100] backdrop-blur-3xl border border-[#D4AF37]/30 rounded-[40px] p-10 md:p-16 lg:p-24 shadow-[0_0_60px_rgba(212,175,55,0.15)] hover:shadow-[0_0_100px_rgba(212,175,55,0.25)] transition-shadow duration-1000 relative overflow-hidden"
        >
          <div className="absolute -top-32 -left-32 w-96 h-96 bg-[#D4AF37]/5 blur-[120px] pointer-events-none rounded-full"></div>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-20 lg:gap-16 items-center relative z-10">
            <div className="lg:col-span-5 lg:pr-12">
              <h4 className="text-[#D4AF37]/80 uppercase tracking-[0.5em] text-[9px] mb-10">The Philosophy</h4>
              <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl mb-12 leading-[1.1] text-white font-light">
                A Symphony of <br/> <span className="italic text-[#D4AF37]">Flavors & Elegance</span>
              </h2>
              <p className="text-white/40 font-light leading-relaxed mb-8 text-sm md:text-[15px] tracking-wide text-justify">
                Nestled in the prestigious heart of Dubai, {BRAND.name} {BRAND.surname} represents the zenith of modern fine dining. Our philosophy transcends mere sustenance, elevating the culinary arts into an immersive, theatrical journey.
              </p>
              <div className="flex items-center space-x-8">
                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/ca/Gordon_Ramsay_Signature.svg/1200px-Gordon_Ramsay_Signature.svg.png" alt="Chef Signature" className="h-8 opacity-40 filter invert brightness-0" />
                <div className="h-[1px] w-12 bg-[#D4AF37]/30"></div>
                <p className="uppercase tracking-[0.3em] text-[8px] text-white/40 font-bold">Executive Chef</p>
              </div>
            </div>
            <div className="lg:col-span-7 flex justify-center lg:justify-end">
              <div className="relative w-full max-w-lg aspect-[3/4] overflow-hidden rounded-[40px] border border-[#D4AF37]/30 shadow-[0_0_50px_rgba(0,0,0,1)]">
                <img src="https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?q=80&w=1500&auto=format&fit=crop" alt="Master Chef" className="w-full h-full object-cover filter contrast-[1.1] saturate-[0.6] brightness-90" />
                <div className="absolute inset-0 border border-[#D4AF37]/20 m-6 rounded-[30px] z-10 pointer-events-none"></div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

const Menu = () => {
  const [activeCategory, setActiveCategory] = useState('Starters');
  const [selectedDish, setSelectedDish] = useState(null);

  const categories = ['Starters', 'Mains', 'Desserts', 'Beverages'];

  const menuItems = {
    'Starters': [
      { name: 'Wagyu Beef Tartare', desc: 'Truffle emulsion, cured egg yolk, 24k gold leaf, toasted brioche.', price: '150', image: 'https://image2url.com/r2/default/images/1774110672578-310d0899-046c-4c12-85fc-b51ba6ceef10.jpg' },
      { name: 'Truffle Burrata', desc: 'Puglia burrata, heirloom tomatoes, 12-year aged balsamic caviar, basil oil.', price: '120', image: 'https://image2url.com/r2/default/images/1774110709609-0cf13fe4-c2ea-4e13-8547-66765f8c02df.jpg' },
      { name: 'Caviar Blinis', desc: 'Premium Beluga caviar, crème fraîche, chives, buckwheat blinis.', price: '350', image: 'https://image2url.com/r2/default/images/1774110745040-e3060498-012b-4731-918b-618ec3040e69.jpg' }
    ],
    'Mains': [
      { name: 'Tomahawk Steak 24k', desc: 'MB9+ Wagyu, wrapped in 24k edible gold leaf, served with truffled mash.', price: '1200', image: 'https://images.unsplash.com/photo-1598514982205-f36b96d1e8d4?q=80&w=800&auto=format&fit=crop' },
      { name: 'Chilean Sea Bass', desc: 'Pan-seared, saffron risotto, asparagus, lemon butter foam.', price: '280', image: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?q=80&w=800&auto=format&fit=crop' }
    ],
    'Desserts': [
      { name: 'Valrhona Fondant', desc: 'Molten dark chocolate, Madagascar vanilla bean ice cream.', price: '110', image: 'https://image2url.com/r2/default/images/1774110784939-c135172d-afc7-49d9-aae9-78c69e8fab26.jpg' },
      { name: 'Gold Leaf Pannacotta', desc: 'Spanish Saffron infused, mixed berry coulis, pistachios.', price: '140', image: 'https://image2url.com/r2/default/images/1774110824941-bde0d96b-7e53-4488-ac4e-2a3e8e34f887.jpg' },
    ],
    'Beverages': [
      { name: 'The Desert Rose', desc: 'Signature mocktail, rose water, lychee, edible gold.', price: '85', image: 'https://images.unsplash.com/photo-1536935338788-846bb9981813?q=80&w=800&auto=format&fit=crop' },
      { name: 'Artisan Coffee', desc: 'Ethiopian single origin, brewed tableside via siphon.', price: '65', image: 'https://images.unsplash.com/photo-1497935586351-b67a49e012bf?q=80&w=800&auto=format&fit=crop' }
    ]
  };

  return (
    <section id="menu" className="py-40 bg-[#020202] text-white border-t border-white/5 relative">
      <div className="container mx-auto px-8 lg:px-20 relative z-10">
        <div className="text-center mb-24">
          <h4 className="text-[#D4AF37]/80 uppercase tracking-[0.5em] text-[9px] mb-8">Culinary Masterpieces</h4>
          <h2 className="font-serif text-4xl md:text-5xl lg:text-7xl text-white font-light">
            The Royal <span className="italic text-[#D4AF37]">Selection</span>
          </h2>
        </div>

        <div className="flex flex-wrap justify-center gap-10 mb-32">
          {categories.map((cat) => (
            <button key={cat} onClick={() => setActiveCategory(cat)} className={`uppercase tracking-[0.4em] text-[9px] md:text-[10px] transition-all duration-1000 pb-3 border-b ${activeCategory === cat ? 'text-[#D4AF37] border-[#D4AF37]' : 'text-white/30 border-transparent hover:text-white/80'}`}>
              {cat}
            </button>
          ))}
        </div>

        <div className="max-w-7xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div key={activeCategory} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -30 }} transition={{ duration: 1, ease: customEase }} className="grid grid-cols-1 lg:grid-cols-2 gap-8 relative z-10">
              {menuItems[activeCategory].map((item) => (
                <div key={item.name} onClick={() => setSelectedDish(item)} className="group flex items-center p-6 bg-gradient-to-br from-black via-[#0a0600] to-[#1a1100] backdrop-blur-xl border border-[#D4AF37]/30 rounded-[40px] transition-all duration-700 shadow-[0_0_60px_rgba(212,175,55,0.1)] hover:shadow-[0_0_80px_rgba(212,175,55,0.2)] cursor-pointer">
                  <div className="w-24 h-24 md:w-32 md:h-32 flex-shrink-0 rounded-[25px] overflow-hidden border border-[#D4AF37]/20 group-hover:border-[#D4AF37]/80 relative shadow-2xl transition-all duration-1000">
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover filter saturate-50 contrast-125" />
                  </div>
                  <div className="ml-8 flex-1">
                    <div className="flex justify-between items-center mb-3">
                      <h3 className="font-serif text-2xl md:text-3xl text-white font-light tracking-wide">{item.name}</h3>
                      <div className="flex items-baseline space-x-1">
                        <span className="text-[#D4AF37] font-serif text-2xl md:text-3xl italic font-light">{item.price}</span>
                        <span className="text-white/30 text-[8px] uppercase tracking-widest">AED</span>
                      </div>
                    </div>
                    <p className="text-white/40 font-light text-[13px] tracking-wide leading-relaxed line-clamp-2">{item.desc}</p>
                  </div>
                </div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      <AnimatePresence>
        {selectedDish && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[1000] flex items-center justify-center p-4 md:p-8 bg-black/95 backdrop-blur-xl" onClick={() => setSelectedDish(null)}>
            <motion.div initial={{ scale: 0.98, opacity: 0, y: 30 }} animate={{ scale: 1, opacity: 1, y: 0 }} exit={{ scale: 0.98, opacity: 0, y: 30 }} transition={{ duration: 0.8, ease: customEase }} onClick={(e) => e.stopPropagation()} className="bg-gradient-to-br from-black via-[#0a0600] to-[#1a1100] border border-[#D4AF37]/30 max-w-6xl w-full flex flex-col md:flex-row relative shadow-[0_0_100px_rgba(0,0,0,1)] rounded-[40px] overflow-hidden">
              <button onClick={() => setSelectedDish(null)} className="absolute top-8 right-8 z-20 text-white/30 hover:text-[#D4AF37] transition-all"><X className="w-8 h-8 font-light" /></button>
              <div className="md:w-1/2 h-80 md:h-[600px] relative"><img src={selectedDish.image} alt={selectedDish.name} className="w-full h-full object-cover filter saturate-50 contrast-125" /></div>
              <div className="md:w-1/2 p-12 md:p-24 flex flex-col justify-center">
                <h4 className="text-[#D4AF37]/80 uppercase tracking-[0.5em] text-[8px] mb-8">Culinary Art</h4>
                <h3 className="font-serif text-4xl md:text-6xl text-white mb-8 leading-tight font-light">{selectedDish.name}</h3>
                <p className="text-white/40 font-light leading-relaxed mb-12 text-sm tracking-wide">{selectedDish.desc}</p>
                <span className="text-[#D4AF37] font-serif text-4xl italic font-light mb-16">{selectedDish.price} AED</span>
                <a href="#reservation" onClick={() => setSelectedDish(null)} className="group inline-flex items-center space-x-6 uppercase tracking-[0.4em] text-[10px] text-white/60 hover:text-white transition-colors duration-700"><span>Request Invitation</span><div className="w-12 h-[1px] bg-[#D4AF37]/40 group-hover:bg-[#D4AF37] group-hover:w-20 transition-all duration-700"></div></a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

const Gallery = () => {
  const [lightboxImg, setLightboxImg] = useState(null);
  const images = [
    { src: 'https://image2url.com/r2/default/images/1774110672578-310d0899-046c-4c12-85fc-b51ba6ceef10.jpg', aspect: 'aspect-[3/4] col-span-1 md:col-span-2 row-span-2' },
    { src: 'https://image2url.com/r2/default/images/1774110709609-0cf13fe4-c2ea-4e13-8547-66765f8c02df.jpg', aspect: 'aspect-square col-span-1 row-span-1' },
    { src: 'https://image2url.com/r2/default/images/1774110745040-e3060498-012b-4731-918b-618ec3040e69.jpg', aspect: 'aspect-[4/3] col-span-1 md:col-span-2 row-span-1' },
    { src: 'https://image2url.com/r2/default/images/1774110784939-c135172d-afc7-49d9-aae9-78c69e8fab26.jpg', aspect: 'aspect-[3/4] col-span-1 row-span-2' },
    { src: 'https://image2url.com/r2/default/images/1774110824941-bde0d96b-7e53-4488-ac4e-2a3e8e34f887.jpg', aspect: 'aspect-square col-span-1 row-span-1' },
  ];

  return (
    <section id="gallery" className="py-40 bg-[#020202] border-t border-white/5">
      <div className="container mx-auto px-6 lg:px-20 relative z-10 text-center mb-32">
        <h4 className="text-[#D4AF37]/80 uppercase tracking-[0.5em] text-[9px] mb-8 font-bold">The Ambience</h4>
        <h2 className="font-serif text-4xl md:text-5xl lg:text-7xl text-white font-light">Visual <span className="italic text-[#D4AF37]">Journey</span></h2>
      </div>
      <div className="container mx-auto px-6 lg:px-20">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 auto-rows-min">
          {images.map((img, index) => (
            <motion.div key={index} onClick={() => setLightboxImg(img.src)} initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 1.5, delay: index * 0.15, ease: customEase }} className={`relative overflow-hidden group cursor-pointer ${img.aspect} bg-[#000000] border border-white/5`}>
              <img src={img.src} alt={`Concept ${index}`} className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-[3s] filter contrast-[1.1] saturate-[0.6]" />
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/60 transition-colors duration-1000 z-10 flex items-center justify-center"><span className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-1000 tracking-[0.5em] text-[8px] uppercase font-light">View</span></div>
            </motion.div>
          ))}
        </div>
      </div>
      <AnimatePresence>
        {lightboxImg && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.8 }} className="fixed inset-0 z-[2000] flex items-center justify-center bg-[#020202]/98 p-4 md:p-12 cursor-zoom-out backdrop-blur-xl" onClick={() => setLightboxImg(null)}>
            <button className="absolute top-10 right-10 z-50 text-white/30 hover:text-white transition-colors duration-500"><X className="w-10 h-10 font-light" /></button>
            <motion.img initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }} transition={{ duration: 1, ease: customEase }} src={lightboxImg} alt="Gallery Large" className="max-w-full max-h-full object-contain filter contrast-110 saturate-75 border border-[#D4AF37]/20 shadow-[0_0_60px_rgba(212,175,55,0.2)]" onClick={(e) => e.stopPropagation()} />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

const Reviews = () => {
  const reviews = [
    { text: "The most exclusive experience in Dubai. The 24k Wagyu was an absolute revelation.", author: "H.H. Sheikh Al Maktoum", role: "VVIP Guest" },
    { text: "Impeccable service and a truly royal atmosphere. Every dish is a masterpiece of art.", author: "Vogue Arabia", role: "Editorial" },
    { text: "Not just a meal, but a theatrical journey through taste. Truly unmatched globally.", author: "The Michelin Critic", role: "2026 Guide" }
  ];

  return (
    <section id="reviews" className="py-48 bg-[#020202] relative overflow-hidden border-t border-white/5">
      <div className="container mx-auto px-6 lg:px-20 relative z-10">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer} className="text-center mb-32">
          <h4 className="text-[#D4AF37]/80 uppercase tracking-[0.5em] text-[9px] mb-6 tracking-widest font-bold">Voices of Prestige</h4>
          <motion.h2 variants={fadeInUp} className="font-serif text-4xl md:text-5xl lg:text-7xl text-white font-light uppercase tracking-tight">
            Client <span className="italic text-[#D4AF37]">Testimonials</span>
          </motion.h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-7xl mx-auto relative z-10">
          {reviews.map((rev, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1.5, delay: idx * 0.2, ease: customEase }}
              className="group p-12 md:p-14 bg-gradient-to-br from-black via-[#0a0600] to-[#1a1100] backdrop-blur-3xl border border-[#D4AF37]/30 rounded-[40px] shadow-[0_0_60px_rgba(0,0,0,1)] hover:shadow-[0_0_80px_rgba(212,175,55,0.25)] transition-all duration-1000 h-full flex flex-col justify-between"
            >
              <div>
                <Star className="w-5 h-5 text-[#D4AF37] mb-12 fill-[#D4AF37]/20" strokeWidth={1} />
                <p className="font-serif text-2xl md:text-3xl text-white/90 leading-tight mb-12 italic font-light tracking-wide group-hover:text-white transition-colors duration-700">
                  "{rev.text}"
                </p>
              </div>
              <div className="pt-10 border-t border-[#D4AF37]/10">
                <p className="uppercase tracking-[0.4em] text-[11px] text-[#D4AF37] font-bold mb-3">{rev.author}</p>
                <p className="uppercase tracking-[0.2em] text-[9px] text-white/30 font-light">{rev.role}</p>
              </div>
            </motion.div>
          ))}
        </div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-[500px] bg-[#D4AF37] opacity-[0.05] blur-[150px] pointer-events-none rounded-full"></div>
      </div>
    </section>
  );
};

const Reservation = () => {
  const [formStatus, setFormStatus] = useState('idle');
  const [formData, setFormData] = useState({ name: '', phone: '', date: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormStatus('submitting');
    const message = `L'Invitation Exclusive - Aswar Al Qaryat\n\nBooking Request:\nName: ${formData.name}\nWhatsApp: ${formData.phone}\nDate: ${formData.date}\n\nPlease verify this invitation.`;
    const whatsappUrl = `https://wa.me/971554525166?text=${encodeURIComponent(message)}`;
    
    setTimeout(() => {
      setFormStatus('success');
      window.open(whatsappUrl, '_blank');
      setTimeout(() => setFormStatus('idle'), 5000);
    }, 2000);
  };

  return (
    <section id="reservation" className="py-40 md:py-56 bg-[#020202] relative border-t border-white/5">
      <div className="absolute inset-0 z-0 opacity-30 mix-blend-luminosity">
        <img src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=2070&auto=format&fit=crop" alt="Interior" className="w-full h-full object-cover filter contrast-150 saturate-0" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#020202] via-[#020202]/80 to-[#020202]"></div>
      </div>
      <div className="container mx-auto px-8 lg:px-20 relative z-10">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer} className="text-center mb-24">
          <motion.h4 variants={fadeInUp} className="text-[#D4AF37]/80 uppercase tracking-[0.5em] text-[9px] mb-6">L'Invitation</motion.h4>
          <motion.h2 variants={fadeInUp} className="font-serif text-4xl md:text-5xl lg:text-7xl text-white font-light uppercase tracking-tight">
            Secure Your <span className="italic text-[#D4AF37]">Table</span>
          </motion.h2>
        </motion.div>
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-16 lg:gap-24 items-start">
          <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 1.5, ease: customEase }} className="lg:w-4/12 pt-4">
            <h3 className="font-serif text-3xl text-white mb-10 font-light italic">Concierge d'Elite</h3>
            <p className="text-white/40 font-light mb-20 leading-relaxed text-[14px] tracking-wide text-justify">Dining here is more than a meal; it is a royal legacy. Our concierge will contact you directly via WhatsApp to finalize your private arrangement.</p>
            <div className="space-y-14 relative z-10">
              <div><p className="text-[9px] uppercase tracking-[0.4em] text-white/40 mb-4">Direct Concierge</p><p className="text-[#D4AF37] font-serif text-3xl italic font-light">{BRAND.phone}</p></div>
              <div><p className="text-[9px] uppercase tracking-[0.4em] text-white/40 mb-4">Hours of Service</p><p className="text-white/70 font-light text-base tracking-widest">{BRAND.hours}</p></div>
            </div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, y: 40 }} 
            whileInView={{ opacity: 1, y: 0 }} 
            viewport={{ once: true }} 
            transition={{ duration: 1.5, delay: 0.2, ease: customEase }} 
            className="lg:w-8/12 w-full bg-gradient-to-br from-black via-[#0a0600] to-[#1A1100] p-10 md:p-14 border border-[#D4AF37]/40 rounded-[40px] shadow-[0_0_100px_rgba(212,175,55,0.25)] relative overflow-hidden"
          >
            <div className="relative z-10">
              {formStatus === 'success' ? (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="h-full min-h-[350px] flex flex-col items-center justify-center text-center">
                  <div className="w-24 h-24 border border-[#D4AF37]/50 rounded-full flex items-center justify-center mb-10 shadow-[0_0_30px_rgba(212,175,55,0.4)]"><Check className="w-10 h-10 text-[#D4AF37]" strokeWidth={1} /></div>
                  <h3 className="font-serif text-4xl text-[#D4AF37] mb-6 font-light italic text-shadow">Establishing Connection...</h3>
                  <p className="text-white/40 font-light text-base max-w-sm tracking-wide leading-relaxed">Redirecting your request to the head concierge. Please authorize the message to confirm.</p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-8">
                  <h3 className="text-[#D4AF37] font-serif text-2xl mb-8 border-b border-[#D4AF37]/10 pb-4 tracking-widest italic">Book Your Table</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="relative group">
                      <input required type="text" className="w-full bg-black/40 border border-[#D4AF37]/20 rounded-[20px] px-6 py-4 text-white text-base font-light focus:outline-none focus:border-[#D4AF37] focus:shadow-[0_0_30px_rgba(212,175,55,0.2)] transition-all" placeholder="Excellency's Full Name" value={formData.name} onChange={(e)=>setFormData({...formData, name: e.target.value})} />
                    </div>
                    <div className="relative group">
                      <input required type="tel" className="w-full bg-black/40 border border-[#D4AF37]/20 rounded-[20px] px-6 py-4 text-white text-base font-light focus:outline-none focus:border-[#D4AF37] focus:shadow-[0_0_30px_rgba(212,175,55,0.2)] transition-all" placeholder="Private WhatsApp Number" value={formData.phone} onChange={(e)=>setFormData({...formData, phone: e.target.value})} />
                    </div>
                  </div>
                  <div className="relative group">
                    <input required type="date" className="w-full bg-black/40 border border-[#D4AF37]/20 rounded-[20px] px-6 py-4 text-white text-base font-light focus:outline-none focus:border-[#D4AF37] focus:shadow-[0_0_30px_rgba(212,175,55,0.2)] transition-all [color-scheme:dark]" value={formData.date} onChange={(e)=>setFormData({...formData, date: e.target.value})} />
                  </div>
                  <div className="pt-6 flex justify-end">
                    <button disabled={formStatus === 'submitting'} type="submit" className="group relative inline-flex items-center space-x-6 px-12 py-5 bg-transparent border border-[#D4AF37] text-[#D4AF37] uppercase tracking-[0.5em] text-[10px] font-bold overflow-hidden transition-all duration-700 hover:text-black rounded-full shadow-[0_0_40px_rgba(212,175,55,0.4)]">
                      <div className="absolute inset-0 w-full h-full bg-[#D4AF37] translate-y-[100%] group-hover:translate-y-0 transition-transform duration-700 ease-[0.16,1,0.3,1]"></div>
                      <span className="relative z-10">{formStatus === 'submitting' ? 'Awaiting...' : 'Request Private Invitation'}</span>
                    </button>
                  </div>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const LocationMap = () => {
  return (
    <section id="contact" className="h-[80vh] bg-[#000000] relative border-t border-white/5">
      <div className="absolute inset-0 pointer-events-none z-10 bg-[#020202]/60 mix-blend-multiply"></div>
      <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3610.178653926922!2d55.2707828150064!3d25.19719698389658!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f43348a67e24b%3A0xff45e502e1ceb7e2!2sBurj%20Khalifa!5e0!3m2!1sen!2sae!4v1650000000000!5m2!1sen!2sae" width="100%" height="100%" style={{ border: 0, filter: 'grayscale(100%) invert(100%) contrast(110%) brightness(50%)' }} allowFullScreen="" loading="lazy" className="relative z-0" title="Map"></iframe>
      <div className="absolute bottom-16 right-8 md:right-24 bg-[#050200]/95 border border-[#D4AF37]/30 backdrop-blur-3xl p-12 md:p-16 z-20 max-w-md w-full md:w-auto shadow-[0_30px_60px_rgba(212,175,55,0.2)] rounded-[40px]">
        <h3 className="font-serif text-3xl text-white mb-6 font-light italic">The Address</h3>
        <p className="text-white/40 font-light text-[13px] mb-10 tracking-wide text-shadow">{BRAND.address}</p>
        <div className="mt-12 pt-8 border-t border-white/5"><a href="#" className="inline-flex items-center space-x-4 text-[9px] uppercase tracking-[0.4em] text-white/50 hover:text-white group"><span>Get Directions</span><div className="w-12 h-[1px] bg-[#D4AF37]/40 group-hover:bg-[#D4AF37] group-hover:w-20 transition-all duration-700"></div></a></div>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="bg-[#020202] pt-48 pb-20 border-t border-white/5 text-white relative overflow-hidden">
      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-[20%] text-[25vw] font-serif font-black text-[#D4AF37]/[0.01] select-none pointer-events-none uppercase tracking-tighter">
        {BRAND.name}
      </div>

      <div className="container mx-auto px-8 lg:px-20 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-20 items-start mb-40">
          <div className="lg:col-span-5">
            <a href="#" className="inline-flex flex-col mb-12 group">
              <span className="font-serif text-[#D4AF37] text-6xl tracking-[0.25em] uppercase font-light drop-shadow-[0_0_20px_rgba(212,175,55,0.3)] group-hover:text-[#FFF380] transition-all duration-700">{BRAND.name}</span>
              <span className="font-sans text-[11px] tracking-[1em] text-white/30 uppercase mt-6 ml-2">{BRAND.surname}</span>
            </a>
            <p className="text-white/30 font-light text-sm leading-relaxed mb-16 max-w-sm tracking-widest text-justify">
              Redefining prestige in the heart of Dubai. A sanctuary where every culinary moment becomes a timeless legacy.
            </p>
            <div className="flex space-x-10 items-center">
              <a href="#" className="text-white/20 hover:text-[#D4AF37] transition-all duration-700"><Instagram strokeWidth={1} /></a>
              <a href="#" className="text-white/20 hover:text-[#D4AF37] transition-all duration-700"><Facebook strokeWidth={1} /></a>
              <a href="#" className="text-white/20 hover:text-[#D4AF37] transition-all duration-700"><Twitter strokeWidth={1} /></a>
            </div>
          </div>

          <div className="lg:col-span-3 lg:col-start-7">
            <h4 className="text-[#D4AF37]/60 uppercase tracking-[0.6em] text-[10px] mb-12 font-bold tracking-widest">Navigation</h4>
            <ul className="space-y-8 text-white/40 font-light text-[11px] tracking-[0.3em] uppercase">
              <li><a href="#about" className="hover:text-white transition-all duration-500 flex items-center space-x-3 group"><div className="w-0 h-[1px] bg-[#D4AF37] group-hover:w-8 transition-all"></div><span>Philosophy</span></a></li>
              <li><a href="#menu" className="hover:text-white transition-all duration-500 flex items-center space-x-3 group"><div className="w-0 h-[1px] bg-[#D4AF37] group-hover:w-8 transition-all"></div><span>Menu</span></a></li>
              <li><a href="#gallery" className="hover:text-white transition-all duration-500 flex items-center space-x-3 group"><div className="w-0 h-[1px] bg-[#D4AF37] group-hover:w-8 transition-all"></div><span>Gallery</span></a></li>
              <li><a href="#reservation" className="hover:text-white transition-all duration-500 flex items-center space-x-3 group"><div className="w-0 h-[1px] bg-[#D4AF37] group-hover:w-8 transition-all"></div><span>Bookings</span></a></li>
            </ul>
          </div>

          <div className="lg:col-span-3">
            <h4 className="text-[#D4AF37]/60 uppercase tracking-[0.6em] text-[10px] mb-12 font-bold tracking-widest">Newsletter</h4>
            <p className="text-white/30 text-xs mb-10 tracking-widest leading-relaxed">Join our private circle for exclusive royal invitations.</p>
            <form className="relative border-b border-white/10 pb-4 group focus-within:border-[#D4AF37] transition-all">
              <input type="email" placeholder="ENTER EMAIL ADDRESS" className="bg-transparent w-full text-[10px] uppercase tracking-[0.5em] text-white focus:outline-none placeholder-white/10" />
              <button className="absolute right-0 top-0 text-[#D4AF37]/50 hover:text-[#D4AF37] transition-colors"><ArrowRight size={16} /></button>
            </form>
          </div>
        </div>

        <div className="border-t border-white/5 pt-16 flex flex-col md:flex-row justify-between items-center text-[10px] text-white/20 uppercase tracking-[0.6em]">
          <p className="mb-6 md:mb-0 text-shadow">© 2026 {BRAND.name} {BRAND.surname}. PRODUCED IN DUBAI.</p>
          <div className="flex space-x-12">
            <a href="#" className="hover:text-white transition-colors">Privacy</a>
            <a href="#" className="hover:text-white transition-colors">Legal</a>
            <a href="#" className="hover:text-white transition-colors">Admin</a>
          </div>
        </div>
      </div>
      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-full h-[300px] bg-[#D4AF37] opacity-[0.02] blur-[150px] pointer-events-none"></div>
    </footer>
  );
};

const FloatingWhatsApp = () => (
  <motion.a href={`https://wa.me/${BRAND.phone.replace(/[^0-9]/g, '')}`} target="_blank" rel="noopener noreferrer" initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 6, duration: 1.5, ease: customEase }} whileHover={{ scale: 1.1 }} className="fixed bottom-10 left-10 w-16 h-16 bg-[#020202] border border-[#D4AF37]/40 rounded-full flex items-center justify-center z-50 hover:bg-[#D4AF37]/5 transition-all shadow-[0_20px_50px_rgba(0,0,0,1)]">
    <svg className="w-6 h-6 text-[#D4AF37]" viewBox="0 0 24 24" fill="currentColor"><path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793s.448-1.273.607-1.446c.159-.173.346-.217.462-.217l.332.006c.106.005.249-.04.39.298.144.347.491 1.2.534 1.287.043.087.072.188.014.304-.058.116-.087.188-.173.289l-.26.304c-.087.086-.177.18-.076.354.101.174.449.741.964 1.201.662.591 1.221.774 1.394.86s.274.072.376-.043c.101-.116.433-.506.549-.68.116-.173.231-.145.39-.087s1.011.477 1.184.564.289.13.332.202c.045.072.045.419-.099.824zm-3.423-14.416c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm.029 18.88c-1.161 0-2.305-.292-3.318-.844l-3.677.964.984-3.595c-.607-1.052-.927-2.246-.926-3.468.001-5.824 4.74-10.563 10.564-10.563 5.826 0 10.564 4.738 10.564 10.562s-4.738 10.564-10.564 10.564z" /></svg>
  </motion.a>
);

export default function App() {
  const [loading, setLoading] = useState(true);
  return (
    <div className="bg-[#020202] min-h-screen text-[#F7E7CE] selection:bg-[#D4AF37] selection:text-[#000000]">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400;1,500&family=Montserrat:wght@100;200;300;400;500;600;700&display=swap');
        html { scroll-behavior: smooth; }
        body { font-family: 'Montserrat', sans-serif; background-color: #020202; overflow-x: hidden; }
        .font-serif { font-family: 'Cormorant Garamond', serif; }
        .text-shadow { text-shadow: 0 4px 15px rgba(0,0,0,0.8); }
        @media (min-width: 768px) { body, a, button, input, select, textarea { cursor: none !important; } }
      `}</style>
      <AnimatePresence mode="wait">
        {loading ? <Loader setLoading={setLoading} /> : (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 2.5, ease: customEase }} className="relative">
            <div className="fixed inset-4 border border-[#D4AF37]/10 pointer-events-none z-[998] hidden md:block rounded-sm mix-blend-screen pointer-events-none"></div>
            <CinematicGrain />
            <CustomCursor />
            <Navbar />
            <main>
              <Hero />
              <About />
              <Menu />
              <Gallery />
              <Reviews />
              <Reservation />
              <LocationMap />
            </main>
            <Footer />
            <FloatingWhatsApp />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}