import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { 
  Phone, 
  MapPin, 
  Clock, 
  Instagram, 
  Facebook, 
  Twitter, 
  Star, 
  ChevronRight,
  Menu as MenuIcon,
  X,
  MessageCircle,
  CheckCircle
} from 'lucide-react';

// --- CONFIGURATION & DATA ---

const RESTAURANT = {
  name: "Njoom Al Aaelah",
  subtitle: "Kitchen & Restaurant",
  location: "78MP+223 - Al Rasheed Rd, Dubai, UAE",
  phone: "+971 50 787 8576",
  whatsapp: "971507878576",
  email: "reservations@njoomalaaelah.com",
  openHours: "Daily: 12:00 PM - 2:00 AM"
};

// Simulated Headless CMS Data Hook (Sanity/Strapi ready)
const MENU = {
  starters: [
    { name: 'Arabic Mezze Platter', description: 'A selection of traditional dips, salads, and warm pita.', price: 'AED 45', image: 'https://image2url.com/r2/default/images/1774100305816-29efa7b5-6abb-4a41-9070-44a140e6b2b8.jpg' },
    { name: 'Hummus with Bread', description: 'Silky smooth chickpea dip with olive oil and pine nuts.', price: 'AED 30', image: 'https://image2url.com/r2/default/images/1774100340329-62aec995-716c-4e55-a385-8d7f6338948a.jpg' },
    { name: 'Wagyu Beef Carpaccio', description: 'Thinly sliced premium beef with truffle oil and parmesan.', price: 'AED 85', image: 'https://images.unsplash.com/photo-1534939561126-855b8675edd7?auto=format&fit=crop&q=80&w=400' },
    { name: 'Crispy Calamari', description: 'Lightly dusted calamari rings with saffron aioli.', price: 'AED 55', image: 'https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?auto=format&fit=crop&q=80&w=400' },
  ],
  mains: [
    { name: 'Grilled Lamb Chops', description: 'Prime lamb chops marinated in rosemary and garlic, char-grilled.', price: 'AED 120', image: 'https://image2url.com/r2/default/images/1774100382814-5ed1908d-83f7-4055-a2d9-d2279031205d.jpg' },
    { name: 'Seafood Platter', description: 'Lobster tail, jumbo prawns, scallops, and catch of the day.', price: 'AED 150', image: 'https://image2url.com/r2/default/images/1774100418142-8df91140-e098-42a7-b2b1-bd2d239e36db.jpg' },
    { name: 'Truffle Mushroom Risotto', description: 'Arborio rice with wild mushrooms, black truffle, and aged parmesan.', price: 'AED 95', image: 'https://images.unsplash.com/photo-1473093295043-cdd812d0e601?auto=format&fit=crop&q=80&w=400' },
    { name: 'Saffron Glazed Black Cod', description: 'Miso and saffron marinated black cod with asparagus.', price: 'AED 180', image: 'https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?auto=format&fit=crop&q=80&w=400' },
  ],
  desserts: [
    { name: 'Kunafa', description: 'Traditional warm cheese pastry soaked in sweet rose syrup.', price: 'AED 40', image: 'https://images.unsplash.com/photo-1621300977465-3592eb09ba96?auto=format&fit=crop&q=80&w=400' },
    { name: 'Baklava', description: 'Layers of filo pastry with chopped nuts and honey.', price: 'AED 35', image: 'https://images.unsplash.com/photo-1599598425947-33000c28aa9c?auto=format&fit=crop&q=80&w=400' },
    { name: 'Gold Leaf Chocolate Fondant', description: 'Valrhona chocolate fondant topped with 24k edible gold.', price: 'AED 75', image: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&q=80&w=400' },
  ],
  beverages: [
    { name: '24k Gold Cappuccino', description: 'Premium espresso blended with steamed milk, topped with 24k gold flakes.', price: 'AED 60', image: 'https://images.unsplash.com/photo-1534040385115-33dcb3acba5b?auto=format&fit=crop&q=80&w=400' },
    { name: 'Rose Water Lemonade', description: 'Freshly squeezed lemons infused with pure Damask rose water.', price: 'AED 35', image: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&q=80&w=400' },
    { name: 'Mint Tea Pot', description: 'Traditional Moroccan mint tea served in a silver pot.', price: 'AED 45', image: 'https://images.unsplash.com/photo-1564890369478-c89ca6d9cde9?auto=format&fit=crop&q=80&w=400' },
  ]
};

const REVIEWS = [
  { name: "Ahmed Al Maktoum", text: "Absolutely world-class dining experience in Dubai! The lamb chops are unmatched.", rating: 5 },
  { name: "Sarah Jenkins", text: "The ambiance is incredibly luxurious. Perfect for our anniversary dinner. Highly recommend the Seafood Platter.", rating: 5 },
  { name: "Faisal R.", text: "Exceptional service and authentic flavors elevated to fine dining. A true hidden gem on Al Rasheed Rd.", rating: 5 },
];

const GALLERY_IMAGES = [
  "https://image2url.com/r2/default/images/1774100204319-cb069ff7-6f6a-4c4a-ab67-5b09347eb12c.jpg",
  "https://image2url.com/r2/default/images/1774100255213-c1b11a2e-7179-4572-a967-6355d6bc9966.jpg",
  "https://image2url.com/r2/default/images/1774100305816-29efa7b5-6abb-4a41-9070-44a140e6b2b8.jpg",
  "https://image2url.com/r2/default/images/1774100340329-62aec995-716c-4e55-a385-8d7f6338948a.jpg",
  "https://image2url.com/r2/default/images/1774100382814-5ed1908d-83f7-4055-a2d9-d2279031205d.jpg",
  "https://image2url.com/r2/default/images/1774100418142-8df91140-e098-42a7-b2b1-bd2d239e36db.jpg",
  "https://image2url.com/r2/default/images/1774100454596-1cbb0008-4c08-421b-9dc6-fa6012107310.jpg",
  "https://image2url.com/r2/default/images/1774100516322-2ef4d567-380e-4608-83be-6ccca8527eae.jpg",
  "https://image2url.com/r2/default/images/1774100546847-4b5f8ef8-caab-455b-a623-55819f9a6f6c.jpg"
];

// --- UTILITY COMPONENTS ---

const GoldText = ({ children }) => (
  <span className="text-[#d4af37] drop-shadow-[0_0_15px_rgba(212,175,55,0.4)]">{children}</span>
);

const SectionHeading = ({ title, subtitle }) => (
  <div className="text-center mb-16">
    <motion.h3 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="text-[#d4af37] tracking-[0.3em] text-sm md:text-base uppercase mb-4 font-bold drop-shadow-[0_0_10px_rgba(212,175,55,0.5)]"
    >
      {subtitle}
    </motion.h3>
    <motion.h2 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: 0.1 }}
      className="text-4xl md:text-5xl lg:text-7xl font-serif text-[#f3e5b1] drop-shadow-[0_0_20px_rgba(212,175,55,0.2)]"
      style={{ fontFamily: "'Playfair Display', serif" }}
    >
      {title}
    </motion.h2>
    <div className="w-24 h-[2px] bg-[#d4af37] mx-auto mt-8 shadow-[0_0_15px_rgba(212,175,55,0.8)] rounded-full"></div>
  </div>
);

