import React, { useState, useEffect, useRef } from 'react';
import { 
  Phone, 
  MapPin, 
  Clock, 
  ChevronRight, 
  Star, 
  Instagram, 
  Facebook, 
  Twitter, 
  ChefHat, 
  Utensils, 
  Wine, 
  Sparkles,
  Menu as MenuIcon,
  X
} from 'lucide-react';

// --- DATA ---
const MENU_DATA = {
  Starters: [
    { name: "Truffle Murgh Tikka", desc: "Charcoal-smoked free-range chicken, black truffle shavings, 24k gold leaf.", price: "AED 125", image: "https://image2url.com/r2/default/images/1773545952370-735e5c02-ed88-4939-87d3-f2fa350ae97c.jpg" },
    { name: "Wagyu Seekh Kebab", desc: "Grade A5 Wagyu beef, signature 21-spice blend, mint & pomegranate glaze.", price: "AED 195", image: "https://image2url.com/r2/default/images/1773554566958-e658efeb-fe3c-434b-93d7-014867c6bf66.jpeg" },
    { name: "Saffron Lobster Shorba", desc: "Omani lobster bisque infused with Kashmiri saffron and coconut foam.", price: "AED 145", image: "https://image2url.com/r2/default/images/1774110672578-310d0899-046c-4c12-85fc-b51ba6ceef10.jpg" },
  ],
  "Main Course": [
    { name: "Royal Nalli Nihari", desc: "Slow-cooked lamb shank, rich bone marrow gravy, artisanal sheer mal.", price: "AED 210", image: "https://image2url.com/r2/default/images/1773560236712-ea56b7ad-8112-4e54-9c1d-dcac839117e2.jpeg" },
    { name: "Dal Afghan Reserve", desc: "Black lentils simmered for 48 hours, churned with French butter.", price: "AED 95", image: "https://image2url.com/r2/default/images/1773560294694-77c5082f-4c2c-481e-b483-73e47c55fda5.jpeg" },
    { name: "Sea Bass Pollichathu", desc: "Chilean sea bass wrapped in banana leaf, shallot & kokum masala.", price: "AED 185", image: "https://image2url.com/r2/default/images/1773855572515-8311f664-9920-463f-80b2-7410919432d0.jpg" },
  ],
  Desserts: [
    { name: "Rosewater & Pistachio Sphere", desc: "Melting white chocolate dome, pistachio sponge, warm rose syrup.", price: "AED 85", image: "https://image2url.com/r2/default/images/1773855611849-0dd9ee94-a03e-4919-b2d9-f9e9d0b9eeb1.jpg" },
    { name: "Saffron Rasmalai Mille-Feuille", desc: "Crispy filo pastry, saffron cottage cheese mousse, edible gold.", price: "AED 90", image: "https://image2url.com/r2/default/images/1773855646363-1b3921bd-151e-4bda-a338-803ae44b926c.jpg" },
  ]
};

const FEATURES = [
  { icon: <ChefHat size={32} />, title: "Authentic Taste", desc: "Heritage recipes elevated with the world's finest ingredients." },
  { icon: <Sparkles size={32} />, title: "Luxury Ambience", desc: "Bespoke interiors designed for intimacy and grandeur." },
  { icon: <Wine size={32} />, title: "Elite Service", desc: "Anticipatory, discreet, and world-class hospitality." },
  { icon: <MapPin size={32} />, title: "Prime Location", desc: "Situated exclusively in New Gold Souq for the global elite." },
];

