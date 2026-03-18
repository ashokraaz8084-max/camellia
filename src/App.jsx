import React, { useState, useEffect, useRef } from 'react';
import { 
  Menu, X, MapPin, Phone, Clock, Star, 
  Instagram, Facebook, MessageCircle, ChevronRight, 
  Flame, Utensils
} from 'lucide-react';

// --- CUSTOM HOOKS ---

// Hook for scroll animations mimicking Framer Motion
const useScrollReveal = () => {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('opacity-100', 'translate-y-0');
            entry.target.classList.remove('opacity-0', 'translate-y-10');
          }
        });
      },
      { threshold: 0.1 }
    );

    const elements = document.querySelectorAll('.reveal-on-scroll');
    elements.forEach((el) => observer.observe(el));

    return () => elements.forEach((el) => observer.unobserve(el));
  }, []);
};

// --- DATA ---

const MENU_CATEGORIES = ['Dim Sum', 'Noodles & Rice', 'Seafood Specials', 'Chef Recommendations'];

const MENU_ITEMS = {
  'Dim Sum': [
    { name: 'Crystal Har Gow', desc: 'Translucent steamed dumplings filled with fresh tiger prawns and bamboo shoots', price: 'AED 65', image: 'https://image2url.com/r2/default/images/1773855572515-8311f664-9920-463f-80b2-7410919432d0.jpg' },
    { name: 'Truffle Chicken Siu Mai', desc: 'Classic chicken and mushroom dumplings infused with black truffle oil', price: 'AED 75', image: 'https://image2url.com/r2/default/images/1773855611849-0dd9ee94-a03e-4919-b2d9-f9e9d0b9eeb1.jpg' },
    { name: 'Crispy Duck Spring Rolls', desc: 'Shredded roasted peking duck, hoisin sauce, wrapped in a golden crispy pastry', price: 'AED 55', image: 'https://image2url.com/r2/default/images/1773855646363-1b3921bd-151e-4bda-a338-803ae44b926c.jpg' }
  ],
  'Noodles & Rice': [
    { name: 'Wagyu Beef Chow Fun', desc: 'Wok-tossed flat rice noodles, premium sliced wagyu, bean sprouts, dark soy', price: 'AED 125', image: 'https://image2url.com/r2/default/images/1773855721582-25a57dca-2657-4948-9c6e-ddf9f1241aad.jpg' },
    { name: 'Singapore Style Vermicelli', desc: 'Stir-fried thin rice noodles with prawns, chicken, and a subtle curry flavor', price: 'AED 85', image: 'https://image2url.com/r2/default/images/1773855765776-56e36d5e-3b5e-4c5c-a682-6c960033362b.jpg' },
    { name: 'Yangzhou Fried Rice', desc: 'Classic wok-fried rice with shrimp, roasted chicken, egg, and scallions', price: 'AED 70', image: 'https://image2url.com/r2/default/images/1773855814066-7d308432-cd99-43e2-aea8-43bf80410213.jpg' }
  ],
  'Seafood Specials': [
    { name: 'Sichuan Chili Prawns', desc: 'Jumbo prawns wok-fried in a fiery Sichuan peppercorn and dried chili sauce', price: 'AED 160', image: 'https://image2url.com/r2/default/images/1773855844207-94da55ee-3ef4-4bfa-a806-d6ca09afce72.jpg' },
    { name: 'Steamed Sea Bass', desc: 'Fresh sea bass fillet steamed with premium light soy sauce, ginger, and scallions', price: 'AED 195', image: 'https://image2url.com/r2/default/images/1773855879123-3c090c06-ff80-4ba5-8fb4-1d494e2686c3.jpg' },
    { name: 'Black Pepper Lobster', desc: 'Whole Canadian lobster wok-tossed in our signature Sarawak black pepper sauce', price: 'AED 290', image: 'https://image2url.com/r2/default/images/1773855914103-338ffd19-feea-4251-a3c6-2740918527a4.jpg' }
  ],
  'Chef Recommendations': [
    { name: 'Signature Peking Duck', desc: 'Crispy skin roasted duck, carved at the table, served with pancakes and caviar', price: 'AED 320', image: 'https://image2url.com/r2/default/images/1773855646363-1b3921bd-151e-4bda-a338-803ae44b926c.jpg' },
    { name: 'Kung Pao Chicken', desc: 'Traditional wok-seared chicken breast, roasted peanuts, dry chilies, sweet & sour glaze', price: 'AED 95', image: 'https://image2url.com/r2/default/images/1773855814066-7d308432-cd99-43e2-aea8-43bf80410213.jpg' },
    { name: 'Mapo Tofu (V)', desc: 'Silken tofu simmered in a rich, spicy, and numbing doubanjiang sauce', price: 'AED 80', image: 'https://image2url.com/r2/default/images/1773855611849-0dd9ee94-a03e-4919-b2d9-f9e9d0b9eeb1.jpg' }
  ]
};

