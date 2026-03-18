import React, { useState, useEffect, useRef } from 'react';
import { 
  Menu, X, MapPin, Phone, Clock, Star, 
  Instagram, Facebook, MessageCircle, ChevronRight, 
  ChefHat, Wine, Coffee, Fish 
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

const MENU_CATEGORIES = ['Starters', 'Main Course', 'Seafood Specials', 'Beverages'];

const MENU_ITEMS = {
  'Starters': [
    { name: 'Tandoori Lobster Bites', desc: 'Charcoal-smoked lobster chunks, saffron infused marinade, mint chutney', price: 'AED 120', image: 'https://image2url.com/r2/default/images/1773855572515-8311f664-9920-463f-80b2-7410919432d0.jpg' },
    { name: 'Ghee Roast Scallops', desc: 'Pan-seared scallops, traditional Mangalorean spices, clarified butter', price: 'AED 95', image: 'https://image2url.com/r2/default/images/1773855611849-0dd9ee94-a03e-4919-b2d9-f9e9d0b9eeb1.jpg' },
    { name: 'Kori Roti Canapés', desc: 'Crisp rice wafers topped with rich chicken curry reduction', price: 'AED 65', image: 'https://image2url.com/r2/default/images/1773855646363-1b3921bd-151e-4bda-a338-803ae44b926c.jpg' }
  ],
  'Main Course': [
    { name: 'Kundapur Lamb Rack', desc: 'Slow-cooked lamb chops, coconut milk, Byadgi chili glaze', price: 'AED 185', image: 'https://image2url.com/r2/default/images/1773855721582-25a57dca-2657-4948-9c6e-ddf9f1241aad.jpg' },
    { name: 'Signature Neer Dosa & Chicken Sukka', desc: 'Lacy rice crepes served with dry-roasted spiced chicken', price: 'AED 110', image: 'https://image2url.com/r2/default/images/1773855765776-56e36d5e-3b5e-4c5c-a682-6c960033362b.jpg' },
    { name: 'Mushroom & Truffle Gassi', desc: 'Earthy mushrooms in a roasted coconut and coriander gravy, truffle oil', price: 'AED 90', image: 'https://image2url.com/r2/default/images/1773855814066-7d308432-cd99-43e2-aea8-43bf80410213.jpg' }
  ],
  'Seafood Specials': [
    { name: 'Pomfret Rawa Fry', desc: 'Semolina-crusted silver pomfret, pan-fried to golden perfection', price: 'AED 140', image: 'https://image2url.com/r2/default/images/1773855844207-94da55ee-3ef4-4bfa-a806-d6ca09afce72.jpg' },
    { name: 'Mangalorean Crab Curry', desc: 'Fresh mud crab simmered in a rich, tangy tamarind and coconut base', price: 'AED 210', image: 'https://image2url.com/r2/default/images/1773855879123-3c090c06-ff80-4ba5-8fb4-1d494e2686c3.jpg' },
    { name: 'Tiger Prawns Pulimunchi', desc: 'Spicy and sour fiery gravy cooked in traditional clay pots', price: 'AED 165', image: 'https://image2url.com/r2/default/images/1773855914103-338ffd19-feea-4251-a3c6-2740918527a4.jpg' }
  ],
  'Beverages': [
    { name: 'Saffron Cardamom Lassi', desc: 'Whipped yogurt, Iranian saffron, crushed pistachio', price: 'AED 45', image: 'https://image2url.com/r2/default/images/1773855572515-8311f664-9920-463f-80b2-7410919432d0.jpg' },
    { name: 'Sol Kadhi Margarita', desc: 'Kokum extract, coconut milk, green chili rim (Mocktail)', price: 'AED 50', image: 'https://image2url.com/r2/default/images/1773855611849-0dd9ee94-a03e-4919-b2d9-f9e9d0b9eeb1.jpg' },
    { name: 'Filter Kaapi Martini', desc: 'South Indian drip coffee, vanilla syrup, espresso foam', price: 'AED 55', image: 'https://image2url.com/r2/default/images/1773855646363-1b3921bd-151e-4bda-a338-803ae44b926c.jpg' }
  ]
};

const REVIEWS = [
  { name: "Ahmed Al Maktoum", text: "A Michelin-worthy experience. The flavors of the coast combined with unparalleled Dubai luxury. The Crab Curry is a masterpiece.", rating: 5 },
  { name: "Sarah Jenkins", text: "Absolutely breathtaking ambiance. The Neer Dosa melts in your mouth. Truly the finest Indian fine dining in the UAE.", rating: 5 },
  { name: "Rahul Sharma", text: "Bengre Kamat elevated traditional flavors to an art form. The service, the aesthetic, and the Ghee Roast are flawless.", rating: 5 }
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
    <nav className={`fixed w-full z-50 transition-all duration-500 ${isScrolled ? 'bg-black/80 backdrop-blur-md border-b border-[#D4AF37]/20 py-4' : 'bg-transparent py-6'}`}>
      <div className="container mx-auto px-6 lg:px-12 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <ChefHat className="text-[#D4AF37] w-8 h-8" />
          <h1 className="font-serif text-2xl tracking-widest text-white">BENGRE <span className="text-[#D4AF37]">KAMAT</span></h1>
        </div>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8 font-sans text-sm tracking-widest text-white/80">
          <a href="#about" className="hover:text-[#D4AF37] transition-colors">OUR STORY</a>
          <a href="#menu" className="hover:text-[#D4AF37] transition-colors">MENU</a>
          <a href="#gallery" className="hover:text-[#D4AF37] transition-colors">GALLERY</a>
          <a href="#location" className="hover:text-[#D4AF37] transition-colors">LOCATION</a>
          <a href="#reservation" className="border border-[#D4AF37] text-[#D4AF37] px-6 py-2 hover:bg-[#D4AF37] hover:text-black transition-all duration-300">
            RESERVE
          </a>
        </div>

        {/* Mobile Menu Toggle */}
        <button className="md:hidden text-white" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          {mobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Nav */}
      <div className={`fixed inset-0 bg-black/95 backdrop-blur-xl z-40 flex flex-col items-center justify-center gap-8 transition-transform duration-500 ${mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'} md:hidden`}>
        <button className="absolute top-6 right-6 text-white" onClick={() => setMobileMenuOpen(false)}>
          <X className="w-8 h-8" />
        </button>
        {['About', 'Menu', 'Gallery', 'Location', 'Reservation'].map((item) => (
          <a 
            key={item} 
            href={`#${item.toLowerCase()}`} 
            className="font-serif text-2xl text-white hover:text-[#D4AF37] transition-colors"
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
      {/* Background Image / Pseudo-Video */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-black z-10"></div>
        <img 
          src="https://image2url.com/r2/default/images/1773545952370-735e5c02-ed88-4939-87d3-f2fa350ae97c.jpg" 
          alt="Luxury Dining" 
          className="w-full h-full object-cover scale-105 animate-[slowPan_20s_ease-in-out_infinite_alternate]"
        />
      </div>

      <div className="relative z-10 text-center px-4 max-w-5xl mx-auto flex flex-col items-center">
        <span className="font-sans text-[#D4AF37] tracking-[0.3em] uppercase text-sm mb-6 block reveal-on-scroll opacity-0 translate-y-10 transition-all duration-1000">
          Premium Dining Experience in Dubai
        </span>
        <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl text-white leading-tight mb-8 reveal-on-scroll opacity-0 translate-y-10 transition-all duration-1000 delay-200">
          Experience Authentic <br/>
          <span className="italic text-[#D4AF37]">Coastal Luxury</span>
        </h1>
        <p className="font-sans text-white/70 max-w-2xl mx-auto text-lg mb-10 reveal-on-scroll opacity-0 translate-y-10 transition-all duration-1000 delay-300">
          Where the rich heritage of coastal Indian cuisine meets the refined elegance of Michelin-star service.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-6 reveal-on-scroll opacity-0 translate-y-10 transition-all duration-1000 delay-500">
          <a href="#reservation" className="bg-[#D4AF37] text-black px-10 py-4 font-sans tracking-widest text-sm hover:bg-white transition-colors duration-300 flex items-center justify-center gap-2 group">
            RESERVE A TABLE
            <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </a>
          <a href="#menu" className="border border-white/30 text-white px-10 py-4 font-sans tracking-widest text-sm hover:bg-white/10 transition-colors duration-300 flex items-center justify-center">
            VIEW MENU
          </a>
        </div>
      </div>
    </section>
  );
};

const About = () => {
  return (
    <section id="about" className="py-24 bg-[#0a0a0a] relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-[#D4AF37]/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#D4AF37]/5 rounded-full blur-3xl"></div>

      <div className="container mx-auto px-6 lg:px-12">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          <div className="lg:w-1/2 relative reveal-on-scroll opacity-0 translate-y-10 transition-all duration-1000">
            <div className="relative z-10">
              <img 
                src="https://image2url.com/r2/default/images/1773554566958-e658efeb-fe3c-434b-93d7-014867c6bf66.jpeg" 
                alt="Chef preparing fine dining dish" 
                className="w-full h-[600px] object-cover rounded-sm shadow-2xl"
              />
            </div>
            {/* Gold Frame accent */}
            <div className="absolute -inset-4 border border-[#D4AF37]/30 z-0 translate-x-4 translate-y-4 rounded-sm hidden md:block"></div>
          </div>
          
          <div className="lg:w-1/2 lg:pl-10 text-center lg:text-left">
            <h2 className="font-serif text-4xl md:text-5xl text-white mb-6 reveal-on-scroll opacity-0 translate-y-10 transition-all duration-1000 delay-200">
              A Symphony of <span className="text-[#D4AF37] italic">Spices & Heritage</span>
            </h2>
            <div className="w-16 h-[1px] bg-[#D4AF37] mx-auto lg:mx-0 mb-8 reveal-on-scroll opacity-0 translate-y-10 transition-all duration-1000 delay-300"></div>
            <p className="font-sans text-white/70 leading-relaxed mb-6 reveal-on-scroll opacity-0 translate-y-10 transition-all duration-1000 delay-400">
              Nestled in the heart of Dubai at Dolphin Hotel Apartments, Bengre Kamat transcends traditional dining. We meticulously curate the forgotten recipes of the Indian coast, elevating them with modern culinary techniques and unparalleled presentation.
            </p>
            <p className="font-sans text-white/70 leading-relaxed mb-10 reveal-on-scroll opacity-0 translate-y-10 transition-all duration-1000 delay-500">
              Every dish is a testament to authenticity, crafted by master chefs who understand that true luxury lies in the delicate balance of flavor, history, and innovation.
            </p>
            
            <img 
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/Signature_of_John_Hancock.svg/1200px-Signature_of_John_Hancock.svg.png" 
              alt="Chef Signature" 
              className="h-12 opacity-50 invert mx-auto lg:mx-0 reveal-on-scroll opacity-0 translate-y-10 transition-all duration-1000 delay-600 filter brightness-200 sepia"
            />
            <p className="font-sans text-xs tracking-[0.2em] text-[#D4AF37] mt-4 reveal-on-scroll opacity-0 translate-y-10 transition-all duration-1000 delay-600">EXECUTIVE CHEF</p>
          </div>
        </div>
      </div>
    </section>
  );
};

const MenuSection = () => {
  const [activeCategory, setActiveCategory] = useState('Main Course');

  return (
    <section id="menu" className="py-24 bg-[#111] relative border-t border-white/5">
      <div className="container mx-auto px-6 lg:px-12 max-w-6xl">
        <div className="text-center mb-16 reveal-on-scroll opacity-0 translate-y-10 transition-all duration-1000">
          <span className="font-sans text-[#D4AF37] tracking-[0.3em] uppercase text-sm mb-4 block">Gastronomic Journey</span>
          <h2 className="font-serif text-4xl md:text-5xl text-white">The <span className="italic text-[#D4AF37]">Menu</span></h2>
        </div>

        {/* Categories */}
        <div className="flex flex-wrap justify-center gap-4 md:gap-8 mb-16 reveal-on-scroll opacity-0 translate-y-10 transition-all duration-1000 delay-200">
          {MENU_CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`font-sans tracking-widest text-sm pb-2 transition-all duration-300 border-b-2 ${activeCategory === cat ? 'border-[#D4AF37] text-[#D4AF37]' : 'border-transparent text-white/50 hover:text-white'}`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Menu Items */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {MENU_ITEMS[activeCategory].map((item, index) => (
            <div 
              key={index} 
              className="flex gap-6 group cursor-pointer reveal-on-scroll opacity-0 translate-y-10 transition-all duration-1000"
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              <div className="w-24 h-24 overflow-hidden rounded-full flex-shrink-0 border-2 border-[#D4AF37]/20 group-hover:border-[#D4AF37] transition-colors duration-500">
                <img src={item.image} alt={item.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-baseline border-b border-white/10 pb-2 mb-2">
                  <h3 className="font-serif text-xl text-white group-hover:text-[#D4AF37] transition-colors duration-300">{item.name}</h3>
                  <span className="font-sans text-[#D4AF37] tracking-widest whitespace-nowrap ml-4">{item.price}</span>
                </div>
                <p className="font-sans text-white/60 text-sm leading-relaxed">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-16 reveal-on-scroll opacity-0 translate-y-10 transition-all duration-1000 delay-500">
           <a href="#" className="inline-block border border-[#D4AF37] text-[#D4AF37] px-8 py-3 font-sans tracking-widest text-sm hover:bg-[#D4AF37] hover:text-black transition-all duration-300">
            DOWNLOAD FULL MENU
          </a>
        </div>
      </div>
    </section>
  );
};

const Gallery = () => {
  const images = [
    "https://image2url.com/r2/default/images/1773560236712-ea56b7ad-8112-4e54-9c1d-dcac839117e2.jpeg", // Bar/Drinks
    "https://image2url.com/r2/default/images/1773560294694-77c5082f-4c2c-481e-b483-73e47c55fda5.jpeg", // Restaurant interior
    "https://image2url.com/r2/default/images/1773855721582-25a57dca-2657-4948-9c6e-ddf9f1241aad.jpg", // Food details
    "https://image2url.com/r2/default/images/1773855765776-56e36d5e-3b5e-4c5c-a682-6c960033362b.jpg", // Ambience
    "https://image2url.com/r2/default/images/1773855814066-7d308432-cd99-43e2-aea8-43bf80410213.jpg", // Chef plating
  ];

  return (
    <section id="gallery" className="py-24 bg-[#0a0a0a]">
      <div className="container mx-auto px-4 lg:px-12">
        <div className="text-center mb-16 reveal-on-scroll opacity-0 translate-y-10 transition-all duration-1000">
          <h2 className="font-serif text-4xl md:text-5xl text-white">The <span className="italic text-[#D4AF37]">Experience</span></h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 auto-rows-[250px]">
          {images.map((src, index) => (
            <div 
              key={index} 
              className={`relative overflow-hidden group reveal-on-scroll opacity-0 translate-y-10 transition-all duration-1000 ${index === 1 || index === 2 ? 'md:col-span-2 md:row-span-2' : ''}`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500 z-10"></div>
              <img 
                src={src} 
                alt={`Gallery image ${index + 1}`} 
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-in-out"
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
    <section className="py-24 bg-[#111] border-y border-white/5 relative overflow-hidden">
      <div className="container mx-auto px-6 lg:px-12 max-w-5xl">
         <div className="flex justify-center mb-10">
            <div className="flex gap-2">
              {[...Array(5)].map((_, i) => <Star key={i} className="w-6 h-6 text-[#D4AF37] fill-[#D4AF37]" />)}
            </div>
         </div>
         
         <div className="relative">
            {/* Simple CSS-based auto-scroll or just static elegant cards. Let's do static elegant for reliability, imitating a slider */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {REVIEWS.map((review, idx) => (
                <div key={idx} className="bg-white/5 border border-white/10 p-8 backdrop-blur-sm hover:border-[#D4AF37]/50 transition-colors duration-500 reveal-on-scroll opacity-0 translate-y-10">
                  <p className="font-serif text-white/80 text-lg italic mb-6 leading-relaxed">"{review.text}"</p>
                  <h4 className="font-sans text-[#D4AF37] tracking-widest text-sm uppercase">{review.name}</h4>
                </div>
              ))}
            </div>
         </div>
      </div>
    </section>
  );
};

const Reservation = () => {
  const [formData, setFormData] = useState({ name: '', phone: '', guests: '2', date: '', time: '' });

  const handleBook = (e) => {
    e.preventDefault();
    const message = `*New Reservation Request*%0A%0A*Name:* ${formData.name}%0A*Phone:* ${formData.phone}%0A*Guests:* ${formData.guests}%0A*Date:* ${formData.date}%0A*Time:* ${formData.time}%0A%0AHello, I would like to reserve a table at Bengre Kamat.`;
    window.open(`https://wa.me/971501234567?text=${message}`, '_blank');
  };

  return (
    <section id="reservation" className="py-24 bg-[#0a0a0a] relative">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="flex flex-col lg:flex-row gap-16 items-center">
          
          {/* Reservation Form */}
          <div className="w-full lg:w-1/2 bg-[#111] border border-[#D4AF37]/20 p-8 md:p-12 shadow-2xl reveal-on-scroll opacity-0 translate-y-10 transition-all duration-1000">
            <h2 className="font-serif text-3xl md:text-4xl text-white mb-2">Make a <span className="italic text-[#D4AF37]">Reservation</span></h2>
            <p className="font-sans text-white/60 text-sm mb-8">Secure your table for an unforgettable dining experience.</p>
            
            <form onSubmit={handleBook} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block font-sans text-xs tracking-widest text-[#D4AF37] mb-2 uppercase">Your Name</label>
                  <input required type="text" className="w-full bg-transparent border-b border-white/20 pb-2 text-white focus:outline-none focus:border-[#D4AF37] transition-colors" placeholder="John Doe" 
                    onChange={e => setFormData({...formData, name: e.target.value})}/>
                </div>
                <div>
                  <label className="block font-sans text-xs tracking-widest text-[#D4AF37] mb-2 uppercase">Phone Number</label>
                  <input required type="tel" className="w-full bg-transparent border-b border-white/20 pb-2 text-white focus:outline-none focus:border-[#D4AF37] transition-colors" placeholder="+971 50 XXXXXXX" 
                    onChange={e => setFormData({...formData, phone: e.target.value})}/>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="block font-sans text-xs tracking-widest text-[#D4AF37] mb-2 uppercase">Guests</label>
                  <select className="w-full bg-[#111] border-b border-white/20 pb-2 text-white focus:outline-none focus:border-[#D4AF37] transition-colors cursor-pointer appearance-none"
                    onChange={e => setFormData({...formData, guests: e.target.value})}>
                    {[1,2,3,4,5,6,7,8,"8+"].map(num => <option key={num} value={num}>{num} {num === 1 ? 'Person' : 'People'}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block font-sans text-xs tracking-widest text-[#D4AF37] mb-2 uppercase">Date</label>
                  <input required type="date" className="w-full bg-transparent border-b border-white/20 pb-2 text-white focus:outline-none focus:border-[#D4AF37] transition-colors style-date"
                    onChange={e => setFormData({...formData, date: e.target.value})}/>
                </div>
                <div>
                  <label className="block font-sans text-xs tracking-widest text-[#D4AF37] mb-2 uppercase">Time</label>
                  <input required type="time" className="w-full bg-transparent border-b border-white/20 pb-2 text-white focus:outline-none focus:border-[#D4AF37] transition-colors style-time"
                    onChange={e => setFormData({...formData, time: e.target.value})}/>
                </div>
              </div>

              <button type="submit" className="w-full bg-[#D4AF37] text-black py-4 mt-4 font-sans tracking-widest text-sm hover:bg-white transition-colors duration-300 flex justify-center items-center gap-2">
                BOOK VIA WHATSAPP <MessageCircle className="w-4 h-4" />
              </button>
            </form>
          </div>

          {/* Location Details */}
          <div id="location" className="w-full lg:w-1/2 reveal-on-scroll opacity-0 translate-y-10 transition-all duration-1000 delay-200">
             <div className="h-[300px] w-full border border-white/10 mb-8 relative group">
                {/* Styled Map (Using CSS filter to make default maps dark) */}
                <div className="absolute inset-0 bg-black/50 group-hover:bg-transparent transition-colors z-10 pointer-events-none duration-500"></div>
                <iframe 
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3608.643665725667!2d55.2938473!3d25.2533038!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f433362a26c71%3A0xcb06f52e3e5718a!2sDolphin%20Hotel%20Apartments!5e0!3m2!1sen!2sae!4v1715000000000!5m2!1sen!2sae" 
                  width="100%" height="100%" style={{ border: 0, filter: 'invert(90%) hue-rotate(180deg) contrast(100%)' }} allowFullScreen="" loading="lazy">
                </iframe>
             </div>

             <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <MapPin className="text-[#D4AF37] w-6 h-6 flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-sans text-white uppercase tracking-widest text-sm mb-1">Location</h4>
                    <p className="font-serif text-white/60">Dolphin Hotel Apartments, <br/> Khalid Bin Al Waleed Rd, Dubai, UAE</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Phone className="text-[#D4AF37] w-6 h-6 flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-sans text-white uppercase tracking-widest text-sm mb-1">Contact</h4>
                    <p className="font-serif text-white/60">+971 50 123 4567 <br/> info@bengrekamat.ae</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Clock className="text-[#D4AF37] w-6 h-6 flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-sans text-white uppercase tracking-widest text-sm mb-1">Hours</h4>
                    <p className="font-serif text-white/60">Mon - Sun: 12:00 PM - 11:30 PM <br/> Dress Code: Smart Casual</p>
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
    <footer className="bg-[#050505] pt-20 pb-10 border-t border-white/5 relative">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center md:text-left mb-16">
          
          <div className="flex flex-col items-center md:items-start">
            <div className="flex items-center gap-2 mb-6">
              <ChefHat className="text-[#D4AF37] w-8 h-8" />
              <h2 className="font-serif text-2xl tracking-widest text-white">BENGRE <span className="text-[#D4AF37]">KAMAT</span></h2>
            </div>
            <p className="font-sans text-white/50 text-sm leading-relaxed max-w-xs">
              Redefining coastal Indian luxury dining in the heart of Dubai. An experience of taste, tradition, and elegance.
            </p>
          </div>

          <div className="flex flex-col items-center md:items-start">
            <h4 className="font-sans text-white uppercase tracking-widest text-sm mb-6">Quick Links</h4>
            <div className="space-y-3 flex flex-col font-serif text-white/60">
              <a href="#about" className="hover:text-[#D4AF37] transition-colors">Our Story</a>
              <a href="#menu" className="hover:text-[#D4AF37] transition-colors">The Menu</a>
              <a href="#gallery" className="hover:text-[#D4AF37] transition-colors">Gallery</a>
              <a href="#reservation" className="hover:text-[#D4AF37] transition-colors">Private Dining</a>
            </div>
          </div>

          <div className="flex flex-col items-center md:items-start">
            <h4 className="font-sans text-white uppercase tracking-widest text-sm mb-6">Connect</h4>
            <div className="flex gap-4 mb-6">
              <a href="#" className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-white/60 hover:text-[#D4AF37] hover:border-[#D4AF37] transition-all"><Instagram className="w-4 h-4" /></a>
              <a href="#" className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-white/60 hover:text-[#D4AF37] hover:border-[#D4AF37] transition-all"><Facebook className="w-4 h-4" /></a>
            </div>
            <p className="font-sans text-white/40 text-xs uppercase tracking-widest">Newsletter</p>
            <div className="mt-2 flex w-full max-w-xs border-b border-white/20 pb-2">
              <input type="email" placeholder="YOUR EMAIL" className="bg-transparent text-white text-sm focus:outline-none w-full placeholder-white/30" />
              <button className="text-[#D4AF37] text-sm tracking-widest hover:text-white transition-colors">SUBSCRIBE</button>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center text-center gap-4">
          <p className="font-sans text-white/30 text-xs tracking-widest">
            &copy; {new Date().getFullYear()} BENGRE KAMAT RESTAURANT LLC. ALL RIGHTS RESERVED.
          </p>
          <div className="flex gap-6 font-sans text-white/30 text-xs tracking-widest">
            <a href="#" className="hover:text-white">PRIVACY POLICY</a>
            <a href="#" className="hover:text-white">TERMS OF SERVICE</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

const WhatsAppFab = () => {
  return (
    <a 
      href="https://wa.me/971501234567?text=Hello,%20I%20want%20to%20reserve%20a%20table%20at%20Bengre%20Kamat%20Restaurant" 
      target="_blank" 
      rel="noreferrer"
      className="fixed bottom-6 right-6 z-50 bg-[#25D366] text-white p-4 rounded-full shadow-[0_0_20px_rgba(37,211,102,0.5)] hover:scale-110 hover:shadow-[0_0_30px_rgba(37,211,102,0.8)] transition-all duration-300 group"
      aria-label="Book on WhatsApp"
    >
      <MessageCircle className="w-7 h-7" />
      <span className="absolute right-full mr-4 top-1/2 -translate-y-1/2 bg-black/80 backdrop-blur border border-white/10 text-white text-xs px-3 py-1.5 rounded-sm opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap font-sans tracking-widest">
        Book via WhatsApp
      </span>
    </a>
  );
};

// --- MAIN APP ---

export default function App() {
  useScrollReveal();

  return (
    <div className="bg-[#0a0a0a] min-h-screen font-sans selection:bg-[#D4AF37] selection:text-black">
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