const REVIEWS = [
  { 
    image: "https://image2url.com/r2/default/images/1774110672578-310d0899-046c-4c12-85fc-b51ba6ceef10.jpg",
    text: "A masterclass in fine dining. Afghan Internationals doesn't just serve food; they curate an unforgettable evening. The Truffle Tikka is life-changing.", 
    author: "Sarah M.", 
    location: "London, UK" 
  },
  { 
    image: "https://image2url.com/r2/default/images/1774110709609-0cf13fe4-c2ea-4e13-8547-66765f8c02df.jpg",
    text: "The definitive luxury Indian experience in Dubai. Flawless service, exquisite flavors, and an atmosphere that screams exclusivity.", 
    author: "Ahmed R.", 
    location: "Dubai, UAE" 
  },
  { 
    image: "https://image2url.com/r2/default/images/1774110745040-e3060498-012b-4731-918b-618ec3040e69.jpg",
    text: "Every dish is a work of art. The attention to detail, from the 24k gold leaf to the perfectly paired wines, is simply unmatched.", 
    author: "Elena V.", 
    location: "Monaco" 
  },
  { 
    image: "https://image2url.com/r2/default/images/1774110784939-c135172d-afc7-49d9-aae9-78c69e8fab26.jpg",
    text: "An absolute culinary triumph. The ambiance transports you, while the modern techniques applied to classic recipes leave you in awe.", 
    author: "James T.", 
    location: "New York, USA" 
  },
  { 
    image: "https://image2url.com/r2/default/images/1774110824941-bde0d96b-7e53-4488-ac4e-2a3e8e34f887.jpg",
    text: "Unrivaled elegance. From the moment the valet took our car to the final bite of the Saffron Rasmalai, we were treated like royalty.", 
    author: "Priya K.", 
    location: "Mumbai, India" 
  }
];

const GALLERY = [
  "https://image2url.com/r2/default/images/1773855721582-25a57dca-2657-4948-9c6e-ddf9f1241aad.jpg",
  "https://image2url.com/r2/default/images/1773855765776-56e36d5e-3b5e-4c5c-a682-6c960033362b.jpg",
  "https://image2url.com/r2/default/images/1773855814066-7d308432-cd99-43e2-aea8-43bf80410213.jpg",
  "https://image2url.com/r2/default/images/1773855844207-94da55ee-3ef4-4bfa-a806-d6ca09afce72.jpg",
  "https://image2url.com/r2/default/images/1773855879123-3c090c06-ff80-4ba5-8fb4-1d494e2686c3.jpg",
  "https://image2url.com/r2/default/images/1773855914103-338ffd19-feea-4251-a3c6-2740918527a4.jpg"
];

// --- HOOKS & UTILS ---
const useScrollReveal = () => {
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('opacity-100', 'translate-y-0');
          entry.target.classList.remove('opacity-0', 'translate-y-12');
        }
      });
    }, { threshold: 0.1 });

    document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);
};

