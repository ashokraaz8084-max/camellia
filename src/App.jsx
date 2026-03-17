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
    --maroon: #2A0808;
    --maroon-light: #4A0404;
    --ivory: #FDF5E6;
  }

  body {
    background-color: var(--dark);
    color: var(--ivory);
    font-family: 'Poppins', sans-serif;
    overflow-x: hidden;
    scroll-behavior: smooth;
  }

  /* Custom Scrollbar */
  ::-webkit-scrollbar {
    width: 6px;
  }
  ::-webkit-scrollbar-track {
    background: var(--darker);
  }
  ::-webkit-scrollbar-thumb {
    background: var(--maroon-light);
    border-radius: 10px;
  }
  ::-webkit-scrollbar-thumb:hover {
    background: var(--gold);
  }

  .font-playfair {
    font-family: 'Playfair Display', serif;
  }

  /* Royal Mughal Pattern Overlay */
  .bg-mughal {
    background-color: var(--dark);
    background-image: url("https://www.transparenttextures.com/patterns/arabesque.png");
  }

  /* Animations */
  @keyframes kenburns {
    0% { transform: scale(1); }
    100% { transform: scale(1.15); }
  }
  .animate-kenburns {
    animation: kenburns 30s ease-in-out infinite alternate;
  }

  @keyframes float {
    0% { transform: translateY(0px); }
    50% { transform: translateY(-10px); }
    100% { transform: translateY(0px); }
  }
  .animate-float {
    animation: float 4s ease-in-out infinite;
  }

  /* Glassmorphism & Luxury Utilities */
  .glass {
    background: rgba(5, 5, 5, 0.6);
    backdrop-filter: blur(16px);
    -webkit-backdrop-filter: blur(16px);
    border-bottom: 1px solid rgba(212, 175, 55, 0.1);
  }

  .glass-card {
    background: linear-gradient(145deg, rgba(42,8,8,0.4) 0%, rgba(5,5,5,0.9) 100%);
    backdrop-filter: blur(10px);
    border: 1px solid rgba(212, 175, 55, 0.15);
    box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.7);
    transition: all 0.4s ease;
  }
  
  .glass-card:hover {
    border-color: rgba(212, 175, 55, 0.4);
    box-shadow: 0 12px 40px 0 rgba(212, 175, 55, 0.1);
  }

  .gold-gradient-text {
    background: linear-gradient(to right, #BF953F, #FCF6BA, #B38728, #FBF5B7, #AA771C);
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
  }

  .text-glow {
    text-shadow: 0 0 25px rgba(212, 175, 55, 0.3);
  }

  .map-dark {
    filter: invert(100%) hue-rotate(180deg) brightness(85%) contrast(120%) sepia(30%) hue-rotate(-30deg);
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
    setTimeout(() => setIsLoading(false), 2800);

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
      const phone = "971553995996";
      const message = `*Royal Reservation Request - Taj Mahal Palace* 👑\n\n*Guest Name:* ${formData.name}\n*Contact:* ${formData.phone}\n*Party Size:* ${formData.guests} Guests\n*Date:* ${formData.date}\n*Time:* ${formData.time}\n\nLooking forward to a magnificent dining experience.`;
      const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
      window.open(url, "_blank");
      setIsSubmitting(false);
      
      setFormData({name: '', phone: '', guests: '2', date: '', time: ''});
    }, 1000);
  };

  // --- MENU DATA ---
  // Yahan hum naye working images laga rahe hain jo aapne provide kiye hain
  const menuData = {
    Starters: [
      { name: 'Saffron Malai Tikka', desc: 'Charcoal par bhuna hua chicken, Irani kesar, malai aur elaichi ke saath', price: 'AED 95', img: 'https://image2url.com/r2/default/images/1773770014780-126cca91-0011-4b23-86c7-26c1e6c7c1b6.jpg' },
      { name: 'Royal Galouti Kebab', desc: 'Muh mein pighal jane wale lamb kebabs, 32 shahi masalo ke saath', price: 'AED 120', img: 'https://image2url.com/r2/default/images/1773770053567-e878c456-1837-4987-8b4a-f582d464c8d2.jpg' },
      { name: 'Tandoori Lobster', desc: 'Pura Omani lobster, sarson ke tel aur Kashmiri mirch mein marinated', price: 'AED 280', img: 'https://image2url.com/r2/default/images/1773770086296-8ec9a49a-fca7-4a5c-8929-66200cba760e.jpg' },
      { name: 'Kurkuri Bhindi Chaat', desc: 'Kurkuri bhindi, meetha dahi, imli ki chutney aur anar ke daane', price: 'AED 65', img: 'https://image2url.com/r2/default/images/1773770014780-126cca91-0011-4b23-86c7-26c1e6c7c1b6.jpg' }
    ],
    "Main Course": [
      { name: 'Nalli Nihari', desc: 'Dheemi aanch par paki hui lamb shanks, gulab jal ke saath, 12 ghante tak paki', price: 'AED 165', img: 'https://image2url.com/r2/default/images/1773770053567-e878c456-1837-4987-8b4a-f582d464c8d2.jpg' },
      { name: 'Butter Chicken 1950', desc: 'Hamara khas Purani Dilli style smoked chicken tikka, makhmali tamatar aur kaju ki gravy mein', price: 'AED 110', img: 'https://image2url.com/r2/default/images/1773770086296-8ec9a49a-fca7-4a5c-8929-66200cba760e.jpg' },
      { name: 'Dal Bukhara', desc: 'Kaali daal ko 24 ghante koyale ki aanch par paka kar makkhan ke saath parosa gaya', price: 'AED 85', img: 'https://image2url.com/r2/default/images/1773770014780-126cca91-0011-4b23-86c7-26c1e6c7c1b6.jpg' },
      { name: 'Paneer Pasanda', desc: 'Stuffed paneer, shahi kesar aur badam ki gravy, chandi ke warq ke saath', price: 'AED 90', img: 'https://image2url.com/r2/default/images/1773770053567-e878c456-1837-4987-8b4a-f582d464c8d2.jpg' }
    ],
    Biryani: [
      { name: 'Awadhi Dum Biryani', desc: 'Naram baby lamb, purane basmati chawal aur attar, band peetal ki handi mein paka hua', price: 'AED 145', img: 'https://image2url.com/r2/default/images/1773770086296-8ec9a49a-fca7-4a5c-8929-66200cba760e.jpg' },
      { name: 'Zaffrani Jhinga Biryani', desc: 'Tiger prawns, tateey masale, kesar wale chawal aur bhune hue pyaz', price: 'AED 185', img: 'https://image2url.com/r2/default/images/1773770014780-126cca91-0011-4b23-86c7-26c1e6c7c1b6.jpg' },
      { name: 'Subz Nizami Biryani', desc: 'Mausami sabziyan, paneer, halke Hyderabadi masale aur pudina raita', price: 'AED 95', img: 'https://image2url.com/r2/default/images/1773770053567-e878c456-1837-4987-8b4a-f582d464c8d2.jpg' }
    ],
    Desserts: [
      { name: '24k Gold Shahi Tukda', desc: 'Kurkuri brioche ko kesari rabdi mein dubo kar, 24k sone ka warq aur piste ke saath', price: 'AED 85', img: 'https://image2url.com/r2/default/images/1773770086296-8ec9a49a-fca7-4a5c-8929-66200cba760e.jpg' },
      { name: 'Rasmalai Tres Leches', desc: 'Paneer sponge, teen-doodh aur kesar ka mishran, elaichi ke jhaag ke saath', price: 'AED 75', img: 'https://image2url.com/r2/default/images/1773770014780-126cca91-0011-4b23-86c7-26c1e6c7c1b6.jpg' },
      { name: 'Gulkand Gulab Jamun', desc: 'Gulab jal bhari milk dumplings, vanilla ice cream ke saath garam parosi jati hain', price: 'AED 65', img: 'https://image2url.com/r2/default/images/1773770053567-e878c456-1837-4987-8b4a-f582d464c8d2.jpg' }
    ]
  };

  // Naye gallery images ko replace kiya gaya
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
      <div className="fixed inset-0 z-[100] flex items-center justify-center bg-[#050505] bg-mughal">
        <div className="text-center">
          <h1 className="font-playfair text-4xl md:text-6xl text-[#D4AF37] tracking-widest mb-4 opacity-0 animate-[fadeIn_1s_ease-out_forwards]">TAJ MAHAL</h1>
          <h2 className="font-playfair text-2xl md:text-4xl text-[#FDF5E6] tracking-[0.2em] mb-6 opacity-0 animate-[fadeIn_1s_ease-out_0.5s_forwards]">PALACE</h2>
          <div className="h-[2px] w-0 bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent mx-auto animate-[expand_1.5s_ease-out_1s_forwards]"></div>
          <p className="uppercase tracking-[0.4em] text-xs mt-6 text-[#D4AF37]/70 opacity-0 animate-[fadeIn_1s_ease-out_1.5s_forwards]">Dubai</p>
          <style>{`
            @keyframes expand { to { w-full; max-width: 200px; width: 200px; } }
            @keyframes fadeIn { to { opacity: 1; } }
          `}</style>
        </div>
      </div>
    );
  }

  return (
    <div className="relative bg-[#050505] bg-mughal min-h-screen text-[#FDF5E6] selection:bg-[#D4AF37] selection:text-black">
      
      {/* Navigation - Text Hindi (Latin) mein */}
      <nav className={`fixed w-full z-50 transition-all duration-500 ${scrolled ? 'glass py-4' : 'bg-transparent py-6'}`}>
        <div className="container mx-auto px-6 md:px-12 flex justify-between items-center">
          <div className="flex flex-col">
            <a href="#" className="font-playfair text-2xl tracking-widest text-[#D4AF37] font-semibold leading-none">
              TAJ MAHAL
            </a>
            <span className="font-playfair text-xs tracking-[0.3em] text-[#FDF5E6]/70 mt-1">PALACE</span>
          </div>
          
          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-10">
            {[
              { id: 'story', label: 'Kahani' },
              { id: 'menu', label: 'Menu' },
              { id: 'gallery', label: 'Tasveerein' },
              { id: 'testimonials', label: 'Raay' }
            ].map((item) => (
              <a key={item.id} href={`#${item.id}`} className="text-sm uppercase tracking-widest text-[#FDF5E6]/80 hover:text-[#D4AF37] transition-colors">
                {item.label}
              </a>
            ))}
            <a href="#book" className="px-6 py-2 border border-[#D4AF37] text-[#D4AF37] text-sm uppercase tracking-widest hover:bg-[#D4AF37] hover:text-black transition-all duration-300">
              Table Book Karein
            </a>
          </div>

          {/* Mobile Nav Toggle */}
          <button className="md:hidden text-[#D4AF37]" onClick={() => setIsNavOpen(!isNavOpen)}>
            {isNavOpen ? <X size={28} /> : <MenuIcon size={28} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div className={`fixed inset-0 z-40 bg-gradient-to-b from-[#050505] to-[#2A0808] flex flex-col items-center justify-center space-y-8 transition-all duration-500 ${isNavOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`}>
        {[
          { id: 'story', label: 'Kahani' },
          { id: 'menu', label: 'Menu' },
          { id: 'gallery', label: 'Tasveerein' },
          { id: 'testimonials', label: 'Raay' }
        ].map((item) => (
          <a key={item.id} href={`#${item.id}`} onClick={() => setIsNavOpen(false)} className="font-playfair text-3xl text-[#FDF5E6] hover:text-[#D4AF37] transition-colors">
            {item.label}
          </a>
        ))}
        <a href="#book" onClick={() => setIsNavOpen(false)} className="mt-8 px-8 py-3 bg-[#D4AF37] text-black font-medium tracking-widest uppercase">
          Table Book Karein
        </a>
      </div>

      {/* 1. Hero Section - Updated Image and Hindi Text */}
      <section className="relative h-screen w-full flex items-center justify-center overflow-hidden">
        {/* Background Cinematic Image */}
        <div className="absolute inset-0 z-0">
          <img 
            src="https://image2url.com/r2/default/images/1773770014780-126cca91-0011-4b23-86c7-26c1e6c7c1b6.jpg" 
            alt="Royal Dining" 
            className="w-full h-full object-cover animate-kenburns opacity-50"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-[#2A0808]/40 to-[#050505]"></div>
        </div>

        <div className="relative z-10 text-center px-4 max-w-5xl mx-auto flex flex-col items-center">
          <RevealOnScroll delay={100}>
            <div className="flex items-center justify-center space-x-4 mb-6">
              <span className="w-12 h-[1px] bg-[#D4AF37]"></span>
              <p className="uppercase tracking-[0.4em] text-[#D4AF37] text-sm md:text-base font-medium">Dubai Museum Ke Paas</p>
              <span className="w-12 h-[1px] bg-[#D4AF37]"></span>
            </div>
          </RevealOnScroll>
          <RevealOnScroll delay={300}>
            <h1 className="font-playfair text-5xl md:text-7xl lg:text-8xl text-white mb-6 leading-tight drop-shadow-2xl">
              Jahan Shahi Hindustani Swad <br/>
              <span className="gold-gradient-text text-glow italic">Aur Dubai Ki Luxury Milte Hain</span>
            </h1>
          </RevealOnScroll>
          <RevealOnScroll delay={500}>
            <p className="text-[#FDF5E6]/80 text-lg md:text-xl font-light max-w-2xl mx-auto mb-12">
              Ek shahi daur mein qadam rakhein. Mughal virasat aur aadhunik pak kala ka anokha sangam aapka intezaar kar raha hai.
            </p>
          </RevealOnScroll>
          <RevealOnScroll delay={700}>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <a href="#book" className="px-10 py-4 bg-[#D4AF37] text-black text-sm uppercase tracking-[0.2em] font-medium hover:bg-[#FDF5E6] transition-colors duration-300 border border-[#D4AF37]">
                Table Book Karein
              </a>
              <a href="#menu" className="px-10 py-4 border border-[#D4AF37]/50 text-[#D4AF37] text-sm uppercase tracking-[0.2em] font-medium hover:border-[#D4AF37] hover:bg-[#D4AF37]/10 glass transition-all duration-300">
                Menu Dekhein
              </a>
            </div>
          </RevealOnScroll>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 animate-float">
          <div className="w-[1px] h-20 bg-gradient-to-b from-[#D4AF37] to-transparent mx-auto"></div>
        </div>
      </section>

      {/* 2. About Section */}
      <section id="story" className="py-24 md:py-32 relative">
        <div className="container mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <RevealOnScroll direction="right">
              <div className="relative">
                {/* Decorative Gold Border */}
                <div className="absolute -inset-4 border-2 border-[#D4AF37]/30 translate-x-4 translate-y-4 rounded-sm"></div>
                <img 
                  src="https://image2url.com/r2/default/images/1773769955105-2bfa349d-bf2c-411b-8758-eca75664d507.jpg" 
                  alt="Mughal Spices" 
                  className="relative z-10 w-full h-[600px] object-cover grayscale-[10%] hover:grayscale-0 transition-all duration-700 rounded-sm"
                />
                <div className="absolute bottom-8 -left-8 bg-[#2A0808] p-8 border border-[#D4AF37]/30 z-20 shadow-2xl">
                  <p className="font-playfair text-5xl text-[#D4AF37] mb-2">1920</p>
                  <p className="text-sm uppercase tracking-widest text-[#FDF5E6]/70">Shahi Rasoi Se<br/>Pakwan</p>
                </div>
              </div>
            </RevealOnScroll>
            
            <RevealOnScroll direction="left" delay={200}>
              <div className="max-w-lg pl-0 md:pl-10">
                <h3 className="uppercase tracking-[0.3em] text-[#D4AF37] text-sm mb-4">Hamari Virasat</h3>
                <h2 className="font-playfair text-4xl md:text-5xl mb-8 leading-tight text-white">
                  Shahi Pakwan Ki <br/><span className="italic text-[#D4AF37]">Ek Virasat</span>
                </h2>
                <div className="w-16 h-[1px] bg-[#D4AF37] mb-8"></div>
                <p className="text-[#FDF5E6]/70 leading-relaxed font-light mb-6">
                  Aitihasik Dubai Museum ke paas sthit, Taj Mahal Palace Restaurant mahan Mughal daur ke purane pakwanon ko wapas laya hai. Hum Hindustani mahalon ki shaan aur Dubai ki luxury ka anokha anubhav dete hain.
                </p>
                <p className="text-[#FDF5E6]/70 leading-relaxed font-light mb-10">
                  Hamare master chefs, jo shahi khansama ke vanshaj hain, sabse durlabh masale aur sone ke warq ka upyog karke aise pakwan banate hain jo sirf khana nahi, balki shaan aur jazbe ki kahaniyan hain.
                </p>
                <div className="flex items-center space-x-6">
                  <img src="https://upload.wikimedia.org/wikipedia/commons/f/fa/Signature_of_John_Hancock.svg" className="h-10 opacity-70 invert sepia hue-rotate-15" alt="Chef Signature"/>
                  <div>
                    <p className="mt-1 text-sm tracking-widest uppercase text-[#D4AF37]">Tariq Qureshi</p>
                    <p className="text-xs tracking-widest uppercase text-[#FDF5E6]/50">Mukhya Chef</p>
                  </div>
                </div>
              </div>
            </RevealOnScroll>
          </div>
        </div>
      </section>

      {/* 3. Signature Menu */}
      <section id="menu" className="py-24 md:py-32 relative overflow-hidden bg-gradient-to-b from-[#050505] via-[#2A0808]/10 to-[#050505]">
        
        <div className="container mx-auto px-6 md:px-12 relative z-10">
          <div className="text-center mb-16">
            <RevealOnScroll>
              <h3 className="uppercase tracking-[0.3em] text-[#D4AF37] text-sm mb-4">Shahi Daawat</h3>
              <h2 className="font-playfair text-4xl md:text-5xl mb-6 text-white">Khas Menu</h2>
              <div className="w-24 h-[1px] bg-[#D4AF37] mx-auto"></div>
            </RevealOnScroll>
          </div>

          {/* Menu Categories */}
          <RevealOnScroll delay={200}>
            <div className="flex flex-wrap justify-center gap-6 md:gap-10 mb-16">
              {Object.keys(menuData).map((category) => (
                <button
                  key={category}
                  onClick={() => setActiveMenuTab(category)}
                  className={`text-sm md:text-base uppercase tracking-widest pb-2 transition-all duration-300 border-b-2 ${
                    activeMenuTab === category ? 'border-[#D4AF37] text-[#D4AF37]' : 'border-transparent text-[#FDF5E6]/50 hover:text-white'
                  }`}
                >
                  {category === 'Starters' ? 'Shuruvaat' : category === 'Main Course' ? 'Mukhya Bhojan' : category === 'Biryani' ? 'Biryani' : 'Meetha'}
                </button>
              ))}
            </div>
          </RevealOnScroll>

          {/* Menu Items Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-12">
            {menuData[activeMenuTab].map((item, index) => (
              <RevealOnScroll key={index} delay={index * 150}>
                <div className="group glass-card p-6 flex flex-col sm:flex-row gap-6 items-center sm:items-start rounded-md cursor-pointer">
                  <div className="w-full sm:w-32 h-32 shrink-0 overflow-hidden rounded-md relative border border-[#D4AF37]/20">
                    <div className="absolute inset-0 bg-[#2A0808]/20 group-hover:bg-transparent transition-all z-10"></div>
                    <img 
                      src={item.img} 
                      alt={item.name} 
                      className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                    />
                  </div>
                  <div className="flex-1 w-full text-center sm:text-left">
                    <div className="flex flex-col sm:flex-row justify-between items-baseline mb-3 border-b border-[#D4AF37]/20 pb-3">
                      <h4 className="font-playfair text-xl text-white group-hover:text-[#D4AF37] transition-colors">{item.name}</h4>
                      <span className="text-[#D4AF37] font-medium tracking-wider mt-2 sm:mt-0">{item.price}</span>
                    </div>
                    <p className="text-[#FDF5E6]/70 font-light text-sm leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              </RevealOnScroll>
            ))}
          </div>

          <div className="mt-20 text-center">
             <RevealOnScroll>
               <a href="#book" className="inline-flex items-center text-[#D4AF37] text-sm uppercase tracking-widest hover:text-white transition-colors group border-b border-[#D4AF37] pb-1">
                 Pura Menu Dekhein <ChevronRight className="ml-2 w-4 h-4 transform group-hover:translate-x-2 transition-transform"/>
               </a>
             </RevealOnScroll>
          </div>
        </div>
      </section>

      {/* 4. Gallery Section */}
      <section id="gallery" className="py-24">
        <div className="container mx-auto px-6 md:px-12">
           <RevealOnScroll>
            <div className="flex flex-col md:flex-row justify-between items-end mb-16">
              <div>
                <h3 className="uppercase tracking-[0.3em] text-[#D4AF37] text-sm mb-4">Khoobsurati</h3>
                <h2 className="font-playfair text-4xl md:text-5xl text-white">Mahal Ke Andar Ka Nazara</h2>
              </div>
              <p className="text-[#FDF5E6]/70 max-w-sm font-light mt-6 md:mt-0">
                Bharat ke shahi qilo aur mahalo se prerit architecture aur mahaul mein doob jayein.
              </p>
            </div>
           </RevealOnScroll>

           {/* Masonry-style Grid */}
           <div className="grid grid-cols-1 md:grid-cols-3 gap-4 auto-rows-[300px]">
             {galleryImages.map((src, idx) => (
               <RevealOnScroll key={idx} delay={idx * 100}>
                 <div 
                  className={`relative w-full h-full overflow-hidden group cursor-pointer border border-[#D4AF37]/10 ${idx === 0 ? 'md:col-span-2 md:row-span-2' : ''} ${idx === 3 ? 'md:col-span-2' : ''}`}
                  onClick={() => setLightboxImg(src)}
                 >
                   <div className="absolute inset-0 bg-black/40 group-hover:bg-[#2A0808]/10 transition-colors duration-500 z-10"></div>
                   <img 
                     src={src} 
                     alt="Gallery" 
                     className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-1000"
                     loading="lazy"
                   />
                   <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-20">
                     <span className="bg-[#050505]/80 backdrop-blur-md text-[#D4AF37] px-8 py-3 uppercase tracking-widest text-xs border border-[#D4AF37]/50">Dekhein</span>
                   </div>
                 </div>
               </RevealOnScroll>
             ))}
           </div>
        </div>
      </section>

      {/* Lightbox */}
      {lightboxImg && (
        <div className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-2xl flex items-center justify-center p-4" onClick={() => setLightboxImg(null)}>
          <button className="absolute top-10 right-10 text-white/50 hover:text-[#D4AF37] transition-colors" onClick={() => setLightboxImg(null)}>
            <X size={40} strokeWidth={1}/>
          </button>
          <img src={lightboxImg} alt="Enlarged" className="max-w-full max-h-[90vh] object-contain shadow-2xl border border-[#D4AF37]/20" />
        </div>
      )}

      {/* 5. Customer Testimonials */}
      <section id="testimonials" className="py-24 md:py-32 relative border-y border-[#D4AF37]/10 bg-gradient-to-t from-[#2A0808]/20 to-transparent">
         <div className="container mx-auto px-6 md:px-12 text-center">
            <RevealOnScroll>
              <Quote className="w-12 h-12 text-[#D4AF37]/40 mx-auto mb-8" />
              <h2 className="font-playfair text-4xl text-white mb-16">Shahi Farmaan</h2>
            </RevealOnScroll>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { name: "Ahmed R.", role: "Culinary Critic", text: "Awadhi Dum Biryani ne mujhe seedhe Lucknow ke darbar mein pahuncha diya. Swad ka ek behtareen anubhav. Taj Mahal Palace ne Dubai mein ek naya standard set kiya hai." },
                { name: "Sophia & Liam", role: "Anniversary Celebration", text: "Hamara bilkul shahi andaaz mein swagat kiya gaya. Nalli Nihari behad naram thi, aur mahal jaisa mahaul hamari shaam ko yaadgaar bana gaya." },
                { name: "Priya M.", role: "Global Gourmand", text: "Poori duniya ghoomne ke baad bhi yahan ki Dal Bukhara ka koi muqabla nahi. Rich, smoky aur behad swadisht. Service bhi bahut shaandaar hai." }
              ].map((review, idx) => (
                <RevealOnScroll key={idx} delay={idx * 200}>
                  <div className="glass-card p-10 text-left h-full flex flex-col justify-between hover:-translate-y-2 transition-transform duration-500 rounded-lg">
                    <div>
                      <div className="flex text-[#D4AF37] mb-6">
                        {[...Array(5)].map((_, i) => <Star key={i} size={16} fill="currentColor" />)}
                      </div>
                      <p className="text-[#FDF5E6]/80 font-light leading-relaxed mb-8 italic">"{review.text}"</p>
                    </div>
                    <div className="border-t border-[#D4AF37]/20 pt-6">
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
      <section id="book" className="py-0 flex flex-col md:flex-row bg-[#050505]">
        
        {/* Reservation Form */}
        <div className="w-full md:w-1/2 p-8 md:p-20 flex items-center justify-center relative bg-gradient-to-r from-[#2A0808]/10 to-transparent">
          <div className="w-full max-w-md relative z-10">
            <RevealOnScroll>
              <h3 className="uppercase tracking-[0.3em] text-[#D4AF37] text-sm mb-4">Booking</h3>
              <h2 className="font-playfair text-4xl md:text-5xl mb-8 text-white">Apna Singhasan Book Karein</h2>
              <p className="text-[#FDF5E6]/60 font-light mb-10 text-sm">6 mehmaano se zyada ki shahi daawat ke liye, kripya hamare concierge se sidhe WhatsApp par sampark karein.</p>
            </RevealOnScroll>

            <RevealOnScroll delay={200}>
              <form onSubmit={handleBookTable} className="space-y-8">
                <div className="group relative">
                  <input type="text" required value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} placeholder="Mehmaan Ka Naam" className="w-full bg-transparent border-b border-[#D4AF37]/30 pb-3 text-white focus:outline-none focus:border-[#D4AF37] transition-colors font-light placeholder-[#FDF5E6]/40" />
                </div>
                <div className="group relative">
                  <input type="tel" required value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})} placeholder="Phone Number" className="w-full bg-transparent border-b border-[#D4AF37]/30 pb-3 text-white focus:outline-none focus:border-[#D4AF37] transition-colors font-light placeholder-[#FDF5E6]/40" />
                </div>
                <div className="grid grid-cols-2 gap-8">
                  <div className="group relative">
                    <select value={formData.guests} onChange={(e) => setFormData({...formData, guests: e.target.value})} className="w-full bg-transparent border-b border-[#D4AF37]/30 pb-3 text-white focus:outline-none focus:border-[#D4AF37] transition-colors font-light appearance-none cursor-pointer">
                      <option value="1" className="bg-[#050505] text-white">1 Mehmaan</option>
                      <option value="2" className="bg-[#050505] text-white">2 Mehmaan</option>
                      <option value="3" className="bg-[#050505] text-white">3 Mehmaan</option>
                      <option value="4" className="bg-[#050505] text-white">4 Mehmaan</option>
                      <option value="5" className="bg-[#050505] text-white">5 Mehmaan</option>
                      <option value="6" className="bg-[#050505] text-white">6 Mehmaan</option>
                    </select>
                  </div>
                  <div className="group relative">
                    <input type="date" required value={formData.date} onChange={(e) => setFormData({...formData, date: e.target.value})} className="w-full bg-transparent border-b border-[#D4AF37]/30 pb-3 text-[#FDF5E6]/80 focus:outline-none focus:border-[#D4AF37] transition-colors font-light [color-scheme:dark]" />
                  </div>
                </div>
                <div className="group relative">
                  <input type="time" required value={formData.time} onChange={(e) => setFormData({...formData, time: e.target.value})} className="w-full bg-transparent border-b border-[#D4AF37]/30 pb-3 text-[#FDF5E6]/80 focus:outline-none focus:border-[#D4AF37] transition-colors font-light [color-scheme:dark]" />
                </div>
                <button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="w-full mt-10 py-5 bg-[#D4AF37] text-black uppercase tracking-[0.2em] font-medium hover:bg-[#FDF5E6] transition-all duration-300 disabled:opacity-70 flex justify-center items-center group shadow-[0_0_20px_rgba(212,175,55,0.2)] hover:shadow-[0_0_30px_rgba(212,175,55,0.5)]"
                >
                  {isSubmitting ? 'Shahi Farmaan Confirm Ho Raha Hai...' : 'Reservation Request Karein'}
                  {!isSubmitting && <ChevronRight className="ml-2 w-5 h-5 transform group-hover:translate-x-2 transition-transform"/>}
                </button>
              </form>
            </RevealOnScroll>
          </div>
        </div>

        {/* Google Map Integration */}
        <div className="w-full md:w-1/2 h-[500px] md:h-auto relative grayscale-[80%] hover:grayscale-0 transition-all duration-1000 border-l border-[#D4AF37]/10">
           {/* Approximate Dubai Museum Location Embed */}
           <iframe 
             src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3608.274191390467!2d55.29528911501062!3d25.261358983866164!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f433a5f2e8f1d%3A0x6b8c8d8c2e6f4977!2sDubai%20Museum!5e0!3m2!1sen!2sae!4v1710000000000!5m2!1sen!2sae" 
             className="w-full h-full border-0 map-dark" 
             allowFullScreen="" 
             loading="lazy" 
             referrerPolicy="no-referrer-when-downgrade"
             title="Taj Mahal Palace Location"
           ></iframe>
           <div className="absolute inset-0 bg-black/10 pointer-events-none"></div>
        </div>

      </section>

      {/* Footer */}
      <footer className="bg-[#020202] pt-24 pb-12 border-t border-[#D4AF37]/20 relative overflow-hidden">
        {/* Decorative corner accents */}
        <div className="absolute top-0 left-0 w-32 h-32 border-t border-l border-[#D4AF37]/20 opacity-50"></div>
        <div className="absolute top-0 right-0 w-32 h-32 border-t border-r border-[#D4AF37]/20 opacity-50"></div>

        <div className="container mx-auto px-6 md:px-12 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
            <div className="md:col-span-1">
              <h2 className="font-playfair text-3xl text-[#D4AF37] tracking-widest mb-2 leading-none">TAJ MAHAL</h2>
              <p className="font-playfair text-sm text-[#FDF5E6]/70 tracking-[0.3em] mb-6">PALACE</p>
              <p className="text-[#FDF5E6]/60 font-light text-sm leading-relaxed mb-6">
                Bharat ke shahi darbar ka ek swadisht praman, jo luxury Dubai ke dil mein sthit hai.
              </p>
              <div className="flex space-x-5 text-[#D4AF37]">
                <a href="#" className="hover:text-white transition-colors"><Instagram size={20} /></a>
                <a href="#" className="hover:text-white transition-colors"><Facebook size={20} /></a>
              </div>
            </div>
            
            <div>
              <h4 className="text-white uppercase tracking-widest text-sm mb-6 font-medium">Sampark</h4>
              <ul className="space-y-4 text-[#FDF5E6]/70 font-light text-sm">
                <li className="flex items-center"><Phone size={16} className="mr-3 text-[#D4AF37]"/> +971 55 399 5996</li>
                <li className="flex items-start">
                  <MapPin size={16} className="mr-3 mt-1 shrink-0 text-[#D4AF37]"/> 
                  Bombay Laundry Building,<br/>Shop #5 & 6, Ground Floor,<br/>6th Street, Dubai Museum Ke Paas,<br/>Dubai, UAE
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-white uppercase tracking-widest text-sm mb-6 font-medium">Shahi Samay</h4>
              <ul className="space-y-4 text-[#FDF5E6]/70 font-light text-sm">
                <li className="flex items-start"><Clock size={16} className="mr-3 mt-1 shrink-0 text-[#D4AF37]"/> Som - Ravi<br/>12:00 PM - 02:00 AM</li>
              </ul>
            </div>

            <div>
              <h4 className="text-white uppercase tracking-widest text-sm mb-6 font-medium">Shahi Khabrein</h4>
              <p className="text-[#FDF5E6]/70 font-light text-sm mb-4">Khas daawat ke invites aur naye menu ke liye subscribe karein.</p>
              <div className="flex border-b border-[#D4AF37]/40 pb-2 group">
                <input type="email" placeholder="Email Pata" className="bg-transparent w-full focus:outline-none text-sm font-light text-white placeholder-[#FDF5E6]/40" />
                <button className="text-[#D4AF37] group-hover:text-white transition-colors"><ChevronRight size={20}/></button>
              </div>
            </div>
          </div>

          <div className="border-t border-[#D4AF37]/10 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-[#FDF5E6]/40 tracking-widest uppercase">
            <p>&copy; {new Date().getFullYear()} Taj Mahal Palace Restaurant. All rights reserved.</p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="hover:text-[#D4AF37] transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-[#D4AF37] transition-colors">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>

      {/* Floating WhatsApp Button */}
      <a 
        href="https://wa.me/971553995996?text=Namaste%20Taj%20Mahal%20Palace%2C%20mujhe%20reservation%20ke%20baare%20mein%20puchna%20hai." 
        target="_blank" 
        rel="noopener noreferrer"
        className="fixed bottom-8 right-8 z-[90] bg-gradient-to-r from-[#D4AF37] to-[#B38728] text-black p-4 rounded-full shadow-[0_0_20px_rgba(212,175,55,0.4)] hover:scale-110 transition-transform duration-300 animate-bounce group"
      >
        <MessageCircle size={28} />
        <span className="absolute right-full mr-4 top-1/2 -translate-y-1/2 bg-[#050505]/90 backdrop-blur-md border border-[#D4AF37]/30 text-[#FDF5E6] text-xs whitespace-nowrap px-4 py-2 rounded shadow-xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
          Concierge Ko Message Karein
        </span>
      </a>

    </div>
  );
}