const REVIEWS = [
  { name: "Michael Chen", text: "An absolute masterpiece of Chinese culinary art. The Peking Duck is unparalleled, and the ambiance transports you to a luxury dining room in Shanghai.", rating: 5 },
  { name: "Fatima Al Maktoum", text: "The perfect blend of modern luxury and authentic Asian flavors. Located right near Sharaf DG, it's my new favorite spot in Bur Dubai.", rating: 5 },
  { name: "David Thompson", text: "Exceptional service and the Dim Sum is crafted to perfection. A 5-star fine dining experience that truly stands out in Dubai.", rating: 5 }
];

// --- COMPONENTS ---

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed w-full z-50 transition-all duration-500 ${isScrolled ? 'bg-[#0a0a0a]/90 backdrop-blur-md border-b border-[#D4AF37]/20 py-4' : 'bg-transparent py-6'}`}>
      <div className="container mx-auto px-6 lg:px-12 flex justify-between items-center">
        <div className="flex items-center gap-2 group cursor-pointer">
          <Flame className="text-[#8B0000] w-8 h-8 group-hover:text-[#D4AF37] transition-colors duration-300" />
          <h1 className="font-serif text-2xl tracking-widest text-white">CHINA <span className="text-[#D4AF37]">TOWN</span></h1>
        </div>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8 font-sans text-sm tracking-widest text-white/80">
          <a href="#about" className="hover:text-[#D4AF37] transition-colors">OUR STORY</a>
          <a href="#menu" className="hover:text-[#D4AF37] transition-colors">MENU</a>
          <a href="#gallery" className="hover:text-[#D4AF37] transition-colors">GALLERY</a>
          <a href="#location" className="hover:text-[#D4AF37] transition-colors">LOCATION</a>
          <a href="#reservation" className="border border-[#8B0000] bg-[#8B0000]/10 text-white px-6 py-2 hover:bg-[#8B0000] transition-all duration-300 shadow-[0_0_15px_rgba(139,0,0,0.3)] hover:shadow-[0_0_25px_rgba(139,0,0,0.6)]">
            RESERVE
          </a>
        </div>

        {/* Mobile Menu Toggle */}
        <button className="md:hidden text-white hover:text-[#D4AF37] transition-colors" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          {mobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Nav */}
      <div className={`fixed inset-0 bg-[#050505]/98 backdrop-blur-xl z-40 flex flex-col items-center justify-center gap-8 transition-transform duration-500 ${mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'} md:hidden`}>
        <button className="absolute top-6 right-6 text-white" onClick={() => setMobileMenuOpen(false)}>
          <X className="w-8 h-8" />
        </button>
        {['About', 'Menu', 'Gallery', 'Location', 'Reservation'].map((item) => (
          <a 
            key={item} 
            href={`#${item.toLowerCase()}`} 
            className="font-serif text-2xl text-white hover:text-[#8B0000] transition-colors"
            onClick={() => setMobileMenuOpen(false)}
          >
            {item}
          </a>
        ))}
      </div>
    </nav>
  );
};