// --- COMPONENTS ---
export default function App() {
  useScrollReveal();
  const [activeMenu, setActiveMenu] = useState('Starters');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    date: '',
    time: '19:00',
    guests: '2 People',
    requests: ''
  });

  const handleWhatsAppSubmit = (e) => {
    e.preventDefault();
    const { name, phone, date, time, guests, requests } = formData;
    if(!name || !phone || !date) {
      alert("Kripya saari zaroori details bharein (Name, Phone, Date).");
      return;
    }
    
    const message = `*New Reservation Request - Afghan Internationals Dubai* 🍽️\n\n*Name:* ${name}\n*Phone:* ${phone}\n*Date:* ${date}\n*Time:* ${time}\n*Guests:* ${guests}\n*Special Requests:* ${requests || 'None'}`;
    const whatsappUrl = `https://wa.me/971501661146?text=${encodeURIComponent(message)}`;
    
    window.open(whatsappUrl, '_blank');
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % REVIEWS.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const gold = "#D4AF37";

  return (
    <div className="bg-[#050505] text-gray-200 font-sans min-h-screen selection:bg-[#D4AF37] selection:text-black">
      {/* Global Styles for Fonts and Custom Utilities */}
      <style dangerouslySetInnerHTML={{__html: `
        @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;600;700&family=Montserrat:wght@300;400;500;600&display=swap');
        
        .font-serif { font-family: 'Cinzel', serif; }
        .font-sans { font-family: 'Montserrat', sans-serif; }
        
        .glass-nav {
          background: rgba(5, 5, 5, 0.85);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          border-bottom: 1px solid rgba(212, 175, 55, 0.15);
        }
        
        /* New Black & Gold Combo Box Style */
        .glass-card {
          background: linear-gradient(145deg, rgba(15, 15, 15, 0.95) 0%, rgba(35, 25, 5, 0.9) 100%);
          backdrop-filter: blur(12px);
          border: 1px solid rgba(212, 175, 55, 0.3);
          border-radius: 40px;
          box-shadow: 0 10px 30px -5px rgba(212, 175, 55, 0.25), 0 0 15px rgba(212, 175, 55, 0.1);
          transition: all 0.4s ease;
        }

        .glass-card:hover {
          border-color: rgba(212, 175, 55, 0.6);
          box-shadow: 0 15px 40px -5px rgba(212, 175, 55, 0.4), 0 0 20px rgba(212, 175, 55, 0.2);
        }

        .text-gold { color: #D4AF37; }
        .bg-gold { background-color: #D4AF37; }
        .border-gold { border-color: #D4AF37; }
        
        .reveal {
          transition: all 1s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .menu-image-wrap:hover .menu-image {
          transform: scale(1.05);
        }
        
        /* Custom Scrollbar */
        ::-webkit-scrollbar { width: 8px; }
        ::-webkit-scrollbar-track { background: #050505; }
        ::-webkit-scrollbar-thumb { background: #333; border-radius: 4px; }
        ::-webkit-scrollbar-thumb:hover { background: #D4AF37; }
        
        html { scroll-behavior: smooth; }
      `}} />

      {/* NAVIGATION */}
      <nav className="fixed w-full z-50 glass-nav transition-all duration-300">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="flex justify-between items-center h-24">
            {/* Logo */}
            <a href="#" className="flex flex-col items-center">
              <span className="font-serif text-xl md:text-2xl font-bold tracking-widest text-white uppercase text-center">Afghan Internationals</span>
              <span className="text-[10px] tracking-[0.3em] text-gold mt-1 uppercase">Dubai</span>
            </a>

            {/* Desktop Menu */}
            <div className="hidden md:flex space-x-8 items-center">
              {['About', 'Menu', 'Experience', 'Gallery'].map((item) => (
                <a key={item} href={`#${item.toLowerCase()}`} className="text-sm uppercase tracking-widest hover:text-gold transition-colors duration-300">
                  {item}
                </a>
              ))}
              <a href="#reservations" className="ml-4 border border-gold text-gold px-6 py-2.5 text-sm uppercase tracking-widest hover:bg-gold hover:text-black transition-all duration-500 rounded-sm">
                Reserve
              </a>
            </div>

            {/* Mobile Menu Button */}
            <button className="md:hidden text-gold" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
              {isMobileMenuOpen ? <X size={28} /> : <MenuIcon size={28} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        {isMobileMenuOpen && (
          <div className="md:hidden glass-nav absolute top-24 left-0 w-full flex flex-col items-center space-y-6 py-8 border-b border-gold/20">
            {['About', 'Menu', 'Experience', 'Gallery', 'Reservations'].map((item) => (
              <a 
                key={item} 
                href={`#${item.toLowerCase()}`} 
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-lg font-serif uppercase tracking-widest hover:text-gold transition-colors"
              >
                {item}
              </a>
            ))}
          </div>
        )}
      </nav>

      {/* HERO SECTION */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 w-full h-full">
          <img 
            src="https://image2url.com/r2/default/images/1773855844207-94da55ee-3ef4-4bfa-a806-d6ca09afce72.jpg" 
            alt="Luxury Dining" 
            className="w-full h-full object-cover scale-105 animate-[pulse_20s_ease-in-out_infinite_alternate]"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-[#050505]"></div>
        </div>
        
        <div className="relative z-10 text-center px-4 max-w-5xl mx-auto flex flex-col items-center mt-20">
          <div className="flex items-center gap-4 mb-6 reveal opacity-0 translate-y-12 delay-100">
            <div className="h-[1px] w-12 bg-gold"></div>
            <span className="text-gold uppercase tracking-[0.4em] text-xs md:text-sm">The Pinnacle of Gastronomy</span>
            <div className="h-[1px] w-12 bg-gold"></div>
          </div>
          
          <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl font-bold text-white leading-tight mb-8 reveal opacity-0 translate-y-12 delay-200">
            Authentic Flavors.<br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold via-yellow-200 to-gold">Luxury Dining.</span>
          </h1>
          
          <div className="flex flex-col sm:flex-row gap-6 mt-8 reveal opacity-0 translate-y-12 delay-300">
            <a href="#reservations" className="bg-gold text-black px-8 py-4 uppercase tracking-widest text-sm font-semibold hover:bg-white transition-all duration-300 flex items-center justify-center gap-2">
              Reserve Table <ChevronRight size={18} />
            </a>
            <a href="#menu" className="glass-card text-white px-8 py-4 uppercase tracking-widest text-sm hover:border-gold transition-all duration-300 flex items-center justify-center">
              View Menu
            </a>
          </div>
        </div>
        
        {/* Scroll Indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center animate-bounce opacity-50">
          <span className="text-[10px] tracking-widest uppercase mb-2">Scroll</span>
          <div className="w-[1px] h-12 bg-gradient-to-b from-gold to-transparent"></div>
        </div>
      </section>

      {/* ABOUT SECTION */}
      <section id="about" className="py-24 md:py-32 px-6 lg:px-12 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="relative reveal opacity-0 translate-y-12">
            <div className="absolute -inset-4 border border-gold/30 translate-x-4 translate-y-4"></div>
            <img 
              src="https://image2url.com/r2/default/images/1773560236712-ea56b7ad-8112-4e54-9c1d-dcac839117e2.jpeg" 
              alt="Chef plating food" 
              className="relative z-10 w-full h-[600px] object-cover grayscale-[20%] hover:grayscale-0 transition-all duration-700"
            />
          </div>
          
          <div className="reveal opacity-0 translate-y-12 delay-200">
            <h4 className="text-gold uppercase tracking-[0.3em] text-sm mb-4">Our Story</h4>
            <h2 className="font-serif text-4xl md:text-5xl text-white mb-8 leading-snug">A Symphony of Spice in the Heart of Dubai.</h2>
            <div className="space-y-6 text-gray-400 font-light leading-relaxed">
              <p>
                Located in the prestigious New Gold Souq district, Afghan Internationals redefines authentic cuisine through the lens of modern luxury. Every dish is a curated masterpiece, blending centuries-old traditions with avant-garde culinary techniques.
              </p>
              <p>
                Step into an ambiance of unparalleled opulence. From the 24k gold leaf accents to our world-class hospitality, we invite you to embark on an unforgettable gastronomic journey curated for the global elite.
              </p>
            </div>
            
            <div className="mt-12 flex items-center gap-6">
              <img src="https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&q=80&w=150" alt="Executive Chef" className="w-16 h-16 rounded-full object-cover border-2 border-gold p-1" />
              <div>
                <p className="text-white font-serif text-xl">Sanjeev R.</p>
                <p className="text-gold text-sm uppercase tracking-widest">Executive Chef</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* MENU SHOWCASE */}
      <section id="menu" className="py-24 md:py-32 bg-[#0a0806] relative">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="text-center mb-16 reveal opacity-0 translate-y-12">
            <h4 className="text-gold uppercase tracking-[0.3em] text-sm mb-4">Culinary Art</h4>
            <h2 className="font-serif text-4xl md:text-5xl text-white">The Menus</h2>
          </div>

          {/* Menu Tabs */}
          <div className="flex flex-wrap justify-center gap-4 md:gap-12 mb-16 reveal opacity-0 translate-y-12 delay-100">
            {Object.keys(MENU_DATA).map((category) => (
              <button
                key={category}
                onClick={() => setActiveMenu(category)}
                className={`text-sm uppercase tracking-widest pb-2 border-b-2 transition-all duration-300 ${
                  activeMenu === category ? 'border-gold text-gold' : 'border-transparent text-gray-500 hover:text-white'
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Menu Items */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {MENU_DATA[activeMenu].map((item, index) => (
              <div key={index} className="glass-card p-6 group cursor-pointer reveal opacity-0 translate-y-12" style={{ transitionDelay: `${index * 150}ms` }}>
                <div className="overflow-hidden h-64 mb-6 relative menu-image-wrap rounded-[25px]">
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-all z-10"></div>
                  <img src={item.image} alt={item.name} className="w-full h-full object-cover menu-image transition-transform duration-700" />
                  <div className="absolute bottom-4 right-4 z-20 bg-black/80 backdrop-blur-sm text-gold px-4 py-2 font-serif rounded-full border border-gold/30">
                    {item.price}
                  </div>
                </div>
                <h3 className="font-serif text-2xl text-white mb-3 group-hover:text-gold transition-colors px-2">{item.name}</h3>
                <p className="text-gray-400 font-light text-sm leading-relaxed px-2 pb-2">{item.desc}</p>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-20 reveal opacity-0 translate-y-12">
             <a href="#" className="inline-block border border-gold/50 text-white px-10 py-4 uppercase tracking-widest text-sm hover:bg-gold hover:text-black transition-all duration-300">
              Download Full Menu (PDF)
            </a>
          </div>
        </div>
      </section>

      {/* WHY CHOOSE US */}
      <section id="experience" className="py-24 md:py-32 px-6 lg:px-12 max-w-7xl mx-auto">
        <div className="text-center mb-20 reveal opacity-0 translate-y-12">
          <h4 className="text-gold uppercase tracking-[0.3em] text-sm mb-4">The Standard</h4>
          <h2 className="font-serif text-4xl md:text-5xl text-white">Pillars of Excellence</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {FEATURES.map((feature, index) => (
            <div key={index} className="glass-card p-10 text-center hover:-translate-y-2 transition-transform duration-500 reveal opacity-0 translate-y-12" style={{ transitionDelay: `${index * 100}ms` }}>
              <div className="text-gold mb-6 flex justify-center">{feature.icon}</div>
              <h3 className="font-serif text-xl text-white mb-4">{feature.title}</h3>
              <p className="text-gray-400 font-light text-sm leading-relaxed">{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* GALLERY */}
      <section id="gallery" className="py-20 bg-[#0a0806]">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 mb-16 text-center reveal opacity-0 translate-y-12">
          <h4 className="text-gold uppercase tracking-[0.3em] text-sm mb-4">Visual Feast</h4>
          <h2 className="font-serif text-4xl md:text-5xl text-white">The Gallery</h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 px-4 md:px-12 max-w-7xl mx-auto">
          {GALLERY.map((img, index) => (
            <div key={index} className="glass-card p-2 relative overflow-hidden group aspect-square reveal opacity-0 translate-y-12" style={{ transitionDelay: `${(index % 3) * 100}ms` }}>
              <img src={img} alt={`Gallery ${index}`} className="w-full h-full object-cover rounded-[30px] transition-transform duration-1000 group-hover:scale-105" />
              <div className="absolute inset-2 rounded-[30px] bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                <span className="text-gold text-4xl font-light">+</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* REVIEWS */}
      <section id="reviews" className="py-24 md:py-32 bg-[#050505] relative border-t border-gold/10 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          
          {/* Image Side (Editorial Layout) */}
          <div className="glass-card p-3 relative aspect-[4/5] md:aspect-square lg:aspect-[4/5] overflow-hidden reveal opacity-0 translate-y-12">
            <div className="absolute inset-3 border border-gold/40 z-20 pointer-events-none rounded-[30px]"></div>
            
            <div className="w-full h-full relative rounded-[30px] overflow-hidden">
              {REVIEWS.map((review, index) => (
                <img 
                  key={index}
                  src={review.image}
                  alt={`Review by ${review.author}`}
                  className={`absolute inset-0 w-full h-full object-cover transition-all duration-1000 ease-in-out transform ${
                    index === activeTestimonial ? 'opacity-100 scale-100' : 'opacity-0 scale-110'
                  }`}
                />
              ))}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20 z-10 pointer-events-none"></div>
            </div>
          </div>

          {/* Text Side */}
          <div className="relative reveal opacity-0 translate-y-12 delay-200">
            {/* Decorative Quote Mark */}
            <div className="absolute -top-12 -left-8 md:-left-12 text-[120px] md:text-[160px] text-white/5 font-serif select-none pointer-events-none leading-none">"</div>
            
            <h4 className="text-gold uppercase tracking-[0.3em] text-sm mb-12 flex items-center gap-4">
              <span className="h-[1px] w-8 bg-gold"></span> Elite Testimonials
            </h4>
            
            <div className="relative h-[280px] md:h-[220px]">
              {REVIEWS.map((review, index) => (
                <div 
                  key={index} 
                  className={`absolute top-0 left-0 w-full transition-all duration-1000 transform ${
                    index === activeTestimonial ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                  }`}
                  style={{ pointerEvents: index === activeTestimonial ? 'auto' : 'none' }}
                >
                  <div className="flex gap-2 mb-6">
                    {[...Array(5)].map((_, i) => <Star key={i} size={18} className="fill-gold text-gold" />)}
                  </div>
                  <p className="font-serif text-2xl md:text-3xl lg:text-4xl text-white leading-relaxed mb-8">"{review.text}"</p>
                  <div>
                    <p className="uppercase tracking-widest text-sm text-gold font-semibold">{review.author}</p>
                    <p className="text-xs text-gray-500 mt-2 uppercase tracking-wider">{review.location}</p>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Custom Premium Pagination Line */}
            <div className="flex items-center gap-3 mt-8 md:mt-12">
              {REVIEWS.map((_, index) => (
                <button 
                  key={index}
                  onClick={() => setActiveTestimonial(index)}
                  className={`h-[2px] transition-all duration-500 ease-in-out ${
                    index === activeTestimonial ? 'bg-gold w-12' : 'bg-gray-700 w-4 hover:bg-gray-400'
                  }`}
                  aria-label={`View review ${index + 1}`}
                />
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* RESERVATION & LOCATION */}
      <section id="reservations" className="py-24 md:py-32 bg-[#0a0806] relative border-t border-gold/10">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 grid grid-cols-1 lg:grid-cols-2 gap-16">
          
          {/* Location Info */}
          <div className="reveal opacity-0 translate-y-12">
            <h4 className="text-gold uppercase tracking-[0.3em] text-sm mb-4">Visit Us</h4>
            <h2 className="font-serif text-4xl text-white mb-10">The Location</h2>
            
            <div className="space-y-8 mb-12">
              <div className="flex gap-4 items-start">
                <MapPin className="text-gold shrink-0 mt-1" />
                <div>
                  <h5 className="text-white uppercase tracking-widest text-sm mb-2">Address</h5>
                  <p className="text-gray-400 font-light text-sm">New Gold Souq, Sherina Plaza 1<br/>Shop No 16 - 16th St<br/>Dubai, UAE</p>
                </div>
              </div>
              <div className="flex gap-4 items-start">
                <Phone className="text-gold shrink-0 mt-1" />
                <div>
                  <h5 className="text-white uppercase tracking-widest text-sm mb-2">Reservations</h5>
                  <p className="text-gray-400 font-light text-sm">+971 50 166 1146<br/>Complimentary VIP Valet Available</p>
                </div>
              </div>
              <div className="flex gap-4 items-start">
                <Clock className="text-gold shrink-0 mt-1" />
                <div>
                  <h5 className="text-white uppercase tracking-widest text-sm mb-2">Opening Hours</h5>
                  <p className="text-gray-400 font-light text-sm">Mon - Sun: 6:00 PM - 2:00 AM</p>
                </div>
              </div>
            </div>

            {/* Dark Styled Map Iframe */}
            <div className="h-64 w-full border border-gold/20 overflow-hidden relative group">
                <iframe 
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3608.681177695029!2d55.29969231501061!3d25.247656983872242!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f432b4b4b4b4b%3A0x4b4b4b4b4b4b4b4b!2sBurJuman!5e0!3m2!1sen!2sae!4v1620000000000!5m2!1sen!2sae" 
                  width="100%" 
                  height="100%" 
                  style={{ border: 0, filter: 'invert(90%) hue-rotate(180deg) grayscale(50%) brightness(80%)' }} 
                  allowFullScreen="" 
                  loading="lazy"
                ></iframe>
                <div className="absolute inset-0 bg-black/10 pointer-events-none group-hover:bg-transparent transition-all"></div>
            </div>
          </div>

          {/* Booking Form */}
          <div className="glass-card p-8 md:p-12 relative overflow-hidden reveal opacity-0 translate-y-12 delay-200">
            <div className="absolute top-0 right-0 w-32 h-32 bg-gold/5 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-gold/5 rounded-full blur-3xl"></div>
            
            <h2 className="font-serif text-3xl text-white mb-2 relative z-10">Request a Table</h2>
            <p className="text-gray-400 text-sm mb-8 relative z-10">For parties larger than 6, please contact us directly.</p>
            
            <form className="space-y-6 relative z-10" onSubmit={handleWhatsAppSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs uppercase tracking-widest text-gray-500 mb-2">Full Name</label>
                  <input type="text" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} className="w-full bg-transparent border-b border-gray-700 focus:border-gold outline-none py-2 text-white transition-colors" placeholder="John Doe" required />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-widest text-gray-500 mb-2">Phone Number</label>
                  <input type="tel" value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})} className="w-full bg-transparent border-b border-gray-700 focus:border-gold outline-none py-2 text-white transition-colors" placeholder="+971 50 000 0000" required />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-xs uppercase tracking-widest text-gray-500 mb-2">Date</label>
                  <input type="date" value={formData.date} onChange={(e) => setFormData({...formData, date: e.target.value})} className="w-full bg-transparent border-b border-gray-700 focus:border-gold outline-none py-2 text-gray-300 transition-colors [color-scheme:dark]" required />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-widest text-gray-500 mb-2">Time</label>
                  <select value={formData.time} onChange={(e) => setFormData({...formData, time: e.target.value})} className="w-full bg-transparent border-b border-gray-700 focus:border-gold outline-none py-2 text-gray-300 transition-colors appearance-none cursor-pointer">
                    <option className="bg-[#140f0a]">19:00</option>
                    <option className="bg-[#140f0a]">19:30</option>
                    <option className="bg-[#140f0a]">20:00</option>
                    <option className="bg-[#140f0a]">20:30</option>
                    <option className="bg-[#140f0a]">21:00</option>
                    <option className="bg-[#140f0a]">21:30</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-widest text-gray-500 mb-2">Guests</label>
                  <select value={formData.guests} onChange={(e) => setFormData({...formData, guests: e.target.value})} className="w-full bg-transparent border-b border-gray-700 focus:border-gold outline-none py-2 text-gray-300 transition-colors appearance-none cursor-pointer">
                    <option className="bg-[#140f0a]">2 People</option>
                    <option className="bg-[#140f0a]">3 People</option>
                    <option className="bg-[#140f0a]">4 People</option>
                    <option className="bg-[#140f0a]">5 People</option>
                    <option className="bg-[#140f0a]">6 People</option>
                  </select>
                </div>
              </div>
              
              <div>
                <label className="block text-xs uppercase tracking-widest text-gray-500 mb-2">Special Requests</label>
                <textarea rows="3" value={formData.requests} onChange={(e) => setFormData({...formData, requests: e.target.value})} className="w-full bg-transparent border-b border-gray-700 focus:border-gold outline-none py-2 text-white transition-colors resize-none" placeholder="Allergies, anniversaries, etc."></textarea>
              </div>
              
              <button type="submit" className="w-full bg-gold text-black uppercase tracking-widest text-sm font-semibold py-4 hover:bg-white transition-colors duration-300 mt-4 flex justify-center items-center gap-2">
                Confirm & Send to WhatsApp
              </button>
            </form>
          </div>

        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-black py-16 text-center border-t border-gold/20">
        <div className="max-w-4xl mx-auto px-6">
          <a href="#" className="flex flex-col items-center mb-8 inline-block">
             <span className="font-serif text-2xl md:text-3xl font-bold tracking-widest text-white uppercase text-center">Afghan Internationals</span>
          </a>
          
          <div className="flex justify-center gap-6 mb-12">
            <a href="#" className="text-gray-500 hover:text-gold transition-colors"><Instagram size={20} /></a>
            <a href="#" className="text-gray-500 hover:text-gold transition-colors"><Facebook size={20} /></a>
            <a href="#" className="text-gray-500 hover:text-gold transition-colors"><Twitter size={20} /></a>
          </div>
          
          <div className="flex flex-wrap justify-center gap-6 text-xs uppercase tracking-widest text-gray-600 mb-12">
            <a href="#" className="hover:text-gold transition-colors">Press</a>
            <a href="#" className="hover:text-gold transition-colors">Careers</a>
            <a href="#" className="hover:text-gold transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-gold transition-colors">Terms of Service</a>
          </div>
          
          <p className="text-gray-700 text-xs tracking-widest">
            &copy; {new Date().getFullYear()} AFGHAN INTERNATIONALS DUBAI. ALL RIGHTS RESERVED. CRAFTED FOR EXCELLENCE.
          </p>
        </div>
      </footer>

      {/* Sticky WhatsApp Button */}
      <a 
        href="https://wa.me/971501661146" 
        target="_blank" 
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-[90] bg-[#25D366] text-white p-4 rounded-full shadow-[0_0_20px_rgba(37,211,102,0.4)] hover:scale-110 hover:shadow-[0_0_30px_rgba(37,211,102,0.8)] transition-all duration-300 flex items-center justify-center animate-[pulse_2s_infinite] group"
      >
        <svg viewBox="0 0 24 24" width="32" height="32" fill="currentColor">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
        </svg>
        <span className="absolute right-16 bg-white text-black font-semibold text-xs px-4 py-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap shadow-lg">
          Book Table via WhatsApp
        </span>
      </a>
    </div>
  );
}