// --- 3D LUXURY BACKGROUND (Three.js) ---
const ThreeBackground = () => {
  const mountRef = useRef(null);

  useEffect(() => {
    let frameId;
    let scene, camera, renderer, particlesMesh;

    const initThree = () => {
      if (!window.THREE || !mountRef.current) return;
      const THREE = window.THREE;

      scene = new THREE.Scene();
      camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
      renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
      
      renderer.setSize(window.innerWidth, window.innerHeight);
      mountRef.current.appendChild(renderer.domElement);

      // Gold particles
      const particlesGeometry = new THREE.BufferGeometry();
      const particlesCount = 300;
      const posArray = new Float32Array(particlesCount * 3);
      
      for(let i = 0; i < particlesCount * 3; i++) {
        posArray[i] = (Math.random() - 0.5) * 15; // Spread
      }
      
      particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
      const material = new THREE.PointsMaterial({
        size: 0.02,
        color: 0xd4af37, // Gold
        transparent: true,
        opacity: 0.4,
        blending: THREE.AdditiveBlending
      });
      
      particlesMesh = new THREE.Points(particlesGeometry, material);
      scene.add(particlesMesh);
      camera.position.z = 4;

      let mouseX = 0;
      let mouseY = 0;

      const animate = () => {
        frameId = requestAnimationFrame(animate);
        particlesMesh.rotation.y += 0.0005;
        particlesMesh.rotation.x += 0.0002;
        // Subtle parallax
        particlesMesh.position.x += (mouseX * 0.001 - particlesMesh.position.x) * 0.05;
        particlesMesh.position.y += (-mouseY * 0.001 - particlesMesh.position.y) * 0.05;
        renderer.render(scene, camera);
      };
      
      animate();

      const handleMouseMove = (event) => {
        mouseX = event.clientX - window.innerWidth / 2;
        mouseY = event.clientY - window.innerHeight / 2;
      };
      
      const handleResize = () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
      };

      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('resize', handleResize);
    };

    // Dynamically inject Three.js script
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js';
    script.onload = initThree;
    document.head.appendChild(script);

    return () => {
      if (frameId) cancelAnimationFrame(frameId);
      if (renderer && mountRef.current) mountRef.current.removeChild(renderer.domElement);
      if (document.head.contains(script)) document.head.removeChild(script);
    };
  }, []);

  return <div ref={mountRef} className="fixed inset-0 z-0 pointer-events-none opacity-40 mix-blend-screen" />;
};

// --- MAIN COMPONENTS ---