const Hero = () => {
  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image / Cinematic Visual */}
      <div className="absolute inset-0 z-0">
        {/* Luxury dark red and black cinematic overlays - Darkened for better contrast */}
        <div className="absolute inset-0 bg-black/60 z-10"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-[#050505] via-[#8B0000]/20 to-[#050505] z-10"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#050505_100%)] z-10 opacity-90"></div>
        <img 
          src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&q=80&w=2000" 
          alt="Ultra Luxury Chinese Fine Dining" 
          className="w-full h-full object-cover scale-105 animate-[slowPan_20s_ease-in-out_infinite_alternate] filter contrast-125 saturate-110 brightness-50"
        />
      </div>

      <div className="relative z-10 text-center px-4 max-w-5xl mx-auto flex flex-col items-center">
        <span className="font-sans text-[#D4AF37] tracking-[0.3em] uppercase text-sm mb-6 block reveal-on-scroll opacity-0 translate-y-10 transition-all duration-1000">
          Authentic Flavors in the Heart of Dubai
        </span>
        <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl text-white leading-tight mb-8 reveal-on-scroll opacity-0 translate-y-10 transition-all duration-1000 delay-200 drop-shadow-2xl">
          Experience the Art of <br/>
          <span className="italic text-[#8B0000] text-glow">Chinese Fine Dining</span>
        </h1>
        <p className="font-sans text-white/70 max-w-2xl mx-auto text-lg mb-10 reveal-on-scroll opacity-0 translate-y-10 transition-all duration-1000 delay-300">
          A transcendent culinary journey where ancient Asian traditions meet modern luxury, located in the prestigious Al Mussalla Tower.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-6 reveal-on-scroll opacity-0 translate-y-10 transition-all duration-1000 delay-500">
          <a href="#reservation" className="bg-[#8B0000] text-white px-10 py-4 font-sans tracking-widest text-sm hover:bg-[#A50000] transition-colors duration-300 flex items-center justify-center gap-2 group shadow-[0_0_20px_rgba(139,0,0,0.4)] hover:shadow-[0_0_30px_rgba(139,0,0,0.6)]">
            RESERVE TABLE
            <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </a>
          <a href="#menu" className="border border-[#D4AF37]/50 text-[#D4AF37] px-10 py-4 font-sans tracking-widest text-sm hover:bg-[#D4AF37]/10 transition-colors duration-300 flex items-center justify-center">
            EXPLORE MENU
          </a>
        </div>
      </div>
    </section>
  );
};

