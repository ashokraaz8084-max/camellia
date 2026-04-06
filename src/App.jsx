import React, { useState, useEffect } from 'react';
import { 
  Phone, 
  MapPin, 
  MessageCircle, 
  Menu, 
  X, 
  Award, 
  HeartPulse, 
  Stethoscope, 
  Microscope,
  Send, 
  CheckCircle2,
  Instagram, 
  Facebook, 
  Linkedin, 
  ShieldCheck, 
  Sparkles, 
  Globe, 
  Quote, 
  Zap, 
  Fingerprint, 
  ArrowRight, 
  Star, 
  Lock, 
  Clock, 
  Activity,
  Image as ImageIcon
} from 'lucide-react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';

// --- Global Configuration ---

const CLINIC_INFO = {
  name: "CAMELLIA",
  fullName: "Camellia Medical Center / مركز الكاميليا الطبي",
  arabicName: "مركز الكاميليا الطبي",
  subBrand: "KALBA ATELIER",
  address: "Sharjah - Kalba, UAE",
  phone: "+971 55 106 1400",
  whatsapp: "+971 55 106 1400", // Update this line with your new WhatsApp number
  email: "registry@camelliamedical.ae",
  workingHours: "Sat - Thu: 09:00 AM - 09:00 PM"
};

const IMAGES = {
  hero: "https://image2url.com/r2/default/images/1775069808968-618b2e26-587a-40cd-a3a5-aa771994e40c.jpg",
  about: "https://image2url.com/r2/default/images/1775069511420-9a842cbe-f895-4d8d-a2ea-4035610e4ef7.jpg",
  service1: "https://image2url.com/r2/default/images/1775069673139-a7c830f5-9374-49d3-ab45-95369149740b.jpg",
  service2: "https://image2url.com/r2/default/images/1775069967168-8118aafb-9e5a-4d98-9e14-1d8078f71253.jpg",
  service3: "https://image2url.com/r2/default/images/1775069634349-7f628750-d699-4d23-9e89-cce329e900a2.jpg",
  doctor1: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=800",
  doctor2: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=800",
  reception: "https://image2url.com/r2/default/images/1775069932331-02eaab84-d6b2-4111-82a6-95f6cf02c04b.jpg",
  gallery1: "https://image2url.com/r2/default/images/1775069849227-f68c6702-d1b1-4478-82f1-14b9c241b4a6.jpg"
};

// --- Sub-Components (Mobile First Optimized) ---

