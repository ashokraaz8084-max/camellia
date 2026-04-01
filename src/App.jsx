import React, { useState, useEffect, useRef } from 'react';
import { 
  Phone, 
  MapPin, 
  Calendar, 
  MessageCircle, 
  ChevronRight, 
  Menu, 
  X, 
  Award, 
  Users, 
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
  Diamond,
  UserCheck,
  Star,
  Lock,
  Clock
} from 'lucide-react';
import { motion, AnimatePresence, useScroll, useTransform, useInView } from 'framer-motion';

// --- Global Configuration ---

const CLINIC_INFO = {
  name: "Abha Medical Center",
  arabicName: "مركز أبها الطبي",
  address: "Premium Medical District, Downtown Dubai, UAE",
  phone: "+971 56 148 7176",
  email: "registry@abhamedical.ae"
};

const IMAGES = {
  hero: "https://image2url.com/r2/default/images/1775069808968-618b2e26-587a-40cd-a3a5-aa771994e40c.jpg",
  about: "https://image2url.com/r2/default/images/1775069511420-9a842cbe-f895-4d8d-a2ea-4035610e4ef7.jpg",
  service1: "https://image2url.com/r2/default/images/1775069673139-a7c830f5-9374-49d3-ab45-95369149740b.jpg",
  service2: "https://image2url.com/r2/default/images/1775069967168-8118aafb-9e5a-4d98-9e14-1d8078f71253.jpg",
  service3: "https://image2url.com/r2/default/images/1775069634349-7f628750-d699-4d23-9e89-cce329e900a2.jpg",
  doctor1: "https://image2url.com/r2/default/images/1775069604126-268569d7-8548-49fa-9a11-3fa7d4813935.jpg",
  doctor2: "https://image2url.com/r2/default/images/1775069849227-f68c6702-d1b1-4478-82f1-14b9c241b4a6.jpg",
  reception: "https://image2url.com/r2/default/images/1775069932331-02eaab84-d6b2-4111-82a6-95f6cf02c04b.jpg"
};

// --- Sub-Components (Premium Atoms) ---

const LuxuryText = ({ children, delay = 0 }) => (
  <div className="overflow-hidden">
    <motion.div
      initial={{ y: "100%", opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 1.2, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  </div>
);

const SectionHeader = ({ number, title, subtitle, light = false }) => (
  <div className="mb-12 md:mb-24">
    <div className="flex items-center gap-4 md:gap-6 mb-6 md:mb-8 overflow-hidden">
      <span className="text-[10px] font-bold tracking-[0.5em] text-[#C5A059]">{number}</span>
      <motion.div 
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.5 }}
        className={`h-[1px] w-12 md:w-24 origin-left ${light ? 'bg-white/20' : 'bg-[#0A192F]/10'}`} 
      />
      <span className={`text-[8px] md:text-[9px] uppercase tracking-[0.6em] font-bold ${light ? 'text-white/40' : 'text-gray-400'}`}>{subtitle}</span>
    </div>
    <h2 className={`text-3xl md:text-8xl font-serif font-light leading-tight tracking-tighter ${light ? 'text-white' : 'text-[#0A192F]'}`}>
      {title}
    </h2>
  </div>
);