const About = () => {
  return (
    <section id="about" className="py-24 bg-[#050505] relative overflow-hidden">
      {/* Decorative Lantern Glow Elements */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-[#8B0000]/10 rounded-full blur-[120px]"></div>
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-[#D4AF37]/5 rounded-full blur-[120px]"></div>

      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          <div className="lg:w-1/2 relative reveal-on-scroll opacity-0 translate-y-10 transition-all duration-1000">
            <div className="relative z-10">
              <img 
                src="https://image2url.com/r2/default/images/1773554566958-e658efeb-fe3c-434b-93d7-014867c6bf66.jpeg" 
                alt="Authentic Chinese Cuisine Preparation" 
                className="w-full h-[600px] object-cover rounded-sm shadow-2xl border border-white/5"
              />
            </div>
            {/* Red & Gold Frame accent */}
            <div className="absolute -inset-4 border border-[#8B0000]/40 z-0 translate-x-4 translate-y-4 rounded-sm hidden md:block"></div>
          </div>
          
          <div className="lg:w-1/2 lg:pl-10 text-center lg:text-left">
            <h2 className="font-serif text-4xl md:text-5xl text-white mb-6 reveal-on-scroll opacity-0 translate-y-10 transition-all duration-1000 delay-200">
              A Legacy of <span className="text-[#8B0000] italic">Authenticity</span>
            </h2>
            <div className="w-16 h-[1px] bg-[#D4AF37] mx-auto lg:mx-0 mb-8 reveal-on-scroll opacity-0 translate-y-10 transition-all duration-1000 delay-300"></div>
            <p className="font-sans text-white/70 leading-relaxed mb-6 reveal-on-scroll opacity-0 translate-y-10 transition-all duration-1000 delay-400">
              Located at the vibrant heart of Bur Dubai, China Town Restaurant is a sanctuary of premium dining. We bring you the authentic soul of Chinese cuisine, seamlessly weaving age-old recipes from diverse provinces with modern, elegant presentation.
            </p>
            <p className="font-sans text-white/70 leading-relaxed mb-10 reveal-on-scroll opacity-0 translate-y-10 transition-all duration-1000 delay-500">
              Surrounded by dark luxury aesthetics and the subtle glow of traditional lanterns, every dish tells a story. From hand-folded Dim Sum to perfectly roasted Peking Duck, we invite you to experience a culinary masterpiece.
            </p>
            
            <div className="reveal-on-scroll opacity-0 translate-y-10 transition-all duration-1000 delay-600 flex flex-col items-center lg:items-start">
               <img 
                 src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/Signature_of_John_Hancock.svg/1200px-Signature_of_John_Hancock.svg.png" 
                 alt="Master Chef Signature" 
                 className="h-12 opacity-40 invert filter brightness-200 sepia hue-rotate-[320deg] saturate-[200%]"
               />
               <p className="font-sans text-xs tracking-[0.2em] text-[#D4AF37] mt-4">MASTER CHEF</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const MenuSection = () => {
  const [activeCategory, setActiveCategory] = useState('Dim Sum');

  return (
    <section id="menu" className="py-24 bg-[#0a0a0a] relative border-t border-white/5">
      <div className="container mx-auto px-6 lg:px-12 max-w-6xl">
        <div className="text-center mb-16 reveal-on-scroll opacity-0 translate-y-10 transition-all duration-1000">
          <span className="font-sans text-[#D4AF37] tracking-[0.3em] uppercase text-sm mb-4 block">The Culinary Collection</span>
          <h2 className="font-serif text-4xl md:text-5xl text-white">Our <span className="italic text-[#8B0000]">Menu</span></h2>
        </div>

        {/* Categories */}
        <div className="flex flex-wrap justify-center gap-4 md:gap-8 mb-16 reveal-on-scroll opacity-0 translate-y-10 transition-all duration-1000 delay-200">
          {MENU_CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`font-sans tracking-widest text-sm pb-2 transition-all duration-300 border-b-2 ${activeCategory === cat ? 'border-[#8B0000] text-[#D4AF37]' : 'border-transparent text-white/50 hover:text-white hover:border-white/30'}`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Menu Items */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 min-h-[400px]">
          {MENU_ITEMS[activeCategory].map((item, index) => (
            <div 
              key={index} 
              className="flex gap-6 group cursor-pointer reveal-on-scroll opacity-0 translate-y-10 transition-all duration-1000"
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              <div className="w-24 h-24 overflow-hidden rounded-sm flex-shrink-0 border border-white/10 group-hover:border-[#8B0000] transition-colors duration-500 shadow-lg">
                <img src={item.image} alt={item.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
              </div>
              <div className="flex-1 flex flex-col justify-center">
                <div className="flex justify-between items-baseline border-b border-white/10 pb-2 mb-2 group-hover:border-[#8B0000]/50 transition-colors duration-500">
                  <h3 className="font-serif text-xl text-white group-hover:text-[#D4AF37] transition-colors duration-300">{item.name}</h3>
                  <span className="font-sans text-[#8B0000] font-bold tracking-widest whitespace-nowrap ml-4">{item.price}</span>
                </div>
                <p className="font-sans text-white/50 text-sm leading-relaxed">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-20 reveal-on-scroll opacity-0 translate-y-10 transition-all duration-1000 delay-500">
           <a href="#" className="inline-flex items-center gap-2 border border-[#8B0000] text-[#D4AF37] px-8 py-3 font-sans tracking-widest text-sm hover:bg-[#8B0000] hover:text-white transition-all duration-300">
            <Utensils className="w-4 h-4" /> VIEW FULL MENU
          </a>
        </div>
      </div>
    </section>
  );
};

const Gallery = () => {
  const images = [
    "https://image2url.com/r2/default/images/1773560236712-ea56b7ad-8112-4e54-9c1d-dcac839117e2.jpeg", 
    "https://image2url.com/r2/default/images/1773560294694-77c5082f-4c2c-481e-b483-73e47c55fda5.jpeg", 
    "https://image2url.com/r2/default/images/1773855721582-25a57dca-2657-4948-9c6e-ddf9f1241aad.jpg", 
    "https://image2url.com/r2/default/images/1773855765776-56e36d5e-3b5e-4c5c-a682-6c960033362b.jpg", 
    "https://image2url.com/r2/default/images/1773855814066-7d308432-cd99-43e2-aea8-43bf80410213.jpg", 
  ];

  return (
    <section id="gallery" className="py-24 bg-[#050505]">
      <div className="container mx-auto px-4 lg:px-12">
        <div className="text-center mb-16 reveal-on-scroll opacity-0 translate-y-10 transition-all duration-1000">
          <h2 className="font-serif text-4xl md:text-5xl text-white">The <span className="italic text-[#8B0000]">Atmosphere</span></h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 auto-rows-[250px]">
          {images.map((src, index) => (
            <div 
              key={index} 
              className={`relative overflow-hidden group reveal-on-scroll opacity-0 translate-y-10 transition-all duration-1000 border border-white/5 ${index === 1 || index === 2 ? 'md:col-span-2 md:row-span-2' : ''}`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div className="absolute inset-0 bg-black/40 group-hover:bg-transparent transition-colors duration-700 z-10 pointer-events-none"></div>
              <img 
                src={src} 
                alt={`China Town Gallery ${index + 1}`} 
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-[1.5s] ease-out"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Reviews = () => {
  return (
    <section className="py-24 bg-[#0a0a0a] border-y border-white/5 relative overflow-hidden">
      {/* Subtle background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-3xl h-[200px] bg-[#8B0000]/5 blur-[100px] rounded-full pointer-events-none"></div>

      <div className="container mx-auto px-6 lg:px-12 max-w-6xl relative z-10">
         <div className="flex justify-center mb-12">
            <div className="flex gap-2">
              {[...Array(5)].map((_, i) => <Star key={i} className="w-5 h-5 text-[#D4AF37] fill-[#D4AF37]" />)}
            </div>
         </div>
         
         <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {REVIEWS.map((review, idx) => (
              <div key={idx} className="bg-[#111] border border-white/5 p-10 hover:border-[#8B0000]/50 transition-colors duration-500 reveal-on-scroll opacity-0 translate-y-10 relative group">
                <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-[#8B0000] to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-center"></div>
                <p className="font-serif text-white/80 text-lg italic mb-8 leading-relaxed">"{review.text}"</p>
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-[#8B0000]/20 flex items-center justify-center text-[#D4AF37] font-serif font-bold">
                    {review.name.charAt(0)}
                  </div>
                  <h4 className="font-sans text-white/90 tracking-widest text-xs uppercase">{review.name}</h4>
                </div>
              </div>
            ))}
         </div>
      </div>
    </section>
  );
};

const Reservation = () => {
  const [formData, setFormData] = useState({ name: '', phone: '', guests: '2', date: '', time: '' });

  const handleBook = (e) => {
    e.preventDefault();
    const message = `*New Reservation Request*%0A%0A*Name:* ${formData.name}%0A*Phone:* ${formData.phone}%0A*Guests:* ${formData.guests}%0A*Date:* ${formData.date}%0A*Time:* ${formData.time}%0A%0AHello, I want to reserve a table at China Town Restaurant.`;
    window.open(`https://wa.me/971585899111?text=${message}`, '_blank');
  };

  return (
    <section id="reservation" className="py-24 bg-[#050505] relative">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="flex flex-col lg:flex-row gap-16 items-center">
          
          {/* Reservation Form */}
          <div className="w-full lg:w-1/2 bg-[#0a0a0a] border border-[#8B0000]/30 p-8 md:p-12 shadow-[0_0_30px_rgba(0,0,0,0.8)] relative overflow-hidden reveal-on-scroll opacity-0 translate-y-10 transition-all duration-1000">
            {/* Form Top Accent */}
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#D4AF37] to-[#8B0000]"></div>
            
            <h2 className="font-serif text-3xl md:text-4xl text-white mb-2">Reserve a <span className="italic text-[#8B0000]">Table</span></h2>
            <p className="font-sans text-white/50 text-sm mb-10">Secure your premium dining experience.</p>
            
            <form onSubmit={handleBook} className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <label className="block font-sans text-xs tracking-widest text-[#D4AF37] mb-3 uppercase">Your Name</label>
                  <input required type="text" className="w-full bg-transparent border-b border-white/20 pb-2 text-white focus:outline-none focus:border-[#8B0000] transition-colors" placeholder="John Doe" 
                    onChange={e => setFormData({...formData, name: e.target.value})}/>
                </div>
                <div>
                  <label className="block font-sans text-xs tracking-widest text-[#D4AF37] mb-3 uppercase">Phone Number</label>
                  <input required type="tel" className="w-full bg-transparent border-b border-white/20 pb-2 text-white focus:outline-none focus:border-[#8B0000] transition-colors" placeholder="+971 5X XXXXXXX" 
                    onChange={e => setFormData({...formData, phone: e.target.value})}/>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div>
                  <label className="block font-sans text-xs tracking-widest text-[#D4AF37] mb-3 uppercase">Guests</label>
                  <select className="w-full bg-[#0a0a0a] border-b border-white/20 pb-2 text-white focus:outline-none focus:border-[#8B0000] transition-colors cursor-pointer appearance-none"
                    onChange={e => setFormData({...formData, guests: e.target.value})}>
                    {[1,2,3,4,5,6,7,8,"8+"].map(num => <option key={num} value={num}>{num} {num === 1 ? 'Person' : 'People'}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block font-sans text-xs tracking-widest text-[#D4AF37] mb-3 uppercase">Date</label>
                  <input required type="date" className="w-full bg-transparent border-b border-white/20 pb-2 text-white focus:outline-none focus:border-[#8B0000] transition-colors style-date"
                    onChange={e => setFormData({...formData, date: e.target.value})}/>
                </div>
                <div>
                  <label className="block font-sans text-xs tracking-widest text-[#D4AF37] mb-3 uppercase">Time</label>
                  <input required type="time" className="w-full bg-transparent border-b border-white/20 pb-2 text-white focus:outline-none focus:border-[#8B0000] transition-colors style-time"
                    onChange={e => setFormData({...formData, time: e.target.value})}/>
                </div>
              </div>

              <button type="submit" className="w-full bg-[#8B0000] text-white py-4 mt-6 font-sans tracking-widest text-sm hover:bg-[#A50000] transition-colors duration-300 flex justify-center items-center gap-2 shadow-[0_4px_15px_rgba(139,0,0,0.3)]">
                BOOK VIA WHATSAPP <MessageCircle className="w-4 h-4" />
              </button>
            </form>
          </div>

          {/* Location Details */}
          <div id="location" className="w-full lg:w-1/2 reveal-on-scroll opacity-0 translate-y-10 transition-all duration-1000 delay-200">
             <div className="h-[300px] w-full border border-white/10 mb-8 relative group overflow-hidden rounded-sm">
                {/* Styled Map (Dark styled using CSS filter) */}
                <div className="absolute inset-0 bg-black/40 group-hover:bg-transparent transition-colors z-10 pointer-events-none duration-500"></div>
                <iframe 
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3608.643665725667!2d55.2938473!3d25.2533038!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f433362a26c71%3A0xcb06f52e3e5718a!2sAl%20Mussalla%20Tower!5e0!3m2!1sen!2sae!4v1715000000000!5m2!1sen!2sae" 
                  width="100%" height="100%" style={{ border: 0, filter: 'invert(90%) hue-rotate(180deg) contrast(110%) sepia(20%)' }} allowFullScreen="" loading="lazy">
                </iframe>
             </div>

             <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <MapPin className="text-[#8B0000] w-6 h-6 flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-sans text-white uppercase tracking-widest text-sm mb-1">Location</h4>
                    <p className="font-serif text-white/60 leading-relaxed">Al Mussalla Tower, Central Mall, <br/> Near Sharaf DG Metro Station, Bur Dubai, UAE</p>
                    <a href="https://maps.google.com" target="_blank" rel="noreferrer" className="inline-block mt-2 text-[#D4AF37] text-xs uppercase tracking-widest border-b border-[#D4AF37] pb-1 hover:text-white transition-colors">Get Directions</a>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Phone className="text-[#8B0000] w-6 h-6 flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-sans text-white uppercase tracking-widest text-sm mb-1">Contact</h4>
                    <p className="font-serif text-white/60">+971 58 589 9111 <br/> reserve@chinatowndubai.ae</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Clock className="text-[#8B0000] w-6 h-6 flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-sans text-white uppercase tracking-widest text-sm mb-1">Hours</h4>
                    <p className="font-serif text-white/60">Lunch: 12:00 PM - 3:30 PM <br/> Dinner: 6:30 PM - 11:30 PM</p>
                  </div>
                </div>
             </div>
          </div>

        </div>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="bg-[#030303] pt-20 pb-10 border-t border-white/5 relative">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center md:text-left mb-16">
          
          <div className="flex flex-col items-center md:items-start">
            <div className="flex items-center gap-2 mb-6">
              <Flame className="text-[#8B0000] w-8 h-8" />
              <h2 className="font-serif text-2xl tracking-widest text-white">CHINA <span className="text-[#D4AF37]">TOWN</span></h2>
            </div>
            <p className="font-sans text-white/40 text-sm leading-relaxed max-w-xs">
              This is not just a website — it's a luxury brand experience that turns visitors into paying customers. Elevating Chinese cuisine in the heart of Dubai.
            </p>
          </div>

          <div className="flex flex-col items-center md:items-start">
            <h4 className="font-sans text-white uppercase tracking-widest text-sm mb-6">Quick Links</h4>
            <div className="space-y-3 flex flex-col font-serif text-white/50">
              <a href="#about" className="hover:text-[#D4AF37] transition-colors">Our Story</a>
              <a href="#menu" className="hover:text-[#D4AF37] transition-colors">The Menu</a>
              <a href="#gallery" className="hover:text-[#D4AF37] transition-colors">Ambiance Gallery</a>
              <a href="#reservation" className="hover:text-[#D4AF37] transition-colors">Private Dining</a>
            </div>
          </div>

          <div className="flex flex-col items-center md:items-start">
            <h4 className="font-sans text-white uppercase tracking-widest text-sm mb-6">Connect</h4>
            <div className="flex gap-4 mb-6">
              <a href="#" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-white/50 hover:text-white hover:border-[#8B0000] hover:bg-[#8B0000]/20 transition-all duration-300"><Instagram className="w-4 h-4" /></a>
              <a href="#" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-white/50 hover:text-white hover:border-[#8B0000] hover:bg-[#8B0000]/20 transition-all duration-300"><Facebook className="w-4 h-4" /></a>
            </div>
            <p className="font-sans text-white/30 text-xs uppercase tracking-widest">VIP Newsletter</p>
            <div className="mt-3 flex w-full max-w-xs border-b border-white/20 pb-2 focus-within:border-[#8B0000] transition-colors">
              <input type="email" placeholder="YOUR EMAIL" className="bg-transparent text-white text-sm focus:outline-none w-full placeholder-white/30" />
              <button className="text-[#D4AF37] text-sm tracking-widest hover:text-white transition-colors">JOIN</button>
            </div>
          </div>
        </div>

        <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center text-center gap-4">
          <p className="font-sans text-white/30 text-xs tracking-widest">
            &copy; {new Date().getFullYear()} CHINA TOWN RESTAURANT LLC. ALL RIGHTS RESERVED.
          </p>
          <div className="flex gap-6 font-sans text-white/30 text-xs tracking-widest">
            <a href="#" className="hover:text-white transition-colors">PRIVACY POLICY</a>
            <a href="#" className="hover:text-white transition-colors">TERMS OF SERVICE</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

const WhatsAppFab = () => {
  return (
    <a 
      href="https://wa.me/971585899111?text=Hello,%20I%20want%20to%20reserve%20a%20table%20at%20China%20Town%20Restaurant" 
      target="_blank" 
      rel="noreferrer"
      className="fixed bottom-6 right-6 z-50 bg-[#25D366] text-white p-4 rounded-full shadow-[0_0_20px_rgba(37,211,102,0.5)] hover:scale-110 hover:shadow-[0_0_30px_rgba(37,211,102,0.8)] transition-all duration-300 group"
      aria-label="Book on WhatsApp"
    >
      <MessageCircle className="w-7 h-7" />
      <span className="absolute right-full mr-4 top-1/2 -translate-y-1/2 bg-[#050505]/90 backdrop-blur border border-white/10 text-white text-xs px-3 py-1.5 rounded-sm opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap font-sans tracking-widest">
        Book via WhatsApp
      </span>
    </a>
  );
};

// --- MAIN APP ---

export default function App() {
  useScrollReveal();

  return (
    <div className="bg-[#050505] min-h-screen font-sans selection:bg-[#8B0000] selection:text-white">
      {/* Injecting Fonts and CSS natively in the file to guarantee rendering */}
      <style dangerouslySetInnerHTML={{__html: `
        @import url('https://fonts.googleapis.com/css2?family=Lato:wght@300;400;700&family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400&display=swap');
        
        .font-serif { font-family: 'Playfair Display', serif; }
        .font-sans { font-family: 'Lato', sans-serif; }
        
        html { scroll-behavior: smooth; }
        
        @keyframes slowPan {
          0% { transform: scale(1.05) translate(0, 0); }
          100% { transform: scale(1.15) translate(-2%, 2%); }
        }
        
        .text-glow {
           text-shadow: 0 0 20px rgba(139,0,0,0.8), 0 0 40px rgba(139,0,0,0.4);
        }
        
        input[type="date"]::-webkit-calendar-picker-indicator,
        input[type="time"]::-webkit-calendar-picker-indicator {
            filter: invert(1) sepia(100%) saturate(1000%) hue-rotate(350deg);
            cursor: pointer;
        }
      `}} />

      <Navbar />
      <Hero />
      <About />
      <MenuSection />
      <Gallery />
      <Reviews />
      <Reservation />
      <Footer />
      <WhatsAppFab />
    </div>
  );
}