const LuxuryReveal = ({ children, delay = 0 }) => (
  <div className="overflow-hidden">
    <motion.div
      initial={{ y: "100%", opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  </div>
);

const SectionHeader = ({ number, title, subtitle, light = false }) => (
  <div className="mb-8 md:mb-20">
    <div className="flex items-center gap-3 md:gap-6 mb-4 md:mb-6 overflow-hidden">
      <span className="text-[10px] font-bold tracking-[0.4em] md:tracking-[0.5em] text-[#C5A059]">{number}</span>
      <motion.div 
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
        className={`h-[1px] w-8 md:w-24 origin-left ${light ? 'bg-white/20' : 'bg-[#0A192F]/10'}`} 
      />
      <span className={`text-[7px] md:text-[9px] uppercase tracking-[0.4em] md:tracking-[0.6em] font-bold ${light ? 'text-white/40' : 'text-gray-400'}`}>{subtitle}</span>
    </div>
    <h2 className={`text-4xl md:text-7xl lg:text-8xl font-serif font-light leading-[1.1] tracking-tighter ${light ? 'text-white' : 'text-[#0A192F]'}`}>
      {title}
    </h2>
  </div>
);

const ServiceCard = ({ title, desc, img, index, icon }) => (
  <motion.div 
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-50px" }}
    transition={{ delay: index * 0.1 }}
    className="group relative h-[320px] md:h-[450px] lg:h-[550px] overflow-hidden cursor-pointer rounded-[24px] md:rounded-[40px] shadow-[2px_2px_2px_gray] bg-black"
  >
    <img src={img} className="w-full h-full object-cover opacity-70 md:opacity-60 grayscale-[10%] md:grayscale-[30%] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-[2s]" alt={title} />
    <div className="absolute inset-0 bg-gradient-to-t from-[#0A192F] via-[#0A192F]/40 to-transparent opacity-90 md:opacity-80" />
    <div className="absolute top-4 right-4 md:top-6 md:right-6 text-white/50 group-hover:text-[#C5A059] transition-colors duration-500">
      {icon}
    </div>
    <div className="absolute bottom-0 left-0 p-5 md:p-8 lg:p-10 w-full transform md:group-hover:-translate-y-4 transition-transform duration-500">
      <p className="text-[7px] md:text-[9px] font-bold tracking-[0.3em] md:tracking-[0.4em] text-[#C5A059] mb-2 uppercase">Atelier Focus</p>
      <h3 className="text-2xl md:text-3xl font-serif text-white mb-2 md:mb-4 leading-tight">{title}</h3>
      <p className="text-white/70 text-[9px] md:text-xs tracking-widest uppercase mb-3 md:mb-6 line-clamp-2 leading-relaxed">{desc}</p>
      <div className="flex justify-between items-center overflow-hidden h-6">
        <ArrowRight className="text-white transform md:-translate-x-12 md:group-hover:translate-x-0 transition-all duration-500" size={18} />
      </div>
    </div>
  </motion.div>
);

// --- Main Application ---

export default function App() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [registryStatus, setRegistryStatus] = useState('idle');

  const { scrollYProgress } = useScroll();
  const heroY = useTransform(scrollYProgress, [0, 0.5], [0, 60]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.4], [1, 0]);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleRegistrySubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const name = formData.get('fullName');
    const contact = formData.get('contactPoint');
    const service = formData.get('specialization');

    // Create WhatsApp message format
    const message = `*New Appointment Request - ${CLINIC_INFO.name}*\n\n` +
                    `👤 Name: ${name}\n` +
                    `📱 Contact: ${contact}\n` +
                    `🏥 Service: ${service}\n\n` +
                    `Sent from ${CLINIC_INFO.name} Digital Atelier`;

    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${CLINIC_INFO.whatsapp.replace(/\D/g, '')}?text=${encodedMessage}`;

    setRegistryStatus('submitting');
    
    // Simulate slight delay before redirecting to WhatsApp
    setTimeout(() => {
      window.open(whatsappUrl, '_blank');
      setRegistryStatus('success');
    }, 1500);
  };

  return (
    <div className="bg-[#FAF9F6] text-[#0A192F] font-sans selection:bg-[#C5A059] selection:text-white relative overflow-x-hidden w-full">
      
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;600;700&family=Playfair+Display:ital,wght@0,400;0,700;1,400&family=Amiri&display=swap');
        .font-serif { font-family: 'Playfair Display', serif; }
        .font-sans { font-family: 'Montserrat', sans-serif; }
        .font-arabic { font-family: 'Amiri', serif; }
        
        .gold-leaf {
          background: linear-gradient(135deg, #C5A059 0%, #F1E2C2 50%, #C5A059 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .grain-texture {
          position: fixed;
          top: 0; left: 0; width: 100%; height: 100%;
          background: url('https://www.transparenttextures.com/patterns/felt.png');
          opacity: 0.03;
          pointer-events: none;
          z-index: 9999;
        }

        .premium-input {
          background: transparent;
          border-bottom: 1px solid rgba(10, 25, 47, 0.15);
          padding: 0.75rem 0;
          width: 100%;
          font-size: 0.875rem;
          font-weight: 400;
          transition: all 0.3s ease;
          border-radius: 0;
        }
        
        @media (min-width: 768px) {
          .premium-input { font-size: 1rem; padding: 1rem 0; }
        }

        .premium-input:focus {
          border-bottom: 1px solid #C5A059;
          outline: none;
        }
        
        /* Mobile fast-scroll snap for reviews/gallery */
        .hide-scrollbar::-webkit-scrollbar { display: none; }
        .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>

      <div className="grain-texture" />

      {/* --- Responsive Navigation (Mobile Optimized Header) --- */}
      <nav className={`fixed top-0 left-0 w-full z-[100] transition-all duration-500 ${isScrolled ? 'bg-white/95 backdrop-blur-xl py-3 shadow-[2px_2px_2px_gray] border-b border-[#C5A059]/10' : 'bg-transparent py-4 md:py-8'}`}>
        <div className="container mx-auto px-5 md:px-10 flex justify-between items-center">
          <div className="flex flex-col group cursor-pointer z-[111]">
            <span className={`text-lg md:text-2xl font-serif tracking-tighter transition-colors ${isScrolled || isMenuOpen ? 'text-[#0A192F]' : 'text-white'}`}>
              {CLINIC_INFO.name}
            </span>
            <span className={`text-[5px] md:text-[6px] tracking-[0.8em] font-bold uppercase mt-1 ${isScrolled || isMenuOpen ? 'text-[#C5A059]' : 'text-white/70'}`}>
              {CLINIC_INFO.subBrand}
            </span>
          </div>

          <div className="hidden lg:flex items-center gap-10">
            {['Expertise', 'Gallery', 'Reviews', 'The Board', 'Appointment'].map((item) => (
              <a 
                key={item}
                href={`#${item.toLowerCase().replace(' ', '')}`} 
                className={`text-[9px] uppercase tracking-[0.4em] font-bold transition-all hover:text-[#C5A059] relative group ${isScrolled ? 'text-[#0A192F]' : 'text-white'}`}
              >
                {item}
                <span className="absolute -bottom-2 left-0 w-0 h-[1px] bg-[#C5A059] transition-all group-hover:w-full" />
              </a>
            ))}
          </div>

          <div className="flex items-center gap-3 md:gap-8">
            <a 
              href="#appointment"
              className={`px-4 py-2 md:px-8 md:py-3 text-[8px] md:text-[9px] font-bold uppercase tracking-[0.2em] md:tracking-[0.4em] transition-all border rounded-full ${isScrolled ? 'bg-[#0A192F] text-white border-[#0A192F]' : 'bg-white/10 text-white border-white/20 hover:bg-white hover:text-[#0A192F]'}`}
            >
              Book<span className="hidden sm:inline"> Now</span>
            </a>
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className={`p-1 md:p-2 z-[111] transition-colors ${isScrolled || isMenuOpen ? 'text-[#0A192F]' : 'text-white'}`}>
              {isMenuOpen ? <X size={24}/> : <Menu size={24}/>}
            </button>
          </div>
        </div>
      </nav>

      {/* --- Mobile Fullscreen Menu --- */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: '-100%' }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: '-100%' }}
            transition={{ type: "tween", duration: 0.4 }}
            className="fixed inset-0 z-[105] bg-[#FAF9F6] text-[#0A192F] pt-24 pb-8 px-6 flex flex-col justify-between"
          >
            <div className="flex flex-col gap-6 text-center mt-10">
              {['Expertise', 'Gallery', 'Reviews', 'The Board', 'Appointment'].map((item) => (
                <a 
                  key={item} 
                  href={`#${item.toLowerCase().replace(' ', '')}`} 
                  onClick={() => setIsMenuOpen(false)} 
                  className="text-4xl sm:text-5xl font-serif text-[#0A192F] hover:text-[#C5A059] transition-colors"
                >
                  {item}
                </a>
              ))}
            </div>
            <div className="space-y-3 border-t border-[#0A192F]/10 pt-6 text-center">
              <p className="text-[9px] uppercase tracking-widest text-[#C5A059] font-bold">Concierge Line</p>
              <p className="text-xl sm:text-2xl font-serif">{CLINIC_INFO.phone}</p>
              <p className="text-[9px] uppercase tracking-widest px-4 text-gray-500">{CLINIC_INFO.address}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* --- Hero Section (Mobile Viewport Optimized svh) --- */}
      <section className="relative h-[100svh] min-h-[600px] flex items-center justify-center overflow-hidden bg-black text-center w-full">
        <motion.div style={{ y: heroY, opacity: heroOpacity }} className="absolute inset-0">
          <img src={IMAGES.hero} alt="Luxury Interior" className="w-full h-full object-cover opacity-60 grayscale-[10%] scale-105" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0A192F]/80 via-[#0A192F]/40 to-[#FAF9F6]" />
        </motion.div>

        <div className="container mx-auto px-5 relative z-10 text-center mt-10">
          <LuxuryReveal delay={0.1}>
            <span className="inline-block text-[#C5A059] text-[8px] md:text-[10px] tracking-[0.6em] md:tracking-[1.2em] uppercase font-bold mb-4 md:mb-6">
              KALBA FLAGSHIP ATELIER
            </span>
          </LuxuryReveal>
          
          <LuxuryReveal delay={0.3}>
            <h1 className="text-5xl sm:text-7xl md:text-[100px] lg:text-[120px] font-serif text-white font-light tracking-tighter leading-[1] mb-2 uppercase">
              {CLINIC_INFO.name}
            </h1>
            <h2 className="text-2xl sm:text-4xl md:text-[60px] font-serif gold-leaf font-light italic mb-6 md:mb-10 leading-none">
              Medical Center
            </h2>
          </LuxuryReveal>

          <LuxuryReveal delay={0.5}>
             <p className="text-xl sm:text-2xl md:text-[34px] font-arabic text-[#E2D1B3] tracking-wide mb-8 md:mb-12 opacity-90 leading-relaxed uppercase">
               {CLINIC_INFO.arabicName}
             </p>
          </LuxuryReveal>

          <LuxuryReveal delay={0.7}>
            <div className="flex flex-col items-center gap-6 md:gap-10 pt-6 md:pt-12 border-t border-white/10 w-full max-w-2xl mx-auto">
              <p className="text-[#E2D1B3]/70 text-[9px] md:text-[12px] tracking-[0.2em] md:tracking-[0.4em] font-light leading-relaxed uppercase text-center px-4">
                Bespoke Aesthetic & Medical Excellence. <br className="hidden sm:block" />
                A biological sanctuary in Sharjah.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-6 w-full px-4 sm:px-0 sm:justify-center">
                 <a href="#appointment" className="w-full sm:w-auto px-8 py-4 bg-[#C5A059] text-white text-[9px] md:text-[10px] font-bold uppercase tracking-[0.3em] shadow-[2px_2px_2px_gray] rounded-full text-center active:scale-95 transition-transform">
                   Book Appointment
                 </a>
                 <a href={`https://wa.me/${CLINIC_INFO.whatsapp.replace(/\D/g, '')}`} target="_blank" rel="noreferrer" className="w-full sm:w-auto px-8 py-4 border border-white/20 backdrop-blur-md text-white text-[9px] md:text-[10px] font-bold uppercase tracking-[0.3em] flex items-center justify-center gap-3 rounded-full shadow-[2px_2px_2px_gray] active:scale-95 transition-transform">
                   <MessageCircle size={16} className="text-[#25D366]" />
                   WhatsApp
                 </a>
              </div>
            </div>
          </LuxuryReveal>
        </div>
      </section>

      {/* --- Section 01: Heritage (Mobile First Flow) --- */}
      <section id="about" className="py-16 md:py-40 bg-white relative overflow-hidden">
        <div className="container mx-auto px-5 md:px-10">
          <div className="flex flex-col lg:grid lg:grid-cols-12 gap-10 md:gap-20 items-center">
            
            <div className="col-span-12 lg:col-span-5 order-2 lg:order-1 text-center lg:text-left w-full">
              <SectionHeader number="01" title="The Legacy" subtitle="Bespoke Care" />
              <p className="text-gray-500 text-sm md:text-lg font-light leading-relaxed mb-8 md:mb-12 max-w-lg mx-auto lg:mx-0">
                Located in Sharjah - Kalba, {CLINIC_INFO.fullName} is where clinical precision meets unparalleled luxury across Dermatology, Dentistry, Laser Therapy, and traditional Cupping.
              </p>
              <div className="grid grid-cols-2 gap-3 md:gap-6 w-full">
                 {[
                   { t: "Dental Tech", i: <Zap size={18}/> },
                   { t: "Dermatology", i: <Sparkles size={18}/> },
                   { t: "Board Experts", i: <Award size={18}/> },
                   { t: "Holistic Care", i: <Activity size={18}/> }
                 ].map((item, i) => (
                   <div key={i} className="flex flex-col gap-2 md:gap-4 p-4 md:p-6 bg-[#FAF9F6] rounded-[20px] md:rounded-[30px] shadow-[2px_2px_2px_gray] border border-gray-50 items-center lg:items-start">
                      <div className="text-[#C5A059]">{item.i}</div>
                      <span className="text-[7px] md:text-[8px] font-bold uppercase tracking-[0.1em] text-gray-700">{item.t}</span>
                   </div>
                 ))}
              </div>
            </div>

            <div className="col-span-12 lg:col-span-7 order-1 lg:order-2 w-full">
               <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true, margin: "-50px" }}>
                 <div className="rounded-[24px] md:rounded-[40px] overflow-hidden shadow-[2px_2px_2px_gray] aspect-square md:aspect-auto md:h-[600px]">
                    <img src={IMAGES.about} className="w-full h-full object-cover grayscale-[10%] hover:grayscale-0 transition-all duration-1000" alt="Excellence" />
                 </div>
               </motion.div>
            </div>

          </div>
        </div>
      </section>

      {/* --- Section 02: Expertise --- */}
      <section id="expertise" className="py-16 md:py-40 bg-[#0A192F] text-white">
        <div className="container mx-auto px-5 md:px-10">
          <SectionHeader number="02" title="Our Expertise" subtitle="Excellence Centres" light />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
             <ServiceCard title="Dental Care" desc="Premium clinical care & aesthetic smile design." img={IMAGES.service1} index={0} icon={<Zap size={24}/>} />
             <ServiceCard title="Dermatology" desc="Advanced skincare & molecular rejuvenation." img={IMAGES.service2} index={1} icon={<Activity size={24}/>} />
             <ServiceCard title="Laser" desc="Precision laser treatments & aesthetic refinement." img={IMAGES.service3} index={2} icon={<Sparkles size={24}/>} />
             <ServiceCard title="Cupping" desc="Traditional holistic therapy for vitality." img={IMAGES.about} index={3} icon={<HeartPulse size={24}/>} />
          </div>
        </div>
      </section>

      {/* --- Section 03: The Gallery (Mobile Optimized Grid) --- */}
      <section id="gallery" className="py-16 md:py-40 bg-[#FAF9F6] relative overflow-hidden">
        <div className="container mx-auto px-5 md:px-10">
          <SectionHeader number="03" title="The Gallery" subtitle="Visual Excellence - معرض الصور" />
          
          {/* Mobile: Horizontal Scroll Snap, Desktop: Grid */}
          <div className="flex overflow-x-auto snap-x snap-mandatory gap-4 pb-8 md:grid md:grid-cols-4 md:gap-6 md:overflow-visible hide-scrollbar">
             
             <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="snap-center shrink-0 w-[85vw] md:w-auto md:col-span-2 md:row-span-2 h-[400px] md:h-[624px] rounded-[24px] md:rounded-[40px] overflow-hidden group shadow-[2px_2px_2px_gray] relative">
                <img src={IMAGES.hero} alt="Gallery 1" className="w-full h-full object-cover grayscale-[10%] group-hover:grayscale-0 transition-all duration-1000" />
                <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-all" />
             </motion.div>
             
             <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="snap-center shrink-0 w-[70vw] md:w-auto h-[400px] md:h-[300px] rounded-[24px] md:rounded-[30px] overflow-hidden group shadow-[2px_2px_2px_gray] relative">
                <img src={IMAGES.service1} alt="Gallery 2" className="w-full h-full object-cover grayscale-[10%] group-hover:grayscale-0 transition-all duration-1000" />
             </motion.div>
             
             <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="snap-center shrink-0 w-[70vw] md:w-auto h-[400px] md:h-[300px] rounded-[24px] md:rounded-[30px] overflow-hidden group shadow-[2px_2px_2px_gray] relative">
                <img src={IMAGES.service2} alt="Gallery 3" className="w-full h-full object-cover grayscale-[10%] group-hover:grayscale-0 transition-all duration-1000" />
             </motion.div>
             
             <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="snap-center shrink-0 w-[85vw] md:w-auto md:col-span-2 h-[400px] md:h-[300px] rounded-[24px] md:rounded-[30px] overflow-hidden group shadow-[2px_2px_2px_gray] relative">
                <img src={IMAGES.reception} alt="Gallery 4" className="w-full h-full object-cover grayscale-[10%] group-hover:grayscale-0 transition-all duration-1000 object-center" />
             </motion.div>

          </div>
          
          {/* Mobile scroll indicator */}
          <div className="flex md:hidden justify-center items-center gap-2 mt-2 text-[#C5A059] opacity-50">
            <span className="text-[8px] uppercase tracking-widest font-bold">Swipe</span>
            <ArrowRight size={12} />
          </div>
        </div>
      </section>

      {/* --- Section 04: Client Reviews --- */}
      <section id="reviews" className="py-16 md:py-40 bg-white">
        <div className="container mx-auto px-5 md:px-10">
          <SectionHeader number="04" title="Client Voices" subtitle="Testimonials - آراء العملاء" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-10">
             {[
               { name: "Fatima S.", text: "The cupping therapy completely relieved my back pain. A luxurious clinic in Kalba.", textAr: "علاج الحجامة خفف آلام ظهري تماماً. عيادة فاخرة حقاً في كلباء." },
               { name: "Khalid R.", text: "Dr. Saad Alidein is a master. My skin treatments showed immediate results.", textAr: "الدكتور سعد الدين خبير حقيقي. علاجات بشرتي أظهرت نتائج فورية." },
               { name: "Aisha M.", text: "Exceptional service! The dental team is incredibly professional and caring.", textAr: "خدمة استثنائية! فريق طب الأسنان محترف ومهتم للغاية." }
             ].map((review, i) => (
               <motion.div 
                 key={i}
                 initial={{ opacity: 0, y: 30 }}
                 whileInView={{ opacity: 1, y: 0 }}
                 viewport={{ once: true }}
                 transition={{ delay: i * 0.1 }}
                 className="bg-[#FAF9F6] p-6 md:p-10 rounded-[24px] md:rounded-[30px] shadow-[2px_2px_2px_gray] border border-gray-50 flex flex-col justify-between"
               >
                 <div>
                   <Quote className="text-[#C5A059] opacity-20 mb-4 w-8 h-8 md:w-10 md:h-10" />
                   <p className="text-gray-600 font-light leading-relaxed mb-4 text-sm italic">"{review.text}"</p>
                   <p className="text-gray-500 font-arabic leading-relaxed mb-6 text-sm">"{review.textAr}"</p>
                 </div>
                 <div className="pt-4 border-t border-gray-100">
                   <div className="flex gap-1 mb-2">
                     {[...Array(5)].map((_, starIndex) => (
                       <Star key={starIndex} size={12} className="text-[#C5A059] fill-[#C5A059]" />
                     ))}
                   </div>
                   <h4 className="text-[10px] font-bold uppercase tracking-widest text-[#0A192F]">{review.name}</h4>
                   <p className="text-[7px] text-gray-400 uppercase tracking-[0.2em] mt-1">Verified Patient - مريض موثق</p>
                 </div>
               </motion.div>
             ))}
          </div>
        </div>
      </section>

      {/* --- Section 05: The Board --- */}
      <section id="theboard" className="py-16 md:py-40 bg-[#FAF9F6] text-center md:text-left">
        <div className="container mx-auto px-5 md:px-10">
          <div className="text-center mb-10 md:mb-24">
             <SectionHeader number="05" title="Medical Board" subtitle="Authority" />
             <p className="text-gray-500 text-sm md:text-lg font-light leading-relaxed max-w-2xl mx-auto">
               Our medical specialists are leaders dedicated to your transformation and vitality.
             </p>
          </div>
           <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-10">
              {/* Main Doctor */}
              <div className="p-6 md:p-10 bg-white rounded-[24px] md:rounded-[30px] shadow-[2px_2px_2px_gray] border border-gray-50 text-center group">
                 <div className="rounded-xl md:rounded-2xl overflow-hidden mb-6 aspect-square md:aspect-auto md:h-72">
                    <img src={IMAGES.doctor1} className="w-full h-full object-cover grayscale-[10%] group-hover:grayscale-0 transition-all duration-500" alt="Dr. Saad Alidein" />
                 </div>
                 <p className="text-[7px] md:text-[9px] font-bold uppercase tracking-widest text-[#C5A059] mb-2">Medical Director - المدير الطبي</p>
                 <h4 className="text-lg md:text-2xl font-serif text-[#0A192F]">Dr. Saad Alidein</h4>
              </div>
              
              <div className="p-6 md:p-10 bg-white rounded-[24px] md:rounded-[30px] shadow-[2px_2px_2px_gray] border border-gray-50 text-center group">
                 <div className="rounded-xl md:rounded-2xl overflow-hidden mb-6 aspect-square md:aspect-auto md:h-72">
                    <img src={IMAGES.doctor2} className="w-full h-full object-cover grayscale-[10%] group-hover:grayscale-0 transition-all duration-500" alt="Specialist Panel" />
                 </div>
                 <p className="text-[7px] md:text-[9px] font-bold uppercase tracking-widest text-[#C5A059] mb-2">Clinical Team</p>
                 <h4 className="text-lg md:text-2xl font-serif text-[#0A192F]">Expert Panel</h4>
              </div>

              <div className="p-8 md:p-12 bg-[#0A192F] rounded-[24px] md:rounded-[30px] shadow-[2px_2px_2px_gray] flex flex-col justify-center items-center text-center text-white h-full min-h-[300px]">
                 <Star className="text-[#C5A059] mb-4 md:mb-8" size={32} />
                 <h5 className="text-base md:text-xl font-serif mb-4 md:mb-6 uppercase tracking-widest">Governance</h5>
                 <p className="text-[9px] md:text-[10px] text-gray-400 uppercase tracking-widest leading-loose italic max-w-[200px]">
                   "Preserving biological heritage with elite standards in Kalba."
                 </p>
              </div>
           </div>
        </div>
      </section>

      {/* --- Section 06: Contact & Location --- */}
      <section id="contact" className="py-16 md:py-40 bg-white">
        <div className="container mx-auto px-5 md:px-10">
          <SectionHeader number="06" title="Find Us" subtitle="Kalba Headquarters" />
          
          <div className="flex flex-col lg:grid lg:grid-cols-12 gap-8 md:gap-12 items-stretch">
            {/* Contact Details Card */}
            <div className="lg:col-span-5 w-full">
              <div className="p-6 md:p-12 bg-[#FAF9F6] rounded-[24px] md:rounded-[40px] shadow-[2px_2px_2px_gray] border border-gray-50 flex flex-col justify-center h-full space-y-8 md:space-y-12">
                
                  <div className="flex gap-4 md:gap-6 items-start">
                    <div className="w-10 h-10 md:w-14 md:h-14 rounded-full bg-white flex items-center justify-center text-[#C5A059] shadow-[2px_2px_2px_gray] shrink-0">
                      <MapPin size={20} className="md:w-6 md:h-6" />
                    </div>
                    <div>
                      <p className="text-[8px] md:text-[10px] font-bold uppercase tracking-[0.3em] text-[#0A192F] mb-1 md:mb-2">Address - العنوان</p>
                      <p className="text-xs md:text-sm font-light leading-relaxed text-gray-500 uppercase tracking-widest">{CLINIC_INFO.address}</p>
                    </div>
                  </div>
                  
                  <div className="flex gap-4 md:gap-6 items-start">
                    <div className="w-10 h-10 md:w-14 md:h-14 rounded-full bg-white flex items-center justify-center text-[#C5A059] shadow-[2px_2px_2px_gray] shrink-0">
                      <Phone size={20} className="md:w-6 md:h-6" />
                    </div>
                    <div>
                      <p className="text-[8px] md:text-[10px] font-bold uppercase tracking-[0.3em] text-[#0A192F] mb-1 md:mb-2">Concierge - اتصل بنا</p>
                      <p className="text-lg md:text-2xl font-serif text-[#0A192F]">{CLINIC_INFO.phone}</p>
                    </div>
                  </div>

                  <div className="flex gap-4 md:gap-6 items-start">
                    <div className="w-10 h-10 md:w-14 md:h-14 rounded-full bg-white flex items-center justify-center text-[#C5A059] shadow-[2px_2px_2px_gray] shrink-0">
                      <Clock size={20} className="md:w-6 md:h-6" />
                    </div>
                    <div>
                      <p className="text-[8px] md:text-[10px] font-bold uppercase tracking-[0.3em] text-[#0A192F] mb-1 md:mb-2">Hours - ساعات العمل</p>
                      <p className="text-xs md:text-sm font-light text-gray-500 uppercase tracking-widest">{CLINIC_INFO.workingHours}</p>
                    </div>
                  </div>

              </div>
            </div>

            {/* Map Simulation Card */}
            <div className="lg:col-span-7 w-full h-[300px] md:h-auto min-h-[300px]">
              <div className="h-full w-full bg-gray-100 rounded-[24px] md:rounded-[40px] shadow-[2px_2px_2px_gray] overflow-hidden relative grayscale-[20%] group hover:grayscale-0 transition-all duration-1000">
                <img src={IMAGES.reception} className="w-full h-full object-cover" alt="Clinic Interior" />
                <div className="absolute inset-0 bg-[#0A192F]/40 md:bg-black/20" />
                <div className="absolute inset-0 flex items-center justify-center p-4">
                   <div className="bg-white/95 backdrop-blur-md p-6 md:p-8 rounded-[20px] shadow-[2px_2px_2px_gray] text-center max-w-sm w-full">
                      <MapPin className="text-[#C5A059] mx-auto mb-3 md:mb-4" size={28} />
                      <h4 className="text-base md:text-lg font-serif text-[#0A192F] mb-2">{CLINIC_INFO.name} CENTER</h4>
                      <p className="text-[8px] md:text-[10px] uppercase tracking-widest text-gray-500 mb-4 md:mb-6">{CLINIC_INFO.address}</p>
                      <a 
                        href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(CLINIC_INFO.fullName + ' ' + CLINIC_INFO.address)}`} 
                        target="_blank" 
                        rel="noreferrer"
                        className="w-full block md:inline-block md:w-auto px-6 py-3 bg-[#0A192F] text-white text-[8px] md:text-[9px] font-bold uppercase tracking-widest rounded-full active:bg-[#C5A059] md:hover:bg-[#C5A059] transition-all"
                      >
                        Get Directions
                      </a>
                   </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- Section 07: Book Appointment --- */}
      <section id="appointment" className="py-16 md:py-40 bg-[#FAF9F6] relative">
         <div className="container mx-auto px-5 md:px-10">
            <div className="flex flex-col lg:flex-row gap-10 lg:gap-24">
               
               <div className="lg:w-2/5 flex flex-col justify-center text-center lg:text-left w-full">
                  <SectionHeader number="07" title="Book Appointment" subtitle="Digital Atelier" />
                  <p className="text-gray-500 font-light text-base md:text-xl leading-relaxed mb-4 md:mb-6">
                    Your journey to wellness begins here. Submit your request to connect with our WhatsApp concierge.
                  </p>
                  <p className="text-gray-500 font-arabic text-lg md:text-xl mb-8 md:mb-12">
                    رحلتك نحو العافية المطلقة تبدأ من هنا. سيتم تحويل طلبك لخدمة الكونسيرج عبر الواتساب.
                  </p>
                  
                  <div className="hidden md:grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4">
                     <div className="flex gap-4 p-5 bg-white rounded-[20px] shadow-[2px_2px_2px_gray] border border-gray-50">
                        <Lock size={18} className="text-[#C5A059] shrink-0" />
                        <div className="text-left">
                           <p className="text-[8px] uppercase font-bold text-[#0A192F]">Secure Channel - قناة آمنة</p>
                           <p className="text-[9px] text-gray-400 leading-tight mt-1">Direct to clinic reception.</p>
                        </div>
                     </div>
                     <div className="flex gap-4 p-5 bg-white rounded-[20px] shadow-[2px_2px_2px_gray] border border-gray-50">
                        <Clock size={18} className="text-[#C5A059] shrink-0" />
                        <div className="text-left">
                           <p className="text-[8px] uppercase font-bold text-[#0A192F]">Fast Response - استجابة سريعة</p>
                           <p className="text-[9px] text-gray-400 leading-tight mt-1">Instant WhatsApp connection.</p>
                        </div>
                     </div>
                  </div>
               </div>

               <div className="lg:w-3/5 w-full">
                  <div className="bg-white p-6 md:p-12 lg:p-16 rounded-[24px] md:rounded-[40px] shadow-[2px_2px_2px_gray] border border-gray-50">
                     <AnimatePresence mode="wait">
                        {registryStatus === 'success' ? (
                           <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-8 md:py-10">
                              <CheckCircle2 size={50} className="text-[#C5A059] mx-auto mb-4" />
                              <h3 className="text-xl md:text-2xl font-serif mb-3 text-[#0A192F]">Message Generated</h3>
                              <p className="text-gray-500 text-xs md:text-sm mb-6">Please complete the send process in WhatsApp.</p>
                              <button onClick={() => setRegistryStatus('idle')} className="text-[#C5A059] text-[9px] md:text-[10px] font-bold uppercase tracking-widest border-b border-[#C5A059] pb-1">New Request - طلب جديد</button>
                           </motion.div>
                        ) : (
                           <form onSubmit={handleRegistrySubmit} className="space-y-6 md:space-y-10">
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10">
                                 <div className="relative">
                                    <label className="text-[7px] md:text-[8px] uppercase tracking-widest text-gray-400 mb-1 block">Full Identity - الاسم الكامل</label>
                                    <input name="fullName" required type="text" className="premium-input" placeholder="e.g. John Doe" />
                                 </div>
                                 <div className="relative">
                                    <label className="text-[7px] md:text-[8px] uppercase tracking-widest text-gray-400 mb-1 block">Contact Point - رقم التواصل</label>
                                    <input name="contactPoint" required type="tel" className="premium-input" placeholder="Phone Number" />
                                 </div>
                              </div>
                              <div className="relative">
                                 <label className="text-[7px] md:text-[8px] uppercase tracking-widest text-gray-400 mb-1 block">Service - الخدمة المطلوبة</label>
                                 <select name="specialization" className="premium-input appearance-none bg-transparent">
                                    <option>Dental Care - طب الأسنان</option>
                                    <option>Dermatology - الجلدية</option>
                                    <option>Laser Treatments - الليزر</option>
                                    <option>Cupping Therapy - الحجامة</option>
                                 </select>
                              </div>
                              <button type="submit" className="w-full py-4 md:py-6 bg-[#0A192F] text-[#E2D1B3] rounded-full uppercase tracking-[0.2em] md:tracking-[0.3em] font-bold text-[9px] md:text-[10px] active:scale-95 transition-transform shadow-[2px_2px_2px_gray] text-center flex items-center justify-center gap-2 mt-4">
                                 {registryStatus === 'submitting' ? 'Opening WhatsApp...' : 'Confirm via WhatsApp - تأكيد عبر واتساب'}
                                 <MessageCircle size={16} />
                              </button>
                           </form>
                        )}
                     </AnimatePresence>
                  </div>
               </div>

            </div>
         </div>
      </section>

      {/* --- Footer --- */}
      <footer className="bg-white py-12 md:py-32 border-t border-gray-100">
         <div className="container mx-auto px-5 md:px-10 text-center md:text-left">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 md:gap-16 mb-16 md:mb-20">
               
               <div className="space-y-4 md:space-y-6">
                  <div className="flex flex-col">
                     <span className="text-2xl md:text-3xl font-serif text-[#0A192F]">{CLINIC_INFO.name}</span>
                     <span className="text-[7px] md:text-[9px] tracking-widest font-bold text-[#C5A059] uppercase mt-1">The Kalba Atelier</span>
                  </div>
                  <p className="text-gray-400 text-[10px] md:text-xs leading-loose uppercase tracking-widest">The pinnacle of health and aesthetics in Sharjah.</p>
               </div>
               
               <div>
                  <h4 className="text-[9px] uppercase tracking-widest font-bold text-[#C5A059] mb-4 md:mb-8 text-center md:text-left">Location</h4>
                  <ul className="space-y-3">
                     <li className="flex flex-col md:flex-row gap-2 md:gap-3 items-center md:items-start">
                        <MapPin size={14} className="text-[#C5A059] shrink-0" />
                        <span className="text-[9px] md:text-[10px] text-gray-500 font-bold uppercase tracking-widest leading-loose text-center md:text-left">{CLINIC_INFO.address}</span>
                     </li>
                     <li className="flex flex-col md:flex-row gap-2 md:gap-3 items-center">
                        <Phone size={14} className="text-[#C5A059] shrink-0" />
                        <span className="text-[9px] md:text-[10px] text-gray-500 font-bold uppercase tracking-widest">{CLINIC_INFO.phone}</span>
                     </li>
                  </ul>
               </div>

               <div>
                  <h4 className="text-[9px] uppercase tracking-widest font-bold text-[#C5A059] mb-4 md:mb-8 text-center md:text-left">Atelier</h4>
                  <ul className="space-y-3 text-[9px] md:text-[10px] text-gray-500 font-bold uppercase tracking-widest text-center md:text-left">
                     <li><a href="#appointment" className="hover:text-[#0A192F] transition-colors">Book Appointment</a></li>
                     <li><a href={`https://wa.me/${CLINIC_INFO.whatsapp.replace(/\D/g, '')}`} className="hover:text-[#0A192F] transition-colors">WhatsApp Concierge</a></li>
                     <li><a href="#expertise" className="hover:text-[#0A192F] transition-colors">Services Portal</a></li>
                  </ul>
               </div>

               <div className="space-y-8">
                  <h4 className="text-[9px] uppercase tracking-widest font-bold text-[#C5A059] mb-4 md:mb-8 text-center md:text-left">Connect</h4>
                  <div className="flex gap-4 justify-center md:justify-start">
                     <a href="https://www.instagram.com/camellia.medical?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" target="_blank" rel="noreferrer" className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-[#FAF9F6] flex items-center justify-center shadow-[2px_2px_2px_gray] hover:bg-[#E4405F] hover:text-white transition-all"><Instagram size={14} className="md:w-[18px] md:h-[18px]" /></a>
                     <a href="#" className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-[#FAF9F6] flex items-center justify-center shadow-[2px_2px_2px_gray] hover:bg-[#1877F2] hover:text-white transition-all"><Facebook size={14} className="md:w-[18px] md:h-[18px]" /></a>
                     <a href="#" className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-[#FAF9F6] flex items-center justify-center shadow-[2px_2px_2px_gray] hover:bg-[#0077B5] hover:text-white transition-all"><Linkedin size={14} className="md:w-[18px] md:h-[18px]" /></a>
                  </div>
               </div>

            </div>
            
            <div className="pt-8 md:pt-10 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center gap-4 text-[7px] md:text-[8px] uppercase tracking-widest text-gray-400 font-bold text-center">
               <p>© 2024 {CLINIC_INFO.fullName} • Sharjah, UAE</p>
               <div className="flex gap-6">
                  <a href="#" className="hover:text-[#0A192F]">Confidentiality</a>
                  <a href="#" className="hover:text-[#0A192F]">Governance</a>
               </div>
            </div>
         </div>
      </footer>

      {/* --- Floating Utilities (Mobile Optimized) --- */}
      
      {/* WhatsApp FAB */}
      <a 
        href={`https://wa.me/${CLINIC_INFO.whatsapp.replace(/\D/g, '')}`} 
        target="_blank" rel="noreferrer"
        className="fixed bottom-5 left-5 md:bottom-8 md:left-8 z-[90] bg-white p-2 md:p-3 rounded-full shadow-[2px_2px_2px_gray] flex items-center gap-2 group hover:bg-[#25D366] transition-all duration-500 active:scale-95"
      >
        <div className="p-2 md:p-3 bg-[#25D366] rounded-full text-white shadow-md md:group-hover:scale-110 transition-transform"><MessageCircle size={18} className="md:w-5 md:h-5"/></div>
        <span className="hidden lg:inline text-[10px] font-bold uppercase tracking-[0.3em] pr-4 group-hover:text-white">Concierge</span>
      </a>

      {/* Assistant Toggle */}
      <div className="fixed bottom-5 right-5 md:bottom-8 md:right-8 z-[90]">
        <AnimatePresence>
          {isChatOpen && (
            <motion.div 
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.95 }}
              className="mb-4 w-[calc(100vw-40px)] sm:w-[380px] bg-white shadow-[2px_2px_2px_gray] border border-[#C5A059]/20 rounded-[24px] overflow-hidden origin-bottom-right absolute bottom-full right-0"
            >
               <div className="bg-[#0A192F] p-5 md:p-6 text-white flex justify-between items-center">
                  <div className="flex items-center gap-3">
                     <div className="w-10 h-10 border border-[#C5A059] rounded-full flex items-center justify-center italic font-serif text-[#C5A059] text-xl">C</div>
                     <div>
                        <h6 className="text-[9px] font-bold uppercase tracking-widest">Assistant</h6>
                        <p className="text-[7px] text-[#C5A059] uppercase animate-pulse">Online</p>
                     </div>
                  </div>
                  <button onClick={() => setIsChatOpen(false)} className="opacity-50 hover:opacity-100 p-1"><X size={20}/></button>
               </div>
               <div className="p-6 h-[250px] md:h-[300px] bg-[#FAF9F6] overflow-y-auto text-xs font-light leading-loose italic text-gray-500 text-center flex items-center justify-center">
                  "Welcome to Camellia Medical Center. How may I assist your health or aesthetic journey today?"
               </div>
               <div className="p-4 md:p-5 bg-white border-t border-gray-50 flex gap-3 items-center">
                  <input className="flex-1 text-[10px] font-light uppercase tracking-widest focus:outline-none" placeholder="Type inquiry..." />
                  <button className="text-[#C5A059] active:scale-90 transition-transform p-1"><Send size={18}/></button>
               </div>
            </motion.div>
          )}
        </AnimatePresence>
        
        <button 
          onClick={() => setIsChatOpen(!isChatOpen)}
          className="bg-[#0A192F] text-[#C5A059] p-3 md:p-4 lg:px-8 lg:py-5 rounded-full flex items-center gap-3 shadow-[2px_2px_2px_gray] hover:bg-[#C5A059] hover:text-white transition-all duration-500 active:scale-95"
        >
          <span className="hidden lg:inline text-[10px] font-bold uppercase tracking-[0.3em]">Assistant</span>
          <Fingerprint size={24} className="md:w-7 md:h-7"/>
        </button>
      </div>

    </div>
  );
}