const ServiceCard = ({ title, desc, img, index }) => (
  <motion.div 
    initial={{ opacity: 0, y: 50 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay: index * 0.1 }}
    className="group relative h-[450px] md:h-[600px] overflow-hidden cursor-pointer rounded-[30px] md:rounded-[40px] shadow-[2px_2px_15px_rgba(0,0,0,0.1)] bg-black"
  >
    <img src={img} className="w-full h-full object-cover opacity-60 grayscale-[30%] group-hover:grayscale-0 group-hover:scale-110 transition-all duration-[2.5s]" alt={title} />
    <div className="absolute inset-0 bg-gradient-to-t from-[#0A192F] via-transparent to-transparent opacity-80" />
    <div className="absolute bottom-0 left-0 p-6 md:p-10 w-full transform group-hover:-translate-y-2 transition-transform duration-700">
      <p className="text-[8px] md:text-[10px] font-bold tracking-[0.4em] text-[#C5A059] mb-2 md:mb-4 uppercase">Center of Excellence</p>
      <h3 className="text-xl md:text-3xl font-serif text-white mb-3 md:mb-6 leading-tight">{title}</h3>
      <p className="text-white/70 text-[10px] md:text-xs tracking-widest uppercase mb-4 md:mb-8 line-clamp-2 leading-relaxed">{desc}</p>
      <div className="flex justify-between items-center overflow-hidden h-6">
        <ArrowRight className="text-white transform -translate-x-12 group-hover:translate-x-0 transition-all duration-700" size={20} />
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
  const heroY = useTransform(scrollYProgress, [0, 0.5], [0, 80]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.4], [1, 0]);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleRegistrySubmit = (e) => {
    e.preventDefault();
    setRegistryStatus('submitting');
    setTimeout(() => setRegistryStatus('success'), 2500);
  };

  return (
    <div className="bg-[#FAF9F6] text-[#0A192F] font-sans selection:bg-[#C5A059] selection:text-white relative overflow-x-hidden">
      
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;600;700&family=Playfair+Display:ital,wght@0,400;0,700;1,400&display=swap');
        .font-serif { font-family: 'Playfair Display', serif; }
        .font-sans { font-family: 'Montserrat', sans-serif; }
        
        .gold-leaf {
          background: linear-gradient(135deg, #C5A059 0%, #F1E2C2 50%, #C5A059 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .grain-texture {
          position: fixed;
          top: 0; left: 0; width: 100%; height: 100%;
          background: url('https://www.transparenttextures.com/patterns/felt.png');
          opacity: 0.04;
          pointer-events: none;
          z-index: 9999;
        }

        .premium-input {
          background: transparent;
          border-bottom: 1px solid rgba(10, 25, 47, 0.1);
          padding: 1rem 0;
          width: 100%;
          font-size: 1rem;
          font-weight: 300;
          transition: all 0.5s ease;
        }

        .premium-input:focus {
          border-bottom: 1px solid #C5A059;
          outline: none;
        }

        @media (max-width: 768px) {
          .mobile-p-top { padding-top: 100px; }
        }
      `}</style>

      <div className="grain-texture" />

      {/* --- Responsive Navigation --- */}
      <nav className={`fixed top-0 left-0 w-full z-[100] transition-all duration-1000 ${isScrolled ? 'bg-white/95 backdrop-blur-xl py-3 shadow-sm border-b border-[#C5A059]/10' : 'bg-transparent py-6 md:py-10'}`}>
        <div className="container mx-auto px-6 md:px-10 flex justify-between items-center">
          <div className="flex flex-col group cursor-pointer">
            <span className={`text-xl md:text-3xl font-serif tracking-tighter transition-colors ${isScrolled ? 'text-[#0A192F]' : 'text-white'}`}>ABHA</span>
            <span className="text-[6px] md:text-[7px] tracking-[0.8em] font-bold text-[#C5A059] uppercase mt-1">Dubai Atelier</span>
          </div>

          <div className="hidden lg:flex items-center gap-12">
            {['Expertise', 'The Board', 'Registry'].map((item) => (
              <a 
                key={item}
                href={`#${item.toLowerCase().replace(' ', '')}`} 
                className={`text-[9px] uppercase tracking-[0.5em] font-bold transition-all hover:text-[#C5A059] relative group ${isScrolled ? 'text-[#0A192F]' : 'text-white'}`}
              >
                {item}
                <span className="absolute -bottom-2 left-0 w-0 h-[1px] bg-[#C5A059] transition-all group-hover:w-full" />
              </a>
            ))}
          </div>

          <div className="flex items-center gap-4 md:gap-10">
            <a 
              href="#registry"
              className={`hidden sm:block px-6 md:px-10 py-3 md:py-4 text-[8px] md:text-[9px] font-bold uppercase tracking-[0.4em] transition-all border rounded-full ${isScrolled ? 'bg-[#0A192F] text-white border-[#0A192F]' : 'bg-white/10 text-white border-white/20 hover:bg-white hover:text-[#0A192F]'}`}
            >
              Registry
            </a>
            <button onClick={() => setIsMenuOpen(true)} className="text-[#C5A059] p-2"><Menu size={28}/></button>
          </div>
        </div>
      </nav>

      {/* --- Mobile Fullscreen Menu --- */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-[110] bg-[#0A192F] text-white p-8 flex flex-col justify-between"
          >
            <div className="flex justify-between items-center">
              <span className="text-2xl font-serif">ABHA</span>
              <button onClick={() => setIsMenuOpen(false)} className="text-[#C5A059] p-2"><X size={32}/></button>
            </div>
            
            <div className="flex flex-col gap-6 text-center">
              {['Expertise', 'The Board', 'Registry', 'Home'].map((item) => (
                <a 
                  key={item} 
                  href={`#${item.toLowerCase()}`} 
                  onClick={() => setIsMenuOpen(false)}
                  className="text-4xl font-serif hover:italic hover:text-[#C5A059] transition-all"
                >
                  {item}
                </a>
              ))}
            </div>

            <div className="space-y-4 border-t border-white/10 pt-8">
              <p className="text-[10px] uppercase tracking-widest text-[#C5A059] text-center">Contact our Concierge</p>
              <p className="text-xl font-light text-center">{CLINIC_INFO.phone}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* --- Hero Section (Optimized for Mobile Height) --- */}
      <section className="relative h-[90vh] md:h-screen flex items-center justify-center overflow-hidden bg-black">
        <motion.div style={{ y: heroY, opacity: heroOpacity }} className="absolute inset-0">
          <img src={IMAGES.hero} alt="Luxury Interior" className="w-full h-full object-cover opacity-60 grayscale-[15%] scale-105" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0A192F]/90 via-transparent to-[#FAF9F6]" />
        </motion.div>

        <div className="container mx-auto px-6 relative z-10 text-center">
          <LuxuryText delay={0.2}>
            <span className="inline-block text-[#C5A059] text-[8px] md:text-[10px] tracking-[0.8em] md:tracking-[1.5em] uppercase font-bold mb-4 md:mb-8">Downtown Dubai flagship</span>
          </LuxuryText>
          
          <LuxuryText delay={0.4}>
            <h1 className="text-4xl md:text-[140px] font-serif text-white font-light tracking-tighter leading-none mb-1 md:mb-2">
              ABHA
            </h1>
            <h2 className="text-2xl md:text-[80px] font-serif gold-leaf font-light italic mb-8 md:mb-12 leading-none">
              Medical Center
            </h2>
          </LuxuryText>

          <LuxuryText delay={0.8}>
            <div className="flex flex-col items-center gap-8 md:gap-12 pt-8 md:pt-16 border-t border-white/5">
              <p className="text-[#E2D1B3]/50 max-w-xl text-[10px] md:text-[14px] tracking-[0.3em] md:tracking-[0.5em] font-light leading-relaxed uppercase text-center">
                Bespoke Healthcare Excellence. <br />
                A biological sanctuary for patients.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 md:gap-8 items-center justify-center w-full max-w-xs sm:max-w-none mx-auto">
                 <a 
                   href="#registry" 
                   className="px-10 md:px-16 py-4 md:py-6 bg-[#C5A059] text-white text-[9px] md:text-[10px] font-bold uppercase tracking-[0.4em] shadow-2xl rounded-full hover:bg-white hover:text-[#0A192F] transition-all duration-700 w-full sm:w-auto"
                 >
                   Book Appointment
                 </a>
                 <a 
                   href="https://wa.me/971561487176" 
                   target="_blank" 
                   rel="noreferrer" 
                   className="px-10 md:px-12 py-4 md:py-6 border border-white/20 backdrop-blur-md text-white text-[9px] md:text-[10px] font-bold uppercase tracking-[0.4em] flex items-center gap-3 rounded-full hover:bg-white/10 transition-all duration-500 w-full sm:w-auto justify-center"
                 >
                   <MessageCircle size={18} className="text-[#25D366]" />
                   WhatsApp
                 </a>
              </div>
            </div>
          </LuxuryText>
        </div>
      </section>

      {/* --- Section 01: Heritage (Responsive Layout) --- */}
      <section id="about" className="py-24 md:py-60 bg-white relative overflow-hidden">
        <div className="container mx-auto px-6 md:px-10">
          <div className="flex flex-col lg:grid lg:grid-cols-12 gap-12 md:gap-20 items-center">
            <div className="col-span-12 lg:col-span-5 order-2 lg:order-1 text-center lg:text-left">
              <SectionHeader number="01" title="The Legacy" subtitle="Bespoke Care" />
              <p className="text-gray-500 text-base md:text-xl font-light leading-loose mb-10 md:mb-12 mx-auto lg:mx-0 max-w-lg">
                Located in the heart of Dubai, Abha Medical Center is where clinical precision meets unparalleled luxury.
              </p>
              <div className="grid grid-cols-2 gap-4 md:gap-12">
                 {[
                   { t: "Elite Tech", i: <Microscope size={20}/> },
                   { t: "Discretion", i: <ShieldCheck size={20}/> },
                   { t: "Board Experts", i: <Award size={20}/> },
                   { t: "Global Access", i: <Globe size={20}/> }
                 ].map((item, i) => (
                   <div key={i} className="flex flex-col gap-3 p-4 md:p-8 bg-[#FAF9F6] rounded-[25px] md:rounded-[40px] shadow-[2px_2px_15px_rgba(0,0,0,0.05)] border border-gray-50">
                      <div className="text-[#C5A059] mx-auto lg:mx-0">{item.i}</div>
                      <span className="text-[8px] md:text-[9px] font-bold uppercase tracking-[0.2em]">{item.t}</span>
                   </div>
                 ))}
              </div>
            </div>

            <div className="col-span-12 lg:col-span-7 order-1 lg:order-2 w-full">
               <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="relative"
               >
                 <div className="rounded-[30px] md:rounded-[40px] overflow-hidden shadow-[2px_2px_15px_rgba(0,0,0,0.1)]">
                    <img src={IMAGES.about} className="w-full h-[350px] md:h-[700px] object-cover grayscale-[20%] hover:grayscale-0 transition-all duration-1000" alt="Excellence" />
                 </div>
               </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* --- Section 02: Expertise (Horizontal Scroll for Mobile) --- */}
      <section id="expertise" className="py-24 md:py-60 bg-[#0A192F] text-white">
        <div className="container mx-auto px-6 md:px-10">
          <SectionHeader number="02" title="Our Expertise" subtitle="Excellence Centers" light />
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-12">
             <ServiceCard title="Aesthetics" desc="Molecular level rejuvenation." img={IMAGES.service1} index={0} />
             <ServiceCard title="Longevity" desc="Vital performance protocols." img={IMAGES.service2} index={1} />
             <ServiceCard title="Diagnostics" desc="Comprehensive 7T mapping." img={IMAGES.service3} index={2} />
          </div>
        </div>
      </section>

      {/* --- Section 03: The Board --- */}
      <section id="theboard" className="py-24 md:py-60 bg-white">
        <div className="container mx-auto px-6 md:px-10 text-center mb-12 md:mb-32">
          <SectionHeader number="03" title="Medical Board" subtitle="Authority" />
          <p className="text-gray-400 text-sm md:text-xl font-light leading-relaxed max-w-2xl mx-auto">
            Our medical specialists are leaders dedicated to your vitality.
          </p>
        </div>
        <div className="container mx-auto px-6 md:px-10">
           <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
              <div className="p-8 md:p-12 bg-[#FAF9F6] rounded-[30px] md:rounded-[40px] shadow-[2px_2px_15px_rgba(0,0,0,0.05)] border border-gray-100 text-center group">
                 <div className="rounded-2xl overflow-hidden mb-6 md:mb-10 h-64 md:h-80">
                    <img src={IMAGES.doctor1} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" alt="Specialist" />
                 </div>
                 <p className="text-[8px] md:text-[10px] font-bold uppercase tracking-widest text-[#C5A059] mb-2">Director of Longevity</p>
                 <h4 className="text-xl md:text-3xl font-serif text-[#0A192F]">Dr. Alistair Vaughn</h4>
              </div>
              <div className="p-8 md:p-12 bg-[#FAF9F6] rounded-[30px] md:rounded-[40px] shadow-[2px_2px_15px_rgba(0,0,0,0.05)] border border-gray-100 text-center group">
                 <div className="rounded-2xl overflow-hidden mb-6 md:mb-10 h-64 md:h-80">
                    <img src={IMAGES.doctor2} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" alt="Specialist" />
                 </div>
                 <p className="text-[8px] md:text-[10px] font-bold uppercase tracking-widest text-[#C5A059] mb-2">Chief Aesthetician</p>
                 <h4 className="text-xl md:text-3xl font-serif text-[#0A192F]">Dr. Laila Al-Sayed</h4>
              </div>
              <div className="p-8 md:p-16 bg-[#0A192F] rounded-[30px] md:rounded-[40px] shadow-xl flex flex-col justify-center text-center text-white">
                 <Star className="text-[#C5A059] mx-auto mb-6 md:mb-10" size={40} />
                 <h5 className="text-lg md:text-2xl font-serif mb-4 md:mb-8">Governance</h5>
                 <p className="text-[10px] md:text-[11px] text-gray-400 uppercase tracking-widest leading-loose italic">
                   "Preserving biological heritage with Ivy League standards."
                 </p>
              </div>
           </div>
        </div>
      </section>

      {/* --- Section 04: Registry (Mobile Optimized Form) --- */}
      <section id="registry" className="py-24 md:py-72 bg-[#FAF9F6] relative">
         <div className="container mx-auto px-6 md:px-10">
            <div className="flex flex-col lg:flex-row gap-12 lg:gap-32">
               <div className="lg:w-2/5 flex flex-col justify-center text-center lg:text-left">
                  <SectionHeader number="04" title="Membership" subtitle="The Registry" />
                  <p className="text-gray-500 font-light text-lg md:text-2xl leading-relaxed mb-10 md:mb-16">
                    Admission is a privilege. We manage your health as an asset to be protected.
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4">
                     <div className="flex gap-4 p-6 bg-white rounded-[25px] shadow-sm">
                        <Lock size={20} className="text-[#C5A059] shrink-0" />
                        <div className="text-left">
                           <p className="text-[9px] uppercase font-bold text-[#0A192F]">Secure Gateway</p>
                           <p className="text-[10px] text-gray-400 leading-tight">Institutional encryption.</p>
                        </div>
                     </div>
                     <div className="flex gap-4 p-6 bg-white rounded-[25px] shadow-sm">
                        <Clock size={20} className="text-[#C5A059] shrink-0" />
                        <div className="text-left">
                           <p className="text-[9px] uppercase font-bold text-[#0A192F]">Rapid Response</p>
                           <p className="text-[10px] text-gray-400 leading-tight">Board review within 4h.</p>
                        </div>
                     </div>
                  </div>
               </div>

               <div className="lg:w-3/5">
                  <div className="bg-white p-8 md:p-16 rounded-[30px] md:rounded-[40px] shadow-xl border border-gray-100">
                     <AnimatePresence mode="wait">
                        {registryStatus === 'success' ? (
                           <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-10">
                              <CheckCircle2 size={60} className="text-[#C5A059] mx-auto mb-6" />
                              <h3 className="text-2xl font-serif mb-4 text-[#0A192F]">Registered</h3>
                              <p className="text-gray-500 text-sm mb-8">We will reach out shortly.</p>
                              <button onClick={() => setRegistryStatus('idle')} className="text-[#C5A059] text-[10px] font-bold uppercase tracking-widest border-b border-[#C5A059] pb-1">Back</button>
                           </motion.div>
                        ) : (
                           <form onSubmit={handleRegistrySubmit} className="space-y-8 md:space-y-12">
                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-12">
                                 <div className="relative">
                                    <label className="text-[8px] uppercase tracking-widest text-gray-400 mb-1 block">Full Identity</label>
                                    <input required type="text" className="premium-input text-sm" placeholder="Name" />
                                 </div>
                                 <div className="relative">
                                    <label className="text-[8px] uppercase tracking-widest text-gray-400 mb-1 block">Contact Point</label>
                                    <input required type="text" className="premium-input text-sm" placeholder="Email/Phone" />
                                 </div>
                              </div>
                              <div className="relative">
                                 <label className="text-[8px] uppercase tracking-widest text-gray-400 mb-1 block">Specialization</label>
                                 <select className="premium-input text-sm appearance-none bg-transparent">
                                    <option>Aesthetics</option>
                                    <option>Longevity</option>
                                    <option>Diagnostics</option>
                                 </select>
                              </div>
                              <button type="submit" className="w-full py-5 md:py-8 bg-[#0A192F] text-[#E2D1B3] rounded-full uppercase tracking-widest font-bold text-[10px] hover:bg-[#C5A059] transition-all">
                                 Submit Admission
                              </button>
                           </form>
                        )}
                     </AnimatePresence>
                  </div>
               </div>
            </div>
         </div>
      </section>

      {/* --- Footer (Stackable) --- */}
      <footer className="bg-[#FAF9F6] py-16 md:py-40 relative">
         <div className="container mx-auto px-6 md:px-10">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 md:gap-20">
               <div className="space-y-6 md:space-y-10">
                  <div className="flex flex-col">
                     <span className="text-3xl md:text-5xl font-serif text-[#0A192F]">ABHA</span>
                     <span className="text-[8px] md:text-[11px] tracking-widest font-bold text-[#C5A059] uppercase">The Atelier</span>
                  </div>
                  <p className="text-gray-400 text-xs leading-loose uppercase">The pinnacle of healthcare luxury in Dubai.</p>
               </div>
               <div>
                  <h4 className="text-[10px] uppercase tracking-widest font-bold text-[#C5A059] mb-6 md:mb-12">Centers</h4>
                  <ul className="space-y-4 text-[10px] text-gray-400 font-bold uppercase">
                     <li>Longevity Lab</li>
                     <li>Aesthetic Suite</li>
                     <li>Diagnostics</li>
                  </ul>
               </div>
               <div>
                  <h4 className="text-[10px] uppercase tracking-widest font-bold text-[#C5A059] mb-6 md:mb-12">Registry</h4>
                  <ul className="space-y-4 text-[10px] text-gray-400 font-bold uppercase">
                     <li>Access Line</li>
                     <li>Membership</li>
                     <li>Portal</li>
                  </ul>
               </div>
               <div className="space-y-8">
                  <h4 className="text-[10px] uppercase tracking-widest font-bold text-[#C5A059] mb-6 md:mb-12">Social</h4>
                  <div className="flex gap-6">
                     <Instagram className="text-gray-300 hover:text-[#E4405F] transition-colors" size={20} />
                     <Linkedin className="text-gray-300 hover:text-[#0077B5] transition-colors" size={20} />
                     <Facebook className="text-gray-300 hover:text-[#1877F2] transition-colors" size={20} />
                  </div>
               </div>
            </div>
            <div className="mt-16 pt-10 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center gap-6 text-[8px] uppercase tracking-widest text-gray-400 font-bold">
               <p>© 2024 Abha Medical Group • Dubai, UAE</p>
               <div className="flex gap-8">
                  <a href="#">Privacy</a>
                  <a href="#">Governance</a>
               </div>
            </div>
         </div>
      </footer>

      {/* --- Mobile Floating Utilities --- */}
      
      {/* WhatsApp Button (Smaller on Mobile) */}
      <a 
        href={`https://wa.me/${CLINIC_INFO.phone.replace(/\D/g,'')}`} 
        target="_blank" rel="noreferrer"
        className="fixed bottom-6 left-6 z-[90] bg-white p-3 md:p-4 rounded-full shadow-2xl flex items-center gap-3 group hover:bg-[#25D366] transition-all duration-700"
      >
        <div className="p-2 md:p-4 bg-[#25D366] rounded-full text-white shadow-xl"><MessageCircle size={20}/></div>
        <span className="hidden md:inline text-[11px] font-bold uppercase tracking-widest pr-4">Concierge Desk</span>
      </a>

      {/* Assistant Toggle */}
      <div className="fixed bottom-6 right-6 z-[90]">
        <AnimatePresence>
          {isChatOpen && (
            <motion.div 
              initial={{ opacity: 0, y: 50, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 50, scale: 0.9 }}
              className="mb-4 w-[85vw] sm:w-[400px] bg-white shadow-2xl border border-[#C5A059]/20 rounded-[30px] overflow-hidden"
            >
               <div className="bg-[#0A192F] p-6 md:p-10 text-white flex justify-between items-center">
                  <div className="flex items-center gap-4">
                     <div className="w-12 h-12 border border-[#C5A059] rounded-full flex items-center justify-center italic font-serif text-[#C5A059] text-xl">A</div>
                     <div>
                        <h6 className="text-[10px] font-bold uppercase tracking-widest">Assistant</h6>
                        <p className="text-[8px] text-[#C5A059] uppercase animate-pulse">Registry Open</p>
                     </div>
                  </div>
                  <button onClick={() => setIsChatOpen(false)} className="opacity-40 hover:opacity-100"><X size={24}/></button>
               </div>
               <div className="p-8 h-[300px] md:h-[400px] bg-[#FAF9F6] overflow-y-auto text-xs font-light leading-relaxed italic text-gray-500 text-center">
                  "Welcome to the Abha private circle. How may I assist your health journey today?"
               </div>
               <div className="p-6 bg-white border-t border-gray-50 flex gap-4">
                  <input className="flex-1 text-[11px] focus:outline-none" placeholder="Registry inquiry..." />
                  <button className="text-[#C5A059]"><Send size={20}/></button>
               </div>
            </motion.div>
          )}
        </AnimatePresence>
        
        <button 
          onClick={() => setIsChatOpen(!isChatOpen)}
          className="bg-[#0A192F] text-[#C5A059] p-4 md:px-10 md:py-6 rounded-full flex items-center gap-4 shadow-2xl hover:bg-[#C5A059] hover:text-white transition-all"
        >
          <span className="hidden md:inline text-[11px] font-bold uppercase tracking-widest">{isChatOpen ? 'Close' : 'Registry Assistant'}</span>
          <Fingerprint size={24}/>
        </button>
      </div>

    </div>
  );
}