const CustomCursor = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const updateMousePosition = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseOver = (e) => {
      if (e.target.tagName.toLowerCase() === 'button' || 
          e.target.tagName.toLowerCase() === 'a' ||
          e.target.closest('button') || 
          e.target.closest('a')) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener('mousemove', updateMousePosition);
    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', updateMousePosition);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, []);

  return (
    <motion.div
      className="fixed top-0 left-0 w-8 h-8 border-2 border-[#d4af37] rounded-full pointer-events-none z-[100] mix-blend-screen hidden md:flex justify-center items-center shadow-[0_0_15px_rgba(212,175,55,0.5)]"
      animate={{
        x: mousePosition.x - 16,
        y: mousePosition.y - 16,
        scale: isHovering ? 1.5 : 1,
        backgroundColor: isHovering ? 'rgba(212, 175, 55, 0.2)' : 'transparent',
      }}
      transition={{ type: 'tween', ease: 'backOut', duration: 0.15 }}
    >
      <motion.div className="w-1.5 h-1.5 bg-[#f3e5b1] rounded-full shadow-[0_0_10px_rgba(243,229,177,1)]" />
    </motion.div>
  );
};

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'Story', href: '#about' },
    { name: 'Menu', href: '#menu' },
    { name: 'Gallery', href: '#gallery' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <>
      <nav 
        className={`fixed w-full z-50 transition-all duration-500 ${
          scrolled ? 'bg-[#000000]/95 backdrop-blur-xl border-b border-[#d4af37]/20 py-4 shadow-[0_4px_30px_rgba(0,0,0,0.8)]' : 'bg-transparent py-6'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <a href="#home" className="text-2xl font-serif text-[#f3e5b1] tracking-widest flex flex-col items-center drop-shadow-[0_0_10px_rgba(212,175,55,0.3)]">
            <span style={{ fontFamily: "'Playfair Display', serif" }}>NJOOM AL AAELAH</span>
            <span className="text-[0.5rem] tracking-[0.4em] text-[#d4af37] uppercase font-bold mt-1">Kitchen & Restaurant</span>
          </a>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <a 
                key={link.name} 
                href={link.href}
                className="text-sm text-[#bca773] hover:text-[#f3e5b1] hover:drop-shadow-[0_0_8px_rgba(243,229,177,0.5)] transition-all tracking-widest uppercase font-semibold"
              >
                {link.name}
              </a>
            ))}
            <a 
              href="#reservation"
              className="px-8 py-3 rounded-[40px] bg-gradient-to-r from-[#d4af37] to-[#aa8323] text-black font-bold hover:shadow-[0_0_30px_rgba(212,175,55,0.6)] transition-all duration-300 tracking-widest text-sm uppercase scale-100 hover:scale-105"
            >
              Book a Table
            </a>
          </div>

          {/* Mobile Menu Toggle */}
          <button 
            className="md:hidden text-[#d4af37]"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={28} /> : <MenuIcon size={28} />}
          </button>
        </div>
      </nav>

      {/* Mobile Nav */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 bg-[#050402] pt-24 px-6 flex flex-col items-center border-b border-[#d4af37]/20"
          >
            {navLinks.map((link) => (
              <a 
                key={link.name} 
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-2xl text-[#bca773] hover:text-[#f3e5b1] transition-colors my-4 font-serif"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                {link.name}
              </a>
            ))}
            <a 
              href="#reservation"
              onClick={() => setMobileMenuOpen(false)}
              className="mt-8 px-8 py-4 rounded-[40px] bg-gradient-to-r from-[#d4af37] to-[#aa8323] text-black font-bold shadow-[0_0_20px_rgba(212,175,55,0.4)] tracking-widest uppercase w-full max-w-xs text-center"
            >
              Book a Table
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

const Hero = () => {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 1000], [0, 400]);
  const opacity = useTransform(scrollY, [0, 500], [1, 0]);

  return (
    <section id="home" className="relative h-screen w-full overflow-hidden flex items-center justify-center bg-[#000]">
      <motion.div 
        style={{ y, opacity }}
        className="absolute inset-0 w-full h-full"
      >
        <div className="absolute inset-0 bg-black/60 z-10" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-[#050402]/50 to-[#000000] z-10" />
        <img 
          src="https://image2url.com/r2/default/images/1774100204319-cb069ff7-6f6a-4c4a-ab67-5b09347eb12c.jpg" 
          alt="Luxury Dining"
          className="w-full h-full object-cover"
        />
      </motion.div>

      <div className="relative z-20 text-center px-4 max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
        >
          <p className="text-[#d4af37] tracking-[0.4em] uppercase text-sm md:text-base mb-6 font-bold drop-shadow-[0_0_10px_rgba(212,175,55,0.5)]">
            Premium Fine Dining Experience
          </p>
          <h1 
            className="text-5xl md:text-7xl lg:text-8xl text-[#f3e5b1] font-serif leading-tight mb-8 drop-shadow-[0_0_30px_rgba(212,175,55,0.3)]"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Experience Royal Dining <br className="hidden md:block" /> in Dubai
          </h1>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mt-12">
            <a 
              href="#reservation"
              className="group relative px-10 py-5 bg-gradient-to-r from-[#d4af37] to-[#aa8323] text-black font-bold tracking-widest uppercase overflow-hidden rounded-[40px] shadow-[0_0_30px_rgba(212,175,55,0.4)] hover:shadow-[0_0_50px_rgba(212,175,55,0.7)] transition-all duration-500 scale-100 hover:scale-105"
            >
              <div className="absolute inset-0 w-0 bg-white transition-all duration-[400ms] ease-out group-hover:w-full opacity-20"></div>
              <span className="relative">Book a Table</span>
            </a>
            <a 
              href="#menu"
              className="px-10 py-5 border-2 border-[#d4af37]/50 text-[#d4af37] hover:bg-[#d4af37] hover:text-black rounded-[40px] hover:shadow-[0_0_30px_rgba(212,175,55,0.4)] transition-all duration-500 tracking-widest uppercase font-bold backdrop-blur-sm"
            >
              Explore Menu
            </a>
          </div>
        </motion.div>
      </div>

      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center"
      >
        <span className="text-[#bca773] text-xs tracking-[0.2em] uppercase mb-4 font-semibold">Scroll to explore</span>
        <div className="w-[2px] h-16 bg-[#d4af37]/20 relative overflow-hidden rounded-full">
          <motion.div 
            animate={{ y: [0, 64] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
            className="absolute top-0 left-0 w-full h-1/2 bg-[#d4af37] shadow-[0_0_10px_rgba(212,175,55,1)]"
          />
        </div>
      </motion.div>
    </section>
  );
};

const About = () => {
  return (
    <section id="about" className="py-24 lg:py-40 bg-[#000000] relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#d4af37]/5 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-[#d4af37]/5 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1 }}
            className="relative"
          >
            <div className="relative z-10">
              <img 
                src="https://image2url.com/r2/default/images/1774100255213-c1b11a2e-7179-4572-a967-6355d6bc9966.jpg" 
                alt="Chef preparing food" 
                className="w-full h-[600px] object-cover rounded-[40px] grayscale-[20%] hover:grayscale-0 transition-all duration-700 shadow-[0_0_40px_rgba(212,175,55,0.1)] border border-[#d4af37]/20"
              />
              <div className="absolute inset-0 border-2 border-[#d4af37]/40 translate-x-6 translate-y-6 -z-10 rounded-[40px]"></div>
            </div>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="absolute -bottom-10 -right-4 lg:-right-10 bg-[#0a0805] p-8 border border-[#d4af37]/30 shadow-[0_0_50px_rgba(212,175,55,0.15)] rounded-[40px] backdrop-blur-xl hidden md:block"
            >
              <p className="text-5xl font-serif text-[#d4af37] mb-2 drop-shadow-[0_0_10px_rgba(212,175,55,0.3)]" style={{ fontFamily: "'Playfair Display', serif" }}>15+</p>
              <p className="text-[#9e8a52] text-sm tracking-widest uppercase font-semibold">Years of Culinary<br/>Excellence</p>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1 }}
          >
            <h3 className="text-[#d4af37] tracking-[0.3em] text-sm md:text-base uppercase mb-4 font-bold drop-shadow-[0_0_10px_rgba(212,175,55,0.4)]">Our Story</h3>
            <h2 
              className="text-4xl md:text-5xl lg:text-6xl font-serif text-[#f3e5b1] mb-8 leading-tight drop-shadow-[0_0_20px_rgba(212,175,55,0.1)]"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              A Symphony of <GoldText>Flavors</GoldText> in the Heart of Dubai.
            </h2>
            <div className="space-y-6 text-[#bca773] font-light leading-relaxed text-lg">
              <p>
                Founded on the vibrant Al Rasheed Road, Njoom Al Aaelah represents the pinnacle of luxury dining. We blend traditional Middle Eastern heritage with contemporary culinary techniques to create an unforgettable gastronomic journey.
              </p>
              <p>
                Every dish is meticulously crafted by our master chefs using only the finest, globally sourced ingredients. From our delicately spiced Arabic Mezze to our signature Gold Leaf desserts, we promise an experience that transcends the ordinary.
              </p>
            </div>
            <div className="mt-12">
              {/* Using a bright gold CSS filter to tint the signature image to match the theme */}
              <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/Signature_of_John_Hancock.svg/1200px-Signature_of_John_Hancock.svg.png" alt="Chef Signature" className="h-16 mb-4 filter drop-shadow-[0_0_8px_rgba(212,175,55,0.5)]" style={{ filter: 'invert(75%) sepia(42%) saturate(544%) hue-rotate(352deg) brightness(95%) contrast(88%)' }} />
              <p className="text-[#d4af37] font-serif italic text-xl">Executive Chef</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const Menu = () => {
  const [activeTab, setActiveTab] = useState('starters');

  return (
    <section id="menu" className="py-24 lg:py-40 bg-[#050402] relative z-10">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <SectionHeading title="Culinary Masterpieces" subtitle="The Menu" />

        {/* Menu Tabs */}
        <div className="flex justify-center flex-wrap gap-4 md:gap-6 mb-16">
          {Object.keys(MENU).map((category) => (
            <button
              key={category}
              onClick={() => setActiveTab(category)}
              className={`text-sm md:text-base tracking-[0.2em] uppercase px-8 py-3 rounded-[40px] transition-all duration-300 font-bold border ${
                activeTab === category 
                ? 'bg-gradient-to-r from-[#d4af37] to-[#aa8323] text-black border-transparent shadow-[0_0_20px_rgba(212,175,55,0.4)]' 
                : 'bg-[#0a0805] text-[#9e8a52] border-[#d4af37]/30 hover:border-[#d4af37] hover:text-[#d4af37] hover:shadow-[0_0_15px_rgba(212,175,55,0.2)]'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Menu Items */}
        <motion.div 
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
        >
          {MENU[activeTab].map((item, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group cursor-pointer flex flex-col sm:flex-row gap-6 items-center sm:items-start bg-gradient-to-br from-[#0a0805] to-[#000000] p-6 border border-[#d4af37]/20 hover:border-[#d4af37]/60 hover:shadow-[0_0_40px_rgba(212,175,55,0.15)] transition-all duration-500 rounded-[40px]"
            >
              <div className="w-full sm:w-36 h-56 sm:h-36 overflow-hidden rounded-[30px] flex-shrink-0 relative border border-[#d4af37]/20">
                <div className="absolute inset-0 bg-black/40 group-hover:bg-transparent transition-colors duration-500 z-10" />
                <img src={item.image} alt={item.name} className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700" />
              </div>
              <div className="flex-grow w-full py-2">
                <div className="flex justify-between items-baseline mb-3">
                  <h4 
                    className="text-xl md:text-2xl text-[#f3e5b1] font-serif group-hover:text-[#d4af37] transition-colors drop-shadow-[0_0_8px_rgba(212,175,55,0.1)]"
                    style={{ fontFamily: "'Playfair Display', serif" }}
                  >
                    {item.name}
                  </h4>
                  <div className="flex-grow mx-4 border-b border-[#d4af37]/30 border-dotted relative top-[-6px] hidden sm:block"></div>
                  <span className="text-[#d4af37] font-bold tracking-wider whitespace-nowrap ml-auto sm:ml-0 text-lg drop-shadow-[0_0_10px_rgba(212,175,55,0.3)]">{item.price}</span>
                </div>
                <p className="text-[#9e8a52] text-sm font-light leading-relaxed group-hover:text-[#c4b17c] transition-colors">
                  {item.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <div className="mt-20 text-center">
          <a href="#" className="inline-flex items-center gap-2 text-[#d4af37] hover:text-[#f3e5b1] hover:drop-shadow-[0_0_10px_rgba(212,175,55,0.5)] transition-all tracking-widest uppercase text-sm font-bold">
            Download Full Menu <ChevronRight size={18} />
          </a>
        </div>
      </div>
    </section>
  );
};

const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState(null);

  return (
    <section id="gallery" className="py-24 bg-[#000000] relative z-10">
      <SectionHeading title="The Ambiance" subtitle="Gallery" />
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-6 max-w-7xl mx-auto">
        {GALLERY_IMAGES.map((src, index) => (
          <motion.div 
            key={index}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1, duration: 0.8 }}
            className="relative h-[400px] overflow-hidden group cursor-pointer rounded-[40px] border border-[#d4af37]/20 hover:border-[#d4af37]/60 hover:shadow-[0_0_40px_rgba(212,175,55,0.2)] transition-all duration-500"
            onClick={() => setSelectedImage(src)}
          >
            <div className="absolute inset-0 bg-black/40 group-hover:bg-transparent transition-all duration-500 z-10" />
            <img 
              src={src} 
              alt="Restaurant Gallery" 
              className="w-full h-full object-cover transform scale-100 group-hover:scale-110 transition-transform duration-1000 ease-out"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#000000]/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-20 flex items-end p-8">
              <div className="translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                <p className="text-[#d4af37] text-sm tracking-widest uppercase mb-2 font-bold drop-shadow-[0_0_5px_rgba(212,175,55,0.5)]">Dubai</p>
                <p className="text-[#f3e5b1] font-serif text-2xl drop-shadow-[0_0_10px_rgba(212,175,55,0.3)]" style={{ fontFamily: "'Playfair Display', serif" }}>Luxury Dining</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-[#000]/95 backdrop-blur-md flex items-center justify-center p-4"
            onClick={() => setSelectedImage(null)}
          >
            <button 
              className="absolute top-8 right-8 text-[#d4af37] hover:text-[#f3e5b1] hover:drop-shadow-[0_0_15px_rgba(212,175,55,0.8)] transition-all z-[110]"
              onClick={() => setSelectedImage(null)}
            >
              <X size={40} />
            </button>
            <motion.img 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", stiffness: 200, damping: 20 }}
              src={selectedImage} 
              alt="Enlarged Gallery Image" 
              className="max-w-full max-h-[90vh] object-contain rounded-[40px] border border-[#d4af37]/30 shadow-[0_0_60px_rgba(212,175,55,0.2)]"
              onClick={(e) => e.stopPropagation()} 
            />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

const Testimonials = () => {
  return (
    <section className="py-24 lg:py-40 bg-[#050402] relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full max-w-4xl opacity-5 pointer-events-none flex justify-center items-center text-[#d4af37]">
        <Star size={400} />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <SectionHeading title="Guest Experiences" subtitle="Reviews" />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {REVIEWS.map((review, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              className="bg-[#000000] border border-[#d4af37]/30 p-10 md:p-12 hover:border-[#d4af37] hover:shadow-[0_0_50px_rgba(212,175,55,0.15)] transition-all duration-500 group rounded-[40px]"
            >
              <div className="flex gap-2 mb-8">
                {[...Array(review.rating)].map((_, i) => (
                  <Star key={i} size={20} className="fill-[#d4af37] text-[#d4af37] drop-shadow-[0_0_5px_rgba(212,175,55,0.5)]" />
                ))}
              </div>
              <p className="text-[#bca773] font-light leading-relaxed mb-10 text-lg italic group-hover:text-[#f3e5b1] transition-colors">
                "{review.text}"
              </p>
              <div className="flex items-center gap-6">
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#d4af37] to-[#aa8323] flex items-center justify-center text-black font-serif text-xl shadow-[0_0_15px_rgba(212,175,55,0.5)] border-2 border-[#000]">
                  {review.name.charAt(0)}
                </div>
                <div>
                  <h4 className="text-[#f3e5b1] font-serif tracking-wide text-lg drop-shadow-[0_0_5px_rgba(212,175,55,0.2)]">{review.name}</h4>
                  <p className="text-[#9e8a52] text-xs uppercase tracking-widest font-bold mt-1">VIP Guest</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Reservation = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    guests: '',
    date: '',
    time: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Format the message for WhatsApp
    const message = `*New Reservation Request*\n\n*Name:* ${formData.name}\n*Phone:* ${formData.phone}\n*Guests:* ${formData.guests}\n*Date:* ${formData.date}\n*Time:* ${formData.time}`;
    const encodedMessage = encodeURIComponent(message);
    
    // Open WhatsApp in a new tab with the pre-filled message
    window.open(`https://wa.me/${RESTAURANT.whatsapp}?text=${encodedMessage}`, '_blank');
    
    setIsSubmitted(true);
    setFormData({ name: '', phone: '', guests: '', date: '', time: '' }); // Reset form
  };

  return (
    <section id="reservation" className="py-24 lg:py-40 relative bg-[#000000] overflow-hidden">
      {/* Background Image Parallax */}
      <div className="absolute inset-0 opacity-10 bg-[url('https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&q=80&w=2000')] bg-cover bg-fixed bg-center mix-blend-luminosity"></div>
      <div className="absolute inset-0 bg-gradient-to-t from-[#000000] via-[#050402]/90 to-[#000000]"></div>

      <div className="max-w-5xl mx-auto px-6 relative z-10">
        <div className="bg-[#050402]/95 backdrop-blur-2xl border border-[#d4af37]/40 p-10 md:p-20 shadow-[0_0_80px_rgba(212,175,55,0.1)] rounded-[40px] min-h-[500px] flex flex-col justify-center">
          
          {isSubmitted ? (
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="text-center py-10"
            >
              <div className="w-24 h-24 bg-gradient-to-br from-[#d4af37] to-[#aa8323] rounded-full flex items-center justify-center mx-auto mb-8 shadow-[0_0_40px_rgba(212,175,55,0.5)] border-4 border-[#000]">
                <CheckCircle size={48} className="text-black" />
              </div>
              <h3 className="text-4xl md:text-5xl font-serif text-[#f3e5b1] mb-6 drop-shadow-[0_0_15px_rgba(212,175,55,0.3)]" style={{ fontFamily: "'Playfair Display', serif" }}>
                Reservation Request Sent
              </h3>
              <p className="text-[#bca773] text-lg max-w-2xl mx-auto leading-relaxed">
                Thank you for choosing Njoom Al Aaelah. Your reservation details have been sent via WhatsApp. Our concierge team will confirm your table shortly.
              </p>
              <button 
                onClick={() => setIsSubmitted(false)}
                className="mt-10 px-8 py-3 border border-[#d4af37]/50 text-[#d4af37] rounded-full hover:bg-[#d4af37] hover:text-black transition-all font-bold tracking-widest uppercase text-sm"
              >
                Make Another Booking
              </button>
            </motion.div>
          ) : (
            <>
              <SectionHeading title="Reserve Your Table" subtitle="Bookings" />
              
              <form className="space-y-8" onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="relative group">
                    <input type="text" id="name" value={formData.name} onChange={handleChange} required className="w-full bg-[#0a0805] border border-[#d4af37]/30 rounded-[40px] px-8 py-5 text-[#f3e5b1] font-semibold focus:outline-none focus:border-[#d4af37] focus:shadow-[0_0_20px_rgba(212,175,55,0.2)] transition-all peer" placeholder=" " />
                    <label htmlFor="name" className="absolute left-8 top-5 text-[#9e8a52] text-sm tracking-widest uppercase transition-all peer-focus:-top-3 peer-focus:left-6 peer-focus:text-[#d4af37] peer-focus:text-xs peer-focus:bg-[#050402] peer-focus:px-3 peer-valid:-top-3 peer-valid:left-6 peer-valid:text-xs peer-valid:bg-[#050402] peer-valid:px-3 rounded-full font-bold">Full Name</label>
                  </div>
                  <div className="relative group">
                    <input type="tel" id="phone" value={formData.phone} onChange={handleChange} required className="w-full bg-[#0a0805] border border-[#d4af37]/30 rounded-[40px] px-8 py-5 text-[#f3e5b1] font-semibold focus:outline-none focus:border-[#d4af37] focus:shadow-[0_0_20px_rgba(212,175,55,0.2)] transition-all peer" placeholder=" " />
                    <label htmlFor="phone" className="absolute left-8 top-5 text-[#9e8a52] text-sm tracking-widest uppercase transition-all peer-focus:-top-3 peer-focus:left-6 peer-focus:text-[#d4af37] peer-focus:text-xs peer-focus:bg-[#050402] peer-focus:px-3 peer-valid:-top-3 peer-valid:left-6 peer-valid:text-xs peer-valid:bg-[#050402] peer-valid:px-3 rounded-full font-bold">Phone Number</label>
                  </div>
                  <div className="relative group">
                    <select id="guests" value={formData.guests} onChange={handleChange} required className="w-full bg-[#0a0805] border border-[#d4af37]/30 rounded-[40px] px-8 py-5 text-[#f3e5b1] font-semibold focus:outline-none focus:border-[#d4af37] focus:shadow-[0_0_20px_rgba(212,175,55,0.2)] transition-all appearance-none peer">
                      <option value="" disabled hidden></option>
                      <option value="1" className="bg-[#050402]">1 Guest</option>
                      <option value="2" className="bg-[#050402]">2 Guests</option>
                      <option value="3" className="bg-[#050402]">3 Guests</option>
                      <option value="4" className="bg-[#050402]">4 Guests</option>
                      <option value="5+" className="bg-[#050402]">5+ Guests</option>
                    </select>
                    <label htmlFor="guests" className="absolute left-8 top-5 text-[#9e8a52] text-sm tracking-widest uppercase transition-all peer-focus:-top-3 peer-focus:left-6 peer-focus:text-[#d4af37] peer-focus:text-xs peer-focus:bg-[#050402] peer-focus:px-3 peer-valid:-top-3 peer-valid:left-6 peer-valid:text-xs peer-valid:bg-[#050402] peer-valid:px-3 rounded-full font-bold">Number of Guests</label>
                  </div>
                  <div className="relative group flex gap-4">
                    <div className="w-1/2 relative">
                      <input type="date" id="date" value={formData.date} onChange={handleChange} required className="w-full bg-[#0a0805] border border-[#d4af37]/30 rounded-[40px] px-6 py-5 text-[#f3e5b1] font-semibold focus:outline-none focus:border-[#d4af37] focus:shadow-[0_0_20px_rgba(212,175,55,0.2)] transition-all peer [color-scheme:dark]" placeholder=" " />
                      <label htmlFor="date" className="absolute left-6 -top-3 bg-[#050402] px-3 text-[#d4af37] text-xs tracking-widest uppercase rounded-full font-bold">Date</label>
                    </div>
                    <div className="w-1/2 relative">
                      <input type="time" id="time" value={formData.time} onChange={handleChange} required className="w-full bg-[#0a0805] border border-[#d4af37]/30 rounded-[40px] px-6 py-5 text-[#f3e5b1] font-semibold focus:outline-none focus:border-[#d4af37] focus:shadow-[0_0_20px_rgba(212,175,55,0.2)] transition-all peer [color-scheme:dark]" placeholder=" " />
                      <label htmlFor="time" className="absolute left-6 -top-3 bg-[#050402] px-3 text-[#d4af37] text-xs tracking-widest uppercase rounded-full font-bold">Time</label>
                    </div>
                  </div>
                </div>
                
                <div className="pt-10 flex flex-col items-center gap-6">
                  <button type="submit" className="w-full md:w-auto px-16 py-5 rounded-[40px] bg-gradient-to-r from-[#d4af37] via-[#f3e5b1] to-[#aa8323] bg-[length:200%_auto] hover:bg-right text-black font-bold tracking-widest uppercase shadow-[0_0_30px_rgba(212,175,55,0.4)] hover:shadow-[0_0_60px_rgba(212,175,55,0.8)] hover:scale-105 transition-all duration-500">
                    Confirm Reservation
                  </button>
                </div>
              </form>
            </>
          )}
        </div>
      </div>
    </section>
  );
};

const ContactMap = () => {
  return (
    <section id="contact" className="bg-[#000000] py-24">
      <div className="flex flex-col lg:flex-row h-auto lg:h-[650px] max-w-7xl mx-auto px-6 gap-8">
        
        {/* Contact Info */}
        <div className="w-full lg:w-1/3 p-12 lg:p-16 flex flex-col justify-center bg-gradient-to-br from-[#0a0805] to-[#000] border border-[#d4af37]/30 rounded-[40px] shadow-[0_0_40px_rgba(212,175,55,0.1)] relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#d4af37]/5 rounded-full blur-[80px]"></div>
          
          <h3 className="text-4xl font-serif text-[#f3e5b1] mb-12 drop-shadow-[0_0_15px_rgba(212,175,55,0.2)]" style={{ fontFamily: "'Playfair Display', serif" }}>
            Contact <GoldText>Us</GoldText>
          </h3>
          
          <div className="space-y-10 relative z-10">
            <div className="flex items-start gap-5 group">
              <MapPin className="text-[#d4af37] mt-1 group-hover:scale-110 group-hover:drop-shadow-[0_0_10px_rgba(212,175,55,0.8)] transition-all" size={28} />
              <div>
                <h4 className="text-[#d4af37] tracking-widest uppercase text-sm mb-2 font-bold">Location</h4>
                <p className="text-[#bca773] font-light text-lg">{RESTAURANT.location}</p>
              </div>
            </div>
            
            <div className="flex items-start gap-5 group">
              <Phone className="text-[#d4af37] mt-1 group-hover:scale-110 group-hover:drop-shadow-[0_0_10px_rgba(212,175,55,0.8)] transition-all" size={28} />
              <div>
                <h4 className="text-[#d4af37] tracking-widest uppercase text-sm mb-2 font-bold">Reservations</h4>
                <a href={`tel:${RESTAURANT.phone}`} className="text-[#bca773] font-light text-lg hover:text-[#f3e5b1] hover:drop-shadow-[0_0_8px_rgba(243,229,177,0.5)] transition-all block">
                  {RESTAURANT.phone}
                </a>
              </div>
            </div>
            
            <div className="flex items-start gap-5 group">
              <Clock className="text-[#d4af37] mt-1 group-hover:scale-110 group-hover:drop-shadow-[0_0_10px_rgba(212,175,55,0.8)] transition-all" size={28} />
              <div>
                <h4 className="text-[#d4af37] tracking-widest uppercase text-sm mb-2 font-bold">Hours</h4>
                <p className="text-[#bca773] font-light text-lg">{RESTAURANT.openHours}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Map Embed */}
        <div className="w-full lg:w-2/3 h-[400px] lg:h-full relative grayscale-[40%] hover:grayscale-0 transition-all duration-1000 rounded-[40px] overflow-hidden border border-[#d4af37]/30 shadow-[0_0_40px_rgba(212,175,55,0.1)] z-10">
          <iframe 
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14431.603300589133!2d55.30908155!3d25.273934399999998!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f5ccaeb199677%3A0x8e82a87b7a6962f9!2sAl%20Rasheed%20Rd%20-%20Dubai%20-%20United%20Arab%20Emirates!5e0!3m2!1sen!2sus!4v1711200000000!5m2!1sen!2sus" 
            style={{ border: 0, width: '100%', height: '100%', position: 'absolute', top: 0, left: 0 }} 
            allowFullScreen="" 
            loading="lazy" 
            referrerPolicy="no-referrer-when-downgrade"
            title="Restaurant Location"
          ></iframe>
        </div>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="bg-[#050402] pt-28 pb-12 border-t border-[#d4af37]/20 text-center relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-5xl h-[1px] bg-gradient-to-r from-transparent via-[#d4af37] to-transparent opacity-60"></div>
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[#d4af37]/5 rounded-full blur-[150px] pointer-events-none"></div>
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* VIP Club Newsletter Section */}
        <div className="mb-24 max-w-3xl mx-auto bg-gradient-to-b from-[#0a0805] to-[#000000] p-10 md:p-14 rounded-[40px] border border-[#d4af37]/30 shadow-[0_0_50px_rgba(212,175,55,0.1)] relative overflow-hidden">
          <div className="absolute -top-24 -right-24 w-48 h-48 bg-[#d4af37]/10 rounded-full blur-[50px] pointer-events-none"></div>
          <h4 className="text-[#f3e5b1] font-serif text-3xl md:text-4xl mb-4 drop-shadow-[0_0_15px_rgba(212,175,55,0.3)]" style={{ fontFamily: "'Playfair Display', serif" }}>
            Join the <GoldText>VIP Club</GoldText>
          </h4>
          <p className="text-[#bca773] text-sm md:text-base mb-10 max-w-xl mx-auto">
            Subscribe to receive exclusive invitations to private tasting events, chef's specials, and priority reservations.
          </p>
          <form className="flex flex-col sm:flex-row gap-4 justify-center" onSubmit={(e) => e.preventDefault()}>
            <input 
              type="email" 
              placeholder="Enter your email address" 
              required
              className="bg-[#050402] border border-[#d4af37]/40 rounded-full px-8 py-4 text-[#f3e5b1] focus:outline-none focus:border-[#d4af37] focus:shadow-[0_0_20px_rgba(212,175,55,0.2)] transition-all w-full sm:w-2/3 font-semibold" 
            />
            <button className="bg-gradient-to-r from-[#d4af37] to-[#aa8323] text-black font-bold uppercase tracking-widest px-8 py-4 rounded-full shadow-[0_0_20px_rgba(212,175,55,0.3)] hover:shadow-[0_0_30px_rgba(212,175,55,0.6)] hover:scale-105 transition-all duration-300">
              Subscribe
            </button>
          </form>
        </div>

        <a href="#home" className="inline-block text-3xl font-serif text-[#f3e5b1] tracking-widest flex-col items-center mb-10 drop-shadow-[0_0_15px_rgba(212,175,55,0.3)]">
          <span style={{ fontFamily: "'Playfair Display', serif" }}>NJOOM AL AAELAH</span>
        </a>
        
        <div className="flex justify-center gap-6 mb-16">
          <a href="#" className="w-14 h-14 rounded-full border border-[#d4af37]/30 flex items-center justify-center text-[#bca773] hover:text-black hover:bg-[#d4af37] hover:border-[#d4af37] hover:shadow-[0_0_20px_rgba(212,175,55,0.6)] transition-all duration-300">
            <Instagram size={24} />
          </a>
          <a href="#" className="w-14 h-14 rounded-full border border-[#d4af37]/30 flex items-center justify-center text-[#bca773] hover:text-black hover:bg-[#d4af37] hover:border-[#d4af37] hover:shadow-[0_0_20px_rgba(212,175,55,0.6)] transition-all duration-300">
            <Facebook size={24} />
          </a>
          <a href="#" className="w-14 h-14 rounded-full border border-[#d4af37]/30 flex items-center justify-center text-[#bca773] hover:text-black hover:bg-[#d4af37] hover:border-[#d4af37] hover:shadow-[0_0_20px_rgba(212,175,55,0.6)] transition-all duration-300">
            <Twitter size={24} />
          </a>
        </div>

        <div className="text-[#9e8a52] text-sm tracking-widest uppercase flex flex-col md:flex-row justify-center items-center gap-6 md:gap-16 font-bold border-t border-[#d4af37]/20 pt-10">
          <p>&copy; {new Date().getFullYear()} Njoom Al Aaelah. All rights reserved.</p>
          <div className="flex justify-center gap-6 md:gap-16">
            <a href="#" className="hover:text-[#f3e5b1] hover:drop-shadow-[0_0_8px_rgba(243,229,177,0.8)] transition-all">Privacy Policy</a>
            <a href="#" className="hover:text-[#f3e5b1] hover:drop-shadow-[0_0_8px_rgba(243,229,177,0.8)] transition-all">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

// Floating WhatsApp Button
const FloatingWhatsApp = () => (
  <motion.a
    initial={{ scale: 0 }}
    animate={{ scale: 1 }}
    transition={{ delay: 2, type: 'spring' }}
    href={`https://wa.me/${RESTAURANT.whatsapp}`}
    target="_blank"
    rel="noreferrer"
    className="fixed bottom-8 right-8 z-50 bg-gradient-to-r from-[#25D366] to-[#1ebd5a] text-white p-5 rounded-full shadow-[0_0_30px_rgba(37,211,102,0.4)] hover:shadow-[0_0_50px_rgba(37,211,102,0.7)] transition-all duration-300 flex items-center justify-center group border border-white/20 hover:scale-110"
  >
    <MessageCircle size={32} />
    <span className="absolute right-full mr-6 bg-[#000] border border-[#d4af37]/30 text-[#f3e5b1] px-5 py-3 rounded-[40px] text-sm font-bold whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none shadow-[0_0_20px_rgba(212,175,55,0.2)]">
      Chat with us
    </span>
  </motion.a>
);

// --- MAIN APP COMPONENT ---

export default function App() {
  // Inject Premium Fonts
  useEffect(() => {
    const link = document.createElement('link');
    link.href = 'https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400&family=Inter:wght@300;400;600;700&display=swap';
    link.rel = 'stylesheet';
    document.head.appendChild(link);
    
    // Smooth scrolling CSS fallback
    document.documentElement.style.scrollBehavior = 'smooth';
    
    return () => {
      document.head.removeChild(link);
      document.documentElement.style.scrollBehavior = 'auto';
    };
  }, []);

  return (
    <div className="bg-[#000000] min-h-screen text-[#f3e5b1] font-sans selection:bg-[#d4af37] selection:text-black">
      <ThreeBackground />
      <CustomCursor />
      <Navbar />
      <main className="relative z-10">
        <Hero />
        <About />
        <Menu />
        <Gallery />
        <Testimonials />
        <Reservation />
        <ContactMap />
      </main>
      <Footer />
      <FloatingWhatsApp />
    </div>
  );
}